# Experience conflicts and review queue

未確認欄位不得公開。完整來源值保留於 archive 的 sourceAssertion；確認後須分別設定 verificationStatus 與 publicationStatus，不可只把 draft 改 published。現有公開快照新增欄位也需獨立審核。

| 群組 | 需要使用者確認的欄位 | 處理 |
|---|---|---|
| FTC 2024 / 2026 | 年份與參與 user-confirmed：僅 2026；「最佳創新獎首席」、「高雄市政府工程啟發獎」各為 user-reported，是否獨立獎項待查 | archive-001 保留兩項原文及 BEFIRING 隊名提及；不綁定獎項／排名，不等同 Innovation／Inspire／舊文「最佳創意獎首席」。archive-067 仍 superseded，舊獎項不轉移 |
| 宜蘭 2025 / 2026 | 年份與參與 user-confirmed：僅 2026；入圍決賽、榮獲佳作為 user-reported，正式證據待補 | archive-006 保存兩項結果；archive-068 仍 superseded，不計第二次參賽 |
| AIS3 MyFirstCTF 2025 / 2026 | 年份與參與已 user-confirmed：僅 2026；獎項／結果未確認 | archive-017 保留 2026；archive-069 為錯誤年份來源 assertion，superseded，不建立第二次參賽 |
| PowerTech 2024 | 新北市賽「第一等第一名（創意獎）」、全國賽「積分獎佳作」均 user-reported；官方名稱／證據待補 | archive-009／010 階段分開，不將全國佳作轉成全國第一名，不改原文或推排名 |
| InnoServe 2025 | 大專組佳作、高中職組及大專組入圍決賽均 user-reported；官方英文名稱／獎項翻譯待審 | archive-005 同一屆一筆，三項結果各有組別與種類，原中文名稱保留 |
| 資安黑客松 2025 | AIS3 Club、挖蛋專家獎為 user-reported；OSINT Excellence Award 僅 source-recorded，正式對應未明 | archive-008 不宣稱兩獎名正式互譯；archive-078 的 16 小時線索獨立保留、重疊待查，不計第二場已確認參與 |
| 研討會別名 | InfoSec／International Cybersecurity Organization、Bak3／ZeroDay Cookie、AWS Taipei／Taiwan | 別名候選並存，不自動去重 |
| 培訓別名 | APCS／APCSS、量子營／QRACON／展覽、Google／GDG／ADK、資安種子兩場與泛稱 | 保留獨立線索；不同地點場次不合併 |
| 排名 | picoCTF 1007/8748 的分母單位；FhCTF 8 的排名單位；LA 9／Srdnlen 17／Dice 23 的隊名與分母 | 未知 rankingUnit=unknown；團隊排名僅三筆明示 team；MARC 12 強不是第 12 名 |
| 未知年份競賽 | 青志獎年份；亞東名稱與 2026 泛稱是否同活動 | 未知年份 null；2026 泛稱另筆，不填給亞東 |
| K17 / HITCON CTF / NVIDIA hackathon lead | 實際參加證據、年份、角色 | candidate-only，role=unknown；不是參與聲明 |
| 教學／演講 | 真實活動名稱、日期、講者／助教／支援角色、公開授權 | 保留 draft；既有 CTF 文章含講解者敘述而 speaking 頁仍隔離，待明確審核，不擴張公開範圍 |
| 日期 | 除 InfoSec 2026 外的活動日期；InfoSec 日期發布授權 | 不以文章日期替代活動日期，沒有 1 月 1 日占位 |
| 歷史隊籍與證照 | 被刪除的 RCEs 隊籍；網路架設證照 2024/2026 | 不恢復隊籍或套用到排名；證照不屬本次六類，保留 audit 問題 |

## 逐筆待審欄位

本次成果以 archive 的 historicalReconciliation 及上表為最新結論。下列舊 reviewNotes 保留來源歷程；其中獎項 pending 指尚缺正式證據，不否定已新增的 user-reported 陳述。user-reported 不等於 official-verified，亦不代表可公開。

