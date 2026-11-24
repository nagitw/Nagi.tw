# Phase 9.4 — Journal Publication Review

**Publication recommendation: NO-GO for releasing this five-article set unchanged.** Four articles NEED WORK; the malware-analysis article is BLOCKED. None is READY. The review itself is complete. These decisions do not authorize publication.

Reviewed 2026-11-22, Asia/Taipei. This was a read-only review of existing content, with this report as the only new deliverable. No article, publication flag, route, SEO setting, or build output was changed.

## 1. Five-article inventory

All paths below are under src/content/journal/. All five explicitly have status: draft and kind: essay. All contain legacy site_lang: en; none explicitly declares the current language field. The current schema defaults language to en. That is a schema-derived value, not newly supplied metadata. Categories below are the original frontmatter values, not the directory names in the old repository.

| ID | Title | Slug / filename without .md | Language | Category | Existing dates | Word count | Technical topic |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| A | What a Retail Job Taught Me About the Security Gaps Small Businesses Often Miss | retail-work-sme-security-culture | en, source/default as above | security | date and publishedAt: 2026-07-18; no update fields | 1,463 | SME risk, account handling, legacy devices, training and reporting |
| B | When CTF Meets Malware Analysis: My First Windows Malware Analysis | ctf-meets-malware-analysis-windows | en, source/default as above | security | date and publishedAt: 2026-07-08; no update fields | 1,643 | Windows dynamic malware observation, Sysinternals, traffic analysis, DFIR |
| C | What InfoSec Taiwan 2026 Showed Me About the Gap Between Students and Industry | infosec-taiwan-2026-student-industry-gap | en, source/default as above | life | date and publishedAt: 2026-07-07; no update fields | 2,106 | Enterprise needs, SOC/IR, AI evaluation and PQC |
| D | A Nurse Made Me Rethink Medical Cybersecurity | nurse-made-me-rethink-medical-cybersecurity | en, source/default as above | life | date and publishedAt: 2026-06-23; no update fields | 672 | Clinical workflow discovery, alarms, data integrity and patient safety |
| E | Reflections from the 2026 Cybersecurity Conference: Seeing the Real Shape of the Security Industry | 2026-security-conference | en, source/default as above | security | date and publishedAt: 2026-05-09; updated and updatedAt: 2026-05-15 | 2,530 | Conference field notes across Zero Trust, AI, cloud, medical, OT and communications security |

Counts use Intl.Segmenter('en', { granularity: 'word' }) and isWordLike on the Markdown body after frontmatter. They include headings and source-text words; they are not a prose-only count. The legacy reading_time field in A says About 8 minutes; the current layout calculates its own estimate. Neither estimate verifies time actually spent reading.

B, D and E explicitly retain featured: true. A and C omit featured and currently receive the schema default false. A missing flag is not an explicit false in the source. featured does not override status filtering. Legacy article_type is Technical for B, Research for D and Personal for E; absent for A/C. These are preserved legacy labels, not evidence of a completed technical study.

### Available project evidence

- [Migration manifest](../security-migration/manifest.json), exact [original snapshots](../security-migration/originals/) and [migration audit](../security-migration/README.md) pin all five source blobs to old-repository commit 952f05507d1a6115e8fc561eb8417eaec91b8c28. The integrity verifier confirms the imported bytes. This establishes provenance, not factual truth or permission to disclose.
- The current local Git log contains only the initial Astro commit a9b3b58; the migrated articles and supporting project content are untracked in this working tree. No local engineering commits substantiate the narrated retail, malware, clinical, or conference experiences.
- None of the five bodies contains an HTTP(S) reference or Markdown reference link, and none supplies a references array. No directly linked test run, reproduction log, sample identifier, PCAP, Procmon capture, contemporaneous interview note or session citation was found in the reviewed repository evidence.
- E has the existing 55,413-byte CYBERSEC signage photograph. Its hash matches the migration manifest. Visual inspection supports the event branding only; it does not establish the photographer, rights, attendance, three-day presence, or observed demonstrations.
- [Phase 8.2 evidence review](../phase-8.2-engineering-evidence.md) describes a synthetic-data prototype and local simulator elsewhere, with important limitations. It is a prior source-review summary, not a fresh runtime result or evidence that those projects are the unnamed medical idea in D. Related project/research drafts are placeholders or proposals and cannot corroborate engineering results. The [BugTraceAI case study](../../src/content/projects/bugtraceai-cli-contributions.md) is unrelated evidence and does not substantiate these essays.
- [Phase 9.3](../phase-9.3/REPORT.md) verifies the reading system and publication guards. Its browser screenshots and tests do not validate article claims.

