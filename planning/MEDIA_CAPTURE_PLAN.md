# Media Capture Plan — Ashish Ranjan Portfolio

This document provides actionable recording instructions for capturing gameplay footage, technical art demonstrations, and 3D asset showcases for Ashish Ranjan's portfolio.

---

## 1. Capture Guidelines & Standards

1. **Resolution & Framerate**:
   * Minimum: 1920x1080 @ 60 FPS.
   * Preferred: 2560x1440 @ 60 FPS.
   * Code/Editor Viewports: 100% UI scaling to ensure clear text readability on mobile and high-DPI displays.
2. **Audio Standards**:
   * In-game SFX and spatial taunts enabled at clean balanced levels.
   * No background music during focused technical clips.
   * Project overview may feature subtle background track (`SC_BackgroundMusic.uasset`).
3. **Multiplayer Split-Screen Presentation**:
   * For networked exhibits (`PH-TRANSFORM`, `PH-COMBAT`, `PH-CUSTOMIZATION`), present **dual viewpoints** (Host on Left, Remote Client on Right) or use picture-in-picture to provide proof of replication.
4. **Honest Framing**:
   * Never speed up or alter footage.
   * Clearly annotate editor recordings vs live runtime builds.
   * Prominently display third-party environment and asset attributions in caption tracks.

---

## 2. Capture Specifications by Exhibit

### 2.1 PH-OVERVIEW — Sheeshh Prop Hunt Gameplay Reel
* **Associated Exhibit**: `EX-PH-OVERVIEW` (Featured Project Hub)
* **Priority**: `essential`
* **Purpose**: Provide a focused 45–60 second vertical slice showing the asymmetric gameplay loop from both player perspectives.
* **Exact Action to Record**:
  1. Hunter spawns into lobby, performs an emote, and enters match countdown.
  2. Prop player moves into a room, targets a construction pylon, and transforms.
  3. Prop player locks rotation, freezes against a wall, and deploys a decoy duplicate next to them.
  4. Prop player triggers a taunt audio cue.
  5. Hunter follows the positional audio clue into the room, inspects the props, and shoots the decoy (observing destruction).
  6. Hunter turns and shoots the real prop player; hit markers flash, prop health depletes, prop is eliminated, and victory screen triggers.
  7. Eliminated player enters flying spectator pawn mode.
* **Viewpoint(s)**: Perspective switching between Hunter and Prop with on-screen role labels.
* **Minimum Evidence**:
  * Visible HUD countdown and role indicators.
  * Real-time transformation and decoy deployment.
  * Audio taunt followed by hit-marker crosshair reaction.
  * Spectator possession transition.
* **Credit / Authorship**:
  * Code & Systems: `USER_CONFIRMED: pending` (project repository).
  * Environment: `PROVENANCE_PENDING` (folder `Downtown_West`).
  * Props: `PROVENANCE_PENDING` (folder `Construction_VOL1`).
* **Target Duration**: 45–60 seconds.

---

### 2.2 PH-TRANSFORM — Prop Disguise & Pivot Offset
* **Associated Exhibit**: `EX-PH-TRANSFORM`
* **Priority**: `essential`
* **Purpose**: Demonstrate mesh swapping, network replication, and pivot offset correction.
* **Exact Action to Record**:
  1. Prop player approaches three different environmental props (e.g., small traffic cone, medium trash bin, large barrier).
  2. Transform into each prop in sequence.
  3. Show split-screen view: Host on left, remote client on right, showing multicast mesh update.
  4. Demonstrate a prop that uses `MeshWithFAlsePivot`: show side-by-side comparison of default pivot alignment vs corrected ground alignment (`Set Relative Location`).
  5. Toggle `IA_RotationLock`: rotate camera 360 degrees while the prop mesh remains locked to floor orientation.
* **Viewpoint(s)**: Side-by-side split screen (Host POV vs Remote Client POV), plus close-up side camera of pivot alignment.
* **Minimum Evidence**:
  * Visible sphere trace targeting static mesh.
  * Replicated mesh update appearing on the secondary client.
  * Camera revolving around stationary prop without causing mesh jitter or unnatural pivoting.
  * HUD counter `PropChangesLeft` decrementing.
* **Credit / Authorship**:
  * Transformation logic: `USER_CONFIRMED: pending` (project repository Blueprint logic).
  * Meshes: `PROVENANCE_PENDING` (folder `Construction_VOL1`).
* **Target Duration**: 20–30 seconds.

---

