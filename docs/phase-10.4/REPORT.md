# Phase 10.4 — Author Review & Controlled Integration

審查日期：2026-11-23，Asia/Taipei。

**結論：完成工程／編輯審閱與保守的本地修正；作者本人仍未逐項確認候選資料。**
本報告不是作者核准紀錄，也不授權發布。沒有新增 published 項目、公開路由或 Experience 條目。

## Pre-flight and evidence boundary

- 已讀取根 AGENTS.md、Phase 10.3 報告、目前 Schema／loader、英繁路由、Layout、
  HomePage、SectionPage、ContentCard、內容查詢與語言 helper。
- 檢查權威 Windows 儲存庫 Git 狀態及未追蹤檔案清單；所有既存未提交／未追蹤工作保留。
- Phase 10.2、10.3 備份各 242 個檔案重新比對 SHA-256，均完整。
- 新基線：Windows 暫存目錄 `nagi-phase10-4-20261123-164711-4ed2e38b`，
  243 個檔案逐檔驗證，包含來源、未追蹤檔、Git metadata 與既有 dist；排除可重建的
  node_modules／.astro。完整命令日誌留在此備份目錄。
- 未操作 WSL 副本、其他工程專案、實體設備、醫療系統或私人資料；未重跑上游工程實驗。
- 本階段沒有新取得作者事實確認、圖片授權、研究結果或外部 PR 即時狀態。

### Evidence register

| ID | 現有來源 | 能支持／不能支持 |
| --- | --- | --- |
| E1 | 作者 Phase 10.3 指定的公開稱呼；[10.3 報告](../phase-10.3/REPORT.md) B | 支持網站使用 Nagi；不是法定身分或學經歷驗證 |
| E2 | [sections.ts](../../src/lib/sections.ts) 的 publicProfile／About 文案 | 證明既有網站措辭與單一資料來源；既有興趣文案不等於新的作者確認或專業資格 |
| E3 | [英文案例](../../src/content/projects/bugtraceai-cli-contributions.md)、[繁中案例](../../src/content/projects/bugtraceai-cli-contributions.zh.md)、[Phase 8 審查](../phase-8-content-audit.md) | 支持先前記錄的 BugTraceAI 貢獻與限制；本階段未重新執行上游測試、查核即時 PR 狀態或證明產品部署 |
| E4 | [Phase 8.2](../phase-8.2-engineering-evidence.md) | 歷史來源審查摘要：RuralMed 原型／模擬器，以及未建立專案歸屬的 ESP32 snapshot；不是新的實測或作者角色證明 |
| E5 | src/content/projects/ 中的候選與 legacy 草稿 | 證明目前編輯範圍與缺口；草稿本身不是獨立成果證據 |
| E6 | src/content/research/ 中的提案與 legacy 草稿；Phase 8 審查 | 支持候選研究方向與提案存在；不證明研究已立項、執行或產生成果 |
| E7 | [Experience 模板](../../src/content/experience/draft-template.md)、10.3 報告 E／I | 僅提供模板與待確認類別；沒有正式職位、團隊、領導或競賽紀錄 |
| E8 | Schema、getPublished/selectPublished、getStaticPaths、既有 HTML 與本次 SHA-256 比對 | 支持格式、發布控制、來源／產物完整性；不支持個人事件、研究或工程成效 |

## A. Author review matrix

下列建議英文措辭是供審稿的保守方向。未確認項目應保持 draft／省略；不要將
「待確認」文案直接當作公開個人介紹。標記「可保留」也不是新增發布核准。

### Profile

| 項目／精確主張 | 現有證據 | 需確認／歧義 | 隱私／發布風險 | 保守建議與處置 |
| --- | --- | --- | --- | --- |
| 公開稱呼：`I’m Nagi.`／`publicName: Nagi` | E1 | 確認是否繼續使用此公開稱呼；不需法定姓名 | 不要補姓名或身分識別資料 | 可沿用 `I’m Nagi.`；本階段保持 publicProfile 原樣 |
| 自介：網站記錄 cybersecurity／software engineering、工程決策與證據 | E2；網站確有既有內容架構 | 這是網站定位，不是資深程度、職位或所有實驗可重現的宣告；完整英繁新稿仍待作者確認 | 與履歷／資格混淆 | `This site collects cybersecurity and software engineering notes, with attention to engineering decisions and supporting evidence.` 僅提案，未替換 |
| `published portfolio includes open-source maintenance work on command-line tool reliability` | E3；兩份案例為 published | 貢獻範圍限案例記載，不推成整個工具作者、production owner 或實際子程序清理已驗證 | 擴張本人責任或成效 | 可保留現有有限敘述；不得加 ownership／deployment |
| communication systems/security、embedded systems、AI-assisted security analysis 興趣 | E2 的既有公開文案與 structural interests | 作者是否仍認同、是否接受目前翻譯；興趣不是完成研究 | 被讀成研究經歷或專業能力等級 | 以 `Areas of interest include ...` 表達，作者逐項確認；不改成 `I have researched/deployed ...` |
| medical technology／research interests 候選 | 10.3 列表、E5／E6 的未發布醫療方向 | 是否列為公開興趣？不能由專案名稱推論資格或經驗 | 臨床專業暗示、第三方資訊 | 維持未加入公開 Profile；作者確認後才能採 `I am interested in exploring medical technology and security.` |
| 技能、聯絡方式 | publicProfile 未填 skills／links | 沒有新增資料；不要把候選工具變技能清單 | 私人聯絡、能力過度宣稱 | 保持省略；不自動加入 email、社群帳號或外部身分連結 |

