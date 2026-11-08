# V3 公開 Experience 內容稽核

基準：`c6d3ee1`。日期：2026-11-08。發布結論仍為 **No-Go**。

## 執行計畫與界線

- [x] 對照 archive、master-list、conflicts、release QA，追查公開正文及索引來源。
- [x] 修正中英文 Awards、CTF、Learning Events 正文及摘要；原文完整保存在本文件附錄。
- [x] 檢查八筆公開快照、首頁、About、相關 Journal、search、knowledge、RSS、Sitemap。
- [x] 執行 Astro Check、TypeScript、Production Build、完整測試、資料完整性、產物、連結及 diff 檢查；以本次本地 commit 保存結果。

只修改既有公開文章的文字；不改 publicationStatus、URL、alias、八筆公開快照、79 筆 archive、歷史文件、企鵝設計或無關專案。所有尚待核對欄位維持 pending，不以另一個未確認版本替代。原始 assertion 不刪除，user-reported 不升級為 official-verified。

## 證據層級

A：archive-001／017 的 verificationSource 記錄 Experience Year Reconciliation（基準 5c50af7），明確確認僅於 2026 參與；067／069 舊年份為 superseded。這只確認年份與參與，不確認獎項。

B：Historical Awards Reconciliation（基準 6750b3c）是 user-reported；詳見 archive historicalReconciliation、master-list「歷史成果補記」與 conflicts。FTC 獎名對應、InnoServe 組別、PowerTech 階段、OSINT 正式獎名均未取得充分證據。

C：archive-065、071～076 的 learningReconciliation 與 conflicts「教學角色待確認」要求場次、日期及責任證據；不得當成正式講師、主講或完成支援經歷。

八筆 approvedSnapshots 是既有公開範圍，不代表所有 archive 欄位皆獲確認；其既有 confirmed 也不等同 official-verified。本次不改任何驗證狀態。沒有新外部查證，沒有推造官方來源。

## 八筆公開 Experience 逐筆核對

下列皆由 `src/data/experience.ts` → `src/views/Experience.astro` 發布於 `/experience/`、`/zh/experience/`；歷史來源為 `source/_data/experience.json`，公開快照來源 commit 為 bc76999f76f327f1371a7b69a803326a620991a6、4d84564e3f401e2d2ecdef4ab3459be4b1d3855a。相關文章皆在 `src/data/migrated.json`，以下列出 URL 及原始 source。

| ID／原始敘述 | 衝突原因／確認證據 | 修正後敘述／相關公開文章 | 人工確認 |
|---|---|---|---|
| hpc-ai-2026：2026 HPC AI Summer Camp，學員／Student，清華大學 | archive-032；只有 E/H/P 來源，無精確日期或完成證明；沒有新的確認 | 保留原快照；沒有對應公開專文，不新增 | pending：場次、日期、官方證明 |
| ai-for-good-2026：2026 AI × Cybersecurity Workshop Series: AI for Good，參與者／Participant | archive-033 與 034 僅 aliasCandidate，不能把 Songshan 視為同場 | 保留原快照；`/experience/workshops/`、`/zh/experience/workshops/` 的 Songshan 段落中性化，不合併活動 | pending：場次及別名關係 |
| infosec-2026：2026 InfoSec Taiwan 2026，與會者／Attendee | archive-035；來源日期 2026-07-07 仍 draft；不能混入 2025 的 036 | 保留年份精度；`/journal/infosec-taiwan-2026-student-industry-gap/` 及中文版本為參與心得，沒有獎項或講者聲稱，保留 | pending：活動日及官方證明；文章日期不當活動日 |
| myfirstctf-2026：2026 AIS3 MyFirstCTF 2026，參賽者／Competitor | A；archive-017 user-confirmed，069 的 2025 superseded | 保留 2026 參賽，不新增獎項或排名；無對應公開專文 | pending：結果、日期、隊伍及官方證據 |
| ftc-2026：2026 FIRST Tech Challenge，參賽者／Competitor | A 年份已確認；B/C 舊 Awards 為 2024 Innovation Award，不能轉移獎項至 2026 | 快照不變；Awards 改為 2026 FIRST Tech Challenge 參賽紀錄，移除爭議獎項及隊員推定 | pending：正式獎名、兩項自述是否獨立、隊名與結果關係 |
| apcs-2025：2025 APCS 模擬測驗團隊暑期營隊，學員／Student | archive-044 與 APCSS 045 僅 aliasCandidate | 原快照保留；無公開專文，不改為 APCSS、不補時數 | pending：正式名稱、同屆關係、日期 |
| hitcon-2025：2025 HITCON Conference 2025，與會者／Attendee | archive-039；040 為不同年度，021 CTF 是另一候選，不得混同 | 快照保留；workshops 中明確為 2025 會議與會者，不推定 CTF 或講者 | pending：日期與官方證明 |
| coscup-2025：2025 COSCUP 2025，與會者／Attendee | archive-041 E/W/L/D/P 一致指向公開參與；無講者證據 | 快照保留；workshops 中明確為 2025 與會者 | pending：日期與官方證明 |

