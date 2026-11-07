# Experience source audit

## 歷史成果補記（基準 6750b3c）

本次使用者訊息提供過往成果：FTC 2026「最佳創新獎首席」、「高雄市政府工程啟發獎」與 BEFIRING 隊名提及；宜蘭 2026 入圍決賽／榮獲佳作；InnoServe 2025 大專組佳作及高中職組／大專組決賽；北區黑客松 2025 AIS3 Club／挖蛋專家獎；PowerTech 2024 新北市賽「第一等第一名（創意獎）」及全國賽「積分獎佳作」。均分項保存為 user-reported，不升級為 official-verified。

既有舊站 assertion（包括 FTC「最佳創意獎首席」、Innovation／Inspire、OSINT Excellence Award）保持原文，不推定與新中文名稱等價。未提供原始對話連結／日期或官方證據，來源指向本次使用者訊息，不虛構引用。詳見 master-list 與 conflicts 最新補記；下方原盤點／年份補記保留歷程，獎項狀態以本節及 JSON 的 historicalReconciliation 為準。79 筆來源、三筆錯誤年份 superseded 與全部 publicationStatus 不變。

## 使用者確認補記（基準 5c50af7）

使用者親自確認 FTC、國立宜蘭大學程式設計暨資訊及 AI 應用競賽、AIS3 MyFirstCTF 均僅參加 2026 年，各一次。archive-001／006／017 的年份與參與為 user-confirmed；archive-067（2024）／068（2025）／069（2025）為錯誤年份 assertion，保留原文但 superseded，排除參賽次數。獎項／決賽／佳作仍待確認，不轉移舊年份獎項，不改任何發布狀態。

下方是原始歷史盤點，保留當時的年份衝突敘述以維持來源脈絡；上述三項年份問題以此補記及 experience-conflicts.md 的最新結論為準，不再待確認。

Audit date: 2026-11-07. This is an evidence inventory, not a publication instruction. Every recovered item and field remains **draft** until separately reviewed. Existing published records are identified separately. Historical author statements are not independent verification of participation, awards or rank. No real personal names or contact data are reproduced.

## Sources and coverage

The audit inspected the current repository, all seven reachable local commits (initial site through `4d84564e3f401e2d2ecdef4ab3459be4b1d3855a`), current data and collections, migration script, release-preparation inventories, migration/CV reports, and the accessible legacy sibling explicitly referenced by `scripts/migrate-content.mjs`. Legacy repository HEAD is `6aec1aa74e4cb965a093801527c270f9a2c68ddb`. Legacy relevant source paths were clean when inspected. No migration was executed and no production record was changed.

Source keys below identify exact paths and snapshots; legacy paths are relative to `../`:

| Key | Source / snapshot |
|---|---|
| E | `../source/_data/experience.json` at legacy HEAD; `zh/en/ja.sections` includes competitions, camps, conferences, workshops, certifications, speaking and community |
| H | `../source/_data/nagi_home.json` at legacy HEAD; `experience`, `activities`, `selectedCtf` and English equivalents |
| A | `../source/zh/experience/awards/index.md` and `../source/experience/awards/index.md` at legacy HEAD; last relevant Chinese-file commit `88d4a14df5ca9d1f7665909c481ca4ac4f18d3f2` |
| W | `../source/zh/experience/workshops/index.md` and English counterpart `../source/experience/workshops/index.md` at legacy HEAD |
| C | `../source/zh/experience/competitions/index.md` and English counterpart at legacy HEAD; both explicitly unpublished |
| T | `../source/zh/experience/ctf/index.md` and English counterpart at legacy HEAD |
| O | `source/about/index.md` at legacy `3801cc5d41d78e5ad518a4cb1092b492b5857c02` (first commit) |
| B | `source/about/index.md` at legacy `77246e26c345dca36ee6d094dce2afeefb92dc43` |
| L | `source/experience/index.md` at legacy `1a5573c3e0ecb72c536394b2da54fbcf5d2d9499` |
| D | `source/experience/index.md` at legacy `d1eb32924c74d3438816ac4b5a81d51e3ae2f13d` (expanded database-style records) |
| P | current `src/data/experience.ts`, eight explicit published rows; introduced at `bc76999f76f327f1371a7b69a803326a620991a6`, publication status added by `4d84564e3f401e2d2ecdef4ab3459be4b1d3855a` |
| M | current `src/data/migrated.json`; eight published experience editions (awards, certifications, CTF, workshops × zh/en), migration integrated at `c2e255d`; exact original source recorded per edition |

