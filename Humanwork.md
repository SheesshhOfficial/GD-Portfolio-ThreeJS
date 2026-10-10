# Human work remaining — Ashish Ranjan’s portfolio

Updated: 11 October 2026
Project folder: `U:\resume\Portfolio Manager\try 2`

This is your complete input and testing checklist. You already said you will create recordings later: nothing here needs to interrupt the current build. Keep placeholders until an item is ready. You do not need to gather everything at once.

## 1. Start here: the smallest useful submission

Prepare these first, in this order:

1. A short note saying which Prop Hunt systems you personally wrote, adapted, or worked on with someone else.
2. One 45–60 second gameplay overview and one 20–30 second transformation recording.
3. One original Blender asset you want to feature, with its source reference and a clean render.
4. Confirm the professional role/services you want to prioritise.
5. Test the portfolio on your actual phone and record the results using section 8.

After these are ready, tell Codex: “Read my portfolio inbox, integrate the new material, preserve evidence boundaries, and review the portfolio.” No Antigravity quota or API/MCP bridge is required. Do not send the same request to two implementers at once.

## 2. Where to put everything

Use the private staging folder `U:\resume\Portfolio Manager\try 2\source\portfolio-inbox`.

Create the following subfolders as needed. No need to move large Unreal projects into this folder: put their existing absolute paths in your notes.

| Folder under the inbox | What belongs there |
| --- | --- |
| `01-profile` | Updated resume, profile corrections, preferred role, service/availability answers |
| `02-prop-hunt/PH-OVERVIEW` | Overview video, poster image, notes |
| `02-prop-hunt/PH-TRANSFORM` | Transformation capture and notes |
| `02-prop-hunt/PH-DECOY` | Decoy capture and notes |
| `02-prop-hunt/PH-COMBAT` | Combat/elimination capture and notes |
| `02-prop-hunt/PH-AUDIO` | Taunt/VOIP capture and notes |
| `02-prop-hunt/PH-ROUNDFLOW` | Round lifecycle capture and notes |
| `02-prop-hunt/PH-CUSTOMIZATION` | Cosmetics/emote capture and notes |
| `03-technical-art/TA-IKRETARGET` | Rig/retargeting editor captures, source references, notes |
| `03-technical-art/TA-RAGDOLL` | Physics Asset/PhAT captures, source references, notes |
| `04-blender-assets/<your-asset-name>` | Render, turntable, wireframes, UVs, texture samples, source-file reference |
| `05-credits` | Asset origins, tutorial links, licenses, collaborator credit notes |
| `06-launch` | Domain/hosting choice, actual-phone test notes, final launch decisions |

Within each study folder use `gameplay.mp4` or `editor.mp4`, `poster.jpg`/`poster.png`, and `notes.md`. For more than one clip use descriptive names, such as `host-view.mp4` and `remote-view.mp4`.

These files are not automatically published. Codex must inspect them, prepare web copies, wire them into the study, and verify playback. The inbox is ignored by Git except its instruction/template files. Original source files stay private. Approved public copies eventually go under `public/portfolio-media/`; do not put private notes, raw projects, credentials or the complete dossier there.

## 3. Confirm your individual contribution

For each of the ten studies, create `notes.md` using `source/portfolio-inbox/STUDY_TEMPLATE.md`. Plain language is enough.

Answer:

- What did you personally build? Name the mechanic, Blueprint, function, model or workflow.
- Which parts did you independently create from scratch?
- Which parts came from a tutorial? Provide the tutorial link and explain your changes.
- Which parts came from marketplace assets, sample projects, libraries or collaborators?
- If collaborative, who did what, and what public credit is appropriate?
- What concrete problem did you encounter? Describe one reproducible example.
- How did you solve it? Explain the decision and one alternative/tradeoff.
- What does the supplied clip actually show? State what it does not establish.
- Is the project a prototype, work in progress, finished personal project, or released game? Give a public release link only if one exists.
- Record the actual engine/tool version used for that capture, the capture date, and source-file paths.

The current inspection refers to Unreal 5.7.4. You also have 5.8: tell us if a capture uses a different version. Keep changing your MCP path yourself as you requested; no automated engine switching is needed. Save your work before opening or migrating projects. Migration is not required to create portfolio evidence.

“Verified implementation” currently means inspected project logic; it does not mean your authorship, multiplayer reliability or performance has been proved. Videos alone do not establish original authorship. Do not add “120 FPS,” zero distortion, lag compensation, dynamic capsule resizing, anti-cheat or shipped-client claims unless you supply relevant evidence. An honest limitation is useful portfolio content.

