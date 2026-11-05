import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const root = process.env.VALIDATE_DIR || 'dist';
const base = (process.env.SITE_BASE || '/').replace(/\/$/, '');
const approved = JSON.parse(readFileSync('src/data/migrated.json', 'utf8'));
const index = JSON.parse(readFileSync(`${root}/search.json`, 'utf8'));
assert.equal(index.length, approved.length);
for (const row of index) {
 assert.ok(approved.some(a => a.route === row.url.slice(base.length) && a.title === row.title && a.locale === row.locale));
 assert.ok(existsSync(`${root}${row.url.slice(base.length)}index.html`));
 assert.deepEqual(Object.keys(row).sort(), ['description','kind','locale','title','url']);
}
const rss = readFileSync(`${root}/rss.xml`, 'utf8');
assert.equal((rss.match(/<item>/g) ?? []).length, approved.filter(r => r.kind === 'journal').length);
for (const [,url] of rss.matchAll(/<guid>([^<]+)<\/guid>/g)) assert.ok(index.some(r => `https://nagi.tw${r.url}` === url));
assert.ok(readFileSync(`${root}/sitemap-0.xml`, 'utf8').includes('hreflang="zh-TW"'));
console.log('Approved search/RSS membership, destination routes and multilingual sitemap: PASS');
