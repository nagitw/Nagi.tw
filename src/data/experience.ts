import { sortEvents, type DatePrecision, type ExperienceCategory } from '../lib/experience';
import type { Locale } from '../i18n/ui';
import { publicRecords, type PublicationStatus } from '../lib/publication';
export interface Experience {
  publicationStatus?: PublicationStatus;
  year: string;
  eventDate?: string;
  datePrecision: DatePrecision;
  title: string;
  role: string;
  category: ExperienceCategory;
  organization?: string;
  source: string;
}

// Selected records only; no inferred employment, awards, or institutional appointment.
const source = 'source/_data/experience.json';
const zhExperience: readonly Experience[] = [
  { year: '2026', title: 'HPC AI Summer Camp', role: '學員', organization: '國立清華大學', category: 'Training / Workshops', source, datePrecision: 'year', publicationStatus: 'published' },
  { year: '2026', title: 'AI × Cybersecurity Workshop Series: AI for Good', role: '參與者', category: 'Training / Workshops', source, datePrecision: 'year', publicationStatus: 'published' },
  { year: '2026', title: 'InfoSec Taiwan 2026', role: '與會者', category: 'Conferences', source, datePrecision: 'year', publicationStatus: 'published' },
  { year: '2026', title: 'AIS3 MyFirstCTF 2026', role: '參賽者', category: 'Competitions', source, datePrecision: 'year', publicationStatus: 'published' },
  { year: '2026', title: 'FIRST Tech Challenge', role: '參賽者', category: 'Competitions', source, datePrecision: 'year', publicationStatus: 'published' },
  { year: '2025', title: 'APCS 模擬測驗團隊暑期營隊', role: '學員', category: 'Training / Workshops', source, datePrecision: 'year', publicationStatus: 'published' },
  { year: '2025', title: 'HITCON Conference 2025', role: '與會者', category: 'Conferences', source, datePrecision: 'year', publicationStatus: 'published' },
  { year: '2025', title: 'COSCUP 2025', role: '與會者', category: 'Conferences', source, datePrecision: 'year', publicationStatus: 'published' },
];

const roles: Record<string, string> = { '學員': 'Student', '參與者': 'Participant', '與會者': 'Attendee', '參賽者': 'Competitor' };
export const experience: readonly Experience[] = zhExperience.map((entry) => ({
  ...entry,
  role: roles[entry.role] ?? entry.role,
  title: entry.title === 'APCS 模擬測驗團隊暑期營隊' ? 'APCS Mock Test Team Summer Camp' : entry.title,
  ...(entry.organization ? { organization: 'National Tsing Hua University' } : {}),
}));
export const getExperience = (locale: Locale): readonly Experience[] => sortEvents(publicRecords(locale === 'zh' ? zhExperience : experience));
