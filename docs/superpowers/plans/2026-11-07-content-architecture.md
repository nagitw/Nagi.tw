# Content architecture and history correction

User specification: current Content Architecture & Experience History Fix request.

Keep Astro, original URLs, styles and penguin. Use curated list membership rather than rewriting article kinds/URLs. Projects includes engineering artifacts; Research groups one primary medical-topic card with related notes and reports, preserving their independent URLs. Journal uses explicit per-path category metadata shared by both languages; four filter buttons and descending dates. Remove public plan routes/navigation/mock knowledge; retain original source locally and omit explicit personal-plan sections before rendering. Preserve all existing published records except requested plan/sensitive content.

1. Add regression checks for engineering-only Projects, deduplicated Research, four Journal categories with single membership, withdrawn plans and date precision/order.
2. Implement catalog selectors, Journal component and explicit classification. Keep article canonical URLs unchanged.
3. Remove plan entry points and serialization; preserve local originals. Scan output, including scripts and indexes.
4. Audit historical source and git versions independently in docs/experience-audit.md. Newly recovered candidates remain draft. Implement eventDate/year/datePrecision ordering for existing public experience and historical article sections without adding claims.
5. Run check/typecheck/build/test/validate and review. Update report and local commit only.
