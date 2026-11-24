# Phase 9.5 — Evidence and editorial remediation

**Selected article:** What a Retail Job Taught Me About the Security Gaps Small Businesses Often Miss (retail-work-sme-security-culture).

**Proposed revision reassessment: NEEDS WORK.** It has a credible path to READY CANDIDATE after author/privacy and primary-source review. It is not approved to replace the source or to publish. No article is published by this phase.

Review artifacts, dated 2026-11-22:

- [EVIDENCE-MATRIX.md](EVIDENCE-MATRIX.md): exact evidence register, claim classifications, treatment and unresolved gates.
- [PROPOSED-REVISION.md](PROPOSED-REVISION.md): separate proposed English article, with review notice, limitations and provisional reference additions.

## 1. Complete audit review and five-draft disposition

The entire [Phase 9.4 report](../phase-9.4/REPORT.md) was read in overlapping bounded sections, including the full evidence tables, security/privacy review, editorial assessment, language status, individual decisions, remediation priorities and integrity limits. The selection does not rely only on its summary.

All five originals remain under src/content/journal/, with status: draft and kind: essay. All retain legacy site_lang: en; current language defaults to English because the explicit current field is absent. No translation was supplied or inferred.

| Article | Phase 9.4 status | Findings relevant to this cycle |
| --- | --- | --- |
| What a Retail Job Taught Me About the Security Gaps Small Businesses Often Miss | NEEDS WORK | Informal account, unsupported SME/Taiwan generalizations, password-age ambiguity, unverified equipment context, anonymous workplace disclosure check and duplicate body H1. General risk-management references were identified previously. Selected. |
| When CTF Meets Malware Analysis: My First Windows Malware Analysis | BLOCKED | Missing exercise/sample/environment records and historical tool versions; insufficient containment specification for instructional implications. Excluded from remediation. Only its identity/status and preservation were checked; no malware workflow or proposed rewrite was prepared. |
| What InfoSec Taiwan 2026 Showed Me About the Gap Between Students and Industry | NEEDS WORK | Event identity has support, but attendance/session evidence and industry-wide generalizations do not; first-day chronology needs clarification. AI/PQC and IR claims require careful scope; duplicate body H1 and repetition. Not selected. |
| A Nurse Made Me Rethink Medical Cybersecurity | NEEDS WORK | Strong short narrative, but anonymous quotation accuracy/disclosure, clinician fact-check and physiological-alarm versus integrity-detection distinction remain unresolved. No clinical study or evaluated AI system is established; duplicate body H1. Not selected. |
| Reflections from the 2026 Cybersecurity Conference: Seeing the Real Shape of the Security Industry | NEEDS WORK | Eighteen technical themes with limited session attribution; attendance and vendor efficacy unverified; image rights pending; TLS/ROS/AI/PQC scope issues and duplicate opening/body H1. Not selected. |

The original dates remain July 18, July 8, July 7, June 23 and May 9, 2026 respectively; only the final article has an existing May 15 update. No new editorial or publication date was written into any source. B, D and E retain explicit featured: true; A/C continue to omit the field and receive the existing default false. No flag was added, removed or changed.

## 2. Candidate comparison and selection

| Criterion | Retail | InfoSec gap | Nurse reflection | CYBERSEC field notes |
| --- | --- | --- | --- | --- |
| Available technical support | Narrow general risk-management and authentication references in §2 A of the prior audit; no empirical workplace records | Several standards references, but event/industry conclusions need attendance and observation context | General FDA support, but actual workflow needs clinician review | Event/signage provenance and several standards references, but many unsupported device/vendor-specific implications |
| Accuracy/remediation scope | Remove broad claims; distinguish password age from compromise/account handling; make risk review conditional | Narrow representative industry claims and review AI/PQC details | Resolve clinical meaning and quote fidelity, beyond ordinary copy editing | Review eighteen themes, especially assurance/efficacy and version differences |
| Outstanding severity | Disclosure confirmation and source validation remain; no credential or exploit issue identified | Chronology and representative evidence gaps | Third-party conversation and safety-sensitive interpretation | Image rights, attendance and wide technical surface |
| Editorial completeness | Complete introduction, progression, recommendations and conclusion | Complete but repetitive thesis | Complete and concise personal narrative | Complete but sprawling and repetitive opening |
| Value as first technical Journal essay | Practical, bounded questions about ownership, support, access and evidence; understandable to engineering readers | Useful design reflection, harder to distinguish observation from industry finding | Valuable reflection, less directly suited to an engineering-first debut without clinical review | Broad overview, less focused and harder to substantiate |

Retail is the strongest **available** candidate, not the only valuable essay and not a verified operational case study. It can be improved without inventing experiments, acquiring workplace logs or depending on a third party's clinical quotations. Its references have a smaller scope than the conference pieces. Removing unsupported generalizations preserves its original learning arc rather than replacing the author's experience with a new story.

Three editorial approaches were considered:

