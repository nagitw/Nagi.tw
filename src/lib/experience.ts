export type DatePrecision = 'day' | 'month' | 'year';
export interface EventDate { year: string; eventDate?: string; datePrecision: DatePrecision }
export type ExperienceCategory = 'competitions' | 'ctf' | 'training' | 'conferences' | 'speaking' | 'teaching';
export type VerificationStatus = 'confirmed' | 'source-recorded' | 'conflicted' | 'candidate-only';
export interface ArchiveRecord {
  id: string;
  titleZh: string;
  titleEn: string;
  category: ExperienceCategory;
  year: string | null;
  eventDate?: string;
  datePrecision: DatePrecision;
  role: string;
  award?: string;
  placement?: number;
  totalParticipants?: number;
  rankingUnit: 'individual' | 'team' | 'unknown';
  team?: string;
  organizer?: string;
  evidenceUrls: string[];
  sourceReferences: string[];
  verificationStatus: VerificationStatus;
  publicationStatus: 'draft' | 'review' | 'published';
  sourceAssertion: string;
  reviewNotes: string;
}
/** Both decisions are mandatory. Approval of an older snapshot never approves recovered fields. */
export function publicExperience<T extends { publicationStatus?: string; verificationStatus?: string }>(records: readonly T[]): T[] {
  return records.filter(record => record.publicationStatus === 'published' && record.verificationStatus === 'confirmed');
}
export type EventRecord = ArchiveRecord;
export function sortEvents<T extends EventDate & { id?: string; title?: string }>(events: readonly T[]): T[] {
  return [...events].sort((a, b) => b.year.localeCompare(a.year)
    || Number(a.datePrecision === 'year') - Number(b.datePrecision === 'year')
    || (b.eventDate ?? '').localeCompare(a.eventDate ?? '')
    || (a.id ?? a.title ?? '').localeCompare(b.id ?? b.title ?? ''));
}
// Legacy pages contain independent year-only records, not dated articles.
// Keep each original record verbatim while grouping its year, never infer a month/day.
export function sortExperienceBody(body: string, locale: string): string {
  const parts = body.split(/(?=^### )/m);
  if (parts.length < 2) return body;
  const intro = parts.shift()!;
  const events = parts.map(part => ({
    body: part.trim(), year: part.match(/(?:Year:|年份[：:])\s*(\d{4})/)?.[1],
    title: part.split('\n')[0], datePrecision: 'year' as const,
  }));
  if (events.some(event => !event.year)) return body;
  const sorted = sortEvents(events as (typeof events[number] & { year: string })[]);
  let year = '';
  return intro + sorted.map(event => {
    const heading = year !== event.year ? `\n## ${event.year} — ${locale === 'zh' ? '日期未定' : 'Date unspecified'}\n\n` : '\n';
    year = event.year;
    return heading + event.body + '\n';
  }).join('');
}
