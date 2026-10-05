import { ExhibitData, ExhibitIndexItem } from '../types/portfolio';

/* =========================================================================
 * PILLAR 1: SHEESHH PROP HUNT GAMEPLAY SYSTEMS (VERIFIED IMPLEMENTATION)
 * ========================================================================= */

export const EXHIBIT_TRANSFORM: ExhibitData = {
  id: 'sheeshh-prop-hunt',
  shortId: 'EX-PH-TRANSFORM',
  title: 'Real-Time Prop Disguise & Pivot Offset Architecture',
  shortTitle: 'Prop Disguise & Pivot',
  subtitle: 'Inspected Blueprint graph analysis · Unreal Engine 5.7.4 (BP_propChar)',
  category: 'Gameplay Mechanics & Replication',
  pillarId: 1,
  evidenceStatus: 'VERIFIED_IMPLEMENTATION',
  badgeLabel: 'Verified implementation',
  role: 'USER_CONFIRMED: pending (Gameplay Programming & Technical Art)',
  engine: 'Unreal Engine 5.7.4',
  tools: ['C++', 'Blueprints', 'Enhanced Input', 'Advanced Sessions', 'Blender'],
  summary:
    'A networked multiplayer disguise system where prop characters trace environmental static meshes, validate transformation allowances on the server, broadcast replicated mesh swaps across client proxies, and execute relative translation offsets to ground non-standard asset pivots.',
  mediaPlaceholders: [
    {
      id: 'PH-OVERVIEW',
      label: 'Gameplay Overview Reel',
      duration: '45–60s edited reel',
      requirement: 'RUNTIME_VERIFIED',
      description: 'Asymmetric round loop showing hide-and-seek mechanics, disguise, taunts, and elimination from hunter and prop perspectives.',
      whatCaptureProves: 'Validates complete match cycle, player role assignment, and live multiplayer synchronization.',
    },
    {
      id: 'PH-TRANSFORM',
      label: 'Multi-View Transformation Clip',
      duration: '20–30s split-screen video',
      requirement: 'RUNTIME_VERIFIED',
      description: 'Synchronized dual-client recording validating host targeting, multicast mesh swap, and pivot correction.',
      whatCaptureProves: 'Demonstrates networked mesh replication across clients and ground alignment for non-standard asset pivots.',
    },
  ],
  steps: [
    {
      title: 'Step 1: Input & Interaction Trace',
      tag: 'Client Initiated',
      desc: 'Enhanced Input Action IA_ChangeProp triggers SphereTraceSingle on the interaction trace channel to detect environmental static mesh actors.',
      codeSnippet: 'IA_ChangeProp -> SphereTraceSingle(ECC_Interaction) -> Cast To StaticMeshActor',
    },
    {
      title: 'Step 2: Server RPC & Resource Validation',
      tag: 'Server RPC Execution',
      desc: 'Client invokes reliable Server RPC ChangePropOnServer. The server queries PropChangesLeft bounded by MaxPropChanges = 10 and validates the targeted static mesh against PropAllowedMesh using Array_Contains.',
      codeSnippet: 'ChangePropOnServer(Reliable) -> Check(PropChangesLeft > 0) -> Array_Contains(PropAllowedMesh)',
    },
    {
      title: 'Step 3: Multicast Replication & Mesh Swap',
      tag: 'Multicast Event',
      desc: 'After the inspected server-side checks pass, the server broadcasts UpdateMeshMulticast passing the new StaticMesh reference. Client proxies receive the event and call SetStaticMesh on their replicated PropMesh component.',
      codeSnippet: 'UpdateMeshMulticast(NetMulticast) -> PropMesh->SetStaticMesh(NewMesh)',
    },
    {
      title: 'Step 4: Pivot Offset Correction',
      tag: 'Ground Alignment',
      desc: 'Props with non-centered or non-ground pivot points are indexed in the MeshWithFAlsePivot array. When matched, hardcoded relative translation adjustments are applied via K2_SetRelativeLocation to keep the disguised mesh grounded.',
      codeSnippet: 'Array_Contains(MeshWithFAlsePivot) == True -> PropMesh->K2_SetRelativeLocation(Offset)',
    },
    {
      title: 'Step 5: Camera Decoupling & Free Look',
      tag: 'Pawn Control',
      desc: 'EnhancedInputAction IA_RotationLock toggles bUseControllerRotationYaw to false, decoupling controller yaw from actor rotation. Resulting runtime 360° camera orbit behavior remains capture pending.',
      codeSnippet: 'IA_RotationLock -> Set bUseControllerRotationYaw = false (Yaw Decoupled; Orbit Capture Pending)',
    },
  ],
  boundaryTitle: 'Architectural Audit: Collision Bounds & Placement Sweeps',
  boundaryFormula: 'CapsuleRadius = 0.5 * max(Extent.X, Extent.Y) | CapsuleHalfHeight = max(Extent.Z, CapsuleRadius)',
  boundaryDescription:
    'Functions such as GetLocalBounds, SetCapsuleSize, and dynamic ground offsets were not found in the inspected BP_propChar scope. Dynamic capsule resizing nodes were not found in the inspected Blueprint scope, and runtime capsule behavior remains unverified; collision is only disabled upon elimination. Pre-transform geometry collision sweeps were likewise not found in the inspected graphs. These claims are classified as UNVERIFIED; runtime verification remains pending.',
  provenanceNote:
    'Gameplay Blueprints: Project repository logic (USER_CONFIRMED: pending). Environment assets: PROVENANCE_PENDING (Downtown_West). Prop meshes: PROVENANCE_PENDING (Construction_VOL1). Audio assets: PROVENANCE_PENDING (Content/Core/sound).',
  authorshipStatus: 'USER_CONFIRMED: pending',
};

