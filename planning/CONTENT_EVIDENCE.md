# Content Evidence Ledger

This ledger records the verified engineering state, runtime observations, and evidence classifications across Ashish Ranjan's portfolio projects, focusing on **Sheeshh Prop Hunt** (Unreal Engine 5.7.4) and associated technical art pipelines.

Claims are classified according to strict project evidence rules before any portfolio copy or public statement is approved.

---

## 1. Classification Definitions

| Classification | Definition | Application Standard |
|---|---|---|
| `VERIFIED_IMPLEMENTATION` | Inspected directly in source code (`.cpp`, `.h`), Blueprint graph nodes, data assets, or config files. | Proves the code, asset, or graph structure exists in the project. Does not prove runtime stability, authority, or bug-free multiplayer behavior. |
| `RUNTIME_VERIFIED` | Observed, tested, and validated during controlled live execution, multiplayer session, or recorded capture. | Proves functional mechanics, replication, authority, and UI delivery at runtime. |
| `USER_CONFIRMED` | Explicitly confirmed in writing by Ashish Ranjan regarding personal contribution, original authorship, or third-party sourcing. | Required for all code authorship, 3D models, rigs, textures, audio assets, and project roles before public crediting. If unconfirmed, status is `USER_CONFIRMED: pending`. |
| `PROVENANCE_PENDING` | Third-party asset or source inferred from folder/file naming or external reference without a verified license, manifest, or confirmation. | Must not be labeled as "purchased," "royalty-free," or "open-source" until documented. |
| `UNVERIFIED` | Claimed in resume, dossier, or design notes, but unsupported, unobserved, or contradicted by current inspection. | **Must not be published** as factual implementation in public portfolio copy. |
| `FUTURE` | Planned architectural upgrade or roadmap item not yet implemented. | Clearly labeled as planned or conceptual work if discussed. |

---

## 2. Prop Hunt Multiplayer System — Detailed Audit

Source: Unreal Engine 5.7.4 project `G:\Unreal Projects\SheeshhPropHuntYT`.  
Inspection sources: Saved inspection datasets (`prop-hunt-inspection.json`, `prop-hunt-graphs.json`), Blueprint graph structure, C++ source files (`VOIPLIB.h`, `VOIPLIB.cpp`), and asset directory audits.

### 2.1 Prop Transformation and Bounds Handling
* **Sphere Trace & Mesh Swapping**: `VERIFIED_IMPLEMENTATION`  
  * Evidence: `BP_propChar` implements `EnhancedInputAction IA_ChangeProp` -> `ChangePropOnServer` (reliable Server RPC) -> `SphereTraceSingle` on interaction channel -> `Cast To StaticMeshActor` -> check `PropAllowedMesh` array via `Array_Contains` -> server executes `UpdateMeshMulticast` -> calls `SetStaticMesh` on `PropMesh` component. Authorship is `USER_CONFIRMED: pending`.
* **Transform Resource Accounting**: `VERIFIED_IMPLEMENTATION`  
  * Evidence: `PropChangesLeft` is an integer replicated variable decremented on successful morph; default bounded by `MaxPropChanges = 10`.
* **Static Pivot Offset Handling**: `VERIFIED_IMPLEMENTATION`  
  * Evidence: `MeshWithFAlsePivot` array is queried with `Array_Contains`. If matched, hardcoded relative translation adjustments are applied via `K2_SetRelativeLocation` on `PropMesh`.
* **Camera Decoupling / Rotation Lock**: `VERIFIED_IMPLEMENTATION`  
  * Evidence: `EnhancedInputAction IA_RotationLock` toggles pawn rotation synchronization (`bUseControllerRotationYaw`), allowing free camera look around anchored prop mesh.
