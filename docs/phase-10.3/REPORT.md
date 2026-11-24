# Phase 10.3 — Personal Content Integration

日期：2026-11-23，Asia/Taipei。範圍：權威 Windows 儲存庫；未操作 WSL 副本。

**結果：已準備可審閱的 Profile 與英文內容草稿；不是完整履歷，也不是發布授權。**
既有 23 個內容條目維持 2 published、21 draft。沒有新增公開內容集合項目。

## A. Files modified

修改前已讀取 AGENTS.md、目前 schemas、Phase 10.1／10.2 對話結論、Phase 8／8.2
證據摘要與內容維護規範。現有架構、路由、元件及發布選擇器保持原樣。

Phase 10.3 新備份位於 Windows 暫存目錄
`nagi-phase10-3-20261123-162745-16c09161`，包含 242 個逐檔驗證 SHA-256 的檔案，
涵蓋未追蹤來源、Git metadata 及 dist；排除 node_modules／.astro。原有 Phase 10.2
工作均保留。日誌亦存於本次備份目錄，不加入正式內容。

修改既有檔案：

- `src/lib/sections.ts`
- `src/content/projects/bugtraceai.md`
- `src/content/projects/nagi-zero.md`
- `src/content/projects/ruralmed-sat.md`
- `src/content/projects/nagi-medical-agent.md`
- `src/content/projects/nagi-firmware-lab.md`
- `src/content/projects/aeust-life.md`
- `src/content/research/5g-security-research.md`
- `src/content/research/b5g-6g-communication-security.md`
- `src/content/research/5g-core-security-testing.md`
- `src/content/research/ai-assisted-security-research.md`
- `src/content/research/medical-iot-embedded-security.md`
- `scripts/content-schema.test.mjs`

新增：本報告 `docs/phase-10.3/REPORT.md`。沒有新增內容集合條目。

測試修改僅讓暫存 fixture 的既存清單聚焦 Journal，不再把早期 Projects／Research
草稿視為永遠不可編輯。測試仍保留原始 Journal inventory、source／destination hashes，
並測試 strict 預設、未知參數、來源竄改與未授權修訂。正式 manifest／驗證程式未修改。

## B. Profile content prepared

作者本次明確指定的公開稱呼 Nagi 已寫入 `publicProfile`。About 沿用現有元件，
內容由該單一來源提供；未複製至首頁或建立新 Profile 路由。

英文來源稿：

> I’m Nagi. This website documents cybersecurity and software engineering work through engineering decisions and the evidence behind them. The published portfolio includes open-source maintenance work on command-line tool reliability. Areas of interest include communication systems and their security, embedded systems, and AI-assisted security analysis.

繁中對應稿僅翻譯上述公開身分與既有可支持的網站定位。技術興趣結構化為資安、
軟體工程、通訊系統與安全、嵌入式系統、AI 輔助資安分析；沒有寫入職稱、學歷、
技能等級、私人聯絡方式或未驗證成果。

Medical technology 保留為作者待確認的候選個人／研究方向，未由醫療專案名稱推論
為專業資格或公開經歷。該領域的研究候選已在未發布草稿中整理。

## C. Project content prepared

| 候選 | 準備內容／處置 | 證據界線 |
| --- | --- | --- |
| BugTraceAI | 既有英繁案例不變；`bugtraceai.md` 改為未發布 legacy pointer | 不再重複完整案例，也不帶入未充分支持的「首個社群 PR」主張；未重新宣稱上游即時狀態 |
| Nagi Zero | 英文 intake：身分、來源對應、角色、硬體及驗證清單 | Phase 8.2 的 ESP32 觀察未建立與本專案的歸屬，不寫成專案功能 |
| RuralMed-Sat | 英文 evidence-bounded draft，區分 V1 合成資料原型與 V1.3 localhost 模擬器 | 所有實作描述明確歸因歷史審查；本次未重新檢視／執行來源，也未確認作者貢獻 |
| Nagi Medical Agent | 英文範圍、來源及命名確認稿 | 不推論離線推論、Ollama、RAG、醫療部署或臨床效能 |
| Nagi Firmware Lab | 英文硬體／原始碼／實驗證據清單 | 不把未建立歸屬的 ESP32 資料移植成成果 |
| AEUST Life | 英文使用者、功能、角色與公開授權確認稿 | 名稱不證明學籍、隸屬、官方合作或實際上線 |
| Nagi Smart Hospital | 下列未發布 editorial brief；未建新集合條目 | 與 Medical Agent／既有醫療構想的關係尚未確認，避免重複 |

Smart Hospital 候選稿，僅供作者審閱：