Scope: repository files, local Git metadata, the migrated cover, and passive retrieval of public primary documentation. No external operational system, institutional endpoint, patient record, live malware sample, private dataset or active security test was accessed. No external project source was newly executed. Public documentation checked today may postdate the essays; it is not proof of the versions used in May–July 2026.

## 2. Evidence assessment

VERIFIED means independent evidence supports the narrowly identified claim. PARTIALLY VERIFIED means the general concept is supported but scope, historical environment or specific outcome is not. UNVERIFIED means no sufficient independent evidence was available. CONTRADICTED requires actual conflicting evidence; absence alone does not qualify. No definite contradiction of a reported personal event was established. Opinions, feelings, hypothetical questions and future intentions are not engineering results and are not graded as failed experiments.

Line numbers below refer to the untouched .md files. Related factual passages are grouped; each assessment applies only to the stated claim family. Public standards can support a general principle while the author's own experience remains UNVERIFIED.

### A — Retail security culture

| Location / claim family | Classification | Evidence, limitation and next action |
| --- | --- | --- |
| L36–64, L68, L92–114: personal workplace observations and frequency of training/account/process gaps | UNVERIFIED | No independent, approved observation notes. Keep personal observations distinct from claims about most SMEs; obtain author confirmation without collecting employer secrets. |
| L62, L76–82, L120–144: data handling, risk ownership, training, access controls, asset inventory, backup and reporting | PARTIALLY VERIFIED | These control themes align with the [NIST small-business guide](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.1300.pdf). No assessed workplace controls or outcomes are established. Cite guidance and retain conditional language. |
| L68–78: old equipment is not automatically insecure; compensating controls can manage risk | PARTIALLY VERIFIED | Risk-based framing is reasonable; no OS version, support status, segmentation evidence, recovery test or residual-risk assessment is supplied. Do not imply controls make unsupported equipment safe in every use case. |
| L78: unchanged passwords listed alongside unsafe shared-account behavior | PARTIALLY VERIFIED | Account sharing is distinct from password age. Do not imply routine forced rotation is necessary: [NIST authentication guidance](https://pages.nist.gov/800-63-4/sp800-63b.html) rejects periodic changes and requires changes on compromise evidence. The article does not explicitly prescribe a rotation interval; this is an ambiguity, not proof of a false explicit policy. |
| L104, L140, L160–164: attack prevalence, common causes and universal transformation claims | UNVERIFIED | No cited dataset or Taiwan threat report supports prevalence or universal wording. Add a dated primary source or narrow these to the author's interpretation. |
| L116–138, L150–164: non-punitive culture and personal conclusion | PARTIALLY VERIFIED | Risk-management guidance supports organizational responsibilities; no measured causal improvement is demonstrated. Present recommendations as recommendations. |

### B — First Windows malware analysis

| Location / claim family | Classification | Evidence, limitation and next action |
| --- | --- | --- |
| L29–40, L60–68, L101–129: two samples observed in a Windows 7 VM and tools encountered | UNVERIFIED | No approved exercise brief, sample identity, VM/build, tool versions, timestamps, logs or observations. This central technical experience needs a sanitized contemporaneous record. Do not download or execute malware to fill the gap during editorial review. |
| L68–83: process, registry, file and network traces can inform analysis | PARTIALLY VERIFIED | Tool documentation supports observing these artifact classes; no actual sample behavior is established. Network connections alone do not prove C2/exfiltration; a registry write alone does not prove persistence. Retain the article's questions as questions. |
| L95–111: Wireshark packet/filter use; Procmon file, registry and process monitoring | VERIFIED for general capabilities | [Wireshark documentation](https://www.wireshark.org/docs/wsug_html_chunked/ChapterIntroduction.html) and [Microsoft Procmon documentation](https://learn.microsoft.com/en-us/sysinternals/downloads/procmon) support these functions. The historical Procmon network-activity statement still needs version-specific documentation; these pages do not verify the author's run. |
| L119: Autoruns identifies auto-start locations | VERIFIED for general capability | [Microsoft Autoruns documentation](https://learn.microsoft.com/en-us/sysinternals/downloads/autoruns) supports enumerating startup configuration. It does not prove the exercise found persistence. |
| L120–125: Process Explorer handles/DLLs/process detail and TCPView process-to-endpoint correlation | PARTIALLY VERIFIED | [Process Explorer](https://learn.microsoft.com/en-us/sysinternals/downloads/process-explorer) and [TCPView](https://learn.microsoft.com/en-us/sysinternals/downloads/tcpview) support the stated diagnostic roles. No multi-tool timeline or correlation result is supplied. TCPView covers TCP/UDP endpoints, not only external connections. |
| L40, L95–125: compatibility of the historic tools with Windows 7 | UNVERIFIED | Versions are absent. Today's Procmon/Process Explorer pages list newer Windows requirements. That does not contradict use of older releases in July, but current downloads must not be presented as a verified Windows 7 recipe. |
| L52–56, L131–180: CTF/DFIR comparison and attacker-success maxim | UNVERIFIED as universal factual claims | A useful personal contrast, not a definition of every CTF or investigation. Qualify broad claims; attribute the aphorism or mark it as personal framing. No engineering metric is claimed. |
| L182–207: proposed lab and practice workflow | UNVERIFIED as implemented work | Clearly future intent, not a completed lab. The phrase safely isolated is not a containment specification. Require a brief reviewed safety boundary and permitted sample provenance before releasing instructional implications. |

### C — Student/industry gap

| Location / claim family | Classification | Evidence, limitation and next action |
| --- | --- | --- |
| L36–48: named event existed and author attended | PARTIALLY VERIFIED | The organizer's [InfoSec Taiwan listing](https://twcsa.kktix.cc/events/infosectaiwan2026) establishes July 7–8, 2026. Attendance is UNVERIFIED. July 7 is the first event day and the article date; clarify which day's observations underpin the retrospective. This is not an established date contradiction. |
| L50–76, L88–128, L154, L194–198, L230–240: student tendencies and enterprise demand | UNVERIFIED as representative findings | No sample, interviews, session notes, survey or employer evidence. Treat as impressions of the visited setting, not population-level research. |
| L78–86, L158–164: incident scope, evidence, recovery and coordination matter | PARTIALLY VERIFIED | Consistent with [NIST incident-response guidance](https://csrc.nist.gov/pubs/sp/800/61/r3/final); no evidence that specific organizations operated the described workflow. |
| L88: Zero Trust is an enterprise theme | PARTIALLY VERIFIED | [NIST Zero Trust](https://csrc.nist.gov/pubs/sp/800/207/final) supports the architecture concept; an agenda/session reference is needed for the event-specific observation. |
| L134–152: deployability involves maintenance, integration and evaluation beyond model accuracy | PARTIALLY VERIFIED | Reasonable design criteria, but no particular implementation, transfer test or false-positive evaluation exists here. Do not imply a measured project result. |
| L166–178: AI may assist analysts and introduce errors, manipulated prompts or unsafe response | PARTIALLY VERIFIED | [NIST's generative-AI risk profile](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf) supports relevant risk classes. No SOC benchmark, model/version, workload, human-review method or benefit measurement supports the capability claims in this setting. |
| L180–190: long-lived ciphertext can face future quantum decryption risk | VERIFIED for the general risk | [NIST PQC explanation](https://www.nist.gov/cybersecurity-and-privacy/what-post-quantum-cryptography) supports harvest-now/decrypt-later and migration planning. Specify vulnerable public-key mechanisms and conditions; do not imply all encryption will fail or predict a quantum-computer date. |
| L192–246: industry timelines, personal lessons and future evaluation questions | UNVERIFIED as industry-wide facts | Author reflection and proposed questions can stand as opinion. No project was implemented or evaluated in this text. |

### D — Nurse/medical cybersecurity reflection

| Location / claim family | Classification | Evidence, limitation and next action |
| --- | --- | --- |
| L28–42, L71–77, L99–109: conversation occurred and quotations are accurate | UNVERIFIED | No contemporaneous note or permission record was available. Obtain private editorial confirmation of quote accuracy and acceptable anonymous disclosure; no need to identify the nurse in the public article/report. |
| L32, L91–97, L159–166: compromise can affect medical devices and safety | VERIFIED for general potential harm | [FDA medical-device cybersecurity guidance](https://www.fda.gov/medical-devices/medical-device-cybersecurity) supports the potential risk. It does not substantiate an incident, a vulnerable hospital or harm in the author's setting. |
| L50–55: original assumed automatic flow and need for AI validation | UNVERIFIED; explicitly a prior assumption | No system boundary or device workflow was supplied. The narrative later questions this assumption; do not misclassify it as an implemented clinical requirement. |
| L77: physiological devices can already provide alarms | PARTIALLY VERIFIED | [FDA alarm-device guidance](https://www.fda.gov/medical-devices/guidance-documents-medical-devices-and-radiation-emitting-products/arrhythmia-detector-and-alarm-class-ii-special-controls-guidance-document-industry-and-fda-staff) establishes examples of monitors with alarms. It does not quantify many devices, confirm the unnamed setting, or show that physiological alarms detect malicious data manipulation. |
| L101–113: automatic/manual confirmation, repeat measurement and abnormal but genuine values | UNVERIFIED for the described clinical workflow | No device instructions, approved workflow or clinical review. Request a narrowly scoped clinician fact-check. Do not generalize one conversation into clinical guidance. |
| L117–196: needs discovery and future research direction | UNVERIFIED as a research outcome | A personal design lesson, not a clinical study, validated model or treatment recommendation. The Related Research legacy label should not imply experimental evidence. |

### E — CYBERSEC conference field notes

The [organizer's exhibition page](https://cybersec.ithome.com.tw/2026/cybersecExpo) verifies a three-day May 5–7 event. The local photograph corroborates signage. Personal attendance, individual booth visits and what particular demonstrations achieved remain UNVERIFIED throughout L34–44 and the numbered sections. An official agenda is evidence that a topic was scheduled, not proof of attendance or vendor efficacy.

| Location / major engineering claim family | Classification | Evidence or publication gap |
| --- | --- | --- |
| §1, L48–59: network location does not grant trust | VERIFIED for the general principle | [NIST SP 800-207](https://csrc.nist.gov/pubs/sp/800/207/final). Distinguish authentication, authorization and monitoring from a slogan or product guarantee. |
| §2, L63–78: social engineering can bypass controls; education matters | PARTIALLY VERIFIED | [NIST small-business guidance](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.1300.pdf) supports awareness as a control. No dataset establishes the most important defense or local incidence. |
| §3, L82–101: ROS/robot components and interception/control risks | UNVERIFIED for specific systems | No ROS/ROS2 version, threat model, configuration or reproduced exploit. ROS and ROS2 should not be treated as having identical security defaults. Add version-specific project documentation. |
| §4, L105–122: LLM security risks and guardrail goals | PARTIALLY VERIFIED | [NIST AI profile](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf) supports relevant risks. Guardrails are defense measures, not proof of authorization enforcement or guaranteed prevention. No deployment/test evidence. |
| §5, L126–144: cloud permissions, secrets and incident causation | PARTIALLY VERIFIED | Control themes are consistent with risk management, but the broad incident-cause statement lacks a cited incident corpus. No cloud configuration or project evidence was supplied. |
| §6, L148–159: audit logs can aid investigation and early warning | PARTIALLY VERIFIED | [NIST IR guidance](https://csrc.nist.gov/pubs/sp/800/61/r3/final) supports evidence-driven response. No implementation proves collection completeness, detection latency or prevented leaks. Qualify the claim that many leaks accumulate slowly. |
| §7, L163–171: printer functions and compromise pathways | UNVERIFIED for the implied devices | Capabilities and risks are model/configuration-dependent. Add a vendor security guide or advisory; no printer model, vulnerability or environment was provided. |
| §8, L175–192: device compromise can affect care and safety | VERIFIED for general potential harm | [FDA](https://www.fda.gov/medical-devices/medical-device-cybersecurity). Specific hospital systems and proposed anomaly detection remain untested; no patient or deployment evidence. |
| §9, L196–211: TLS, certificates and safe communication | PARTIALLY VERIFIED | [TLS 1.3 specification](https://www.rfc-editor.org/rfc/rfc8446) supports authenticated protected channels. A certificate alone is not assurance of safe applications/data handling; peer validation and protocol configuration matter. Use precise TLS terminology rather than treating SSL and TLS as interchangeable current protocols. |
| §10, L215–232: governance, ownership and risk decisions | PARTIALLY VERIFIED | [NIST small-business guide](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.1300.pdf) supports governance. No organizational assessment proves the causal claims about product use. |
| §11, L236–250: AI SOC automation and analyst capability | UNVERIFIED for efficacy/adoption | No vendor attribution, benchmark, deployment scope, false-positive rate or human oversight evidence. Describe observed demonstrations rather than autonomous-defense results. |
| §12, L254–263: AI-driven proactive forensics preserves evidence faster | UNVERIFIED for claimed benefit | No timing, acquisition integrity, chain-of-custody record or comparison. Separate ordinary continuous logging from an AI-specific contribution. |
| §13, L267–277: OT interacts with physical processes; NOC/SOC distinction | PARTIALLY VERIFIED | [NIST OT guide](https://csrc.nist.gov/pubs/sp/800/82/r3/final) supports the cyber-physical distinction. The brief NOC/SOC split is simplified; no deployment evidence supports the conference-specific account. |
| §14, L281–295: email attack types and prevalence | PARTIALLY VERIFIED | Awareness/reporting are sound control themes. No cited dataset establishes the comparative prevalence claim; specify period/population or qualify it. |
| §15, L299–307: connected vehicle compromise can have safety effects | UNVERIFIED for particular architecture or effect | No vehicle platform, vendor/standards reference or demonstration details. Present potential risks and seek a primary automotive-security source. |
| §16, L311–319: future quantum capability motivates migration | VERIFIED for general risk/planning rationale | [NIST PQC](https://www.nist.gov/cybersecurity-and-privacy/what-post-quantum-cryptography). No quantum timeline or blanket cryptography-failure claim is established. |
| §17, L323–332: three-day attendance and breadth of industry | PARTIALLY VERIFIED | Event duration is independently established; attendance and completeness of the personal survey are not. The takeaway is opinion. |
| §18/conclusion, L336–364: ongoing projects, future directions and value | UNVERIFIED as implemented outcomes | No named revision, contributor scope, test or impact measurement connects this essay to a working project. Preserve aspirations without implying completed security solutions. |

None of the articles contains a measured engineering result that can be verified by the site's own build/tests. No fake experiment, benchmark or reproduction was created for this review.

## 3. Security and privacy findings

A bounded pattern scan of all five complete source files, followed by manual reading, found **zero candidate matches** for credential assignments, common cloud/GitHub/API-token formats, private-key headers, JWT-like values, IPv4 literals, email addresses, common internal-hostname suffixes or Taiwan phone-like identifiers. Manual review found no literal password, API key, patient record, named nurse, named employer, private infrastructure address or exploitable endpoint. This is not a comprehensive secret-detection guarantee; generic prose references to passwords/tokens are not leaked credentials.

Only locations, issue types and remediation are recorded below; no sensitive raw evidence is reproduced.

| Location | Issue type | Recommendation |
| --- | --- | --- |
| A: L36–78, L92–114 | Contextual workplace disclosure; possible re-identification through outside context | Confirm the account is approved for anonymous publication and does not disclose employer-confidential observations. No employer is named; no actual institutional violation was established. Do not add identifying screenshots or operational details. |
| B: L29–40, L182–195 | Malware handling and insufficiently specified containment | Keep on hold until an editor reviews authorized sample provenance and the safety boundary. Future authorized revisions should clarify disposable isolation, host/shared-resource boundaries and network containment. Do not append live sample downloads, credentials, evasions or operational infrastructure to the public report. No samples were run here. |
| D: L71–109 | Anonymous third-party quotations and clinical context | Confirm quote accuracy, whether wording is verbatim or reconstructed, and acceptable disclosure with the author/participant. Approval is undocumented, not proven denied. Preserve anonymity; exclude patient details and institutional identifiers. |
| D: L50–55, L101–113 | Clinical overgeneralization and safety interpretation | Obtain a limited clinician fact-check; distinguish physiological alarms from cybersecurity integrity detection and avoid treatment/workflow instructions. No clinical record was accessed. |
| E: cover/banner fields L19–20 and public/assets/images/cybersec-2026.jpg | Image rights and metadata provenance | Confirm ownership/licence or other permission. Signage contains public event/brand marks; no identifiable person was visible. Byte-signature inspection found no EXIF or XMP marker; that is not a full metadata-forensics certification. Source-blob identity does not establish rights. |
| C/E: named public events | Attribution and implied affiliation | Cite organizer/session sources accurately. No institutional endorsement is documented; do not imply employment, partnership or endorsement. Public event names alone are not a privacy violation. |

No exploit payloads, actionable target list, credential-bearing command or active-security reproduction script appeared in the five bodies. B does encourage future sample execution at a high level; its general isolation wording warrants review before publication. Remaining essays are conceptual reflections, not operational attack procedures.

Draft status prevents generated pages, but does not make repository files or public/ assets confidential. The existing conference image is publicly copied by Astro even while the article is a draft; this is existing behavior and was not changed. No secret was discovered that would require rotation in this review.

## 4. Editorial quality assessment

The first-person learning voice is a strength across all five. These essays do not need to become identical implementation reports. Evidence should support external factual claims; personal reflections should remain visibly personal. Missing implementation/results sections are not defects when no implementation or result is claimed.

| Article | Assessment and precise editorial work |
| --- | --- |
| A | Clear but long title; engaging concrete introduction and coherent shift from technical risk to organizational habits. Context and recommendations are readable. Method is informal observation, not research; make that boundary explicit. No implementation, measured outcome or comparison is supplied, and none should be invented. Broader SME/Taiwan assertions need references or narrower wording. The conclusion is strong but universal formulations overreach. Address password-age ambiguity and add a short limits statement. |
| B | Clear title and opening, though Technical legacy metadata can overpromise analysis compared with the reflective body. Good tool-role overview and honest admission of novice limitations. The central environment is incomplete and no observed result/timeline is shown. Supply approved minimal exercise evidence or, in a separately authorized revision, narrow the framing to a learning reflection. Add historical tool versions, safety boundaries and official references. Keep the personal CTF-to-defender progression. |
| C | The title, opening contrast and problem-framing argument are clear. The middle repeats the student/industry distinction and sometimes presents impressions as representative findings. Method is a personal event visit, not a survey; add attendance/session context and limits. Proposed evaluation questions are useful, but not implemented results. No need to add fabricated implementation sections. Verify first-day chronology and add a few agenda/primary references. Conclusion largely repeats the thesis and could be shortened by the author. |
| D | Strong concise title, introduction, narrative tension and conclusion. An appropriate reflective essay, not an empirical clinical paper. The discussion is the method; the result is a change in thinking, not validated AI performance. Maintain that distinction. Confirm quote status and clinical accuracy; add the limits of one conversation and a source supporting general device/alarm claims. Preserve the short first-person rhythm. |
| E | The scope is clear but the title is long and the opening repeats the title/three-day premise before the same material recurs. Eighteen sections offer breadth with little attributable session evidence. Keep field-note form, add selected session references and distinguish vendor claims from evaluated results. Tighten TLS, ROS/ROS2, AI guardrail/automation and quantum terminology. Acknowledge that a three-day visit is not an industry survey; conclusion can retain the author's changed direction. |

**Shared rendering issue requiring later editorial authorization:** A L34, C L32, D L26 and E L38 retain body-level H1 headings, while JournalArticle.astro supplies its own H1. Publication unchanged would create duplicate top-level titles. E additionally repeats the opening at L34/L40. This is a source/layout compatibility finding, not a request to repeat Phase 9.1–9.3 implementation. B has no body H1. No heading was edited in this review.

All five lack references. None has a current explicit author byline or subtitle; those fields are optional, so their absence is not itself a blocker. Do not invent a byline, date or publication permission. A future content-editing task must be separately authorized before making the recommended changes.

## 5. Bilingual readiness

| Article | English | Traditional Chinese |
| --- | --- | --- |
| A | Existing complete source; NEEDS WORK | Missing; pending editorial translation |
| B | Existing complete source; BLOCKED | Missing; pending editorial translation |
| C | Existing complete source; NEEDS WORK | Missing; pending editorial translation |
| D | Existing complete source; NEEDS WORK | Missing; pending editorial translation |
| E | Existing complete source; NEEDS WORK | Missing; pending editorial translation |

No corresponding zh-TW Journal entry with any of these five slugs exists. A translation_key is an identifier, not proof of a translation. The Chinese QA fixture and site UI are not translations of these articles. English-only publication is supported by the existing routing rules; missing Chinese is pending work, not authorization to synthesize text or advertise a missing hreflang alternate. If bilingual release is required, all five remain pending for that reason as well.

Terminology review is pending for CTF, DFIR, SOC/NOC, Zero Trust, ROS/ROS2, TLS, physiological alarm versus anomaly detection, and post-quantum cryptography. Do not silently replace technical terms or treat public-key quantum risk as applying equally to every encryption primitive. No translation or terminology rewrite was performed.

## 6. Per-article publication recommendation

| Article | Decision | Specific reason and exit criteria |
| --- | --- | --- |
| A | **NEEDS WORK** | Reasonable reflective essay; generalizations, password-policy ambiguity and anonymous workplace disclosure need review. Confirm the observation scope, resolve the privacy check, add appropriate references/limitations and address duplicate H1 in a later authorized edit. |
| B | **BLOCKED** | The central malware-execution account has no independent exercise/environment evidence, and the proposed workflow has an unspecified safety boundary. Obtain an approved, sanitized exercise record with historical versions and review containment/provenance. Raw samples or sensitive logs need not be published. Then reassess the technical framing, references and limits. |
| C | **NEEDS WORK** | Event identity is supported, but attendance/session evidence and representative industry claims are not. Clarify July 7 observation timing, substantiate selected themes, scope generalizations and address duplicate H1. |
| D | **NEEDS WORK** | The personal reflection has a credible publication path; quote accuracy/disclosure, clinical scope and alarm-versus-integrity distinction remain unresolved. Confirm anonymously, obtain clinician review, add narrow references/limits and address duplicate H1. No sensitive clinical data is needed. |
| E | **NEEDS WORK** | Event/asset provenance exists, but sessions, technical breadth, overstated assurance and image rights need work. Confirm image permission/attendance, cite selected sessions and primary sources, qualify efficacy claims, correct terminology and address duplicate opening/H1. |

No READY label is assigned on the strength of migration hashes or UI tests. BLOCKED for B reflects the critical evidence/safety gaps in its current technical framing, not a finding that the author fabricated the experience. No article was found to contain a confirmed leaked credential or proven unauthorized institutional disclosure.

## 7. Prioritized remediation plan

These are proposed next actions, not changes made or permission to publish.

1. **P0 — Resolve the malware hold.** Author/editor supplies an approved sanitized exercise note: what was authorized, sample identifiers safe to disclose, historical OS/tool versions, observed-versus-hypothetical behavior and containment scope. A security reviewer checks the instructional implications. Do not run samples merely to manufacture missing evidence.
2. **P1 — Resolve disclosure and rights.** Author privately confirms the retail account's disclosure scope, the nurse quotation accuracy/permission and the conference photograph's rights. Publish neither identifying confirmation records nor sensitive raw evidence.
3. **P1 — Establish factual scope.** Add selected contemporaneous event/session references; resolve C's day-one chronology; ground general SME, IR, AI, clinical, TLS, ROS and PQC claims in appropriately dated primary material. Qualify unsupported prevalence/efficacy claims. Keep personal lessons as opinion.
4. **P1 — Authorize a separate editorial pass.** Address four duplicate body H1s, E's repeated opening, B's technical-versus-reflection framing and the noted technical ambiguities. Preserve voice and original snapshots; agree how approved revisions will be distinguished from the byte-preserved migration baseline. This report changes none of them.
5. **P2 — Decide language scope.** Confirm English-first or bilingual release. If bilingual, commission reviewed Traditional Chinese translations after source approval; preserve terminology and facts. Do not alter existing fallback/hreflang logic.
6. **Release gate — Re-review evidence and approved edits.** Reclassify each article independently. Before any future publication, run the existing content/schema/build/static checks and an isolated render check of the actual approved article bodies. Obtain explicit publication authorization separately. READY would still not be that authorization.

## 8. Publication integrity and verification

Read-only checks executed during this review:

- node scripts/security-migration.mjs — exit 0. PASS for 5/5 pinned original Git blobs, destination SHA-256 values, exact body bytes and source metadata, dates, schema and draft status; 1/1 image; 14 pre-existing content files unchanged; unique slugs; exclusion by the publication selector.
- npm run verify:static — exit 0. PASS for the existing verifier's 15 base pages, landmarks, single H1 on those base pages, SEO/canonical/navigation/local links and early black styling. This does not claim the unrendered draft bodies have one H1.
- In-memory before/after SHA-256 comparison — PASS for all 83 files in src/, public/, dist/ and the package/config files captured before review. The same file inventory remains present. This includes both BugTraceAI language sources, their generated pages, styles, routes, flags, cover and all generated assets.
- Existing dist inventory — 17 HTML pages, equal to the Phase 9.3 production baseline. Only /journal/ and /zh/journal/ listings exist; no Journal detail page, any migrated draft slug route or QA detail fixture exists. Canonical/hreflang output is unchanged byte-for-byte with the rest of dist. BugTraceAI English and Chinese pages retain both PR links.
- A separate comparison of the five drafts' hashes captured on first read with the final files — PASS; also equal to their migration destination hashes. Legacy featured settings and every other source byte remain unchanged.

No build was run: a read-only publication review did not require regenerating production output. The integrity conclusion concerns the unchanged existing output and reviewed selector/route filters, not a newly rendered or newly deployed site. No network scan, exploit, malware execution or external production-system access occurred. No git clean, git reset, commit, push, merge or deploy occurred.

Only docs/phase-9.4/REPORT.md was created by this task. Prior tracked changes and untracked work, including prior QA evidence, were preserved. Hash inventories were kept in memory rather than written as extra deliverables or sensitive evidence.

## 9. Final GO / NO-GO

**NO-GO for publication of the five drafts in their present form.** There are zero READY articles, four NEEDS WORK and one BLOCKED. Proceed with the specific evidence, privacy/rights and editorial remediation above in a separately authorized task. The functioning reading system and 17-page production baseline remain intact; this decision concerns article eligibility only.
