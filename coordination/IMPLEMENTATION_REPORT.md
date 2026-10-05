# Implementation Report

Task ID: P003-R1
Status: COMPLETE

## Outcome

Resolved all public evidence language, control fallback states, dialog focus management, and performance reporting accuracy issues flagged for Task P003. Public copy now precisely reflects inspected Unreal assets without positive assertions of runtime authority or unverified constraints/density. Audio controls are rendered in an explicitly disabled `Sound: Coming later` state and unused sound actions have been pruned. When WebGL is unavailable, the 3D toggle is disabled with an explanatory label. The Direct Portfolio and ExhibitCard dialogs now feature native button activation, initial focus movement, bidirectional focus trapping (`Tab` and `Shift+Tab`), `Escape` closing, and focus restoration to the originating trigger. Performance reporting has been corrected to explicitly record the missed immediate shell target (<50 kB target vs ~76.64 kB measured) while tracking passing lazy-3D and combined bundle totals.

## Files changed

- `src/types/portfolio.ts`: Removed unused `soundEnabled` state and `TOGGLE_SOUND` action.
- `src/context/PortfolioContext.tsx`: Cleaned up initial state and reducer; added guard preventing transition to `3d` mode when WebGL is unsupported.
- `src/data/exhibits.ts`: Replaced `server-authoritative` with `server-routed RPC and multicast replication (runtime authority validation pending)`.
- `src/components/ui/Static2DView.tsx`: Replaced `server-authoritative` in hero description; updated engineering roadmap cards to describe presence of IK Rig/Retargeter and Physics Asset setups with constraints/density pending evidence.
- `src/components/ui/TopBar.tsx` & `TopBar.module.css`: Added `id="direct-portfolio-btn"` for focus restoration; disabled 3D view toggle when WebGL 2.0 is unsupported with accessible description and `.disabledButton` styling; replaced active audio toggle with a disabled `Sound: Coming later` button.
- `src/components/ui/DirectNavigationMenu.tsx` & `DirectNavigationMenu.module.css`: Replaced `div role="button"` project item with a native `<button>`; implemented initial focus entry to the close button; added bidirectional focus trap (`Tab`/`Shift+Tab`) and `Escape` key dismissal; added focus restoration back to the originating button; updated Pillar 2 and 3 descriptions to avoid unverified constraint/density claims; ensured `.itemCard` button inherits typography and width.
- `src/components/ui/ExhibitCard.tsx`: Implemented automatic focus entry to the close button on mount; added bidirectional focus trap, `Escape` key close handling, and focus restoration to the originating trigger upon close.
- `coordination/IMPLEMENTATION_REPORT.md`: Replaced previous P003 report with this corrected P003-R1 report and transparent performance budget accounting.

## Work completed

1. **Public Evidence Language Correction**:
   - Replaced all public instances of `server-authoritative` with `server-routed RPC and multicast replication (runtime authority validation pending)` in `src/data/exhibits.ts` and `src/components/ui/Static2DView.tsx`.
   - Removed positive assertions regarding custom ragdoll constraints, retargeting quality, and uniform texel density from `Static2DView.tsx` and `DirectNavigationMenu.tsx`. Phrased accurately around the verified presence of IK Rig, IK Retargeter, and Physics Asset setup assets, with runtime motion, joint constraints, and density benchmarks marked as evidence pending.
   - Verified that project role remains `Confirmation pending` and asset sourcing remains `PROVENANCE_PENDING`.
2. **Control & Fallback State Fixes**:
   - Removed unused `soundEnabled` and `TOGGLE_SOUND` from `PortfolioState` and `PortfolioAction`.
   - Replaced the interactive sound toggle in `TopBar.tsx` with a disabled `Sound: Coming later` button (`aria-disabled="true"`, title and aria-label indicating audio implementation pending).
   - Prevented false 3D mode selection when WebGL is unsupported by disabling the view mode toggle in `TopBar.tsx` with accessible description `View: 2D (3D Unavailable)` and adding a reducer guard in `portfolioReducer`.
   - Preserved reduced-motion behavior (camera snaps without damping, continuous reticle rotation disabled).
3. **Keyboard & Dialog Behavior**:
   - Converted the project card in `DirectNavigationMenu.tsx` from a `div role="button"` to a semantic `<button type="button">`, enabling standard keyboard trigger via `Enter` and `Space`.
   - Added focus management to `DirectNavigationMenu`: captures `originatingTriggerRef` on open, shifts focus to the close button (✕) on mount, traps `Tab` and `Shift+Tab` cycles inside the dialog, handles `Escape` to close, and restores focus to `#direct-portfolio-btn`.
   - Added focus management to `ExhibitCard`: moves focus into the close button (✕) upon mount, traps focus within actionable elements, handles `Escape` to dismiss, and restores focus to the originating trigger.
4. **Transparent Performance Budget Accounting**:
   - Explicitly marked the immediate 2D shell target as **MISSED** (measured 76.64 kB gzipped vs approved <50 kB target).
   - Kept passing lazy-3D and combined total bundle metrics clearly separated.
   - Removed all claims of "strict compliance" from reporting.

