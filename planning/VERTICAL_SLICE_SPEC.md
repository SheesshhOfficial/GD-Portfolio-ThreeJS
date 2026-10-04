# Vertical Slice Specification — First Buildable Prototype

This document specifies the scope, user experience flows, multi-modal states, media placeholders, and measurable acceptance criteria for the first buildable vertical slice of Ashish Ranjan's portfolio.

---

## 1. Goal and Scope Boundaries

### 1.1 Objective
Deliver a single, complete, end-to-end user experience that validates the dual-layer architecture (3D coastal observatory studio + 2D DOM presentation), navigation responsiveness, accessibility standards, and evidence-first technical breakdown before expanding to remaining exhibits.

### 1.2 In Scope for First Vertical Slice
* **Cinematic Entrance**: A short (2–3 second) camera pan from the observatory entrance into the game development workshop, establishing lighting and atmosphere (skippable via click, keypress, or reduced-motion setting).
* **Dual-Path Navigation**:
  * Spatial 3D exploration: Orbiting/clicking the **Transformation Bench**.
  * Instant 2D direct menu: Sticky top-bar control providing immediate access to the project card without 3D interaction.
* **Featured Project Hub (`EX-PH-OVERVIEW`)**:
  * Project overview card for *Sheeshh Prop Hunt* (UE 5.7.4).
  * High-level premise, technical role (`USER_CONFIRMED: pending`), engine tags, and overview video placeholder (`PH-OVERVIEW`).
* **Deep Technical Breakdown (`EX-PH-TRANSFORM`)**:
  * Deep-dive architectural drawer inspecting the Prop Transformation & Disguise System.
  * Verified Blueprint flow (sphere trace, Server RPC `ChangePropOnServer`, multicast mesh swap, static pivot offset adjustment `MeshWithFAlsePivot`).
  * Honest framing of unverified claims (dynamic capsule resizing and sweep placement are clearly labeled as not found in the inspected graphs; runtime proof pending).
* **Comprehensive Multi-Modal Support**:
  * Responsive Desktop, Mobile Touch, Keyboard-Only, Reduced-Motion, Loading, and WebGL Failure fallback states.
* **Structured Media Placeholders**:
  * Interactive, styled placeholders for `PH-OVERVIEW` and `PH-TRANSFORM` providing technical storyboard details, verified Blueprint references, and pending capture prerequisites.

### 1.3 Out of Scope / Deferred
* Additional Prop Hunt exhibits (Decoy Spawning, Hunter Ballistics, VOIP Architecture, GameMode Round Flow, Networked Emotes).
* Technical Art exhibits (UE5 IK Retargeter, PhAT Physics Asset).
* 3D Art showcases (Blender Hard-Surface Turntable, UV Breakdown).
* Live WebGL playable game demos (real gameplay video remains the primary evidence).
* Audio synthesizers or background music loops (audio remains strictly opt-in).

---

## 2. User Experience & Step-by-Step Flow

```
[ Preloader Phase ]
       │  (Progressive shell < 1.0s)
       ▼
[ State 1: Cinematic Entrance ] ──(Click / Keypress / Skip)──┐
       │                                                      │
       ▼ (2.5s smooth pan)                                    │
[ State 2: Studio Center Overview ] ◄─────────────────────────┘
       │
       ├───► [ State 2B: Direct 2D Navigation Menu ]
       │            │  (Selects Prop Hunt)
       │            ▼
       └───► [ State 3: Prop Hunt Station Focused ]
                    │
                    ▼ (Click "Inspect Architecture")
             [ State 4: Transformation Breakdown Drawer ]
                    │
                    ▼ (Click Close / Press Escape)
             [ State 5: Return to Studio Center ]
```

### Step 1: Preloader & Initialization (0–1.2s)
* Visitor arrives on the site.
* An unobtrusive preloader displays a minimal animated logo, loading progress bar, and a prominent escape button: *"Skip 3D and Open Direct Portfolio"*.
* WebGL 2.0 capabilities and `prefers-reduced-motion` are evaluated immediately.

### Step 2: Cinematic Entrance Pan (1.2–3.5s)
* Camera initializes at the threshold of the coastal observatory (`position: [-6, 3, 8]`, `target: [0, 1.5, 0]`).
* Smoothly glides forward into the main workshop area (`position: [0, 2.2, 5.5]`, `target: [0, 1.2, 0]`).
* Cool exterior coastal daylight filters through observation windows; warm interior spotlights illuminate the central workbench.
* *Bypass Rule*: Any click, touch, keypress, or reduced-motion flag immediately snaps the camera to the final position, bypassing the pan.

