import { catalogEntries, type CatalogRecord } from './catalog.ts';
import type { Locale } from '../i18n/ui';
export const journalCategories = {
  cybersecurity: { zh: '資安', en: 'Cybersecurity' },
  medical: { zh: '醫療', en: 'Medical' },
  perspectives: { zh: '人生觀點', en: 'Perspectives' },
  reflections: { zh: '心得', en: 'Reflections' },
} as const;
export type JournalCategory = keyof typeof journalCategories;
// Editorial choice by article subject, not keyword matching. Both editions share one category.
const classification: Record<string, { category: JournalCategory; tags: string[] }> = {
  '/journal/series/medtrust/00/': { category: 'medical', tags: ['MedTrust', 'IoT'] },
  '/journal/series/medtrust/01/': { category: 'medical', tags: ['MedTrust', 'IoT'] },
  '/journal/nurse-made-me-rethink-medical-cybersecurity/': { category: 'medical', tags: ['Healthcare', 'Security'] },
  '/journal/ctf-meets-malware-analysis-windows/': { category: 'cybersecurity', tags: ['CTF', 'Malware Analysis'] },
  '/journal/retail-work-sme-security-culture/': { category: 'cybersecurity', tags: ['SME', 'Security Culture'] },
  '/journal/not-everyone-has-to-walk-the-same-road/': { category: 'perspectives', tags: [] },
  '/journal/prologue-the-people-i-met-along-the-way/': { category: 'perspectives', tags: [] },
  '/journal/ten-years-from-now-dont-forget-who-you-are-now/': { category: 'perspectives', tags: [] },
  '/journal/frc-engineering-team/': { category: 'reflections', tags: ['Robotics'] },
  '/journal/first-hackathon-in-university/': { category: 'reflections', tags: ['Hackathon'] },
  '/journal/recent-projects-and-life-update/': { category: 'reflections', tags: ['Homelab'] },
  '/journal/infosec-taiwan-2026-student-industry-gap/': { category: 'reflections', tags: ['InfoSec Taiwan', 'Security'] },
  '/journal/2026-security-conference/': { category: 'reflections', tags: ['Conference', 'Security'] },
};
export function journalEntries(records: readonly CatalogRecord[], locale: Locale) {
  return catalogEntries(records, locale, ['journal']).map(entry => {
    const item = classification[entry.path];
    if (!item) throw new Error(`Journal primary category requires editorial assignment: ${entry.path}`);
    return { ...entry, ...item };
  });
}
