import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
const root = process.env.VALIDATE_DIR || 'dist';
const base = (process.env.SITE_BASE || '/').replace(/\/$/, '');
const walk = dir => readdirSync(dir, {withFileTypes:true}).flatMap(item=>item.isDirectory()?walk(join(dir,item.name)):[join(dir,item.name)]);
for (const path of walk(root).filter(path=>/\.(html|json|xml|js|css|txt|map)$/.test(path))) {
  const text = readFileSync(path,'utf8');
  assert.ok(!/when I build websites, backends, AI APIs|If I have the chance to continue working|如果未來我還有機會/.test(text), `Personal-plan sentences absent from ${path}`);
  assert.ok(!/\/roadmap\/|\/future\/|未來計畫|What are your future plans|A future independent assistant|future independent Raspberry Pi AI|Next, I Want to Build My Own Malware Lab|接下來想建立自己的 Malware Lab|十八、對我未來方向的影響|How This Affected My Future Direction/.test(text), `Private plans absent from ${path}`);
}
for (const prefix of ['', 'zh/']) {
  assert.ok(!existsSync(`${root}/${prefix}roadmap/index.html`));
  assert.ok(!existsSync(`${root}/${prefix}future/index.html`));
  const journal = readFileSync(`${root}/${prefix}journal/index.html`,'utf8');
  const categories = [...journal.matchAll(/data-journal-category="([^"]+)"/g)].map(match=>match[1]);
  assert.equal(categories.length,13);
  for (const category of ['cybersecurity','medical','perspectives','reflections']) {
    assert.ok(journal.includes(`data-journal-filter="${category}"`));
    assert.ok(categories.includes(category));
  }
  const dates = [...journal.matchAll(/<time datetime="([^"]+)"/g)].map(match=>match[1]);
  assert.deepEqual(dates,[...dates].sort().reverse());
  const projects = readFileSync(`${root}/${prefix}projects/index.html`,'utf8');
  assert.ok(!projects.includes('/projects/medical-cybersecurity/'));
  const research = readFileSync(`${root}/${prefix}research/index.html`,'utf8');
  const cards = [...research.matchAll(/class="work-card-link" href="([^"]+)"/g)].map(match=>match[1]);
  assert.equal(cards.filter(url=>url.includes('/research/archive-notes/')).length,1);
  for (const part of ['systems/medtrust','projects/medical-cybersecurity','labs/medical-cybersecurity-research','technical-reports/evidence-integrity-archive']) {
    assert.ok(!cards.some(url=>url.includes(part)), 'Medical dossier secondary records are links, not repeated cards');
    assert.ok(existsSync(`${root}/${prefix}${part}/index.html`), 'Original URLs retained');
    assert.ok(research.includes(`href="${base}/${prefix}${part}/"`), 'Related original remains discoverable');
  }
  const workshops = readFileSync(`${root}/${prefix}experience/workshops/index.html`,'utf8');
  const headings = [...workshops.matchAll(/<h2>(\d{4})/g)].map(match=>match[1]);
  assert.deepEqual(headings,['2026','2025']);
}
console.log('Built Journal categories, deduplicated dossiers, retained URLs, plan exclusion and experience years: PASS');
