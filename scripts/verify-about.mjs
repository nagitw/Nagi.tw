import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { parse } from 'yaml';
import { createContentSchemas, coverPath, selectPublished } from '../src/lib/content-schema.ts';
import { publicProfile } from '../src/lib/sections.ts';

for (const [prefix, locale, other] of [['', 'en', 'zh-TW'], ['zh/', 'zh-TW', 'en']]) {
  const page = readFileSync(`dist/${prefix}about/index.html`, 'utf8');
  assert.match(page, /<h1(?:\s[^>]*)?>Nagi<\/h1>/);
  assert.equal((page.match(/<h1(?:\s|>)/g) ?? []).length, 1);
  for (const id of ['about-interests', 'about-skills', 'about-experience', 'about-projects']) assert.ok(page.includes(`id="${id}"`), id);
  for (const id of ['about-honors', 'about-talks', 'about-education', 'about-contact']) assert.ok(!page.includes(`id="${id}"`), 'Unapproved/absent section: ' + id);
  for (const interest of publicProfile.technicalInterests) assert.ok(page.includes(interest[locale]));
  assert.ok(page.includes(`href="/Nagi.tw/${prefix}projects/bugtraceai-cli-contributions/"`));
  assert.ok(page.includes(`<html lang="${locale}">`));
  assert.ok(page.includes(`rel="canonical" href="https://nagitw.github.io/Nagi.tw/${prefix}about/"`));
  assert.ok(page.includes(`hreflang="${other}"`));
  assert.ok(!/mailto:|tel:|Pending confirmation|2000-01-01/.test(page));
}

const schemas = createContentSchemas(coverPath);
for (const [collection, schema] of Object.entries(schemas)) {
  const entries = readdirSync(`src/content/${collection}`, { recursive: true }).filter(path => /\.mdx?$/.test(path)).map(path => {
    const source = readFileSync(`src/content/${collection}/${path}`, 'utf8');
    return { data: schema.parse(parse(/^---\r?\n([\s\S]*?)\r?\n---/.exec(source)[1])) };
  });
  const published = new Set(selectPublished(entries).map(entry => `${entry.data.language}/${entry.data.slug}`));
  for (const { data } of entries) if (!published.has(`${data.language}/${data.slug}`)) {
    for (const prefix of ['', 'zh/']) assert.ok(!existsSync(`dist/${prefix}${collection}/${data.slug}/index.html`), 'Draft route excluded');
  }
}
const files = readdirSync('dist', { recursive: true }).filter(path => path.endsWith('.html'));
assert.equal(files.length, 17, 'No new public route');
for (const path of files) {
  const html = readFileSync(`dist/${path}`, 'utf8');
  for (const [, href] of html.matchAll(/<a\b[^>]*\bhref="([^"<>]+)"/g)) {
    const url = new URL(href.replaceAll('&amp;', '&'), 'https://nagitw.github.io/Nagi.tw/' + path.replaceAll('\\', '/'));
    if (url.origin !== 'https://nagitw.github.io') continue;
    const target = 'dist' + decodeURIComponent(url.pathname.replace(/^\/Nagi.tw/, '')) + (url.pathname.endsWith('/') ? 'index.html' : '');
    assert.ok(existsSync(target), `${path}: internal link ${href}`);
  }
}
console.log('PASS: fresh bilingual About, six interests, public projects only, optional personal sections absent, canonical/hreflang, 17 routes, draft exclusion and all internal links.');
