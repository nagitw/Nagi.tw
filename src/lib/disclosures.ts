// Add only officially public records whose attribution to Nagi is confirmed.
// Private reports and unverified intake records do not belong in this module.
export interface Disclosure {
  slug: string;
  code: string;
  title: { en: string; 'zh-TW': string };
  severity: string;
  reportedAt?: string;
  disclosedAt?: string;
  remediation: { en: string; 'zh-TW': string };
  source: string;
}
export const publicDisclosures: Disclosure[] = [];