export const EXHIBIT_DECOY: ExhibitData = {
  id: 'EX-PH-DECOY',
  shortId: 'EX-PH-DECOY',
  title: 'Decoy Prop Placement & Spatial Deception',
  shortTitle: 'Decoy Placement & Clutter',
  subtitle: 'Inspected Blueprint graph analysis · Unreal Engine 5.7.4 (BP_propChar, BP_SPawnedProp)',
  category: 'Gameplay Mechanics & Replication',
  pillarId: 1,
  evidenceStatus: 'VERIFIED_IMPLEMENTATION',
  badgeLabel: 'Verified implementation',
  role: 'USER_CONFIRMED: pending (Gameplay Programming)',
  engine: 'Unreal Engine 5.7.4',
  tools: ['Blueprints', 'Enhanced Input', 'Actor Spawning', 'Physics Simulation'],
  summary:
    'A spatial deception mechanic where disguised prop players invoke a server RPC to spawn physical duplicate decoy actors matching their active static mesh disguise, bounded by a 5-decoy resource limit and configured with physics simulation.',
  mediaPlaceholders: [
    {
      id: 'PH-DECOY',
      label: 'Decoy Placement & Clutter Reel',
      duration: '15–20s gameplay clip',
      requirement: 'RUNTIME_VERIFIED',
      description: 'Recording demonstrating decoy deployment, count limitation, physics settling onto geometry, and hunter weapon interaction.',
      whatCaptureProves: 'Demonstrates decoy actor spawning, 5-prop spawn limit enforcement, physics settling, and hunter destruction interaction.',
    },
  ],
  steps: [
    {
      title: 'Step 1: Input Trigger & Server RPC',
      tag: 'Client Input',
      desc: 'Prop player presses IA_SpawnProp, invoking reliable Server RPC Spawnproponserver to initiate decoy placement.',
      codeSnippet: 'EnhancedInputAction IA_SpawnProp -> Spawnproponserver(Reliable Server RPC)',
    },
    {
      title: 'Step 2: Server-Side Resource Accounting',
      tag: 'Server Authority',
      desc: 'Server queries SpawnPropsLeft bounded by MaxSpawnProps = 5. If capacity exists, the server decrements the counter and queries the active disguise static mesh.',
      codeSnippet: 'Check(SpawnPropsLeft > 0) -> Decrement(SpawnPropsLeft) -> Query Current Disguise StaticMesh',
    },
    {
      title: 'Step 3: Duplicate Actor Spawning',
      tag: 'World Spawning',
      desc: 'Server invokes SpawnActor targeting BP_SPawnedProp at player transform with collision handling set to AlwaysSpawn.',
      codeSnippet: 'SpawnActor(Class = BP_SPawnedProp, Transform = PropLocation, SpawnCollision = AlwaysSpawn)',
    },
    {
      title: 'Step 4: Mesh Synchronization Multicast',
      tag: 'Net Multicast',
      desc: 'Server executes MulticastSetMesh on the newly spawned actor, ensuring all client proxies assign the matching StaticMesh reference.',
      codeSnippet: 'BP_SPawnedProp->MulticastSetMesh(CurrentStaticMeshReference)',
    },
    {
      title: 'Step 5: Physics Activation & Decoy Settling',
      tag: 'Physics Simulation',
      desc: 'Spawned prop enables physics simulation on its mesh component, allowing the duplicate decoy to drop naturally and settle onto surrounding environment collision geometry.',
      codeSnippet: 'SpawnedMeshComponent->SetSimulatePhysics(true) -> CollisionProfile = BlockAllDynamic',
    },
  ],
  boundaryTitle: 'Architectural Audit: Decoy Destruction Authority Discrepancy',
  boundaryDescription:
    'The hunter event Server_DestroyFakeProp is named as a server function but configured in Blueprint metadata as an owning-client RPC (Client execution). Direct Destroy Actor nodes are present across both client and server code paths. Runtime playtesting is required to verify whether server or client owns final destruction authority. Claims of fully authoritative decoy lifecycle are UNVERIFIED pending multiplayer playtesting.',
  provenanceNote:
    'Decoy Blueprint logic: Project repository logic (USER_CONFIRMED: pending). Prop static mesh assets: Inherited from active disguise mesh (PROVENANCE_PENDING).',
  authorshipStatus: 'USER_CONFIRMED: pending',
};

