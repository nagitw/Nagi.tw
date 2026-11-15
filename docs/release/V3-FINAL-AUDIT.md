# Nagi.tw V3 — 本輪獨立複核（2026-11-12 Asia/Taipei）

**結論：NO-GO；本地準備可審閱，正式環境仍未驗收。** 本節優先於下方前次紀錄。本輪開始時，下方列出的 AI client、FastAPI、CI、安全範本與測試均已存在於 dirty 工作樹；不將它們冒稱為本輪新增成果。已檢查 Git 狀態、既有設計與 release plan，完整保留未提交內容；未 stage、commit、push、merge、deploy、操作 DNS 或連線 Pi。

本輪實際修改：`docs/release/V3-FINAL-AUDIT.md`。另產生 `qa/recheck-*` 本地驗證記錄；產品程式碼未修改，未重現需要修補的阻擋缺陷。

## 本輪新執行證據

| 項目 | 結果 | 證據 |
|---|---|---|
| Astro Check / Build | PASS | `qa/recheck-build.log`：99 files，0 errors/warnings/hints，70 pages 靜態建置 |
| TypeScript | PASS | `qa/recheck-typecheck.log`，exit 0 |
| 前端單元／整合 | PASS | `qa/recheck-tests.log`，完整 `npm test` exit 0 |
| AI production/client | PASS（fixture 範圍） | `qa/recheck-ai.log`：正式 Mock build 拒絕、HTTPS API 設定及有限重試 |
| 產物／路由／SEO／語言／公開內容 | PASS（validators 範圍） | `qa/recheck-validation.log`：100 files、89 HTML、70 non-mock dialogs，CNAME 與公開內容隔離；未全面驗證第三方外站存活 |
| 後端安全／整合 | PASS（本機 fixture） | `qa/recheck-backend.log`：17 passed，1 Starlette TestClient deprecation warning；包含上游錯誤與清理 reservation 情境 |
| npm dependency audit | PASS | `qa/recheck-npm-audit.json`，exit 0、0 known vulnerabilities |
| Python production lock audit / pip check | PASS | `qa/recheck-python-audit.log`、`qa/recheck-python-check.log`：No known vulnerabilities / No broken requirements |
| 已知秘密模式／可達 Git 歷史 | PASS（模式範圍） | `qa/recheck-secrets.log`：172 source files、15 commits；非未知秘密、entropy、binary 或不可達物件完整保證 |
| Git diff 格式 | PASS | `qa/recheck-diff.log`，exit 0；保留 LF/CRLF 提醒 |
| Responsive / accessibility | PASS（自動化涵蓋範圍） | `qa/recheck-browser.log`：144 passed（2.4m），Chromium 四尺寸；含雙語六大頁面深淺色共 96 axe scans，以及 AI fixture、導覽、圖片、404 與溢出驗證；不代表人工／跨引擎驗收 |

## 準備狀態與阻擋

- **GitHub Pages：本地建置與產物驗證 PASS，正式部署 UNVERIFIED。** 已複核 static output、nagi.tw site、CNAME 及 build/backend/browser 全通過才 deploy 的 workflow；不依賴 Node server runtime。Actions 正式 runner、Pages domain/HTTPS、environment reviewer 與 rollback baseline 未驗證。現有 main push 可觸發發布，勿未經核准推送。
- **Pi AI：本機安全測試 PASS，實機部署 UNVERIFIED。** 獨立 FastAPI、loopback Ollama、systemd、env、health/readiness、結構化日誌、Tunnel、重啟與 rollback 範本均已複核。ARM64/Debian 13、模型品質／容量、與醫療服務資源隔離、內部埠外網不可達及真實串流仍需實機證據；未假設 SSH 權限。
- **網域與 Cloudflare：本輪 UNVERIFIED。** 下方 NXDOMAIN 是前次查詢紀錄，未在本輪重查，不能代表目前 DNS。需確認購買與所有權、Cloudflare NS 委派、Pages apex/www 記錄、api 專用 Tunnel target、憑證與 HTTPS；禁止將 API 指向 Pi 公網埠或加入 SSH/Ollama ingress。
- **正式安全：UNVERIFIED。** 真實 CORS／429／取消／逾時、edge 防濫用、安全標頭及 TLS 必須外部驗收；CORS 不提供身分驗證。完整人工視覺、螢幕閱讀器及跨瀏覽器尚未完成。
- 前端維持明確 offline，不能因 fixture 通過就啟用正式 AI。真實 API、安全網路、網域／HTTPS、正式 Actions／回復基準與最終 release review 完成前維持 **NO-GO**。

---

# 前次 Nagi.tw V3 Final Production Release Audit — 2026-11-12（歷史證據）

**結論：NO-GO。已完成下列本地實作與驗證；正式環境尚未通過驗收。**

本節取代後方所有 2026-11-11 的目前狀態／Mock 凍結結論；後方保留為歷史，不代表本輪結果。時間為 Asia/Taipei。未 Push、Merge、Deploy、改 DNS、購買網域、建立憑證、連線 Pi 或修改醫療研究服務。

## 本輪現況與修復

