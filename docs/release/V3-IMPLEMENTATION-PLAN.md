# V3 production preparation — 2026-11-12

Spec: current user request. Preserve existing dirty working tree, public content and Penguin design. No push, merge, deployment, purchases, credentials or remote Pi changes.

Architecture: static Astro with explicit offline/API mode; mock only for explicit development/tests. Independent loopback FastAPI → loopback Ollama, exposed solely through a dedicated Cloudflare Tunnel. NDJSON contract: delta/source/done, bounded inputs/output and concurrency. No tools, arbitrary retrieval or conversation logging.

User explicitly requested direct local implementation; no additional design approval gate. Work in existing feature branch to preserve uncommitted work rather than create an incomplete clean checkout.

- [x] Add regression tests for production mode, client retry and backend security.
- [x] Implement offline/API integration, preserve layout and cancellation.
- [x] Add isolated backend, systemd/environment/tunnel templates and rollback runbook.
- [x] Strengthen Pages CI and production artifact/secret validation; add CNAME.
- [x] Execute frontend/backend/browser/security checks and record fresh evidence in V3-FINAL-AUDIT.md.

Review focus: spoofed proxy identity, chunked oversized bodies, cancelled streaming inference, unsafe knowledge selection, mock leakage, partial stream retry, secrets in public output.

Ruling: quota is global, deliberately not IP-derived — safe for an anonymous low-capacity Pi without trusting Cloudflare/forwarded headers. Fairness is limited; stronger edge controls remain a deployment gate.

Ruling: no worktree/commit — existing dirty feature branch contains the user's intended V3.1 work and must remain intact. Only listed release paths changed.

Verification: full npm tests/build/typecheck/validators, 144 browser cases including axe, real production API/mock config builds, Python lock audit and 15 backend tests passed. Reviewer found ASGI cleanup defect; reproduced RED, fixed GREEN, then removed competing timeout after extended stall test failed. Additional tests prove reservation retention during upstream close and fail-closed behavior on close failure. Details and exact evidence in final audit. Production remains NO-GO for external gates, not locally claimed complete deployment.