## 公開文章逐項修正

來源檔案均為 `src/data/migrated.json`。Awards 的歷史 source 是 `source/{zh/,}experience/awards/index.md`，CTF 是 `source/{zh/,}experience/ctf/index.md`，Learning Events 是 `source/{zh/,}experience/workshops/index.md`。六筆完整基準記錄（含 source、原始 title、description、body）保存在附錄；不是網站內容來源。

| 公開頁面／段落（中英對應） | 原始敘述 | 原因／使用證據 | 修正後敘述 | 人工確認 |
|---|---|---|---|---|
| `/experience/awards/`、`/zh/experience/awards/`：FTC | 2024；Innovation Award；Team member／隊員 | A 年份確認；B/C archive-001、067；獎名互不等價 | 2026 FIRST Tech Challenge；Competitor／參賽者；沒有獎項宣稱 | pending：獎名及證明 |
| 同上：InnoServe Merit Award／Finalist | 2025 Merit Award、Finalist，未分組；Participant / Presenter | B/C archive-005：自述三項組別結果，英文對應未核准 | 單一 InnoServe 主題段落，僅描述舊筆記的工程展示與文件主題，不聲稱得獎、決賽或簡報者 | pending：組別、獎名、正式證據 |
| 同上：OSINT Excellence Award；兩語 CTF 的 Hackathon | 2025 OSINT Excellence Award；AIS3 Club 主辦 | B/C archive-008；正式獎名與使用者自述對應未明 | OSINT 與 CTF 學習主題；不保留推定主辦或獲獎結論 | pending：活動身分、主辦及獎名 |
| Awards：Creativity Award | 2024 新北市 PowerTech Creativity Award | B/C archive-009：自述「第一等第一名（創意獎）」；不可自行等同 | PowerTech 舊筆記的機器人原型、測試與團隊合作主題，不宣稱結果 | pending：市賽正式名稱／證據 |
| Awards：Honorable Mention | 2024 PowerTech National Finals Honorable Mention | B/C archive-010：自述「積分獎佳作」；不可換成全國第一名或泛稱正式獎項 | 同一中性 PowerTech 主題段落；不計活動次數，不合併 archive | pending：全國賽階段／獎項證據 |
| 兩語 CTF：CTF Instructor | 2025 Instructor／講解者；Training support completed | C archive-072、conflicts teachingRoleReview=pending | CTF 學習與練習主題；不聲稱講師、支援角色、日期或完成紀錄 | pending：具體課程、責任與日期 |
| 兩語 CTF：CTF Training | 2025 Training support／訓練支援；Practice support completed | C archive-065；實際場次與責任未明 | 合入一般練習主題描述，不建立學員或講師活動 | pending：場次、責任、日期 |
| 兩語 CTF：CTF Web Practice Lab | 2026 個人學習實驗記錄 | archive-066；是筆記，不是活動出席 | 保留原段落及學習者角色 | pending：不以此證明活動參與 |
| 兩語 workshops：HITCON／COSCUP | 2025 Participant；Completed learning record；Technical sharing | 既有 P 快照 039／041 僅支持與會者；避免誤讀為講者或完成認證 | 2025 Attendee／與會者，會議主題與個人收穫保留，移除完成及 sharing 能力欄 | pending：精確日期、官方證據 |
| 兩語 workshops：AWS Summit Taiwan | 2025 參與、完成學習紀錄 | B archive-042 名稱／地點待核對 | 舊筆記提到 AWS Summit Taiwan；雲端架構學習主題 | pending：活動身分、日期及參與證據 |
| 兩語 workshops：Build with AI／GDG Taipei | 2026 兩筆參與、完成紀錄 | B archive-050／051 aliasCandidate | 各自保留舊筆記名稱與主題；不斷定兩場或同場、不宣稱完成 | pending：場次對應 |
| 兩語 workshops：Gemini CLI + ADK + Cloud Run | 2026 參與、完成紀錄 | B archive-052／053，與 ADK 活動對應未明 | 舊筆記名稱與 AI 部署主題 | pending：場次對應與證明 |
| 兩語 workshops：AI × Cybersecurity | 2026 Songshan 相關活動、參與、完成紀錄 | B archive-034／033 別名未確認 | 舊筆記的 AI 與資安主題，不指認等同 AI for Good | pending：正式場次、別名 |
| 兩語 workshops：Quantum Computing Summer Camp | 2025、30-hour learning record／完成 30 小時 | B archive-046／079 身分及時數未確認 | 舊筆記中的量子計算主題，不公開時數或完成結論 | pending：同場證據、時數 |
| 兩語 workshops：Future Medical Design | 2026 臺北醫學大學相關活動、完成黑客松 | B archive-028 只有歷史來源 | 舊筆記中的醫療流程與設計主題 | pending：活動名稱、主辦、參與及完成證據 |
| 兩語 workshops：Smart Manufacturing | 2026 參與、完成訓練 | B archive-057，缺實際場次／完成證據 | 舊筆記中的自動化與製造主題，不當競賽結果 | pending：場次、日期、完成證據 |

