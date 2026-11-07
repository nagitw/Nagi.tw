import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { projectEntries, researchGroups } from '../src/lib/catalog.ts';
import { journalEntries, journalCategories } from '../src/lib/journal.ts';
import { sortEvents, sortExperienceBody } from '../src/lib/experience.ts';
import { publicRecords, publicRedirects } from '../src/lib/publication.ts';
import { publicBody } from '../src/lib/public-content.ts';
const records = JSON.parse(readFileSync('src/data/migrated.json', 'utf8'));
for (const locale of ['en', 'zh']) {
  assert.ok(!projectEntries(records, locale).some(e => e.path === '/projects/medical-cybersecurity/'));
  assert.ok(projectEntries(records, locale).some(e => e.path === '/systems/medtrust/'));
  const medical = researchGroups(records, locale).find(g => g.id === 'iot-security').entries;
  assert.deepEqual(medical.map(e => e.path), ['/research/archive-notes/']);
  const journal = journalEntries(records, locale);
  assert.equal(new Set(journal.map(e => e.path)).size, journal.length);
  assert.equal(Object.keys(journalCategories).length, 4);
  assert.ok(journal.every(e => e.category in journalCategories));
  assert.equal(journal.find(e => e.path.includes('nurse-made')).category, 'medical');
  assert.deepEqual(journal.map(e=>e.record.date), [...journal].map(e=>e.record.date).sort().reverse());
}
assert.deepEqual(journalEntries(records, 'zh').map(e=>e.category), journalEntries(records, 'en').map(e=>e.category));
const events = [
  { id: 'undated26', year: '2026', datePrecision: 'year' },
  { id: 'old', year: '2024', datePrecision: 'day', eventDate: '2024-12-31' },
  { id: 'late', year: '2026', datePrecision: 'day', eventDate: '2026-09-01' },
  { id: 'early', year: '2026', datePrecision: 'day', eventDate: '2026-02-01' },
  { id: 'month', year: '2026', datePrecision: 'month', eventDate: '2026-12' },
  { id: 'undated25', year: '2025', datePrecision: 'year' },
];
assert.deepEqual(sortEvents(events).map(e=>e.id), ['late','early','month','undated26','undated25','old']);
assert.deepEqual(sortEvents([...events].reverse()), sortEvents(events), 'Input order is never the chronological key');
const prose = '# Events\n\n### Older\n\n* Year: 2025\n* Role: Attendee\n\n### Newer\n\n* Year: 2026\n* Role: Student';
assert.ok(sortExperienceBody(prose, 'en').indexOf('### Newer') < sortExperienceBody(prose, 'en').indexOf('### Older'));
for (const route of ['/roadmap/', '/zh/roadmap/', '/future/']) {
  assert.deepEqual(publicRecords([{ route, publicationStatus: 'published' }]), []);
  assert.deepEqual(publicRedirects([{route:'/example/', publicationStatus:'published', aliases:[route]}]), {});
}
console.log('Catalog deduplication, single Journal categories, plan withdrawal and date-precision ordering: PASS');
for (const record of records) {
  const body = publicBody(record);
  assert.ok(!/when I build websites, backends, AI APIs|If I have the chance to continue working|如果未來我還有機會/.test(body), 'Bilingual personal-plan sentences are removed too');
  assert.ok(!/Next, I Want to Build My Own Malware Lab|接下來想建立自己的 Malware Lab|十八、對我未來方向的影響|18\. How This Affected My Future Direction|未來如果我要做醫療資安專題|If I work on a medical cybersecurity project in the future/.test(body));
  if (record.kind === 'experience') {
    const years = [...body.matchAll(/^## (\d{4})/gm)].map(match=>match[1]);
    assert.deepEqual(years, [...years].sort().reverse());
  }
}
