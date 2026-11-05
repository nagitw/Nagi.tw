import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
const root = resolve(process.env.VALIDATE_DIR || 'dist');
const base = (process.env.SITE_BASE || '/').replace(/\/$/, '');
const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(item => item.isDirectory() ? walk(join(dir, item.name)) : [join(dir, item.name)]);
const files = walk(root).filter(file => file.endsWith('.html'));
assert.ok(files.length >= 94, 'Bilingual content, missing-edition notices and project leads built');
const sitemap = readFileSync(join(root, 'sitemap-0.xml'), 'utf8');
const titles = new Set();
for (const file of files) {
  const route = '/' + relative(root, file).replaceAll('\\', '/').replace(/index.html$/, '');
  const html = readFileSync(file, 'utf8');
  if (/http-equiv="refresh"/i.test(html)) {
    const destination = html.match(/url=([^"]+)/i)?.[1];
    assert.ok(destination && existsSync(join(root, destination.replace(base, ''), 'index.html')), 'Alias target exists');
    continue;
  }
  assert.ok(!/\?{3,}/.test(html), `${route}: no corrupted UI copy`);
  const zh = route.startsWith('/zh/');
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${route}: one heading`);
  assert.ok(html.includes(`<html lang="${zh ? 'zh-TW' : 'en'}"`), `${route}: language`);
  assert.ok(html.includes(`rel="canonical" href="https://nagi.tw${base}${route}"`), `${route}: canonical`);
  assert.ok(sitemap.includes(`https://nagi.tw${base}${route}`), `${route}: sitemap`);
  assert.ok(html.includes('href="#main"') && html.includes('id="main"'), 'Skip link');
  assert.ok(html.includes(`${base}/rss.xml`), 'Local approved RSS discovery');
  assert.ok(html.match(/name="description" content="[^"]+"/), 'SEO description');
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  assert.ok(title && !titles.has(title), `${route}: unique title`); titles.add(title);
  for (const [, href] of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    assert.ok(!base || href.startsWith(`${base}/`), `${route}: base-aware link ${href}`);
    const [path, fragment] = href.slice(base.length).split('#');
    const target = path.endsWith('.xml') || path.endsWith('.json') ? join(root, path) : join(root, path, 'index.html');
    assert.ok(existsSync(target), `${route}: local link ${href}`);
    if (fragment) assert.ok(readFileSync(target, 'utf8').includes(`id="${fragment}"`), `Anchor ${href}`);
  }
  for (const match of html.matchAll(/<script\b[^>]*src="([^"]+)"/g)) {
    assert.ok(match[1].startsWith(`${base}/`), 'Script base');
    assert.ok(existsSync(join(root, match[1].slice(base.length))), 'Bundled script exists');
  }
}
const projects = readFileSync(join(root, 'projects/index.html'), 'utf8');
for (const text of ['MedTrust', 'integrity consistency', 'Digital Signature', 'Identity Proof', 'Non-repudiation']) assert.ok(projects.includes(text), `Preserved scope: ${text}`);
console.log('All routes: SEO, sitemap, languages, scripts, internal links, anchors and preserved project limitations: PASS');
