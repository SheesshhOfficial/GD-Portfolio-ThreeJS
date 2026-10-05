# Task P004 - Complete the First Immersive Vertical Slice

Status: READY
Owner: Antigravity
Reviewer: Codex

## Goal

Turn the approved foundation into one polished end-to-end portfolio experience for Sheeshh Prop Hunt. Complete the cinematic entrance, project presentation, verified transformation-system breakdown, responsive states, and styled evidence placeholders without adding unverified claims or external assets.

## Read first

- `AGENTS.md`
- `PROJECT.md`
- `planning/VERTICAL_SLICE_SPEC.md`
- `planning/TECHNICAL_ARCHITECTURE.md`
- `planning/PORTFOLIO_CONTENT_MAP.md`
- `planning/CONTENT_EVIDENCE.md`
- `planning/MEDIA_CAPTURE_PLAN.md`

## Implementation

1. Add a cinematic entrance lasting approximately 2.5 seconds:
   - camera begins near the observatory threshold and settles at the studio overview;
   - any pointer interaction, Enter, Space, Escape, the visible Skip control, or reduced-motion preference completes it immediately;
   - never block the Direct Portfolio control.
2. Refine the Transformation Bench into the visual focal point using procedural geometry, materials, lighting, labels, and restrained motion. Keep the total vertical-slice scene below 40,000 triangles and 25 draw calls.
3. Complete the Prop Hunt exhibit presentation with:
   - project overview and evidence-state labels;
   - an `Inspect Transformation Architecture` action;
   - a responsive technical breakdown dialog/drawer;
   - verified flow steps for input/targeting, server RPC routing, multicast mesh swap, pivot-offset handling, and camera rotation lock;
   - a clearly separated boundary section stating that dynamic capsule resizing and collision-sweep placement were not found in the inspected Blueprint graphs and runtime proof remains pending.
4. Create original inline SVG or CSS diagrams for the Blueprint-style execution flow and the two pending media storyboards. Do not download or copy visual assets.
5. Complete desktop, mobile, keyboard, reduced-motion, loading, WebGL fallback, and failure states. Dialogs must manage focus, close on Escape, and restore focus correctly.
6. Keep audio disabled and clearly marked as coming later. Do not add background music.
7. Keep every public claim within the approved evidence boundaries. Preserve `Confirmation pending`, `USER_CONFIRMED: pending`, `PROVENANCE_PENDING`, and `Capture pending` where applicable.

## Performance decision

The measured accessible React shell baseline is accepted with a revised ceiling of `<80 kB gzipped`. Keep:

- immediate 2D shell below 80 kB gzipped;
- lazy 3D JavaScript below 300 kB gzipped;
- combined initial and lazy JavaScript/CSS below 350 kB gzipped;
- vertical-slice geometry below 40,000 triangles;
- main studio view below 25 draw calls.

Report measured results individually. Do not claim frame-rate success without measuring on the named device profile.

## Scope limits

- Do not add other project pillars, real videos, imported 3D assets, external fonts, a backend, analytics, deployment, or contact submission.
- Do not modify Unreal, Monolith, raw inspection data, approved evidence documents, or `.agents/workflows`.
- Do not rename or create alternate execution workflows.

## Validation

- TypeScript check and production build pass.
- Test the complete entrance-to-breakdown-to-return flow with pointer and keyboard.
- Test reduced motion, 2D mode, WebGL failure, mobile viewport, focus containment/restoration, and Escape behavior.
- Audit public copy against the evidence files.
- Record actual bundle, triangle, and draw-call measurements and identify any missed target.

Replace `coordination/IMPLEMENTATION_REPORT.md` with a compact P004 report. List files changed, tested flows, measurements, known limitations, and the next smallest milestone. Mark `COMPLETE` or `PARTIAL`, then stop for Codex review.
