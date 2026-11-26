import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const en = readFileSync('dist/index.html', 'utf8');
const zh = readFileSync('dist/zh/index.html', 'utf8');
assert.match(en, /Create what you wish existed\./);
assert.match(zh, /把你希望存在的東西，親手創造出來。/);
for (const html of [en, zh]) {
  assert.match(html, /data-mascot/);
  assert.match(html, /Selected Research|精選研究/);
  assert.match(html, /Selected Projects|精選專案/);
  assert.match(html, /Latest Journal|最新札記/);
  assert.match(html, /\/Nagi.tw\/[^" ]*rss.xml/);
  assert.match(html, /\/Nagi.tw\/_astro\/[^" ]+\.css/);
}
for (const file of [
  'dist/rss.xml',
  'dist/zh/rss.xml',
  'dist/pagefind/pagefind.js',
])
  assert.ok(existsSync(file), file);
assert.ok(
  existsSync('dist/_astro/Layout.meZlh1ij.css'),
  'Preserve current production CSS for cached HTML',
);
assert.ok(
  existsSync('dist/_astro/Layout.D7zMT1RW.css'),
  'Preserve previous production CSS',
);
console.log(
  'PASS V4 bilingual home, mascot, feed, search index and cached CSS contract',
);