* **Dynamic Bounding Box & Capsule Resizing Formula**: `UNVERIFIED`  
  * Dossier claim: *"Ashish engineered a dynamic collision resolution algorithm that dynamically queries the targeted static mesh's bounding box (GetLocalBounds), recalculates the UCapsuleComponent half-height and radius ($CapsuleRadius = \frac{1}{2}\max(E_x, E_y), CapsuleHalfHeight = \max(E_z, CapsuleRadius)$), and offsets the mesh relative to ground level ($v_{offset} = (0, 0, -CapsuleHalfHeight)$)."*  
  * Finding: `GetLocalBounds`, capsule resizing functions (`SetCapsuleSize`, `SetCapsuleHalfHeight`), and dynamic ground offset calculations were not found in the inspected `BP_propChar` graph scope. The character collision capsule remains static. Collision is only toggled (`SetActorEnableCollision(false)`) upon elimination.
* **Pre-Transform Collision-Safe Placement Sweeps**: `UNVERIFIED`  
  * Dossier claim: Sweep traces validating prop disguise mesh does not intersect geometry before morphing.  
  * Finding: Only an initial sphere trace targeting the environmental static mesh is performed; post-selection geometry validation sweeps were not found in the inspected scope.

### 2.2 Hunter Combat, Hit Validation, and Authority
* **Weapon Firing Loop**: `VERIFIED_IMPLEMENTATION`  
  * Evidence: `BP_ThirdPersonCharacter` implements `StartFireOnServer` (Server RPC), starting a 0.1-second looping timer (`FireTimer`) triggering `FireRifle`. `StopFireOnServer` clears the timer handle. Authorship is `USER_CONFIRMED: pending`.
* **Client-Informed Line Trace**: `VERIFIED_IMPLEMENTATION`  
  * Evidence: `FireRifle` triggers client RPC `get clientCamera Action` to fetch client camera viewpoint. Owning client responds with `LineTraceOnserver(CameraLocation, CameraRotation)`. Server executes function `F_RifleLinerace` tracing forward along camera forward vector * `bulletDistance`.
  * Technical Boundary: Server RPCs and traces demonstrate a networked firing implementation. Combat traces rely on client-supplied camera vectors; full server hit validation and runtime authority are not verified.
* **Hit Presentation Effects**: `VERIFIED_IMPLEMENTATION`  
  * Evidence: `MulticastFireEvnt` plays rifle animation on `rIFLEmESH`; `MulticasttHitEffict` spawns muzzle/hit particle effects across clients.
* **Damage Application & Spectator Transition**: `VERIFIED_IMPLEMENTATION`  
  * Evidence: `F_RifleLinerace` checks `ActorHasTag("prop")`. On match, applies engine `Apply Damage` and sends `PlayrossairHit` feedback to controller. In `BP_propChar`, `AnyDamage` is handled behind an authority check, reducing `Health`. When `Health <= 0`, actor disables collision, hides mesh, spawns `BP_SpectatorPawn`, and possesses spectator pawn.
* **Decoy Destruction Authority**: `UNVERIFIED` (Configuration Discrepancy)  
  * Evidence: Hunter event `Server_DestroyFakeProp` is labeled with Server in name, but configured in Blueprint metadata as an owning-client RPC (`Client`). Direct `Destroy Actor` also exists in graph. Runtime playtesting is required to confirm whether server or client owns decoy destruction.
* **Lag Compensation & Rewind Buffers**: `UNVERIFIED`  
  * Dossier claim: *"The dedicated server maintains a rolling circular buffer of player collision capsule transforms indexed by engine tick timestamps. When a Hunter fires a shot at time $t_{client}$, the server calculates $\tau = RTT/2$, rewinds bounding boxes to $t_{rewind} = t_{server} - \tau$, executes raycast intersection check, and restores world state."*  
  * Finding: Rolling circular buffers, engine tick timestamp indexing, and server rewind algorithms were not found in the inspected C++ files or Blueprint graphs. Traces execute immediately at current server state using camera vectors supplied by the client.