Additional inventory: `../source/_data/{portfolio,resume,research,now,series}.json`; `../source/{experience,zh/experience,en/experience,about,en/about,zh/about,timeline,zh/timeline,resume}/`; `../source/_posts/`; `../notes.nagi.tw/articles/`; current `src/data/*.ts`, `src/data/migrated.json`, `docs/content-migration.md`, `docs/cv-structure.md`, `release-preparation/article-inventory.json`, article routes and URL maps. History path inventory also found deleted `source/{experience,zh/experience,ja/experience}/community-teaching/index.md` and earlier Japanese experience/about/timeline editions. Japanese duplicates are not counted as additional participation. Private archives and internal medical source were not opened. Generated `.tmp`/`dist` files are not independent evidence.

History queries covered reachable legacy changes under `source`, plus Markdown/JSON filename inventory and pickaxe searches for missing candidate names, `totalTeams`, K17, picoCTF, Daydream, Junior.Crypt, HITCON CTF, 第30 and 資安種子. Relevant content transitions include `ed6b4dcdc8f0332e6f6bdc40140ee39b7ed17813` (experience JSON), `8a5e3ab04e218607be6e149d62a8ec45649846e9` (updated JSON), `f70bc191ecc1520fee759d07e29b7289b883c671` (removed historical team membership), `679f468f9cb2e65a1239783fe5ef60f0d41b3e78`, `0f367573381ff0cbbc2fb16ee66fcdb625af5c14` (HITCON 2026) and legacy HEAD. No remote fetch, external organizer verification, deleted unreachable object recovery, private archive review, or exhaustive byte-by-byte comparison of every historic translation was performed. Therefore this is a broad repository/history audit, not proof that every experience ever undertaken has been recovered.

## Competition inventory

Unless explicitly stated, dates have **year precision only**, role/team/rank/totalTeams/official evidence URL are missing, and the row is a recovered **draft**. A named award is preserved verbatim, not converted into a numeric rank. `—` means absent, not zero. Published article presence does not authorize converting its claims to newly published structured records.