## 其他公開表面

- 首頁 `/`、`/zh/`：`src/views/Overview.astro`、`src/data/site.ts`；原文為學生工程者及目前研究興趣，沒有獎項、活動年份、講者摘要，保留。企鵝與樣式不變。
- About `/about/`、`/zh/about/`：`src/views/StudioPage.astro`；原文為個人介紹及 Experience 連結，沒有上述爭議，保留。
- InfoSec 雙語 Journal：來源 `src/data/migrated.json`，原始 source 為 `notes.nagi.tw/articles/research/infosec-taiwan-2026-student-industry-gap.en.md` 與 `.md`；只表達 2026 與會心得，不改發布日、不新增活動日期。不是官方證明。
- `/zh/journal/frc-engineering-team/` 提到宜蘭聯隊是交流對象；FRC 不等同 FTC 或宜蘭競賽，不搬移其年份／結果。
- search.json 與 knowledge.json 共用公開 manifest 的 title／description；Awards 改中性「競賽學習紀錄／Competition Learning Notes」，CTF 摘要移除 OSINT recognition／教學支援；Learning Events 摘要區分既有會議紀錄與歷史學習主題。
- RSS 只收 Journal，本輪不新增項目；Sitemap URL 不變。Penguin mock 回答只是個人簡介／專案／研究方向，無涉爭議；公開 knowledge 由相同修正後摘要產生。外部 AI 後端未連線、未執行匯入，不聲稱其快取已更新。
- 未公開 speaking、competitions、Roadmap 及所有 draft 維持隔離；Certifications 不涉及本次八筆及已知衝突，未將其當作新查證結論。

## 驗證結果

| 項目 | 本次結果 |
|---|---|
| Astro Check／Production Build：`npm run build` | 通過；81 files、0 errors／warnings／hints；70 pages |
| TypeScript：`npm run typecheck` | 通過 |
| 完整測試：`npm test` | 通過；包含 RSS 成功／故障 fixture、`/studio/` build、發布隔離及公開產物 |
| 資料完整性 | 79 筆 archive 原始／分層雜湊測試通過；檔案 SHA-256 仍為 `82d7671814fa34155111d6c6b28fbeafdc743b9b753ad10fd071a92fa6e331ed`；八筆快照檔案與基準完全相同 |
| 原文保留 | 解析附錄六筆 JSON，與 `git show c6d3ee1:src/data/migrated.json` 逐筆 deep equality 通過；只有六筆 title／description／body 改變；其他記錄、URL、aliases、status、publicationStatus 完全相同 |
| 公開產物：`npm run validate` | 通過；HTML／JS／JSON／XML 等掃描不含已知爭議獎項與教學敘述；FTC 明確為 2026 參賽；研習文章不含未確認時數及完成聲稱 |
| 搜尋／Penguin knowledge | 各 51 筆且內容一致；修正後標題／摘要已進入產物；內部 assertion 未流入產物 |
| RSS／Sitemap／內部連結 | validate 通過；核准 Journal membership、雙語 sitemap、目的路由、anchor 均通過 |
| `git diff --check` | 通過 |

測試過程：首次完整測試遭沙箱 `spawn EPERM`，取得許可後重跑。原研習產物測試固定要求 2026／2025 分組，與中性化後不公開未確認年份的規則衝突，已改成保留 HITCON／COSCUP 2025 與會者及排除爭議敘述的檢查；新增年份檢查曾誤匹配頁尾年份，已限於活動年份欄位。最終完整測試通過。RSS fixture 的 503 是預期故障測試，不是正式 RSS 失敗。

B1 跨裝置視覺互動驗收、正式主機驗收、外部 AI 後端驗收仍未解除。本次只補救已知公開敘述，不取代內容擁有人對 pending 史實的終審，維持 No-Go；原 `docs/v3-release-qa.md` 不變。未 Push、Merge、Deploy。

## 附錄：c6d3ee1 公開原文 assertion（完整保留）

