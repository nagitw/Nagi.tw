import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { writeFileSync, mkdirSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { parse, stringify } from 'yaml';

export const publicRef = 'c54762236098c5c824ea73e26bd5829c222f25d2';
export const archiveRef = '952f05507d1a6115e8fc561eb8417eaec91b8c28';
export const sha256 = value => createHash('sha256').update(value).digest('hex');
export const gitFile = (ref, path) => execFileSync('git', ['show', `${ref}:${path}`], { maxBuffer: 30_000_000 });
const sourceUrl = (ref, path) => `https://github.com/nagitw/Nagi.tw/blob/${ref}/${path}`;

export async function recoveryRecords() {
  // Execute the pinned old public projection, including its private-plan filter.
  // No unpublished archive body or private source directory is imported.
  const scratch = mkdtempSync(join(tmpdir(), 'nagi-public-projection-'));
  for (const [file, source] of [['experience.ts', 'src/lib/experience.ts'], ['public-content.ts', 'src/lib/public-content.ts']]) {
    writeFileSync(join(scratch, file), gitFile(publicRef, source));
  }
  const { publicBody } = await import(pathToFileURL(join(scratch, 'public-content.ts')));
  writeFileSync(join(scratch, 'events.ts'), gitFile(archiveRef, 'src/lib/experience.ts'));
  const { additionalExperience } = await import(pathToFileURL(join(scratch, 'events.ts')));
  const original = JSON.parse(gitFile(publicRef, 'src/data/migrated.json'));
  const records = [];
  writeFileSync(join(scratch, 'publication.ts'), gitFile(publicRef, 'src/lib/publication.ts'));
  writeFileSync(join(scratch, 'research.ts'), gitFile(publicRef, 'src/data/research.ts').toString('utf8')
    .replace("'../lib/publication'", "'./publication.ts'"));
  const { getResearch } = await import(pathToFileURL(join(scratch, 'research.ts')));
  for (const [locale, language] of [['en', 'en'], ['zh', 'zh-TW']]) for (const area of getResearch(locale)) {
    const source = `${publicRef}:src/data/research.ts#${area.id}:${locale}`;
    records.push({ id: `${locale}-research-${area.id}`, collection: 'research', originalKind: 'research-area', source, sourceFile: 'src/data/research.ts',
      metadata: { title: area.title, description: area.summary, slug: area.id, language, status: 'published', recoveredFrom: source,
        ...(area.question ? { question: area.question } : {}), methods: [], sources: [sourceUrl(publicRef, 'src/data/research.ts')],
        tags: ['research'], featured: false }, body: area.summary });
  }
  for (const record of original) {
    if (record.publicationStatus !== 'published' || /\/(roadmap|future)\//i.test(record.route) || /oscp|from-ctf-to-/i.test(JSON.stringify(record))) continue;
    const collection = record.kind === 'project' ? 'projects' : ['research', 'lab'].includes(record.kind) ? 'research' : 'journal';
    const parts = record.route.split('/').filter(Boolean).filter(part => part !== 'zh');
    let slug = parts.at(-1);
    if (record.kind === 'experience') slug = `experience-${slug}`;
    if (/\/series\/medtrust\//.test(record.route)) slug = `medtrust-${slug}`;
    const language = record.locale === 'zh' ? 'zh-TW' : 'en';
    const metadata = {
      title: record.title, description: record.description || record.title, originalDescription: record.description, slug, language,
      status: 'published', tags: [record.kind], featured: false,
      recoveredFrom: `${publicRef}:src/data/migrated.json#${record.id}`,
      evidence: [{ label: 'Historical public source', url: sourceUrl(publicRef, 'src/data/migrated.json'), claim: record.title }],
    };
    if (record.date) metadata.publishedAt = record.date;
    if (collection === 'journal') { metadata.kind = record.kind === 'journal' ? 'essay' : 'note'; metadata.category = record.kind; }
    if (record.source.startsWith('notes.nagi.tw/articles/')) {
      const rawPath = record.source.replace('notes.nagi.tw/', '');
      const raw = gitFile(archiveRef, rawPath).toString('utf8');
      const data = parse(/^---\r?\n([\s\S]*?)\r?\n---/.exec(raw)[1]);
      metadata.tags = data.tags ?? [];
      metadata.category = Array.isArray(data.categories) ? data.categories[0] : data.categories ?? record.kind;
      metadata.originalCategories = data.categories;
      if (data.article_type) metadata.originalArticleType = data.article_type;
      metadata.originalDate = data.date;
      if (data.updated) metadata.updatedAt = data.updated;
    }
    if (record.cover) {
      metadata.cover = '../../../public/assets/images/cybersec-2026.jpg';
      metadata.coverAlt = 'CYBERSEC 2026 conference signage';
    }
    if (collection === 'projects') metadata.tools = [];
    if (collection === 'research') { metadata.methods = []; metadata.sources = [sourceUrl(publicRef, 'src/data/migrated.json')]; }
    records.push({ id: record.id, collection, metadata, body: publicBody(record), originalRoute: record.route,
      originalKind: record.kind, source: metadata.recoveredFrom, sourceFile: record.source });
  }
  // This published translation was omitted from the later migration inventory.
  const frcPath = 'articles/engineering/frc-engineering-team.en.md';
  const frc = gitFile(archiveRef, frcPath).toString('utf8');
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/.exec(frc);
  // The historical English translation has an unquoted colon in description;
  // repair YAML quoting only, preserving the literal value and the body bytes.
  const data = parse(match[1].replace(/^description: (.+)$/m, (_, value) => `description: ${JSON.stringify(value)}`));
  records.push({ id: 'en-frc-engineering-team', collection: 'journal', originalKind: 'journal', originalRoute: '/journal/frc-engineering-team/',
    source: `${archiveRef}:${frcPath}`, sourceFile: frcPath,
    metadata: { title: data.title, description: data.description, slug: 'frc-engineering-team', language: 'en', status: 'published',
      publishedAt: String(data.date).slice(0, 10), originalDate: String(data.date), originalCategories: data.categories,
      ...(data.article_type ? { originalArticleType: data.article_type } : {}), ...(data.updated ? { updatedAt: String(data.updated).slice(0, 10) } : {}), tags: data.tags ?? [], category: data.categories?.[0] ?? 'engineering',
      kind: 'essay', featured: false, recoveredFrom: `${archiveRef}:${frcPath}` },
    body: publicBody({ body: frc.slice(match[0].length), kind: 'journal', locale: 'en' }) });
  const events = [...additionalExperience];
  // Distinct 2026 attendance is also an explicitly public approved snapshot.
  events.push({ id: 'infosec-2026', year: '2026', category: 'conferences', copy: {
    en: { name: 'InfoSec Taiwan 2026', role: 'Attendee' }, zh: { name: 'InfoSec Taiwan 2026', role: '與會者' },
  } });
  for (const event of events) for (const [locale, language] of [['en', 'en'], ['zh', 'zh-TW']]) {
    const copy = event.copy[locale];
    const ref = event.id === 'infosec-2026' ? publicRef : archiveRef;
    const file = event.id === 'infosec-2026' ? 'src/data/experience.ts' : 'src/lib/experience.ts';
    const source = `${ref}:${file}#${event.id}`;
    records.push({ id: `${locale}-${event.id}`, collection: 'experience', originalKind: event.category,
      source, sourceFile: file, eventId: event.id,
      metadata: { title: copy.name, description: copy.role, slug: event.id, language, status: 'published',
        recoveredFrom: source, role: copy.role, organization: copy.name, startedAt: event.year, endedAt: event.year,
        tags: [event.category], featured: false,
        evidence: [{ label: 'Historical public source', url: sourceUrl(ref, file), claim: `${copy.name}: ${copy.role}` }] },
      body: '' });
  }
  return records;
}

export function recordPath(record) {
  return `src/content/${record.collection}/${record.metadata.slug}${record.metadata.language === 'zh-TW' ? '.zh' : ''}.md`;
}
export function recordRoute(record) {
  const { slug, language } = record.metadata;
  return `${language === 'zh-TW' ? '/zh' : ''}/${record.collection}/${record.collection === 'experience' ? `#${slug}` : `${slug}/`}`;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const records = await recoveryRecords();
  const manifest = { authorization: 'User: Nagi.tw — Final Content Recovery (2026-11-24)', publicRef, archiveRef, records: [] };
  for (const record of records) {
    const path = recordPath(record);
    // Existing migrated source drafts are retained in Git; only the old public
    // projection is restored. Other drafts are never toggled or rewritten.
    writeFileSync(path, `---\n${stringify(record.metadata, { defaultStringType: 'QUOTE_DOUBLE' })}---\n${record.body}`);
    manifest.records.push({ id: record.id, file: path, source: record.source, sourceFile: record.sourceFile,
      originalRoute: record.originalRoute, route: recordRoute(record), originalKind: record.originalKind,
      language: record.metadata.language, bodySha256: sha256(record.body), date: record.metadata.publishedAt ?? null,
      ...(record.eventId ? { eventId: record.eventId, year: record.metadata.startedAt } : {}) });
  }
  mkdirSync('docs/content-recovery', { recursive: true });
  writeFileSync('docs/content-recovery/manifest.json', JSON.stringify(manifest, null, 2) + '\n');
  console.log(`Recovered ${records.length} source editions/records; no generated prose or synthetic dates.`);
}
