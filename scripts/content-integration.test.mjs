import assert from 'node:assert/strict';
import { existsSync, readFileSync, writeFileSync, unlinkSync, readdirSync } from 'node:fs';

// Temporary, uniquely named fixtures exercise real Astro loaders and rendering.
// Run prepare, npm run build, verify, then npm run build and empty.
// Builds run directly through the shell; this test never spawns child processes.
const names = ['projects', 'research', 'journal', 'photography', 'experience'];
const mode = process.argv[2] ?? 'verify';
const fixturePaths = names.flatMap(name => ['published', 'draft', 'archived'].map(status =>
  `src/content/${name}/integration-${status}.${name === 'journal' ? 'mdx' : 'md'}`));
const manifest = 'src/content/.integration-fixtures.json';
function cleanup() {
  if (!existsSync(manifest)) return;
  const owned = JSON.parse(readFileSync(manifest, 'utf8'));
  assert.ok(Array.isArray(owned) && owned.every(path => fixturePaths.includes(path)));
  for (const path of owned) if (existsSync(path)) unlinkSync(path);
  unlinkSync(manifest);
}
const html = path => readFileSync(`dist/${path ? `${path}/` : ''}index.html`, 'utf8');
const fields = {
  projects: 'role: Designer\ntools: [Astro]',
  research: 'question: How does this work?\nmethods: [Observation]\nsources: [https://docs.astro.build/]',
  journal: 'kind: note',
  photography: 'takenAt: "2026-01-01"\nlocation: Taipei\nimages:\n  - src: ../../../public/nagi.svg\n    alt: Gallery alt\n    caption: Gallery caption',
  experience: 'organization: Example\nrole: Designer\nstartedAt: "2025-01-01"',
};
if (mode === 'prepare') {
  assert.ok(!existsSync(manifest), 'Clean up previous fixtures first');
  for (const path of fixturePaths) assert.ok(!existsSync(path), `Refusing to overwrite ${path}`);
  const owned = [];
  writeFileSync(manifest, JSON.stringify(owned));
  try {
  for (const name of names) {
    for (const status of ['published', 'draft', 'archived']) {
      const slug = `integration-${status}`;
      const path = `src/content/${name}/${slug}.${name === 'journal' ? 'mdx' : 'md'}`;
      assert.ok(!existsSync(path), `Refusing to overwrite ${path}`);
      const body = name === 'journal' ? 'export const marker = "MDX rendered";\n\n## Body heading\n\n{marker}' : '## Body heading\n\nMarkdown **rendered**.';
      writeFileSync(path, `---\ntitle: ${name} ${status}\ndescription: Integration description\nslug: ${slug}\npublishedAt: "2026-01-01"\nupdatedAt: "2026-01-02"\nstatus: ${status}\nfeatured: true\ncover: ../../../public/nagi.svg\ncoverAlt: Cover alt\ncoverCaption: Cover caption\ntags: [integration-tag]\n${fields[name]}\n---\n\n${body}\n`);
      owned.push(path);
      writeFileSync(manifest, JSON.stringify(owned));
    }
  }
  } catch (error) { cleanup(); throw error; }
  console.log('Prepared 15 temporary fixtures. Build, then run test:content; cleanup is also available separately.');
} else if (mode === 'verify') {
  assert.ok(existsSync(manifest), 'Run test:content:prepare and build first');
  try {
  for (const name of names) {
    const listing = html(name);
    const chineseListing = html(`zh/${name}`);
    assert.ok(chineseListing.includes(`${name} published`));
    assert.ok(html('zh').includes(`${name} published`));
    assert.ok(listing.includes(`${name} published`));
    assert.ok(html('').includes(`${name} published`));
    for (const status of ['draft', 'archived']) {
      assert.ok(!existsSync(`dist/${name}/integration-${status}/index.html`));
      assert.ok(!listing.includes(`${name} ${status}`));
      assert.ok(!html('').includes(`${name} ${status}`));
      assert.ok(!existsSync(`dist/zh/${name}/integration-${status}/index.html`));
      assert.ok(!chineseListing.includes(`${name} ${status}`));
      assert.ok(!html('zh').includes(`${name} ${status}`));
    }
    if (name === 'experience') {
      assert.ok(listing.includes('Example'));
      assert.ok(!existsSync('dist/experience/integration-published/index.html'));
      continue;
    }
    const detail = html(`${name}/integration-published`);
    assert.ok(!existsSync(`dist/zh/${name}/integration-published/index.html`), 'No untranslated duplicate article');
    assert.ok(chineseListing.includes(`href="/${name}/integration-published/"`), 'Chinese list links to available English source');
    assert.ok(chineseListing.includes('本文提供英文版本。'));
    assert.ok(detail.includes(`href="/zh/${name}/" lang="zh-TW"`), 'Missing translation switch falls back to Chinese collection');
    assert.ok(!detail.includes('hreflang="zh-TW"'), 'Do not advertise a missing translation');
    for (const text of ['Body heading', 'Cover alt', 'Cover caption', 'integration-tag', '2026-01-02']) assert.ok(detail.includes(text), `${name}: ${text}`);
    assert.ok(listing.includes(`/${name}/integration-published/`));
    assert.ok(detail.includes(name === 'journal' ? 'MDX rendered' : '<strong>rendered</strong>'));
    if (name === 'photography') for (const text of ['Gallery alt', 'Gallery caption', 'Taipei']) assert.ok(detail.includes(text));
  }
  console.log('PASS: all five lists, featured, four detail routes, Markdown/MDX, metadata, gallery, draft/archive exclusion.');
  } finally { cleanup(); }
} else if (mode === 'cleanup') {
  cleanup();
} else if (mode === 'empty') {
const noPublished = names.every(name => readdirSync(`src/content/${name}`, { recursive: true })
  .filter(file => /\.(md|mdx)$/.test(file))
  .every(file => !/^status:\s*["']?published["']?\s*$/m.test(readFileSync(`src/content/${name}/${file}`, 'utf8').split('---')[1] ?? '')));
assert.ok(noPublished, 'Empty-state verification requires no published entries');
  for (const name of names) assert.ok(html(name).includes('empty-state'));
  for (const name of names) assert.ok(html(`zh/${name}`).includes('empty-state'));
  for (const path of fixturePaths) assert.ok(!existsSync(path), 'Temporary fixtures must be cleaned up');
  for (const name of names) {
    const slug = `draft-${name === 'projects' ? 'project' : name}-template`;
    assert.ok(!existsSync(`dist/${name}/${slug}/index.html`), `Draft route leaked: ${name}`);
    assert.ok(!existsSync(`dist/zh/${name}/${slug}/index.html`), `Chinese draft route leaked: ${name}`);
    assert.ok(!html(name).includes('待確認：'));
  }
  assert.ok(html('').includes('Featured work is being prepared'));
  console.log('PASS: empty collections and empty featured state. Final build: 15 pages.');
} else throw new Error(`Unknown mode: ${mode}`);
