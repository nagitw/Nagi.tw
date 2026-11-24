---
title: "RuralMed-Sat"
description: "An unpublished project draft separating a prior synthetic-data prototype review from unverified satellite and deployment claims."
slug: ruralmed-sat
publishedAt: "2000-01-01"
status: draft
featured: false
demo: false
tags: []
cover: ../../../public/nagi.svg
coverAlt: "Nagi.tw site mark; not a RuralMed-Sat deployment photograph"
coverCaption: "Existing schema placeholder; not deployment or clinical evidence."
role: "Pending author confirmation"
tools: ["Pending author confirmation"]
language: "en"
---

## Project context

RuralMed-Sat is being prepared as an engineering case study. The available repository evidence is a prior source-review summary, not a newly inspected source release or a completed deployment report.

## What the prior review records

The Phase 8.2 evidence review (`docs/phase-8.2-engineering-evidence.md`) distinguishes two snapshots:

- V1 was described as a synthetic-data prototype. The review records FastAPI routes, SQLite persistence, an outbox and bearer authorization on protected API routes. Its satellite link was reported as unconfigured.
- V1.3 was described as a separate localhost store-and-forward simulator. The review records receiver acknowledgement and event-ID checks before a row is marked synced. Its loopback receiver was unauthenticated and limited to an isolated local demonstration.

These are attributed historical review findings. The source snapshots were not re-executed or freshly reviewed in Phase 10.3. Nagi's authorship, exact source identity and permission to disclose them remain unconfirmed.

## Verification limits

The repository does not establish a Raspberry Pi deployment, physical satellite connection, AES-256-GCM implementation, automated test result or end-to-end runtime outcome for this case study. Synthetic data and a localhost simulator are not evidence of clinical use, patient-data handling or a production medical system.

## Author confirmation required

- Identify the approved source revisions and which snapshot should anchor the case study.
- Confirm Nagi's role, contribution scope, dates and actual development stage.
- Clarify whether the two snapshots are milestones or separate demonstrations.
- Supply a reproducible, authorized validation record and its limitations.
- Confirm public links and disclosure rights; do not supply patient data or operational secrets.

## Editorial status

Remain draft. Optional development status and structured evidence URLs are omitted because no approved public source URL has been supplied. Required role/tools markers, the existing 2000-01-01 date and site-mark cover remain explicit schema placeholders. No translation or deployment claim is authorized.