- 起始 HEAD `7c93fea67d6162594e265d0c63351a3129e0f0f9`，分支 `feat/v3.1-editorial-redesign`。已有大量 tracked/untracked V3.1 修改，完整保留，沒有 commit/stage/reset/checkout。不得將原本的排版改動算成本輪成果。
- 實際確認：原公開 Penguin 固定 Mock、API 模式被 build guard 禁用；client 原有 NDJSON、取消、30 秒逾時與輸出限制；原本**沒有 backend 目錄／FastAPI 實作**。
- 改為正式預設 offline，可透過 `PUBLIC_PENGUIN_AI_MODE=api` 與完整 `PUBLIC_PENGUIN_API_URL=https://api.nagi.tw/chat` 啟用。Production build 明確拒絕 Mock，API 模式缺失或不安全端點也拒絕建置。保留 Penguin SVG、互動和版面，未作 UI 重構。
- Client 保留串流與取消，限制 HTTPS 標準埠，禁止 URL credentials/query/hash 和 IP/local/internal 端點；支援至多一次、只在串流前 502/503/504 的有限重試，不重播部分回覆或不確定的網路錯誤。失敗保留問題供手動重送，顯示無法連線／離線／逾時，不以 Mock 補答。
- 新增獨立 FastAPI → loopback Ollama 後端、嚴格 origins、全站共享 10 requests/minute（無 Origin 或偽造 forwarded header 也不能繞過）、單一推論名額。CORS 不是驗證或防濫用機制；匿名 API 仍須 edge 防護。Uvicorn 範本僅一 worker、最多 32 connections/tasks admission、backlog 32、keepalive 5s。
- JSON body ≤8192 bytes（包含 chunked），上傳限時 5 秒，question 1–1000 characters、en/zh、拒絕額外欄位。推論總時限 25 秒、512 model tokens、8000 字元、128000 上游 bytes、16000 單行 buffer。安全固定錯誤、停用 API docs，拒絕使用者自訂 tools/model/options/system prompt。
- 知識僅讀核准本機 manifest；正式啟動要求 SHA256，拒絕未知欄位與非本站相對路由，不讀 raw source／私密研究，不抓遠端資料、不執行工具或命令。模型只接收公開 metadata（非全站全文），目前 prompt context 有長度上限；真實回答品質仍 UNVERIFIED。前端不放任何秘密。
- 結構化日誌僅事件、隨機 request ID、HTTP header status 與耗時，不記錄問題、答案、IP、headers、URL/query 或例外內容。200 串流不等於完成；必須收到 done。上游關閉失敗時 fail closed，需管理者檢查後重啟專用服務。
- 獨立審閱找出串流 startup/send 失敗時的 cleanup 風險；新增測試實際重現 FAIL 後修正：完整 ASGI response owner、總逾時涵蓋停滯的下游傳送、受保護且限時的上游清理，清理完成後才釋放名額。延伸測試找到並消除雙重 timeout 的取消競爭。
- Pages workflow 拆出 npm ci、Astro/TS check、build、單元/整合測試、正式產物驗證、npm audit、來源及 Git 歷史已知秘密格式掃描；獨立 Python 與 browser/axe jobs 全通過才允許 deploy job。Pages 寫入權限限 deploy job。新增 public/CNAME。沒有觸發 workflow。

## 本輪實際修改／新增檔案

以下僅列本輪 touched paths（不含原本其他 dirty 內容）：

| 範圍 | 檔案 |
|---|---|
| 前端／設定 | `.env.example`、`.gitignore`、`package.json`、`package-lock.json`、`src/components/PenguinChat.astro`、`src/lib/penguin-ai.ts`、`src/lib/chat-config.ts`、`public/CNAME` |
| CI | `.github/workflows/deploy.yml` |
| 回歸／安全腳本 | `scripts/test-ai-production.mjs`、`scripts/test-ai-build.mjs`、`scripts/test-release-freeze.mjs`、`scripts/scan-secrets.mjs`、`scripts/validate-production.mjs` |
| 瀏覽器測試 | `tests/browser/public.spec.mjs`（僅 Mock → offline 預期）、`tests/browser/ai-api.spec.mjs`、`tests/browser/accessibility.spec.mjs` |
| 後端 | `backend/app.py`、`backend/pytest.ini`、`backend/tests/test_api.py`、`backend/requirements.txt`、`backend/requirements-dev.txt`、`backend/requirements.lock` |
| 部署範本／文件 | `backend/README.md`、`backend/deploy/nagi-ai.service`、`backend/deploy/api.env.example`、`backend/deploy/cloudflared.yml.example`、`backend/deploy/cloudflared-nagi.service` |
| Release | `docs/release/V3-IMPLEMENTATION-PLAN.md`、本檔 |

新增開發依賴 `@axe-core/playwright@4.14.0`；既有 Playwright 與其他未提交成果保留。npm 鎖與 Python production 精確版本均已稽核；Python 鎖為本地 CPython 3.12 解析，不冒充 ARM64/Python 3.13 已驗證。

本輪證據位於 `qa/v3-*` 以及 `qa/browser/`（不進入 dist）；`backend/.venv`、cache 及實際 knowledge 檔已忽略，不應提交虛擬環境或憑證。

## 測試與證據（本輪新執行）

