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
   reviewStatus, supersededBy, excludeFromParticipationCount, originalReviewNotes, historicalReconciliation, ...source } = record;
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
 assert.equal(current.awardVerification, currentId === 'archive-017' ? 'pending' : 'user-reported');
 assert.notEqual(current.verificationStatus, 'confirmed', 'Year approval is not whole-record approval');
 assert.equal(old.year, oldYear, 'Keep the original erroneous source year');
 assert.equal(old.reviewStatus, 'superseded');
 assert.equal(old.supersededBy, currentId);
 assert.equal(old.excludeFromParticipationCount, true);
 assert.equal([current,old].filter(r=>r.excludeFromParticipationCount!==true && r.participationVerification==='user-confirmed').length,1);
}
const byId = id => records.find(r => r.id === id);
const expected = {
 'archive-001': ['最佳創新獎首席', '高雄市政府工程啟發獎', 'BEFIRING'],
 'archive-006': ['入圍決賽', '榮獲佳作'],
 'archive-005': ['大專組佳作', '高中職組入圍決賽', '大專組入圍決賽'],
 'archive-008': ['AIS3 Club', '挖蛋專家獎'],
 'archive-009': ['第一等第一名（創意獎）'],
 'archive-010': ['積分獎佳作'],
};
for (const [id, values] of Object.entries(expected)) {
 const r = byId(id);
 assert.equal(r.awardVerification, 'user-reported');
 assert.deepEqual(r.historicalReconciliation.assertions.filter(a=>a.verificationStatus==='user-reported').map(a=>a.text), values);
 for (const assertion of r.historicalReconciliation.assertions) {
  assert.ok(['user-reported','source-recorded'].includes(assertion.verificationStatus));
  assert.ok(assertion.sourceReference);
 }
 assert.equal(r.historicalReconciliation.officialVerification, 'pending');
}
const ftc = byId('archive-001');
assert.equal(ftc.team, undefined);
assert.equal(ftc.placement, undefined);
assert.equal(ftc.historicalReconciliation.awardRelationship, 'unresolved');
assert.ok(ftc.sourceAssertion.includes('最佳創意獎首席'), 'Keep old wording distinct from new user report');
assert.ok(ftc.historicalReconciliation.assertions.every(a=>a.team===undefined && a.placement===undefined));
assert.deepEqual(byId('archive-005').historicalReconciliation.assertions.map(a=>[a.kind,a.divisionZh]), [['award','大專組'],['stage','高中職組'],['stage','大專組']]);
assert.equal(byId('archive-005').historicalReconciliation.titleEnVerification, 'pending-translation');
assert.ok(byId('archive-008').historicalReconciliation.assertions.some(a=>a.text==='OSINT Excellence Award' && a.verificationStatus==='source-recorded'));
assert.equal(byId('archive-008').historicalReconciliation.translationEquivalence, 'unresolved');
for (const [id, stage] of [['archive-009','新北市賽'], ['archive-010','全國賽']]) {
 assert.equal(byId(id).year, '2024');
 assert.equal(byId(id).historicalReconciliation.assertions[0].stageZh, stage);
 assert.equal(byId(id).placement, undefined);
}
assert.equal(byId('archive-078').historicalReconciliation.excludeFromParticipationCount, true);
assert.ok(byId('archive-078').sourceAssertion.includes('16 Hours'));
assert.equal(publicExperience(records).length, 0);
console.log('Experience source preservation, reported awards, superseded years and publication gates: PASS');
