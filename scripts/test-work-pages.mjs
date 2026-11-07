import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const root = process.env.VALIDATE_DIR || 'dist';
const base = (process.env.SITE_BASE || '/').replace(/\/$/, '');
for (const prefix of ['', 'zh/']) {
  const projects = readFileSync(`${root}/${prefix}projects/index.html`, 'utf8');
  const research = readFileSync(`${root}/${prefix}research/index.html`, 'utf8');
  const detail = readFileSync(`${root}/${prefix}systems/medtrust/index.html`, 'utf8');
  for (const html of [projects, research]) {
    assert.ok(html.includes('data-work-card'), 'Real card markup rendered');
    assert.ok(!/Nagi CLI|BugTraceAI|OSCP|draft|review/.test(html), 'Private titles and editorial states absent');
    assert.ok(html.includes(`href="${base}/${prefix}technical-reports/"`), 'Base-aware technical report entry');
  }
  assert.ok(projects.includes('id="medtrust"'), 'Existing project anchor preserved');
  assert.ok(research.includes('id="medical-iot"'), 'Homepage research anchor preserved');
  for (const field of ['iot-security', 'web-security', 'ctf-practice', 'embedded-systems']) assert.ok(research.includes(`id="${field}"`));
  assert.ok(!research.includes('href="#ai-security"') && !research.includes('href="#5g-security"'), 'No empty categories');
  assert.ok(detail.includes(`href="${base}/zh/journal/series/medtrust/00/"`), 'Related journal links to actual published language');
  assert.ok(detail.includes(`href="${base}/${prefix}technical-reports/evidence-integrity-archive/"`), 'Independently approved technical report');
  for (const slug of ['nagi-cli', 'bugtraceai', 'nagi-notes']) assert.ok(!existsSync(`${root}/${prefix}projects/${slug}/index.html`), 'No draft placeholder routes');
}
console.log('Projects/Research cards, categories, related records and draft route exclusion: PASS');
