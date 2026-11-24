---
title: "BugTraceAI-CLI contributions"
language: en
description: "Open-source maintenance work on terminal shutdown and machine-readable CLI output."
slug: bugtraceai-cli-contributions
publishedAt: "2026-11-21"
status: published
featured: true
cover: ../../../public/nagi.svg
coverAlt: "Nagi.tw editorial mark"
role: "Open-source contributor"
tools: ["Python", "Pytest", "Rich"]
repositoryUrl: https://github.com/BugTraceAI/BugTraceAI-CLI
---

## Terminal shutdown

An exception while stopping an active scan could interrupt the terminal interface before it reached its exit routine. The patch handles the stop failure on the shutdown path and attempts to release the scan lock during unmount. Regression tests cover pipeline state transitions, scan process lifecycle, and exit behavior.

A maintainer reported rerunning all 14 tests successfully in a clean Python 3.12 environment before merging the patch into `main` on October 19, 2026. The shutdown test simulated a scan-stop failure with a mock scan process. Cleanup of a real subprocess after a stop failure remains unverified. [Merged pull request #9](https://github.com/BugTraceAI/BugTraceAI-CLI/pull/9)

## Machine-readable output

Rich log messages could appear on standard output alongside the JSON from `summary --json`, causing downstream parsing to fail. An open pull request proposes routing console logs to standard error and adding a subprocess regression test. [Open pull request #10](https://github.com/BugTraceAI/BugTraceAI-CLI/pull/10)
