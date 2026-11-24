---
"title": "ROS2 Topic Communication"
"description": "記錄 ROS2 publish / subscribe topic 通訊 的 Lab 筆記。"
"originalDescription": "記錄 ROS2 publish / subscribe topic 通訊 的 Lab 筆記。"
"slug": "ros2-topic-communication"
"language": "zh-TW"
"status": "published"
"tags":
  - "lab"
"featured": false
"recoveredFrom": "c54762236098c5c824ea73e26bd5829c222f25d2:src/data/migrated.js\
  on#zh-labs-ros2-topic-communication"
"evidence":
  - "label": "Historical public source"
    "url": "https://github.com/nagitw/Nagi.tw/blob/c54762236098c5c824ea73e26bd5829c\
      222f25d2/src/data/migrated.json"
    "claim": "ROS2 Topic Communication"
"methods": []
"sources":
  - "https://github.com/nagitw/Nagi.tw/blob/c54762236098c5c824ea73e26bd5829c222\
    f25d2/src/data/migrated.json"
---
# ROS2 Topic Communication

- **狀態:** 進行中
- **Date:** 2026-06-20
- **Category:** Robotics

## Purpose

理解 **ROS2** nodes 如何透過 topics 溝通，並評估這個流程如何支援 autonomous robot prototype。

## Setup

- ROS2 environment
- Linux workstation 或 Raspberry Pi
- Example publisher node
- Example subscriber node

## Steps

1. 建立簡單 publisher。
2. 建立 subscriber 監聽 topic。
3. 檢查 topic list 與 message type。
4. 測試 message frequency 與 logging。

## Result

基本 publish / subscribe flow 可正常運作，也讓 sensors、control logic 與 robot state 的連接方式更清楚。

## 筆記

Topic 命名很重要。當 topic names 與 message types 不一致時，debug 會變得很困難。
