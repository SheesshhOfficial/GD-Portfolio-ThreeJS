# Portfolio Content Map — Ashish Ranjan

This document defines the content structure, exhibit specifications, technical breakdown hierarchy, and evidence requirements for Ashish Ranjan's game development portfolio.

---

## 1. Positioning and Target Audiences

### 1.1 Core Positioning Statement
> **Ashish Ranjan** is a **Gameplay Systems Programmer and Technical Artist** focusing on Unreal Engine 5 (C++ / Blueprints), network replication, and Blender-to-Unreal pipelines. He connects engine architecture (multiplayer RPCs, player input, online subsystems) with 3D technical art (skeletal rigging assets, modern UE5 IK Retargeters, topology optimization, and PBR texturing).

### 1.2 Target Audiences & Evaluation Criteria
1. **Technical Recruiters & Hiring Managers (Game Studios / Internships)**:
   * *Needs*: Fast scannability, clear proof of computer science foundations, transparent attribution of contributions, downloadable recruiter-facing resume, direct access to code repositories and video proof.
   * *Standard*: Reach representative gameplay clips and architecture breakdowns within one interaction.
2. **Lead Gameplay Programmers & Staff Engineers**:
   * *Needs*: Architecture evidence, clear network replication models, awareness of client-server tradeoffs, clean separation of concerns, and absence of unsubstantiated claims.
   * *Standard*: Accurate framing of RPC authority, hit registration, and memory management backed by inspected Blueprints and C++ source code.
3. **Freelance Clients & Indie Studio Directors**:
   * *Needs*: Assurance of generalist execution, prototyping capability from greyboxing to playable build, and ability to handle technical art workflows.
   * *Standard*: Clean visual presentation, video demonstrations, and transparent attribution of third-party assets.

### 1.3 Core Portfolio UX Principles
* **Evidence-Led Exhibits**: Every major claim is substantiated by a focused gameplay clip or editor capture.
* **Result First, Breakdown Optional**: Show the gameplay or visual result immediately; allow technical reviewers to expand architecture cards on demand.
* **Dual-Path Navigation**: A 3D studio environment (observatory workshop) provides spatial browsing, while a sticky, accessible **2D Direct Index** guarantees immediate, zero-friction access for mobile, keyboard-only, and time-constrained reviewers.
* **No Unsubstantiated Marketing Claims**: Unverified dossier claims are strictly excluded from public portfolio copy.

---

## 2. Top-Level Site Architecture & Navigation

The portfolio is structured into five cohesive content pillars accessible via 3D spatial zones and 2D direct menus:

```
[ Top-Level Navigation ]
├── 1. Featured Project: Sheeshh Prop Hunt (Multiplayer Game System)
│    ├── Overview Reel & Architecture Summary
│    └── 6 Linked Gameplay System Exhibits
├── 2. Technical Art & Rigging
│    ├── Modern UE5 IK Rig & Retargeting Pipeline
│    ├── Character Physics & Ragdoll Engineering (PhAT)
│    └── Modular Character Systems & Cosmetic Attachment
├── 3. 3D Digital Content Creation (Blender to UE5)
│    ├── Hard-Surface Topology & Polycount Budgeting
│    ├── UV Packing Efficiency & Texel Density Standards
│    └── PBR Material Setup & Texture Pipeline
├── 4. About & Academic Foundations
│    ├── Background (MIT Bengaluru, B.Tech CSE '27) [Supplied Data]
│    ├── Core Competencies & Certifications [Credential Evidence Pending]
│    └── Engineering Philosophy
└── 5. Credentials & Contact
     ├── Downloadable Recruiter-Facing Resume (PDF) [Pending Authoring]
     ├── Public Profiles (GitHub, LinkedIn) [Supplied Data]
     └── Contact Information [Supplied Data]
```

---

## 3. Featured Project: Sheeshh Prop Hunt (UE 5.7.4)

