# P009 — Codex Portfolio Redesign

Status: COMPLETE
Owner: Codex
Date: 2026-10-11

## Result

Replaced the dark observatory/dashboard presentation with a warm architectural workshop and editorial introduction. Added a rotating eight-part sculpture, soft directional shadows, plants, timber fins, concrete surfaces, and subtle desktop camera parallax. Scene artwork is illustrative navigation, not a depiction of delivered game assets.

Created three immediate study entry points and rebuilt the 2D fallback as a responsive, filterable ten-study gallery. Retained existing evidence classifications and technical breakdowns. Corrected generic Technical Art drawer copy that previously implied inspected internals where only asset presence was verified.

## Interaction and loading

- Study buttons, gallery cards, and both 3D hotspots open the existing evidence-backed studies.
- Hotspots appear after camera return settles, avoiding moving click targets.
- Modal bodies scroll within viewport bounds; background scrolling is blocked while a study is open.
- Escape and focus restoration were checked for the nested breakdown and parent study.
- Menu, study, and technical drawer modules load on demand rather than mounting eagerly at startup.
- Removed the disabled audio placeholder and the large orientation overlay from the landing experience.

## Validation

- TypeScript check and production build passed using the installed local executables. The system npm launcher is broken, so direct Node entry points were used.
- Browser-tested the production build at 1440x900, 1024x768, and 390x844. Document width matched viewport width in each tested layout.
- Production pointer activation tested for both transformation and systems hotspots; keyboard activation tested for Systems.
- Gallery filtering tested: Technical Art returns two studies.
- Mobile study opening, nested breakdown opening, Escape dismissal, and focus restoration tested.
- Mobile idle hotspot bounds measured at 44x44 CSS pixels, within rounding tolerance.
- Reduced-motion branches retained and inspected in code; OS preference emulation was not performed.
- Dev hot-reload produced React/Drei root-unmount warnings during iterative edits. Production interactions were tested separately; no blanket console-clean claim is made.

## Bundle output

Vite gzip sizes, decimal kB: entry JS 4.69, React vendor 69.57, entry CSS 3.45. Immediate JS+CSS approximately 77.71 kB. HTML adds 0.78 kB. Three/R3F are outside the initial HTML preload set.

First 3D additions: Canvas JS 2.35, Canvas CSS 0.45, R3F vendor 58.42, Three vendor 181.20. First 3D total including HTML approximately 320.91 kB gzip, below 350 kB. These are compressed build-file totals, not a measured network trace. Optional study/data/diagram modules are excluded until opened.

The old 29-draw-call / 1,944-triangle scene measurement does not apply to this new geometry. Current renderer draw calls, triangles, and low-end-device frame rate have not been measured.

## Remaining publication work

Real gameplay videos, original model renders, asset screenshots, authorship/provenance confirmations, resume, and approved contact links still need integration. Existing placeholders and evidence-needed studies remain explicit. No fabricated recordings or project results were added.

## Preview

- `coordination/previews/studio-desktop.png`
- `coordination/previews/studio-mobile.png`
- Production preview: http://127.0.0.1:4173/
