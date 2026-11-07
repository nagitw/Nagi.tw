import records from '../data/migrated.json';
import leads from '../data/project-leads.json';
import { projectLeadEditions } from './project-leads';
import { publicRecords } from './publication';
import { publicBody } from './public-content';
import type { Locale } from '../i18n/ui';
export const content = publicRecords([...records, ...projectLeadEditions(leads)]).map(record => ({ ...record, body: publicBody(record) }));
export const contentPaths = [...new Set(content.map(r => r.route.replace(/^\/zh(?=\/)/, '')))];
export function edition(path: string, locale: Locale) {
  return content.find(r => r.route.replace(/^\/zh(?=\/)/, '') === path && r.locale === locale);
}
export function contentIndex(kinds: string[], locale: Locale) {
  return contentPaths.map(path => ({ path, record: edition(path, locale) ?? content.find(r => r.route.replace(/^\/zh(?=\/)/, '') === path)! }))
    .filter(({record}) => kinds.includes(record.kind)).sort((a, b) => (b.record.date ?? '').localeCompare(a.record.date ?? ''));
}
