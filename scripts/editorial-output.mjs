import { readdirSync, unlinkSync } from 'node:fs';
import { resolve, join, basename, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import policy from '../src/lib/editorial-policy.json' with { type: 'json' };

// Retain original source assets, but do not publish an unconfirmed-rights photo.
export default function editorialOutput() {
  return { name: 'editorial-output', hooks: { 'astro:build:done': ({ dir }) => {
    if (policy.conferenceImageRightsConfirmed) return;
    const root = resolve(fileURLToPath(dir));
    const walk = directory => readdirSync(directory, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(join(directory, entry.name)) : [join(directory, entry.name)]);
    for (const file of walk(root)) if (/^cybersec-2026\./.test(basename(file))) {
      if (!resolve(file).startsWith(root + sep)) throw new Error('Output path escaped build directory');
      unlinkSync(file);
    }
  } } };
}
