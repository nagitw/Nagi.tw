import type { Locale } from '../i18n/ui';
export interface Episode { slug: string; number: string; title: Record<Locale, string>; focus: Record<Locale, string>; status: 'planned'; publicationStatus?: 'draft' | 'review' | 'published' }
export const episodes: readonly Episode[] = [
  { slug: '01-foundations', number: '01', title: { en: 'Build the foundations', zh: '建立基礎' }, focus: { en: 'Linux, networking and a reproducible learning environment.', zh: 'Linux、網路基礎與可重現的學習環境。' }, status: 'planned' },
  { slug: '02-enumeration', number: '02', title: { en: 'Observe before you act', zh: '先觀察，再行動' }, focus: { en: 'Methodical enumeration in explicitly authorized practice environments.', zh: '在明確授權的練習環境中建立有系統的資訊蒐集方法。' }, status: 'planned' },
  { slug: '03-evidence', number: '03', title: { en: 'Turn practice into evidence', zh: '把練習整理成證據' }, focus: { en: 'Reproducible notes, limitations and technical reporting.', zh: '可重現的筆記、限制說明與技術報告。' }, status: 'planned' },
];
export const episodePath = (episode: Episode, kind?: 'journal' | 'report') => `/research/from-ctf-to-oscp/${episode.slug}/${kind ? `${kind}/` : ''}`;
