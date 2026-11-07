import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { readFileSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { fetchNotesRss } from '../src/lib/notes-rss.ts';

const root = fileURLToPath(new URL('../', import.meta.url));
const fixture = `<rss><channel>${Array.from({ length: 4 }, (_, i) => `<item><title>Test note ${i} &amp; systems</title><link>https://notes.nagi.tw/articles/test-${i}/</link><description>&lt;script&gt;alert(1)&lt;/script&gt;</description><pubDate>Sun, 20 Sep 2026 00:00:00 GMT</pubDate></item>`).join('')}</channel></rss>`;
const server = createServer((request, response) => {
  if (request.url === '/rss.xml') response.writeHead(200, { 'content-type': 'application/rss+xml' }).end(fixture);
  else response.writeHead(503).end('Unavailable');
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const url = `http://127.0.0.1:${server.address().port}`;
const output = mkdtempSync(join(tmpdir(), 'nagi-v2-test-'));
try {
  assert.equal((await fetchNotesRss(`${url}/rss.xml`)).length, 4, 'Live fetch parses feed');
  assert.deepEqual(await fetchNotesRss(`${url}/unavailable`), [], 'Failed fetch falls back without throwing');
  for (const mode of ['rss.xml', 'unavailable', 'base']) {
    const exit = await new Promise((resolve, reject) => {
      const child = spawn(process.execPath, ['node_modules/astro/bin/astro.mjs', 'build', '--outDir', output], {
        cwd: root, env: { ...process.env, SITE_BASE: mode === 'base' ? '/studio/' : '/', NOTES_RSS_URL: `${url}/${mode === 'base' ? 'rss.xml' : mode}` }, stdio: 'pipe',
      });
      let log = '';
      child.stdout.on('data', (data) => { log += data; });
      child.stderr.on('data', (data) => { log += data; });
      child.on('error', reject);
      child.on('close', (code) => { if (code !== 0) console.error(log); resolve(code); });
    });
    assert.equal(exit, 0, `Build with ${mode}`);
    if (mode === 'base') {
      for (const script of ['scripts/validate-build.mjs', 'scripts/test-language.mjs', 'scripts/test-privacy.mjs', 'scripts/test-indexes.mjs', 'scripts/test-work-pages.mjs', 'scripts/test-content-build.mjs']) {
        const code = await new Promise((resolve, reject) => {
          const child = spawn(process.execPath, [script], { cwd: root, env: { ...process.env, SITE_BASE: '/studio/', VALIDATE_DIR: output }, stdio: 'inherit' });
          child.on('error', reject); child.on('close', resolve);
        });
        assert.equal(code, 0, `Repository-base verification: ${script}`);
      }
      continue;
    }
    const html = readFileSync(join(output, 'index.html'), 'utf8');
    assert.ok(!html.includes('Test note 0'), 'Unreviewed RSS cannot enter production pages');
    assert.ok(html.includes('/zh/journal/first-hackathon-in-university/'), 'Latest approved journal links to its actual edition');
    assert.equal((html.match(/data-content-entry/g) ?? []).length, 3, 'Homepage limits journal previews to three');

  }
  const invalid = await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ['node_modules/astro/bin/astro.mjs', 'build', '--outDir', output], { cwd: root, env: { ...process.env, PUBLIC_PENGUIN_AI_MODE: 'api', PUBLIC_PENGUIN_API_BASE_URL: '', PUBLIC_PENGUIN_API_URL: '' }, stdio: 'pipe' });
    let log = ''; child.stdout.on('data', d => log += d); child.stderr.on('data', d => log += d);
    child.on('error', reject); child.on('close', code => resolve({ code, log }));
  });
  assert.notEqual(invalid.code, 0, 'API mode without endpoint fails build');
  assert.ok(invalid.log.includes('API mode requires an explicit HTTPS endpoint'));
  console.log('RSS utility success/failure, approved local rendering and repository-base build: PASS');
} finally {
  server.close();
  // mkdtemp created this exact directory beneath the OS temporary directory.
  rmSync(output, { recursive: true, force: true });
}
