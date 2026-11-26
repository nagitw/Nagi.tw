import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { parse } from 'yaml';
import { recoveryRecords, recordPath, recordRoute, sha256, gitFile, publicRef } from './recover-content.mjs';
import { editorialVisible, editorialData } from '../src/lib/editorial.mjs';
import policy from '../src/lib/editorial-policy.json' with { type: 'json' };

const manifest = JSON.parse(readFileSync('docs/content-recovery/manifest.json', 'utf8'));
const expected = await recoveryRecords();
assert.equal(manifest.records.length, expected.length);
for (const record of expected) {
  const source = readFileSync(recordPath(record), 'utf8');
  const header = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/.exec(source);
  const data = parse(header[1]);
  assert.deepEqual(data, record.metadata, record.id + ': original metadata');
  assert.equal(source.slice(header[0].length), record.body, record.id + ': exact historical public body');
  assert.equal(manifest.records.find(item => item.id === record.id).bodySha256, sha256(record.body));
  if (record.collection === 'experience') {
    assert.equal(data.startedAt.length, 4, 'Keep year precision; never invent day/month');
    if (['first-tech-challenge', 'ilan-programming-ai', 'ais3-myfirstctf-2026'].includes(record.eventId)) assert.equal(data.startedAt, '2026');
  }
  const route = recordRoute(record);
  const target = route.includes('#') ? route.split('#')[0] : route;
  if (!editorialVisible(record.collection, record.metadata.slug)) {
    if (!record.eventId) assert.ok(!existsSync(`dist${target}index.html`), record.id + ': hidden route');
    else {
      const html = readFileSync(`dist${target}index.html`, 'utf8');
      assert.ok(!html.includes(`id="${record.eventId}"`), record.id + ': hidden activity');
    }
    continue;
  }
  const html = readFileSync(`dist${target}index.html`, 'utf8');
  assert.ok(html.includes(record.metadata.title.replaceAll('&', '&amp;')) || html.includes(record.metadata.title), record.id + ': rendered title');
  assert.ok(html.includes('data-penguin-toggle'), record.id + ': original mascot restored in V4');
  const projected = editorialData(record.collection, record.metadata);
  if (record.eventId && policy.eventResults?.[record.metadata.slug]) {
    const result = projected.description.replaceAll('&', '&amp;');
    assert.ok(html.includes(result) || html.includes(result.replaceAll("'", '&#39;')), record.id + ': only confirmed result shown');
  }
  if (projected.publishedAt && !record.metadata.publishedAt) {
    const originalDate = record.body.replaceAll('**', '').match(/(?:Date|日期)[:：]\s*(\d{4}-\d{2}-\d{2})/)?.[1];
    assert.equal(projected.publishedAt, originalDate, record.id + ': date comes from original body, not Git commit');
  }
  if (projected.publishedAt) assert.ok(html.includes(`datetime="${projected.publishedAt}"`), record.id + ': source document date');
}
const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(`${dir}/${e.name}`) : [`${dir}/${e.name}`]);
const recovered = new Set(manifest.records.map(record => record.file));
const additions = JSON.parse(readFileSync('docs/v4/portfolio-additions.json', 'utf8'));
for (const file of walk('src/content').filter(file => /\.mdx?$/.test(file) && !recovered.has(file))) {
  if (additions.hashes[file]) {
    assert.equal(sha256(readFileSync(file)), additions.hashes[file], `${file}: authorized public-source addition`);
    continue;
  }
  const old = gitFile('8785863ea406c3552f1406035200ed8905a37a5f', file);
  assert.deepEqual(readFileSync(file), old, `${file}: non-recovered draft/public baseline untouched`);
}
// Reuse the previous publication's identity and withdrawn-topic safeguards.
const fingerprints = JSON.parse(gitFile(publicRef, 'scripts/privacy-fingerprints.json'));
if (!policy.conferenceImageRightsConfirmed) assert.ok(!walk('dist').some(file => /cybersec-2026\./.test(file)), 'Unconfirmed-rights photo excluded from output');
for (const file of walk('dist').filter(file => /\.(html|json|xml|js|css|svg|txt)$/.test(file))) {
  const source = readFileSync(file, 'utf8');
  if (file.endsWith('.html')) {
    assert.doesNotMatch(source, /(?:lang|hreflang)="ja"|href="[^\"]*\/ja\//, file + ': no Japanese presentation');
    assert.doesNotMatch(source, /<img\b[^>]*src="[^\"]*\/nagi\.[^\"]*svg/, file + ': no site-logo placeholder covers');
    for (const card of source.matchAll(/<article class="card"[\s\S]*?<\/article>/g)) assert.ok(!card[0].includes('<figure'), file + ': consistent text-only lists');
  }
  assert.doesNotMatch(source, /oscp|from-ctf-to-/i, file + ': withdrawn topic');
  const normalized = source.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]/g, '');
  for (const { length, hash } of fingerprints) for (let i = 0; i <= normalized.length - length; i++) {
    assert.notEqual(createHash('sha256').update(normalized.slice(i, i + length)).digest('hex'), hash, file + ': private identity fingerprint');
  }
}
console.log(`PASS: ${expected.length} recovered records, exact public bodies/metadata, confirmed 2026 years, untouched other content, private/withdrawn exclusions`);