| Event / candidate | Date | Role and exact recorded outcome | Sources | Current publication / unresolved fields |
|---|---|---|---|---|
| FIRST Tech Challenge / FTC | 2026; conflicting 2024 record | E: 參賽者; `最佳創意獎首席`; English `Inspire Award Winner`. A/L/D: 2024 team member, `Innovation Award`, L adds `(Lead Team)` | E,H,A,C,L,D,P | P publishes 2026 participation only; M publishes older award prose. Year and award terminology need reconciliation; no team name or rank/totalTeams |
| 台灣選拔賽 MARC 機器人競賽 | 2026 | 參賽者; `入選 12 強` / `Top 12 selection` | E,H | Draft; top-12 selection is not rank 12; denominator absent |
| 智慧鐵人創意競賽 | 2026 | 參賽者 | E,H | Draft; award/stage absent; do not silently equate to older technical creativity event |
| 新北市 AI 智慧城市黑客松 | 2026 | `決賽` / `Finalist` | H | Draft; role, team, placement, date absent |
| 第30屆大專院校資訊應用服務創新競賽 / The 30th InnoServe Awards | 2025 | O/B: `大專組佳作`, `高中職 / 大專組入圍決賽`; L: `Merit Award (College Division)`, high-school finalist; A/D: participant/presenter, Merit Award and finalist | O,B,L,A,D,E | M awards prose published; structured recovery draft. E name `資訊服務創新應用大賽`; reconcile divisions and translated award, do not count finalist and award as separate events |
| 國立宜蘭大學程式設計暨資訊及 AI 應用競賽 | 2026; older 2025 | E zh: `入圍決賽`, `榮獲佳作`; en: only `Finalist`; L/C/D: 2025 finalist | E,H,L,C,D | Draft; year and award differ; English omission is not disproof of Chinese award |
| Daydream 遊戲開發黑客松 | 2025 | `佳作`; English history `Commendable Work` | O,B; `ea73fd6bf8486afa7573b71ed1ce2dea4a954aa9:source/about/index.md` | Draft; role/team/date/rank absent |
| 高中職程式安全黑客松 / 北區高中職程式安全黑客松 | 2025 | E/O/B: `挖蛋專家獎`; A/C/T/L/D: participant, `OSINT Excellence Award`; L training list says 16 Hours | E,O,B,A,C,T,L,D | M publishes OSINT prose; draft consolidation. Award equivalence and exact event naming unverified |
| i-STEAM / iSTEAM PowerTech Robotics Competition (New Taipei City) | 2024 | Team member; `First Place, Creativity Award` | L,C,D,A | M publishes Creativity Award prose; draft structured record. First Place applies to this source's event/division only; team and denominator absent |
| PowerTech 青少年科技創作競賽 / i-STEAM PowerTech National Finals | 2024 | `全國佳作` / `Honorable Mention`; team member in A | O,B,L,A,C,D | M award prose published; draft consolidation; distinguish local first place from national mention |
| Junior Crypt CTF 2026 (user candidate Junior.Crypt) | 2026 | 參賽者 | E | Draft; exact official spelling/identity and all result fields absent |
| BroncoCTF 2026 | 2026 | 參賽者 | E; resume selectedCompetitions | Draft; no rank/team/denominator |
| Grodno::CTF 2026 | 2026 | 參賽者 | E | Draft; no rank/team/denominator |
| K17 | unknown | No matching participation record found in searched sources/history | Candidate only | Draft lead, not an experience claim; all fields missing |
| picoCTF | 2026 | Exact `Rank 1007 / 8748` | O,B | Draft; rank 1007 and denominator 8748 recorded, but denominator unit and individual/team basis unspecified. Do **not** assign `totalTeams=8748` without evidence |
| FhCTF | 2026 | Exact `No. 8` | O,B | Draft; rank basis, team and denominator absent |
| AIS3 MyFirstCTF / My First CTF | 2026; earlier 2025 | E/P: 2026 參賽者; O: 2025 參賽者; B: 2026 Participant | E,P,O,B | P publishes 2026 participation; draft 2025 candidate may be distinct edition or correction; do not merge years automatically |
| AIS3 EOF CTF / AIS3 EOF 初賽 | 2026 | E: competitor; O/B: preliminary-round participant | E,O,B | Draft; stage reconciliation needed; no final-stage claim |
| EOF Preparation | 2025 | Learner, practice record created | D; C | Draft training/preparation only, not proof of competition entry |
| AIS3 Cybersecurity Activity | 2025 | Participant, learning/competition activity; no placement | C,D | Unpublished source; draft, do not equate automatically to MyFirstCTF, EOF or training |
| HITCON CTF | unknown | No matching participation record found | Candidate only | Draft lead; HITCON conference attendance is not CTF participation |
| 2026 雙北 FRC 季後賽 | 2026 | `評審團獎` / `Judges' Award` | E,H | Draft; role/team/placement absent |
| NVIDIA Agentic AI Hackathon | 2026 | H metadata only `Edge AI / Healthcare` | H; migrated first-hackathon article | Draft event lead; do not infer prize or rank from project topic |
| 青年志工行動競賽－青志獎 | unknown | English JSON only: `Honorable Mention`, resultZh `佳作` | E.en competitions empty-year group | Draft; year and role absent; missing zh counterpart |
| 亞東科技大學全國高中職人工智慧與資訊生活應用創新競賽 | E year absent; O/B 2026 candidate | E en: `Honorable Mention` / `佳作`; O broader event name `Project Participant`; B broader event name `佳作` | E.en,O,B | Draft; event identity across names needs confirmation before supplying 2026 to E record |
| 金盾獎 | 2025 | `初賽參賽` | O,B | Draft; no award implied by event name |
| 21st National Technical Creativity Competition | 2024 | `Preliminary Round Participant` | L | Draft; do not infer equals 2026 智慧鐵人 |
| Future Medical Design Hackathon (TMU) | 2026 | Participant; completed learning/hackathon record, no award | L,W,D,H | M workshops prose published; structured recovery draft |
| LA CTF | 2026 | `團隊排名 #9` / `Team Rank #9` | H.selectedCtf | Draft; rank=9, team name and totalTeams absent |
| Srdnlen CTF Quals | 2026 | `團隊排名 #17` / `Team Rank #17` | H.selectedCtf | Draft; rank=17, team name and totalTeams absent |
| DiceCTF Quals | 2026 | `團隊排名 #23` / `Team Rank #23` | H.selectedCtf | Draft; rank=23, team name and totalTeams absent |

