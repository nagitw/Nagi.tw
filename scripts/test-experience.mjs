import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { publicExperience, sortEvents } from '../src/lib/experience.ts';
const records = JSON.parse(readFileSync('src/data/experience-archive.json', 'utf8'));
assert.equal(new Set(records.map(r => r.id)).size, records.length);
assert.ok(records.length >= 70);
const audit = readFileSync('docs/experience-audit.md', 'utf8');
const inventory = audit.split('## Competition inventory')[1].split('## Teaching and publication conflicts')[0];
for (const line of inventory.split('\n').filter(line => line.startsWith('| ') && !line.startsWith('| Event'))) {
 const title = line.split('|')[1].trim();
 assert.ok(records.some(record => record.titleZh === title), `Missing audit row: ${title}`);
}
const fixture = { year: '2026', datePrecision: 'year', publicationStatus: 'published', verificationStatus: 'confirmed' };
assert.equal(publicExperience([fixture, {...fixture, verificationStatus:'candidate-only'}, {...fixture, verificationStatus:'conflicted'}, {...fixture, publicationStatus:'draft'}, {...fixture, publicationStatus:'review'}]).length, 1);
assert.deepEqual(sortEvents([
 {id:'old',year:'2025',datePrecision:'day',eventDate:'2025-12-31'},
 {id:'year',year:'2026',datePrecision:'year'},
 {id:'day',year:'2026',datePrecision:'day',eventDate:'2026-02-01'},
 {id:'month',year:'2026',datePrecision:'month',eventDate:'2026-11'},
]).map(r=>r.id), ['month','day','year','old']);
for (const r of records) {
 assert.ok(r.titleZh && r.titleEn && r.sourceReferences.length);
 assert.ok(['competitions','ctf','training','conferences','speaking','teaching'].includes(r.category));
 assert.equal(r.publicationStatus, 'draft');
 if (r.datePrecision === 'year') assert.equal(r.eventDate, undefined);
 if (r.verificationStatus === 'candidate-only') assert.equal(r.role, 'unknown');
}
assert.equal(records.find(r=>r.titleEn==='picoCTF').rankingUnit, 'unknown');
assert.equal(records.find(r=>r.titleEn==='picoCTF').totalParticipants,8748);
assert.equal(records.find(r=>r.titleEn.includes('MARC')).placement,undefined);
for (const [name, years] of [['FIRST Tech Challenge', ['2024','2026']], ['Ilan', ['2025','2026']], ['MyFirstCTF', ['2025','2026']]]) {
 for (const year of years) assert.ok(records.some(r=>r.titleEn.includes(name) && r.year===year), `Missing edition: ${name} ${year}`);
}
console.log('Experience archive, independent approval gates and chronological ordering: PASS');
