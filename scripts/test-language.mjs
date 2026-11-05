import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const root = process.env.VALIDATE_DIR || 'dist';
const base = (process.env.SITE_BASE || '/').replace(/\/$/, '');
const paths = ['', 'research/', 'projects/', 'journal/', 'technical-reports/', 'about/', 'roadmap/', 'experience/', 'contact/', 'security/disclosures/', 'journal/frc-engineering-team/', 'projects/nagi-cli/'];
for (const prefix of ['', 'zh/']) {
  for (const path of paths) {
    const html = readFileSync(`${root}/${prefix}${path}index.html`, 'utf8');
    const counterpart = `${base}/${prefix ? '' : 'zh/'}${path}`;
    assert.ok(html.includes(`href="${counterpart}" lang="${prefix ? 'en' : 'zh-TW'}"`), `Language switch preserves ${prefix}${path}`);
    assert.ok(html.includes(`hreflang="en" href="https://nagi.tw${base}/${path}"`), 'English alternate');
    assert.ok(html.includes(`hreflang="zh-TW" href="https://nagi.tw${base}/zh/${path}"`), 'Chinese alternate');
    assert.ok(html.includes('aria-haspopup="dialog"'), 'Chat entry semantics');
    assert.ok(html.includes('id="penguin-chat" aria-labelledby="chat-title"'), 'Named dialog');
  }
}
const asset = readFileSync('public/nagi-penguin.svg', 'utf8');
for (const color of ['#17252B', '#f3f5f3', '#d89b4a']) assert.ok(asset.includes(color), `Original intrinsic color ${color}`);
const fallback = readFileSync(`${root}/journal/frc-engineering-team/index.html`, 'utf8');
assert.ok(fallback.includes('This article has no English edition yet'));
assert.ok(readFileSync(`${root}/zh/journal/frc-engineering-team/index.html`, 'utf8').includes('article-body'));
console.log('Both language paths and alternate links, accessible chat structure and original SVG: PASS');
