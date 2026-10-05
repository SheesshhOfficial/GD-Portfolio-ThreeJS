# Implementation Report

Task ID: P006
Status: COMPLETE

## Outcome

Integrated the final approved Prop Hunt system exhibit, Decoy Prop Placement & Spatial Deception (`EX-PH-DECOY`, media placeholder `PH-DECOY`), completing all six linked gameplay system exhibits. Reused the established data-driven UI, procedural 3D Systems Console, and static 2D architecture without expanding foundation bundles or modifying scene geometry. Added a dedicated inline vector schematic (`DecoySpawnFlowDiagram`) and framed all claims strictly around verified Blueprint structures while marking runtime placement, physics settling, hunter interaction, and destruction authority as unverified and capture pending.

## Files changed

- `src/data/exhibits.ts`: Authored and exported `EXHIBIT_DECOY` (`EX-PH-DECOY`, placeholder `PH-DECOY`), integrated it into `ALL_EXHIBITS`, `EXHIBITS_MAP`, and `EXHIBIT_INDEX`. Defined verified 5-step walkthrough (`Spawnproponserver`, `MaxSpawnProps = 5`, `BP_SPawnedProp` spawning, `MulticastSetMesh`, and simulated physics/collision), technical boundary on destruction authority, and provenance notes.
- `src/components/diagrams/SystemsDiagrams.tsx`: Implemented lightweight vector SVG schematic `DecoySpawnFlowDiagram` detailing client input, server capacity check, multicast mesh assignment, and physics settling with architectural disclosures.
- `src/components/ui/TransformationBreakdownDrawer.tsx`: Imported `DecoySpawnFlowDiagram` and wired conditional rendering for `EX-PH-DECOY`.
- `src/components/ui/Static2DView.tsx`: Added lazy-loaded import for `DecoySpawnFlowDiagram` and wired conditional rendering for `EX-PH-DECOY` in the 2D editorial view.
- `src/components/3d/StudioScene.tsx`: Added `EX-PH-DECOY` to `isSystemsActive` check so the procedural Systems Console station highlights when the decoy exhibit is active.

## Work completed

1. **Decoy Exhibit Data Modeling (`EX-PH-DECOY`)**:
   - Added canonical ID `EX-PH-DECOY` with approved media placeholder `PH-DECOY`.
   - Documented the verified 5-step architecture:
     - Step 1: `IA_SpawnProp` client input triggering reliable Server RPC `Spawnproponserver`.
     - Step 2: Server evaluates `SpawnPropsLeft` against `MaxSpawnProps = 5` limit and decrements.
     - Step 3: Server spawns `BP_SPawnedProp` actor ahead of player transform.
     - Step 4: Server queries active disguise static mesh and invokes `MulticastSetMesh` on the spawned actor.
     - Step 5: `BP_SPawnedProp` contains physics-simulation and collision-profile setup; resulting drop and settling behavior remains runtime capture pending.
   - Sourced code authorship as `USER_CONFIRMED: pending` and inherited mesh disguise as `PROVENANCE_PENDING`.
2. **Dedicated Inline Vector Diagram (`DecoySpawnFlowDiagram`)**:
   - Created original responsive SVG flow diagram in `SystemsDiagrams.tsx` illustrating the RPC trigger, server capacity check, mesh replication, and physics settling.
   - Included boundary callout disclosing that runtime physics settling, five-decoy limit enforcement, and destruction authority remain unverified at runtime.
3. **Direct Navigation & UI Drawer Integration**:
   - Direct Navigation Menu automatically populated with `EX-PH-DECOY` through `EXHIBIT_INDEX`.
   - Reused `ExhibitCard` and `TransformationBreakdownDrawer` without duplicate modal code.
4. **3D Systems Console Station Association**:
   - Reused existing procedural Systems Console station at `[-2.2, 0, 0]` without adding new 3D geometry or draw calls.
   - Highlighted station when `EX-PH-DECOY` is active via `isSystemsActive`.
5. **Static 2D & Mobile Parity (6 Exhibits)**:
   - Updated `Static2DView.tsx` to render all 6 exhibits with full editorial parity, lazy-loaded diagrams, and technical boundary cards.
   - Verified mobile responsiveness at 375x667 with no horizontal overflow.

## Evidence and Monolith findings

