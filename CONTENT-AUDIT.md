# Nagi.tw — Final Editorial & Content Quality Audit

Status: **PASS — CLOSED / MAINTENANCE ONLY**. Unanswered facts remain withheld, not presumed confirmed.
Date: 2026-11-24 (Asia/Taipei). Baseline: 304a2a517531a20084bca764c7084c860618e634.
Target: https://nagitw.github.io/Nagi.tw/

## Scope and counts

Professional security, engineering, competition and open-source content is kept.
No original Markdown, recovered metadata, source image, immutable snapshot or
competition result was deleted or rewritten. The 112-record source recovery
manifest remains intact; a separate publication policy controls presentation.

| Public content | Before editions | After editions | After distinct records |
| --- | ---: | ---: | ---: |
| Projects | 11 | 8 | 4 |
| Research notes | 18 | 2 | 1 |
| Technical articles | 31 | 10 | 5 |
| Activities | 54 | 50 | 25 |
| Total | 114 | 70 | 35 |

HTML pages: 75 -> 35. Sitemap URLs: 74 -> 34. All 16 original drafts remain private.
The original 19 competition records remain in source; 18 are presented as
participation records while outcomes await author confirmation. One competition
with conflicting years and one conference attendance record are withheld.

## Date review

Every collection file is inventoried in docs/editorial-date-audit.json, including
source status, original timestamp, body dates, displayed date and uncertainty.
No Git commit timestamp is used as a publication, competition or project date.

Corrected missing display date: Medical Cybersecurity Research, both languages,
now shows 2026-06-10, explicitly present in the original body Date field. This is
a document date, not a claim about an experiment or clinical event.

FTC, National Ilan University and AIS3 MyFirstCTF remain 2026. Superseded FTC 2024,
Ilan 2025 and MyFirstCTF 2025 archive assertions are not published. Year-only
activities now display only the year, not a fabricated year-to-year duration.

The five retained articles keep original publication dates: malware analysis
2026-07-08; InfoSec reflection 2026-07-07; medical-security reflection 2026-06-23;
CYBERSEC reflection 2026-05-09; retail-security reflection 2026-07-18. These do not
establish the dates of attendance, interviews or narrated events. BugTraceAI's
2026-11-21 case-study date is publication metadata, not its PR event dates.

Read-only GitHub verification: PR #9 created 2026-10-17 and merged 2026-10-19;
PR #10 created 2026-10-30 and remains open/unmerged at this audit. The existing
case study distinguishes the merged shutdown work from the separate logging
proposal. No external repository README, description or document was modified.

Dates still unknown: start/completion dates for Autonomous Robot, Medical
Cybersecurity and MedTrust; month/day for the year-only activity records.
Undated project pages remain undated. Future Healthcare Design Hackathon has
2025/2026 source conflict and is hidden. InfoSec 2025 attendance is held pending
confirmation that both 2025 and 2026 records represent distinct participation.

## Languages and images

English remains default; Traditional Chinese remains secondary. All retained
content has paired original EN/Traditional Chinese editions. No Japanese page,
metadata locale, language switch or unnecessary Japanese display is emitted.
The 11 older Japanese article editions remain in Git. Formal names, original
quotations and technical terms are not arbitrarily translated or deleted.

All content cards use the same existing text-only Editorial form. The site-logo
image was removed as a project cover; it remains the brand/favicon. No real
project screenshots or competition photos were found with established context
and permission, so no random, unrelated or AI-generated substitute was used.
The historical CYBERSEC photograph's permission is unconfirmed: it is not shown
or emitted in dist, including derived copies. Its original source is retained.
If permission is confirmed, real article covers use one 16:9 crop treatment;
content lists remain consistently text-only.

## Kept and hidden content

Kept projects: BugTraceAI-CLI contributions, Autonomous Robot, Medical
Cybersecurity, MedTrust. Prototype descriptions are not upgraded into verified
research results or clinical-readiness claims.

Kept research: Medical Cybersecurity Research (dated early workflow/risk notes).
Kept technical articles: ctf-meets-malware-analysis-windows;
infosec-taiwan-2026-student-industry-gap;
nurse-made-me-rethink-medical-cybersecurity;
2026-security-conference; retail-work-sme-security-culture.
Their original public bodies and source classifications remain preserved.

Hidden projects: home-lab, home-lab-infrastructure.
Hidden research: archive-notes; medical-iot; 5g-security; embedded-systems;
ctf-web-practice; esp32-uart-test; ros2-topic-communication; web-security.
These are private setup, elementary smoke tests, topic-only placeholders or
summaries duplicating the project/About content, rather than substantive reports.

Hidden journal entries: first-hackathon-in-university; frc-engineering-team;
recent-projects-and-life-update; not-everyone-has-to-walk-the-same-road;
prologue-the-people-i-met-along-the-way; ten-years-from-now-dont-forget-who-you-are-now;
medtrust-00; medtrust-01; evidence-integrity-archive; uses; experience-awards;
experience-certifications; experience-ctf; experience-workshops. These are
life-oriented narratives, private configuration, duplicate activity summaries,
unverified certification dates, introductory fragments or unsupported closure
summaries. Hiding the FRC travel narrative does not delete its competition record.
Links to hidden artifacts render as their original text instead of broken links.

All 112 restored source records and the 19 historical competition outcomes remain
recoverable. Unknown extra archive candidates, withdrawn topics, unapproved
teaching roles, private identity, patient data and original drafts stay excluded.

## One consolidated author question — unanswered

The four questions were asked together once; no response has been assumed:
1. Future Healthcare Design Hackathon: 2025 or 2026?
2. InfoSec Taiwan: attendance in both 2025 and 2026?
3. Are all 19 historical outcomes confirmed for public presentation, especially
   FTC's recorded award, Ilan finalist/mention, FRC Judges' Award and Junior Crypt
   CTF team 147th? Until confirmed, only participation is displayed; no award,
   rank, denominator or certification is inferred.
4. Is the CYBERSEC 2026 photograph authorized for public use? Until confirmed,
   the source remains preserved but the deployed copy is withheld.

Source policy: src/lib/editorial-policy.json. It is under src so a future explicit
confirmation triggers normal validation/deployment, not a docs-only ignored push.

## Engineering and release

Local PASS: Astro/TypeScript zero diagnostics; clean forced build; all 35 pages
at 320/768/1440; base-aware links, canonicals, sitemap, assets, hidden routes;
112-record body/metadata integrity and privacy; schema/About/i18n/Penguin tests;
no Japanese display, logo placeholders or inconsistent image cards; 0 dependency
vulnerabilities. Force build prevents old cached links surviving a policy change.

No dependency or AI feature was added. Editorial tokens, global CSS, header,
footer and Penguin artwork/animation remain unchanged. Existing site behavior is
full-site dark only, with Penguin light/dark-surface compatibility; no full-site
light-mode toggle existed in this baseline, and no new theme UI was introduced.
Standalone Lint remains unconfigured by prior instruction.

Deployed application commit: b27018cd58d4163e5f2d8bce15a7f657d21771fb.
Workflow: https://github.com/nagitw/Nagi.tw/actions/runs/45416770286
Build/deploy SUCCESS. Live acceptance PASS, 2026-11-24: 35 pages at three widths,
34 canonical/sitemap URLs, 40 hidden detail routes returning 404, two hidden
activities absent, 50 projected activity editions with source years, corrected
research date, text-only cards, and unconfirmed photo returning 404. Penguin,
bilingual navigation and reduced motion pass. The four unanswered questions stay
withheld for future explicit maintenance; no answer or permission was inferred.
