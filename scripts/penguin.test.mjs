import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const svg = readFileSync('public/nagi-penguin.svg');
assert.equal(createHash('sha256').update(svg).digest('hex'), 'b96fcf6e5f71019f2b667fee7c352bdc8fa1bc60289ef317f3fa0214030512a4', 'Original mascot asset must remain byte-identical');
assert.equal(createHash('sha1').update(`blob ${svg.length}\0`).update(svg).digest('hex'), '4bc3390d5023defb6391e6070fd7989801a51a66', 'Pinned upstream Git blob');
const component = readFileSync('src/components/Penguin.astro', 'utf8');
const paths = source => [...source.matchAll(/\bd="([^"]+)"/g)].map(match => match[1]);
const originalPaths = paths(svg.toString('utf8'));
const [leftWing, rightWing] = originalPaths[1].split('zm20 0');
assert.deepEqual(paths(component), [originalPaths[0], leftWing + 'z', 'M22 10' + rightWing, ...originalPaths.slice(2)], 'Rendered inline silhouette must match original artwork');
assert.doesNotMatch(component, /fetch\(|https?:|penguin-ai|data-chat|aria-haspopup|setInterval/);
assert.match(component, /prefers-reduced-motion/);
assert.match(component, /aria-expanded/);
assert.match(component, /aria-controls="penguin-greeting"/);
assert.match(component, /role="status"/);
assert.match(readFileSync('src/components/Footer.astro', 'utf8'), /<Penguin\s*\/>/);
console.log('PASS: preserved original penguin asset, frontend-only greeting, motion and accessibility contract');
