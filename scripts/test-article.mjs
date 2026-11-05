import assert from 'node:assert/strict';
import { renderArticle } from '../src/lib/article.ts';
const html = renderArticle('# Title\n\n<script>alert(1)</script>\n\n[x](javascript:alert)\n\n[local](/zh/projects/)\n\n![tracking](https://tracker.test/a)', '/studio');
assert.ok(!html.includes('<script'));
assert.ok(!html.includes('href="javascript:'));
assert.ok(!html.includes('<img'));
assert.ok(html.includes('href="/studio/zh/projects/"'));
assert.ok(!html.includes('<h1'));
console.log('Article rendering security and base paths: PASS');
