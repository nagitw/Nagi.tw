export type DatePrecision = 'day' | 'month' | 'year';
export interface EventDate { year: string; eventDate?: string; datePrecision: DatePrecision }
export type ExperienceCategory = 'Competitions' | 'Training / Workshops' | 'Conferences' | 'Talks' | 'Teaching';
/** One edition/session per event; divisions and awards are results, not extra events. */
export interface EventRecord extends EventDate {
  id: string;
  eventId: string;
  title: string;
  category: ExperienceCategory;
  role: string;
  organization?: string;
  publicationStatus: 'draft' | 'review' | 'published';
  evidenceUrl?: string;
  results?: readonly {
    division?: string;
    team?: string;
    placement?: string;
    totalTeams?: number;
    award?: string;
    evidenceUrl?: string;
  }[];
}
export function sortEvents<T extends EventDate & { id?: string; title?: string }>(events: readonly T[]): T[] {
  const precision = { day: 0, month: 1, year: 2 };
  return [...events].sort((a, b) => b.year.localeCompare(a.year)
    || precision[a.datePrecision] - precision[b.datePrecision]
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
