# Task P003 - Website Foundation and Accessible 3D Shell

Status: READY
Owner: Antigravity
Reviewer: Codex

## Goal

Create the runnable website foundation defined in the approved architecture. Build a polished application shell, a lightweight original 3D studio prototype, and a usable 2D fallback. Keep project content as clearly labeled placeholders; the complete Prop Hunt exhibit belongs to the next milestone.

## Read first

- `AGENTS.md`
- `PROJECT.md`
- `planning/TECHNICAL_ARCHITECTURE.md`
- `planning/VERTICAL_SLICE_SPEC.md`
- `planning/PORTFOLIO_CONTENT_MAP.md`
- `planning/MEDIA_INVENTORY.md`

## Implementation

1. Initialize a Vite React TypeScript application in the existing `try 2` folder without deleting or relocating coordination, planning, raw-data, or workflow files.
2. Resolve mutually compatible current stable versions and lock them in the package lock. Install only dependencies needed now: React, Three.js, React Three Fiber, Drei, Vite, TypeScript, and essential lint/build tooling.
3. Implement the foundation from the approved architecture:
   - immediate semantic HTML application shell;
   - lazy-loaded 3D canvas behind an error boundary;
   - `PortfolioContext` with `useReducer` for view mode, active exhibit, navigation, and reduced-motion state;
   - visible controls for Direct Portfolio, 3D/2D mode, and sound-off state;
   - keyboard-accessible skip link and navigation;
   - reduced-motion behavior that keeps the 3D scene but removes continuous motion;
   - a functional static 2D view containing the same available placeholder content and actions.
4. Create an original procedural studio prototype using simple Three.js geometry and lighting only. Establish the coastal-observatory mood and one recognizable Transformation Bench hotspot without downloading models, textures, fonts, or reference designs.
5. Add a restrained responsive visual system in CSS Modules or ordinary locally scoped CSS. It should feel premium and technical, remain readable over the canvas, and work at mobile widths.
6. Do not add unverified public claims. Mark the project role as `Confirmation pending`, media as `Capture pending`, and external asset provenance as pending where displayed.

## Scope limits

- Do not implement the full cinematic entrance, complete project drawer, Blueprint diagram, video player, or production 3D assets yet.
- Do not create a backend, CMS, analytics, contact form submission, authentication, or deployment workflow.
- Do not modify approved planning documents, Unreal files, Monolith settings, or raw inspection data.

## Validation

- Install succeeds and produces a lockfile.
- TypeScript check and production build succeed.
- No missing local asset requests appear in the built application.
- The page remains usable when WebGL initialization fails or the user selects 2D mode.
- Keyboard controls and reduced-motion behavior work without requiring pointer input.
- Record measured production bundle sizes in the report; compare them with the approved shell and lazy-3D targets without claiming success when a measurement is unavailable.

## Completion report

Replace `coordination/IMPLEMENTATION_REPORT.md` with a compact P003 report covering files created, dependency versions, implemented behavior, validation commands/results, measured bundle sizes, known limitations, and exact remaining work for the vertical slice. Mark `COMPLETE` or `PARTIAL`, then stop for Codex review.
