import { publicRecords, type DevelopmentStatus } from './publication.ts';

export interface ProjectLead {
  name: string; slug: string; evidence: boolean; publicationStatus?: string;
  developmentStatus?: string;
  introduction?: { en?: string; zh?: string };
  architecture?: { en?: string; zh?: string };
  role?: { en?: string; zh?: string };
  projectType?: { en?: string; zh?: string };
  contributions?: { en?: string[]; zh?: string[] };
  projectResults?: { en?: string[]; zh?: string[] };
  verifiedResults?: { en?: string[]; zh?: string[] };
  tools?: string[]; github?: string; demo?: string;
}
const statuses = new Set(['active-development', 'maintained', 'completed', 'paused', 'archived']);
const publicLink = (value?: string) => {
  if (!value) return undefined;
  try { const url = new URL(value); return url.protocol === 'https:' && !url.username && !url.password ? url.href : undefined; } catch { return undefined; }
};

/** A lead needs both explicit approval and real introduction text for each public edition. */
export function projectLeadEditions(leads: readonly ProjectLead[]) {
  return publicRecords(leads).flatMap(project => (['en', 'zh'] as const).flatMap(locale => {
    const introduction = project.introduction?.[locale]?.trim();
    if (!introduction) return [];
    const zh = locale === 'zh';
    const architecture = project.architecture?.[locale];
    const results = project.verifiedResults?.[locale]?.filter(Boolean);
    return [{
      id: `${locale}-${project.slug}`, route: `${zh ? '/zh' : ''}/projects/${project.slug}/`, kind: 'project',
      title: project.name, description: introduction, locale,
      body: [introduction, architecture && `## ${zh ? '技術架構' : 'Architecture'}\n\n${architecture}`, results?.length && `## ${zh ? '已驗證成果' : 'Verified results'}\n\n${results.map(result => `- ${result}`).join('\n')}`].filter(Boolean).join('\n\n'),
      source: 'src/data/project-leads.json', translationKey: project.slug, aliases: [] as string[], status: '',
      publicationStatus: project.publicationStatus,
      developmentStatus: statuses.has(project.developmentStatus ?? '') ? project.developmentStatus as DevelopmentStatus : undefined,
      tools: project.tools ?? [], github: publicLink(project.github), demo: publicLink(project.demo),
      role: project.role?.[locale], projectType: project.projectType?.[locale],
      contributions: project.contributions?.[locale] ?? [],
      projectResults: project.projectResults?.[locale] ?? [], verifiedResults: results ?? [],
      date: undefined as string | undefined, cover: undefined as string | undefined,
    }];
  }));
}