除上述三筆已由使用者確認年份與參與外，其餘參與／身分、來源證據及發布範圍仍待審。年份確認不等於整筆活動或獎項確認；原 verificationStatus 及 publicationStatus 均不變。

| ID | 來源 | 待確認 |
|---|---|---|
| archive-001 | E,H,A,C,L,D,P | Year and participation user-confirmed: 2026 only. Awards/results, exact date, role details and publication approval remain pending. Original historical assertions are retained verbatim; no old-year awards transferred. |
| archive-002 | E,H | Draft; top-12 selection is not rank 12; denominator absent |
| archive-003 | E,H | Draft; award/stage absent; do not silently equate to older technical creativity event |
| archive-004 | H | Draft; role, team, placement, date absent |
| archive-005 | O,B,L,A,D,E | M awards prose published; structured recovery draft. E name `資訊服務創新應用大賽`; reconcile divisions and translated award, do not count finalist and award as separate events |
| archive-006 | E,H,L,C,D | Year and participation user-confirmed: 2026 only. Awards/results, exact date, role details and publication approval remain pending. Original historical assertions are retained verbatim; no old-year awards transferred. |
| archive-007 | O,B; `ea73fd6bf8486afa7573b71ed1ce2dea4a954aa9:source/about/index.md` | Draft; role/team/date/rank absent |
| archive-008 | E,O,B,A,C,T,L,D | M publishes OSINT prose; draft consolidation. Award equivalence and exact event naming unverified |
| archive-009 | L,C,D,A | M publishes Creativity Award prose; draft structured record. First Place applies to this source's event/division only; team and denominator absent |
| archive-010 | O,B,L,A,C,D | M award prose published; draft consolidation; distinguish local first place from national mention |
| archive-011 | E | Draft; exact official spelling/identity and all result fields absent |
| archive-012 | E; resume selectedCompetitions | Draft; no rank/team/denominator |
| archive-013 | E | Draft; no rank/team/denominator |
| archive-014 | Candidate only | Draft lead, not an experience claim; all fields missing |
| archive-015 | O,B | Draft; rank 1007 and denominator 8748 recorded, but denominator unit and individual/team basis unspecified. Do **not** assign `totalTeams=8748` without evidence |
| archive-016 | O,B | Draft; rank basis, team and denominator absent |
| archive-017 | E,P,O,B | Year and participation user-confirmed: 2026 only. Awards/results, exact date, role details and publication approval remain pending. Original historical assertions are retained verbatim; no old-year awards transferred. |
| archive-018 | E,O,B | Draft; stage reconciliation needed; no final-stage claim |
| archive-019 | D; C | Draft training/preparation only, not proof of competition entry |
| archive-020 | C,D | Unpublished source; draft, do not equate automatically to MyFirstCTF, EOF or training |
| archive-021 | Candidate only | Draft lead; HITCON conference attendance is not CTF participation |
| archive-022 | E,H | Draft; role/team/placement absent |
| archive-023 | H; migrated first-hackathon article | Draft event lead; do not infer prize or rank from project topic |
| archive-024 | E.en competitions empty-year group | Draft; year and role absent; missing zh counterpart |
| archive-025 | E.en,O,B | Draft; event identity across names needs confirmation before supplying 2026 to E record |
| archive-026 | O,B | Draft; no award implied by event name |
| archive-027 | L | Draft; do not infer equals 2026 智慧鐵人 |
| archive-028 | L,W,D,H | M workshops prose published; structured recovery draft |
| archive-029 | H.selectedCtf | Draft; rank=9, team name and totalTeams absent |
| archive-030 | H.selectedCtf | Draft; rank=17, team name and totalTeams absent |
| archive-031 | H.selectedCtf | Draft; rank=23, team name and totalTeams absent |
| archive-032 | E,H,P | P published; exact dates/completion evidence absent |
| archive-033 | E,H,L,P | P published; dates absent |
| archive-034 | L,W,D | M workshops prose published; possibly related to previous series, not proven identical |
| archive-035 | E,P; Notes `articles/research/infosec-taiwan-2026-student-industry-gap.{md,en.md,ja.md}` | P year-only published; recovered day draft; article publication date is not substituted for event date |
| archive-036 | E,O,B,L | Draft; exact day absent |
| archive-037 | E,O,B | Draft; possible ZeroDay Cookie alias below needs confirmation |
| archive-038 | L | Draft alias candidate, no inferred speaker role |
| archive-039 | E,W,O,B,L,D,P | P and M published; no CTF participation implied |
| archive-040 | E,H; added in `0f367573381ff0cbbc2fb16ee66fcdb625af5c14` | Draft; missing exact date |
| archive-041 | E,W,L,D,P | P and M published |
| archive-042 | E,W,L,D | M published workshops prose; location/name variant needs reconciliation |
| archive-043 | E | Draft; no speaking evidence |
| archive-044 | E,P | P published; exact dates absent |
| archive-045 | L | Draft; possible APCS alias, do not silently merge |
| archive-046 | E,L,W,D | M prose published; merge only after event identity confirmation |
| archive-047 | H | Draft; student role/completion/date not explicit; distinct from competitions |
| archive-048 | O,B | Draft; exact dates absent |
| archive-049 | O,B | Draft; distinct location/session; L generic Cybersecurity Seed Training Meeting may summarize either/both |
| archive-050 | H,W,L,D | M prose published; exact day absent |
| archive-051 | W,L,D | M prose published; potentially overlapping Build with AI, not presumed identical |
| archive-052 | H,W,L,D | M prose published; exact day absent |
| archive-053 | L | Draft; relationship to above workshop unknown |
| archive-054 | L | Draft; dates/completion absent |
| archive-055 | L | Draft; dates/completion absent |
| archive-056 | L | Draft; dates/completion absent |
| archive-057 | L,W,D | M prose published; no actual competition result established |
| archive-058 | L | Draft; dates/completion absent |
| archive-059 | L | Draft; dates/official name absent |
| archive-060 | L | Draft; likely InfoSec alias requires confirmation |
| archive-061 | L | Draft; not automatically QRACON |
| archive-062 | L | Draft; completion/date absent |
| archive-063 | L | Draft; completion/date absent |
| archive-064 | B,H; Notes `articles/security/2026-security-conference.{md,en.md,ja.md}`, migrated journal | Published journal, draft structured experience; conference date not inferred from article date |
| archive-065 | T,D | M CTF prose published; not competitor or attendee role |
| archive-066 | T,D; `source/{labs,zh/labs}/ctf-web-practice/index.md` | M prose/lab published; personal learning, not event attendance |
| archive-067 | A,L,D | Incorrect historical source year; superseded by archive-001 (2026). Source assertion and any award wording retained for review only; not a separate participation. No awards transferred. |
| archive-068 | L,C,D | Incorrect historical source year; superseded by archive-006 (2026). Source assertion and any award wording retained for review only; not a separate participation. No awards transferred. |
| archive-069 | O | Incorrect historical source year; superseded by archive-017 (2026). Source assertion and any award wording retained for review only; not a separate participation. No awards transferred. |
| archive-070 | O,B | Do not merge with undated Asia Eastern University event without identity evidence. |
| archive-071 | O | Exact event titles, dates and publication approval missing. |
| archive-072 | L,D | Broad historical claim; exact session/date/evidence required. Speaking pages remain quarantined. |
| archive-073 | L,D | Broad historical claim; exact session/date/evidence required. Speaking pages remain quarantined. |
| archive-074 | L,D | Broad historical claim; exact session/date/evidence required. Speaking pages remain quarantined. |
| archive-075 | L,D | Broad historical claim; exact session/date/evidence required. Speaking pages remain quarantined. |
| archive-076 | L,D | Broad historical claim; exact session/date/evidence required. Speaking pages remain quarantined. |
| archive-077 | L | May summarize Taipei/Kaohsiung sessions; preserve unresolved alias. |
| archive-078 | L | Training aspect may overlap competition; not a second confirmed attendance. |
| archive-079 | L,W,D | Confirm identity with High School Quantum Program Summer Camp; retain separate assertion. |