### Projects

| 項目／精確主張 | 現有證據 | 需確認／歧義 | 隱私／發布風險 | 保守建議與處置 |
| --- | --- | --- | --- | --- |
| BugTraceAI 英繁案例：shutdown 修正、維護者回報 Python 3.12 的 14 tests、PR #9 merge，以及獨立 logging proposal | E3；案例已保留 mock／real subprocess 限制 | 既有角色限 open-source contributor；若更新 PR #10「仍開放」須另查當時上游狀態；本次未刷新 | 把 maintainer report 寫成本人新跑測試、把 proposal 當合併或產品上線 | 完整保留兩份公開來源；沿用 `A maintainer reported ...`／`A separate proposal ...` 的歸因界線；不在本階段改寫 |
| `bugtraceai.md` legacy pointer | E3／E5，與 canonical case 重疊 | 原占位日期不是參與日期；`first merged community PR` 未充分支持 | 重複案例、擴大貢獻 | 保持 pointer 與 draft，不複製成第二篇或 Experience 成果庫 |
| Nagi Zero：名稱；ESP32-S3／Arduino 只屬歷史外部 snapshot 觀察 | E4；未建立 snapshot 歸屬 | 正式專案身分、與 Firmware Lab 的關係、程式版本、角色、硬體、功能、進度與測試 | 誤指認程式／硬體歸屬、洩露硬體或研究細節 | `The project identity and implemented scope require confirmation.` 僅 draft；不宣稱 Wi-Fi／BLE scanner、CLI 或功耗 |
| RuralMed-Sat：V1 synthetic-data prototype；V1.3 localhost simulator；FastAPI／SQLite／outbox／ack checks 來自歷史摘要 | E4，未新取得原始程式或執行紀錄 | 代表版本、兩 snapshot 關係、Nagi 的角色、日期、公開授權、實際方法與測試；不是確定的本人已完成 case study | 模擬被寫成衛星／醫療實際部署；未授權原始碼或內部資料 | `A prior source review describes a synthetic-data prototype and a separate localhost simulator; runtime behavior and contributor scope were not verified in this review.` 保持歸因，不填新進度 |
| Nagi Medical Agent：名稱；草稿未證實 offline inference／Ollama／RAG 等能力 | E4／E5；既有未找到同名來源的有限審查 | 可識別來源、實際使用者／系統邊界、角色、日期、評估及與 Smart Hospital 的關係 | 醫療 AI 有效性、病患資料、誤稱部署 | `A project candidate awaiting an identifiable source and confirmed scope.` draft；缺證據不等於專案不存在 |
| Nagi Firmware Lab：候選名稱 | E4／E5 的 secondary draft | 與 Nagi Zero 關係、版本、硬體、實作、建置／測試、角色與日期 | 未建立的 ESP32 歸屬、測試硬體或內部程式披露 | `Firmware project scope and project-linked artifacts require confirmation.` draft；不新增韌體功能 |
| AEUST Life：候選名稱 | E5、Phase 8 名稱盤點 | 正式定位、使用者、程式版本、本人工作、功能、日期、命名／圖片權利 | 名稱推成學籍、組織背書或合作；先前排除的學校經歷 | `A project candidate; the name does not establish institutional affiliation.` draft；不加入教育與官方標誌 |
| Nagi Smart Hospital：僅 10.3 審閱 brief，無獨立條目 | E5／10.3；只有候選名稱 | 與 Medical Agent 是同案、改名或獨立案？來源、實作、角色、公開界線 | 重複建檔、醫院部署／臨床結果暗示 | 保留文件候選：`The relationship to Nagi Medical Agent is not established.` 不新建集合條目 |