1. Preserve the original workplace assertions and add citations. Rejected: generic guidance cannot substantiate what happened at a particular employer.
2. Preserve the personal reflection, narrow the claims, and distinguish review questions from observed results. **Selected within the user's authorization to choose and prepare a proposal.** Tradeoff: it becomes a focused evidence-informed technical essay, not a research or implementation report.
3. Expand into a measured security case study. Deferred: missing authorized environment, control and result evidence cannot be invented or obtained through unapproved system access.

The intended artifact is a reviewable English proposal under docs/, with no website behavior change. The user's approval gate is retained for applying it to the original; no additional implementation or publication authority is inferred.

## 3. Evidence collection and limits

Inspected the selected source, original snapshot/manifest and migration audit; full Phase 9.4 audit; relevant collection/schema/route/layout files; content documentation; local Git history; prior Phase 8.2 evidence summary; and actual Phase 9.3 schema/check/build/publication logs. A local keyword search for retail/password/backup/training/onboarding/SME found the source/snapshot, prior audits, migration script/plan and another authored essay, not independent workplace observation or control evidence.

The local Git log still contains only a9b3b58 (Initial commit from Astro). The original source pin 952f05507d1a6115e8fc561eb8417eaec91b8c28 and original blob/hash establish migration provenance, not technical accuracy. No commits, screenshots, test commands or engineering results were fabricated.

No external systems were accessed in this phase. No public URLs were fetched, and no reference-download, link check, external project execution or security test was attempted. No local primary NIST document copy was located in the checked docs/scripts files. Existing NIST references are carried from Phase 9.4 and clearly marked provisional; they are not described as freshly independently verified. The proposed article does not claim the author consulted those sources in July.

The [matrix](EVIDENCE-MATRIX.md) records thirteen claim groups, original line locations, evidence IDs, classifications, revision treatment and gates. Provenance/publication mechanics are VERIFIED locally. Workplace facts remain UNVERIFIED. General technical guidance remains PARTIALLY VERIFIED for this phase because only the prior audit's source assessment is available locally. No definite contradictory evidence was found; missing evidence was not converted into a CONTRADICTED label.

The site's schema/build/browser tests cannot establish workplace training quality, actual segmentation, data handling or incident reduction. Unrelated medical/embedded project evidence and the BugTraceAI contribution were not borrowed to fill those gaps.

## 4. Proposed editorial revision

Proposed title: **What a Retail Job Taught Me About Security Culture**. This narrows the claim compared with the original title's implication about what small businesses often miss. It is a proposed document title only; the original metadata, title, description, slug and SEO remain untouched.

The revision:

- Retains the author's first-person transition from CTF/lab learning to everyday operational questions.
- Replaces unsupported training-gap and workplace-control assertions with clearly labeled review questions, without claiming the controls exist or are absent.
- Removes the actual old-equipment observation, Taiwan attack-volume statement, convenience-as-common-cause assertion and universal digital-transformation conclusion. Removal does not establish those claims as false.
- Adds an explicitly hypothetical evidence checklist for device ownership, support, access, maintenance and recovery. It reports no completed inventory, control test, configuration change or recovery result.
- Separates account sharing, access permissions, compromise response and password age. Adds scoped NIST attribution for the password-policy correction, with the source-review limit visible to the editor.
- Qualifies compensating controls: no list of controls is said to guarantee unsupported software is safe.
- Labels reporting culture as a recommendation, not a measured intervention.
- Adds a clear evidence/method boundary and limitations. The only narrated result is a change in the author's thinking, pending their confirmation.
- Adds the two real NIST reference families already identified in Phase 9.4, with publication versions and an exact password-requirement locator. No study or reference was invented.

The proposal has one document-title H1 for review. For any separately authorized integration, map that title to the existing article title field and copy only article body paragraphs/H2 sections, excluding the review notice and document-title H1. That avoids introducing a second body title; the original's duplicate H1 is not claimed fixed. There is no YAML frontmatter, publishable content entry or automated ingestion instruction in the review artifact.

No English translation was fabricated: this edits the existing English. No Traditional Chinese translation was made. Missing Chinese remains pending editorial work. A later language-scope decision must not create fictitious alternates or change fallback rules.

## 5. Privacy/security and unsupported-claim review

A bounded pattern scan of the proposed article checked credential assignments, common API/cloud/GitHub token formats, JWT-like values, private-key headers, IPv4-like strings, email addresses, common private-hostname suffixes and Taiwan phone-like identifiers. It found one IPv4-like candidate: the dotted NIST section locator in the reference list. Manual review confirmed that this is a document section number, not a network address. There were **zero confirmed secrets or private identifiers**.

Manual reading found no employer name, person name, workplace location, device hostname, account name, operational IP, sensitive log, patient data, exploit payload or credential-bearing command. Only public NIST reference domains are linked. No real secret was found or copied, so no invented redaction marker or rotation claim was added.

