// Add only officially public records whose attribution to Nagi is confirmed.
// Private reports and unverified intake records do not belong in this module.
export interface Disclosure {
  slug: string;
  code: string;
  title: { en: string; 'zh-TW': string };
  severity: string;
  reportedAt?: string;
  disclosedAt?: string;
  reporter: string;
  remediation?: { en: string; 'zh-TW': string };
  source: string;
}
export const publicDisclosures: Disclosure[] = [
  {
    slug: 'zd-2026-01297',
    code: 'ZD-2026-01297',
    title: {
      en: 'HITCON ZeroDay disclosure — ZD-2026-01297',
      'zh-TW': 'HITCON ZeroDay 漏洞通報 — ZD-2026-01297',
    },
    severity: 'Low',
    reporter: '大家都是電神',
    source: 'https://zeroday.hitcon.org/vulnerability/all/page/16',
  },
];