### 2.3 PH-DECOY — Decoy Placement & Clutter Mechanics
* **Associated Exhibit**: `EX-PH-DECOY`
* **Priority**: `useful`
* **Purpose**: Demonstrate actor spawning, dynamic mesh assignment, and physics settling of decoy objects.
* **Exact Action to Record**:
  1. Prop player disguised as a prop presses decoy spawn key (`IA_SpawnProp`).
  2. Actor `BP_SPawnedProp` spawns in front of the player, inheriting the active static mesh and material.
  3. Decoy drops under gravity, settling onto floor geometry.
  4. Prop player deploys decoys until reaching `MaxSpawnProps = 5`, demonstrating limit enforcement.
  5. Hunter approaches and shoots the decoy; observe decoy destruction.
* **Viewpoint(s)**: Prop player third-person view showing deployment, followed by Hunter view interacting with decoy.
* **Minimum Evidence**:
  * Identical mesh assignment on spawned actor.
  * Physics collision response upon landing.
  * Spawn count limitation displayed on HUD.
  * Destruction event upon hit.
* **Credit / Authorship**:
  * Spawning & replication logic: `USER_CONFIRMED: pending` (project repository Blueprints).
* **Target Duration**: 15–20 seconds.

---

### 2.4 PH-COMBAT — Hunter Ballistics, Hit Registration & Spectating
* **Associated Exhibit**: `EX-PH-COMBAT`
* **Priority**: `essential`
* **Purpose**: Demonstrate networked rifle firing, client camera query, server line trace, crosshair feedback, health deduction, and spectator transition.
* **Exact Action to Record**:
  1. Hunter aims down sights or uses hip-fire crosshair against environmental objects (no hit marker).
  2. Hunter fires at a disguised prop player:
     * Muzzle flash and rifle animation fire (`MulticastFireEvnt`).
     * Impact particles spawn at hit point (`MulticasttHitEffict`).
     * Crosshair hit indicator animates (`PlayrossairHit`).
  3. Prop player viewpoint shows health bar decrementing from 100 to 0.
  4. On fatal hit: prop collision is disabled, mesh hidden, and client transitions into `BP_SpectatorPawn` flight mode.
* **Viewpoint(s)**: Synchronized side-by-side split-screen (Hunter firing on Left, Prop receiving damage and spectating on Right).
* **Minimum Evidence**:
  * Distinct crosshair hit reaction only when striking valid disguised player.
  * Synchronous health bar depletion.
  * Spectator pawn possession and free flight.
* **Credit / Authorship**:
  * Ballistics, health, damage, and spectator Blueprints: `USER_CONFIRMED: pending` (project repository Blueprints).
  * Rifle mesh & firing animations: `PROVENANCE_PENDING`.
* **Target Duration**: 20–25 seconds.

---

### 2.5 PH-AUDIO — Spatial Taunts & Proximity VOIP
* **Associated Exhibit**: `EX-PH-AUDIO`
* **Priority**: `useful`
* **Purpose**: Demonstrate networked 3D spatialized audio cues, cooldown enforcement, and C++ voice packet buffer handling.
* **Exact Action to Record**:
  1. Prop player triggers taunt (`IA_Taunt`). Audio cue plays at prop's world location.
  2. Show hunter moving relative to the prop: sound pans and attenuates according to distance and orientation.
  3. Prop attempts rapid repeated taunting: observe 1.0s cooldown barrier and HUD notification.
  4. Hunter switches voice communication mode; display replicated voice icon in HUD.
  5. Short text/visual overlay highlighting C++ `UVOIPLIB::ClearVoicePackets` source code and its invocation during round transition.
* **Viewpoint(s)**: Hunter POV moving in 3D space with clean stereo audio recording; picture-in-picture showing prop trigger.
* **Minimum Evidence**:
  * Audible 3D spatial falloff in recorded stereo channels.
  * Cooldown timer preventing audio spamming.
  * Voice indicator state replication on player list.
* **Credit / Authorship**:
  * C++ `UVOIPLIB`: `USER_CONFIRMED: pending` (project repository C++ file).
  * Taunt audio cues: `PROVENANCE_PENDING` (files in `Content/Core/sound`).
* **Target Duration**: 20–30 seconds.

---

