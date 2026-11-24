---
"title": "MedTrust"
"description": "MedTrust 是用來測試 Medical IoT 信任與證據處理的系統。"
"originalDescription": "MedTrust 是用來測試 Medical IoT 信任與證據處理的系統。"
"slug": "medtrust"
"language": "zh-TW"
"status": "published"
"tags":
  - "project"
"featured": false
"recoveredFrom": "c54762236098c5c824ea73e26bd5829c222f25d2:src/data/migrated.js\
  on#zh-systems-medtrust"
"evidence":
  - "label": "Historical public source"
    "url": "https://github.com/nagitw/Nagi.tw/blob/c54762236098c5c824ea73e26bd5829c\
      222f25d2/src/data/migrated.json"
    "claim": "MedTrust"
"tools": []
---
系統／目前

# MedTrust

Medical IoT Trust & Evidence System。MedTrust 驗證醫療 IoT message、記錄 Attack Validation、封裝實驗證據，並檢查 Evidence Integrity 的一致性。

領域: Medical IoT 信任

狀態: 目前

範圍: 完整性一致性

## 系統概覽

Gateway 是 trust boundary。收到資料不夠；message 本身與 export 後的 Evidence Package 都需要被驗證。

系統: Medical IoT 信任與證據系統

不是: 醫院平台 / 護理工作平台

目前主張: Integrity consistency，不宣稱 Digital Signature、Identity Proof 或 Non-repudiation

## 系統架構

ESP32-S3
Attack ESP32
FastAPI Gateway
SQLite
React Dashboard
Evidence Package
Offline Verifier

裝置層

### ESP32-S3 / Attack ESP32

有效裝置與攻擊情境分開產生，讓驗證不只測成功路徑，也測惡意或錯誤路徑。

Gateway 層

### FastAPI + SQLite

Gateway 檢查 device identity、key_id、HMAC-SHA256、timestamp、sequence number、nonce 與 replay state，再記錄 experiment result。

證據層

### Package + Verifier

Evidence Package 保存 file hash、package digest、manifest data 與 Offline Verification 結果，用來偵測 tamper。

## 驗證流程

Canonical JSON
device_id / key_id
HMAC-SHA256
timestamp
sequence / nonce
experiment result

- Valid message

- Invalid signature

- Unknown device

- Wrong key

- Replay attempt

## 攻擊驗證

攻擊裝置

### Attack ESP32

Attack scenarios 用來確認 Gateway 會擋下 invalid 或 replayed message。系統會保留 attack outcome，而不是只展示成功訊息。

Gateway 回應

### Reject and record

Invalid signature、replay、unknown device、wrong-key 會被分類，讓 experiment result 可以被保存與回頭檢查。

## 實驗系統

BATCH

### Experiment Batch

把 valid case 與 attack case 放進可重複檢查的 evidence unit。

DASHBOARD

### React status surface

顯示 message validation 與 evidence integrity state，但不把測試結果包裝成 KPI。

API

### Integrity API

提供 package verification state，讓 Dashboard 與 report generation 可以使用。

## Evidence Package

- Report Package

- integrity-manifest.json

- SHA-256 file hashes

- deterministic package digest

- print/PDF report provenance

## Integrity Verification

Evidence Integrity 目前指的是 integrity consistency。

離線驗證工具

### Recompute and compare

Export 後的檔案可以重新 hash，package digest 可以重算，Offline Verifier 可以偵測 tamper。

範圍限制

### No identity proof claim

目前範圍不宣稱 Digital Signature、Identity Proof 或 Non-repudiation。

## 測試與驗證

自動測試待公開證據

前端建置待專案紀錄

韌體建置待專案紀錄

[結案階段：Evidence Integrity](/zh/technical-reports/evidence-integrity-archive/) [MedTrust Series](https://nagi.tw/journal/series/medtrust/)