export const EXHIBIT_COMBAT: ExhibitData = {
  id: 'EX-PH-COMBAT',
  shortId: 'EX-PH-COMBAT',
  title: 'Hunter Weapon Ballistics, Damage & Spectator Transition',
  shortTitle: 'Hunter Ballistics & Spectating',
  subtitle: 'Inspected Blueprint graph analysis · Unreal Engine 5.7.4 (BP_ThirdPersonCharacter, BP_propChar)',
  category: 'Gameplay Mechanics & Replication',
  pillarId: 1,
  evidenceStatus: 'VERIFIED_IMPLEMENTATION',
  badgeLabel: 'Verified implementation',
  role: 'USER_CONFIRMED: pending (Gameplay Programming)',
  engine: 'Unreal Engine 5.7.4',
  tools: ['Blueprints', 'Client RPCs', 'Line Traces', 'Damage Framework', 'Possession'],
  summary:
    'A networked weapon firing system where a looping server timer queries client camera vectors, executes forward line traces on the server, broadcasts cosmetic muzzle and impact effects, applies point damage to prop characters, and transitions eliminated players into possessed spectator pawns.',
  mediaPlaceholders: [
    {
      id: 'PH-COMBAT',
      label: 'Hunter Combat & Elimination Split-Screen',
      duration: '20–25s split-screen video',
      requirement: 'RUNTIME_VERIFIED',
      description: 'Synchronized dual-view recording showing shooter crosshair hit feedback alongside prop health decrement, collision shutdown, and spectator transition.',
      whatCaptureProves: 'Confirms hit registration, crosshair hit markers, health reduction, and spectator pawn possession at runtime.',
    },
  ],
  steps: [
    {
      title: 'Step 1: Networked Firing Loop Timer',
      tag: 'Server RPC',
      desc: 'Hunter input calls StartFireOnServer, starting a 0.1-second looping FireTimer handle triggering FireRifle. StopFireOnServer clears the timer handle.',
      codeSnippet: 'StartFireOnServer -> SetTimerByFunctionName(FireRifle, Rate = 0.1s, Looping = true)',
    },
    {
      title: 'Step 2: Client Viewpoint Request',
      tag: 'Client RPC',
      desc: 'Server triggers client RPC get clientCamera Action. Owning client responds with LineTraceOnserver(CameraLocation, CameraRotation).',
      codeSnippet: 'FireRifle -> ClientRPC("get clientCamera Action") -> ServerRPC(LineTraceOnserver(Loc, Rot))',
    },
    {
      title: 'Step 3: Server Line Trace Execution',
      tag: 'Trace Evaluation',
      desc: 'Server executes function F_RifleLinerace running Line Trace By Channel along the camera forward vector multiplied by bulletDistance.',
      codeSnippet: 'F_RifleLinerace -> LineTraceByChannel(Start = CamLoc, End = CamLoc + Forward * BulletDistance)',
    },
    {
      title: 'Step 4: Cosmetic Replication & Hit Feedback',
      tag: 'Net Multicast',
      desc: 'Server broadcasts MulticastFireEvnt (rifle recoil montage) and MulticasttHitEffict (muzzle flash and impact particles), sending PlayrossairHit to the attacking player controller.',
      codeSnippet: 'MulticastFireEvnt -> MulticasttHitEffict -> Controller->PlayrossairHit()',
    },
    {
      title: 'Step 5: Damage Application & Spectator Pawn Transition',
      tag: 'Player Elimination',
      desc: 'Hits on ActorHasTag("prop") apply engine damage. BP_propChar validates damage on server, decrements Health, disables collision, hides mesh, spawns BP_SpectatorPawn, and possesses spectator pawn.',
      codeSnippet: 'ApplyDamage -> Health <= 0 -> SetActorEnableCollision(false) -> SpawnActor(BP_SpectatorPawn) -> Possess()',
    },
  ],
  boundaryTitle: 'Architectural Audit: Client-Supplied Vectors & Rewind Lag Compensation',
  boundaryDescription:
    'Firing traces rely on client-supplied camera viewpoint vectors. Rolling transform buffers, timestamp indexing, and server rewind lag compensation algorithms were not found in the inspected C++ files or Blueprint graphs. Traces execute immediately at current server state without historical rewind. Claims of lag-compensated, rollback-validated hit registration are UNVERIFIED; runtime verification remains pending.',
  provenanceNote:
    'Combat & Spectator Blueprints: Project repository logic (USER_CONFIRMED: pending). Rifle mesh and impact particles: PROVENANCE_PENDING (Downtown_West and Core assets).',
  authorshipStatus: 'USER_CONFIRMED: pending',
};

export const EXHIBIT_AUDIO: ExhibitData = {
  id: 'EX-PH-AUDIO',
  shortId: 'EX-PH-AUDIO',
  title: 'Positional Taunts & Networked VOIP Architecture',
  shortTitle: 'Spatial Taunts & VOIP',
  subtitle: 'Inspected C++ & Blueprint analysis · Unreal Engine 5.7.4 (UVOIPLIB, BP_ThirdPersonCharacter, BP_propChar)',
  category: 'Audio Architecture & Online Subsystems',
  pillarId: 1,
  evidenceStatus: 'VERIFIED_IMPLEMENTATION',
  badgeLabel: 'Verified implementation',
  role: 'USER_CONFIRMED: pending (Audio Engineering & C++ Integration)',
  engine: 'Unreal Engine 5.7.4',
  tools: ['C++', 'Blueprints', 'OnlineSubsystem', 'Attenuation', 'Voice Chat'],
  summary:
    'A positional audio architecture combining randomized 3D spatial taunt sound cues, cooldown timers, attenuation assets, and custom C++ UVOIPLIB helper functions interfacing with Unreal Engine OnlineSubsystem voice interfaces.',
  mediaPlaceholders: [
    {
      id: 'PH-AUDIO',
      label: 'Positional Taunt & VOIP Gameplay Clip',
      duration: '20–30s gameplay clip with audio',
      requirement: 'RUNTIME_VERIFIED',
      description: 'Audio capture demonstrating 3D spatial sound panning, taunt distance attenuation, 1.0s cooldown enforcement, and VOIP packet clearing.',
      whatCaptureProves: 'Confirms 3D audio spatialization, cooldown delays, and voice channel mode synchronization at runtime.',
    },
  ],
  steps: [
    {
      title: 'Step 1: Taunt Trigger & Cooldown Gate',
      tag: 'Client Input',
      desc: 'Disguised prop triggers IA_Taunt, which validates a 1.0-second cooldown gate before invoking TauntsOnServer.',
      codeSnippet: 'IA_Taunt -> CheckCooldown(1.0s) -> TauntsOnServer(Server RPC)',
    },
    {
      title: 'Step 2: Multicast Spatial Taunt Broadcast',
      tag: 'Net Multicast',
      desc: 'Server broadcasts TauntsMulticast, triggering Spawn Sound at Location picking randomized audio cues from TauntSoundz array.',
      codeSnippet: 'TauntsMulticast -> SpawnSoundAtLocation(TauntSoundz[RandomIndex], Location = PropLocation)',
    },
    {
      title: 'Step 3: Distance Attenuation Configuration',
      tag: 'Asset Setup',
      desc: 'Audio playback leverages attenuation asset SA_VOIP to enforce distance-based sound rolloff and spatial orientation.',
      codeSnippet: 'SA_VOIP.uasset -> InnerRadius = 400.0, FalloffDistance = 2400.0, Spatialization = Binaural',
    },
    {
      title: 'Step 4: Hunter UVOIPTalker Component Registration',
      tag: 'Pawn Setup',
      desc: 'Hunter pawns register UVOIPTalker components, execute Multicast_InitVOIP, and synchronize replicated VoiceMode states.',
      codeSnippet: 'BP_ThirdPersonCharacter -> RegisterComponent(UVOIPTalker) -> Multicast_InitVOIP(VoiceMode)',
    },
    {
      title: 'Step 5: C++ OnlineSubsystem Packet Clearing',
      tag: 'C++ Source',
      desc: 'Custom static library UVOIPLIB::ClearVoicePackets queries IOnlineSubsystem voice interface and flushes voice packet buffers.',
      codeSnippet: 'UVOIPLIB::ClearVoicePackets() -> IOnlineVoicePtr->ClearVoicePackets()',
    },
  ],
  boundaryTitle: 'Architectural Audit: Audio Occlusion Traces & Buffer Monitoring Boundary',
  boundaryDescription:
    'Inspection of UVOIPLIB.h and UVOIPLIB.cpp reveals only ClearVoicePackets(). Low-level audio buffer analysis, automated dead-player voice channel routing, and real-time geometry occlusion line traces were not found in the inspected codebase. Attenuation relies on asset-level radius parameters. Claims of dynamic low-pass occlusion filters are UNVERIFIED; runtime verification remains pending.',
  provenanceNote:
    'C++ VOIPLIB helper: Project repository code (USER_CONFIRMED: pending). Audio cues and voice clips: PROVENANCE_PENDING (Content/Core/sound).',
  authorshipStatus: 'USER_CONFIRMED: pending',
};