| 驗證 | 結果 | 證據與實際範圍 |
|---|---|---|
| npm ci | PASS | `qa/v3-npm-ci.log`，279 packages audited，鎖定依賴可安裝 |
| Astro Check／Build | PASS | `qa/v3-final-build.log`，94 files，0 errors/warnings/hints，70 pages built，靜態輸出 |
| TypeScript | PASS | `npm run typecheck` exit 0，`qa/v3-final-typecheck.log` |
| Unit／integration | PASS | `qa/v3-final-tests.log`，完整 npm test；包含隔離 build／RSS 失敗情境、內容閘門與 repository base 路徑 |
| Production AI mode/client | PASS | `qa/v3-ai-build.log`，設定與重試測試、實際 Mock production build 被拒，明確 HTTPS API build 正確產生 HTML；只用測試傳輸 fixture，非真實 AI 證明 |
| Route／SEO／OG／sitemap／語言／內容隔離 | PASS（既有 validators 範圍） | `qa/v3-final-validate.log`，內部 links/anchors、圖片/腳本路徑、404、draft/private fingerprints、search/RSS/knowledge membership |
| Production artifact | PASS | 100 files，89 HTML、70 非 Mock dialogs；CNAME、無 source maps／私密檔／symlink／loopback URL；`validate-production` 與 `test-release-freeze` 實際輸出 |
| Responsive/browser integration | PASS | `qa/v3-final-browser.log`、`qa/browser/report.json`，144/144 passed，3.1m；1440×900、768×1024、390×844、320×568，Chromium |
| Accessibility automated | PASS（涵蓋範圍） | 上述 144 tests 中 48 個雙語六大頁面 axe cases，各測深淺色，共 96 scans；WCAG 2 A/AA、2.1 AA tags。非完整 WCAG 認證／螢幕閱讀器人工驗收 |
| API UI integration | PASS（fixture） | 四尺寸的 API fixture 重試成功、zh request、串流事件呈現、服務失聯與保留問題；正式產物保持 offline，fixture 不發布 |
| Backend security/integration | PASS | `qa/v3-backend-tests.log`，15 passed；CORS、假 forwarded header、429、oversize/chunked、輸入/欄位驗證、en/zh、錯誤不回顯、日誌、hash approval、並行、上游逾時、取消、start/body send failure、下游 stall、釋放後可再請求；另驗證上游關閉期間不重疊推論及關閉失敗 fail closed |
| npm dependency audit | PASS | `qa/v3-final-npm-audit.json`，全部依賴 0 known vulnerabilities；npm ci 新增 axe 後亦回 0 |
| Python production lock audit | PASS | `qa/v3-python-lock-audit.json`，17 pinned dependencies，0 known vulnerabilities；pip check：No broken requirements found |
| Secret scan | PASS（模式範圍） | `qa/v3-secrets.log`；172 source files、全部 15 個可達 Git commits 的已知憑證模式；不顯示命中內容。排除 binary/large files、不可達物件；非 entropy／全方位未知秘密保證 |
| Workflow YAML | PASS（語法與結構範圍） | YAML parser 成功，build/backend/browser/deploy 四 jobs 存在；未在 GitHub runner 執行，不宣稱 GitHub Actions 線上 PASS |
| Visual inspection | 部分已檢視 | 本輪人工看過桌面中文首頁、320px 中文首頁、390px 中文 About 實際完整截圖；未見阻擋排版問題。其他截圖與跨引擎仍未全面人工驗收 |

非阻擋提醒：目前鎖定的 Starlette 對 TestClient/httpx 回報 1 個 deprecation warning，15 tests 通過；未隱藏此警告。NO_COLOR/FORCE_COLOR 為 browser runner 提醒。RSS 503 是預期測試情境。無 lint 配置，未聲稱 lint PASS。測試中途失敗與修正證據 `qa/v3-asgi-red.log` 保留；以本節最後綠燈輸出為準。最終 `git diff --check` exit 0（僅既有 LF/CRLF 提醒），沒有覆蓋其他 dirty 改動。

## GitHub Pages 準備狀態

**本地靜態產物可建置；正式部署 NO-GO。** Astro `output: static`、site `https://nagi.tw`、root base `/`、trailing slash、雙語路由、404 與 public/CNAME 已驗證；無 server adapter／Node runtime 部署需求。原有 repository-base 隔離測試亦通過。

Actions 仍是 main push／workflow_dispatch；main push 可能直接部署，不能視為普通備份。任何正式操作須另獲核准。部署 job 等待 build、backend、browser checks；建議管理者為 github-pages environment 設定必要 reviewer。Actions 使用 major tags 的殘餘供應鏈風險仍存在，尚未以 release SHA pin 全部 action。

待管理者確認：Pages publishing source=GitHub Actions、custom domain=nagi.tw、domain ownership verification、HTTPS certificate／Enforce HTTPS、最終 repository variables 與最後成功 deployment/artifact/commit。CNAME 不代表 DNS 已生效；GitHub Actions 的實際 runner、environment protections 與回復基準皆 UNVERIFIED。

## Raspberry Pi／Cloudflare 準備狀態

**本地 FastAPI 實作與範本就緒；Pi 實機與正式 API UNVERIFIED。** 依 `backend/README.md` 獨立建立 user/directories/venv/service/tunnel，不復用或修改既有醫療服務。未取得或使用 SSH。

管理者需先盤點 8765/11434、RAM/CPU/磁碟與現有服務；若衝突，停止並另選隔離方案。API `127.0.0.1:8765`、Ollama `127.0.0.1:11434`，禁止公網 bind、router port forwarding 或 SSH tunnel ingress。防火牆／外網 port 檢查、Ollama 本機模式與模型安裝、ARM 依賴、systemd/cloudflared 真正解析、模型 cold-start/長問句容量與醫療服務資源互不影響，目前全數 UNVERIFIED。

