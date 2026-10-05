# Task P005 - Remaining Prop Hunt Gameplay-System Exhibits

Status: READY
Owner: Antigravity
Reviewer: Codex

## Goal

Expand the approved Prop Hunt vertical slice into a coherent gameplay-systems collection. Add the remaining verified Prop Hunt exhibits through reusable, data-driven UI while preserving the existing entrance, Transformation Bench experience, evidence boundaries, accessibility, and performance.

## Read first

- `AGENTS.md`
- `PROJECT.md`
- `planning/PORTFOLIO_CONTENT_MAP.md`
- `planning/CONTENT_EVIDENCE.md`
- `planning/MEDIA_INVENTORY.md`
- `planning/MEDIA_CAPTURE_PLAN.md`

## Exhibits to add

1. Hunter Ballistics and elimination flow (`EX-PH-COMBAT`).
2. Positional VOIP and taunt pipeline (`EX-PH-AUDIO`).
3. Round-state, HUD, and spectator flow (`EX-PH-ROUND`).
4. Networked emotes and leader-pose switching (`EX-PH-EMOTES`).

Keep the existing overview and transformation exhibits intact.

## Implementation

- Refactor exhibit content into a typed data-driven structure where useful, avoiding duplicated modal and focus-management code.
- Extend Direct Portfolio navigation so every Prop Hunt exhibit can be reached without 3D interaction.
- Add a restrained procedural Systems Console hotspot or equivalent shared 3D station for the new exhibits. Keep it visually coherent with the observatory and avoid imported assets.
- Provide each exhibit with a concise overview, inspected implementation flow, technical boundary section, provenance/authorship state, and correctly identified capture placeholder.
- Create original inline SVG/CSS diagrams only when they explain the system better than text.
- Keep all dialogs/drawers keyboard accessible, focus-contained, Escape-dismissable, mobile responsive, reduced-motion safe, and available in static 2D mode.

## Evidence boundaries

- Combat: describe the inspected firing timer, server RPC/trace path, hit presentation, damage, and spectator transition. Disclose that camera vectors originate from the client and runtime authority/lag compensation remain unverified.
- Audio: describe inspected `UVOIPLIB` packet clearing, VOIP component registration, attenuation asset, and taunt broadcast structure. Do not claim automated life-state routing, low-level monitoring, logarithmic falloff, or occlusion filtering without proof.
- Round flow: describe inspected GameMode round tracking, HUD plumbing, and replicated player-state structure. Runtime completeness and multiplayer behavior remain capture pending.
- Emotes: describe inspected networked emote and leader-pose switching structure. Authorship and runtime animation quality remain pending.
- Never convert `VERIFIED_IMPLEMENTATION` into `RUNTIME_VERIFIED`. Preserve `USER_CONFIRMED: pending` and `PROVENANCE_PENDING`.

## Media placeholders

Use IDs already defined in the approved inventory/content map. Do not invent replacement IDs or claim that media exists. Each placeholder must state what capture would prove.

## Performance

- Keep immediate JS + CSS below 80 kB gzipped through lazy exhibit chunks.
- Keep lazy 3D JavaScript below 300 kB gzipped.
- Keep the combined application below the approved 350 kB gzipped ceiling, reporting precisely which chunks are included.
- Keep the main studio below the full-portfolio ceilings of 60,000 triangles and 30 measured draw calls.
- Remove diagnostic hooks after measurement.

## Scope limits

- Do not add real videos, external assets/fonts, technical-art or Blender exhibits, resume generation, backend services, analytics, deployment, or contact submission.
- Do not modify planning/evidence documents, workflows, dependencies, Unreal, Monolith settings, or raw inspection data.

## Validation

- TypeScript check and production build pass.
- Every exhibit opens from Direct Portfolio using keyboard and pointer input.
- Dialog focus containment, Escape dismissal, and focus restoration work for every exhibit.
- Static 2D and mobile views expose the same essential exhibit content and actions.
- Public-copy audit confirms all evidence boundaries.
- Record actual bundle sizes plus measured settled-studio triangles/draw calls; label anything unmeasured.

Replace `coordination/IMPLEMENTATION_REPORT.md` with the P005 result. Mark `COMPLETE` or `PARTIAL`, list exact tested flows and measurements, and stop for Codex review.