export const EXHIBIT_LIFECYCLE: ExhibitData = {
  id: 'EX-PH-LIFECYCLE',
  shortId: 'EX-PH-LIFECYCLE',
  title: 'Asymmetric Round Lifecycle & Replicated Game State',
  shortTitle: 'Round Lifecycle & GameMode',
  subtitle: 'Inspected Blueprint graph analysis · Unreal Engine 5.7.4 (GM_ProphuntGameMode, BP_ThirdPersonPlayerController)',
  category: 'Gameplay Architecture & Session Flow',
  pillarId: 1,
  evidenceStatus: 'VERIFIED_IMPLEMENTATION',
  badgeLabel: 'Verified implementation',
  role: 'USER_CONFIRMED: pending (Gameplay Architecture)',
  engine: 'Unreal Engine 5.7.4',
  tools: ['Blueprints', 'GameModeBase', 'UMG Widgets', 'PlayerState', 'Replicated Timers'],
  summary:
    'Server-authoritative match coordination managing team assignment, preparation countdowns, active hunt timers, live elimination tracking, and synchronized UMG HUD feeds across client viewports.',
  mediaPlaceholders: [
    {
      id: 'PH-ROUNDFLOW',
      label: 'GameMode & UMG Lifecycle Video',
      duration: '30–40s HUD sync video',
      requirement: 'RUNTIME_VERIFIED',
      description: 'Synchronized dual-client recording showing lobby transition, team assignment countdown, real-time kill feed, and victory screen.',
      whatCaptureProves: 'Confirms match progression, countdown synchronization, kill feed updates, and victory screen delivery across clients.',
    },
  ],
  steps: [
    {
      title: 'Step 1: Session Join & Team Partitioning',
      tag: 'GameMode Authority',
      desc: 'GM_ProphuntGameMode registers incoming player controllers, balances team counts between Props and Seekers, and increments SeekerCount.',
      codeSnippet: 'GM_ProphuntGameMode->PostLogin -> AssignTeam(Props vs Seekers) -> Increment(SeekerCount)',
    },
    {
      title: 'Step 2: Match Preparation Countdown',
      tag: 'Replicated State',
      desc: 'Server initiates round countdown timer, immobilizing hunters while props disperse and select disguise static meshes.',
      codeSnippet: 'StartPrepTimer -> PropDispersalPhase -> FreezeSeekerMovement()',
    },
    {
      title: 'Step 3: UMG Main HUD Synchronization',
      tag: 'Client UI',
      desc: 'BP_ThirdPersonPlayerController initializes UW_MainHUD, binding replicated alive prop counts, timer strings, and team icons.',
      codeSnippet: 'CreateWidget(UW_MainHUD) -> Bind(AlivePropCount, RemainingTime, TeamAssignment)',
    },
    {
      title: 'Step 4: Kill Feed Notification Replication',
      tag: 'Multicast UI Event',
      desc: 'Prop eliminations broadcast notifications across player controllers, dynamically instantiating WBP_KillFeedItem widgets in HUD scroll boxes.',
      codeSnippet: 'BroadcastElimination -> Controller->AddKillFeedItem(EliminatedPlayer, HunterName)',
    },
    {
      title: 'Step 5: End-of-Round Victory Resolution',
      tag: 'Win Condition',
      desc: 'Server evaluates win conditions (all props eliminated vs hunt timer expiry), triggers victory/defeat widgets, and executes server travel.',
      codeSnippet: 'CheckWinCondition() -> BroadcastRoundOver(WinningTeam) -> ServerTravel(NextMap)',
    },
  ],
  boundaryTitle: 'Architectural Audit: Session Matchmaking & Steam Online Subsystem',
  boundaryDescription:
    'SheeshhPropHuntYT.uproject enables AdvancedSessions and AdvancedSteamSessions with steam_appid.txt = 480. Configuration proves plugin presence; full backend lobby discovery, invite callbacks, and dedicated server matchmaking remain unverified at runtime. Claims of custom backend matchmaking are UNVERIFIED; runtime verification remains pending.',
  provenanceNote:
    'GameMode and UMG Blueprints: Project repository logic (USER_CONFIRMED: pending). UI textures and icons: PROVENANCE_PENDING (Content/Core/Widgets/texture).',
  authorshipStatus: 'USER_CONFIRMED: pending',
};