範本包含：獨立重啟策略、環境檔、liveness/readiness、結構化日誌、catch-all 404 的專用 Tunnel、部署驗證及只回復專用服務的 rollback。核准知識 manifest/digest、實際專用 Tunnel UUID/credential、前版 release/venv/model baseline 仍需管理者準備，不能以 placeholder 啟動。

## 網域／DNS／HTTPS 與安全標頭

- 本輪 Google public DoH NS 查詢成功，回 `Status: 3`（NXDOMAIN），證據 `qa/v3-domain-dns.json`。**FAIL：公開網域解析目前不可用。** 網域是否已購買／註冊商狀態／zone 和 NS 委派行政原因仍 UNVERIFIED，不猜測已購買或過期。
- 先確認 `nagi.tw` 所有權，再依 Cloudflare zone 指派的 NS 完成註冊商委派。apex 與選用的 www 應指向管理端確認的 GitHub Pages 目標，API 子網域使用專用 Tunnel 的 DNS target；不得將 API 指向 Pi 公網 IP 或建立 SSH/Ollama ingress。
- 等公開 DNS 正確，再驗證 apex/www/API 憑證、HTTP→HTTPS、Pages custom domain 與所有資源、CORS、透過 Tunnel 的真實 en/zh 串流、逾時／取消／429／busy。此前前端維持 offline。
- 正式 HTTPS、CSP、HSTS、nosniff、Referrer-Policy、Permissions-Policy 全部 **UNVERIFIED**。GitHub Pages 不會讀 `_headers` 當伺服器設定，未加入誤導檔。若要由 Cloudflare edge 套用，先檢查方案與代理模式，按實際產物測 inline hashes／styles／connect-src，再使用 Report-Only；不加入未驗證的強制 CSP。HSTS includeSubDomains/preload 需所有相關子網域先完成驗證。
- backend 本地回應已加 no-store/nosniff/no-referrer；這不是正式 edge headers 或 TLS 的證明。

