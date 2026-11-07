import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { publicExperience, sortEvents } from '../src/lib/experience.ts';
const records = JSON.parse(readFileSync('src/data/experience-archive.json', 'utf8'));
assert.equal(new Set(records.map(r => r.id)).size, records.length);
assert.equal(records.length, 79, 'All original assertions remain');
// Frozen 5c50af7 payload: no Git history needed at runtime, including shallow CI.
const original = records.map(record => {
 const { yearVerification, participationVerification, awardVerification, verificationSource,
   reviewStatus, supersededBy, excludeFromParticipationCount, originalReviewNotes, ...source } = record;
 if (originalReviewNotes !== undefined) source.reviewNotes = originalReviewNotes;
 return source;
});
assert.equal(createHash('sha256').update(JSON.stringify(original)).digest('hex'),
 'e7ed4e1ac89119e82f3a24899a2c45b16747635d7dab349b572cbcb9e91f0494',
 'All original assertions, source references, awards, notes and publication states must survive unchanged');
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
for (const [currentId, oldId, oldYear] of [['archive-001','archive-067','2024'], ['archive-006','archive-068','2025'], ['archive-017','archive-069','2025']]) {
 const current = records.find(r=>r.id===currentId);
 const old = records.find(r=>r.id===oldId);
 assert.equal(current.year, '2026');
 assert.equal(current.yearVerification, 'user-confirmed');
 assert.equal(current.participationVerification, 'user-confirmed');
 assert.equal(current.awardVerification, 'pending');
 assert.notEqual(current.verificationStatus, 'confirmed', 'Year approval is not whole-record approval');
 assert.equal(old.year, oldYear, 'Keep the original erroneous source year');
 assert.equal(old.reviewStatus, 'superseded');
 assert.equal(old.supersededBy, currentId);
 assert.equal(old.excludeFromParticipationCount, true);
 assert.equal([current,old].filter(r=>r.excludeFromParticipationCount!==true && r.participationVerification==='user-confirmed').length,1);
}
console.log('Experience archive, independent approval gates and chronological ordering: PASS');