## 4. Record the Prop Hunt systems

Use your existing screen recorder. Aim for a readable 1920×1080 capture at 30 or 60 fps. These are presentation targets, not claims about the game’s performance. Keep original captures; do not upscale a low-resolution recording and call it native 1080p.

Before recording:

1. Save the Unreal project and load a stable test map.
2. Hide unrelated desktop windows, private messages, account information and debugging overlays that reveal private paths or credentials.
3. Write a three-line shot plan: starting state, action, observable result.
4. When synchronization is the claim, show two actual connected viewpoints and label Host/Remote or Client A/Client B accurately. Separate preview windows are not automatically a dedicated-server test.
5. Test the sequence once, then record one clean take. If it fails, keep the failure notes; do not imply the mechanic worked.
6. Supply a still from the actual footage as the poster. The browser’s procedural artwork is not a gameplay screenshot.

| Media ID / target length | What to show | What to explain in notes |
| --- | --- | --- |
| `PH-OVERVIEW` / 45–60 sec | Role setup, a prop disguise, hunter search, one successful elimination and the observable round outcome | Overall project status; your role; which parts are shown versus not shown |
| `PH-TRANSFORM` / 20–30 sec | Select and transform into three available props; show ground alignment; include another client’s view when claiming replication | Actual fixed pivot-offset behavior; any alignment/collision limits; rotation lock/free-look only if tested |
| `PH-DECOY` / 15–20 sec | Spawn decoys, show physics settling, attempt the configured spawn limit, and show hunter interaction | Which side actually owns destruction; record uncertainty if host and remote behavior differ |
| `PH-COMBAT` / 20–25 sec | Shooter input, observable hit feedback, target health change and health-zero spectator transition | Network setup; what hit/miss behavior was tested; camera data/authority limits; no invented rewind |
| `PH-AUDIO` / 20–30 sec | Audible taunt from useful distances/directions, cooldown behavior, and voice-mode changes if functional | Audio route, test setup, what can actually be heard, and which audio assets are third-party; get permission for any other person’s recorded voice |
| `PH-ROUNDFLOW` / 30–40 sec | Preparation/countdown, active round, elimination/kill feed where available, and end-of-round UI from connected views | Actual sequence and observed synchronization; what has not been stress-tested |
| `PH-CUSTOMIZATION` / 15–20 sec | Select a cosmetic, observe its appearance on a remote view, then run an emote with visible body/armor motion | Mesh and animation origins; what you changed; any deformation/montage issues |

Use user-controlled videos with no required audio to understand the main result. If you narrate, provide a transcript or timed WebVTT captions. A short text caption should still explain the starting state, action, and result.

For web-ready copies, H.264 MP4 with AAC audio is a useful delivery choice. Keep original recordings separate. Avoid a huge multi-minute file when a 20-second clip explains the system. Codex can help prepare a web copy after you supply the original; compression should be judged visually, not by an invented universal file-size limit.

## 5. Capture technical art evidence

### IK Rig and retargeting — `TA-IKRETARGET`

Provide a 20–30 second editor capture. Show the actual source/target rigs, the chain mapping, pose alignment, and the same motion on both characters. Include useful closeups where the motion could fail, such as feet or shoulders. Add two readable stills of the actual setup.

In notes, identify the source animation, both character origins, the retargeter asset path, your changes, tool version, and visible limitations. Existing asset presence does not establish that you created the rigs or achieved high-quality transfer.

### Physics Asset / ragdoll — `TA-RAGDOLL`

Provide a 15–25 second editor simulation capture. Show bodies/constraints, a readable joint limit configuration, and the actual response to simulation. Include one still with the body setup visible and one constraint-detail still.

State whether you created or modified the setup, its character/asset origin, what you tested, and problems such as instability or clipping. Do not label a single successful take as a complete physics stress test.

## 6. Select original Blender assets

Start with one asset you are proud of; one strong asset is enough for the first case study. A prop, weapon, environment piece or character accessory can work.

For each selected asset provide:

1. Its name and `.blend` source path; a small copy is optional, a path reference is enough initially.
2. A clean beauty render plus two useful views. Identify the render engine/tool version.
3. A roughly 30-second turntable without excessive camera movement.
4. A shaded wireframe image that makes topology readable.
5. A screenshot of your relevant modifier stack or modeling process if it explains a decision.
6. A UV layout image and checkerboard test, if you want to claim UV work.
7. Texture-map samples with their actual resolution and channel meaning. If maps are packed, describe the packing that was actually used.
8. An Unreal import/material screenshot if you want to claim a completed Blender-to-Unreal pipeline.
9. Measured mesh statistics only if useful; say whether the number is triangles, vertices or polygons.
10. Authorship and third-party references, textures, base meshes, tutorials or collaborators.

Explain one modeling/UV/material problem and your solution. Record scale, export settings and any known defects rather than assuming they are correct. Source inspection is needed before claims such as non-manifold-free topology or optimal UV packing can be confirmed.

## 7. Confirm the profile and client-facing offer

Put answers in `01-profile/profile-notes.md`.

Already included from your approved dossier: name, the supplied Manipal education details, professional email, GitHub and LinkedIn. Review them once before launch; do not resend unchanged values unnecessarily.

Answer the remaining questions:

- Which role should lead the portfolio: gameplay programmer, Unreal Blueprint developer, technical artist, 3D artist, or another specific role?
- Which of the three enquiry areas do you want to accept: Unreal prototypes, Blueprint system work, technical art/asset integration? Remove anything you do not want to offer.
- What engine versions, target platforms and project sizes are you comfortable supporting?
- Are you available now? If so, what weekly capacity/time zone should be public? Do not invent an availability claim.
- Would you like a public budget/rate indication, or discuss budget privately? No price is currently published.
- Is your student email the right professional inbox, or should we replace it with another address you approve?
- Do you have an up-to-date conventional recruiter resume? Add it as `resume.pdf` with notes about what may be public.
- What project outcomes can be substantiated: release, game jam entry, team size, public repository, demonstrated mechanic? Provide links or evidence where available.

The downloadable profile is currently a one-page summary, not your entire dossier. The Services section describes possible enquiry scopes, not completed paid work, fixed delivery promises or confirmed availability. Personalize it after answering these questions.

## 8. Test on an actual phone

Desktop responsive testing is already part of Codex’s checks. It is not a substitute for your physical device. This task remains yours because Codex cannot access or hold your phone.

### Option A — test after a public preview exists

Open the HTTPS preview on your phone. Test in your normal browser, then another browser if available. Use both Wi-Fi and mobile data if practical. Do not publish the site solely to complete this test before deciding what content should be public.

### Option B — test locally on your private Wi-Fi

1. Connect your computer and phone to the same private Wi-Fi.
2. In a terminal inside `U:\resume\Portfolio Manager\try 2`, build the site:

   ```powershell
   node node_modules/typescript/bin/tsc --noEmit
   node node_modules/vite/bin/vite.js build
   ```

3. If you choose to make the preview reachable by your phone, run a separate preview on port 4174:

   ```powershell
   node node_modules/vite/bin/vite.js preview --host 0.0.0.0 --port 4174
   ```

   This makes the preview reachable by other devices on that network. Keep the ordinary local preview on port 4173 as it is. No router port forwarding is needed.

4. Use `ipconfig` to find your computer’s Wi-Fi IPv4 address. On the phone open `http://<that-address>:4174/`. Replace the brackets; `127.0.0.1` on the phone points to the phone itself.
5. If the network blocks access, use a chosen hosted preview instead; do not turn off security protections.
6. Stop the temporary preview with Ctrl+C when finished. Local HTTP clipboard access may be unavailable; the project-link copy fallback should show the address for manual copying.

### Phone acceptance checklist

- Home page appears with readable text and no horizontal scrolling.
- Tour opens; Gameplay, Technical art and All work chapters can be tapped; Next/Previous and Exit work.
- Camera changes feel comfortable. Try Settings → Pause ambient motion. With system Reduce Motion enabled, transitions should become immediate.
- Services opens, all three scopes are readable, and the email button opens a draft with the project-brief fields. No message is sent automatically.
- Gallery filters respond and the ten studies are accessible.
- Prop study: all three disguises, Reset and optional 3D preview work.
- Combat study: hit, miss, health-zero, pause/resume, stage inspection and reset work.
- Opening a direct `/projects/prop-disguise/` or `/projects/hunter-combat/` link, then refreshing, opens the correct study. Browser Back/Forward should restore the correct view.
- Profile PDF can open/download; GitHub and LinkedIn links lead to your profiles.
- Portrait and landscape layouts remain usable. Test with the browser address bar visible and collapsed.
- Auto and Economy quality remain responsive. After two minutes, note heat, stutter or crashes rather than guessing an FPS number.
- Rotate the phone, switch apps, return, then close/reopen a study. It should remain usable.
- With browser 3D support unavailable, the gallery and illustrated studies should still be usable. Only attempt this if your browser exposes a normal supported setting; do not change system security.