> Nagi Smart Hospital is a candidate project title. Its relationship to Nagi Medical Agent has not been established. A source-grounded description requires confirmation of the intended problem, actual implementation, contributor scope and permission to disclose. No hospital deployment or clinical result is claimed.

全部編輯過的專案仍是 draft；保留原 slug、日期及原有 featured／demo 欄位的值與存在性。
原有 2000-01-01、標誌圖、role／tools 待確認文字只是既有 schema 占位，非新事實。
不猜測 developmentStatus。缺乏核准公開來源時，不製造 evidence URL 或繁中專案版本。

## D. Research content prepared

| 候選 | 準備內容／處置 |
| --- | --- |
| 5G／B5G／6G Communication Security | 既有 B5G／6G 檔案改為 umbrella review brief，保留 slug；未宣稱單一研究已涵蓋三代通訊 |
| 一般 5G | 原 generic 檔案改為 legacy intake pointer，避免當作額外研究成果 |
| 5G Core testing | 維持較窄的提案；確認標準版本、授權、評估條件及與 umbrella 的關係 |
| Generative AI Security Testing | 在既有 AI-assisted 草稿中分清兩種問題，尚未將其視為同一研究或另建重複條目 |
| Medical IoT and Embedded Security | 明確區分候選研究、未確認臨床流程及未驗證效能；列出裝置與授權範圍 |
| UAV and Autonomous Systems | 以下候選稿放在審閱文件，不由 Journal 提及 ROS 便推論已執行研究 |

UAV／自主系統候選稿，僅供作者審閱：

> UAV and autonomous-system security is a candidate research direction for editorial review. The repository does not establish a defined study, platform, authorized experiment or result. Confirm whether this is an independent topic or part of another project before creating a research entry.

沒有填入研究進度、機構、團隊、論文、verifiedOutputs 或新研究日期。所有研究保持 draft，
不把提案寫成已實施方法。現有必填 question／methods 標記仍明確表示待確認。
證據不足，未建立繁中研究譯本。

## E. Experience content prepared

未新增或修改 Experience 集合條目；原模板保持完整。缺少公開單位、真實職位與日期時，
不以占位職稱或 2000-01-01 建立新的個人履歷。

可審閱的開源貢獻摘要，以既有案例為來源：

> The published portfolio documents BugTraceAI-CLI contribution work on terminal shutdown reliability and a separate machine-readable-output proposal. A future Experience item should link to that case study and distinguish accepted work from proposed changes. Formal role wording and a participation date range still require author confirmation.

這不是職位任命、雇用關係、研究助理或領導經驗的證據。Research assistant、團隊參與、
工程領導、security competitions 均保留為候選；需作者提供下方具體確認資料。

## F. Journal preservation verification

只盤點，未編輯。五篇原文與模板、所有 frontmatter、原始 snapshots、manifest、圖片、
Phase 9.5 提案、既有 BugTraceAI 英繁來源均保持原樣。

| Journal file | 原日期 | 狀態 |
| --- | --- | --- |
| `2026-security-conference.md` | 2026-05-09；原更新 2026-05-15 | draft |
| `ctf-meets-malware-analysis-windows.md` | 2026-07-08 | draft |
| `infosec-taiwan-2026-student-industry-gap.md` | 2026-07-07 | draft |
| `nurse-made-me-rethink-medical-cybersecurity.md` | 2026-06-23 | draft |
| `retail-work-sme-security-culture.md` | 2026-07-18 | draft |
| `draft-template.mdx` | 2000-01-01 占位 | draft |

Phase 9.4／9.5 的發布結論未被此階段推翻：惡意程式文章 BLOCKED；其餘四篇 NEEDS WORK。
零售文章不修改、不刪除、不發布。沒有建立 revisions.json，也沒有將提案當成核准。

## G. Evidence gaps

1. 本次主要依據是既有公開案例、Phase 8／8.2 審查摘要及作者指定名稱；未存取其他開發目錄、
   私人資料或醫療系統，未重新執行外部工程專案。
2. 歷史摘要不是新的來源實測。RuralMed-Sat 的衛星、硬體部署、加密與臨床用途仍未確認。
3. 身分／命名關係未建立時，不合併 Medical Agent 與 Smart Hospital、不認定韌體歸屬。
4. 未建立研究／職位／競賽證據；也未宣稱資料缺失等同作者敘事不實。
5. 草稿的本地 Markdown 文件連結是編輯 provenance，不是公開 evidence URL；進入可發布
   整合前必須改為核准的公開引用或移出正文，不可讓 docs 路徑成為失效的網站連結。
