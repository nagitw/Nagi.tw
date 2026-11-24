---
"title": "ESP32 UART Test"
"description": "測試 ESP32 與 邊緣裝置 之間 UART 通訊 的 Lab 筆記。"
"originalDescription": "測試 ESP32 與 邊緣裝置 之間 UART 通訊 的 Lab 筆記。"
"slug": "esp32-uart-test"
"language": "zh-TW"
"status": "published"
"tags":
  - "lab"
"featured": false
"recoveredFrom": "c54762236098c5c824ea73e26bd5829c222f25d2:src/data/migrated.js\
  on#zh-labs-esp32-uart-test"
"evidence":
  - "label": "Historical public source"
    "url": "https://github.com/nagitw/Nagi.tw/blob/c54762236098c5c824ea73e26bd5829c\
      222f25d2/src/data/migrated.json"
    "claim": "ESP32 UART Test"
"methods": []
"sources":
  - "https://github.com/nagitw/Nagi.tw/blob/c54762236098c5c824ea73e26bd5829c222\
    f25d2/src/data/migrated.json"
---
# ESP32 UART Test

- **狀態:** 已完成
- **Date:** 2026-06-24
- **Category:** Robotics / Embedded systems

## Purpose

在把 **ESP32** 放進更大的 Robotics 或 sensor workflow 前，先確認基本 UART 通訊 是否穩定。

## Setup

- ESP32 development board
- USB serial monitor
- Jumper wires
- 基本 UART TX / RX connection

## Steps

1. 確認 baud rate 與 serial port。
2. 從 ESP32 傳送簡單訊息。
3. 在接收端讀取訊息。
4. 用不同 payload 長度重複測試。

## Result

當 wiring 與 baud rate 正確時，ESP32 可以送出可預期的 serial messages。

## 筆記

主要問題通常來自 wiring 方向、baud rate 不一致，以及 log 不夠清楚。