### 3.1 Project Card Overview
* **Title**: Sheeshh Prop Hunt
* **Genre**: Asymmetric Multiplayer Hide-and-Seek
* **Engine & Toolchain**: Unreal Engine 5.7.4, C++, Blueprints, Enhanced Input, Advanced Steam Sessions configuration, Blender
* **Role**: Gameplay Programmer & Technical Artist (`USER_CONFIRMED: pending`)
* **Scope / Status**: Playable multiplayer vertical slice with round loop, disguise system, hunter ballistics, positional audio, and dedicated/listen server replication.
* **Attribution & Credits**:
  * *Code & Blueprints*: Project repository logic (`USER_CONFIRMED: pending`).
  * *C++ Library*: `UVOIPLIB` voice-packet clearing helper (`USER_CONFIRMED: pending`).
  * *Environment Assets*: Folder `Downtown_West` in resources (`PROVENANCE_PENDING`).
  * *Prop Meshes*: Folders `Construction_VOL1` and `Downtown_West` in resources (`PROVENANCE_PENDING`).
  * *Character Bases*: External meshes (StormTrooper, Miximo Erika Archer) used for IK retargeting and cosmetic switching demonstration (`PROVENANCE_PENDING`).
  * *Audio*: External audio files in `Content/Core/sound` (`PROVENANCE_PENDING`).

### 3.2 Featured Project Layout
1. **Hero Header**: Title, platform badges, engine version (UE 5.7.4), and link to GitHub repository.
2. **Project Overview Video (`PH-OVERVIEW`)**: 45–60 second reel showcasing round start, prop disguise, hunter search, positional taunt, hunter engagement, elimination, and round conclusion.
3. **Executive Technical Summary**: Explains the asymmetric state machine, client-server replication structure, and Enhanced Input integration.
4. **Interactive Exhibit Hub**: Direct access cards to the 6 linked system exhibits.

---

## 4. Linked Gameplay System Exhibits

### Exhibit 1: Real-Time Prop Transformation & Disguise System
* **ID**: `EX-PH-TRANSFORM`
* **Result (Experience Layer)**: Prop player targets an environmental object (e.g. traffic cone or wooden crate), presses disguise key, and transforms into that mesh with matching rotation while retaining free-look camera movement.
* **Breakdown (Systems Layer)**:
  * *Implementation Structure*: `EnhancedInputAction IA_ChangeProp` fires a sphere trace (`SphereTraceSingle`) on `ECC_GameTraceChannel` to detect static mesh actors. Client calls Server RPC `ChangePropOnServer`. Server verifies actor validity, checks `PropChangesLeft` against `MaxPropChanges = 10`, and validates the mesh against `PropAllowedMesh`. Server broadcasts `UpdateMeshMulticast`, calling `SetStaticMesh` on the replicated `PropMesh` component. Inspects `MeshWithFAlsePivot` to offset the relative location of meshes with non-standard pivot origins via `K2_SetRelativeLocation`. `IA_RotationLock` decouples camera yaw (`bUseControllerRotationYaw = false`).
  * *Runtime Proof*: Multi-view runtime recording showing host and remote client perspectives simultaneously (`PH-TRANSFORM`).
  * *Authorship*: `USER_CONFIRMED: pending` (project repository Blueprint logic).
  * *Provenance / License*: `PROVENANCE_PENDING` for static meshes (folder `Construction_VOL1`).
* **Current Evidence Status**: `VERIFIED_IMPLEMENTATION` (Blueprint inspected); requires `RUNTIME_VERIFIED` split-screen capture.

---