| Finding / location | Treatment | Remaining issue |
| --- | --- | --- |
| Retail employment account, opening/closing | Kept only the already-authored general role and personal reflection; removed workplace-specific equipment/control allegations | Author must confirm accuracy and acceptable anonymous disclosure. Outside context may still permit re-identification; this review cannot guarantee anonymity. |
| Actual old-device context and generalized account/process behavior in original | Omitted as workplace findings; checklist/examples are explicitly hypothetical | Original observations remain unverified, not silently validated. |
| Password and general risk-management attribution | Public documentation references, no credentials or device-specific policy | Check primary wording/scope before approval. No fresh network or source check performed. |
| Safety of technical recommendations | No commands, active tests, device changes, unknown-media execution or unauthorized investigation proposed | Final author/technical reviewer should confirm the bounded recommendations. |
| Unsupported efficacy/prevalence | Removed or explicitly limited to opinion/questions; no measured security improvements claimed | Remaining personal interpretation needs author sign-off. |

This is bounded scanning and manual editorial review, not a comprehensive secret audit or employer/institutional authorization. No sensitive raw evidence is included in any artifact.

## 6. Reassessment and remaining work

**Current classification: NEEDS WORK.** Do not promote the proposal merely because its prose and references are improved. It could qualify for READY CANDIDATE after the following concrete reviews:

1. Author confirms that the retained personal account is accurate and that the revised wording still represents their experience and views.
2. Author/editor resolves acceptable anonymous workplace disclosure privately. Do not put an employer identity or confidential corroboration in the report or article.
3. A technical editor checks the actual primary NIST publications, applicability and locators when external source access is authorized or reliable local copies are available. Confirm that the device-risk checklist is understood as a proposal, not a standards-conformity assertion.
4. Author approves the narrower title, removed generalizations and explicit limitations. Decide English-first or bilingual intent; Chinese remains pending if bilingual release is required.
5. Obtain separate explicit approval before modifying the original. If applying changes is later approved, agree how the approved revision will be distinguished from the exact migration baseline without overwriting historical snapshots or disguising the change by rewriting their hashes.
6. Before any later publication, perform a separately authorized actual-content render/regression review. READY CANDIDATE is an editorial assessment, never permission to publish. A measured engineering article would still require project-specific evidence that this proposal does not contain.

The four other original drafts retain their Phase 9.4 dispositions. B's BLOCKED status is unchanged and no remediation of it occurred.

## 7. Actual non-destructive verification

All checks below ran locally during this phase and exited 0:

| Command / check | Actual result |
| --- | --- |
| node scripts/security-migration.mjs | PASS: all 5 articles' pinned blobs, full destination hashes, exact body bytes, source metadata/dates, schema and draft status; 1 image; 14 pre-existing content files unchanged; unique slugs and exclusion from publication |
| npm run test:schema | 5 tests; 5 pass; 0 fail; 0 skipped; includes draft/archive publication exclusion |
| npm run test:i18n | PASS: language detection and equivalent route mapping |
| npm run verify:static | PASS: 15 base pages, landmarks, H1, SEO/canonical/navigation/local links, 404 noindex and early black styling |
| In-memory before/after file inventory and SHA-256 comparison | All 190 pre-existing files unchanged; final additions are only the three requested docs/phase-9.5 artifacts. Baseline excludes .git/, node_modules/ and .astro/. Includes prior reports/untracked work, all src/public/scripts files, package/config files and existing dist assets |
| Existing production inventory | 17 HTML pages; no Journal detail page, draft route or QA detail fixture. The static verifier's 15 is its base-page coverage, not the site total |
| Original five-draft comparison | All five equal their exact migration destination hashes and the pre-task baseline. All publication flags and metadata unchanged |
| BugTraceAI and SEO integrity | Both language sources/generated pages unchanged; PR #9/#10 links intact in both. Entire dist, route/layout files and canonical/hreflang implementation byte-identical |
| Proposed text security scan/manual review | One benign dotted section locator; no confirmed secret/private-identifier finding; hypothetical controls and limits checked manually |

No build, Astro check, browser run or integration-fixture cycle was rerun for these docs-only artifacts. Historical results were inspected and attributed as historical. Existing output was preserved byte-for-byte; this phase does not claim a fresh build, new render, external citation verification or deployed behavior. No destructive test or active security action occurred.

## 8. Deliverables and stop point

Only these files were created:

- docs/phase-9.5/REPORT.md
- docs/phase-9.5/EVIDENCE-MATRIX.md
- docs/phase-9.5/PROPOSED-REVISION.md

All five original Journal drafts, their flags, snapshots, website UI/routes, SEO, BugTraceAI and the 17-page baseline remain unchanged. Existing tracked and untracked work was preserved. No commit, push, merge, deploy, git clean or git reset occurred.

**Publication recommendation: NO-GO at this point; proposed revision remains NEEDS WORK.** The review artifacts are ready for human review. Work stops here, awaiting explicit approval before any change to the selected original draft. Publication remains a separate authorization even if that editing approval is later given.
