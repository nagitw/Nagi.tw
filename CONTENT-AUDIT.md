# Nagi.tw — Content Integrity Audit

Status: LOCAL ENGINEERING / CONTENT ACCEPTANCE PASS; production deployment pending.
Authorization: user's Final Content Recovery request, 2026-11-24 (Asia/Taipei).
Rollback baseline: `8785863ea406c3552f1406035200ed8905a37a5f`.
Production target remains https://nagitw.github.io/Nagi.tw/.

## Coverage and source inventory

- Inspected all 84 reachable commits and fetched all 11 remote branches; no tags
  provided another content source. This includes pre-v3.1 backup, localization,
  content-hub, project/research, experience reconciliation and final-release history.
- The three historical versions of `src/data/migrated.json` each contain 51
  public editions with the same IDs. The latest pre-release source is fixed at
  `c54762236098c5c824ea73e26bd5829c222f25d2`; all 51 are recovered.
- The pre-v3.1 snapshot `952f05507d1a6115e8fc561eb8417eaec91b8c28` contains
  32 article editions: 13 Chinese, eight English, 11 Japanese, 13 distinct slugs.
  The current site supports English/Traditional Chinese, not Japanese routes.
  The missing English FRC translation was found here; a malformed YAML description
  colon was quoted without rewriting its text or body.
- Its public `additionalExperience` table contains 26 distinct activities,
  including 19 competitions. These are restored in both existing site languages.
  The separate approved InfoSec Taiwan 2026 attendance snapshot brings the total
  to 27 activities. It is not merged with the distinct historical 2025 record.
- The latest public research table contains three bilingual topic summaries;
  these six source editions were also recovered. The MedTrust project summary
  duplicates its restored full project, and is not counted as another project.
- Inspected the known final/phase backups and pre-release/integration copies in
  Windows TEMP plus the relevant `nagi-work`/v1 backup locations. They supplied no
  additional eligible publication absent from the Git sources above. Unrelated
  application directories and private medical archives were not imported.

## Before / after

Counts below are public collection editions; languages count separately. Unique
entries collapse translations with the same collection and slug.

| Collection | Before public editions | After public editions | After unique entries | Remaining drafts |
| --- | ---: | ---: | ---: | ---: |
| Projects | 2 | 11 | 6 | 7 |
| Research / laboratory notes | 0 | 18 | 9 | 6 |
| Journal / recovered reference and experience articles | 0 | 31 | 19 | 1 |
| Experience activity records | 0 | 54 | 27 | 1 |
| Photography | 0 | 0 | 0 | 1 |
| Total | 2 | 114 | 61 | 16 |

Published detail articles include 19 dated article editions (13 distinct articles),
plus undated references, experience prose, projects and research notes. There are
19 distinct competition events among the 27 activities, not 38 competitions from
counting both translations. HTML pages increase **17 → 75**; sitemap URLs **16 → 74**.
The manifest contains **112 recovered editions/records**, plus the two unchanged
BugTraceAI editions. Five previously migrated drafts are replaced by their old
public projections; all other content files remain byte-identical to the baseline.

## Cause and recovery rules

The final release loaded only `src/content` collections and filtered exact
`status: published`. It did not load the old JSON/TypeScript publication sources.
Only BugTraceAI was published; five migrated English articles were deliberately
draft, other old articles/experience tables were not imported, and old routes
were not generated. `publicationStatus`, `verificationStatus` and the archive's
pending fields were separate old gates, not evidence of data deletion.

Recovery uses original public bodies, not AI-written replacements. The pinned old
`publicBody` projection is reused, including its exclusion of private future-plan
sections and its existing experience ordering. Source paragraph bytes after that
public projection, original titles, tags/classifications, original dates/timestamps
and exact competition outcome wording are verified by `verify:recovery`.
The CYBERSEC image remains the original hash-pinned asset; Astro optimization does
not replace the source image. Missing summaries reuse their original title.

Undated pages remain undated; activity years remain year-only. No January 1 dates,
roles, methods, team denominators or results are invented. Provenance permits absent
legacy fields only for recovery entries; ordinary content requirements remain
tested. The existing collections, dynamic route templates and Editorial styles
are retained. Only rendered old links and duplicate body H1 levels are adapted to
the existing Pages base and article template; stored public prose is unchanged.

FTC, National Ilan University and AIS3 MyFirstCTF are **2026**, as confirmed by the
user and checked automatically. Outcomes use the exact previously public wording
in the 952f055 table; no old Innovation/Inspire award name is substituted for the
recorded FTC outcome. These are historical author-reported results, not new claims
of independent official verification. Source links are available through the
existing About evidence list; the manifest provides per-record source pointers.

## Exclusions / data not recovered to public routes

- None of the 51 latest public editions or 26 old public activity records remains
  missing. The missing English FRC edition and three public research summaries
  have also been recovered.
- The 79-row experience draft archive is not bulk-published. Candidate-only
  activities, unapproved teaching roles, uncertain aliases, unsupported extra
  awards/denominators and superseded FTC/Ilan/MyFirstCTF years remain non-public.
  Their unresolved details are still available in Git, not fabricated here.
- Two historical article families outside the latest approved public scope,
  `from-ctf-to-bugtraceai` and `from-nihscsed-to-control-team`, are not restored.
  Withdrawn topic/identity controls remain active; no excluded education, legal
  names, private contacts, credentials or patient information is added.
- Eleven Japanese editions remain in Git. No Japanese UI or extra locale was
  introduced. Existing source-language fallback handles unpaired Chinese articles.
- Previously excluded private-plan paragraphs are not restored merely because
  they exist in a raw source file. Old source snapshots are not rewritten.
- Historical narrative assertions, certification-year variants, award terminology
  and photograph rights retain their earlier evidentiary limits. This task proves
  recovery from public sources, not independent verification of narrated events.

## Acceptance and deployment

Local PASS: TypeScript/Astro (zero diagnostics), build, 10 schema tests, four About
tests, i18n, Penguin, original provenance, 112-record recovery integrity/privacy,
all-page link/asset/fragment/SEO checks, and all 75 pages at three widths. No global
CSS, header/footer, mascot artwork or mascot logic changed. Dependency audit: zero
vulnerabilities. Standalone Lint remains intentionally unconfigured.

GitHub Actions now fetches full history and pairs immutable-original verification
with recovery integrity verification. The old strict/editorial migration modes
are unchanged and tested against their original draft fixture; they do not grant
publication and are not used to assert the newly authorized recovery is draft.

Deployment commit / Actions run / public content acceptance: PENDING.
Do not mark CLOSED until the recovered routes and competition results pass live
verification. Full per-record provenance: [manifest](docs/content-recovery/manifest.json).