平台參考：[GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)、[Cloudflare Tunnel configuration](https://developers.cloudflare.com/tunnel/features/locally-managed-tunnels/configuration-file/)。

## 尚未完成／阻擋正式上線

1. **DNS FAIL**；域名購買/所有權/Cloudflare 委派與 Pages custom-domain 管理端未確認。
2. **真實 AI 未驗證**：Pi access、獨立服務與模型、核准知識／雜湊、ARM64/Python 3.13、資源隔離與推論品質/性能、Tunnel、安全網路與實際 HTTPS API 均未完成正式驗收。
3. **正式 HTTPS／headers UNVERIFIED**；本地安全測試不可替代線上驗收。
4. GitHub Actions 在正式 runner 的執行、Pages environment protection、發布 commit、最後成功版本與 rollback artifact 基準尚未確認。現有 dirty 工作樹也還需整批 release review，不可直接視為已核准版本。
5. 完整人工視覺、螢幕閱讀器與 Safari/Firefox／實體設備驗收未完成；僅上述實際涵蓋項目可標 PASS。外站所有連結存活、未知秘密與二進位 metadata 並未全面掃描。

解除以上阻擋後，再取得 Push／Merge／Deploy 核准，依 runbook 發布並保存真實 smoke-test 證據。現階段交付是可審閱的本地修改與部署準備，**不是已上線、也不是完整 Production Ready PASS**。

---

# 歷史稽核紀錄（2026-11-11；以下狀態已由上方取代）

# Nagi.tw V3 Final Production Release Audit

判定：**NAGI.TW V3 — NO-GO**

驗證日期：2026-11-11 Asia/Taipei。範圍為本地工作目錄；未 Push、Merge、Deploy 或變更正式環境。未掃描第三方網站。

## 1. 專案版本與 Git
- HEAD：7c93fea67d6162594e265d0c63351a3129e0f0f9。
- Branch：feat/v3.1-editorial-redesign。
- package.json：Astro ^7.3.2、TypeScript ^6.0.3，靜態輸出。
- 部署：.github/workflows/deploy.yml，main push 或 workflow_dispatch 觸發 GitHub Pages；故未執行 push。
- 開始時已有 19 個 tracked 修改及多個未追蹤 V3.1 設計、元件、測試檔。保留全部；未覆蓋、提交或刪除原始資料。
- V3.1 尚為未提交編輯設計工作，不能當成已發布版本。git diff --stat 已檢視；git diff --check exit 0（僅 CRLF 提醒）。逐行完整 code review 尚未完成。

## 2. 實際執行
| 指令／檢查 | 結果與證據 |
|---|---|
| npm run build | PASS；Astro check 91 files，0 errors/warnings/hints；70 pages built |
| npm run typecheck | PASS，tsc --noEmit 無診斷 |
| npm test | PASS；Experience、publication、catalog、content architecture、RSS、penguin、API config、disclosure、article、site 與隔離 build 測試完成 |
| npm run validate | PASS；Experience build、SEO、內部 links/anchors、語言、privacy、indexes、work pages、content build |
| npm run test:browser | PASS；92 passed，0 skipped/unexpected/flaky；約 74 秒 |
| npm audit --omit=dev | 0 vulnerabilities |
| npm audit --json | PASS，完整依賴 0 vulnerabilities；qa/final-dependency-audit.json |
| source maps | dist 遞迴 *.map 數量 0 |
| 敏感檔名追蹤檢查 | git ls-files env/secret/pem/key 類型只列出 .env.example；非全面秘密掃描替代品 |
| lint | NOT CONFIGURED；package.json 無 lint script，未宣稱通過 |

命令群組使用 PowerShell 分隔執行；上述結果依各指令實際輸出判讀，並非只依最後 exit code。RSS unavailable 測試的 503 為刻意失敗情境，測試通過。瀏覽器 NO_COLOR 提醒不影響結果。

## 3. 發現與修復
本次未修改產品程式碼：現有測試未重現需要最小修補的程式錯誤。新增本報告及依賴查核證據。不得將原有未提交修改宣稱為本次修復。

阻擋項目：
1. 缺少日文。src/i18n/ui.ts 的 Locale 僅 en/zh，SiteHeader 僅中英切換，Astro sitemap 同樣僅中英。不可用未翻譯內容冒充日文完成。需完成經確認的日文內容與對應驗證；本次不擅自擴張成全站翻譯開發。
2. 正式主機安全標頭、實際建置環境變數及 AI 服務網路隔離 UNVERIFIED。靜態產物無連線資訊不代表服務隔離完成。需要部署管理端與防火牆／反向代理的可稽核證據。
3. 全部既有改動逐行審查、所有頁面人工視覺檢視、Git 全歷史秘密掃描尚未完成；Security Audit 不得總結為全面 PASS。

## 4. AI 安全與隱私
- 保持 AI 功能原狀，未新增 API、代理或推理服務。
- PenguinChat 讀取 PUBLIC_PENGUIN_*；API 模式需明確 endpoint，預設 mock。任何 PUBLIC 變數均會公開，不可配置秘密。
- publicApiEndpoint 拒絕 IP、local/internal 類主機、URL credential/query/hash 及特定服務埠；test-api-config 實際測試通過。這是 URL 防護，不是 DNS 或網路 ACL 驗證。
- 產物 privacy 指紋測試涵蓋 HTML、JS、JSON、XML、CSS、SVG、TXT；已知私人身分指紋與撤回內容未命中。不是未知秘密的完整保證。
- test-experience-build 驗證內部 archive/assertion/reconciliation 不進入公開產物；publication/content 測試確認草稿排除及既有核准 URL 保留。
- Experience source preservation、年份與公開閘門測試 PASS；docs/experience-conflicts.md 仍有待核對來源，不將 source-recorded 當官方證實。
- article rendering security 與 API protocol 測試 PASS；外部連結、open redirect、所有前端 sink 尚未完成全面人工審閱。
- 正式安全標頭、正式環境秘密與 AI 網路隔離：UNVERIFIED。未輸出任何完整秘密或私人連線資訊。

## 5. Browser QA
證據：qa/browser/report.json、qa/browser/report/index.html、qa/browser/results 下附件。
實際 Chromium headless：1440×900、768×1024、390×844、320×568；每個 project 23 tests。
覆蓋中英文首頁、About、Experience、Projects、Research、Journal、實際雙語文章、導覽／手機選單、分類、mock 企鵝對話、404 返回。
測試檢查橫向溢出、文章與圖片邊界、圖片載入、頁面錯誤、console error、請求失敗及 HTTP error；只允許特定 404 測試預期錯誤。外部請求被攔截且若發生會使測試失敗。
結果 92/92 PASS。這不等於所有頁面人工視覺檢查，也未測 Safari、Firefox、真實觸控設備或外站可用性。截圖已產生，但本次未人工逐張審閱。760px 與品牌整體視覺最終人工驗收仍 UNVERIFIED。

## 6. Release Gate
- [x] Production Build PASS
- [x] 已配置必要測試 PASS
- [x] Desktop / Tablet / Mobile 自動 QA PASS（人工視覺限制如上）
- [x] Navigation PASS（測試覆蓋路徑）
- [ ] Language Switching 完整需求 PASS：中英 PASS，日文缺漏
- [x] Blog / Experience 本地測試 PASS（外部事實認證限制如上）
- [x] SEO / Metadata 本地 validator PASS
- [x] 已知私人身分／草稿產物檢查 PASS
- [ ] 全面 Privacy / Security Audit PASS
- [ ] AI Internal Service Exposure 完整檢查 PASS：本地測試 PASS，正式隔離 UNVERIFIED
- [x] 覆蓋頁面 No Blocking Console Errors
- [x] npm audit No Known Critical / High Vulnerabilities
- [x] No Unintended Public Drafts（既有 publication tests）
- [ ] Git Changes 完整逐行 Review

## 7. GO / NO-GO
NO-GO。不得因建置與 92 個瀏覽器測試通過就宣稱完整 Production Ready。先補日文需求、完整人工審閱與正式環境安全證據，再重跑相同驗收。若日文並非本版必備，需要站長明確調整 release scope，不能由稽核者默認移除。

## 8. 部署與 Rollback Plan（未執行）
1. 解決所有 gate，保存最終 diff、測試報告與產物；記錄已核准的 release commit 及目前線上最後成功 deployment/commit。
2. 重跑 npm ci、npm run build、npm run typecheck、npm test、npm run validate、npm run test:browser、npm audit；核對發布 artifact，不使用 fixture build。
3. 取得站長明確 Push / Merge / Deploy 核准。注意 main push 即觸發現有 Pages workflow。
4. 依核准流程提交並部署；不將本報告視為部署授權。部署後只做自有站 smoke check：TLS、headers、語言、歷史 URL、404、資產、mock 無 AI 外連。
5. 如有 regression，經核准重新部署事先記錄的最後成功版本／artifact，或以 revert commit 還原本次發布再走 workflow；不 force reset、不刪資料、不改 DNS。完成 smoke check 並記錄事故與回復版本。具體前版 ID 尚未取得，回復可行性仍須部署管理者確認。

# Blocker Resolution — 2026-11-11（本節取代上方仍列日文為 blocker 的結論）

## 範圍及判定
**NO-GO**：日文不再是 V3 必備；本地 AI 公開端點已凍結。正式 headers／網路隔離仍 UNVERIFIED，人工視覺驗收待完成。未 Push、Merge、Deploy。原有修改全數保留。

| Task | 狀態 | 證據／限制 |
|---|---|---|
| Japanese | PASS | Locale 僅 en/zh；公開 HTML 無 ja hreflang 或 ja/jp 切換入口；未刪翻譯或擴充結構 |
| Production headers | UNVERIFIED | curl.exe -sS -I --max-time 20 https://nagi.tw/ 實際回傳 curl (6) Could not resolve host；不能據此說標頭缺失 |
| AI 公開邊界 | PASS（本地） | PenguinChat 固定 mock、空端點、不再讀取 PUBLIC API URL；若 API mode 建置立即拒絕。底層 client/protocol 保留 |
| AI 正式網路隔離 | UNVERIFIED | 無管理端 ACL、反向代理、服務綁定與 ingress 證據 |
| Security review | PASS（下述已審邊界） | 非宣稱無漏洞；正式環境與 Git 歷史秘密檢查不在此 PASS 範圍 |
| 人工視覺 | BLOCKED | 已有自動截圖，但尚未人工逐張驗收，不能以 DOM 測試代替 |

## 正式 headers 驗證方式
部署來源設定是 GitHub Pages workflow（main push / workflow_dispatch、withastro/action、deploy-pages）。實際網域是否另經 CDN，因 DNS 失敗仍 UNVERIFIED。未加會誤以為 Pages 支援的 _headers 檔，也未直接套用 CSP。

在可解析正式網域的 PowerShell 執行：
```powershell
Resolve-DnsName nagi.tw
curl.exe -sS -D qa/production-headers.txt -o NUL --max-time 30 https://nagi.tw/
curl.exe -sS -I --max-time 30 http://nagi.tw/
```
預期 HTTPS 有效、首頁 200；HTTP 301/308 到同一 HTTPS 網域。對首頁、文章、靜態資產及不存在路徑分別核對：
- Content-Security-Policy：先盤點 inline scripts、style 與動態 style／語法高亮需求，以 Report-Only 測試後再由管理者批准 enforcement；不得直接加入 unsafe 範本。建議評估 object-src 'none'、base-uri 'self'、frame-ancestors 'none'，其餘來源與 hash 需依最終產物實測。
- Strict-Transport-Security：確認 max-age；建議至少 31536000。includeSubDomains/preload 需先驗證所有子網域，不直接要求啟用。
- X-Content-Type-Options：nosniff。
- Referrer-Policy：strict-origin-when-cross-origin 或更嚴格且經功能驗證的值。
- Permissions-Policy：至少明確限制不使用的 camera、microphone、geolocation；不要封鎖文章複製按鈕需要的剪貼簿能力。
目前以上五項皆 UNVERIFIED，並無 FAIL 的正式實測證據。若平台無法設定，需管理者提供現有 edge 層方案並核准，不在本次擅改平台。

## Security trust-boundary review
- API Routes／Authentication：Astro output static，無 SSR adapter、登入端點或 auth cookie 邊界。search.json、knowledge.json、rss.xml 是建置期 GET 產物；不接收使用者參數、不代理內網；僅輸出 publicRecords/content。沒有新增公開 AI backend。
- User input：文章唯一 set:html 來自 article renderer；原始 HTML escape、圖片 allowlist、連結僅本地路徑或無 credential 的 HTTPS，程式碼經 Shiki／escape；既有惡意 markdown 測試 PASS。聊天文字和來源標籤使用 textContent，外連加 noopener noreferrer；錯誤訊息為固定使用者訊息。
- DOM／redirect：搜尋 src 未見 eval、new Function、innerHTML、document.write 或 runtime redirect；語言切換只附加 hash，不執行其內容。publicRedirects 由受版本控制的核准資料產生，非使用者 open redirect。
- Environment：BASE_URL/SITE_BASE 用於建置路徑；NOTES_RSS_URL 只在 build fetch，非公開 SSR／使用者可控 SSRF。CI 管理者仍必須將此視為可信設定；RSS 失敗會記錄 URL 到 build log，故不可放秘密。PUBLIC API URL 已不再被公開元件讀取；正式部署環境其他 PUBLIC 變數仍須管理端檢查。
- External input：RSS URL 被限制為 Notes origin 與 articles 路徑；內容由 Astro 正常 escape，不使用 RSS HTML 作 set:html。外站可用性未掃描。
- Public assets：public 只有 JPG、SVG、robots.txt；SVG 為 path，未見執行腳本。先前 source-map 計數 0、privacy 指紋／publication tests 均通過；不代表所有二進位 EXIF 或 Git 歷史均完成秘密鑑識。
- Deployment：Pages write/id-token 僅部署工作流程，actions 使用 major tag，未固定 SHA 是供應鏈殘餘風險；未擅改 workflow。正式 CDN headers／環境 secrets／AI ingress 不可由 repo 證明。

## 修復及再驗證證據
本次產品修復僅 src/components/PenguinChat.astro；新增 scripts/test-release-freeze.mjs。中途第一次 npm test 因舊預期 API missing endpoint 應拒絕建置而 FAIL；補上 API 模式 fail-closed guard 後重新執行。首次產物測試將 Astro 的空屬性序列化誤認為缺值，已修正測試接受 data-endpoint 空屬性；不是放寬非空端點。

最終 freeze 測試：89 HTML、70 mock dialogs、empty endpoints、no Japanese entry PASS。證據 qa/blocker-freeze.log。其餘指令結果見 qa/blocker-build.log、blocker-typecheck.log、blocker-test.log、blocker-validate.log、blocker-browser.log；最終統計以以下補記為準。

## 人工視覺驗收清單（尚未勾選）
- [ ] 1440、768、390、320 寬度首頁／About／Experience／Journal／文章／404 實際截圖逐張看過。
- [ ] Dark-first、760px 閱讀區、品牌與企鵝、文字對比、換行與中英長標題。
- [ ] 手機選單點擊、Escape／焦點返回；平板切換斷點無重疊。
- [ ] 中英對應內容／錨點，沒有日文未完成入口。
- [ ] 長文圖片、表格、程式碼、目錄、複製按鈕及 mock 對話不遮擋內容。
- [ ] Safari／Firefox 或目標真實設備的必要驗收（Chromium 自動結果不代表其他引擎）。

## 部署與回復
沿用上方未執行計畫。先提供五項正式 headers 與 AI ACL/ingress 證據，完成人工清單，再核准上線；本報告不代表核准。取得正式部署版本與前版 artifact 後才能落實 rollback。停止於本地交付，等待站長決定。

最終再驗證補記：第二輪 npm test PASS；npm run build PASS（70 pages）；typecheck PASS；validate PASS；Chromium 92/92 PASS（1.5m）；release-freeze PASS（89 HTML／70 mock dialogs）。首次 diff --check 發現本次檔案 EOF 多餘空行，已移除並重新檢查。上述 logs 均為本地證據，未加入部署產物。產品只做 mock 凍結；不影響前次 dependency audit 結果，未更動依賴。

## 重複請求核對 — 2026-11-11
本輪未新增產品修改，未 Push、Merge、Deploy。重新核對工作目錄、PenguinChat 凍結邏輯與既有測試日誌。
- PASS：重新執行 node scripts/test-release-freeze.mjs：89 HTML、70 mock dialogs、空 endpoint、無未完成日文入口。
- PASS：重新 git diff --check，exit 0。
- PASS（沿用前輪，非本輪重跑）：build、typecheck、npm test、validate、Chromium 92/92；本輪沒有產品變更，不需要再次重複完整套件。
- FAIL：本輪未確認新的產品測試失敗；不得將 DNS 查詢失敗說成正式標頭缺失。
- UNVERIFIED：再次 curl.exe -sS -I --max-time 20 https://nagi.tw/ 得 curl (6) Could not resolve host。CSP、HSTS、X-Content-Type-Options、Referrer-Policy、Permissions-Policy 仍全數無法判定。正式 AI ACL/ingress 同樣無證據。
- BLOCKED：完整人工視覺清單仍待簽核；現有截圖位於 qa/browser/results，尚未完成逐張人工審閱。
判定仍 NO-GO。日文已由站長排除必備範圍，不再是 blocker。所有正式驗證指令、預期結果、審查限制與人工清單見上一節。停止操作，等待站長補齊證據與正式上線核准；未取得核准前不觸發 main workflow。

# Production Launch Preparation — 2026-11-11（目前有效狀態）

## DNS 診斷：FAIL（公開解析不可用）
- Resolve-DnsName nagi.tw、www.nagi.tw：名稱不存在。
- 指定公共 resolver 交叉查詢：apex／www 及 apex NS 同樣名稱不存在；未在報告記錄本機 resolver 私人位址。
- 獨立 HTTPS DNS 查詢：Google DNS 對 apex NS 和 www CNAME 均回 Status 3（NXDOMAIN），Authority 是 tw 的 SOA。此證據支持問題位於公開 DNS 名稱／委派層，非單純本機快取、HTTP 或 Astro。
- 精確行政原因仍 UNVERIFIED：需站長在註冊商確認域名有效期／狀態、權威 NS 委派與 DNS zone 是否啟用。不能僅由 NXDOMAIN 宣稱域名過期。
- 與 Pages 的一致性目前 FAIL：Astro site 指向 https://nagi.tw，但公開名稱無法解析；Pages 管理端 custom domain 設定、HTTPS 開關無權限證據，UNVERIFIED。public/dist 未找到 CNAME；對 Actions 部署而言，不能只以缺 CNAME 判定平台設定錯誤。
- 未改 DNS、未 flush cache、未寫 hosts。

唯讀重驗指令：
```powershell
Resolve-DnsName nagi.tw -Type NS -Server 1.1.1.1
Resolve-DnsName nagi.tw -Type A -Server 1.1.1.1
Resolve-DnsName www.nagi.tw -Type CNAME -Server 8.8.8.8
curl.exe -sS 'https://dns.google/resolve?name=nagi.tw&type=NS'
curl.exe -sS 'https://dns.google/resolve?name=www.nagi.tw&type=CNAME'
```
預期：NOERROR／Status 0、apex 有有效委派與符合管理端核准平台的答案，www 指到核准的 Pages 主機；不得將 repo URL 當 DNS 目標。實際應用記錄需以 Pages custom-domain 設定確認後由站長修改，不在此猜測／執行。

## 安全設定
- PASS（本地）：重跑 release-freeze：89 HTML、70 mock dialogs、空 endpoint、無日文入口。AI API mode fail-closed guard 保留，未公開模型服務。只驗公開入口，不等同隔離。
- UNVERIFIED：正式 AI ingress、ACL、防火牆、服務綁定、正式環境變數；需管理者提供遮蔽秘密後證據。
- UNVERIFIED：五項正式 headers。搜尋 .github、astro.config.mjs、public、src 未見 CSP/HSTS/nosniff/referrer/permissions 標頭配置；實際 headers 可能由平台提供，不可據此判定缺失。未加入 CSP。
- 正式 headers 查核指令及預期值沿用前節；待 DNS 恢復後對 HTTPS 首頁、文章、資產、404 執行。Preview headers 不是 production 證據。

## 本地 Production Preview：PASS（人工驗收尚未完成）
- 啟動：npm run preview -- --host 127.0.0.1 --port 4399。
- URL：http://127.0.0.1:4399/zh/；英文 http://127.0.0.1:4399/。
- HTTP HEAD /zh/ 實測 200 OK。綁定 loopback；僅此電腦可用。保留程序運行供站長驗收，若工作階段結束可用上述指令重啟。
- runtime banner Astro 7.4.6（package 宣告 ^7.3.2，兩者不是同一意義）。未重跑全部測試，沿用既有 92/92 與建置證據；本輪無產品變更。

人工必看：上述中英首頁，/zh/about/、/zh/experience/、/zh/projects/、/zh/research/、/zh/journal/、/zh/technical-reports/、/zh/contact/、/zh/security/disclosures/；各頁切換英文；再由 Journal 開一篇長文及既有歷史 URL；/__qa_missing__/ 驗證 404。
使用 1440／768／390／320 寬度檢查導覽、文字溢出、圖片、程式碼／複製、對話、焦點／鍵盤、品牌與閱讀寬度。人工清單仍未簽核，不把自動結果替代人工完成。

## Git 與部署準備
Branch feat/v3.1-editorial-redesign，HEAD 7c93fea67d6162594e265d0c63351a3129e0f0f9；多筆 tracked/untracked 修改仍保留，未 commit。部署來源 GitHub seraphforge/nagi.tw；main push 或 workflow_dispatch 執行 Deploy to GitHub Pages。main push 直接可能上線，必須先核准。

以下僅準備，**未執行**；先完成 DNS、安全與人工 gate 並取得核准：
```powershell
# 唯讀取得部署前基準並保存最後成功 run / commit
 gh run list --repo seraphforge/nagi.tw --workflow deploy.yml --status success --limit 5
 gh api repos/seraphforge/nagi.tw/pages
# 已核准 release commit 必須已存在核准的 main；未提交工作目錄不會隨 dispatch 發布
 gh workflow run deploy.yml --repo seraphforge/nagi.tw --ref main
 gh run list --repo seraphforge/nagi.tw --workflow deploy.yml --limit 5
 gh run watch <NEW_RUN_ID> --repo seraphforge/nagi.tw --exit-status
```
不可直接執行含 placeholder 的指令。當前 dirty branch 尚未準備可發布 commit；先人工 review／排除本地 qa artifacts，再依核准流程 commit / merge / push，本文件不授權這些動作。

Rollback（須核准，且先記錄前版 GOOD_SHA）：
```powershell
# 若發布是一個已記錄的 merge commit：在乾淨 main checkout 執行
 git revert -m 1 <RELEASE_MERGE_SHA>
# 若發布為單一一般 commit，改用 git revert <RELEASE_COMMIT_SHA>
# review revert diff，核准後才 push；main push 觸發現有 workflow
 git push origin main
```
多 commit／squash 需按實際整合方式選 revert，不可盲目套 merge 指令。revert 會重建前版內容，不保證位元完全相同；如需相同 artifact 必須確認已保留可重部署 artifact 與平台支援。前版 GOOD_SHA、artifact、rollback 可行性尚待管理者確認；不 force push、不改 DNS、不刪資料。

## 最終 Release Checklist
- [x] 既有自動化 PASS；本輪未重跑全部測試。
- [x] 日文未完成入口不公開，V3 不要求新增日文。
- [x] AI 公開介面固定 mock、無端點。
- [x] Production Preview 可訪問。
- [ ] DNS apex/www 恢復且與 Pages 設定一致（FAIL）。
- [ ] 五項正式安全標頭證據（UNVERIFIED）。
- [ ] 正式 AI 網路隔離證據（UNVERIFIED）。
- [ ] 人工視覺驗收簽核（BLOCKED／待站長操作）。
- [ ] 最終 Git diff review、核准 release commit 與 rollback 基準。
- [ ] 站長明確核准 Push／Merge／Deploy。

**NO-GO**：DNS 是已確認外部 blocker，其餘未驗證項目不可視為通過。已停止修改；Preview 保留供人工操作，等待站長核准。沒有 Push、Merge、Deploy 或 DNS 修改。
