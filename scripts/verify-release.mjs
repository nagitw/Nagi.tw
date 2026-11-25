import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(`${dir}/${e.name}`) : [`${dir}/${e.name}`]);
const pages = walk('dist').filter(p => p.endsWith('.html'));
const urls = [];
const origin = 'https://nagitw.github.io';
const base = '/Nagi.tw';
for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  const route = file.replace(/^dist/, '').replace(/index.html$/, '');
  assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, file);
  assert.ok(html.includes(`rel="canonical" href="${origin}${base}${route === '/404.html' ? '/404/' : route}"`), `${file}: production canonical`);
  assert.ok(!html.includes('https://nagi.tw'), `${file}: old deployment URL`);
  if (!html.includes('content="noindex, follow"')) urls.push(`${origin}${base}${route}`);
  for (const [, raw] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = new URL(raw.replaceAll('&amp;', '&'), `${origin}${base}${route}`);
    assert.ok(['https:', 'http:', 'mailto:', 'tel:'].includes(url.protocol), `${file}: unsafe URL ${raw}`);
    if (url.origin !== origin) continue;
    assert.ok(url.pathname.startsWith(base + '/'), `${file}: escaped Pages base ${raw}`);
    if (file === 'dist/404.html' && url.pathname === `${base}/404/`) continue;
    const target = resolve('dist', `.${decodeURIComponent(url.pathname.slice(base.length))}`, url.pathname.endsWith('/') ? 'index.html' : '');
    assert.ok(target.startsWith(resolve('dist') + '/') || target.startsWith(resolve('dist') + '\\'), raw);
    assert.ok(existsSync(target), `${file}: missing ${raw}`);
    if (url.hash && target.endsWith('.html')) {
      const destination = readFileSync(target, 'utf8');
      assert.ok(destination.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `${file}: missing fragment ${raw}`);
    }
  }
  for (const image of html.matchAll(/<img\b[^>]*>/g)) assert.match(image[0], /alt="[^"]*"/, file);
}
const sitemap = readFileSync('dist/sitemap.xml', 'utf8');
assert.ok(existsSync('dist/_astro/Layout.D7zMT1RW.css'), 'Preserve the previous release stylesheet URL for cached English/Chinese HTML');
const actual = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
assert.deepEqual(actual.sort(), urls.sort(), 'Sitemap must include exactly indexable built routes');
assert.match(readFileSync('dist/robots.txt', 'utf8'), /User-agent: \*\s+Allow: \/\s+Sitemap: https:\/\/nagitw.github.io\/Nagi.tw\/sitemap.xml/);
console.log(`PASS: ${pages.length} pages, all local links/assets/fragments, image alt text, ${urls.length} sitemap URLs and robots.txt`);
