# Task P008 - Sitewide Visual QA and Recruiter-Journey Polish

Status: READY
Owner: Antigravity
Reviewer: Codex

## Goal

Polish the existing portfolio as a coherent recruiter-facing experience. Improve orientation, visual hierarchy, responsive layout, and interaction clarity across the completed 3D studio and 2D gallery without adding new claims, exhibits, assets, or dependencies.

## Review first

- Run the production preview and inspect the real rendered site before changing code.
- Check at minimum: 1440x900 desktop, 1024x768 tablet, 390x844 mobile, keyboard-only, reduced motion, and 2D fallback.
- Preserve all evidence labels and content boundaries established through P007-R1.

## Work

- Make the first 10 seconds understandable: the visitor should immediately see Ashish's name, discipline, how to explore, and how to open the fast Direct Portfolio route.
- Add or refine a compact, dismissible orientation HUD after the cinematic entrance. It may explain the Transformation Bench, Systems Console, and Direct Portfolio button, but must not block navigation or return every visit during the same session.
- Improve visible 3D hotspot labels and their focus/hover states so both stations are clearly discoverable.
- Refine the Direct Portfolio hierarchy for fast recruiter scanning: featured game systems first, then Technical Art, then evidence-needed 3D work.
- Polish typography, spacing, contrast, modal/drawer sizing, overflow behavior, and touch targets across desktop, tablet, and mobile.
- Ensure loading and lazy-component fallbacks are visually consistent and communicate progress without implying an error.
- Keep `Sound: Coming later` disabled; do not introduce audio.
- Preserve focus trapping, Escape handling, focus restoration, reduced motion, and WebGL fallback.

## Evidence and content restrictions

- Do not add or rewrite technical claims unless necessary for clarity; any edited claim must remain within approved evidence.
- Do not expose contact details, credentials, authorship, or resume claims beyond their existing pending states.
- Do not add real media, generated fake screenshots, external assets, external fonts, new exhibits, packages, backend features, analytics, deployment, or contact submission.

## Performance

- Immediate JS + CSS stays below 80 kB gzipped.
- Complete first 3D experience stays below 350 kB gzipped.
- No new 3D geometry; retain the historical 29 draw calls / 1,944 triangles.
- Lazy optional content stays outside first render.

## Validation

- TypeScript and production build pass.
- Browser-test the entrance, orientation HUD, both hotspots, Direct Portfolio, at least one exhibit from each pillar, 2D mode, reduced motion, keyboard-only flow, and focus restoration.
- Confirm no horizontal overflow at the required desktop/tablet/mobile sizes.
- Check visible focus, contrast, button labels, dialog headings, and touch targets.
- Report before/after observations, files changed, exact tested viewports, bundle measurements, and any remaining visual limitations.

Replace `coordination/IMPLEMENTATION_REPORT.md` with the P008 result, mark `COMPLETE` or `PARTIAL`, and stop for Codex review.
