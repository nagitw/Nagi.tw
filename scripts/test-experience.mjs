import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { publicExperience, sortEvents } from '../src/lib/experience.ts';
const records = JSON.parse(readFileSync('src/data/experience-archive.json', 'utf8'));
assert.equal(new Set(records.map(r => r.id)).size, records.length);
assert.equal(records.length, 79, 'All original assertions remain');
assert.equal(createHash('sha256').update(JSON.stringify(records.map(({learningReconciliation, ...original}) => original))).digest('hex'),
 '9f6991a7827508c24dbe14ee1aaf9094ff9742580158c93e2f086cda84dc66bf',
 'All 014fb6a source assertions, roles, dates, prior reconciliations and publication states must remain unchanged');
assert.equal(createHash('sha256').update(JSON.stringify(records.map(({ctfResultAssertions, learningReconciliation, ...original}) => original))).digest('hex'),
 '1e86142adf6dde9b0f4a9e16668f939f98f61901dc2fe31618dd338b249ded02',
 'The entire b670bbe baseline, including prior reconciliations and publication states, must remain unchanged');
// Frozen 5c50af7 payload: no Git history needed at runtime, including shallow CI.
const original = records.map(record => {
 const { yearVerification, participationVerification, awardVerification, verificationSource,
   reviewStatus, supersededBy, excludeFromParticipationCount, originalReviewNotes, historicalReconciliation, ctfResultAssertions, learningReconciliation, ...source } = record;
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
const ctfResults = [
 ['archive-012','BroncoCTF 2026',49,3307,'unknown','user-reported','2026'],
 ['archive-011','Junior.Crypt 2026',147,1613,'unknown','user-reported','2026'],
 ['archive-014','K17 CTF',55,1450,'unknown','user-reported',null],
 ['archive-015','picoCTF 2026',1007,8748,'unknown','user-reported','2026'],
 ['archive-029','LA CTF 2026',9,null,'team','source-recorded','2026'],
 ['archive-030','Srdnlen CTF Quals 2026',17,null,'team','source-recorded','2026'],
 ['archive-031','DiceCTF Quals 2026',23,null,'team','source-recorded','2026'],
];
for (const [id,name,rank,denominator,unit,status,year] of ctfResults) {
 const record = byId(id);
 assert.equal(record.ctfResultAssertions.length, 1);
 const result = record.ctfResultAssertions[0];
 assert.equal(result.eventName, name);
 assert.equal(result.year, year);
 assert.equal(result.rank, rank);
 assert.equal(result.rankDenominator, denominator);
 assert.equal(result.rankingUnit, unit);
 assert.equal(result.rankDenominatorUnit, 'unknown');
 assert.equal(result.participationVerification, status);
 assert.equal(result.resultVerification, status);
 assert.equal(result.team, null);
 assert.deepEqual(result.evidenceUrls, []);
 assert.equal(result.publicationStatus, 'draft');
 assert.equal(result.award, undefined);
 assert.equal(result.totalParticipants, undefined);
 assert.equal(result.totalTeams, undefined);
 assert.ok(result.sourceReferences.length);
 assert.equal(result.sourceAssertion, denominator === null ? `Team Rank #${rank}` : `${rank} / ${denominator}`);
 assert.equal(publicExperience([result]).length, 0);
}
assert.equal(byId('archive-014').verificationStatus, 'candidate-only');
assert.equal(byId('archive-014').year, null);
assert.equal(byId('archive-014').role, 'unknown');
assert.ok(byId('archive-014').sourceAssertion.includes('No matching participation record'));
const learning = records.filter(r=>Number(r.id.slice(-3))>=32 && ['training','conferences','speaking','teaching'].includes(r.category));
assert.equal(learning.length,44);
for (const r of learning) {
 const review=r.learningReconciliation;
 assert.ok(review, `Missing learning review: ${r.id}`);
 assert.equal(review.category,r.category);
 assert.equal(review.sourceRole,r.role);
 assert.equal(review.verificationStatus,'source-recorded');
 assert.equal(review.eventDate,r.id==='archive-035' ? '2026-07-07' : null);
 assert.equal(review.dateVerification,r.id==='archive-035' ? 'source-recorded' : 'pending');
 assert.equal(review.officialEvidenceReview,'pending');
 assert.equal(review.activityIdentityReview,'pending');
 assert.equal(review.teachingRoleReview,['speaking','teaching'].includes(r.category)?'pending':'not-applicable');
 assert.ok(review.reviewedSourceReferences.length>0);
 for (const relation of [...review.aliasCandidate,...review.relatedEventId]) {
  assert.ok(byId(relation.eventId));
  assert.notEqual(relation.confirmedSameEvent,true);
  assert.ok(relation.sourceReferences.length);
 }
 for (const relation of review.aliasCandidate) {
  assert.equal(r.year,byId(relation.eventId).year,'Never collapse editions');
  assert.equal(relation.relationshipReview,'pending');
 }
}
for (const [a,b] of [[36,60],[37,38],[44,45],[46,79],[43,61],[50,51],[52,53],[48,77],[49,77],[78,8]]) {
 const r=byId(`archive-${String(a).padStart(3,'0')}`);
 assert.ok(r.learningReconciliation.aliasCandidate.some(x=>x.eventId===`archive-${String(b).padStart(3,'0')}`));
}
assert.ok(!byId('archive-048').learningReconciliation.aliasCandidate.some(x=>x.eventId==='archive-049'));
assert.equal(byId('archive-048').learningReconciliation.relatedEventId.find(x=>x.eventId==='archive-049').relationshipType,'distinct-location-session');
for (const [id,role] of [[71,'speaker'],[72,'Instructor'],[73,'Instructor'],[74,'Teaching assistant'],[75,'Support staff'],[76,'Support staff']]) {
 const review=byId(`archive-0${id}`).learningReconciliation;
 assert.ok(review.roleAssertions.some(a=>a.text===role));
 assert.equal(review.actualEventTitle,null);
 assert.equal(review.eventDate,null);
}
console.log('Experience source preservation, reported awards, superseded years and publication gates: PASS');
