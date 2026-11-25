import assert from 'node:assert/strict';
import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { parse } from 'yaml';
import { groupExperience } from '../src/lib/experience-timeline.ts';
import { editorialData, editorialVisible } from '../src/lib/editorial.mjs';

const output = 'docs/release-candidate';
const baselinePath = `${output}/baseline.json`;
mkdirSync(output, { recursive: true });
const walk = path => readdirSync(path, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(`${path}/${e.name}`) : [`${path}/${e.name}`]);
const sha = path => createHash('sha256').update(readFileSync(path)).digest('hex');
const allowed = ['src/components/AboutProfile.astro', 'src/components/ExperienceTimeline.astro', 'src/lib/sections.ts', 'src/lib/experience-timeline.ts', 'src/lib/editorial-policy.json', 'src/lib/editorial.mjs'];
const sourceFiles = [...walk('src'), ...walk('public'), 'astro.config.mjs', 'package.json', 'package-lock.json', 'tsconfig.json'];
const pageFiles = () => walk('dist').filter(p => p.endsWith('.html')).map(p => p.slice(5)).sort();
const entries = () => walk('src/content/experience').filter(p => p.endsWith('.md')).map(path => {
  const source = readFileSync(path, 'utf8');
  return { path, data: parse(/^---\r?\n([\s\S]*?)\r?\n---/.exec(source)[1]) };
});
if (process.argv[2] === 'baseline') {
  assert.ok(!existsSync(baselinePath), 'Do not overwrite release baseline');
  const baseline = {
    protected: Object.fromEntries(sourceFiles.filter(p => !allowed.includes(p)).sort().map(p => [p, sha(p)])),
    authorizedBefore: Object.fromEntries(allowed.map(p => [p, sha(p)])),
    pages: pageFiles(),
    competitionRecords: entries().filter(e => e.data.tags?.includes('competitions')).map(e => ({ path: e.path, ...e.data })),
  };
  assert.equal(baseline.pages.length, 35);
  writeFileSync(baselinePath, JSON.stringify(baseline, null, 2) + '\n');
  console.log(`PASS: release baseline recorded; ${Object.keys(baseline.protected).length} protected files, 35 routes`);
  process.exit(0);
}
const baseline = JSON.parse(readFileSync(baselinePath, 'utf8'));
for (const [path, hash] of Object.entries(baseline.protected)) assert.equal(sha(path), hash, `Preserve source/assets/design: ${path}`);
assert.deepEqual(sourceFiles.filter(p => !allowed.includes(p)).sort(), Object.keys(baseline.protected).sort(), 'No added content, assets, routes or dependencies');
assert.deepEqual(pageFiles(), baseline.pages, 'Exactly 35 baseline routes');

const all = entries().filter(e => e.data.status === 'published' && editorialVisible('experience', e.data.slug));
const groupsByLocale = {};
for (const locale of ['en', 'zh-TW']) {
  const records = all.filter(e => e.data.language === locale).map(e => ({ ...e, data: editorialData('experience', e.data) }));
  const groups = groupExperience(records);
  groupsByLocale[locale] = groups.map(g => ({ year: g.year, slugs: g.entries.map(e => e.data.slug) }));
  assert.deepEqual(groups.map(g => g.year), ['2026', '2025', '2024']);
  const html = readFileSync(`dist/${locale === 'en' ? '' : 'zh/'}experience/index.html`, 'utf8');
  const renderedIds = [...html.matchAll(/class="timeline-event" id="([^"]+)"/g)].map(m => m[1]);
  assert.deepEqual(renderedIds, groups.flatMap(g => g.entries.map(e => e.data.slug)), `${locale}: built order matches chronology`);
  assert.equal(renderedIds.filter(id => id === 'ais3-myfirstctf-2026').length, 1);
  assert.ok(!/myfirstctf-2025|MyFirstCTF\s*2025/i.test(html), 'No incorrect MyFirstCTF2025 participation');
  for (const group of groups) {
    const dates = group.entries.filter(e => e.data.startedAt.length > 4).map(e => e.data.startedAt);
    assert.deepEqual(dates, [...dates].sort(), `${locale}/${group.year}: ascending dates`);
  }
  for (const record of records.filter(e => e.data.tags?.includes('competitions'))) {
    assert.ok(record.data.description, `${record.data.slug}: preserve award or participation`);
    const encoded = record.data.description.replaceAll('&', '&amp;').replaceAll("'", '&#39;').replaceAll('"', '&quot;');
    assert.ok(html.includes(encoded) || html.includes(record.data.description), `${locale}/${record.data.slug}: result rendered`);
  }
  const about = readFileSync(`dist/${locale === 'en' ? '' : 'zh/'}about/index.html`, 'utf8');
  assert.doesNotMatch(about, /about-interests|about-skills|Research Interests|研究興趣|Technical Skills|Technologies and Tools|技術與工具/);
}
assert.deepEqual(groupsByLocale.en, groupsByLocale['zh-TW'], 'All yearly event identities and orders match across languages');
assert.equal(editorialVisible('experience', 'ais3-myfirstctf-2025'), false, 'Reject incorrect identity if encountered');
const eof = editorialData('experience', all.find(e => e.data.slug === 'ais3-eof-2026').data);
assert.equal(eof.startedAt, '2025-12-20', '2026 season preliminary belongs to actual 2025 calendar year');
console.log('PASS: protected source/design/assets/states, 35 routes, all-year chronological competition order, bilingual records/results, no MyFirstCTF2025 or removed About sections');
