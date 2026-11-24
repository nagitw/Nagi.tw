# Phase 8.2 engineering evidence

All three priority projects are **BLOCKED** for publication. The existing
drafts remain in place. The evidence below comes from local source review
unless a runtime check is explicitly stated. No external project was modified.

## RuralMed-Sat

- **Source identity and stage.** The local `ruralmed_v1/README.md` identifies
  a synthetic-data prototype. `ruralmed_v13/README.md` identifies a separate
  localhost store-and-forward simulator. Neither snapshot had Git history.
- **Implementation.** V1 `requirements.txt` lists FastAPI and Uvicorn.
  `app.py` defines the FastAPI routes, SQLite persistence and an outbox.
  Protected API routes use a bearer authorization check with
  `compare_digest`. The V1 status route reports the satellite link as
  unconfigured.
- **Acknowledgments.** V1.3 `satellite_sim.py` validates the receiver's
  acknowledgment and matching event ID before marking a row synced.
  `medical_center_sim.py` implements the loopback receiver. Its README
  describes offline/online, sync, and status commands, and says the
  simulator is separate from the main status UI. The receiver is
  unauthenticated and scoped to an isolated local demonstration.
- **Verification and gaps.** The V1 README documents Debian setup.
  Raspberry Pi deployment, AES-256-GCM, physical satellite connectivity,
  and existing automated test results remain unverified. Source review
  established the control flow. End-to-end runtime behavior was not exercised.
  Confirm the contributor role, approved disclosure scope, and any
  approved public references before drafting a case study.

## Nagi Medical Agent

No local repository or source snapshot was identified under this project
name in the checked development directories. Offline inference, Ollama
integration, model selection, retrieval-augmented generation, API behavior,
development stage, and tests remain unverified. A named source snapshot,
test report or reproducible test command, and disclosure approval are needed.

## Nagi Zero

The local `ESP32 Firmware/platformio.ini` selects an ESP32-S3 DevKitC-1
target with the Arduino framework. Its source contains Wi-Fi station
initialization and serial output. The inspected files do not establish
that this firmware belongs to Nagi Zero. Wi-Fi scanning, BLE scanning,
CLI commands, attached modules, firmware version, and measured power
consumption remain unverified for Nagi Zero. A project-linked source
revision, hardware inventory, test evidence, and power measurements
with test conditions are needed.

## Scope

Nagi Firmware Lab and AEUST Life remain secondary drafts. Local evidence
was sought in named Desktop development folders and known development
roots. Review was limited to relevant documentation, source, and Git
metadata. No private datasets, secrets, or runtime databases were used.
