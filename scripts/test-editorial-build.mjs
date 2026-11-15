import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
const root = process.env.VALIDATE_DIR || 'dist';
for (const lang of ['', 'zh/']) {
  const home = readFileSync(join(root, lang, 'index.html'), 'utf8');
  const sections = ['writing-title', 'research-title', 'projects-title', 'about-title'].map(id => home.indexOf(`id="${id}"`));
  assert.ok(sections.every(n => n >= 0), 'All editorial home sections must be available');
  assert.deepEqual([...sections].sort((a, b) => a - b), sections, 'Writing leads research and projects');
  assert.ok(home.includes('data-theme="dark"'), 'No-JS defaults to dark');
  assert.equal((home.match(/data-content-entry/g) ?? []).length, 3);
  const journal = readFileSync(join(root, lang, 'journal/index.html'), 'utf8');
  assert.equal((journal.match(/data-reading-time/g) ?? []).length, 13, 'All published journal entries have an estimate');
  assert.ok(!home.includes('currently-title'));
}
let articleCount = 0;
function inspect(dir) {
  for (const name of readdirSync(dir)) {
    const file = join(dir, name);
    if (statSync(file).isDirectory()) { inspect(file); continue; }
    if (!name.endsWith('.html')) continue;
    const html = readFileSync(file, 'utf8');
    if (!html.includes('id="article-body"')) continue;
    articleCount++;
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
    assert.equal(new Set(ids).size, ids.length, `Unique IDs: ${file}`);
    assert.ok(html.includes('data-reading-progress'));
    assert.ok(html.includes('og:type" content="article"'));
    assert.ok(html.includes('data-reading-time'));
    for (const match of html.matchAll(/class="heading-anchor" href="#([^"]+)"/g)) assert.ok(ids.includes(match[1]));
  }
}
inspect(root);
assert.ok(articleCount > 20);
console.log(`Editorial home, estimates, unique anchors and article metadata: PASS (${articleCount} articles)`);