Historical E at `8a5e3ab04e218607be6e149d62a8ec45649846e9` contains `RCEs Team` / `Member`, with no year or event mapping. It was explicitly removed by `f70bc191ecc1520fee759d07e29b7289b883c671`; retain only as audit history, do not restore membership or attach that team to any rank above. No exact competition team name has been established for these results.

## Training, conferences and related learning

Each semicolon-separated entry below remains a separate candidate unless an explicit duplicate group resolves it. All dates are year precision except InfoSec 2026's exact date. No attendance entry establishes speaking, organizing, employment, instructor status or award. All recovered fields are draft even where an existing published article already mentions the event.

| Event | Date / role / recorded result | Source | Current state / gaps |
|---|---|---|---|
| HPC AI Summer Camp | 2026; 學員; 國立清華大學 | E,H,P | P published; exact dates/completion evidence absent |
| AI × Cybersecurity Workshop Series：AI for Good | 2026; 參與者 | E,H,L,P | P published; dates absent |
| Songshan AI × Cybersecurity / AI × Cybersecurity 實作活動 | 2026; participant; completed learning record | L,W,D | M workshops prose published; possibly related to previous series, not proven identical |
| InfoSec Taiwan 2026 | **2026-07-07 (day)**; 與會者 | E,P; Notes `articles/research/infosec-taiwan-2026-student-industry-gap.{md,en.md,ja.md}` | P year-only published; recovered day draft; article publication date is not substituted for event date |
| InfoSec Taiwan / INFOSEC TAIWAN 國際資安組織大會 | 2025; participant/attendee | E,O,B,L | Draft; exact day absent |
| Bak3 C00kie | 2026; attendee/participant | E,O,B | Draft; possible ZeroDay Cookie alias below needs confirmation |
| ZeroDay Cookie Cybersecurity Conference | 2026; role unspecified in list | L | Draft alias candidate, no inferred speaker role |
| HITCON Conference | 2025; attendee/participant | E,W,O,B,L,D,P | P and M published; no CTF participation implied |
| HITCON 2026 | 2026; attendee | E,H; added in `0f367573381ff0cbbc2fb16ee66fcdb625af5c14` | Draft; missing exact date |
| COSCUP 開源人年會 / COSCUP | 2025; attendee/participant | E,W,L,D,P | P and M published |
| AWS Summit Taipei / Taiwan | 2025; attendee/participant | E,W,L,D | M published workshops prose; location/name variant needs reconciliation |
| QRACON 學生量子電腦年會 | 2025; attendee | E | Draft; no speaking evidence |
| APCS 模擬測驗團隊暑期營隊 | 2025; student | E,P | P published; exact dates absent |
| APCSS Computational Thinking Camp | 2025; role unspecified | L | Draft; possible APCS alias, do not silently merge |
| 高中量子計畫暑期學習營 / Quantum Computing Summer Camp | 2025; student/participant; `30 Hours` / `30 小時` in L/W | E,L,W,D | M prose published; merge only after event identity confirmation |
| AIS3 高階培訓 | 2026; metadata `資安培訓` | H | Draft; student role/completion/date not explicit; distinct from competitions |
| CTF 資安種子培訓交流會（台北場） | 2025; Participant | O,B | Draft; exact dates absent |
| CTF 資安種子培訓交流會（高雄場） | 2025; Participant | O,B | Draft; distinct location/session; L generic Cybersecurity Seed Training Meeting may summarize either/both |
| Build with AI / Build with AI Taipei | 2026; participant | H,W,L,D | M prose published; exact day absent |
| GDG Taipei Workshop | 2026; participant in W | W,L,D | M prose published; potentially overlapping Build with AI, not presumed identical |
| Gemini CLI + ADK + Cloud Run | 2026; participant in W | H,W,L,D | M prose published; exact day absent |
| Enterprise AI Agent Development using ADK | 2026; role unspecified | L | Draft; relationship to above workshop unknown |
| Antigravity SDK Workshop | 2026; role unspecified | L | Draft; dates/completion absent |
| KiloShop AI Workshop | 2026; role unspecified | L | Draft; dates/completion absent |
| ClawShop 2 AI Workshop | 2026; role unspecified | L | Draft; dates/completion absent |
| Smart Manufacturing Competition Training / Smart Manufacturing | 2026; participant in W; completed learning record | L,W,D | M prose published; no actual competition result established |
| Auden TechDay 2026 | 2026; role unspecified | L | Draft; dates/completion absent |
| Central Taiwan High School Computer Conference | 2025; role unspecified | L | Draft; dates/official name absent |
| International Cybersecurity Organization Conference | 2025; role unspecified | L | Draft; likely InfoSec alias requires confirmation |
| International Quantum Technology Exhibition | 2025; role unspecified | L | Draft; not automatically QRACON |
| Smart-AI Programming Talent Program | 2024; role unspecified | L | Draft; completion/date absent |
| AI Humanoid Robot Control & Applications | 2024; role unspecified | L | Draft; completion/date absent |
| 2026 資安大會 / CYBERSEC reflection | 2026; Participant in B | B,H; Notes `articles/security/2026-security-conference.{md,en.md,ja.md}`, migrated journal | Published journal, draft structured experience; conference date not inferred from article date |
| CTF Training | 2025; training support | T,D | M CTF prose published; not competitor or attendee role |
| CTF Web Practice Lab | 2026; learner / note taker | T,D; `source/{labs,zh/labs}/ctf-web-practice/index.md` | M prose/lab published; personal learning, not event attendance |

