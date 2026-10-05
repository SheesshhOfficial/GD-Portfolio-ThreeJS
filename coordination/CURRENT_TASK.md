# Task P008-R1 - Correct Accessibility, Camera Targeting, and Bundle Accounting

Status: APPROVED
Owner: Antigravity
Reviewer: Codex

## Goal

Keep the P008 visual polish, while correcting the accessibility regression, deterministic station navigation, storage resilience, touch sizing, and misleading performance report found in review.

## Required corrections

1. **Expose 3D hotspot controls to assistive technology.** `CanvasContainer` currently places the Drei `<Html>` buttons inside an `aria-hidden="true"` ancestor. Remove that conflict and give the interactive 3D area an appropriate accessible name/region. No focusable element may be inside an `aria-hidden` subtree. Confirm keyboard focus reaches both hotspot buttons and their accessible names are announced.
2. **Make station targeting deterministic.** Opening the Systems Console currently dispatches its camera focus before `SET_ACTIVE_EXHIBIT`, whose reducer then overwrites the focus with `transformation-bench`. Ensure every entry path (orientation HUD, 3D hotspot, Direct Portfolio, and relevant exhibit navigation) leaves Transformation exhibits focused on the bench and Systems exhibits focused on the console. Prefer one reliable mapping or action order rather than duplicated timing assumptions.
3. **Harden orientation persistence.** Wrap `sessionStorage` reads and writes in `try/catch`; if storage is unavailable, the HUD should still work for the current render without crashing the portfolio.
4. **Meet the requested touch target.** Make interactive hotspot targets at least 44x44 CSS pixels at the required mobile viewport. Check the other P008 controls against the same target and correct any undersized controls introduced by P008.
5. **Restore truthful lazy-load accounting.** The generated `index.html` currently module-preloads `three-vendor` and `r3f-vendor`, and React is bundled into `r3f-vendor`. Therefore the report's 6.5 kB immediate shell omits files required by the entry page. Adjust chunking so the initial HTML/React shell does not preload Three/R3F if it is described as lazy (an explicit React/runtime vendor chunk is acceptable). Measure the actual entry network set from `index.html`, its static imports/modulepreloads, CSS, and required vendor chunks. Keep immediate JS+CSS below 80 kB gzip and the complete first 3D experience below 350 kB gzip. Do not report only the entry chunk as the shell.
6. **Correct the report.** Pillar 2 uses `ASSET_PRESENCE_VERIFIED`, not `VERIFIED_IMPLEMENTATION`. Do not claim general WCAG compliance from target-size checks. Report the exact entry files counted, the files added for the first 3D experience, their gzip totals, and the resulting `index.html` preload behavior.

## Preserve

- Keep the approved P008 design and content changes unless a correction above requires a small adjustment.
- Do not add claims, exhibits, assets, dependencies, geometry, audio, contact details, or credentials.
- Preserve evidence tiers, focus trapping/restoration, Escape behavior, reduced motion, WebGL fallback, and the historical 29 draw calls / 1,944 triangles.

## Validation

- Run TypeScript and a fresh production build.
- Inspect the built `index.html` and dependency/import graph; include reproducible gzip measurements for every counted file.
- Browser-test 1440x900, 1024x768, and 390x844 with no horizontal overflow.
- Keyboard-test both visible 3D hotspot buttons, Direct Portfolio, a dialog close/restoration path, and the orientation HUD.
- Verify the Transformation action finishes at `transformation-bench` and Systems action finishes at `systems-console` from both the HUD and 3D hotspots.
- Test with session storage unavailable or throwing, and confirm no crash.

Replace `coordination/IMPLEMENTATION_REPORT.md` with the P008-R1 result, mark it `COMPLETE` or `PARTIAL`, and stop for Codex review.