下列為修正前六筆 JSON 原文；僅供內部追溯，不能再當作已核准事實發布。

### en-experience-awards

```json
{
  "id": "en-experience-awards",
  "route": "/experience/awards/",
  "kind": "experience",
  "title": "Awards",
  "description": "Structured award records from project, Cybersecurity, Robotics, and technical competition work.",
  "locale": "en",
  "body": "# Awards\n\nStructured award records from project, Cybersecurity, Robotics, and technical competition work.\n\n---\n\n## Experience List\n\n### InnoServe Merit Award\n\n* Year: 2025\n* Organizer: InnoServe Awards\n* Location: Taiwan\n* Type: Project competition award\n* Role: Participant\n* Topic: Engineering project and system presentation\n* Technologies: FastAPI, Docker, Linux, AI\n* Skills: System integration, documentation, presentation\n* Outcome: Merit Award\n* Reflection: I learned that a good project needs clear implementation and clear explanation.\n\n---\n### InnoServe Finalist\n\n* Year: 2025\n* Organizer: InnoServe Awards\n* Location: Taiwan\n* Type: Finalist recognition\n* Role: Participant / Presenter\n* Topic: Project demo and review preparation\n* Technologies: FastAPI, Docker, Linux\n* Skills: Demo design, review preparation, technical communication\n* Outcome: Finalist record\n* Reflection: I learned to make project scope and value easier to evaluate.\n\n---\n### OSINT Excellence Award\n\n* Year: 2025\n* Organizer: Northern Taiwan High School Cybersecurity Hackathon\n* Location: Northern Taiwan\n* Type: Cybersecurity award\n* Role: Participant\n* Topic: OSINT and CTF challenge solving\n* Technologies: OSINT, Web Security, Linux, CTF\n* Skills: Information gathering, reasoning, evidence organization\n* Outcome: OSINT Excellence Award\n* Reflection: I learned that structured evidence matters as much as finding the answer.\n\n---\n### Creativity Award\n\n* Year: 2024\n* Organizer: i-STEAM PowerTech Robotics Competition\n* Location: New Taipei City\n* Type: Robotics award\n* Role: Team member\n* Topic: Creative robotics solution\n* Technologies: Robotics, embedded control\n* Skills: Creative problem solving, prototyping, teamwork\n* Outcome: Creativity Award\n* Reflection: I learned to turn constraints into a practical engineering direction.\n\n---\n### Innovation Award\n\n* Year: 2024\n* Organizer: FIRST Tech Challenge\n* Location: Taiwan\n* Type: Engineering award\n* Role: Team member\n* Topic: Robot design and team engineering process\n* Technologies: Robotics, control systems\n* Skills: Engineering design, testing, iteration\n* Outcome: Innovation Award\n* Reflection: I learned that innovation depends on repeated experiments, not only ideas.\n\n---\n### Honorable Mention\n\n* Year: 2024\n* Organizer: i-STEAM PowerTech National Finals\n* Location: Taiwan\n* Type: Competition recognition\n* Role: Team member\n* Topic: Robotics national final participation\n* Technologies: Robotics, sensors, control\n* Skills: Competition execution, documentation, teamwork\n* Outcome: Honorable Mention\n* Reflection: I learned how national-level review exposes weak points for future improvement.\n\n---",
  "source": "source/experience/awards/index.md",
  "translationKey": "experience/awards",
  "aliases": [
    "/experience/awards/"
  ],
  "status": "published",
  "publicationStatus": "published"
}
```

### en-experience-ctf