## Teaching and publication conflicts

O has a broad 2024 `校內外資訊安全與技術學習活動` role `speaker`. L/D list 2025 CTF Instructor, Raspberry Pi Instructor, Cybersecurity Teaching Assistant, Technical Session Support and Technical Training Support; D distinguishes instructor, teaching assistant and support staff. These are **draft historical claims only**, without exact dates/event titles/official evidence. Current `source/{experience,zh/experience}/speaking/index.md` translation group is quarantined by migration; community, leadership and competition groups also carry unpublished markers. No recovery overrides those exclusions.

There is a concrete current boundary inconsistency: M's published CTF articles contain CTF Instructor (2025 講解者/Instructor) and training-support claims, while separate speaking pages are quarantined. Preserve this finding for review; do not infer all teaching is approved or that all attendee events were talks. The audit itself does not change public routes.

## Duplicate/conflict groups and missing evidence

1. **FTC**: 2024 Innovation Award / Lead Team versus 2026 最佳創意獎首席 / Inspire Award Winner. Could be different editions or editorial drift; retain both source assertions, no automatic correction.
2. **Ilan**: 2025 finalist in older prose versus 2026 finalist/佳作 in JSON; current English JSON omits Chinese award while earlier `8a5e3ab` English includes Honorable Mention. Needs edition/date evidence.
3. **InnoServe**: award/finalist rows, two divisions and translated event names describe overlapping achievements; consolidate only after division and award wording verification.
4. **Security hackathon**: 挖蛋專家獎 versus OSINT Excellence Award; same broad year/topic is insufficient to assert exact equivalence. Distinguish 16-hour training attendance from award.
5. **PowerTech**: local first place/creativity versus national honorable mention; preserve event level. Do not convert all outcomes to one rank.
6. **MyFirstCTF**: O's 2025 becomes B/E's 2026; possible repeat participation or correction. EOF preparation 2025 is not EOF competition 2026.
7. **Conferences/workshops**: InfoSec/International Cybersecurity Organization, Bak3/ZeroDay Cookie, APCS/APCSS, quantum camp/QRACON/exhibition and Google workshops require alias verification. Different roles and event types must remain distinguishable.
8. **Translations**: Japanese E omits MARC/FRC/HITCON 2026; English E alone includes two undated awards. Missing translation is not evidence of nonparticipation. Certification E also conflicts on network-installation year (zh 2026, en/ja 2024); outside competition scope, retain as review issue.
9. **Numeric results**: only picoCTF gives a denominator, with unspecified unit; LA/Srdnlen/Dice explicitly say team rank without team name/denominator. FhCTF gives No.8 without basis. No verified `totalTeams` field recovered. MARC top 12 is a selection threshold, not placement.
10. **Dates**: source/frontmatter/post dates are not automatically event dates. Only E InfoSec explicitly supplies `date: 2026-07-07`; all other table years remain year precision. Do not fabricate January 1 dates.

Remaining review inputs: organizer/results URLs or documents, exact edition/date, role, division/stage, award's official wording, whether personal or team placement, team name, and denominator unit. Candidate-only K17 and HITCON CTF need actual participation evidence before becoming experience records. No records were published by this audit.
