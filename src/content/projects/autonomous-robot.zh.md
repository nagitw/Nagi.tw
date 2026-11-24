---
"title": "Autonomous Robot"
"description": "一篇關於透過建置、測試與除錯學習自主機器人的案例研究。"
"originalDescription": "一篇關於透過建置、測試與除錯學習自主機器人的案例研究。"
"slug": "autonomous-robot"
"language": "zh-TW"
"status": "published"
"tags":
  - "project"
"featured": false
"recoveredFrom": "c54762236098c5c824ea73e26bd5829c222f25d2:src/data/migrated.js\
  on#zh-projects-autonomous-robot"
"evidence":
  - "label": "Historical public source"
    "url": "https://github.com/nagitw/Nagi.tw/blob/c54762236098c5c824ea73e26bd5829c\
      222f25d2/src/data/migrated.json"
    "claim": "Autonomous Robot"
"tools": []
---
## 為什麼做這個專案

我開始做這個專案，是因為機器人會逼理論面對現實世界。程式看起來正確，仍然可能因為接線、電源、感測器、時間差，或地面狀況而失敗。我需要一個能讓失敗被看見的題目。

## 問題是什麼

自主機器人不是單一問題，而是一串不穩定的小系統：Linux 環境、感測器輸入、馬達控制、ROS2 通訊、地圖建立與移動。如果其中一層不穩定，整台機器人就很難被信任。

## 我的做法

我從底層往上做。先測硬體與環境設定，再嘗試讓機器人具備自主行為。每一次失敗都變成檢查點，幫我記錄自己對電源、通訊或控制流程的誤解。

## 我完成了什麼

我建立了一條原型路徑，包含 ROS2 環境、Raspberry Pi 整合、LiDAR 與感測器實驗、馬達測試，以及基礎移動測試。它目前仍是實驗，不是完成品。

## 我學到什麼

我學到機器人專案比起誇大的成果，更需要耐心。真正有用的進度，常常是讓某一層變得可重複，然後記下它上一次為什麼失敗。除錯紀錄和移動本身一樣重要。

## 技術環境

ROS2 · Ubuntu · Raspberry Pi · LiDAR · Motor Control