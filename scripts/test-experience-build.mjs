import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
const root = process.env.VALIDATE_DIR || 'dist';
const archive = JSON.parse(readFileSync('src/data/experience-archive.json','utf8'));
const walk = dir => readdirSync(dir,{withFileTypes:true}).flatMap(item=>item.isDirectory()?walk(join(dir,item.name)):[join(dir,item.name)]);
for (const path of walk(root).filter(p=>/\.(html|js|json|xml|txt|map)$/.test(p))) {
 const text=readFileSync(path,'utf8');
 for (const record of archive) assert.ok(!text.includes(record.id), `Draft archive payload leaked: ${path}`);
 assert.ok(!/candidate-only|sourceAssertion|experience-archive\.json|Junior Crypt CTF|Grodno::CTF|BroncoCTF|K17|HITCON CTF/.test(text), `Recovered private claim leaked: ${path}`);
 assert.ok(!/historicalReconciliation|BEFIRING|高雄市政府工程啟發獎|最佳創新獎首席|第一等第一名（創意獎）|積分獎佳作/.test(text), `Internal historical award reconciliation leaked: ${path}`);
 assert.ok(!/ctfResultAssertions|rankDenominator|Junior\.Crypt|49\s*\/\s*3307|147\s*\/\s*1613|55\s*\/\s*1450/.test(text), `Internal CTF result reconciliation leaked: ${path}`);
 assert.ok(!/learningReconciliation|aliasCandidate|confirmedSameEvent|teachingRoleReview|reviewedSourceReferences/.test(text), `Internal learning review metadata leaked: ${path}`);
}
for (const locale of ['', 'zh/']) {
 const html=readFileSync(join(root,locale,'experience/index.html'),'utf8');
 assert.equal((html.match(/data-event-year=/g)||[]).length,8);
 assert.equal((html.match(/data-date-precision="year"/g)||[]).length,8);
 assert.ok(html.includes('data-category="ctf"'));
 assert.ok(html.indexOf('id="year-2026"') < html.indexOf('id="year-2025"'));
 assert.ok(html.includes('id="experience-category"'));
 assert.ok(!html.includes('2026-07-07'), 'Recovered day remains draft');
}
console.log('Experience public HTML, bundles, search/RSS/sitemap and AI artifact isolation: PASS');