### Step 3: Studio Center & Spatial Navigation
* The central workshop area settles into view.
* The **Prop Hunt Transformation Bench** is prominently featured in the right-center foreground:
  * A 3D workshop desk model displaying prototype props (traffic cones, wooden crates, mechanical calipers).
  * A subtle floating interactive reticle pulses above the bench with the label: *"Featured Project: Sheeshh Prop Hunt"*.
* Top navigation bar remains permanently fixed:
  * Left: `Ashish Ranjan — Game Dev & Tech Art`
  * Right: `[Direct 2D Navigation]` | `[Sound: Off]` | `[3D Studio / 2D Gallery]`

### Step 4: Activating the Prop Hunt Project Card
* Visitor clicks the Transformation Bench in 3D OR selects *Sheeshh Prop Hunt* from the Direct 2D menu.
* Camera smoothly interpolates to an exhibit framing view (`position: [1.2, 1.6, 2.8]`, `target: [1.5, 1.1, 0]`).
* The **Prop Hunt Project Card** slides in from the bottom/side:
  * Title: *Sheeshh Prop Hunt* (Unreal Engine 5.7.4)
  * Subtitle: *Asymmetric Multiplayer Hide-and-Seek System*
  * Engineering Role: *Gameplay Programmer & Technical Artist (`USER_CONFIRMED: pending`)*
  * Badges: `UE 5.7.4` | `C++` | `Blueprints` | `Enhanced Input` | `Advanced Sessions`
  * Video Viewport: Displays the interactive placeholder for `PH-OVERVIEW` (45–60s gameplay reel).
  * Technical Summary: High-level overview of networked disguise mechanics and round loop.
  * Primary Action Button: `[ Inspect Transformation Architecture ]`
  * Close Button: `[ Close Exhibit (Esc) ]`

### Step 5: Transformation Deep-Dive Breakdown Drawer
* Visitor clicks `[ Inspect Transformation Architecture ]`.
* The card expands into a full-height slide-out **Technical Breakdown Drawer** over the right half of the screen (or full screen on mobile):
  * **Header**: *Real-Time Prop Disguise & Pivot Offset Architecture (`EX-PH-TRANSFORM`)*
  * **Verified Implementation Tab**:
    1. *Input & Targeting*: `EnhancedInputAction IA_ChangeProp` -> `SphereTraceSingle` on interaction channel.
    2. *Server RPC & Validation*: Client invokes `ChangePropOnServer`. Server checks `PropChangesLeft` against `MaxPropChanges = 10` and validates mesh against `PropAllowedMesh`.
    3. *Multicast Replication*: Server broadcasts `UpdateMeshMulticast` -> calls `SetStaticMesh` on replicated `PropMesh` component.
    4. *Pivot Offset Correction*: Server inspects `MeshWithFAlsePivot` array and adjusts relative transform via `K2_SetRelativeLocation`.
    5. *Camera Decoupling*: `IA_RotationLock` decouples camera yaw (`bUseControllerRotationYaw = false`).
  * **Blueprint Visual Flow**: Interactive node diagram illustrating the execution flow.
  * **Technical Boundary & Unverified Claims Disclosure**:
    * Explicit disclosure box: *"Dynamic capsule recalculation ($CapsuleRadius = \frac{1}{2}\max(E_x, E_y)$) and collision sweep placement claimed in early design notes were not found in the inspected Blueprint graphs; runtime capsule resizing is unverified."*
  * **Video Proof Viewport**: Displays interactive placeholder for `PH-TRANSFORM` (split-screen host/client demonstration).
  * **Provenance & Credits**:
    * Code Authorship: `USER_CONFIRMED: pending` (project repository `BP_propChar`).
    * Prop Meshes: `PROVENANCE_PENDING` (folder `Construction_VOL1`).

### Step 6: Dismissal and Return
* Pressing `Escape` or clicking `[ Close ]` dismisses the breakdown drawer and project card.
* Camera smoothly glides back to the studio center overview.
* Keyboard focus returns to the Transformation Bench trigger button.

---

## 3. Multi-Modal State Specifications

### 3.1 Desktop 3D View (Standard State)
* Full-resolution WebGL canvas with restrained anti-aliasing.
* Mouse orbit controls enabled with strict polar and azimuth clamps (user cannot clip through floor or spin behind walls).
* Interactive hover states: cursor changes to pointer, 3D reticle expands slightly on mouse over.
* Breakdown drawer occupies right 50% of viewport, allowing the 3D bench to remain visible on the left.

