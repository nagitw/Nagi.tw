import records from '../data/migrated.json';
import type { Locale } from '../i18n/ui';
export const content = records;
export const contentPaths = [...new Set(content.map(r => r.route.replace(/^\/zh(?=\/)/, '')))];
export function edition(path: string, locale: Locale) {
  return content.find(r => r.route.replace(/^\/zh(?=\/)/, '') === path && r.locale === locale);
}
export function contentIndex(kinds: string[], locale: Locale) {
  return contentPaths.map(path => ({ path, record: edition(path, locale) ?? content.find(r => r.route.replace(/^\/zh(?=\/)/, '') === path)! }))
    .filter(({record}) => kinds.includes(record.kind)).sort((a, b) => (b.record.date ?? '').localeCompare(a.record.date ?? ''));
}
