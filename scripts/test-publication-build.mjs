import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { projectLeadEditions } from '../src/lib/project-leads.ts';
import { publicRecords } from '../src/lib/publication.ts';
const root = process.env.VALIDATE_DIR || 'dist';
const base = (process.env.SITE_BASE || '/').replace(/\/$/, '');
const leads = JSON.parse(readFileSync('src/data/project-leads.json', 'utf8'));
const records = JSON.parse(readFileSync('src/data/migrated.json', 'utf8'));
const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(item => item.isDirectory() ? walk(join(dir, item.name)) : [join(dir, item.name)]);
const artifacts = walk(root).filter(path => /\.(html|json|xml|js|map|txt|css|svg)$/.test(path));
const privateRoutes = [
  ...leads.filter(item => item.publicationStatus !== 'published').flatMap(item => [`/projects/${item.slug}/`, `/zh/projects/${item.slug}/`]),
  ...records.filter(item => item.publicationStatus !== 'published').flatMap(item => [item.route, ...(item.aliases ?? [])]),
];
for (const route of privateRoutes) assert.ok(!existsSync(join(root, route.slice(1), 'index.html')), 'No private route artifact');
for (const path of artifacts) {
  const body = readFileSync(path, 'utf8');
  for (const route of privateRoutes) assert.ok(!body.includes(base + route), `Private route reference in ${path}`);
  assert.ok(!/Nagi CLI|BugTraceAI|oscp|from-ctf-to-/i.test(body), `Private project or withdrawn topic in ${path}`);
  for (const record of records.filter(item => item.publicationStatus !== 'published')) {
    if (record.body?.length > 80) assert.ok(!body.includes(record.body.slice(0, 80)), `Private source payload in ${path}`);
  }
}
const knowledge = JSON.parse(readFileSync(join(root, 'knowledge.json'), 'utf8'));
assert.ok(knowledge.length > 0);
const approved = publicRecords([...records, ...projectLeadEditions(leads)]);
for (const item of knowledge) assert.ok(approved.some(record => base + record.route === item.url), 'Public AI manifest contains approved editions only');
console.log('Built artifacts, private routes/payloads and public AI manifest: PASS');
