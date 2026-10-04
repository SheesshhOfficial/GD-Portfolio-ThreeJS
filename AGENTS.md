# Shared Agent Contract

## Roles

Codex owns portfolio strategy, architecture, task specifications, and final review. Antigravity owns assigned investigation, implementation, routine debugging, testing, and reporting. The human starts each handoff; files in `coordination/` carry the work.

## Antigravity procedure

1. Read `PROJECT.md` and `coordination/CURRENT_TASK.md`.
2. Start only when the task says `Status: READY`.
3. Work only within its scope and allowed files.
4. Batch independent operations. If one fails, record it and continue when safe.
5. Use Monolith in read-only mode unless the task explicitly authorizes Unreal edits.
6. Do not redesign approved architecture or refactor unrelated work.
7. Run all acceptance checks.
8. Replace `coordination/IMPLEMENTATION_REPORT.md`, mark it COMPLETE, PARTIAL, or BLOCKED, and stop for review.

## Evidence rules

- Classify claims as `VERIFIED_IMPLEMENTATION`, `RUNTIME_VERIFIED`, `USER_CONFIRMED`, `UNVERIFIED`, or `FUTURE`.
- Blueprint structure does not prove successful runtime behaviour.
- Treat dossier claims as questions until supported.
- Separate original, modified third-party, tutorial-derived, marketplace, and collaborative work.
- Never invent metrics, credits, authorship, dates, or shipped status.

## Safety

- Only one agent edits a given file at a time.
- Preserve user files and unrelated changes.
- Never delete or overwrite source media.
- Use Git diffs for review after a baseline exists.