### Exhibit 2: Decoy Prop Placement & Spatial Deception
* **ID**: `EX-PH-DECOY`
* **Result (Experience Layer)**: Prop player spawns a duplicate decoy of their active disguised mesh in the room, creating environmental clutter to deceive pursuing hunters.
* **Breakdown (Systems Layer)**:
  * *Implementation Structure*: Client issues `Spawnproponserver` RPC. Server queries active prop mesh, validates `SpawnPropsLeft` against `MaxSpawnProps = 5`, and spawns `BP_SPawnedProp`. Server calls `MulticastSetMesh` on spawned prop to match the player's disguise. `BP_SPawnedProp` activates physics simulation and collision profiles.
  * *Runtime Proof*: Controlled runtime recording demonstrating decoy deployment, count limit, and hunter interaction (`PH-DECOY`).
  * *Authorship*: `USER_CONFIRMED: pending` (project repository Blueprint logic).
  * *Provenance / License*: Decoy mesh inherited from active prop (`PROVENANCE_PENDING`).
* **Current Evidence Status**: `VERIFIED_IMPLEMENTATION` (Spawn logic verified); `UNVERIFIED` (Authority over decoy destruction requires runtime playtest).

---

### Exhibit 3: Hunter Weapon Ballistics, Damage & Spectator Transition
* **ID**: `EX-PH-COMBAT`
* **Result (Experience Layer)**: Hunter fires rifle at suspicious props. Hitting a disguised player triggers hit-marker audio-visual feedback, deals damage, and eliminates the prop. The eliminated player transitions into a spectator camera.
* **Breakdown (Systems Layer)**:
  * *Implementation Structure*: `StartFireOnServer` initiates a 0.1-second looping `FireTimer` triggering `FireRifle`. `StopFireOnServer` clears the handle. Server requests client viewpoint via `get clientCamera Action`; client returns camera transform via `LineTraceOnserver`. Server executes function `F_RifleLinerace` running `Line Trace By Channel` from camera origin. Server broadcasts `MulticastFireEvnt` (rifle animation) and `MulticasttHitEffict` (impact particles). Hits on `ActorHasTag("prop")` apply damage and notify hunter controller (`PlayrossairHit`). Prop character validates damage on server, decrements health, disables collision (`SetActorEnableCollision(false)`), hides mesh, and spawns/possesses `BP_SpectatorPawn`.
  * *Technical Boundary*: Combat traces rely on client-supplied camera vectors; server validation and runtime authority are not fully verified. No rollback or rewind buffers are present.
  * *Runtime Proof*: Split-screen video showing shooter crosshair feedback alongside victim health loss and spectator transition (`PH-COMBAT`).
  * *Authorship*: `USER_CONFIRMED: pending` (project repository Blueprints).
  * *Provenance / License*: Rifle mesh and animations: `PROVENANCE_PENDING`.
* **Current Evidence Status**: `VERIFIED_IMPLEMENTATION` (Graph verified); requires `RUNTIME_VERIFIED` dual-client video.

---

### Exhibit 4: Positional Taunts & Networked VOIP Architecture
* **ID**: `EX-PH-AUDIO`
* **Result (Experience Layer)**: Disguised props broadcast spatial audio taunts (robot voices, cat sounds) to bait hunters. Hunters utilize proximity voice chat to coordinate searches across the map.
* **Breakdown (Systems Layer)**:
  * *Implementation Structure*: `IA_Taunt` executes `TauntsOnServer` -> `TauntsMulticast` -> `Spawn Sound at Location` picking randomized audio cues from `TauntSoundz` array, enforced by a 1.0s cooldown delay and an automatic timer. C++ `UVOIPLIB::ClearVoicePackets()` interfaces with `IOnlineSubsystem` to clear voice packet buffers. Hunter pawn binds `UVOIPTalker` component, synchronizes replicated `VoiceMode` state, and registers voice lines.
  * *Technical Boundary*: `UVOIPLIB` contains only `ClearVoicePackets()`. Low-level buffer monitoring, automated spectate routing, and geometric audio occlusion were not found in the inspected scope.
  * *Runtime Proof*: Runtime recording demonstrating positional sound falloff and voice mode switching (`PH-AUDIO`).
  * *Authorship*: `USER_CONFIRMED: pending` (C++ source and Blueprints).
  * *Provenance / License*: Audio clips: `PROVENANCE_PENDING` (files in `Content/Core/sound`).