- **Decoy System Implementation (`EX-PH-DECOY`)**:
  - Implementation verified: `BP_propChar` implements `EnhancedInputAction IA_SpawnProp` -> `Spawnproponserver` (reliable Server RPC). Server reads active prop mesh, validates `SpawnPropsLeft` against `MaxSpawnProps = 5`, decrements counter, spawns `BP_SPawnedProp`, and invokes `MulticastSetMesh` to match disguise. `BP_SPawnedProp` activates physics simulation and collision profile.
  - Evidence classification: `VERIFIED_IMPLEMENTATION`. Public copy explicitly notes that runtime placement, five-decoy limit, physics settling, hunter interaction, and destruction authority remain unverified at runtime (`RUNTIME_VERIFIED: pending`).
  - Destruction authority discrepancy: Disclosed that Hunter event `Server_DestroyFakeProp` is labeled with Server in name but configured as an owning-client RPC in metadata, alongside direct `Destroy Actor` in graph, requiring runtime dual-client playtesting to confirm authority.
  - Media placeholder: `PH-DECOY` (Controlled runtime recording demonstrating decoy deployment, count limitation, physics settling, and hunter weapon interaction).

## Validation

- **TypeScript Compilation & Production Build**:
  - `npm run build` (`tsc --noEmit && vite build`) passed with zero errors or warnings.
- **Bundle Ceilings & Chunk Sizes**:
  - Immediate Shell JS (`index-C7Y5n4EE.js`): 77.40 kB gzipped.
  - Immediate Shell CSS (`index-BOH_HKMK.css`): 2.32 kB gzipped.
  - **Immediate Shell JS + CSS Combined: 79.72 kB gzipped** (Ceiling: < 80 kB).
  - Immediate HTML (`index.html`): 0.81 kB gzipped (reported separately).
  - Lazy 3D JS (`three-vendor` + `r3f-vendor` + `CanvasContainer`): 181.20 kB + 59.87 kB + 2.63 kB = **243.70 kB gzipped** (Ceiling: < 300 kB).
  - **Total Combined Application (all chunks JS + CSS + HTML): 345.99 kB gzipped** (Ceiling: < 350 kB; JS+CSS only: 338.24 + 6.94 = 345.18 kB).
- **Historical 3D Studio Render Baseline**:
  - **Draw Calls**: 29 calls (Ceiling: < 30 calls) retained; studio scene geometry unchanged.
  - **Triangles**: 1,944 triangles (Ceiling: < 60,000 triangles) retained; studio scene geometry unchanged.
- **Automated Interaction & Accessibility Verification (`test_p006_validation.mjs`)**:
  - Diagnostic Hook Cleanliness: Verified `window.__STUDIO_PERF__` is `undefined` (no diagnostic hooks in production).
  - Direct Navigation Menu: All 6 exhibits (`ex-ph-transform`, `ex-ph-decoy`, `ex-ph-combat`, `ex-ph-audio`, `ex-ph-lifecycle`, `ex-ph-customization`) selectable via pointer and keyboard.
  - Exhibit Cards: All 6 cards open, render metadata and capture placeholders with proven intent, trap focus, and dismiss on Escape.
  - Breakdown Drawers: All 6 exhibits open inspection drawer, render corresponding SVG vector diagrams, display 5 verified implementation steps, display scoped technical boundaries, dismiss on Escape, and restore focus to the triggering inspect button.
  - Static 2D Editorial View: Full parity verified with 6 exhibit articles, 8 inline SVG diagrams, and 6 boundary disclosures.
  - Mobile Viewport: 375x667 verified with zero horizontal overflow (`innerWidth === scrollWidth === 375`).
  - Evidence Copy Audit: 100% passed across all required evidence assertions (no zero-latency, seamless, flawless, whole-codebase claims, unverified pseudo-code, or decoy runtime success assertions).

## Failures and skipped items

- None. All scoped requirements, data models, UI components, diagram integration, and validation criteria passed.

## Deviations and decisions

- **Systems Console Station Reuse**: As instructed, no new 3D station geometry was introduced for `EX-PH-DECOY`. Selecting `EX-PH-DECOY` focuses the camera on `'systems-console'` and highlights the existing procedural console station, maintaining the settled studio at 29 draw calls and 1,944 triangles.
- **Lazy Diagram Loading**: `DecoySpawnFlowDiagram` was added to `SystemsDiagrams.tsx` and dynamically imported behind Suspense in `Static2DView.tsx`, ensuring the immediate shell JS bundle remained under the strict 80 kB ceiling (77.40 kB JS + 2.32 kB CSS = 79.72 kB).

## Questions for Codex

- None. Task P006 is complete and ready for Codex review.