```json
{
  "id": "en-experience-ctf",
  "route": "/experience/ctf/",
  "kind": "experience",
  "title": "CTF Experience",
  "description": "Structured CTF and Web Security records from hackathon practice, OSINT recognition, teaching support, and lab notes.",
  "locale": "en",
  "body": "# CTF Experience\n\nStructured CTF and Web Security records from hackathon practice, OSINT recognition, teaching support, and lab notes.\n\n---\n\n## Experience List\n\n### Cybersecurity Hackathon\n\n* Year: 2025\n* Organizer: AIS3 Club / Northern Taiwan High School Cybersecurity Hackathon\n* Location: Northern Taiwan\n* Type: Cybersecurity / CTF competition\n* Role: Participant\n* Topic: OSINT, Web Security, Linux\n* Technologies: CTF, OSINT, Web Security, Linux\n* Skills: Security reasoning, evidence organization, challenge solving\n* Outcome: OSINT Excellence Award\n* Reflection: I learned that good security work is careful, repeatable, and explainable.\n\n---\n### CTF Instructor\n\n* Year: 2025\n* Organizer: Cybersecurity learning activity\n* Location: Taipei, Taiwan\n* Type: Security teaching\n* Role: Instructor\n* Topic: CTF challenge explanation\n* Technologies: CTF, OSINT, Web Security, Linux\n* Skills: Teaching, explanation, challenge review\n* Outcome: Training support completed\n* Reflection: I learned to break security concepts into hands-on steps.\n\n---\n### CTF Training\n\n* Year: 2025\n* Organizer: Cybersecurity learning community\n* Location: Taipei, Taiwan\n* Type: Practice support\n* Role: Training support\n* Topic: Repeatable CTF practice\n* Technologies: CTF, OSINT, Web Security, Linux\n* Skills: Practice planning, debugging, review\n* Outcome: Practice support completed\n* Reflection: I learned that repeatable practice matters more than one-time answers.\n\n---\n### CTF Web Practice Lab\n\n* Year: 2026\n* Organizer: Personal learning lab\n* Location: Online\n* Type: Security lab\n* Role: Learner / Note taker\n* Topic: Web Security practice notes\n* Technologies: CTF, Web Security, Linux, OSINT\n* Skills: Lab notes, technical writing, security reasoning\n* Outcome: Archived lab notes\n* Reflection: I learned to document practice so future review becomes easier.\n\n---",
  "source": "source/experience/ctf/index.md",
  "translationKey": "experience/ctf",
  "aliases": [
    "/experience/ctf/"
  ],
  "status": "published",
  "publicationStatus": "published"
}
```

### en-experience-workshops

```json
{
  "id": "en-experience-workshops",
  "route": "/experience/workshops/",
  "kind": "experience",
  "title": "Learning Events",
  "description": "Structured learning records across Cybersecurity, cloud, AI, open source, healthcare design, and smart manufacturing.",
  "locale": "en",
  "body": "# Learning Events\n\nStructured learning records across Cybersecurity, cloud, AI, open source, healthcare design, and smart manufacturing.\n\n---\n\n## Experience List\n\n### HITCON\n\n* Year: 2025\n* Organizer: HITCON\n* Location: Taiwan\n* Type: Cybersecurity conference\n* Role: Participant\n* Topic: Security research and community practice\n* Technologies: Cybersecurity, Web Security, Linux\n* Skills: Security awareness, research observation, community learning\n* Outcome: Completed learning record\n* Reflection: I learned how security communities discuss real problems and research directions.\n\n---\n### COSCUP\n\n* Year: 2025\n* Organizer: COSCUP\n* Location: Taiwan\n* Type: Open source conference\n* Role: Participant\n* Topic: Open source tools and community sharing\n* Technologies: Linux, Git, open source tools\n* Skills: Technical sharing, open source reading, community practice\n* Outcome: Completed learning record\n* Reflection: I learned how communities share project experience and maintain technical culture.\n\n---\n### AWS Summit Taiwan\n\n* Year: 2025\n* Organizer: AWS\n* Location: Taiwan\n* Type: Cloud technology event\n* Role: Participant\n* Topic: Cloud architecture and modern infrastructure\n* Technologies: AWS, cloud services\n* Skills: Cloud architecture awareness, infrastructure thinking\n* Outcome: Completed learning record\n* Reflection: I learned how cloud services support scalable engineering systems.\n\n---\n### Build with AI\n\n* Year: 2026\n* Organizer: Google developer community\n* Location: Taipei, Taiwan\n* Type: AI hands-on session\n* Role: Participant\n* Topic: AI application development\n* Technologies: AI, Gemini, developer tools\n* Skills: AI application patterns, tool evaluation, prototyping\n* Outcome: Completed learning record\n* Reflection: I learned to connect AI tools with practical product workflows.\n\n---\n### GDG Taipei\n\n* Year: 2026\n* Organizer: GDG Taipei\n* Location: Taipei, Taiwan\n* Type: Developer community session\n* Role: Participant\n* Topic: Google developer ecosystem and hands-on practice\n* Technologies: AI, Google Cloud, developer tools\n* Skills: Developer workflow, technical practice, community learning\n* Outcome: Completed learning record\n* Reflection: I learned from practical workflows shared by local developers.\n\n---\n### Gemini CLI + ADK + Cloud Run\n\n* Year: 2026\n* Organizer: Google developer community\n* Location: Taipei, Taiwan\n* Type: AI deployment session\n* Role: Participant\n* Topic: AI agent development and deployment\n* Technologies: Gemini CLI, ADK, Cloud Run, AI\n* Skills: AI agent workflow, deployment, command-line tooling\n* Outcome: Completed learning record\n* Reflection: I learned how AI tooling can move from local development toward deployment.\n\n---\n### AI x Cybersecurity Workshop\n\n* Year: 2026\n* Organizer: Songshan related learning activity\n* Location: Taipei, Taiwan\n* Type: AI and Cybersecurity session\n* Role: Participant\n* Topic: AI-assisted security learning\n* Technologies: AI, Cybersecurity, CTF, OSINT\n* Skills: Threat thinking, tool evaluation, security reasoning\n* Outcome: Completed learning record\n* Reflection: I learned to evaluate both the benefits and risks of AI in security work.\n\n---\n### Quantum Computing Summer Camp\n\n* Year: 2025\n* Organizer: Quantum technology learning program\n* Location: Taiwan\n* Type: Quantum computing program\n* Role: Participant\n* Topic: Quantum computing concepts\n* Technologies: Quantum Computing\n* Skills: Abstract modeling, experimental thinking, technical learning\n* Outcome: 30-hour learning record\n* Reflection: I learned a different model of computation and widened my technical perspective.\n\n---\n### Future Medical Design\n\n* Year: 2026\n* Organizer: Taipei Medical University related activity\n* Location: Taipei, Taiwan\n* Type: Healthcare design hackathon\n* Role: Participant\n* Topic: Medical workflow and design thinking\n* Technologies: AI, healthcare systems\n* Skills: Healthcare problem framing, user context, prototype planning\n* Outcome: Completed hackathon record\n* Reflection: I learned to connect technical ideas with healthcare workflow needs.\n\n---\n### Smart Manufacturing\n\n* Year: 2026\n* Organizer: Smart manufacturing training activity\n* Location: Taiwan\n* Type: Industry training\n* Role: Participant\n* Topic: Automation and manufacturing systems\n* Technologies: AI, automation, industrial systems\n* Skills: Systems thinking, automation awareness, workflow analysis\n* Outcome: Completed training record\n* Reflection: I learned how automation appears in real industry contexts.\n\n---",
  "source": "source/experience/workshops/index.md",
  "translationKey": "experience/workshops",
  "aliases": [
    "/experience/workshops/"
  ],
  "status": "published",
  "publicationStatus": "published"
}
```

