# Task P006 - Decoy Placement Exhibit

Status: READY
Owner: Antigravity
Reviewer: Codex

## Goal

Add the final approved Prop Hunt system exhibit, `EX-PH-DECOY`, to the existing data-driven gallery. Reuse the current navigation, modal, drawer, diagrams, 3D Systems Console, and static 2D architecture without expanding the foundation.

## Read first

- `planning/PORTFOLIO_CONTENT_MAP.md` — Exhibit 2
- `planning/MEDIA_INVENTORY.md` — `PH-DECOY`
- `planning/MEDIA_CAPTURE_PLAN.md` — section 2.3
- saved inspection data only when confirming an exact identifier

## Implementation

- Add canonical exhibit ID `EX-PH-DECOY` and media placeholder `PH-DECOY`.
- Use only the approved inspected structure:
  - client calls `Spawnproponserver`;
  - server reads the active prop mesh;
  - `SpawnPropsLeft` is checked against `MaxSpawnProps = 5`;
  - `BP_SPawnedProp` is spawned;
  - `MulticastSetMesh` matches the decoy mesh to the active disguise;
  - the spawned prop has physics simulation and collision-profile structure.
- State clearly that runtime placement, the five-decoy limit, physics behavior, hunter interaction, and authority over destruction remain capture/runtime verification targets.
- Keep authorship `USER_CONFIRMED: pending` and inherited mesh provenance `PROVENANCE_PENDING`.
- Add a compact original diagram only if it materially improves the explanation.
- Make the exhibit available through Direct Portfolio, the shared Systems Console, reusable modal/drawer, static 2D mode, keyboard navigation, and mobile view.

## Performance and scope

- Do not add new 3D station geometry; reuse the Systems Console.
- Keep immediate JS + CSS below 80 kB gzipped, lazy 3D JS below 300 kB, total application below 350 kB, and settled studio below the historical 29-draw-call baseline.
- Do not add real media, external assets, other projects, technical-art/Blender exhibits, packages, workflows, backend services, or deployment.
- Do not modify approved planning/evidence files, Unreal, Monolith, or raw inspection data.

## Validation

- TypeScript and production build pass.
- All six system exhibits open from Direct Portfolio and static 2D mode.
- Decoy modal and breakdown support keyboard focus containment, Escape, and focus restoration.
- Public copy contains no runtime success claim for the decoy system.
- Report actual bundle sizes; retain the historical studio measurement only if scene geometry is unchanged.

Replace `coordination/IMPLEMENTATION_REPORT.md` with the P006 result, mark `COMPLETE` or `PARTIAL`, and stop for Codex review.