### 3.2 Mobile Touch View (Responsive State)
* Clamped pixel ratio (`dpr={1.0}`) to maintain smooth execution on mobile GPUs.
* Touch drag orbits camera within constrained limits; tap directly selects exhibit.
* Modals open as mobile-native **Bottom Sheets**:
  * Project card occupies bottom 45% of screen.
  * Deep-dive breakdown expands to a full-screen drawer with sticky close bar and touch scroll.
* Text sizes, hit targets (>44x44px), and code blocks optimized for portrait viewing.

### 3.3 Keyboard Navigation State (WCAG 2.2 AA Target)
* Bypasses mouse interaction entirely:
  * `Tab` key steps sequentially: `[Skip to Content]` -> `[Direct 2D Navigation]` -> `[Audio Toggle]` -> `[Prop Hunt Transformation Bench]`.
  * Active 3D station displays a high-contrast focus ring (golden yellow, 3px solid, 4:1 contrast ratio against studio backdrop).
  * `Enter` or `Space` activates the focused station.
  * Focus is automatically trapped inside the open project card or breakdown drawer.
  * `Escape` immediately closes open drawers and restores focus to the trigger element.

### 3.4 Reduced-Motion State (`prefers-reduced-motion: reduce`)
* Evaluated via media query at startup and toggleable via top-bar settings.
* When active:
  * Reduced-motion mode preserves the 3D studio environment and exhibit viewpoints while eliminating camera fly-throughs.
  * Camera position transitions snap directly to target angles without interpolation.
  * Reticle floating and bobbing animations are disabled.
  * Static 2D mode remains available as a separate user choice via the top-bar mode toggle.

### 3.5 Loading State
* Non-blocking progressive preloader rendered directly from `index.html`.
* Displays current asset loading percentage (0–100%).
* The fallback escape button renders within the initial HTML shell.

### 3.6 WebGL Failure / Low-Power Fallback State
* If WebGL 2.0 initialization fails, the context is lost, or the user clicks *"Switch to 2D Gallery"*:
  * The 3D `<Canvas>` is unmounted completely, freeing GPU memory.
  * The page renders a responsive 2D editorial portfolio layout.
  * Displays a static hero render of the coastal observatory studio.
  * Directly embeds the Prop Hunt Project Card and Transformation Breakdown, delivering the same essential portfolio content and actions.
  * Technical evidence and breakdown documentation remain fully accessible.

---

## 4. Media & Asset Placeholders Specification

Since live video captures (`PH-OVERVIEW`, `PH-TRANSFORM`) are currently pending, the vertical slice utilizes interactive, styled placeholder cards rather than empty containers.

### 4.1 `PH-OVERVIEW` Placeholder Specification
* **Target Aspect Ratio**: 16:9
* **Container Styling**: Dark slate card (`#12161f`) with subtle blueprint grid pattern and cool cyan border accent.
* **Header Tag**: `[ VIDEO EVIDENCE: PENDING LIVE CAPTURE — PH-OVERVIEW ]`
* **Visual Representation**:
  * Technical storyboard illustration depicting the two-player asymmetric setup: Hunter weapon sweep on left, disguised Prop disguised as a construction cone on right.
* **Metadata Overlay**:
  * Target Duration: 45–60 seconds
  * Target Resolution: 1440p @ 60 FPS
  * Required Evidence: `RUNTIME_VERIFIED` 2-player multiplayer session
  * Capture Prerequisite: Host + remote client entry, disguise, taunt, elimination, and spectator transition
* **Verified Engineering Callout**:
  * *"Implementation verified in `BP_propChar`, `BP_ThirdPersonCharacter`, and `GM_ProphuntGameMode`. Graph structure, RPC routing, and UI plumbing inspected in Unreal Engine 5.7.4."*

### 4.2 `PH-TRANSFORM` Placeholder Specification
* **Target Aspect Ratio**: 16:9
* **Container Styling**: Dark slate card with split vertical divider representing dual-client capture.
* **Header Tag**: `[ MULTI-VIEW RECORDING: PENDING CAPTURE — PH-TRANSFORM ]`
* **Visual Representation**:
  * Diagram of split-screen setup:
    * Left Box: *Host (Prop POV)* — Sphere trace targeting pylon, rotation lock engaged.
    * Right Box: *Remote Client (Hunter POV)* — Replicated pylon disguise with corrected ground pivot.
* **Metadata Overlay**:
  * Target Duration: 20–30 seconds
  * Required Evidence: `RUNTIME_VERIFIED` dual-client split-screen
  * Capture Prerequisite: Demonstrate morph into 3 distinct props, show pivot correction for `MeshWithFAlsePivot`, show 360° rotation lock.
