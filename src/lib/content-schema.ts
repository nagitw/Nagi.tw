import { z } from 'astro/zod';

const text = z.string().trim().min(1);
// Quoted YYYY-MM-DD values keep content dates independent of timezone.
const date = z.iso.date();
const publicLink = z.object({ label: text, url: z.httpUrl() }).strict();
const localizedText = z.object({ en: text, 'zh-TW': text.optional() }).strict();
const approval = z.enum(['pending', 'approved']);
const references = z.array(publicLink).min(1);
// These are public editorial fields, not an identity or private contact record.
export const profileSchema = z.object({
  publicName: text.optional(),
  biography: localizedText.optional(),
  technicalInterests: z.array(localizedText).optional(),
  skills: z.array(text).optional(),
  links: z.array(publicLink).optional(),
  skillGroups: z.array(z.object({
    category: z.enum(['programming-languages', 'web-development', 'security-engineering', 'operating-systems', 'embedded-systems', 'research-tools']),
    context: localizedText,
    items: z.array(text).min(1),
    evidence: references,
  }).strict()).optional(),
  honors: z.array(z.object({
    competition: localizedText, year: z.number().int().min(1900).max(9999),
    team: localizedText.optional(), ranking: localizedText.optional(), evidence: references, approval,
  }).strict()).optional(),
  talks: z.array(z.object({
    event: localizedText, title: localizedText, date, role: localizedText, evidence: references, approval,
  }).strict()).optional(),
  education: z.array(z.object({
    organization: localizedText, qualification: localizedText, dateRange: localizedText,
    description: localizedText.optional(), evidence: references, approval,
  }).strict()).optional(),
}).strict();
export type PublicProfile = z.infer<typeof profileSchema>;

// A reference describes its scope; schema validity never establishes truth or approval.
const evidence = z.object({
  label: text,
  url: z.httpUrl(),
  claim: text,
  accessedAt: date.optional(),
}).strict();
const verifiedContribution = z.object({
  description: text,
  evidence: z.array(evidence).min(1),
}).strict();
export const coverPath = text.regex(/^(?:\.{1,2}\/|\/)[^?#]+\.(?:avif|gif|jpe?g|png|svg|webp)$/i, 'Use a local image path');
const common = {
  title: text,
  language: z.enum(['en', 'zh-TW']).default('en'),
  description: text,
  slug: text.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use a lowercase, hyphen-separated slug'),
  publishedAt: date,
  updatedAt: date.optional(),
  status: z.enum(['draft', 'published', 'archived']),
  tags: z.array(text).default([]).transform(tags => [...new Set(tags)]),
  featured: z.boolean().default(false),
  cover: coverPath,
  coverAlt: text,
  coverCaption: text.optional(),
  demo: z.boolean().default(false),
  evidence: z.array(evidence).optional(),
};
const updatedInOrder = (data: { publishedAt: string; updatedAt?: string }) => !data.updatedAt || data.updatedAt >= data.publishedAt;
const updatedError = { message: 'updatedAt must be on or after publishedAt', path: ['updatedAt'] };
export const baseSchema = z.object(common).refine(updatedInOrder, updatedError);

// Content config supplies Astro's image() validator; tests reuse the same schema factory.
export function createContentSchemas<T extends z.ZodType>(image: T) {
  const fields = { ...common, cover: image };
  return {
    projects: z.object({
      ...fields, role: text, tools: z.array(text).min(1),
      projectUrl: z.url().optional(), repositoryUrl: z.url().optional(),
      developmentStatus: z.enum(['concept', 'in-progress', 'maintained', 'completed', 'paused', 'discontinued']).optional(),
    }).refine(updatedInOrder, updatedError),
    research: z.object({
      ...fields, question: text, methods: z.array(text).min(1), sources: z.array(z.url()).default([]),
      researchArea: text.optional(), institution: text.optional(), team: text.optional(),
      researchStatus: z.enum(['proposed', 'in-progress', 'completed', 'paused']).optional(),
      verifiedOutputs: z.array(verifiedContribution).optional(),
      publications: z.array(publicLink).optional(),
    }).refine(updatedInOrder, updatedError),
    journal: z.object({
      ...fields,
      cover: image.optional(),
      coverAlt: text.optional(),
      kind: z.enum(['note', 'essay', 'reading']),
      subtitle: text.optional(),
      author: text.optional(),
      category: text.optional(),
      references: z.array(z.object({ label: text, url: z.httpUrl() })).default([]),
    })
      .refine(updatedInOrder, updatedError)
      .refine(data => data.cover !== undefined ? data.coverAlt !== undefined : data.coverAlt === undefined && data.coverCaption === undefined,
        { message: 'A cover requires alt text; cover metadata requires a cover', path: ['coverAlt'] }),
    photography: z.object({ ...fields, takenAt: date, location: text.optional(), images: z.array(z.object({ src: image, alt: text, caption: text.optional() })).min(1) }).refine(updatedInOrder, updatedError),
    experience: z.object({
      ...fields, organization: text, role: text, startedAt: date, endedAt: date.optional(),
      responsibilities: z.array(text).optional(),
      verifiedContributions: z.array(verifiedContribution).optional(),
    })
      .refine(updatedInOrder, updatedError)
      .refine(data => !data.endedAt || data.endedAt >= data.startedAt, { message: 'endedAt must be on or after startedAt', path: ['endedAt'] }),
  };
}

type Publishable = { data: { slug: string; language?: string; publishedAt: string; status: string; featured?: boolean; tags?: string[] } };
export function selectPublished<T extends Publishable>(entries: T[], options: { featured?: boolean; tag?: string } = {}): T[] {
  const slugs = new Set<string>();
  for (const entry of entries) {
    const key = `${entry.data.language ?? 'en'}/${entry.data.slug}`;
    if (slugs.has(key)) throw new Error(`Duplicate slug: ${entry.data.slug}`);
    slugs.add(key);
  }
  return entries.filter(({ data }) => data.status === 'published'
    && (options.featured === undefined || data.featured === options.featured)
    && (options.tag === undefined || data.tags?.includes(options.tag)))
    .sort((a, b) => b.data.publishedAt.localeCompare(a.data.publishedAt) || a.data.slug.localeCompare(b.data.slug));
}
