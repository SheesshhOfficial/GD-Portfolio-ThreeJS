# P012 — Tour, Scene Detail, Services, and Launch Preparation

Status: COMPLETE (implementation and local verification)
Date: 2026-10-11
Owner: Codex

## Delivered

- A manual, three-chapter guided tour: Explore gameplay, Explore technical art, View all work. Chapters focus the camera, explain each discipline, open the relevant study or filter the gallery. Next/Previous and Escape/Exit are supported. No automatic progression; existing OS reduced-motion camera behavior remains immediate.
- New technical-art camera target. Studio landing and scene hotspots yield while the tour is active. Gallery users can start the tour as well.
- More restrained key/fill/hemisphere lighting; tighter 2048 shadow coverage with soft filtering in High mode; procedural contact-shadow planes to ground desks, plants, sculpture and stage; locally generated wood grain and a warmer timber palette. Existing rounded geometry, stone bump detail and reflection environment remain. Economy skips real-time shadows/environment while retaining lightweight contact grounding. This is a stylized architectural scene, not scanned photorealistic project artwork.
- Services panel describing three enquiry areas, possible scopes/handovers, inspected-study links, and a prefilled email brief. No invented rates, availability, completed client work or delivery guarantees. Close remains visible while scrolling.
- Ten direct `/projects/<slug>/` routes. Clicking a project updates the URL; browser Back/Forward and refresh restore the study. Shared bare project links start in the lightweight gallery presentation. A copy button has a manual-address fallback when clipboard access fails.
- Background navigation/canvas/gallery is inert while a project dialog is open, supplementing the existing focus trap.
- Build-generated physical HTML documents for all ten routes. Each has its own title, description, Open Graph/Twitter metadata, structured WebPage data and readable no-JavaScript project introduction. Asset URLs remain rooted correctly.
- An original SVG sharing graphic and exact 1200×630 PNG export. No external asset downloads.
- `.env.example` documents public-origin and indexing configuration. No fabricated domain. Local/staging metadata is `noindex,follow`. With an HTTPS origin supplied, canonical/image URLs become absolute. Explicit indexing generates the eleven-URL sitemap and its robots reference. Build rejects origins with unsupported paths/credentials/query/fragments.
- `Humanwork.md` consolidates all prior missing-input requests: contribution/source verification, every video shot plan, technical-art captures, Blender assets, profile/services preferences, credits, phone testing, domain/configuration and launch steps.
- A private Git-ignored portfolio inbox and a blank study-note template. No user-supplied dossier or unrelated source folders were intentionally staged.

## Validation

- TypeScript, Vite production build, meaningful study-state tests and route tests passed.
- Launch checker passed for all ten documents, per-project share titles, root asset paths, PNG format/dimensions and robots. It also passed a separate configured-origin/indexed test build under `tmp/launch-test`, including canonical path and all eleven sitemap entries. The example origin exists only in this ignored test output; ordinary `dist` retains no origin and disabled indexing.
- Production browser at 1440×900: tour chapter selection, Next, all-work action, project link copying, direct refresh, Back/Forward and scene visual inspection.
- At 390×844 and 320×740: no observed horizontal overflow; compact header, tour controls and Services were usable. Technical-art tour action filtered the gallery to exactly two studies.
- Direct `/projects/prop-disguise/` opened the expected card, with zero mounted canvases and inert gallery background. Title was `Prop Disguise & Pivot — Ashish Ranjan`.
- Services focus trapping reached the email action on Shift+Tab from Close; prefilled mailto contained the brief fields. Sticky Close stayed visible after scrolling. No email sent.
- At 1024×650, landing intro bottom was approximately 466px and selected-work top approximately 477px: no overlap in the observed compact layout.
- Economy mode reported Economy rendering; preferences restored to Auto. No captured browser error logs in the final check.

## Bundle budget

Vite decimal gzip kB: entry JS 6.21 + React 69.57 + entry CSS 3.58 = 79.36 kB immediate JS/CSS, within the 80 kB budget. HTML 1.44, Canvas JS 4.04, Canvas CSS 0.45, R3F 58.42 and Three 182.69 bring the first studio view to approximately 326.40 kB including HTML, within 350 kB. Tour and Services remain optional later chunks.

## Remaining human/external work

A real physical phone was not available to Codex; responsive emulation does not complete that hardware test. Actual OS reduced-motion/browser context-loss testing, public-domain configuration, hosting/deployment, external social-preview caching/search discovery, real footage, personal contribution credits and final service preferences remain pending. These are detailed in `Humanwork.md`. The site has not been publicly deployed or submitted to search services.

Previews: `p012-studio-desktop.png`, `p012-tour-desktop.png`, `p012-tour-mobile.png`, `p012-services-mobile.png` in `coordination/previews`.
