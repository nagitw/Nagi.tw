import assert from 'node:assert/strict';
import { test } from 'node:test';
import { prepareArticle } from '../src/lib/article.ts';

test('headings cannot overwrite layout, references or copy feedback', async () => {
  const result = await prepareArticle('## main\n\n## references-title\n\n## code-status-0\n\n## 中文\n\n## 中文\n\n```js\nconst x = 1;\n```');
  const shell = `<main id="main"><h2 id="references-title">References</h2>${result.html}</main>`;
  const ids = [...shell.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  assert.equal(new Set(ids).size, ids.length);
  assert.ok(result.headings.every(h => h.id.startsWith('heading-')));
});

test('prototype property language names fall back without poisoning the highlighter', async () => {
  for (const lang of ['constructor', 'toString', '__proto__', 'not-a-language', 'js']) {
    const result = await prepareArticle('```' + lang + '\nconst x = "<tag>";\n```');
    assert.ok(result.html.includes('data-code-copy'));
    assert.ok(!result.html.includes('<tag>'));
  }
});