6. 需要替換的原有占位日期／圖片／必填標記保留在 draft，不改 Schema 或猜測新值。

## H. Test results

本次實際執行：

| 檢查 | 結果與界線 |
| --- | --- |
| `npm run test:schema` | 10/10 PASS；含真實 verifier 的暫存 fixture 測試 |
| `npm run test:i18n` | PASS |
| `node node_modules/typescript/bin/tsc --noEmit` | PASS |
| 全部現有內容 schema／發布清單 | 23/23 PASS；僅既有 BugTraceAI 英繁兩份為 published |
| `node scripts/security-migration.mjs --editorial` | PASS；五篇 Journal 仍符合原始 destination hashes，無修訂紀錄 |
| `node scripts/security-migration.mjs --originals-only` | PASS；原始來源及圖片；不把此模式當完整發布驗收 |
| 預設 strict migration | **FAIL（預期的歷史基線差異）**：五篇 Journal checks 先通過，之後在 `src/content/projects/bugtraceai.md: existing content unchanged` 停止。它鎖定遷移當時的其他草稿，並不容許本次已授權專案編輯；未重算 manifest 或放寬 verifier |
| `npm run check` | **BLOCKED / exit 1**，內容編譯前載入原生 compiler binding 遭 Windows Application Control 阻擋 |
| `npm run build` | **BLOCKED / exit 1**，同一原生模組政策限制；不是新內容的編譯診斷 |
| `node scripts/verify-static.mjs` | PASS；既有 15 基礎頁，不是新建置 |
| 現有產物與保護檔案 SHA-256 | PASS；dist 17 HTML、無 Journal 詳細頁；Journal、BugTraceAI、路由／元件／樣式／public 都與 preflight 相同 |
| 全部原有旗標／日期／slug | PASS；status、featured、demo、publishedAt、updatedAt 的值及存在性均不變 |
| 備份重新驗證 | PASS；242 份備份檔案仍符合原始 SHA-256 |

環境阻擋模組：`@astrojs/compiler-binding-win32-x64-msvc/astro.win32-x64-msvc.node`，
`ERR_DLOPEN_FAILED`／Application Control policy。未停用安全控制、安裝依賴、修改版本，
亦未改用 WSL 規避。現有 dist 未重新生成，因此不宣稱新 Profile 已在瀏覽器中完成驗收。

## I. Author confirmation checklist

- Profile：確認新英文與繁中自介；是否將 medical technology 列為正式公開興趣；需要的公開連結。
- 每個專案：正式名稱、問題／使用者、本人角色、可公開來源版本、實際功能、進度、日期、
  測試條件／結果／限制、公開權限與圖片權利。沒有結果可以明確回覆尚無。
- Nagi Zero／Firmware Lab：是否同一工作、ESP32 snapshot 歸屬、硬體清單及測試證據。
- RuralMed-Sat：V1／V1.3 的關係、代表版本、本人貢獻、可重現紀錄；分清模擬與實體連線。
- Medical Agent／Smart Hospital：同案／改名／獨立案的關係、來源及實際系統界線；不需要病患資料。
- AEUST Life：實際專案及可公開定位；不補入先前排除的學校經歷或推論組織隸屬。
- 通訊研究：各名稱的範圍關係、實際問題、標準版本、方法、授權、可公開產出。
- AI 研究：分析輔助或生成式系統安全測試、模型／任務邊界、基準、資料與評估紀錄。
- Medical IoT：裝置範圍、威脅模型、授權、驗證方法；如涉及臨床主張，提供適當專業審閱。
- UAV：是否確有研究計畫、與其他案的關係、平台、本人工作及授權實驗範圍。
- Experience：公開單位、真實角色、起訖日期、職責、可驗證貢獻及公開許可。
- Leadership／競賽：領導範圍與佐證；活動名稱、日期、本人參與身分與可公開結果。未提供不寫名次。

作者可以確認「尚未實作／尚無成果」，無須製造證明；也不需要提供私人姓名、內部紀錄或機密。

## J. GO / NO-GO for Phase 10.4

**條件式 GO：進入明確授權的受控整合審閱。** 可使用既有架構呈現已確認 Profile，
以及安排作者逐稿審閱；未確認專案、研究與經歷仍不可公開。

**NO-GO：全面發布或部署。** 必須補足適用的作者確認、處理 draft 編輯引用與占位欄位，
並在允許原生模組的環境完成正式 Check／Build 及實際內容 QA。不要停用安全政策。

本階段沒有 commit、push、merge、deploy、發布、狀態變更或新增公開路由。
停止於 Phase 10.3；後續整合與發布均不是本報告自動授權的動作。
