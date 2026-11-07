# CV structure and confirmation queue

This is a repository-only proposal. It creates no public records, routes, JSON endpoints or navigation items.

## Inventory

| Category | Existing source | Remaining verification |
| --- | --- | --- |
| Competitions | `src/data/experience.ts`; migrated `/experience/ctf/`, `/experience/awards/` | Exact dates, official results, team names and rankings |
| Talks / Presentations | No dedicated structured speaker records found | Event, speaker role, date and slides/recording |
| Teaching | CTF Instructor and CTF Training prose in migrated `/experience/ctf/` | Exact event, organizer, date, teaching scope and evidence |
| Community | `src/data/experience.ts`; migrated `/experience/workshops/` | Participation versus organizing role; exact dates |
| Security Disclosures | `src/data/disclosures.ts`, currently empty | Existing verification and explicit disclosure authorization gates remain mandatory |
| Experience | `src/data/experience.ts` and migrated experience articles | Unified dates, descriptions and evidence; do not infer employment |

## Minimum model

```ts
type PublicationStatus = 'draft' | 'review' | 'published';
type CvCategory = 'competitions' | 'talks' | 'teaching' | 'community'
  | 'security-disclosures' | 'experience';
type Localized = { zh: string; en: string };
interface CvRecord {
  id: string;
  title: Localized;
  date: string; // YYYY, YYYY-MM or YYYY-MM-DD; preserve known precision
  category: CvCategory;
  role: Localized;
  organization: Localized;
  description: Localized;
  evidenceUrl?: string; // public HTTPS, checked before publication
  publicationStatus: PublicationStatus; // new entries default draft
  team?: string; // competitions only; omit unknown information
  placement?: string; // retain official distinction between rank and award
  totalTeams?: number; // positive integer, only when supported by evidence
}
```

Keep missing required details in a private editorial queue until confirmed. Do not fabricate dates or organizations to satisfy the model. Use separate editorial approval for translations if they are published independently. Security disclosure CV entries should reference an eligible disclosure ID, never duplicate confidential report bodies or bypass `getPublicDisclosures`.

## Candidate queue — owner confirmation required

These are references to existing prose, not new verified CV claims. No records were promoted or added to public pages.

- Competition consolidation: existing InnoServe, OSINT and robotics award prose; reconcile duplicates, year, team and official evidence before any structured migration. No inferred placement or totalTeams.
- Teaching: existing CTF Instructor / CTF Training prose; confirm actual role, event title, organizer and date before creating records.
- Community: existing HITCON / COSCUP attendance; distinguish attendance from speaking or organizing.
- Talks: no candidate with enough supplied evidence to create a record.
- Disclosures: no verified, authorized candidate supplied.
- Employment: no new employment claim proposed.

## Future presentation

Use category sections with reverse chronological entries, visible date precision, role and evidence links. On mobile use stacked definition lists rather than a wide table. Keep this on Experience/CV; retain the short homepage. Feed only approved records into routes, search, sitemap, RSS and AI, and never serialize the editorial queue into client-side data.