### Research

| 項目／精確主張 | 現有證據 | 需確認／歧義 | 隱私／發布風險 | 保守建議與處置 |
| --- | --- | --- | --- | --- |
| 5G／B5G／6G communication security umbrella | E6；目前明寫 candidate portfolio direction | 是否為同一研究；具體問題、標準版本、方法、授權環境、本人角色與可公開產出 | 跨三代通訊被讀成完成的研究；內部網路／團隊揭露 | `A proposed communication-security direction; the exact scope and methods await confirmation.` draft；不寫 findings／publication |
| 5G Core security testing | E6；較窄的測試提案 | 與 umbrella 關係；哪些需求／版本、實際測試及 conformance criteria | 提案變成符合性證明或漏洞發現；未授權目標 | `A proposed testing scope, not a completed conformance assessment.` draft；不建立額外成果 |
| 一般 `5g-security-research.md` | E6；legacy intake pointer | 與上兩稿是否同一計畫 | 重複研究數量、占位日期當事件 | 保留原 slug 與 pointer，不能獨立發布為另一項研究 |
| AI-assisted analysis／Generative AI Security Testing | E6；前者已有範圍提案，後者為作者候選名稱 | 研究是用 AI 分析，還是測試生成式系統？模型／任務、資料、baseline、方法、角色與結果 | 二者混同、捏造 benchmark、模型機密與資料權利 | `Two candidate scopes requiring author clarification; no evaluation result is claimed.` draft；不另建重複項目 |
| Medical IoT and Embedded Security | E6；裝置限制／安全維護提案 | 裝置類別、威脅模型、實際方法、授權、醫療專業審閱、與兩醫療專案的關係 | 生理警報等同完整性偵測、臨床效能／病患使用暗示 | `A proposed device-security direction, without clinical validation or deployment claims.` draft；不填 institution／outputs |
| UAV and Autonomous Systems | 10.3 的文件候選；無獨立研究條目 | 是否確有研究、與其他專案關係、平台、本人工作、實驗與授權 | 由 Journal 提及 ROS 推成研究經驗；設備／飛行環境揭露 | `A candidate direction, not a documented study.` 保留文件待確認，不建立條目 |

### Experience

| 項目／精確主張 | 現有證據 | 需確認／歧義 | 隱私／發布風險 | 保守建議與處置 |
| --- | --- | --- | --- | --- |
| 研究助理 | E7，只有候選類別 | 是否確有此角色；核准公開單位、真實職稱、起訖、職責及貢獻佐證 | 職位／雇用或學校隸屬誤植、內部計畫識別 | 沒有可發布的肯定句；保持省略，不把候選寫成 `Research Assistant` 履歷 |
| 研究團隊參與 | E7 | 團隊名稱可否公開、實際角色、期間、本人範圍與證據 | 暗示正式會員、背書或共同成果歸屬 | 未確認不新增 Experience；獲確認後只描述本人已核實工作 |
| 工程領導 | E7；無角色／管理證據 | 領導何種範圍、決策責任、日期及可查貢獻 | 把一般協作寫成 team lead 或管理職 | 不使用 `Lead`／`led a team` 等肯定措辭，待本人範圍確認 |
| 已驗證開源貢獻 | E3／10.3 的摘要，可連結現有案例 | 獨立 Experience 的角色措辭／參與起訖尚缺；PR 日期不等於雇用日期 | 重複敘事、把貢獻推成職位或 ownership | `Open-source contribution work documented in the BugTraceAI-CLI case study.` 可作審閱摘要；不新建缺日期條目 |
| 資安競賽 | E7；無個別賽事／結果證據 | 賽事、日期、本人參與方式、隊伍可公開範圍、可核排名或結果 | 捏造名次／證書、揭露隊員身分 | 未確認不寫參賽或獲獎肯定句；無排名時不填排名 |
| `draft-template.md` | E7；明確為模板 | 全部職位、單位、日期均未供應 | 缺 endedAt 會被元件呈現至今；模板被誤發布 | 模板位元組不變，保持 draft；不作正式 Experience 使用 |

## B. Verified and unverified claims

### 本階段可驗證

- 檔案、旗標、slug、metadata、路由程式與既有產物：以本次 schema／selector 與 SHA-256 檢查支持。
- Nagi 為作者指定的公開稱呼；不擴張至法定姓名、職位或學歷。
- 既有網站確有兩份 published 的 BugTraceAI 語言來源。既有案例／先前審查記錄了有限貢獻，
  不把這一事實升級為本階段新跑上游測試、重新核准或最新 PR 狀態。