### 2.6 PH-ROUNDFLOW — GameMode Lifecycle & Replicated HUD
* **Associated Exhibit**: `EX-PH-LIFECYCLE`
* **Priority**: `useful`
* **Purpose**: Demonstrate the multiplayer state machine, lobby countdown, alive player telemetry, kill feed, and round resolution.
* **Exact Action to Record**:
  1. Two players join server; lobby displays connected names via `BP_ThirdPersonPlayerController` and `PlayerState01`.
  2. Countdown reaches zero; server assigns roles (Hunter vs Prop) and moves players to spawn points.
  3. In-game HUD displays dynamic elements: round timer, alive props counter, and crosshair reticle.
  4. Elimination occurs: kill feed records the event (`WBP_KillFeedItem`), and prop counter decrements.
  5. Round concludes with victory overlay (`WBP_InGame` / Win Screen).
* **Viewpoint(s)**: Full-screen capture of client HUD with side-by-side inset of second client showing synchronized match state.
* **Minimum Evidence**:
  * Live round timer decrementing identically on both screens.
  * Synchronized kill feed message and alive player count update.
  * Round restart or map travel.
* **Credit / Authorship**:
  * GameMode and HUD Blueprints: `USER_CONFIRMED: pending` (project repository Blueprints).
* **Target Duration**: 30–40 seconds.

---

### 2.7 PH-CUSTOMIZATION — Networked Emotes & Leader-Pose Cosmetics
* **Associated Exhibit**: `EX-PH-CUSTOMIZATION`
* **Priority**: `optional`
* **Purpose**: Demonstrate replicated montage playback and modular skeletal mesh attachment using `Set Leader Pose Component`.
* **Exact Action to Record**:
  1. Hunter player triggers emote in lobby; second player sees animation montage play without desync.
  2. Hunter swaps armor pieces (Helmet, Body, Hands); observe modular meshes snapping to master skeleton via leader pose.
  3. Character runs and jumps; modular components deform with the primary skeletal armature.
* **Viewpoint(s)**: Third-person camera revolving around Hunter; second player viewing the customization.
* **Minimum Evidence**:
  * Emote playback across two client windows.
  * Attachment and bone deformation of modular mesh parts.
* **Credit / Authorship**:
  * Replication & Leader Pose setup: `USER_CONFIRMED: pending` (project repository Blueprints).
  * Mesh & animations: `PROVENANCE_PENDING` (folders `characters/1` and `ANIMATION`).
* **Target Duration**: 15–20 seconds.

---

### 2.8 TA-IKRETARGET — Unreal Engine 5 IK Rig & Retargeter Pipeline
* **Associated Exhibit**: `EX-TA-IKRETARGET`
* **Priority**: `essential`
* **Purpose**: Demonstrate UE5 IK Rig and Retargeter asset configuration, highlighting bone chains, retarget poses, and evaluating motion transfer across disparate skeletal armatures.
* **Exact Action to Record**:
  1. Open `stormtrooperikrig.uasset` and `RTG_NewRetargeter.uasset` in Unreal Editor 5.7.4.
  2. Show IK Rig hierarchy: highlight defined bone chains (Root, Spine, Limbs, Head, IK Goals).
  3. Show Retargeter editor with Source skeleton on Left and Target skeleton on Right.
  4. Scrub through diverse animations: Sprint, Jump, Crouch, Idle Blend.
  5. Inspect foot placement and joint bending alignment to evaluate absence of joint collapse or severe distortion.
* **Viewpoint(s)**: Unreal Editor viewport capture, focusing on the IK Rig and Retargeter tool panels.
* **Minimum Evidence**:
  * Defined IK bone chains and retarget roots visible in tool panel.
  * Synchronized preview of source and retargeted skeletal meshes in motion.
* **Credit / Authorship**:
  * IK Rig & Retargeter configuration: `USER_CONFIRMED: pending` (project setup assets).
  * Source meshes & base animation: `PROVENANCE_PENDING` (StormTrooper / Mixamo / UE template).
* **Target Duration**: 20–30 seconds.

---

### 2.9 TA-RAGDOLL — Physics Asset Tool (PhAT) & Joint Limits
* **Associated Exhibit**: `EX-TA-RAGDOLL`
* **Priority**: `useful`
* **Purpose**: Inspect existing PhysicsAsset bodies and test simulation response in PhAT.
* **Exact Action to Record**:
  1. Open `StormTrooper_PhysicsAsset.uasset` in PhAT.
  2. Select individual bones (Elbow, Knee, Spine, Pelvis) and display angular constraint limits (Twist, Swing1, Swing2 cones).
  3. Click "Simulate" inside PhAT; grab character limb with mouse physics handle and manipulate ragdoll to observe physical response.
  4. In-engine runtime clip showing character transitioning from death animation into physical ragdoll.