### zh-experience-awards

```json
{
  "id": "zh-experience-awards",
  "route": "/zh/experience/awards/",
  "kind": "experience",
  "title": "獎項紀錄",
  "description": "以資料庫格式整理專案、Cybersecurity、Robotics 與技術競賽獎項。",
  "locale": "zh",
  "body": "# 獎項紀錄\n\n以資料庫格式整理專案、Cybersecurity、Robotics 與技術競賽獎項。\n\n---\n\n## 經歷列表\n\n### InnoServe Merit Award\n\n* 年份：2025\n* 主辦單位：InnoServe Awards\n* 地點：台灣\n* 活動類型：專案競賽獎項\n* 角色：參賽者\n* 主題：工程專案與系統展示\n* 相關技術：FastAPI、Docker、Linux、AI\n* 學習能力：系統整合、文件整理、簡報\n* 成果：獲得 Merit Award\n* 我的收穫：我學到好的專案需要清楚實作，也需要清楚說明。\n\n---\n### InnoServe Finalist\n\n* 年份：2025\n* 主辦單位：InnoServe Awards\n* 地點：台灣\n* 活動類型：決賽入選\n* 角色：參賽者 / 簡報者\n* 主題：專案展示與評審準備\n* 相關技術：FastAPI、Docker、Linux\n* 學習能力：展示設計、審查準備、技術溝通\n* 成果：進入決賽\n* 我的收穫：我學到要讓專案範圍與價值更容易被評估。\n\n---\n### OSINT Excellence Award\n\n* 年份：2025\n* 主辦單位：北部高中 Cybersecurity Hackathon\n* 地點：北台灣\n* 活動類型：Cybersecurity 獎項\n* 角色：參賽者\n* 主題：OSINT 與 CTF 解題\n* 相關技術：OSINT、Web Security、Linux、CTF\n* 學習能力：資料蒐集、推理、證據整理\n* 成果：獲得 OSINT Excellence Award\n* 我的收穫：我學到有結構的證據與找到答案同樣重要。\n\n---\n### Creativity Award\n\n* 年份：2024\n* 主辦單位：i-STEAM PowerTech Robotics Competition\n* 地點：新北市\n* 活動類型：Robotics 獎項\n* 角色：隊員\n* 主題：創意機器人解法\n* 相關技術：Robotics、嵌入式控制\n* 學習能力：創意解題、原型製作、團隊合作\n* 成果：獲得 Creativity Award\n* 我的收穫：我學到如何把限制轉成可執行的工程方向。\n\n---\n### Innovation Award\n\n* 年份：2024\n* 主辦單位：FIRST Tech Challenge\n* 地點：台灣\n* 活動類型：工程獎項\n* 角色：隊員\n* 主題：機器人設計與團隊工程流程\n* 相關技術：Robotics、控制系統\n* 學習能力：工程設計、測試、迭代\n* 成果：獲得 Innovation Award\n* 我的收穫：我學到創新來自反覆實驗，而不只是想法。\n\n---\n### Honorable Mention\n\n* 年份：2024\n* 主辦單位：i-STEAM PowerTech National Finals\n* 地點：台灣\n* 活動類型：競賽肯定\n* 角色：隊員\n* 主題：機器人全國賽參與\n* 相關技術：Robotics、感測器、控制\n* 學習能力：競賽執行、文件整理、團隊合作\n* 成果：獲得 Honorable Mention\n* 我的收穫：我學到全國層級的評審會暴露未來可以改善的弱點。\n\n---",
  "source": "source/zh/experience/awards/index.md",
  "translationKey": "experience/awards",
  "aliases": [
    "/zh/experience/awards/"
  ],
  "status": "published",
  "publicationStatus": "published"
}
```

