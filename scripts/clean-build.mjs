import { rmSync, lstatSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const target = resolve(root, 'dist');
if (dirname(target) !== root || (existsSync(target) && lstatSync(target).isSymbolicLink())) throw new Error('Unsafe build output');
rmSync(target, { recursive: true, force: true });
