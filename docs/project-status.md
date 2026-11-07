# Project development and website publication

`src/data/project-leads.json` is described by `src/data/project-leads.schema.json`.

- `developmentStatus` describes the project: `active-development`, `maintained`, `completed`, `paused`, or `archived`. Omit it when unknown; a prototype label does not imply a confirmed lifecycle.
- `publicationStatus` describes website editorial review only: `draft`, `review`, or `published`. Explicit owner confirmation is required before setting `published`; never infer approval from development status, evidence, a merge, or an existing placeholder route.
- Existing leads remain `draft` because publication approval has not been supplied. Draft placeholder pages and URLs are excluded from the build, indexes and AI manifest. Independently published articles retain their own approval.
- `evidence` retains its existing meaning and value. It is neither a development status nor publication authorization.
- Nagi CLI is `active-development`; BugTraceAI CLI is `maintained`. Both remain `draft`.
- BugTraceAI CLI's bilingual draft introduction records participation and contribution, explicitly excluding sole authorship of the entire project. Specific contributions require further confirmed information before expanding the introduction.

The existing MedTrust display `status` in `projects.ts` is a legacy prototype label, not a website publication decision. This update does not change existing project content or grant new publication approval.

Optional bilingual `role`, `contributions`, `projectType`, `architecture`, `verifiedResults` and `projectResults` support factual project documentation. `projectResults` describes upstream/team outcomes and is displayed separately from personal contributions and verified results. Omit unavailable facts and links. `github` and `demo` accept public HTTPS URLs; related technical articles require independent approval. Do not place confidential report details in this repository.
