import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)]);
const sha=p=>createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const baseline=fs.readFileSync('docs/phase-9.3/run-20261122/isolated-root.txt','utf8').trim();
const originals=[...walk('src'),...walk('public'),...walk('scripts'),'package.json','package-lock.json','astro.config.mjs','tsconfig.json'];
for(const p of originals)assert.equal(sha(p),sha(path.join(baseline,p)),p+' unchanged from initial isolated copy');
const pages=walk('dist').filter(p=>p.endsWith('.html'));
assert.equal(pages.length,17);
const seo=[];
for(const p of pages){const h=fs.readFileSync(p,'utf8');const route=p.replaceAll('\\','/').replace(/^dist/,'').replace(/index.html$/,'').replace(/404.html$/,'404/');const expected='https://nagi.tw'+route;assert.ok(h.includes('rel="canonical" href="'+expected+'"'),p);seo.push({path:p,canonical:expected,alternates:[...h.matchAll(/hreflang="([^"]+)" href="([^"]+)"/g)].map(m=>[m[1],m[2]])});assert.ok(!/article-foundation-qa|reading-qa-zh|reading-qa-short|integration-published/.test(h),p+' no QA fixtures');}
assert.ok(!pages.some(p=>/journal[\\/].+[\\/]index.html$/.test(p)));
const migrated=JSON.parse(fs.readFileSync('docs/security-migration/manifest.json','utf8')).articles;
for(const a of migrated){assert.equal(sha(a.destination),a.destinationSha256);assert.match(fs.readFileSync(a.destination,'utf8'),/^status: draft$/m);}
for(const prefix of ['','zh/']){const h=fs.readFileSync('dist/'+prefix+'projects/bugtraceai-cli-contributions/index.html','utf8');for(const text of ['https://github.com/BugTraceAI/BugTraceAI-CLI/pull/9','https://github.com/BugTraceAI/BugTraceAI-CLI/pull/10'])assert.ok(h.includes(text));for(const lang of ['en','zh-TW','x-default'])assert.ok(h.includes('hreflang="'+lang+'"'));}
const results={status:'PASS',pages:pages.length,unchangedOriginalFiles:originals.length,migratedDrafts:migrated.map(a=>({path:a.destination,sha256:sha(a.destination)})),noJournalArticles:true,noQaFixtures:true,bugTraceAI:'both languages, source hashes and both PR links intact',seo};
fs.writeFileSync('docs/phase-9.3/run-20261122/publication.json',JSON.stringify(results,null,2)+'\n');console.log('PASS: 17 pages; '+originals.length+' original files unchanged; five draft hashes; no public Journal detail or QA fixtures; BugTraceAI and canonical/hreflang intact.');