export const EXHIBIT_CUSTOMIZATION: ExhibitData = {
  id: 'EX-PH-CUSTOMIZATION',
  shortId: 'EX-PH-CUSTOMIZATION',
  title: 'Modular Customization & Networked Emote Pipeline',
  shortTitle: 'Modular Armor & Emotes',
  subtitle: 'Inspected Blueprint graph analysis · Unreal Engine 5.7.4 (BP_ThirdPersonCharacter)',
  category: 'Technical Art & Skeletal Meshes',
  pillarId: 1,
  evidenceStatus: 'VERIFIED_IMPLEMENTATION',
  badgeLabel: 'Verified implementation',
  role: 'USER_CONFIRMED: pending (Technical Art & Gameplay)',
  engine: 'Unreal Engine 5.7.4',
  tools: ['Blueprints', 'Leader Pose Component', 'Animation Montages', 'Multicast RPCs'],
  summary:
    'A modular skeletal character pipeline leveraging Set Leader Pose Component in the character construction script to drive synchronized Body, Hands, and Helmet armor meshes from a master skeletal armature, with networked dance emote montages and costume swaps.',
  mediaPlaceholders: [
    {
      id: 'PH-CUSTOMIZATION',
      label: 'Networked Emote & Armor Swap Reel',
      duration: '15–20s dual-client video',
      requirement: 'RUNTIME_VERIFIED',
      description: 'Dual-client recording demonstrating synchronized dance emote playback, cosmetic armor mesh swapping, and leader pose deformation.',
      whatCaptureProves: 'Confirms cosmetic mesh replication, leader pose bone follow deformation, and montage synchronization across remote proxies.',
    },
  ],
  steps: [
    {
      title: 'Step 1: Networked Emote Trigger',
      tag: 'Server RPC',
      desc: 'Player input initiates Server_Emote, which verifies player mobility before dispatching Multicast_Emote across remote proxies.',
      codeSnippet: 'Input_Emote -> Server_Emote(Reliable) -> Multicast_Emote(MontageToPlay)',
    },
    {
      title: 'Step 2: Modular Mesh Component Hierarchy',
      tag: 'Component Setup',
      desc: 'Character construction script configures modular skeletal components for Body, Hands, and Helmet attached to the master skeletal armature.',
      codeSnippet: 'Master Character Mesh -> Attach Modular Components (Body, Hands, Helmet)',
    },
    {
      title: 'Step 3: Leader Pose Coupling',
      tag: 'Leader Pose Binding',
      desc: 'Modular components (Body, Hands, Helmet) execute Blueprint Set Leader Pose Component targeting the master character mesh to drive bone transforms.',
      codeSnippet: 'Body / Hands / Helmet -> Set Leader Pose Component (Target: Master Mesh)',
    },
    {
      title: 'Step 4: Runtime Cosmetic Swap Multicast',
      tag: 'Cosmetic Replication',
      desc: 'Lobby costume selection calls Server_costumeChange, which propagates Multicast_CostumeChange to update modular mesh assets while preserving leader pose binding.',
      codeSnippet: 'Server_costumeChange -> Multicast_CostumeChange -> Update Modular Mesh Assets',
    },
    {
      title: 'Step 5: Locomotion & Bone Follow Evaluation',
      tag: 'Deformation Sync',
      desc: 'During locomotion, jump, and emote states, attached modular components follow master skeleton bone motion.',
      codeSnippet: 'Master Skeleton Evaluation -> Modular Components Follow (Body, Hands, Helmet)',
    },
  ],
  boundaryTitle: 'Architectural Audit: Asset Provenance & Runtime Quality',
  boundaryDescription:
    'Inspection confirms Server_Emote, Multicast_Emote, Server_costumeChange, Multicast_CostumeChange, and the Blueprint Set Leader Pose Component structure for Body/Hands/Helmet. Character and animation sources are classified as PROVENANCE_PENDING without verified origin manifests. Authorship and runtime animation quality remain pending capture.',
  provenanceNote:
    'Replication & Leader Pose Blueprints: Project repository logic (USER_CONFIRMED: pending). Character meshes and animations: PROVENANCE_PENDING (folders characters/1 and ANIMATION).',
  authorshipStatus: 'USER_CONFIRMED: pending',
};

/* =========================================================================
 * PILLAR 2: TECHNICAL ART & RIGGING (ASSET PRESENCE VERIFIED)
 * ========================================================================= */

export const EXHIBIT_IKRETARGET: ExhibitData = {
  id: 'EX-TA-IKRETARGET',
  shortId: 'EX-TA-IKRETARGET',
  title: 'Modern UE5 IK Rig & Animation Retargeter Setup',
  shortTitle: 'IK Rig & Retargeter',
  subtitle: 'Verified Asset Files · Editor Inspection & Motion Comparison Pending',
  category: 'Technical Art & Rigging',
  pillarId: 2,
  evidenceStatus: 'ASSET_PRESENCE_VERIFIED',
  badgeLabel: 'Asset presence verified',
  role: 'USER_CONFIRMED: pending (Technical Art & Animation Pipeline)',
  engine: 'Unreal Engine 5.7.4',
  tools: ['Unreal Engine 5', 'IK Rig', 'IK Retargeter', 'Skeletal Meshes', 'Animation Pipelines'],
  summary:
    'Evaluation of Unreal Engine 5 IK Rig and IK Retargeter assets present in the project (RTG_NewRetargeter.uasset, stormtrooperikrig.uasset, oldmilitiryrig.uasset). Editor inspection of internal chain mappings, base poses, and retargeted motion comparison remains pending capture.',
  mediaPlaceholders: [
    {
      id: 'TA-IKRETARGET',
      label: 'UE5 IK Retargeter Viewport Comparison',
      duration: '20–30s editor tool video',
      requirement: 'ASSET_INSPECTION_REQUIRED',
      description: 'Viewport capture of RTG_NewRetargeter comparing source animation to retargeted skeletal mesh with bone chain alignment inspected in editor.',
      whatCaptureProves: 'Confirms functional bone chain mapping, target pose alignment, and animation transfer between disparate armatures in the editor.',
    },
  ],
  steps: [
    {
      title: 'Inspection Step 1: Open Asset Files in Editor',
      tag: 'Inspection Checklist',
      desc: 'Open RTG_NewRetargeter.uasset, stormtrooperikrig.uasset, and oldmilitiryrig.uasset in Unreal Editor to inspect asset references and skeletal hierarchy associations.',
      codeSnippet: 'Editor Checklist: Inspect RTG_NewRetargeter.uasset, stormtrooperikrig.uasset, oldmilitiryrig.uasset',
    },
    {
      title: 'Inspection Step 2: Identify Source & Target Rigs',
      tag: 'Inspection Checklist',
      desc: 'Identify source and target IK Rig assignments within RTG_NewRetargeter to document intended skeletal hierarchy relationships.',
      codeSnippet: 'Editor Checklist: Identify Source IK Rig and Target IK Rig assignments in RTG_NewRetargeter',
    },
    {
      title: 'Inspection Step 3: Inspect Chain Mapping Table',
      tag: 'Inspection Checklist',
      desc: 'Inspect chain mapping table in editor to document solver chains, root bone definitions, and unmapped bone chains between source and target.',
      codeSnippet: 'Editor Checklist: Inspect Chain Mapping table and verify solver chain correspondence',
    },
    {
      title: 'Inspection Step 4: Compare Base Rest Poses',
      tag: 'Inspection Checklist',
      desc: 'Compare source and target rest poses in editor viewport to evaluate whether retarget pose adjustment or roll alignment offsets were applied.',
      codeSnippet: 'Editor Checklist: Compare source and target rest poses in editor viewport',
    },
    {
      title: 'Inspection Step 5: Viewport Motion Comparison Recording',
      tag: 'Inspection Checklist',
      desc: 'Record a side-by-side viewport comparison playback of locomotion/rifle animation sequences across source and target meshes to evaluate motion quality.',
      codeSnippet: 'Editor Checklist: Record side-by-side viewport animation comparison (Capture: TA-IKRETARGET pending)',
    },
  ],
  boundaryTitle: 'Architectural Audit: Asset Presence vs. Internal Setup & Motion Quality',
  boundaryDescription:
    'Verified project facts are limited to the presence of RTG_NewRetargeter.uasset, stormtrooperikrig.uasset, oldmilitiryrig.uasset, and associated animation folders. Asset presence proves file existence; it does not prove original rigging, authored bone chains, retarget solver configuration, or zero-distortion motion transfer. Base skeletal meshes and animations are PROVENANCE_PENDING (folders characters/1 and ANIMATION/OldChar); setup authorship is USER_CONFIRMED: pending. Qualitative claims of "zero joint distortion" are UNVERIFIED pending recorded visual comparison.',
  provenanceNote:
    'IK Assets: Project repository asset files (RTG_NewRetargeter, stormtrooperikrig, oldmilitiryrig; USER_CONFIRMED: pending). Base skeletal meshes & animations: PROVENANCE_PENDING (Content/Core/characters/1 and Content/Core/ANIMATION/OldChar).',
  authorshipStatus: 'USER_CONFIRMED: pending',
};

