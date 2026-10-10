# P011 — Interactive Browser Studies

Status: COMPLETE
Date: 2026-10-11
Owner: Codex

## Delivered

- Prop Disguise and Combat cards now offer “Try the interactive study.” Their existing inspected architecture and pending-media blocks remain available.
- Transformation supports crate, cone, barrel, reset, ground-reference captions, and an explanatory implementation disclosure.
- Combat supports hit, miss, health-zero, replay, pause/resume, stage inspection, and reset. A local reducer cancels stale shot callbacks. Example changes reset playback and retain the chosen scenario for direct inspection.
- Illustrated previews work with ordinary HTML controls. An optional “View in 3D” loads procedural meshes on demand. The additional canvas renders on demand at pixel ratio 1; context loss or rendering errors retain the illustrated controls.
- Reduced-motion/manual-pause preferences resolve combat playback immediately and remove the transformation scale transition. Opening the architecture drawer pauses an active shot.
- Every demo explicitly distinguishes browser simulation from Unreal runtime evidence. No invented networking, lag compensation, measured latency, author credits, or project footage.
- User has deferred footage and contribution details. The remaining-content document records this; no repeated request is needed until they are ready.

## Verification

- `node --experimental-strip-types scripts/test_studies.mjs` passed: hit/miss/elimination results; instant/animated final-state equivalence; stale callback rejection; pause/resume; inspection; reset; selected scenario consistency.
- TypeScript and Vite production build passed. No dependencies added.
- Production browser at 1440x900 and 390x844: transformation choices, keyboard selection and reset; combat pause/resume, manual stages, miss and timed elimination; optional 3D preview; no observed horizontal overflow.
- Manual motion pause in Gallery mode: health-zero playback resolved immediately with zero canvases mounted before opting into 3D.
- Shift+Tab from modal Close wraps to Back to portfolio. Escape closes and restores the original gallery card's focus after the restoration callback.
- A selected-example/direct-inspection mismatch was found during browser testing and fixed; regression coverage added.

## Loading and boundaries

The initial bundle remains approximately 78.29 decimal gzip kB for entry JS/CSS plus React, with 1.10 kB HTML. The first studio view remains approximately 324.56 kB including HTML. The optional interactive study adds approximately 4.00 kB JS and 1.15 kB CSS after opening; optional StudyCanvas adds 1.42 kB JS when its existing Three/R3F dependencies are already loaded. Gallery visitors opting into 3D must also load those vendor chunks.

These demonstrations are local educational presentations, not network tests or playable Unreal builds. Full project recordings, original model assets, contribution credits, real hardware benchmarking and OS reduced-motion emulation remain outstanding. The paused-preference branch was browser-tested; actual browser context loss was not forced.

Previews: `coordination/previews/p011-transformation-desktop.png` and `coordination/previews/p011-combat-mobile.png`.