### 2.3 Audio, Spatialization, and Custom C++ VOIP
* **C++ VOIP Packet Clearing (`UVOIPLIB`)**: `VERIFIED_IMPLEMENTATION`  
  * Evidence: `UVOIPLIB.h` and `UVOIPLIB.cpp` implement a single static method:
    ```cpp
    void UVOIPLIB::ClearVoicePackets(UObject* WorldContextObject) {
        ...
        IOnlineVoicePtr VoiceInterface = Subsystem->GetVoiceInterface();
        if (VoiceInterface.IsValid()) {
            VoiceInterface->ClearVoicePackets();
        }
    }
    ```
  * Authorship: `USER_CONFIRMED: pending`.
* **Hunter VOIP Component Registration**: `VERIFIED_IMPLEMENTATION`  
  * Evidence: `BP_ThirdPersonCharacter` registers a `UVOIPTalker` component, runs `Multicast_InitVOIP`, sets replicated `VoiceMode` enum, and exposes `Client_CloseVoiceLine`.
* **Sound Attenuation Asset**: `VERIFIED_IMPLEMENTATION`  
  * Evidence: `SA_VOIP.uasset` exists in `Content/resources/ThirdPerson/Blueprints/VOIP/`. Proves asset configuration exists.
* **Taunt Broadcast System**: `VERIFIED_IMPLEMENTATION`  
  * Evidence: `BP_propChar` binds `IA_Taunt` -> `TauntsOnServer` -> `TauntsMulticast` -> `Spawn Sound at Location` picking cues from `TauntSoundz` array with a 1.0s cooldown delay, plus an auto-taunt timer.
* **Low-Level Audio Buffer Monitoring & Automated Mute Routing**: `UNVERIFIED`  
  * Dossier claim: *"This custom library exposed low-level audio packet buffer monitoring, voice capture activity states, and automated mute/unmute routing based on player life state (e.g., dead players routed to a separate spectating voice channel)..."*  
  * Finding: Low-level audio buffer inspection, voice capture state analysis, and automated channel routing were not found in `UVOIPLIB`. The library contains only `ClearVoicePackets()`.
* **Logarithmic Falloff & Dynamic Occlusion Filtering**: `UNVERIFIED`  
  * Dossier claim: Real-time line-trace occlusion checks between listener and sound origin applying low-pass muffling filters.  
  * Finding: Audio occlusion line traces were not found in the inspected `BP_propChar` or character graphs.

### 2.4 Animation, Rigging, and Technical Art
* **UE5 IK Rig & IK Retargeter Assets**: `VERIFIED_IMPLEMENTATION`  
  * Evidence: Assets exist in `Content/Core/characters/1/`:
    * `stormtrooperikrig.uasset`
    * `oldmilitiryrig.uasset`
    * `RTG_NewRetargeter.uasset`
  * Default mannequin rig `CR_Mannequin_FootIK.uasset` exists in `Content/Characters/Mannequins/Rigs/`.
  * Technical Boundary: IK Rig and Retargeter assets prove that asset setups exist in the project; they do not independently prove original rigging, authored bone chains, retarget quality, or zero-distortion motion transfer. Authorship and quality are `USER_CONFIRMED: pending`.
* **Physics Asset Setup (PhAT)**: `VERIFIED_IMPLEMENTATION`  
  * Evidence: `StormTrooper_PhysicsAsset.uasset` and `StormTrooper_Skeleton.uasset` exist in `Content/Core/characters/1/`.
  * Technical Boundary: A PhysicsAsset proves only that an asset file exists; it does not independently prove custom bodies, joint constraint tuning, stable simulation, or animation-to-ragdoll blending. Setup authorship is `USER_CONFIRMED: pending`.
* **Networked Emotes & Leader-Pose Switching**: `VERIFIED_IMPLEMENTATION`  
  * Evidence: `BP_ThirdPersonCharacter` implements `Server_Emote` / `Multicast_Emote`, `Server_costumeChange` / `Multicast_CostumeChange`, and construction script leader-pose component attachment. Authorship is `USER_CONFIRMED: pending`.