* **Current Evidence Status**: `VERIFIED_IMPLEMENTATION` (C++ code and Blueprint nodes verified); requires `RUNTIME_VERIFIED` audio capture.

---

### Exhibit 5: Asymmetric Round Lifecycle & Replicated Game State
* **ID**: `EX-PH-LIFECYCLE`
* **Result (Experience Layer)**: Lobby transitions players into match. Game mode assigns teams, displays countdown timers, updates real-time player list and kill feed on HUD, and triggers end-of-round victory screens.
* **Breakdown (Systems Layer)**:
  * *Implementation Structure*: `GM_ProphuntGameMode` tracks total player count, partitions players into Props and Seekers (`SeekerCount`), maintains alive prop counts, and manages countdown states. `BP_ThirdPersonPlayerController` receives server gameplay notifications and drives UMG interfaces (`UW_MainHUD`, `WBP_InGame`, `WBP_KillFeedItem`, `WBP_PlayerList`). `PlayerState01` replicates persistent identity and voice communication state across the network.
  * *Runtime Proof*: Round recording showing start-to-finish UI synchronization across two clients (`PH-ROUNDFLOW`).
  * *Authorship*: `USER_CONFIRMED: pending` (GameMode and UI Blueprints).
  * *Provenance / License*: UI textures and icons: `PROVENANCE_PENDING` (`Content/Core/Widgets/texture`).
* **Current Evidence Status**: `VERIFIED_IMPLEMENTATION` (Inspected); requires `RUNTIME_VERIFIED` round recording.

---

### Exhibit 6: Modular Customization & Networked Emotes
* **ID**: `EX-PH-CUSTOMIZATION`
* **Result (Experience Layer)**: Hunters perform synchronized dance emotes and switch cosmetic armor meshes in the lobby with visual updates on remote clients.
* **Breakdown (Systems Layer)**:
  * *Implementation Structure*: `Server_Emote` RPC triggers `Multicast_Emote`, playing montage animations across client proxies. `Server_costumeChange` RPC propagates `Multicast_CostumeChange`. Hunter construction script leverages `Set Leader Pose Component` to synchronize modular armor pieces (Body, Hands, Helmet) with the master skeletal armature.
  * *Runtime Proof*: Two-player recording showing cosmetic switch and emote synchronization (`PH-CUSTOMIZATION`).
  * *Authorship*: `USER_CONFIRMED: pending` (project repository Blueprints).
  * *Provenance / License*: Character armor meshes and emote animations: `PROVENANCE_PENDING` (folders `characters/1` and `ANIMATION`).
* **Current Evidence Status**: `VERIFIED_IMPLEMENTATION` (Inspected); requires `RUNTIME_VERIFIED` capture.

---

## 5. Technical Art & Rigging Categories

### Category A: Modern UE5 IK Rig & Animation Retargeting
* **Exhibit ID**: `EX-TA-IKRETARGET`
* **Concept**: Evaluating animation retargeting between disparate skeletal armatures using Unreal Engine 5's IK Rig and IK Retargeter systems.
* **Assets / Evidence**:
  * `RTG_NewRetargeter.uasset` (IK Retargeter asset in `Content/Core/characters/1/`)
  * `stormtrooperikrig.uasset` and `oldmilitiryrig.uasset` (IK Rigs)
  * Locomotion and rifle animation sets (`Content/Core/ANIMATION/OldChar/`)
* **Technical Boundary**: IK Rig and Retargeter assets prove setup assets exist in the project; they do not prove original rigging, quality, or zero-distortion output. Base armatures and animations are `PROVENANCE_PENDING`.
* **Presentation Layer**:
  * Viewport comparison: source animation vs retargeted mesh.
  * Technical breakdown of IK bone chains and base pose alignment.
