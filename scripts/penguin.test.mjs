import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';

const svg = readFileSync('public/nagi-penguin.svg');
assert.equal(createHash('sha256').update(svg).digest('hex'), 'b96fcf6e5f71019f2b667fee7c352bdc8fa1bc60289ef317f3fa0214030512a4', 'Original mascot asset must remain byte-identical');
assert.equal(createHash('sha1').update(`blob ${svg.length}\0`).update(svg).digest('hex'), '4bc3390d5023defb6391e6070fd7989801a51a66', 'Pinned upstream Git blob');
// The approved simplification removes the decorative UI, retaining its source asset.
const pages = readdirSync('dist', { recursive: true }).filter(path => path.endsWith('.html'));
for (const path of pages) assert.doesNotMatch(readFileSync(`dist/${path}`, 'utf8'), /data-penguin-toggle|penguin-signature/);
console.log(`PASS: original mascot artwork remains byte-identical; decorative UI absent from ${pages.length} pages`);
