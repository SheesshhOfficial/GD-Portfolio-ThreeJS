# P010 — Scene Polish, Hiring Profile, and Runtime Quality

Status: COMPLETE
Date: 2026-10-11
Owner: Codex

## Requested documentation

`planning/INTERACTIVE_SHOWCASE_IDEAS.md` specifies the playable transformation demo, interactive combat/network-flow demo, and media-led case studies. It covers visitor journeys, implementation states, scope, accessibility, performance, evidence boundaries, and acceptance checks. These three concepts are documented, not implemented in this milestone.

## Implemented

- Shared rounded box geometry for architectural surfaces and sculpture pieces; procedural stone grain; clear-coated sculpture; a glass side panel; a locally generated room-light reflection environment. No remote HDR or texture downloads.
- Sculpture pointer interaction opens the relevant Prop Hunt study. HTML hotspot controls remain available for keyboard and touch.
- About panel with supplied education, professional focus, approved email, GitHub and LinkedIn links.
- A one-page downloadable profile PDF, summarized from the supplied dossier and checked against the project evidence ledger. The original five-page dossier is not copied into the public site.
- Auto, High, and Economy quality modes. Economy disables renderer shadows and the reflection environment and uses device pixel ratio 1. Auto begins in Economy on coarse-pointer devices and can lower quality after two slow measurement windows below 35 rendered frames per second, following warmup.
- Ambient motion pause, safe saved preferences, on-demand rendering while paused/reduced-motion, and suspended rendering when the document is hidden.
- Live renderer measurements in an optional settings disclosure, without any external telemetry.
- Explicit WebGL context-loss handling that switches to the gallery; existing startup WebGL fallback remains.
- Direct `?view=gallery` route avoids mounting the 3D renderer. Added a no-JavaScript contact/profile fallback and a local SVG favicon.
- Human-readable media-pending labels and removal of stale profile-pending copy from the project index.

## Validation performed

- TypeScript, production build, and Git whitespace checks passed.
- Production desktop and mobile About/settings controls tested at 1440x900 and 390x844; no horizontal document overflow in observed layouts.
- About focus trapping verified with Shift+Tab from Close to the final action; Escape returns focus to its trigger.
- Economy and paused-motion controls tested and persisted through reload. Final preview restored to Auto quality with ambient motion enabled.
- Renderer frame counter stopped advancing between separate checks after motion settled in paused mode (2,889 frames in both checks). Camera transitions and hotspot activation continued working when paused.
- Direct gallery route confirmed ten study cards and no `studio-renderer` element.
- Systems hotspot keyboard activation and Escape dismissal tested in the production build.
- Profile link served HTTP 200 with `application/pdf`; browser download completed. PDF rendered with Poppler and visually inspected: one page, legible, no clipping or overlaps.
- An earlier desktop measurement during this milestone observed approximately 103 frames/sec, 69 draw calls, and 15,634 triangles. After the glass/frame refinement, the observed High frame contained 74 draw calls and 17,134 triangles; Economy showed 73 calls and 16,834 triangles. These are this browser's observations, not cross-device guarantees.

## Bundle budget

Decimal gzip kB, as reported by Vite: entry JS 5.21 + React 69.57 + entry CSS 3.51 = approximately 78.29 kB immediate JS/CSS. HTML adds 1.10 kB.

First 3D adds Canvas JS 3.61, Canvas CSS 0.45, R3F 58.42, Three 182.68. Total including HTML is approximately 324.55 kB, below the 350 kB ceiling. Only React is preloaded by the initial HTML. About/settings, profile PDF, gallery data, studies, and technical diagrams are optional later loads.

## Remaining limits and placeholders

- A physical low-end phone has not been benchmarked. Automatic slow-device downgrading is implemented but its threshold was not forced under a throttled GPU test.
- OS reduced-motion emulation and genuine browser WebGL-disabled/context-loss tests were not performed; relevant code branches were inspected. The manual pause and direct gallery paths were tested.
- Source-asset media, gameplay recordings, original contributions, and third-party credits remain pending. The dossier's unverified technical claims were not promoted into verified project facts.
- A profile PDF is available; it should become a stronger conventional recruiter resume once individual contribution and project-result details are supplied.
