import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { parse } from 'yaml';
import { z } from 'astro/zod';
import { createContentSchemas, coverPath, selectPublished } from '../src/lib/content-schema.ts';

const mode = process.argv[2] ?? '--strict';
assert.ok(process.argv.length <= 3 && ['--strict', '--import', '--originals-only', '--editorial'].includes(mode),
  'Use no flag (strict), --strict, --originals-only, or --editorial. --import is only for an initial migration.');

const commit = '952f05507d1a6115e8fc561eb8417eaec91b8c28';
const repository = 'https://github.com/nagitw/Nagi.tw';
const root = 'docs/security-migration';
const manifestPath = `${root}/manifest.json`;
const sources = [
  ['security', 'retail-work-sme-security-culture', 'd6ae9e849e7877d04e74498392edbc5648c5ab43', 'What a Retail Job Taught Me About the Security Gaps Small Businesses Often Miss'],
  ['ctf', 'ctf-meets-malware-analysis-windows', '16bdb4684071f8ecb5e5a11c03ab169e6917bc33', 'When CTF Meets Malware Analysis: My First Windows Malware Analysis'],
  ['research', 'infosec-taiwan-2026-student-industry-gap', '350f7ff39fb491435e8eb9d4cbca9d134d3c4d9c', 'What InfoSec Taiwan 2026 Showed Me About the Gap Between Students and Industry'],
  ['research', 'nurse-made-me-rethink-medical-cybersecurity', '7d97df0ef490a24a005c11bc306a488b8d2adbf0', 'A Nurse Made Me Rethink Medical Cybersecurity'],
  ['security', '2026-security-conference', '12b7f0904c56abaef1dba61b9daf3690151954db', 'Reflections from the 2026 Cybersecurity Conference: Seeing the Real Shape of the Security Industry'],
].map(([category, slug, blob, title]) => ({ source: `articles/${category}/${slug}.en.md`, slug, blob, title, snapshot: `${root}/originals/${slug}.en.md`, destination: `src/content/journal/${slug}.md` }));
const image = { source: 'public/assets/images/cybersec-2026.jpg', destination: 'public/assets/images/cybersec-2026.jpg', blob: 'b81ae84f8607b64a6cab2e829280cd44b6cab095' };
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
const blobHash = bytes => createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex');
function split(bytes) {
  const text = bytes.toString('utf8');
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/.exec(text);
  assert.ok(match, 'YAML frontmatter required');
  return { header: match[1], data: parse(match[1]), body: Buffer.from(text.slice(match[0].length), 'utf8') };
}
function files(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? files(join(directory, entry.name)) : [join(directory, entry.name).replaceAll('\\', '/')]);
}
function exclusive(path, bytes) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, bytes, { flag: 'wx' });
}
async function download(path, expectedBlob) {
  const response = await fetch(`https://raw.githubusercontent.com/nagitw/Nagi.tw/${commit}/${path}`);
  assert.ok(response.ok, `${path}: HTTP ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  assert.equal(blobHash(bytes), expectedBlob, `${path}: pinned Git blob`);
  return bytes;
}

if (mode === '--import') {
  assert.ok(!existsSync(manifestPath), 'Refusing to re-import an existing migration');
  const existing = files('src/content').map(path => ({ path, sha256: sha256(readFileSync(path)) }));
  const entries = existing.filter(({ path }) => /\.mdx?$/.test(path)).map(({ path }) => ({ path, ...split(readFileSync(path)).data }));
  for (const article of sources) {
    assert.ok(!existsSync(article.destination) && !existsSync(article.snapshot), `Path collision: ${article.slug}`);
    assert.ok(!entries.some(entry => entry.slug === article.slug || entry.title === article.title), `Content collision: ${article.slug}`);
  }
  assert.ok(!existsSync(image.destination), 'Refusing to overwrite an existing image');
  // Fetch and verify everything before creating any article or image.
  const originals = await Promise.all(sources.map(article => download(article.source, article.blob)));
  const imageBytes = await download(image.source, image.blob);
  const prepared = sources.map((article, index) => {
    const original = originals[index];
    const { header, data, body } = split(original);
    assert.equal(data.title, article.title);
    assert.equal(data.slug, article.slug);
    assert.equal(data.site_lang, 'en');
    assert.ok(!('status' in data) && !('publishedAt' in data) && !('kind' in data));
    let adapted = header;
    if (data.cover) {
      assert.equal(data.cover, '/assets/images/cybersec-2026.jpg');
      adapted = adapted.replace(/^cover: .+$/m, 'cover: ../../../public/assets/images/cybersec-2026.jpg');
      adapted += '\ncoverAlt: "CYBERSEC 2026 conference signage"';
    }
    adapted += `\npublishedAt: "${data.date}"`;
    if (data.updated) adapted += `\nupdatedAt: "${data.updated}"`;
    adapted += '\nstatus: draft\nkind: essay';
    const output = Buffer.concat([Buffer.from(`---\n${adapted}\n---\n`), body]);
    createContentSchemas(coverPath).journal.parse(split(output).data);
    return { article, original, output, body };
  });
  for (const { article, original, output } of prepared) {
    exclusive(article.snapshot, original);
    exclusive(article.destination, output);
  }
  exclusive(image.destination, imageBytes);
  exclusive(manifestPath, JSON.stringify({ repository, branch: 'backup/pre-v3.1-main', commit, collisionCheck: 'No destination path, title, slug, or image collisions', existingContent: existing, articles: prepared.map(({ article, original, output, body }) => ({ ...article, sourceSha256: sha256(original), destinationSha256: sha256(output), bodySha256: sha256(body) })), images: [{ ...image, sha256: sha256(imageBytes) }] }, null, 2) + '\n');
  console.log('Imported exactly five original English articles as drafts and one original cover.');
}

const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
assert.equal(manifest.commit, commit);
assert.equal(manifest.articles.length, 5);
assert.equal(manifest.repository, repository);

// Immutable provenance is always verified, including in editorial mode.
for (const expected of sources) {
  const article = manifest.articles.find(item => item.slug === expected.slug);
  assert.ok(article, `Missing migration source: ${expected.slug}`);
  for (const key of ['source', 'destination', 'snapshot', 'blob', 'title']) assert.equal(article[key], expected[key]);
  const original = readFileSync(expected.snapshot);
  assert.equal(blobHash(original), expected.blob, `${expected.slug}: immutable source blob`);
  assert.equal(sha256(original), article.sourceSha256, `${expected.slug}: immutable source SHA-256`);
  assert.equal(sha256(split(original).body), article.bodySha256, `${expected.slug}: original body SHA-256`);
}
assert.equal(manifest.images.length, 1);
for (const asset of manifest.images) {
  assert.equal(asset.source, image.source);
  assert.equal(asset.destination, image.destination);
  assert.equal(asset.blob, image.blob);
  const bytes = readFileSync(image.destination);
  assert.equal(blobHash(bytes), image.blob);
  assert.equal(sha256(bytes), asset.sha256);
}
if (mode === '--originals-only') {
  console.log('PASS: 5 immutable source snapshots and 1 migrated image. Current articles, publication and routes NOT checked.');
  process.exit(0);
}

if (mode === '--editorial') {
  // This ledger records separately obtained approval; it cannot grant permission.
  // Never generate it automatically or rewrite the original migration manifest.
  const hash = z.string().regex(/^[a-f0-9]{64}$/);
  const nonempty = z.string().trim().min(1);
  const registrySchema = z.object({ version: z.literal(1), revisions: z.array(z.object({
    slug: z.enum(sources.map(source => source.slug)),
    previousSha256: hash, sha256: hash,
    approvedAt: z.iso.date(), approvalReference: nonempty, summary: nonempty,
  }).strict()) }).strict();
  const registryPath = `${root}/revisions.json`;
  const registry = registrySchema.parse(existsSync(registryPath)
    ? JSON.parse(readFileSync(registryPath, 'utf8')) : { version: 1, revisions: [] });
  for (const article of manifest.articles) {
    let expectedHash = article.destinationSha256;
    let previousApproval;
    for (const revision of registry.revisions.filter(item => item.slug === article.slug)) {
      assert.equal(revision.previousSha256, expectedHash, `${article.slug}: revision chain`);
      assert.notEqual(revision.sha256, revision.previousSha256, `${article.slug}: revision must change bytes`);
      assert.ok(!previousApproval || revision.approvedAt >= previousApproval, `${article.slug}: approval dates in order`);
      expectedHash = revision.sha256;
      previousApproval = revision.approvedAt;
    }
    const current = readFileSync(article.destination);
    assert.equal(sha256(current), expectedHash, `${article.slug}: unrecorded editorial change`);
    const data = createContentSchemas(coverPath).journal.parse(split(current).data);
    assert.equal(data.slug, article.slug, 'Migration identity cannot change');
    assert.equal(data.language, 'en', 'A translation must be a separate entry');
    assert.equal(data.publishedAt, split(readFileSync(article.snapshot)).data.date, 'Preserve original editorial date');
    assert.equal(data.status, 'draft', 'Editorial approval never grants publication');
    if (data.cover) assert.ok(existsSync(join(dirname(article.destination), data.cover)));
  }
  const slugs = new Set();
  for (const path of files('src/content/journal').filter(path => /\.mdx?$/.test(path))) {
    const data = createContentSchemas(coverPath).journal.parse(split(readFileSync(path)).data);
    const key = `${data.language}/${data.slug}`;
    assert.ok(!slugs.has(key), `Duplicate Journal slug: ${key}`);
    slugs.add(key);
    assert.equal(data.status, 'draft', `${path}: publication requires a separate future release review`);
    if (data.cover) assert.ok(existsSync(join(dirname(path), data.cover)));
  }
  console.log('PASS: immutable sources, explicit editorial hash chains, Journal schemas/unique slugs; all Journal entries remain draft. Approval authenticity requires human review.');
  process.exit(0);
}

const migrated = [];
for (const expected of sources) {
  const article = manifest.articles.find(item => item.slug === expected.slug);
  assert.ok(article);
  for (const key of ['source', 'destination', 'snapshot', 'blob', 'title']) assert.equal(article[key], expected[key]);
  const original = readFileSync(article.snapshot);
  const current = readFileSync(article.destination);
  assert.equal(blobHash(original), expected.blob);
  assert.equal(sha256(original), article.sourceSha256);
  assert.equal(sha256(current), article.destinationSha256);
  const before = split(original);
  const after = split(current);
  assert.deepEqual(after.body, before.body, `${article.slug}: exact body bytes, including code, links, whitespace, and headings`);
  assert.equal(sha256(after.body), article.bodySha256);
  for (const [key, value] of Object.entries(before.data)) {
    if (key === 'cover') continue;
    assert.deepEqual(after.data[key], value, `${article.slug}: original metadata ${key}`);
  }
  assert.equal(after.data.title, expected.title);
  assert.equal(after.data.publishedAt, before.data.date);
  assert.equal(after.data.updatedAt, before.data.updated);
  assert.equal(after.data.status, 'draft');
  const data = createContentSchemas(coverPath).journal.parse(after.data);
  if (data.cover) assert.ok(existsSync(join(dirname(article.destination), data.cover)));
  if (before.data.banner) assert.ok(existsSync(`public${before.data.banner}`));
  migrated.push({ data });
  console.log(`PASS ${article.slug}: original Git blob, body bytes, all source metadata, dates, schema, draft`);
}
assert.deepEqual(selectPublished(migrated), []);
const slugs = new Set();
for (const path of files('src/content/journal').filter(path => /\.mdx?$/.test(path))) {
  const { slug, language = 'en' } = split(readFileSync(path)).data;
  const key = `${language}/${slug}`;
  assert.ok(!slugs.has(key), `Duplicate Journal slug: ${key}`);
  slugs.add(key);
}
for (const original of manifest.existingContent) assert.equal(sha256(readFileSync(original.path)), original.sha256, `${original.path}: existing content unchanged`);
const journal = 'src/content/journal';
const expectedContent = [
  ...manifest.existingContent.map(item => item.path).filter(path => path.startsWith(`${journal}/`)),
  ...sources.map(item => item.destination),
].sort();
assert.deepEqual(files(journal).sort(), expectedContent, 'Exactly the five requested Journal articles were added');
assert.equal(manifest.images.length, 1);
for (const asset of manifest.images) {
  assert.equal(asset.source, image.source);
  assert.equal(asset.destination, image.destination);
  assert.equal(blobHash(readFileSync(asset.destination)), image.blob);
  assert.equal(sha256(readFileSync(asset.destination)), asset.sha256);
}
console.log(`PASS: 5/5 articles; exact original bodies (including all code and links); 1/1 image; ${manifest.existingContent.length} existing content files unchanged; unique slugs; all drafts excluded from publication.`);