- Phase 8.2 摘要確有 prototype／simulator 的歷史來源觀察；其記錄存在可查，實作歸屬與
  runtime／部署／臨床效能仍不能由文件存在直接推得。

### 仍未確認

所有新職位、研究成果、實體部署、醫療效能、競賽結果、論文、公開團隊關係，以及完整
Profile 新文案的作者接受度，均未由本次審查建立。沒有證據不是反證；先前文案或工具
測試通過也不是作者核准。不存在新的 approval record 或 publication consent。

## C. Proposed content corrections

1. **已套用的保守措辭修正**：首頁研究卡的英文原文
   `Questions, methods, and findings from ongoing security research.`
   暗示持續執行的研究與 findings，超出目前 E6 的提案證據。
   改為 `Research questions and proposed directions.`，繁中同步為「研究問題與提案方向。」。
   只有本地來源文字變更，未發布，也未新增研究事實。
2. **已套用的引用修正**：九份 draft 的 12 個相對 `.md` 超連結原本有效於儲存庫閱讀，
   卻不是現有網站公開路由；改為描述加 inline-code 的 repo-relative 檔名，不再輸出假超連結。
   例如 Phase 8.2 review 後標示 `docs/phase-8.2-engineering-evidence.md`。
   公開 BugTraceAI 連結與真正可用的 canonical case-study 連結保留。
3. **僅提案，未套用**：矩陣中的 Profile 改寫、額外興趣、專案正式故事、研究方法與履歷文字，
   均等待作者事實確認；不自行補全。
4. **仍是 release gate**：草稿目前含編輯說明、內部 provenance 與占位欄位。移除錯誤超連結
   不代表已成為可發布正文。真正對外前需獨立審稿、公開來源／授權與明確發布指示。
5. 占位 publishedAt 等日期依本階段要求保持不變。即使作者稍後提供真實日期，也不能在
   本階段偷偷替換；需另獲修改授權。缺乏資料時維持 draft，不改 schema 來掩蓋缺口。

## D. Integration changes, if safely justified

僅修改下列十份既有檔案，另新增本報告：

- `src/components/HomePage.astro`：只改一組 EN／繁中 research note 文案；markup、版型與導覽不變。
- Projects 的 `aeust-life.md`、`nagi-firmware-lab.md`、`nagi-medical-agent.md`、`nagi-zero.md`、`ruralmed-sat.md`：只改本地來源引用。
- Research 的 `5g-core-security-testing.md`、`5g-security-research.md`、`ai-assisted-security-research.md`、`b5g-6g-communication-security.md`：只改本地來源引用。

九份草稿的完整 frontmatter 保持相同。沒有改 publicProfile、增加重複資料來源／集合／條目，
沒有將 structured interests 或未確認 Experience 新接入畫面。既有 About 仍經 sections 的
note／zhNote 讀 publicProfile。未新增譯本、contact、evidence URL 或 author approval。

Schema、內容 helper、loader、i18n、英繁 routes、Layout、其餘元件、CSS、package／lockfile、
所有驗證／測試程式均不變。Pure Black Editorial 色彩、字體、間距、排版與導航不變。
沒有為解決環境阻擋而變動依賴、原生檔案或系統政策。

## E. Publication safety verification

- 全部 23 個內容條目完整 frontmatter 與 Phase 10.4 基線逐位元組一致：status、featured、demo、
  slug、language、發布／更新日期及其他 metadata 都未改。
- 21 個 draft、2 個 published。唯二 published 是既有 BugTraceAI 英繁案例；兩來源／既有輸出
  位元組不變，保留兩個 PR 連結、canonical、hreflang 與 HTML 語言。
- Journal 五篇及模板、原始 snapshots、manifest、遷移圖片與所有 migration 文件保持原樣；
  零售文章不修改、不刪除、不發布；沒有 revisions.json。
- 以 current schemas／selectPublished 計算的預期公開 HTML 清單與既有 dist 17 頁一致；
  無 draft 詳細頁或公開頁面指向 draft 的連結。這是來源／既有輸出檢查，非新 Astro 建置。
- 路由、樣式與 dist 與基線相同，只有 HomePage 原始檔文案不同；未將舊 dist 稱作新預覽。
- 沒有新增私人聯絡方式、法定姓名、學校經歷、病患資訊、部署憑證或內部實驗資料。
  私隱結論限本次變更與人工閱讀；不是全面秘密偵測保證。

## F. Test results and environmental blockers

