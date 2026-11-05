import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
const fingerprints = JSON.parse(readFileSync(new URL('./privacy-fingerprints.json', import.meta.url), 'utf8'));
const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(item => item.isDirectory() ? walk(join(dir, item.name)) : [join(dir, item.name)]);
const files = walk(process.env.VALIDATE_DIR || 'dist').filter(p => /\.(html|json|xml|js|css|svg|txt)$/.test(p));
let violations = 0;
for (const file of files) {
  const text = readFileSync(file, 'utf8');
  if (/oscp|from-ctf-to-/i.test(text)) violations++;
  const normalized = text.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]/g, '');
  for (const { length, hash } of fingerprints) {
    for (let i = 0; i <= normalized.length - length; i++) {
      if (createHash('sha256').update(normalized.slice(i, i + length)).digest('hex') === hash) { violations++; break; }
    }
  }
}
assert.equal(violations, 0, 'Public output contains a withdrawn topic or a private identity fingerprint (values intentionally not logged)');
console.log('Public HTML, metadata, scripts, sitemap, RSS and search identity/withdrawal scan: PASS');
