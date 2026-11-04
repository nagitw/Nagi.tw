import { localPath, type Locale } from '../i18n/ui';
export interface SiteLink { label: string; href: string }

// Identity/current interests: approved v2 brief. Contact: source/_data/portfolio.json.
const zhSite = {
  name: '洪新富 / Nagi',
  brand: 'Nagi.tw',
  focus: '資安 · 系統 · 研究',
  introduction: '我是 Nagi，一名以資安與系統為核心，持續探索通訊、醫療 IoT、嵌入式與自主系統的學生工程者。',
  email: 'casp3790er@gmail.com',
  github: 'https://github.com/seraphforge',
  notes: 'https://notes.nagi.tw/',
  currently: ['5G 通訊安全', '醫療 IoT 安全', '嵌入式／自主系統'],
} as const;

export const site = {
  ...zhSite,
  name: 'Hong Xin-Fu / Nagi',
  focus: 'Security · Systems · Research',
  introduction: 'I’m Nagi, a student engineer working across security and systems, with ongoing interests in communications, Medical IoT, embedded computing, and autonomous systems.',
  currently: ['5G Communication Security', 'Medical IoT Security', 'Embedded / Autonomous Systems'],
} as const;
export const getSite = (locale: Locale) => locale === 'zh' ? zhSite : site;
export const navigation: readonly SiteLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Research', href: '/research/' },
  { label: 'Projects', href: '/projects/' },
  { label: 'Journal', href: '/journal/' },
  { label: 'Technical Reports', href: '/technical-reports/' },
  { label: 'About', href: '/about/' },
  { label: 'Roadmap', href: '/roadmap/' },
  { label: 'Experience', href: '/experience/' },
  { label: 'Contact', href: '/contact/' },
];
export const getNavigation = (locale: Locale): readonly SiteLink[] => {
  const labels = ['首頁', '研究', '專案', '日誌', '技術報告', '關於', '未來計畫', '經歷', '聯絡'];
  return navigation.map((link, index) => ({ label: locale === 'zh' ? labels[index]! : link.label, href: localPath(link.href, locale) }));
};