| 本次命令／檢查 | 實際結果 |
| --- | --- |
| `npm run test:schema` | PASS，10 tests，10 pass，0 fail |
| `npm run test:i18n` | PASS |
| `node node_modules/typescript/bin/tsc --noEmit` | PASS，exit 0；不替代 Astro template check |
| `node scripts/security-migration.mjs --editorial` | PASS：immutable sources、Journal revision checks、schemas／unique slugs、全 Journal draft |
| `node scripts/security-migration.mjs --originals-only` | PASS：原始來源／圖片限定檢查，不代表驗證現行路由或作者批准 |
| 預設 `node scripts/security-migration.mjs` | FAIL，exit 1；與 10.3 已記錄狀況相同，在 `src/content/projects/bugtraceai.md: existing content unchanged` 停止。五篇 Journal 的原始內容檢查先通過；不是本階段新損壞，也未被當成 PASS |
| `npm run check` | BLOCKED，exit 1；載入 compiler binding 前遭 Application Control 阻擋，沒有完成 Astro diagnostics |
| `npm run build` | BLOCKED，exit 1；同原生模組政策限制，未完成 production build |
| `node scripts/verify-static.mjs` | PASS；既有 15 基礎頁，非完整新內容 render |
| 逐筆內容／路由比對 | PASS；23 schemas、21 drafts、2 published、17 既有 HTML、無 draft routes／links |
| 243 份本階段備份與保護檔案 | PASS；備份 hashes 正確，未遺失檔案；只有十份允許的來源修正 |
| 修正範圍檢查 | PASS；12 個本地文件超連結移除，HomePage 可還原為僅一組文案替換；無 markup／layout 差異 |

嚴格模式仍有價值：它要求回到整次原始遷移的完整工作目錄基線，包含當時的其他專案草稿。
Phase 10.3 已授權編輯那些草稿，故不符合該模式。此階段沒有改測試、manifest 或 verifier，
也沒有關閉檢查；適用的 editorial 模式與獨立 Journal／baseline 比對另行執行。

Build blocker：`@astrojs/compiler-binding-win32-x64-msvc/astro.win32-x64-msvc.node`，
`ERR_DLOPEN_FAILED`，`An Application Control policy has blocked this file.`
未停用安全控制、安裝依賴或移至 WSL 規避。不宣稱最新 About／HomePage 已完成瀏覽器、
視覺、無障礙、效能或正式建置驗收；Phase 10.5 必須明確保留這些未完成項目。

## G. Remaining author decisions

1. **Profile**：逐句接受／修正現有英繁自介；確認興趣清單及 medical technology 是否公開。
   沒有另行提供聯絡方式就保持省略；不需提供法定姓名或私人資料。
2. **專案命名與貢獻**：Zero／Firmware Lab、Medical Agent／Smart Hospital 是否同案？
   每案提供可公開來源版本、本人範圍、已實作與未實作界線、日期及公開權限。
3. **RuralMed**：代表版本、V1／V1.3 關係、本人角色、可重現紀錄；確認模擬不被寫成實體連線。
4. **研究**：通訊三稿與 AI 兩種問題的範圍關係；實際問題、方法、授權、版本與可公開結果。
   確認 Medical IoT／UAV 是否確有計畫，沒有成果可以明確說尚無。
5. **Experience**：是否存在可公開的助理、團隊或領導角色？若存在，提供確認過的單位、
   角色、起訖與本人貢獻；PR 日期不作任職日期，專案名稱不作學籍證明。
6. **競賽／publication**：若要納入，逐項提供活動／作品、日期、本人參與及核准公開的結果。
   無法證實的名次、證照或論文一律省略。
7. **整合與發布分開決定**：文案與事實核准、可公開資料範圍、日期替換、翻譯範圍及最終
   發布需明確區分。沒有決定的項目繼續 draft，不以沉默、既有文件或測試通過當作同意。

本階段沒有接收上述作者決定，也沒有製作 approval record；只提供待作者審閱的矩陣。

## H. GO / NO-GO for Phase 10.5

**條件式 GO：可另行授權開始 Phase 10.5 的保留驗證與技術 QA。** 現有架構與發布保護仍有效，
可驗證資料完整性／路由／語言；作者仍可逐項完成內容決策，不需先公開未知內容。

**NO-GO：宣告完整整合已驗收、發布新項目或部署。** 前置缺口包括作者逐稿確認、最終稿去除
編輯占位與內部 provenance、適當公開來源／授權，以及可執行的 Check／Build 與實際內容 QA。
若環境仍阻擋，Phase 10.5 應記錄 BLOCKED／UNVERIFIED，而不能以既有 17 頁產物代替新驗收。

停止於 Phase 10.4。未 commit、push、merge、deploy、發布或操作 WSL；所有既有工作保留。
