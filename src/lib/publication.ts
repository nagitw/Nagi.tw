export type PublicationStatus = 'draft' | 'review' | 'published';
export type DevelopmentStatus = 'active-development' | 'maintained' | 'completed' | 'paused' | 'archived';
export interface PublicationRecord { publicationStatus?: string }
export const publicationStatus = (record: PublicationRecord | null | undefined): PublicationStatus =>
  record?.publicationStatus === 'published' || record?.publicationStatus === 'review' ? record.publicationStatus : 'draft';
export function publicRecords<T extends PublicationRecord>(records: readonly T[]): T[] {
  // Withdrawn material stays private even if an editor accidentally approves it.
  return records.filter(record => publicationStatus(record) === 'published'
    && !/oscp|from-ctf-to-/i.test(JSON.stringify(record)));
}

export function publicRedirects<T extends PublicationRecord & { route: string; aliases?: string[] }>(records: readonly T[], reserved: readonly string[] = []) {
  const canonical = new Set([...records.map(record => record.route), ...reserved]);
  return Object.fromEntries(publicRecords(records).flatMap(record => (record.aliases ?? [])
    .filter(alias => alias.startsWith('/') && !alias.startsWith('//') && !canonical.has(alias) && !/oscp|from-ctf-to-/i.test(alias))
    .map(alias => [alias, record.route])));
}
