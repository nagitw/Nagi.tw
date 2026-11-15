import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';

const origin = (process.env.SITE_URL || 'https://nagi.tw').replace(/\/$/, '');
const base = (process.env.SITE_BASE || '/').replace(/\/$/, '');
const root = process.env.VALIDATE_DIR || 'dist';
const walk = d => readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(join(d, e.name)) : [join(d, e.name)]);
assert.ok(!existsSync(join(root, 'CNAME')), 'Pages artifact must not claim a custom domain');
const files = walk(root);
let checked = 0;
for (const file of files) {
  if (!/\.(html|css|js|xml|json|txt)$/.test(file)) continue;
  const text = readFileSync(file, 'utf8');
  const name = relative(root, file);
  const refs = [...text.matchAll(/(?:href|src|action)="([^"<>]+)"|url\(["']?([^\s)'"<>]+)|["'](\/(?:_astro|migrated)\/[^"']+)["']/g)];
  for (const match of refs) {
    const value = (match[1] || match[2] || match[3]).replaceAll('&amp;', '&');
    if (!value.startsWith('/') || value.startsWith('//')) continue;
    assert.ok(value.startsWith(`${base}/`), `${name}: escaped base: ${value}`);
    const pathname = decodeURIComponent(value.split(/[?#]/)[0].slice(base.length));
    const target = join(root, pathname.endsWith('/') ? `${pathname}index.html` : pathname);
    assert.ok(existsSync(target), `${name}: missing target ${value}`);
    checked++;
  }
  if (file.endsWith('.html')) {
    assert.ok(text.includes(`rel="canonical" href="${origin}${base}/`), `${name}: canonical origin/base`);
    for (const [, href] of text.matchAll(/<link\b[^>]*hreflang="[^"]+"[^>]*href="([^"]+)"/g)) {
      assert.ok(href.startsWith(`${origin}${base}/`), `${name}: alternate origin/base: ${href}`);
      const pathname = decodeURIComponent(new URL(href).pathname.slice(base.length));
      assert.ok(existsSync(join(root, pathname.endsWith('/') ? `${pathname}index.html` : pathname)), `${name}: missing alternate ${href}`);
    }
  }
}
const robots = readFileSync(join(root, 'robots.txt'), 'utf8');
assert.ok(robots.includes(`Sitemap: ${origin}${base}/sitemap-index.xml`));
for (const file of files.filter(p => /sitemap.*\.xml$/.test(p))) {
  for (const [, url] of readFileSync(file, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)) {
    assert.ok(url.startsWith(`${origin}${base}/`), `Sitemap URL ${url}`);
  }
}
const notFound = readFileSync(join(root, '404.html'), 'utf8');
assert.ok(notFound.includes(`href="${base}/zh/"`));
assert.ok(!notFound.includes('hreflang='), '404 must not advertise nonexistent language editions');
console.log(`Pages artifact PASS: ${files.length} files, ${checked} local references, canonical URLs, sitemap, robots and 404`);