export const EXHIBIT_RAGDOLL: ExhibitData = {
  id: 'EX-TA-RAGDOLL',
  shortId: 'EX-TA-RAGDOLL',
  title: 'Character Physics Asset & Joint Limit Engineering (PhAT)',
  shortTitle: 'PhAT Physics & Ragdoll',
  subtitle: 'Verified Asset File · PhAT Editor Inspection & Simulation Pending',
  category: 'Technical Art & Rigging',
  pillarId: 2,
  evidenceStatus: 'ASSET_PRESENCE_VERIFIED',
  badgeLabel: 'Asset presence verified',
  role: 'USER_CONFIRMED: pending (Technical Art & Physics Setup)',
  engine: 'Unreal Engine 5.7.4',
  tools: ['Unreal Engine 5', 'PhAT', 'Rigid Bodies', 'Angular Constraints', 'Collision Profiles'],
  summary:
    'Evaluation of character physics asset file present in the project (StormTrooper_PhysicsAsset.uasset). Inspection of internal collision bodies, joint limit constraints, collision channels, and live physics simulation in PhAT remains pending capture.',
  mediaPlaceholders: [
    {
      id: 'TA-RAGDOLL',
      label: 'PhAT Joint Physics & Simulation Video',
      duration: '15–25s PhAT simulation video',
      requirement: 'ASSET_INSPECTION_REQUIRED',
      description: 'Editor PhAT tool inspection video showing constraint angular limits and live physics simulation response under gravity and impulse.',
      whatCaptureProves: 'Validates joint hierarchy constraint limits, physics body collision setup, and simulated ragdoll response in editor.',
    },
  ],
  steps: [
    {
      title: 'Inspection Step 1: Open Physics Asset in PhAT',
      tag: 'Inspection Checklist',
      desc: 'Open StormTrooper_PhysicsAsset.uasset in Unreal Engine Physics Asset Tool (PhAT) to inspect associated skeletal mesh and skeleton bindings.',
      codeSnippet: 'PhAT Checklist: Open StormTrooper_PhysicsAsset.uasset in PhAT editor',
    },
    {
      title: 'Inspection Step 2: Inventory Body Primitives',
      tag: 'Inspection Checklist',
      desc: 'Inventory all configured rigid bodies (capsules, spheres, boxes) across the skeletal bone hierarchy in the PhAT tree hierarchy.',
      codeSnippet: 'PhAT Checklist: Inventory rigid bodies and documented bone associations in PhAT hierarchy',
    },
    {
      title: 'Inspection Step 3: Inspect Joint Constraints',
      tag: 'Inspection Checklist',
      desc: 'Inspect angular constraint limits (swing and twist limits) across joint hierarchy to verify range of motion settings.',
      codeSnippet: 'PhAT Checklist: Inspect angular constraint limits and joint mobility settings in editor',
    },
    {
      title: 'Inspection Step 4: Review Collision Responses',
      tag: 'Inspection Checklist',
      desc: 'Review collision response presets and channel settings across physics bodies for interaction with world geometry.',
      codeSnippet: 'PhAT Checklist: Review collision presets and interaction channel settings on physics bodies',
    },
    {
      title: 'Inspection Step 5: Record Live Editor Simulation',
      tag: 'Inspection Checklist',
      desc: 'Record interactive simulation test in PhAT viewport under gravity and impulse to evaluate constraint stability and ragdoll settling.',
      codeSnippet: 'PhAT Checklist: Record live PhAT simulation under gravity and impulse (Capture: TA-RAGDOLL pending)',
    },
  ],
  boundaryTitle: 'Architectural Audit: Asset File Existence vs. PhAT Tuning & Runtime Blending',
  boundaryDescription:
    'StormTrooper_PhysicsAsset.uasset proves only that a PhysicsAsset file exists in the project. It does not prove custom body creation, joint constraint limit calibration, physically stable behavior under impulse, or animation-to-ragdoll blending. Animation-to-ragdoll blending was not verified in the inspected scope. Setup authorship is USER_CONFIRMED: pending; base mesh is PROVENANCE_PENDING (folder Content/Core/characters/1).',
  provenanceNote:
    'Physics Asset: Project repository asset file (StormTrooper_PhysicsAsset.uasset; USER_CONFIRMED: pending). Character Mesh: PROVENANCE_PENDING (folder Content/Core/characters/1).',
  authorshipStatus: 'USER_CONFIRMED: pending',
};

