---
"title": "MedTrust"
"description": "MedTrust is my system for testing trust and evidence handling in Medical IoT."
"originalDescription": "MedTrust is my system for testing trust and evidence handling in Medical IoT."
"slug": "medtrust"
"language": "en"
"status": "published"
"tags":
  - "project"
"featured": false
"recoveredFrom": "c54762236098c5c824ea73e26bd5829c222f25d2:src/data/migrated.js\
  on#en-systems-medtrust"
"evidence":
  - "label": "Historical public source"
    "url": "https://github.com/nagitw/Nagi.tw/blob/c54762236098c5c824ea73e26bd5829c\
      222f25d2/src/data/migrated.json"
    "claim": "MedTrust"
"tools": []
---
SYSTEM / CURRENT

# MedTrust

MedTrust is my Medical IoT Trust & Evidence System. It verifies Medical IoT messages, records Attack Validation, packages experiment evidence, and checks Evidence Integrity.

Domain: Medical IoT Trust

Status: CURRENT

Scope: Integrity Consistency

## System Overview

The Gateway is the trust boundary. Receiving data is not enough; messages and exported Evidence Packages must be verified.

## Architecture

ESP32-S3 Attack ESP32 FastAPI Gateway SQLite React Dashboard Evidence Package Offline Verifier

## Verification Pipeline

Canonical JSON device_id / key_id HMAC-SHA256 timestamp sequence / nonce experiment result

## Tests / Validation

Test commands and results are not presented as verified until reproducible output or a public repository is available.

Automated testsEvidence pending

Frontend buildProject record pending

Firmware buildProject record pending

## Current limitations

- No Digital Signature
- No Identity Proof
- No Non-repudiation
- The current claim is limited to integrity consistency.