* **Custom Armature Construction & Hand-Crafted Rigging**: `UNVERIFIED`  
  * Dossier claim: Authoring custom anatomical/stylized armatures in Blender, manual bone roll calibration, and manual vertex weight painting to counteract linear blend skinning volume loss ("candy-wrapper" effect).  
  * Finding: The meshes present in the project correspond to third-party models (StormTrooper, Erika Archer from Mixamo). Authorship of original armatures or skin weights is `USER_CONFIRMED: pending`.
* **Zero Joint Distortion Retargeting**: `UNVERIFIED`  
  * Dossier claim of "zero joint distortion" is an unverified qualitative claim pending visual runtime inspection of retargeted motion clips.

### 2.5 Shaders, Materials, and Asset Hygiene
* **Master Materials in Project Assets**: `VERIFIED_IMPLEMENTATION`  
  * Evidence: Master materials exist within imported asset folders:
    * `MM_MasterMaterial_01.uasset` (`Content/resources/Construction_VOL1/Materials/Masters/`)
    * `M_Buildings_Master.uasset`, `M_Ground_Master.uasset`, `M_Foliage_Master.uasset` (`Content/resources/NonGitLFS/Downtown_West/Materials/`)
    * `M_HairSheet_Master.uasset` (`Content/Sample/Mat/`)
  * Material instances exist for gameplay props (e.g., `MI_ConstructionPylon_01a.uasset`).
* **Original Custom Master Material & Packed ORM Shaders**: `UNVERIFIED`  
  * Dossier claim: Centralized authored Master Material with packed ORM texture streaming (cutting sampler count by 66%), dynamic `FlattenNormal` scalar parameters, and Custom Stencil outline post-processing.  
  * Finding: A custom master material under `Content/Core` was not found in the inspected scope. Master materials found reside in third-party resource packs (`Downtown_West`, `Construction_VOL1`). Authorship of original master materials is `USER_CONFIRMED: pending`.
* **Custom Stencil Post-Process Outline**: `UNVERIFIED`  
  * A custom depth or stencil post-process outline material was not found in the inspected gameplay level scope.

### 2.6 Multiplayer Architecture & Session Management
* **Advanced Sessions & Steam Online Subsystem**: `VERIFIED_IMPLEMENTATION` (Configuration Only)  
  * Evidence: `SheeshhPropHuntYT.uproject` enables `AdvancedSessions` and `AdvancedSteamSessions` plugins; `steam_appid.txt` exists (app ID 480).
  * Technical Boundary: Plugin enablement and Steam app ID 480 prove configuration only. Full lobby matchmaking, invite handling, and server browser behavior remain unverified at runtime.
* **Game Mode Round Tracking**: `VERIFIED_IMPLEMENTATION`  
  * Evidence: `GM_ProphuntGameMode` tracks connected players, assigns teams (Props vs Seekers), maintains `SeekerCount`, counts alive props, controls round countdown timers, triggers victory screens, and handles map travel. Authorship is `USER_CONFIRMED: pending`.
* **HUD and Replicated Player State**: `VERIFIED_IMPLEMENTATION`  
  * Evidence: `BP_ThirdPersonPlayerController` drives HUD bindings, countdown displays, kill feed, and player list; `PlayerState01` replicates player name and voice mode. Authorship is `USER_CONFIRMED: pending`.
* **Stable Measured 120 FPS Benchmark**: `UNVERIFIED`  
  * Performance claim requires hardware-specific profiling logs (Unreal Insights or CSV profiler) to substantiate.

---

## 3. Authorship and Attribution Audit Ledger

Every asset and system is classified by its verified provenance and authorship status before public presentation:

| Asset / System | Category | Provenance / Sourcing | Public Claim Policy |
|---|---|---|---|
| **Prop Transformation Logic** | Gameplay Blueprint | Project repository (`BP_propChar`); authorship `USER_CONFIRMED: pending` | Present as project gameplay logic; describe verified sphere trace and pivot offsets. |
| **Hunter Combat Logic** | Gameplay Blueprint | Project repository (`BP_ThirdPersonCharacter`); authorship `USER_CONFIRMED: pending` | Present as networked firing logic; note client-informed traces and absence of rollback buffers. |
| **VOIP Helper (`UVOIPLIB`)** | C++ Function Library | Project repository (`VOIPLIB.cpp`); authorship `USER_CONFIRMED: pending` | Present as C++ `IOnlineVoicePtr` packet clearing integration; do not claim buffer monitoring or spectate routing. |
| **Round Flow & Controller Logic** | Gameplay Blueprint | Project repository (`GM_ProphuntGameMode`, `BP_ThirdPersonPlayerController`); authorship `USER_CONFIRMED: pending` | Present as game loop and HUD replication. |
| **Downtown West Environment** | Environment Art | Folder `Downtown_West` in resources; `PROVENANCE_PENDING` | Attribute as third-party environment; do not claim purchase or licensing terms without documentation. |
| **Construction Props & Pylons** | Static Meshes | Folder `Construction_VOL1` in resources; `PROVENANCE_PENDING` | Attribute as external prop assets when demonstrating disguise mechanics. |
| **StormTrooper Character Mesh** | Character Mesh | Folder `characters/1` in Content/Core; `PROVENANCE_PENDING` | Identify as external mesh used for IK Rig / Retargeting technical demonstration. |
| **Erika Archer Character Mesh** | Character Mesh | Folder `Miximo/AssasinChar` in Content/Core; `PROVENANCE_PENDING` | Identify as external mesh base; do not claim 3D modeling or base rigging. |
| **Locomotion & Rifle Animations** | Animation Assets | Project animation folders; `PROVENANCE_PENDING` | Frame around retargeting pipeline and gameplay integration, not animation authoring. |
| **Taunt Audio Clips** | Sound Waves | Folder `sound` in Content/Core; `PROVENANCE_PENDING` | Attribute as external audio files; focus on 3D spatialization and network replication. |
| **3D Hard-Surface Portfolio Assets** | 3D Models | Original Blender files; `USER_CONFIRMED: pending` | Requires explicit selection and confirmation of an original `.blend` asset by Ashish. |

---

## 4. Public Portfolio Claims Boundary

1. **Permitted Public Claims**:
   * "Networked asymmetric gameplay implementation in Unreal Engine 5.7 using RPCs and replicated variables."
   * "Prop disguise mechanics featuring line/sphere trace targeting, dynamic mesh swapping, and per-mesh pivot correction offsets."
   * "C++ integration with Unreal Engine's Online Subsystem voice interface (`IOnlineVoicePtr`) for clearing voice packet buffers."
   * "Unreal Engine 5 IK Rig and IK Retargeter asset setup for retargeting humanoid animations across disparate skeletal meshes."
   * "Multiplayer round lifecycle plumbing: lobby, team assignment, team countdowns, spectator state transitions, and scoreboard replication."
2. **Prohibited Public Claims (Unverified / Prohibited Until Supported)**:
   * "Dynamic capsule recalculation and bounding box fitting algorithms."
   * "Server lag compensation, client timestamp buffers, and hit registration rollback algorithms."
   * "Low-level audio buffer analysis and automated spectator voice routing in C++."
   * "Real-time geometric audio occlusion line tracing."
   * "Zero joint distortion retargeting output" (unverified qualitative claim).
   * "Custom authored master materials with 66% sampler savings."
   * Claiming authorship of 3D meshes, rigs, or environments without explicit user confirmation.
   * Describing combat hit detection as fully server-authoritative or cheat-proof when client-supplied camera vectors drive traces.