Create `06-launch/phone-test.md` with:

```text
Phone model:
OS and version:
Browser and version:
Date:
URL tested / build milestone:
Network: Wi-Fi / mobile data / local Wi-Fi preview
Quality: Auto / High / Economy
Motion: normal / paused / OS reduced motion
Orientation:
Passes:
Failures: exact taps, expected result, actual result
Screenshot or short screen recording filename:
Heat/stutter/crash observations:
```

Report a failure using exact steps, for example: “Open Combat, tap Health zero, tap Fire, rotate to landscape: Reset disappears.” This is much more useful than “mobile is broken.”

## 9. Credits, permissions and factual review

Create `05-credits/credits.md` listing each asset pack, mesh, animation, texture, sound, tutorial, library and collaborator that appears in public media. Include source links and applicable public-credit requirements. In particular, existing notes mention Downtown_West, Construction_VOL1 and Core assets whose provenance still needs confirmation.

Review whether recordings may show third-party material and whether collaborator names/voices may be public. Do not upload payment receipts, private license documents, passwords or account credentials into the public portfolio. A source link and your explanation are enough for the first review.

For each project approve the final title, status, contribution wording, credits and visible media. Evidence updates should say exactly what a capture establishes; they should not automatically turn all claims into verified facts.

## 10. Choose the public address and launch

Put your choice in `06-launch/launch-notes.md`: the desired public HTTPS address, hosting destination you control, whether the site should be indexed, and which content you approve for publication. Do not supply passwords in this document.

The site is a static Vite build. Deploy the contents of `dist` at a website origin’s root, not inside an unconfigured `/portfolio` subfolder. The build creates ten physical `projects/<slug>/index.html` files, so your host must serve nested directories normally and preserve those files.

After choosing your public address:

1. Copy `.env.example` to `.env.local` in `try 2`.
2. Set `SITE_URL` to your real HTTPS origin, without a path, query, credentials or fragment. The example file is intentionally blank so we do not invent a domain.
3. Keep `SITE_INDEXING=false` for staging. Set it to `true` only when you want public search indexing. Without a configured origin, indexing remains disabled even if this flag is true.
4. Build and check:

   ```powershell
   node node_modules/typescript/bin/tsc --noEmit
   node node_modules/vite/bin/vite.js build
   node --experimental-strip-types scripts/check_launch.mjs
   ```

5. Review `dist/launch-status.json`. With a configured origin, generated metadata has absolute image/project URLs and canonical links. With indexing enabled, the build emits `sitemap.xml` and references it from `robots.txt`.
6. Deploy only after reviewing the public content. The current work prepares files; it does not register a domain, purchase hosting or publish your site.
7. Open the home page and each direct project link on the deployed address, refresh them, and check the public profile PDF and social image.
8. Check a link preview using your chosen platform’s preview tool or a draft you control. You need not send messages to other people just to test a preview. Home and project cards have distinct titles/descriptions and share the designed 1200×630 image.
9. Complete the physical-phone checklist on the deployed build. Supply the report so Codex can fix device-specific issues.
10. Once public, optionally submit the generated sitemap to a search console you control. Search ranking and social-preview caches are external and cannot be guaranteed by build checks.

Current direct project addresses use your local preview origin; replace that origin with the public address after launch:

- `/projects/prop-disguise/`
- `/projects/decoy-placement/`
- `/projects/hunter-combat/`
- `/projects/spatial-audio/`
- `/projects/round-lifecycle/`
- `/projects/modular-characters/`
- `/projects/ik-retargeting/`
- `/projects/physics-ragdoll/`
- `/projects/hard-surface-modeling/`
- `/projects/uv-pbr-texturing/`

## 11. What is intentionally still pending

Real footage, confirmed contributions, an original asset selection, credits, final service preferences/availability, the public origin, actual-phone results and publication approval remain pending. All prior requests for these details are consolidated above; they do not need to be answered repeatedly in chat.

The guided tour, scene polish, enquiry section, browser demos, local project links and launch metadata can be reviewed now. They are portfolio presentation, not substitutes for the evidence you will supply later.