* **Viewpoint(s)**: PhAT Editor viewport with constraint cones visible, followed by game viewport clip.
* **Minimum Evidence**:
  * Visible physics bodies (spheres, capsules, boxes) on character limbs.
  * Joint limits preventing hyper-rotation.
  * Simulation response without physics explosion.
* **Credit / Authorship**:
  * PhAT setup & constraint configuration: `USER_CONFIRMED: pending` (project PhysicsAsset).
* **Target Duration**: 15–25 seconds.

---

### 2.10 3D-TURNTABLE-01 — Blender Hard-Surface Asset Showcase
* **Associated Exhibit**: `EX-3D-ASSET-01`
* **Priority**: `essential` (Pending Asset Selection by Ashish)
* **Purpose**: Demonstrate clean polygonal modeling, game-ready topology, non-destructive bevels, and uniform texel density on an authored asset.
* **Exact Action to Record**:
  1. 360-degree turntable rotation of an authored hard-surface model.
  2. Display three progressive visual modes:
     * Mode 1: Fully textured PBR material with lighting reflections.
     * Mode 2: Clay / Grey shaded model showcasing silhouette and bevel edge highlights.
     * Mode 3: Wireframe overlay showing edge flow, quad topology, and polygon density.
  3. Close-up zoom on key mechanical details, seams, and bevels.
* **Viewpoint(s)**: Orthographic or camera revolving 360 degrees in Blender viewport or UE5 viewport.
* **Minimum Evidence**:
  * Wireframe overlay demonstrating intentional edge loops and absence of non-manifold geometry.
  * Polygon/triangle counter displayed on screen.
* **Credit / Authorship**:
  * 3D asset modeled and unwrapped in Blender: `USER_CONFIRMED: pending` selection of original authored model.
* **Target Duration**: 25–35 seconds.

---

### 2.11 3D-UV-BREAKDOWN — UV Unwrapping & Texel Density Audit
* **Associated Exhibit**: `EX-3D-TEXTURING`
* **Priority**: `useful` (Pending Asset Selection by Ashish)
* **Purpose**: Demonstrate asset hygiene through UV island packing, hidden seam placement, and uniform texel density on an authored asset.
* **Exact Action to Record**:
  1. Screen capture of Blender UV Editor showing packed UV islands for the featured 3D asset.
  2. Display island packing layout and evaluate padding margins.
  3. Viewport display of UV checkerboard grid on 3D mesh to evaluate texel density across surfaces.
  4. Display of exported PBR texture maps (Albedo, Roughness, Metallic, Normal, AO).
* **Viewpoint(s)**: Split view of Blender 3D Viewport (with checkerboard texture) and UV Editor window.
* **Minimum Evidence**:
  * Unwrapped UV layout without overlapping islands or extreme distortion.
  * Square checkerboard pattern across asset surfaces.
* **Credit / Authorship**:
  * UV unwrapping and texture packing: `USER_CONFIRMED: pending` selection of original authored asset.
* **Target Duration**: 15–20 seconds (or high-resolution still image breakdown).

---

## 3. Capture Sequence & Execution Priority

| Step | Media ID | Type | Setup Required | Dependencies |
|---|---|---|---|---|
| **1** | `PH-TRANSFORM` | Split-Screen Video | 2 instances of SheeshhPropHuntYT (Listen Server + Client) | Verified BP logic |
| **2** | `PH-COMBAT` | Split-Screen Video | 2 instances; Hunter weapon test against Prop | Verified combat logic |
| **3** | `PH-OVERVIEW` | Edited Gameplay Reel | Compile highlights of Transform, Combat, Taunt, Decoy | Step 1 & 2 completed |
| **4** | `TA-IKRETARGET` | Editor Viewport Video | Open UE 5.7.4 editor -> `RTG_NewRetargeter` | Assets present in project |
| **5** | `TA-RAGDOLL` | PhAT Editor Video | Open UE 5.7.4 editor -> `StormTrooper_PhysicsAsset` | Asset present in project |
| **6** | `PH-AUDIO` | Focused Audio Clip | Hunter/Prop distance test in level | Audio assets present |
| **7** | `PH-DECOY` | Focused Clip | Prop character deploying decoys | Decoy BP verified |
| **8** | `PH-ROUNDFLOW` | Dual HUD Video | Round cycle from lobby to victory | GameMode verified |
| **9** | `3D-TURNTABLE-01` | Blender/UE Turntable | Confirm original `.blend` file with Ashish | Ashish asset selection |
| **10** | `3D-UV-BREAKDOWN` | Blender UV Capture | Open original `.blend` UV layout | Ashish asset selection |
