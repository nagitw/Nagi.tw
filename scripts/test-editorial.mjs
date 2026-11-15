import assert from 'node:assert/strict';
import * as article from '../src/lib/article.ts';

// Missing/duplicate IDs break TOC navigation, including Chinese and punctuation-only headings.
const html = article.renderArticle('## 測試\n\n## 測試\n\n## !!!\n\n## 測試-2');
const ids = [...html.matchAll(/<h\d id="([^"]+)"/g)].map(m => m[1]);
assert.equal(ids.length, 4, 'Every heading needs an anchor');
assert.equal(new Set(ids).size, 4, 'Heading IDs must be unique');
assert.ok(html.includes('href="#heading-測試"'));
assert.equal(article.readingMinutes(''), 1);
assert.equal(article.readingMinutes('字'.repeat(600)), 2);
assert.equal(article.readingMinutes('word '.repeat(440)), 2);

const rendered = await article.prepareArticle('## Test\n\n[Source](https://example.org/spec)\n\n[Bad](javascript:alert)\n\n![local](/migrated/cybersec-2026.jpg)\n\n![track](https://tracker.test/a)\n\n```js\nconst x = "<script>";\n```\n\n```unknown-lang\n<script>alert(1)</script>\n```', '/studio');
assert.deepEqual(rendered.headings, [{ id: 'heading-test', text: 'Test', depth: 2 }]);
assert.deepEqual(rendered.references, [{ href: 'https://example.org/spec', text: 'Source' }]);
assert.ok(rendered.html.includes('src="/studio/migrated/cybersec-2026.jpg"'));
assert.ok(!rendered.html.includes('src="https://tracker.test'));
assert.ok(rendered.html.includes('shiki'));
assert.ok(/<span style="--shiki-light:/.test(rendered.html), 'Known languages receive token colors');
assert.ok(rendered.html.includes('data-code-copy'));
assert.ok(!rendered.html.includes('<script>'));
assert.ok(!rendered.html.includes('href="javascript:'));
assert.ok(!article.renderArticle('![x](/migrated/../secret.png)').includes('<img'));
assert.ok(!article.renderArticle('![x](//tracker.test/a)').includes('<img'));
console.log('Editorial anchors, estimates, syntax highlighting, references and image isolation: PASS');