## Evidence and Monolith findings

- Inspected evidence boundaries from P001 remain strictly observed:
  - `BP_propChar`: Verified sphere trace and static mesh swap logic. Capsule recalculation and authority checks remain unverified at runtime.
  - `BP_ThirdPersonCharacter`: Verified fire timer and server line trace RPC. Client authority rollback unverified.
  - Setup assets: Verified presence of IK Rig, IK Retargeter, and PhAT physics asset; runtime joint limits, ragdoll stability, and texel density remain unverified.
- No Unreal project modifications or Monolith MCP queries were performed during this foundation correction.

## Validation

1. **Source Code Evidence Claim Audit (Grep)**:
   - `server-authoritative`: 0 matches in `src/` (Passed).
   - `joint physics constraints`: 0 matches in `src/` (Passed).
   - `uniform texel density`: 0 matches in `src/` (Passed).
   - `ragdoll`: 0 matches in `src/` (Passed).
   - `soundEnabled`: 0 matches in `src/` (Passed).
2. **Build & Type Checking**:
   - Command: `npm run build` (`tsc --noEmit && vite build`)
   - Result: Exit code 0 in 3.15s. Zero TypeScript errors, zero warnings.
3. **Measured Production Bundle Sizes (Actual Output)**:
   - `dist/index.html`: 1.63 kB (gzip: 0.80 kB)
   - `dist/assets/index-fpX3MvVS.css`: 17.43 kB (gzip: 3.81 kB)
   - `dist/assets/index-CxFL9zSk.js`: 233.79 kB (gzip: 72.03 kB)
   - `dist/assets/CanvasContainer-5jDKUGBS.css`: 0.14 kB (gzip: 0.14 kB)
   - `dist/assets/CanvasContainer-D4SaK-RT.js`: 3.77 kB (gzip: 1.39 kB)
   - `dist/assets/r3f-vendor-blbKOByH.js`: 187.49 kB (gzip: 59.86 kB)
   - `dist/assets/three-vendor-Dc7lxbqc.js`: 703.70 kB (gzip: 181.20 kB)
   - **Immediate 2D Shell Budget (<50 kB gzipped)**: **76.64 kB gzipped** — **MISSED** (Exceeds budget by 26.64 kB due to React DOM + UI shell base size).
   - **Lazy 3D Bundle Budget (<300 kB gzipped)**: **242.59 kB gzipped** — **PASSED** (Well within target).
   - **Combined Initial + Lazy Bundle Budget (<350 kB gzipped)**: **319.23 kB gzipped** — **PASSED** (30.77 kB headroom).
4. **Browser & Keyboard Flow Testing (`browser_subagent`)**:
   - Tested live on `http://127.0.0.1:4173/`:
     - TopBar Sound button verified disabled with label `"Sound: Coming later"`.
     - Direct Portfolio button verified with `id="direct-portfolio-btn"`.
     - Direct Portfolio opened via keyboard/click; focus landed automatically on close button (`✕`).
     - `Tab` pressed: focus moved to native `<button>` for "Sheeshh Prop Hunt" with visible focus indicator.
     - `Shift+Tab` pressed: focus trapped cleanly back to close button (`✕`).
     - `Enter` pressed on "Sheeshh Prop Hunt": exhibit card opened and focus shifted into ExhibitCard close button.
     - `Escape` pressed: ExhibitCard dismissed and focus restored to `#direct-portfolio-btn`.
     - Direct Navigation menu re-opened and closed via `Escape`: focus restored to `#direct-portfolio-btn`.
     - Browser console verified: **0 errors, 0 warnings, 0 failed network requests**.

## Failures and skipped items

- Immediate 2D Shell Bundle Target (<50 kB): Measured 76.64 kB gzipped. React 19 + React DOM base package overhead accounts for ~45 kB gzipped alone, leaving very little room for CSS, state reducers, and accessible HTML shell. Shell remains lightweight and highly responsive, but the strict <50 kB budget was missed. Next action: discuss in Milestone P004 whether further micro-optimizations (e.g. preact-compat or externalizing React) are desirable, or if the budget should be reconciled to ~75 kB.

## Deviations and decisions

- Rendered the sound button in `TopBar` as a disabled control with `"Sound: Coming later"` text rather than removing it entirely, preserving visual control hierarchy while preventing nonfunctional state toggling.
- When WebGL 2.0 is unsupported, the view mode toggle is disabled with a descriptive `aria-label` explaining WebGL unavailability, rather than hiding the button, providing accessible clarity on why 3D mode cannot be accessed.

## Questions for Codex

1. Does Codex wish to adjust the immediate 2D shell target to `<80 kB gzipped` in `TECHNICAL_ARCHITECTURE.md` to reflect React 19 + React DOM runtime requirements, or should we evaluate Preact aliasing in P004 to achieve `<50 kB`?
2. Are there any specific additional interactive controls desired for the P004 Technical Breakdown Drawer before vertical slice implementation begins?

Stopping for Codex review.
