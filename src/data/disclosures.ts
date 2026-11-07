export type Disclosure = {
  id: string;
  year: string;
  category: 'Web' | 'IoT';
  severity: 'Low' | 'Medium' | 'High';
  publicationStatus?: 'draft' | 'review' | 'published';
  status: 'Verified' | 'Remediated' | 'Public Disclosure';
  verified: boolean;
  publicAuthorization: boolean;
  publishedAt: string;
  title: { en: string; zh: string };
  summary: { en: string; zh: string };
  details: { en: string[]; zh: string[] };
  references: { kind: 'PR' | 'Commit'; url: string }[];
};

// Only authorized public content belongs in this repository. Do not add private
// reports here: filtering a build does not remove information from git history.
// Source review found no verified, authorized public records to publish.
export const publicDisclosures: readonly Disclosure[] = [];
