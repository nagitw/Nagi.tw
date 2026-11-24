import test from 'node:test';
import assert from 'node:assert/strict';
import { cpSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
const load = async () => import('../src/lib/content-schema.ts');
const valid = { title: '示範', description: '結構測試', slug: 'demo', publishedAt: '2026-01-01', status: 'published', cover: '../assets/demo.svg', coverAlt: '示範圖形' };

test('optional content contracts preserve progress and evidence without publishing drafts or inventing facts', async () => {
  const { createContentSchemas, coverPath, selectPublished } = await load();
  const schemas = createContentSchemas(coverPath);
  const evidence = { label: 'Reviewed artifact', url: 'https://example.org/artifact', claim: 'Supports the described contribution' };
  const contribution = { description: 'Reviewed contribution', evidence: [evidence] };
  const cases = {
    projects: { role: 'Contributor', tools: ['Python'], developmentStatus: 'completed', evidence: [evidence] },
    research: { question: 'A question?', methods: ['Review'], researchArea: 'Security', institution: 'Public organization', team: 'Public team', researchStatus: 'completed', verifiedOutputs: [contribution], publications: [{ label: 'Public paper', url: 'https://example.org/paper' }] },
    experience: { organization: 'Public organization', role: 'Contributor', startedAt: '2025-01-01', responsibilities: ['Review changes'], verifiedContributions: [contribution] },
    journal: { kind: 'essay', category: 'security', evidence: [evidence] },
  };
  for (const [name, extra] of Object.entries(cases)) {
    const data = schemas[name].parse({ ...valid, status: 'draft', ...extra });
    for (const [key, value] of Object.entries(extra)) assert.deepEqual(data[key], value, `${name}/${key}: metadata retained`);
    assert.deepEqual(selectPublished([{ data }]), [], `${name}: progress/evidence never grants publication`);
  }
  const project = schemas.projects.parse({ ...valid, role: 'Contributor', tools: ['Python'] });
  assert.equal(project.developmentStatus, undefined);
  assert.equal(project.evidence, undefined);
  const research = schemas.research.parse({ ...valid, question: 'Why?', methods: ['Review'] });
  for (const key of ['researchArea', 'institution', 'team', 'researchStatus', 'verifiedOutputs', 'publications']) assert.equal(research[key], undefined);
  assert.equal(schemas.projects.safeParse({ ...project, developmentStatus: 'published' }).success, false);
  assert.equal(schemas.research.safeParse({ ...research, researchStatus: 'published' }).success, false);
  assert.equal(schemas.research.safeParse({ ...research, verifiedOutputs: [{ description: 'Unsupported', evidence: [] }] }).success, false);
  for (const bad of [{ ...evidence, claim: '' }, { ...evidence, url: 'javascript:alert(1)' }, { ...evidence, accessedAt: '2026-02-30' }]) {
    assert.equal(schemas.projects.safeParse({ ...project, evidence: [bad] }).success, false);
  }
});

test('profile accepts only optional public facts and About consumes the centralized bilingual biography', async () => {
  const { profileSchema } = await load();
  assert.ok(profileSchema, 'Public profile contract must exist');
  assert.deepEqual(profileSchema.parse({}), {});
  assert.equal(profileSchema.safeParse({ links: [{ label: 'Unsafe', url: 'javascript:alert(1)' }] }).success, false);
  assert.equal(profileSchema.safeParse({ biography: { en: '' } }).success, false);
  assert.equal(profileSchema.safeParse({ legalName: 'Not a public profile field' }).success, false);
  const { publicProfile, sections } = await import('../src/lib/sections.ts');
  const profile = profileSchema.parse(publicProfile);
  const about = sections.find(section => section.slug === 'about');
  assert.equal(about.note, profile.biography.en);
  assert.equal(about.zhNote, profile.biography['zh-TW']);
  for (const key of ['skills', 'links']) assert.equal(profile[key], undefined);
});

// Real verifier runs against disposable Windows temp fixtures, never live content.
function migrationFixture() {
  const directory = mkdtempSync(join(tmpdir(), 'nagi-migration-contract-'));
  for (const path of ['docs/security-migration', 'src/content', 'public']) cpSync(resolve(path), join(directory, path), { recursive: true });
  // Test-only inventory: unrelated project/research drafts may evolve after migration.
  // Retain all pinned Journal source/destination hashes and original Journal inventory.
  // The authoritative repository manifest is never written or rebased.
  const path = join(directory, 'docs/security-migration/manifest.json');
  const manifest = JSON.parse(readFileSync(path, 'utf8'));
  manifest.existingContent = manifest.existingContent.filter(item => item.path.startsWith('src/content/journal/'));
  writeFileSync(path, JSON.stringify(manifest));
  return directory;
}
function verifyFixture(directory, mode) {
  return spawnSync(process.execPath, [resolve('scripts/security-migration.mjs'), ...(mode ? [mode] : [])], { cwd: directory, encoding: 'utf8' });
}
function reviseFixture(directory) {
  const path = 'src/content/journal/retail-work-sme-security-culture.md';
  const current = readFileSync(join(directory, path));
  const revised = Buffer.concat([current, Buffer.from('\nEditorial test revision, not website content.\n')]);
  writeFileSync(join(directory, path), revised);
  return createHash('sha256').update(revised).digest('hex');
}
test('migration modes reject unknown flags and keep strict mode as the default', () => {
  const directory = migrationFixture();
  assert.equal(verifyFixture(directory).status, 0);
  assert.notEqual(verifyFixture(directory, '--unknown-mode').status, 0, 'Unknown flags must not silently select a weaker check');
  reviseFixture(directory);
  assert.notEqual(verifyFixture(directory).status, 0, 'Strict mode must reject changed destinations');
});
test('originals-only verifies immutable source blobs independently of editable destinations', () => {
  const directory = migrationFixture();
  reviseFixture(directory);
  const result = verifyFixture(directory, '--originals-only');
  assert.equal(result.status, 0, result.stderr);
  const snapshot = join(directory, 'docs/security-migration/originals/retail-work-sme-security-culture.en.md');
  writeFileSync(snapshot, 'Tampered original');
  assert.notEqual(verifyFixture(directory, '--originals-only').status, 0);
});
test('editorial mode requires an explicit hash chain and approval reference, never publication', () => {
  const directory = migrationFixture();
  const manifest = JSON.parse(readFileSync(join(directory, 'docs/security-migration/manifest.json'), 'utf8'));
  const article = manifest.articles.find(article => article.slug === 'retail-work-sme-security-culture');
  const hash = reviseFixture(directory);
  assert.notEqual(verifyFixture(directory, '--editorial').status, 0, 'Unrecorded revision must fail');
  const record = { slug: article.slug, previousSha256: article.destinationSha256, sha256: hash, approvedAt: '2026-11-23', approvalReference: 'Test-only approval record; not an authorization', summary: 'Test-only editorial change' };
  const registry = join(directory, 'docs/security-migration/revisions.json');
  const save = revisions => writeFileSync(registry, JSON.stringify({ version: 1, revisions }));
  save([record]);
  let result = verifyFixture(directory, '--editorial');
  assert.equal(result.status, 0, result.stderr);
  save([{ ...record, previousSha256: '0'.repeat(64) }]);
  assert.notEqual(verifyFixture(directory, '--editorial').status, 0);
  save([{ ...record, approvalReference: '' }]);
  assert.notEqual(verifyFixture(directory, '--editorial').status, 0);
  save([record, { ...record, slug: 'unknown-article' }]);
  assert.notEqual(verifyFixture(directory, '--editorial').status, 0);
  const path = join(directory, article.destination);
  writeFileSync(path, readFileSync(path, 'utf8').replace('status: draft', 'status: published'));
  save([{ ...record, sha256: createHash('sha256').update(readFileSync(path)).digest('hex') }]);
  assert.notEqual(verifyFixture(directory, '--editorial').status, 0, 'Editorial approval never permits publishing');
});

test('content defaults to English and accepts only supported language metadata', async () => {
  const { baseSchema } = await load();
  assert.equal(baseSchema.parse(valid).language, 'en');
  assert.equal(baseSchema.parse({ ...valid, language: 'zh-TW' }).language, 'zh-TW');
  for (const language of ['zh', 'zh-Hant', 'fr', '']) {
    assert.equal(baseSchema.safeParse({ ...valid, language }).success, false);
  }
});

test('journal supports original articles without covers while preserving image metadata validation', async () => {
  const { createContentSchemas, coverPath } = await load();
  const schemas = createContentSchemas(coverPath);
  const { cover, coverAlt, ...withoutCover } = valid;
  const journal = { ...withoutCover, kind: 'essay' };
  assert.ok(schemas.journal.safeParse(journal).success);
  assert.ok(schemas.journal.safeParse({ ...journal, cover, coverAlt }).success);
  assert.ok(schemas.journal.safeParse({
    ...journal, subtitle: 'Article subtitle', author: 'Public byline',
    references: [{ label: 'Astro docs', url: 'https://docs.astro.build/' }],
  }).success);
  assert.equal(schemas.journal.safeParse({
    ...journal, references: [{ label: 'Invalid reference', url: 'javascript:void(0)' }],
  }).success, false);
  for (const metadata of [{ cover }, { cover, coverAlt: '' }, { coverAlt }, { coverCaption: 'orphan caption' }, { cover: 'https://example.com/image.jpg', coverAlt }]) {
    assert.equal(schemas.journal.safeParse({ ...journal, ...metadata }).success, false);
  }
  for (const [name, fields] of Object.entries({ projects: { role: 'Contributor', tools: ['Python'] }, research: { question: 'Why?', methods: ['Review'] }, photography: { takenAt: '2026-01-01', images: [{ src: cover, alt: coverAlt }] }, experience: { organization: 'Example', role: 'Contributor', startedAt: '2026-01-01' } })) {
    assert.equal(schemas[name].safeParse({ ...withoutCover, ...fields }).success, false, `${name}: cover still required`);
  }
});
test('required fields, slug, status and calendar dates reject invalid content', async () => {
  const { baseSchema } = await load();
  assert.ok(baseSchema.safeParse(valid).success);
  for (const changes of [{ title: '' }, { description: ' ' }, { slug: '../bad' }, { slug: 'About' }, { status: 'private' }, { publishedAt: '2026-02-30' }, { publishedAt: 'yesterday' }, { status: undefined }, { publishedAt: undefined }, { updatedAt: '2025-12-31' }, { cover: '' }, { coverAlt: ' ' }, { tags: [''] }]) {
    assert.equal(baseSchema.safeParse({ ...valid, ...changes }).success, false, JSON.stringify(changes));
  }
  assert.ok(baseSchema.safeParse({ ...valid, status: 'archived', updatedAt: '2026-01-02' }).success);
  assert.ok(baseSchema.safeParse({ ...valid, status: 'draft' }).success);
});
test('publishing excludes drafts, sorts descending, and supports featured and tag filters', async () => {
  const { selectPublished } = await load();
  const entries = [
    { data: { ...valid, slug: 'old', publishedAt: '2025-01-01', featured: true, tags: ['notes'] } },
    { data: { ...valid, slug: 'draft', status: 'draft', publishedAt: '2027-01-01', featured: true, tags: ['notes'] } },
    { data: { ...valid, slug: 'new', publishedAt: '2026-01-01', featured: false, tags: ['design'] } },
    { data: { ...valid, slug: 'archive', status: 'archived', publishedAt: '2028-01-01', featured: true, tags: ['notes'] } },
  ];
  assert.deepEqual(selectPublished(entries).map(e => e.data.slug), ['new', 'old']);
  assert.deepEqual(selectPublished(entries, { featured: true }).map(e => e.data.slug), ['old']);
  assert.deepEqual(selectPublished(entries, { tag: 'design' }).map(e => e.data.slug), ['new']);
  assert.throws(() => selectPublished([entries[0], entries[0]]), /Duplicate slug/);
  const english = entries.find(entry => entry.data.status === 'published');
  const chinese = { data: { ...english.data, language: 'zh-TW' } };
  assert.deepEqual(selectPublished([english, chinese]), [english, chinese]);
});
test('each collection requires meaningful fields, image descriptions and valid periods', async () => {
  const { createContentSchemas, coverPath } = await load();
  const schemas = createContentSchemas(coverPath);
  const specifics = {
    projects: { role: '示範角色', tools: ['Astro'] },
    research: { question: '示範問題？', methods: ['文件分析'] },
    journal: { kind: 'note' },
    photography: { takenAt: '2026-01-01', images: [{ src: '../assets/demo.svg', alt: '示範圖形', caption: '示範圖說' }] },
    experience: { organization: '示範單位', role: '示範角色', startedAt: '2025-01-01' },
  };
  for (const [name, fields] of Object.entries(specifics)) {
    assert.equal(schemas[name].safeParse(valid).success, false, `${name}: specialized fields required`);
    assert.ok(schemas[name].safeParse({ ...valid, ...fields }).success, name);
    assert.equal(schemas[name].safeParse({ ...valid, ...fields, updatedAt: '2025-01-01' }).success, false);
  }
  assert.equal(schemas.experience.safeParse({ ...valid, ...specifics.experience, endedAt: '2024-01-01' }).success, false);
  assert.equal(schemas.photography.safeParse({ ...valid, ...specifics.photography, images: [{ src: '../assets/demo.svg', alt: '' }] }).success, false);
  assert.equal(schemas.research.safeParse({ ...valid, ...specifics.research, sources: ['not-a-url'] }).success, false);
});
