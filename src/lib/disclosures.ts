import type { Disclosure } from '../data/disclosures.ts';

/** Fail closed: editorial approval never substitutes for verification or consent. */
export function getPublicDisclosures(records: readonly Disclosure[]): Disclosure[] {
  return records.filter((record) => {
    if (!record || record.workflow !== 'Published' || !['Verified', 'Remediated', 'Public Disclosure'].includes(record.status)
      || record.verified !== true || record.publicAuthorization !== true) return false;
    if (!/^ZD-\d{4}-\d{5}$/.test(record.id) || record.id.slice(3, 7) !== record.year
      || !['Web', 'IoT'].includes(record.category) || !['Low', 'Medium', 'High'].includes(record.severity)) return false;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(record.publishedAt)) return false;
    const date = new Date(`${record.publishedAt}T00:00:00Z`);
    if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== record.publishedAt
      || record.publishedAt.slice(0, 4) !== record.year) return false;
    if (!['en', 'zh'].every((locale) => {
      const key = locale as 'en' | 'zh';
      return typeof record.title?.[key] === 'string' && record.title[key].trim()
        && typeof record.summary?.[key] === 'string' && record.summary[key].trim()
        && Array.isArray(record.details?.[key]) && record.details[key].length
        && record.details[key].every((paragraph) => typeof paragraph === 'string' && paragraph.trim());
    })) return false;
    return Array.isArray(record.references) && record.references.length > 0 && record.references.every((ref) => {
      if (!ref || typeof ref.url !== 'string') return false;
      const path = ref.kind === 'PR' ? 'pull/[1-9][0-9]*' : ref.kind === 'Commit' ? 'commit/[a-fA-F0-9]{7,40}' : null;
      return path !== null && new RegExp(`^https://github\\.com/[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+/${path}$`).test(ref.url);
    });
  });
}