/* =========================================================================
 * PILLAR 3: 3D ASSET PRODUCTION & PIPELINES (EVIDENCE REQUIRED)
 * ========================================================================= */

export const EXHIBIT_HARD_SURFACE: ExhibitData = {
  id: 'EX-3D-ASSET-01',
  shortId: 'EX-3D-ASSET-01',
  title: 'Blender Hard-Surface Asset Pipeline & Topology',
  shortTitle: 'Hard-Surface Modeling',
  subtitle: 'Evidence Request Card · Asset Selection & Verification Pending (Blender to UE5)',
  category: '3D Asset Pipelines',
  pillarId: 3,
  evidenceStatus: 'EVIDENCE_REQUIRED',
  badgeLabel: 'Evidence needed',
  role: 'Candidate Submission Required (3D Modeling & Pipeline)',
  engine: 'Blender 4.x → Unreal Engine 5',
  tools: ['Blender', 'Subdivision Surface', 'Bevel Modifiers', 'FBX Pipeline', 'Unreal Engine 5'],
  summary:
    'Evidence-request card for an authored hard-surface game asset. Requires an original source .blend model confirmed by Ashish Ranjan, demonstrating clean quad topology, non-destructive bevels, and standardized Unreal export scales.',
  mediaPlaceholders: [
    {
      id: '3D-TURNTABLE-01',
      label: '360° Turntable & Wireframe Turnaround',
      duration: '30s turntable video',
      requirement: 'USER_CONFIRMED: pending',
      description: 'Authored 360° turntable video with shaded, wireframe topology, and ambient occlusion passes.',
      whatCaptureProves: 'Confirms original 3D asset authorship, edge flow, absence of non-manifold geometry, and export scale.',
    },
  ],
  steps: [
    {
      title: 'Candidate Submission: Source Model File',
      tag: 'Evidence Required',
      desc: 'Submit original .blend file with intact modifier stack, non-destructive bevel modifiers, and construction history with authorship confirmation.',
      codeSnippet: 'Candidate Submission: Author-verified .blend file with intact modifier stack (Authorship confirmation required)',
    },
    {
      title: 'Review Criterion: Topology & Edge Flow Standards',
      tag: 'Review Criterion',
      desc: 'Demonstrate quad-dominant topology, clean bevel edge loops, uniform polygon density, and evaluate mesh for non-manifold geometry.',
      codeSnippet: 'Review Criterion: Quad-dominant edge loops; evaluate mesh for non-manifold geometry',
    },
    {
      title: 'Pipeline Standard: Scale & Coordinate Verification',
      tag: 'Pipeline Standard',
      desc: 'Verify Centimeter system units, unit export scale, and Z-Up / -Y Forward conversion matching Unreal Engine standards.',
      codeSnippet: 'Pipeline Standard: Centimeter units, 1.0 scene scale, Z-Up / -Y Forward coordinate alignment',
    },
    {
      title: 'Budget Standard: Polycount Documentation',
      tag: 'Budget Standard',
      desc: 'Document vertex and triangle counts against chosen target game asset budget and record the measurement.',
      codeSnippet: 'Budget Standard: Document polygon counts; record the chosen target and measurement',
    },
    {
      title: 'Candidate Deliverable: Turntable Turnaround Media',
      tag: 'Capture Deliverable',
      desc: 'Provide 360-degree turntable turnaround video recording with shaded, wireframe overlay, and neutral lighting.',
      codeSnippet: 'Deliverable: 3D-TURNTABLE-01 (30s 360° turnaround video with wireframe overlay)',
    },
  ],
  submissionRequirements: [
    'Original .blend file with modifier stack and construction hierarchy (Authorship confirmation required)',
    '360° turntable turnaround recording with wireframe overlay (3D-TURNTABLE-01)',
    'Polygon and vertex count documentation; record the chosen target and measurement',
    'Demonstrated export scale (Centimeter units, 1.0 scene scale, Z-Up / -Y Forward)',
    'Written authorship and provenance statement by Ashish Ranjan',
  ],
  boundaryTitle: 'Submission Boundary: No Authored 3D Asset Selected',
  boundaryDescription:
    'No authored hard-surface asset has been selected or confirmed by Ashish Ranjan for this portfolio pillar. This card serves as a formal evidence request. Do not claim clean topology, non-destructive bevels, non-manifold checks, or standardized FBX export settings as completed until source files and turntable media are supplied and verified.',
  provenanceNote:
    'Source Asset: Selection pending. Status is EVIDENCE_REQUIRED. Base models will require verified provenance and USER_CONFIRMED authorship before publication.',
  authorshipStatus: 'USER_CONFIRMED: pending asset selection',
};

