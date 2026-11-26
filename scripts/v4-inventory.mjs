import { createHash } from 'node:crypto';
import {
  readFileSync,
  readdirSync,
  mkdirSync,
  writeFileSync,
  existsSync,
} from 'node:fs';
import { execFileSync } from 'node:child_process';
const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(`${dir}/${e.name}`) : [`${dir}/${e.name}`],
  );
const files = [...walk('src/content'), ...walk('public')];
const hashes = Object.fromEntries(
  files.map((file) => [
    file,
    createHash('sha256').update(readFileSync(file)).digest('hex'),
  ]),
);
const routes = walk('dist')
  .filter((p) => p.endsWith('.html'))
  .map((p) => p.slice(5));
const path = 'docs/v4/baseline.json';
if (process.argv.includes('--capture')) {
  if (existsSync(path)) throw new Error('Baseline already exists');
  mkdirSync('docs/v4', { recursive: true });
  writeFileSync(
    path,
    JSON.stringify(
      {
        commit: execFileSync('git', ['rev-parse', 'HEAD'], {
          encoding: 'utf8',
        }).trim(),
        hashes,
        routes,
      },
      null,
      2,
    ) + '\n',
  );
  console.log(
    `Captured ${files.length} source/assets and ${routes.length} HTML routes`,
  );
} else {
  const baseline = JSON.parse(readFileSync(path, 'utf8'));
  const missing = Object.keys(baseline.hashes).filter((p) => !existsSync(p));
  const changed = Object.keys(baseline.hashes).filter(
    (p) => existsSync(p) && hashes[p] !== baseline.hashes[p],
  );
  const lostRoutes = baseline.routes.filter((p) => !routes.includes(p));
  console.log(
    JSON.stringify(
      {
        missing,
        changed,
        lostRoutes,
        sourceAssets: files.length,
        htmlRoutes: routes.length,
      },
      null,
      2,
    ),
  );
  if (missing.length || changed.length || lostRoutes.length)
    process.exitCode = 1;
}
