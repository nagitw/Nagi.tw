import { sortEvents, publicExperience, type DatePrecision, type ExperienceCategory, type VerificationStatus } from '../lib/experience';
import type { Locale } from '../i18n/ui';
import { publicRecords, type PublicationStatus } from '../lib/publication';
export interface Experience {
  id: string;
  titleZh: string;
  titleEn: string;
  verificationStatus: VerificationStatus;
  rankingUnit: "individual" | "team" | "unknown";
  award?: string;
  placement?: number;
  totalParticipants?: number;
  team?: string;
  evidenceUrls: string[];
  sourceReferences: string[];
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
const approvedSnapshots = [
  { year: '2026', title: 'HPC AI Summer Camp', role: '學員', organization: '國立清華大學', category: 'training', source, datePrecision: 'year', publicationStatus: 'published', verificationStatus: 'confirmed' },
  { year: '2026', title: 'AI × Cybersecurity Workshop Series: AI for Good', role: '參與者', category: 'training', source, datePrecision: 'year', publicationStatus: 'published', verificationStatus: 'confirmed' },
  { year: '2026', title: 'InfoSec Taiwan 2026', role: '與會者', category: 'conferences', source, datePrecision: 'year', publicationStatus: 'published', verificationStatus: 'confirmed' },
  { year: '2026', title: 'AIS3 MyFirstCTF 2026', role: '參賽者', category: 'ctf', source, datePrecision: 'year', publicationStatus: 'published', verificationStatus: 'confirmed' },
  { year: '2026', title: 'FIRST Tech Challenge', role: '參賽者', category: 'competitions', source, datePrecision: 'year', publicationStatus: 'published', verificationStatus: 'confirmed' },
  { year: '2025', title: 'APCS 模擬測驗團隊暑期營隊', role: '學員', category: 'training', source, datePrecision: 'year', publicationStatus: 'published', verificationStatus: 'confirmed' },
  { year: '2025', title: 'HITCON Conference 2025', role: '與會者', category: 'conferences', source, datePrecision: 'year', publicationStatus: 'published', verificationStatus: 'confirmed' },
  { year: '2025', title: 'COSCUP 2025', role: '與會者', category: 'conferences', source, datePrecision: 'year', publicationStatus: 'published', verificationStatus: 'confirmed' },
] as const;

// Immutable approved scope: recovered fields live only in experience-archive.json.
const ids = ['hpc-ai-2026', 'ai-for-good-2026', 'infosec-2026', 'myfirstctf-2026', 'ftc-2026', 'apcs-2025', 'hitcon-2025', 'coscup-2025'];
const zhExperience: readonly Experience[] = approvedSnapshots.map((entry, index) => ({
  ...entry, id: ids[index], titleZh: entry.title,
  titleEn: entry.title === 'APCS 模擬測驗團隊暑期營隊' ? 'APCS Mock Test Team Summer Camp' : entry.title,
  rankingUnit: 'unknown', evidenceUrls: [],
  sourceReferences: [source, 'bc76999f76f327f1371a7b69a803326a620991a6:src/data/experience.ts', '4d84564e3f401e2d2ecdef4ab3459be4b1d3855a:src/data/experience.ts'],
}));

const roles: Record<string, string> = { '學員': 'Student', '參與者': 'Participant', '與會者': 'Attendee', '參賽者': 'Competitor' };
export const experience: readonly Experience[] = zhExperience.map((entry) => ({
  ...entry,
  role: roles[entry.role] ?? entry.role,
  title: entry.title === 'APCS 模擬測驗團隊暑期營隊' ? 'APCS Mock Test Team Summer Camp' : entry.title,
  ...(entry.organization ? { organization: 'National Tsing Hua University' } : {}),
}));
export const getExperience = (locale: Locale): readonly Experience[] => sortEvents(publicExperience(publicRecords(locale === 'zh' ? zhExperience : experience)));