### zh-experience-ctf

```json
{
  "id": "zh-experience-ctf",
  "route": "/zh/experience/ctf/",
  "kind": "experience",
  "title": "CTF 經歷",
  "description": "以資料庫格式整理 CTF、Web Security、OSINT、Linux、教學支援與實驗記錄。",
  "locale": "zh",
  "body": "# CTF 經歷\n\n以資料庫格式整理 CTF、Web Security、OSINT、Linux、教學支援與實驗記錄。\n\n---\n\n## 經歷列表\n\n### Cybersecurity Hackathon\n\n* 年份：2025\n* 主辦單位：AIS3 Club / 北部高中 Cybersecurity Hackathon\n* 地點：北台灣\n* 活動類型：Cybersecurity / CTF 競賽\n* 角色：參賽者\n* 主題：OSINT、Web Security、Linux\n* 相關技術：CTF、OSINT、Web Security、Linux\n* 學習能力：安全推理、證據整理、解題\n* 成果：獲得 OSINT Excellence Award\n* 我的收穫：我學到好的安全工作要謹慎、可重複、能被說明。\n\n---\n### CTF Instructor\n\n* 年份：2025\n* 主辦單位：Cybersecurity 學習活動\n* 地點：台北，台灣\n* 活動類型：安全教學\n* 角色：講解者\n* 主題：CTF challenge explanation\n* 相關技術：CTF、OSINT、Web Security、Linux\n* 學習能力：教學、說明、題目複盤\n* 成果：完成訓練支援\n* 我的收穫：我學到把安全概念拆成實作步驟。\n\n---\n### CTF 訓練\n\n* 年份：2025\n* 主辦單位：Cybersecurity 學習社群\n* 地點：台北，台灣\n* 活動類型：練習支援\n* 角色：訓練支援\n* 主題：Repeatable CTF practice\n* 相關技術：CTF、OSINT、Web Security、Linux\n* 學習能力：練習規劃、除錯、複盤\n* 成果：完成練習支援\n* 我的收穫：我學到可重複練習比一次性的答案更重要。\n\n---\n### CTF Web Practice Lab\n\n* 年份：2026\n* 主辦單位：個人學習實驗室\n* 地點：線上\n* 活動類型：安全實驗記錄\n* 角色：學習者 / 紀錄者\n* 主題：Web Security practice notes\n* 相關技術：CTF、Web Security、Linux、OSINT\n* 學習能力：實驗記錄、技術寫作、安全推理\n* 成果：建立實驗記錄\n* 我的收穫：我學到記錄練習能讓之後複盤更容易。\n\n---",
  "source": "source/zh/experience/ctf/index.md",
  "translationKey": "experience/ctf",
  "aliases": [
    "/zh/experience/ctf/"
  ],
  "status": "published",
  "publicationStatus": "published"
}
```

### zh-experience-workshops