* **Evidence Required**:
  * Viewport screen capture of UE5 IK Retargeter window with bone chains highlighted (`TA-IKRETARGET`).
  * Explicit crediting of source assets.
* **Current Evidence Status**: `VERIFIED_IMPLEMENTATION` (Assets verified in project); pending video capture.

---

### Category B: Character Physics & Ragdoll Engineering (PhAT)
* **Exhibit ID**: `EX-TA-RAGDOLL`
* **Concept**: Inspecting character physics assets and joint limit constraints in Unreal Engine's Physics Asset Tool (PhAT).
* **Assets / Evidence**:
  * `StormTrooper_PhysicsAsset.uasset` in `Content/Core/characters/1/`.
* **Technical Boundary**: A PhysicsAsset proves only that an asset file exists; it does not prove custom bodies, joint constraint tuning, stable simulation, or animation-to-ragdoll blending. Setup authorship is `USER_CONFIRMED: pending`.
* **Presentation Layer**:
  * Demonstration of physics bodies and angular constraint limits.
  * Simulation test within PhAT.
* **Evidence Required**:
  * Editor PhAT tool inspection video showing constraint angle limits and physics simulation response (`TA-RAGDOLL`).
* **Current Evidence Status**: `VERIFIED_IMPLEMENTATION` (Asset exists); pending PhAT editor capture.

---

## 6. 3D Digital Content Creation (Blender to UE5)

### Category C: Hard-Surface Modeling & Asset Pipeline
* **Exhibit ID**: `EX-3D-ASSET-01`
* **Concept**: Asset production demonstrating clean topology, non-destructive bevels, and standardized export units.
* **Target Presentation**:
  * 3D model turntable video turnaround.
  * Toggleable display modes: Rendered, Shaded, and Wireframe Topology.
* **Standards & Proof Points**:
  * Clean edge loops, absence of non-manifold geometry.
  * Standardized export units (Centimeters, 0.01 scale, Z-Up / -Y Forward conversion).
* **Evidence Required**:
  * Selection of an original `.blend` source model confirmed by Ashish Ranjan (`USER_CONFIRMED: pending`).
  * Turntable video recording with wireframe overlay (`3D-TURNTABLE-01`).
* **Current Evidence Status**: `USER_CONFIRMED: pending` (Asset selection required).

---

### Category D: UV Optimization & PBR Texturing
* **Exhibit ID**: `EX-3D-TEXTURING`
* **Concept**: UV unwrapping layout, seam placement, and uniform texel density on an authored game asset.
* **Target Presentation**:
  * UV sheet inspection card displaying island packing layout and padding margins.
  * Viewport display of UV checkerboard grid proving uniform texel density.
* **Evidence Required**:
  * Original texture map exports and UV unwrapping screenshot (`3D-UV-BREAKDOWN`).
* **Current Evidence Status**: `USER_CONFIRMED: pending` (Asset selection required).

---

## 7. Academic Profile, Credentials & Contact

### 7.1 Academic & Technical Profile (Supplied Data Pending Publication Approval)
* **University**: Manipal Institute of Technology (MIT), Bengaluru (Supplied Data)
* **Degree**: Bachelor of Technology in Computer Science & Engineering (B.Tech CSE), Class of 2027 (Supplied Data)
* **Core Competencies**:
  * *Languages*: C++ (Modern C++17/20), Blueprints, Python, C, Java, SQL
  * *Engines & Tools*: Unreal Engine 5 (UE5.0 - UE5.7), Blender, Git/GitHub, Perforce concepts, Visual Studio 2022
  * *Architecture*: Multiplayer Replication, Enhanced Input, UMG, IK Rigs, PhAT
