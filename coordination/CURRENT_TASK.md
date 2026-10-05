# Task P007 - Technical Art and 3D Asset Pipeline Pillars

Status: READY
Owner: Antigravity
Reviewer: Codex

## Goal

Add the approved Technical Art and 3D Asset Pipeline pillars while preserving the completed Prop Hunt collection. Technical Art cards may describe verified asset presence; 3D Art cards must remain evidence-request placeholders until Ashish selects and confirms original source assets.

## Read first

- `planning/PORTFOLIO_CONTENT_MAP.md` sections 5 and 6
- `planning/CONTENT_EVIDENCE.md`
- `planning/MEDIA_INVENTORY.md`
- `planning/MEDIA_CAPTURE_PLAN.md`

## Exhibits

- `EX-TA-IKRETARGET` with media `TA-IKRETARGET`.
- `EX-TA-RAGDOLL` with media `TA-RAGDOLL`.
- `EX-3D-ASSET-01` with media `3D-TURNTABLE-01`.
- `EX-3D-TEXTURING` with media `3D-UV-BREAKDOWN`.

## Evidence rules

- IK Retargeting: asset presence is verified for `RTG_NewRetargeter`, `stormtrooperikrig`, and `oldmilitiryrig`. This does not prove original rigging, bone-chain quality, runtime animation quality, or zero-distortion output. Base armatures and animations remain `PROVENANCE_PENDING`; setup authorship is `USER_CONFIRMED: pending`.
- PhAT: `StormTrooper_PhysicsAsset` exists. Do not claim custom bodies, tuned joint limits, stable simulation, or animation-to-ragdoll blending. Those require editor/runtime capture and authorship confirmation.
- Hard-surface and UV/Texturing: no authored asset has been selected. Present these as polished evidence-request cards explaining exactly what Ashish must provide. Do not display implementation steps as verified or imply clean topology, non-manifold checks, export settings, texel density, or PBR authorship already exist.

## Implementation

- Extend the typed exhibit model to support distinct evidence states such as `VERIFIED_IMPLEMENTATION`, `USER_CONFIRMED: pending`, and `EVIDENCE_REQUIRED` without treating them as interchangeable.
- Add separate Direct Portfolio sections for Technical Art and 3D Asset Pipelines.
- Reuse accessible modal/drawer infrastructure, but adapt labels so pending 3D-art cards say `Evidence needed` rather than `Verified implementation`.
- Provide static 2D parity, mobile layout, focus management, Escape dismissal, and reduced-motion behavior.
- Create restrained original SVG/CSS editor-style placeholders where useful. Do not fabricate screenshots, source models, UV sheets, constraint values, or before/after results.
- Reuse the existing Systems Console or direct-navigation path; do not add 3D geometry in this milestone.

## Performance

- Keep the immediate shell JS + CSS below 80 kB gzipped.
- Keep the initial 3D journey download within the existing approved ceiling; lazy Technical Art/3D Art content must not be required for first render.
- Report optional pillar chunks separately. Do not mislabel the sum of every optional chunk as the initial download.
- Scene geometry is unchanged, so the historical 29 draw calls / 1,944 triangles may be cited without reinstalling diagnostics.

## Scope limits

- Do not add real media, select an asset on Ashish's behalf, download assets/fonts, generate a resume, add contact submission, backend services, analytics, deployment, dependencies, workflows, or new 3D station geometry.
- Do not modify approved planning/evidence files, Unreal, Monolith, or raw inspection data.

## Validation

- TypeScript and production build pass.
- All ten exhibits are categorized and reachable through Direct Portfolio and 2D mode.
- Technical Art and 3D Art evidence labels match their actual status.
- Keyboard focus, Escape, restoration, and mobile layout work for all four new cards.
- Public-copy audit finds no authorship, quality, or provenance overclaim.
- Report immediate and optional bundle costs separately.

Replace `coordination/IMPLEMENTATION_REPORT.md` with the P007 result, mark `COMPLETE` or `PARTIAL`, and stop for Codex review.