* **Verified Blueprint Nodes Callout**:
  * `IA_ChangeProp` -> `ChangePropOnServer` -> `SphereTraceSingle` -> `UpdateMeshMulticast` -> `SetStaticMesh` -> `MeshWithFAlsePivot` offset lookup.

---

## 5. Originality & Evidence Guidelines

To maintain complete professional integrity and align with project rules:
1. **Original Visual Identity**: The coastal observatory workshop concept, typography, layout, and color palette are custom-tailored to Ashish Ranjan's engineering focus. No existing portfolio layout or template is copied.
2. **Honest Engineering Boundaries**:
   * All code contributions are marked `USER_CONFIRMED: pending` until confirmed by Ashish.
   * All external environment, prop, and audio assets are marked `PROVENANCE_PENDING`.
   * Unverified claims from the master dossier (dynamic capsule resizing, lag rollback algorithms) are explicitly disclosed as not found in the inspected graphs.
3. **No Phantom Metrics**: No claims of 120 FPS, sub-millisecond network latency, or zero-distortion output appear anywhere in public text.

---

## 6. Measurable Acceptance Criteria

The vertical slice must meet all of the following criteria before being considered complete:

### 6.1 Performance Budgets
* [ ] **2D Shell JS/CSS (Immediate)**: < 50 KB gzipped.
* [ ] **Lazy 3D JS Bundle**: < 300 KB gzipped.
* [ ] **Total Initial JS/CSS Bundle**: < 350 KB gzipped.
* [ ] **Initial 3D Assets (Environment)**: < 3.5 MB total transfer.
* [ ] **Vertical Slice Scene Geometry**: **< 40,000 triangles** for workshop room and transformation bench (Future Full-Portfolio Ceiling: < 60,000 triangles).
* [ ] **Vertical Slice Draw Calls**: **< 25 draw calls per frame** in the main studio view (Future Full-Portfolio Ceiling: < 30 draw calls).
* [ ] **Video Assets**: < 6 MB per focused clip; < 15 MB for overview reel.
* [ ] **Desktop Framerate Target**: Target **60 FPS** on mid-tier desktop hardware (e.g. GTX 1650 / Apple M-series), measured via Chrome DevTools Performance panel / stats.js.
* [ ] **Mobile Framerate Target**: Target **30–60 FPS** on modern mobile hardware (e.g. iPhone 13+ / Pixel 6+).
* [ ] **Lab Loading Target (FCP / TTI)**: Target **FCP < 1.2s** and **TTI < 2.0s** under Lighthouse simulated 4G mobile throttling (1.6 Mbps down, 150ms RTT).

### 6.2 UX & Interaction Fidelity
* [ ] Cinematic entrance pan completes in < 3.0s and can be instantly skipped with a click, keypress, or reduced-motion setting.
* [ ] Clicking the Transformation Bench moves camera smoothly to exhibit framing and opens the Prop Hunt Project Card.
* [ ] Clicking `[ Inspect Transformation Architecture ]` expands the full-detail breakdown drawer with syntax-highlighted code/node steps.
* [ ] The sticky `[ Direct 2D Navigation ]` button opens the project card from any camera angle without requiring 3D movement.
* [ ] Pressing `Escape` closes active drawers and returns camera to the studio center overview.

### 6.3 Accessibility & Multi-Modal Compliance
* [ ] Full keyboard navigability targeting **WCAG 2.2 AA**: all interactive stations and modal controls are reachable via `Tab` with visible focus indicators.
* [ ] Focus is trapped within open drawers and modals; closing a modal returns focus to its trigger.
* [ ] `prefers-reduced-motion` preserves 3D scene while suppressing all camera interpolation and floating animations.
* [ ] WebGL failure detection automatically mounts the 2D editorial fallback delivering the same essential portfolio content and actions.
* [ ] Screen reader semantic hierarchy: proper `<h1>` through `<h3>` structure and descriptive ARIA labels on all icon buttons.

### 6.4 Content & Evidence Accuracy
* [ ] Zero occurrences of unverified claims ("dynamic capsule resizing," "zero joint distortion," "lag rollback").
* [ ] All media placeholders (`PH-OVERVIEW`, `PH-TRANSFORM`) clearly display required evidence levels, capture prerequisites, and Blueprint node references.
* [ ] Attribution statuses (`USER_CONFIRMED: pending`, `PROVENANCE_PENDING`) are consistently applied to all systems and assets.
