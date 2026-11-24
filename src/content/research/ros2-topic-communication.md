---
"title": "ROS2 Topic Communication"
"description": "Lab note for documenting ROS2 publish and subscribe topic communication."
"originalDescription": "Lab note for documenting ROS2 publish and subscribe topic communication."
"slug": "ros2-topic-communication"
"language": "en"
"status": "published"
"tags":
  - "lab"
"featured": false
"recoveredFrom": "c54762236098c5c824ea73e26bd5829c222f25d2:src/data/migrated.js\
  on#en-labs-ros2-topic-communication"
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

- **Status:** In Progress
- **Date:** 2026-06-20
- **Category:** Robotics

## Purpose

Understand how **ROS2** nodes communicate through topics and how that flow can support an autonomous robot prototype.

## Setup

- ROS2 environment
- Linux workstation or Raspberry Pi
- Example publisher node
- Example subscriber node

## Steps

1. Create a simple publisher.
2. Create a subscriber that listens to the topic.
3. Inspect the topic list and message type.
4. Test message frequency and logging.

## Result

The basic publish / subscribe flow works and gives a clearer model for connecting sensors, control logic, and robot state.

## Notes

Naming topics clearly matters. Debugging becomes harder when topic names and message types are inconsistent.
