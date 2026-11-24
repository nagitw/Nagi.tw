---
title: "BugTraceAI-CLI 開源貢獻"
language: zh-TW
description: "改善終端介面的關閉流程，以及命令列工具的機器可讀輸出。"
slug: bugtraceai-cli-contributions
publishedAt: "2026-11-21"
status: published
featured: true
cover: ../../../public/nagi.svg
coverAlt: "Nagi.tw 網站標誌"
role: "開源貢獻者"
tools: ["Python", "Pytest", "Rich"]
repositoryUrl: https://github.com/BugTraceAI/BugTraceAI-CLI
---

## 終端介面的關閉流程

停止進行中的掃描時，如果發生例外，終端介面可能還沒執行結束程序就中斷。這項修正會在關閉流程中處理停止掃描時發生的例外，並在卸載介面時嘗試釋放掃描鎖。回歸測試涵蓋流程狀態轉換、掃描程序的生命週期與介面的結束行為。

維護者回報，在乾淨的 Python 3.12 環境中重新執行全部 14 項測試，結果全數通過，並於 2026 年 10 月 19 日將修正合併至 `main`。關閉流程測試使用模擬的掃描程序來重現停止失敗的情境。若停止掃描失敗，實際子程序能否正確清理，仍待驗證。[已合併的第 9 號 PR](https://github.com/BugTraceAI/BugTraceAI-CLI/pull/9)

## 機器可讀輸出

Rich 的日誌訊息可能與 `summary --json` 產生的 JSON 一同寫入標準輸出，導致下游程式無法解析。另一項仍開放的 PR 提議將終端日誌導向標準錯誤，並加入以子程序執行的回歸測試。[尚未合併的第 10 號 PR](https://github.com/BugTraceAI/BugTraceAI-CLI/pull/10)
