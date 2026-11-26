import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { parse } from 'yaml';
import { createContentSchemas, coverPath, selectPublished } from '../src/lib/content-schema.ts';
import { publicProfile } from '../src/lib/sections.ts';
import { editorialVisible } from '../src/lib/editorial.mjs';

for (const [prefix, locale, other] of [['', 'en', 'zh-TW'], ['zh/', 'zh-TW', 'en']]) {
  const page = readFileSync(`dist/${prefix}about/index.html`, 'utf8');
  assert.match(page, /<h1(?:\s[^>]*)?>Nagi<\/h1>/);
  assert.equal((page.match(/<h1(?:\s|>)/g) ?? []).length, 1);
  for (const id of ['about-experience', 'about-projects']) assert.ok(page.includes(`id="${id}"`), id);
  for (const id of ['about-interests', 'about-skills', 'about-honors', 'about-talks', 'about-education', 'about-contact']) assert.ok(!page.includes(`id="${id}"`), 'Removed/unapproved section: ' + id);
  assert.equal(publicProfile.technicalInterests, undefined);
  assert.equal(publicProfile.skillGroups, undefined);
  assert.ok(page.includes(`href="/Nagi.tw/${prefix}experience/"`), 'Concise About links to the full chronological record');
  assert.doesNotMatch(page, /<ol class="about-timeline"/, 'Do not repeat the complete experience collection on About');
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
const recovered = JSON.parse(readFileSync('docs/content-recovery/manifest.json', 'utf8'));
assert.equal(files.length, 35 + recovered.records.filter(record => !record.eventId && editorialVisible(record.file.split('/')[2], record.file.split('/').at(-1).replace(/(?:\.zh)?\.md$/, ''))).length, 'Approved bilingual project summaries and disclosure routes supplement the preserved recovery routes');
for (const path of files) {
  const html = readFileSync(`dist/${path}`, 'utf8');
  for (const [, href] of html.matchAll(/<a\b[^>]*\bhref="([^"<>]+)"/g)) {
    const url = new URL(href.replaceAll('&amp;', '&'), 'https://nagitw.github.io/Nagi.tw/' + path.replaceAll('\\', '/'));
    if (url.origin !== 'https://nagitw.github.io') continue;
    const target = 'dist' + decodeURIComponent(url.pathname.replace(/^\/Nagi.tw/, '')) + (url.pathname.endsWith('/') ? 'index.html' : '');
    assert.ok(existsSync(target), `${path}: internal link ${href}`);
  }
}
console.log(`PASS: bilingual About, public records only, canonical/hreflang, ${files.length} routes, draft exclusion and all internal links.`);
