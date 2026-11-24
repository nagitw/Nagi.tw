import { profileSchema, selectPublished } from './content-schema.ts';
import { localizePath, type Locale } from './i18n.ts';

export function localizeProfileLink(url: string, locale: Locale) {
  const parsed = new URL(url);
  return parsed.origin === 'https://nagi.tw' || (parsed.origin === 'https://nagitw.github.io' && parsed.pathname.startsWith('/Nagi.tw/'))
    ? localizePath(parsed.pathname.replace(/^\/Nagi.tw(?=\/)/, ''), locale) + parsed.search + parsed.hash : url;
}

// Approval is supplied by the author/editor; this helper never grants it.
export function prepareAboutProfile(input: unknown) {
  const profile = profileSchema.parse(input);
  return {
    ...profile,
    technicalInterests: profile.technicalInterests ?? [],
    skillGroups: profile.skillGroups ?? [],
    honors: (profile.honors ?? []).filter(entry => entry.approval === 'approved'),
    talks: (profile.talks ?? []).filter(entry => entry.approval === 'approved'),
    education: (profile.education ?? []).filter(entry => entry.approval === 'approved'),
  };
}

type ExperienceCandidate = {
  data: {
    slug: string; language?: string; publishedAt?: string; status: string;
    evidence?: { label: string; url: string }[];
    verifiedContributions?: { evidence: { label: string; url: string }[] }[];
  };
};
export function selectAboutExperience<T extends ExperienceCandidate>(entries: T[]): T[] {
  return selectPublished(entries).filter(({ data }) => (data.evidence?.length ?? 0) > 0
    || data.verifiedContributions?.some(contribution => contribution.evidence.length > 0));
}