* **Certifications**:
  * Object-Oriented Programming (University of Pennsylvania) — `USER_CONFIRMED: pending credential evidence`
  * Data Structures & Algorithmic Problem Solving (Meta) — `USER_CONFIRMED: pending credential evidence`

### 7.2 Supplied Public Links & Channels (Pending Publication Approval)
* **Email**: `ashis.mitblr2023@learner.manipal.edu` (Supplied Data)
* **Phone**: `+91 7518105669` (Supplied Data)
* **GitHub**: [`github.com/SheesshhOfficial`](https://github.com/SheesshhOfficial) (Supplied Data)
* **LinkedIn**: [`linkedin.com/in/sheesshh`](https://www.linkedin.com/in/sheesshh) (Supplied Data)
* **Resume**: Downloadable PDF link (`DOC-RESUME-PDF`) — Status is `missing` pending creation of a concise recruiter-facing resume.
* **ArtStation / itch.io**: Sourced as `FUTURE` / pending links until active galleries are populated.

---

## 8. Summary Evidence Matrix for All Exhibits

| Exhibit Code | System / Feature | Presentation Mode | Required Evidence | Provenance Classification | Public Readiness |
|---|---|---|---|---|---|
| `EX-PH-OVERVIEW` | Sheeshh Prop Hunt Overview | 45-60s Gameplay Video | Runtime multiplayer recording | Code: `USER_CONFIRMED: pending`; Art/Audio: `PROVENANCE_PENDING` | Pending Capture |
| `EX-PH-TRANSFORM` | Prop Transformation & Pivots | 20-30s Dual-view Video + Node Graph | Blueprint + Runtime split-screen | Code: `USER_CONFIRMED: pending`; Meshes: `PROVENANCE_PENDING` | Implementation Verified |
| `EX-PH-DECOY` | Decoy Prop Placement | 15-20s Video + Breakdown | Blueprint + Runtime recording | Code: `USER_CONFIRMED: pending` | Implementation Verified |
| `EX-PH-COMBAT` | Hunter Ballistics & Spectating | 20-25s Dual-view Video + Graph | Blueprint + Runtime split-screen | Code: `USER_CONFIRMED: pending`; Rifle: `PROVENANCE_PENDING` | Implementation Verified |
| `EX-PH-AUDIO` | Positional Taunts & VOIP | 20-30s Video with Audio | C++ Source + Blueprint + Runtime | C++: `USER_CONFIRMED: pending`; Audio: `PROVENANCE_PENDING` | Implementation Verified |
| `EX-PH-LIFECYCLE` | Asymmetric Round Flow | 30-40s HUD/GameMode Video | Blueprint + GameMode inspection | Code: `USER_CONFIRMED: pending` | Implementation Verified |
| `EX-PH-CUSTOMIZATION` | Networked Emotes & Armor | 15-20s Dual-client Video | Blueprint + Animation inspection | Code: `USER_CONFIRMED: pending`; Mesh: `PROVENANCE_PENDING` | Implementation Verified |
| `EX-TA-IKRETARGET` | Modern UE5 IK Retargeting | 20-30s Editor Comparison Video | UE5 Asset inspection + Viewport | Setup: `USER_CONFIRMED: pending`; Assets: `PROVENANCE_PENDING` | Implementation Verified |
| `EX-TA-RAGDOLL` | PhAT Joint Physics Setup | 15-25s PhAT Simulation Video | UE5 Asset inspection + PhAT test | Setup: `USER_CONFIRMED: pending`; Mesh: `PROVENANCE_PENDING` | Implementation Verified |
| `EX-3D-ASSET-01` | Blender Hard-Surface Asset | 30s Turntable with Wireframe | `.blend` source + Wireframe proof | `USER_CONFIRMED: pending` | Pending Selection |
| `EX-3D-TEXTURING` | UV Layout & PBR Texture Maps | High-res UV / Texture Sheet | Source Texture Maps + UV Sheet | `USER_CONFIRMED: pending` | Pending Selection |
