# Interactive Showcase Concepts

Owner: Ashish Ranjan · Portfolio Try 2
Status: Design specifications; concepts 1–3 are not implemented.

## 1. Playable transformation study

### Visitor experience

The studio centerpiece becomes a small playable demonstration. Three objects sit on a bench: a crate, traffic cone, and barrel. The visitor chooses an object; the centerpiece transforms into it. A short caption explains what changed. A persistent “See the real Unreal implementation” button opens the Prop Disguise study.

### Interaction sequence

1. Begin with a neutral placeholder pawn on the bench and an instruction: “Choose your disguise.”
2. Pointer hover, keyboard focus, or tap highlights a candidate. Enter/Space selects it.
3. A brief dissolve or scale transition replaces the display model. Ground alignment is shown with a subtle reference line.
4. Optional “Under the hood” reveals input, target selection, server-side checks, multicast mesh update, and the inspected fixed pivot-offset approach.
5. “Reset” returns to the pawn. Switching props never requires reloading the scene.

### Build approach

Use local procedural meshes first. Store candidate IDs, mesh references, and demonstration offsets in a small typed object catalog. Use a reducer for idle, selected, transforming, and transformed states. The animation is a presentation layer; it must not implement imaginary authoritative networking.

The demo is labeled “Browser simulation — simplified for this portfolio.” It is separate from Unreal runtime evidence. The existing project inspection supports fixed offsets for selected props; do not present dynamic capsule resizing or collision-safe sweeps as existing project features.

### Accessibility and performance

Provide ordinary HTML selection buttons, an `aria-live="polite"` result message, reset control, and a still-state version in Gallery mode. Reduced motion swaps immediately. Keep the demo lazy-loaded after interaction; reuse geometries and materials. No pointer lock, sound, login, or download is needed.

### Acceptance

All three candidates work with mouse, keyboard, and touch. Reset restores the initial state. Rapid selections cannot leave an inconsistent model. Ground offsets are visible and explained accurately. The real-project link remains available. A 390px viewport has no clipped controls.

## 2. Interactive combat and network-flow study

### Visitor experience

A miniature target range explains how an input becomes a gameplay result. The visitor presses “Fire a simulated shot.” A trace line appears and a five-stage flow lights up: input → camera data → server trace → damage → feedback/spectator transition. The visitor can pause and inspect each stage.

### Build approach

Use a deterministic local timeline with a shot sequence ID, stage index, target health, and play/pause state. Every new shot cancels the previous presentation timeline. Model positions and trace endpoints come from one small scene configuration. Render the trace with a reusable line, and use HTML buttons for stage selection and playback.

Offer “Hit” and “Miss” examples plus a health-zero transition. They are educational simulations, not multiplayer tests. Timing is illustrative; never label it measured latency. The inspected project passes client camera vectors to server traces. Explicitly explain that full server-side hit validation, anti-cheat, lag compensation, and rewind are unverified.

### Technical reviewer path

Each stage exposes a short explanation and its relevant inspected Blueprint names. An optional disclosure explains client-supplied data and what a stronger authority model would require. Link to the actual Combat study instead of reproducing all its diagrams.

### Accessibility and performance

Every step is understandable without the 3D animation. A textual event log describes the same sequence. Reduced motion advances highlights without animated projectiles. No weapon audio or flashing impacts by default. Load the range only when opened.

### Acceptance

Hit, miss, pause, resume, reset, and elimination examples are deterministic. A second shot cannot corrupt the first shot state. Keyboard users can inspect every stage. Simulated timings and unverified project features are clearly distinguished.

## 3. Real project case studies

### Information hierarchy

Each case study follows: result → problem → contribution → approach → evidence → tradeoffs. A recruiter should understand the project in 30 seconds; technical detail should remain one deliberate action away.

1. **Result:** poster image and user-controlled gameplay video, engine, project status, and one sentence describing the mechanic.
2. **Problem:** a concrete design or engineering obstacle, with an example that a non-programmer can understand.
3. **Contribution:** confirmed personal work, collaborators, tutorial-derived work, and third-party assets. Do not fill this from inference.
4. **Approach:** three to five illustrated steps using actual Blueprint captures or code excerpts.
5. **Evidence:** short clips, captions, original file references, and the distinction between inspected implementation and observed runtime behavior.
6. **Tradeoffs:** the limitation, why it matters, and what would be tested or improved next. No invented performance or commercial metrics.

### Prop Hunt first case study

Lead with a 30–60 second overview. Follow with 15–30 second clips for transformation, decoys, combat, round lifecycle, audio, and customization. Use two-client views where synchronization is the claim. Each clip should show a clear beginning, action, and observable result.

### Media pipeline

Keep originals outside the public output. Prepare web copies with a poster image, descriptive captions, and transcript when narration is used. Videos use `preload="none"`, `playsInline`, controls, and no forced autoplay. Load media when the visitor requests it. Show an honest pending state until recordings exist.

Use a typed media manifest containing exhibit ID, URL, poster URL, caption, source, provenance status, and what the recording establishes. Do not change evidence tiers automatically merely because a file was uploaded.

### Acceptance

Every published claim has a supporting reference. Real footage is distinguishable from portfolio artwork. All videos can be operated by keyboard. Captions convey the important result without audio. Failure to load one clip leaves the case study usable. Authorship is confirmed before credits are published.

## Suggested sequence

Finish scene polish and hiring presentation, then implement concept 1 as the first interactive vertical slice. Add actual Prop Hunt recordings before developing concept 2. Use the resulting media and interaction lessons to finish concept 3. Measure loading and device performance after each slice.