```json
{
  "id": "zh-experience-workshops",
  "route": "/zh/experience/workshops/",
  "kind": "experience",
  "title": "研習活動",
  "description": "以資料庫格式整理 Cybersecurity、雲端、AI、開源、醫療設計與智慧製造學習活動。",
  "locale": "zh",
  "body": "# 研習活動\n\n以資料庫格式整理 Cybersecurity、雲端、AI、開源、醫療設計與智慧製造學習活動。\n\n---\n\n## 經歷列表\n\n### HITCON\n\n* 年份：2025\n* 主辦單位：HITCON\n* 地點：台灣\n* 活動類型：Cybersecurity 會議\n* 角色：參與者\n* 主題：安全研究與社群實務\n* 相關技術：Cybersecurity, Web Security, Linux\n* 學習能力：安全意識、研究觀察、社群學習\n* 成果：完成學習紀錄\n* 我的收穫：我學到安全社群如何討論真實問題與研究方向。\n\n---\n### COSCUP\n\n* 年份：2025\n* 主辦單位：COSCUP\n* 地點：台灣\n* 活動類型：開源會議\n* 角色：參與者\n* 主題：開源工具與社群分享\n* 相關技術：Linux, Git, open source tools\n* 學習能力：技術分享、開源閱讀、社群實作\n* 成果：完成學習紀錄\n* 我的收穫：我學到社群如何分享專案經驗並維持技術文化。\n\n---\n### AWS Summit Taiwan\n\n* 年份：2025\n* 主辦單位：AWS\n* 地點：台灣\n* 活動類型：雲端技術活動\n* 角色：參與者\n* 主題：雲端架構與現代基礎設施\n* 相關技術：AWS, cloud services\n* 學習能力：雲端架構理解、基礎設施思維\n* 成果：完成學習紀錄\n* 我的收穫：我學到雲端服務如何支撐可擴展的工程系統。\n\n---\n### Build with AI\n\n* 年份：2026\n* 主辦單位：Google 開發者社群\n* 地點：台北，台灣\n* 活動類型：AI 實作活動\n* 角色：參與者\n* 主題：AI 應用開發\n* 相關技術：AI, Gemini, 開發工具\n* 學習能力：AI 應用模式、工具評估、原型製作\n* 成果：完成學習紀錄\n* 我的收穫：我學到如何把 AI 工具連到實際產品流程。\n\n---\n### GDG Taipei\n\n* 年份：2026\n* 主辦單位：GDG Taipei\n* 地點：台北，台灣\n* 活動類型：開發者社群活動\n* 角色：參與者\n* 主題：Google 開發者生態與實作\n* 相關技術：AI, Google Cloud, 開發工具\n* 學習能力：開發流程、技術實作、社群學習\n* 成果：完成學習紀錄\n* 我的收穫：我從在地開發者分享中學到實務流程。\n\n---\n### Gemini CLI + ADK + Cloud Run\n\n* 年份：2026\n* 主辦單位：Google 開發者社群\n* 地點：台北，台灣\n* 活動類型：AI 部署實作活動\n* 角色：參與者\n* 主題：AI agent 開發與部署\n* 相關技術：Gemini CLI, ADK, Cloud Run, AI\n* 學習能力：AI agent 流程、部署、命令列工具\n* 成果：完成學習紀錄\n* 我的收穫：我學到 AI 工具如何從本機開發走向部署。\n\n---\n### AI × Cybersecurity 實作活動\n\n* 年份：2026\n* 主辦單位：松山相關學習活動\n* 地點：台北，台灣\n* 活動類型：AI 與 Cybersecurity 實作活動\n* 角色：參與者\n* 主題：AI 輔助安全學習\n* 相關技術：AI, Cybersecurity, CTF, OSINT\n* 學習能力：威脅思維、工具評估、安全推理\n* 成果：完成學習紀錄\n* 我的收穫：我學到評估 AI 在安全工作中的效益與風險。\n\n---\n### Quantum Computing Summer Camp\n\n* 年份：2025\n* 主辦單位：量子技術學習課程\n* 地點：台灣\n* 活動類型：Quantum Computing 課程\n* 角色：參與者\n* 主題：Quantum Computing 概念\n* 相關技術：Quantum Computing\n* 學習能力：抽象建模、實驗思維、技術學習\n* 成果：完成 30 小時學習紀錄\n* 我的收穫：我接觸到不同計算模型，擴展了技術視野。\n\n---\n### Future Medical Design\n\n* 年份：2026\n* 主辦單位：臺北醫學大學相關活動\n* 地點：台北，台灣\n* 活動類型：醫療設計黑客松\n* 角色：參與者\n* 主題：醫療流程與設計思考\n* 相關技術：AI, healthcare systems\n* 學習能力：醫療問題定義、使用者情境、原型規劃\n* 成果：完成學習紀錄\n* 我的收穫：我學到把技術想法連接到醫療流程需求。\n\n---\n### Smart Manufacturing\n\n* 年份：2026\n* 主辦單位：智慧製造訓練活動\n* 地點：台灣\n* 活動類型：智慧製造產業訓練\n* 角色：參與者\n* 主題：自動化與製造系統\n* 相關技術：AI, automation, industrial systems\n* 學習能力：系統思維、自動化理解、流程分析\n* 成果：完成學習紀錄\n* 我的收穫：我學到自動化在真實產業情境中的樣子。\n\n---",
  "source": "source/zh/experience/workshops/index.md",
  "translationKey": "experience/workshops",
  "aliases": [
    "/zh/experience/workshops/"
  ],
  "status": "published",
  "publicationStatus": "published"
}
```