export const EXHIBIT_TEXTURING: ExhibitData = {
  id: 'EX-3D-TEXTURING',
  shortId: 'EX-3D-TEXTURING',
  title: 'UV Optimization & PBR Texturing Pipeline',
  shortTitle: 'UV & PBR Texturing',
  subtitle: 'Evidence Request Card · Texture Maps & UV Layout Pending (Blender to UE5)',
  category: '3D Asset Pipelines',
  pillarId: 3,
  evidenceStatus: 'EVIDENCE_REQUIRED',
  badgeLabel: 'Evidence needed',
  role: 'Candidate Submission Required (Texturing & UV Layout)',
  engine: 'Blender / PBR Pipeline → Unreal Engine 5',
  tools: ['UV Unwrapping', 'Texel Density', 'PBR Metal/Roughness', 'Texture Packing', 'Unreal Engine 5'],
  summary:
    'Evidence-request card for authored UV unwrap layouts and PBR texture maps. Requires source texture sets and UV sheets demonstrating uniform texel density, optimal island packing, and non-overlapping UVs.',
  mediaPlaceholders: [
    {
      id: '3D-UV-BREAKDOWN',
      label: 'UV Layout & Checkerboard Density Sheet',
      duration: 'High-res image breakdown',
      requirement: 'USER_CONFIRMED: pending',
      description: 'High-resolution UV island packing layout, checkerboard density test, and PBR texture map channels (Albedo, Normal, ORM).',
      whatCaptureProves: 'Confirms uniform texel density across UV shells, proper seam placement, and valid PBR texture channel packing.',
    },
  ],
  steps: [
    {
      title: 'Candidate Submission: UV Island Packing Layout',
      tag: 'Evidence Required',
      desc: 'Provide UV unwrap layout demonstrating strategic seam concealment along natural hard edges, non-overlapping shells, and 0-1 UV space efficiency.',
      codeSnippet: 'Candidate Submission: UV unwrap sheet with strategic seam placement and non-overlapping shells',
    },
    {
      title: 'Review Criterion: Texel Density Uniformity Test',
      tag: 'Review Criterion',
      desc: 'Submit checkerboard viewport capture demonstrating consistent texel density across visible shells; record the chosen target and measurement.',
      codeSnippet: 'Review Criterion: Checkerboard test; record the chosen target and measurement across shells',
    },
    {
      title: 'Pipeline Standard: Texture Margin & Padding',
      tag: 'Pipeline Standard',
      desc: 'Demonstrate adequate texture bleeding margin between UV islands to prevent mipmap bleed artifacts in engine.',
      codeSnippet: 'Pipeline Standard: Document island gutter padding to prevent mipmap bleed artifacts',
    },
    {
      title: 'PBR Deliverable: Authored Texture Channel Maps',
      tag: 'PBR Maps',
      desc: 'Provide authored PBR texture maps: BaseColor (sRGB), Normal (DirectX tangent space), Roughness, and Metallic.',
      codeSnippet: 'PBR Deliverable: Authored BaseColor, Normal, Roughness, and Metallic maps',
    },
    {
      title: 'Engine Optimization: ORM Channel Packing Configuration',
      tag: 'Engine Optimization',
      desc: 'Document texture channel packing, combining Ambient Occlusion (R), Roughness (G), and Metallic (B) into a single ORM texture sampler for Unreal Engine.',
      codeSnippet: 'Packed Shaders: Packed ORM Map (R: Occlusion, G: Roughness, B: Metallic) reducing texture samplers',
    },
  ],
  submissionRequirements: [
    'High-resolution UV sheet export showing island layout and padding margins (Authorship confirmation required)',
    'Checkerboard density viewport test; record the chosen target and measurement (3D-UV-BREAKDOWN)',
    'Source PBR texture map set (BaseColor, Normal, Roughness, Metallic, AO)',
    'Documented texture resolution and target texel density measurement',
    'Written authorship confirmation by Ashish Ranjan',
  ],
  boundaryTitle: 'Submission Boundary: No Authored Texture Set Selected',
  boundaryDescription:
    'No authored texture maps or UV layouts have been selected or confirmed by Ashish Ranjan. This card is a formal evidence request. Do not claim uniform texel density, optimized UV packing, ORM channel packing, or custom PBR texturing as completed until source texture files and UV test captures are supplied and verified.',
  provenanceNote:
    'Texture Assets: Selection pending. Status is EVIDENCE_REQUIRED. Texture sets will require verified provenance and USER_CONFIRMED authorship before publication.',
  authorshipStatus: 'USER_CONFIRMED: pending asset selection',
};

// Aliases for backward compatibility
export const EXHIBIT_ROUND = EXHIBIT_LIFECYCLE;
export const EXHIBIT_EMOTES = EXHIBIT_CUSTOMIZATION;

export const ALL_EXHIBITS: ExhibitData[] = [
  EXHIBIT_TRANSFORM,
  EXHIBIT_DECOY,
  EXHIBIT_COMBAT,
  EXHIBIT_AUDIO,
  EXHIBIT_LIFECYCLE,
  EXHIBIT_CUSTOMIZATION,
  EXHIBIT_IKRETARGET,
  EXHIBIT_RAGDOLL,
  EXHIBIT_HARD_SURFACE,
  EXHIBIT_TEXTURING,
];

export const EXHIBITS_MAP: Record<string, ExhibitData> = {
  'sheeshh-prop-hunt': EXHIBIT_TRANSFORM,
  'EX-PH-TRANSFORM': EXHIBIT_TRANSFORM,
  'EX-PH-DECOY': EXHIBIT_DECOY,
  'EX-PH-COMBAT': EXHIBIT_COMBAT,
  'EX-PH-AUDIO': EXHIBIT_AUDIO,
  'EX-PH-LIFECYCLE': EXHIBIT_LIFECYCLE,
  'EX-PH-CUSTOMIZATION': EXHIBIT_CUSTOMIZATION,
  'EX-TA-IKRETARGET': EXHIBIT_IKRETARGET,
  'EX-TA-RAGDOLL': EXHIBIT_RAGDOLL,
  'EX-3D-ASSET-01': EXHIBIT_HARD_SURFACE,
  'EX-3D-TEXTURING': EXHIBIT_TEXTURING,
  // Aliases retained for backward compatibility
  'EX-PH-ROUND': EXHIBIT_LIFECYCLE,
  'EX-PH-EMOTES': EXHIBIT_CUSTOMIZATION,
};

export const EXHIBIT_INDEX: ExhibitIndexItem[] = ALL_EXHIBITS.map((e) => ({
  id: e.id,
  shortId: e.shortId,
  title: e.title,
  shortTitle: e.shortTitle,
  subtitle: e.subtitle,
  summary: e.summary,
  engine: e.engine,
  pillarId: e.pillarId,
  evidenceStatus: e.evidenceStatus,
  badgeLabel: e.badgeLabel,
}));

// Backwards compatibility export
export const FEATURED_PROP_HUNT = EXHIBIT_TRANSFORM;
