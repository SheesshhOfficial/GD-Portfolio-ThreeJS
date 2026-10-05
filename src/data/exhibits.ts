import { ExhibitData } from '../types/portfolio';

export const EXHIBIT_TRANSFORM: ExhibitData = {
  id: 'sheeshh-prop-hunt',
  shortId: 'EX-PH-TRANSFORM',
  title: 'Real-Time Prop Disguise & Pivot Offset Architecture',
  shortTitle: 'Prop Disguise & Pivot',
  subtitle: 'Inspected Blueprint graph analysis · Unreal Engine 5.7.4 (BP_propChar)',
  category: 'Gameplay Mechanics & Replication',
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
      codeSnippet: 'IA_SpawnProp -> Spawnproponserver(Reliable Server RPC)',
    },
    {
      title: 'Step 2: Resource Accounting & Limit Validation',
      tag: 'Server Validation',
      desc: 'Server evaluates SpawnPropsLeft against MaxSpawnProps = 5. If capacity remains, the counter decrements and placement proceeds.',
      codeSnippet: 'Spawnproponserver -> Check(SpawnPropsLeft > 0) -> Decrement(SpawnPropsLeft)',
    },
    {
      title: 'Step 3: Decoy Actor Spawning',
      tag: 'Server Spawn',
      desc: 'Server reads player current location and forward transform to spawn an instance of BP_SPawnedProp into the world.',
      codeSnippet: 'GetActorTransform -> SpawnActor(BP_SPawnedProp)',
    },
    {
      title: 'Step 4: Disguise Mesh Synchronization',
      tag: 'Multicast Mesh Setup',
      desc: 'Server queries active prop disguise mesh and invokes MulticastSetMesh on the spawned actor to visually match the player prop.',
      codeSnippet: 'GetActivePropMesh -> MulticastSetMesh(TargetMesh)',
    },
    {
      title: 'Step 5: Physics Simulation & Collision Profile',
      tag: 'Physics Settling',
      desc: 'BP_SPawnedProp contains simulated-physics and collision-profile setup. The resulting drop and settling behavior remains runtime capture pending.',
      codeSnippet: 'BP_SPawnedProp -> Physics Simulation Setup -> Collision Profile Setup',
    },
  ],
  boundaryTitle: 'Architectural Audit: Decoy Placement, Limit Enforcement & Destruction Authority',
  boundaryDescription:
    'Inspection verifies the Spawnproponserver RPC, MaxSpawnProps = 5 bounding check, BP_SPawnedProp spawning, and MulticastSetMesh Blueprint structures. However, runtime decoy placement, physics settling behavior, hunter interaction, and authority over decoy destruction (Server_DestroyFakeProp configured as owning-client RPC in metadata vs direct Destroy Actor) remain capture pending and classified as UNVERIFIED at runtime.',
  provenanceNote:
    'Spawning & replication Blueprints: Project repository logic (USER_CONFIRMED: pending). Decoy mesh: Inherited from active prop disguise (PROVENANCE_PENDING).',
  authorshipStatus: 'USER_CONFIRMED: pending',
};

export const EXHIBIT_COMBAT: ExhibitData = {
  id: 'EX-PH-COMBAT',
  shortId: 'EX-PH-COMBAT',
  title: 'Hunter Ballistics, Hit Registration & Elimination Flow',
  shortTitle: 'Hunter Ballistics & Damage',
  subtitle: 'Inspected Blueprint graph analysis · Unreal Engine 5.7.4 (BP_ThirdPersonCharacter, BP_propChar)',
  category: 'Combat & Damage Systems',
  role: 'USER_CONFIRMED: pending (Gameplay Programming)',
  engine: 'Unreal Engine 5.7.4',
  tools: ['Blueprints', 'Enhanced Input', 'Replication', 'Particle Systems'],
  summary:
    'A networked hit-scan firing loop utilizing server-managed timers, client-informed camera traces, multicast visual and particle feedback, authority-checked damage deduction, and automated spectator pawn possession upon player elimination.',
  mediaPlaceholders: [
    {
      id: 'PH-COMBAT',
      label: 'Hunter Combat & Spectating Reel',
      duration: '20–25s split-screen video',
      requirement: 'RUNTIME_VERIFIED',
      description: 'Synchronized shooter crosshair feedback alongside victim health depletion, collision disabling, and spectator flight transition.',
      whatCaptureProves: 'Demonstrates crosshair hit markers, networked health deduction, and spectator pawn transition upon fatal damage.',
    },
  ],
  steps: [
    {
      title: 'Step 1: Networked Firing Timer Loop',
      tag: 'Server RPC Loop',
      desc: 'Player input triggers Server RPC StartFireOnServer, starting a 0.1-second looping timer handle (FireTimer) bound to FireRifle. Releasing fire invokes StopFireOnServer to clear the timer.',
      codeSnippet: 'StartFireOnServer(Reliable) -> SetTimerByFunctionName(FireRifle, 0.1s, Looping) / StopFireOnServer -> ClearTimer',
    },
    {
      title: 'Step 2: Client Camera Transform Query',
      tag: 'Client RPC Query',
      desc: 'FireRifle invokes client RPC get clientCamera Action. The owning client queries player camera manager coordinates and returns camera location and rotation via LineTraceOnserver.',
      codeSnippet: 'FireRifle -> ClientRPC: get clientCamera Action -> LineTraceOnserver(CameraLocation, CameraRotation)',
    },
    {
      title: 'Step 3: Server Line Trace Execution',
      tag: 'Server Raycast',
      desc: 'Server executes function F_RifleLinerace, casting Line Trace By Channel along the client-provided forward vector scaled by bulletDistance to detect hit targets.',
      codeSnippet: 'F_RifleLinerace -> LineTraceByChannel(TraceChannel1, CameraLocation, CameraLocation + (Forward * bulletDistance))',
    },
    {
      title: 'Step 4: Multicast FX & Crosshair Reaction',
      tag: 'Multicast Feedback',
      desc: 'Server triggers MulticastFireEvnt (rifle animations) and MulticasttHitEffict (muzzle and hit particles). When hit actor has tag "prop", server notifies hunter controller via PlayrossairHit.',
      codeSnippet: 'ActorHasTag("prop") == True -> PlayrossairHit() + MulticasttHitEffict(HitLocation, HitNormal)',
    },
    {
      title: 'Step 5: Health Deduction & Spectator Transition',
      tag: 'Elimination Hand-off',
      desc: 'Server applies engine Apply Damage to BP_propChar. Behind authority checks, Health decrements. At Health <= 0, collision is disabled (SetActorEnableCollision = false), mesh is hidden, and client spawns and possesses BP_SpectatorPawn.',
      codeSnippet: 'ApplyDamage -> Event AnyDamage -> SetActorEnableCollision(false) -> SpawnActor(BP_SpectatorPawn) -> Possess()',
    },
  ],
  boundaryTitle: 'Architectural Audit: Client-Informed Vectors & Lag Compensation',
  boundaryDescription:
    'Inspection confirms combat line traces rely on client-supplied camera coordinates (CameraLocation, CameraRotation). Server-side historical rewind buffers, rolling circular position history, tick timestamp indexing, and backward lag compensation were not found in the inspected graphs/files/scope. Traces execute immediately at current server world state. Runtime multiplayer authority and hit accuracy under latency remain UNVERIFIED.',
  provenanceNote:
    'Combat Blueprints: Project repository logic (USER_CONFIRMED: pending). Rifle mesh and firing animations: PROVENANCE_PENDING.',
  authorshipStatus: 'USER_CONFIRMED: pending',
};

export const EXHIBIT_AUDIO: ExhibitData = {
  id: 'EX-PH-AUDIO',
  shortId: 'EX-PH-AUDIO',
  title: 'Positional Taunts & Networked VOIP Pipeline',
  shortTitle: 'Positional Audio & VOIP',
  subtitle: 'Inspected C++ & Blueprint analysis · Unreal Engine 5.7.4 (VOIPLIB, BP_propChar, BP_ThirdPersonCharacter)',
  category: 'Audio Systems & Subsystems',
  role: 'USER_CONFIRMED: pending (C++ Programming & Audio Integration)',
  engine: 'Unreal Engine 5.7.4',
  tools: ['C++', 'IOnlineSubsystem', 'Blueprints', 'Sound Attenuation'],
  summary:
    'Networked 3D spatialized prop audio taunts with cooldown rate-limiting, custom C++ voice packet buffer clearing interfacing with IOnlineSubsystem, and hunter proximity voice component registration.',
  mediaPlaceholders: [
    {
      id: 'PH-AUDIO',
      label: 'Spatial Audio & VOIP Demonstration',
      duration: '20–30s gameplay clip with audio',
      requirement: 'RUNTIME_VERIFIED',
      description: 'Audio capture showing directional sound falloff relative to hunter distance, cooldown throttling, and voice mode switching.',
      whatCaptureProves: 'Demonstrates 3D spatial panning, attenuation curves, taunt cooldown enforcement, and voice channel mode synchronization.',
    },
  ],
  steps: [
    {
      title: 'Step 1: Taunt Input & Multicast Dispatch',
      tag: 'Server RPC Broadcast',
      desc: 'Prop player presses IA_Taunt, invoking Reliable Server RPC TauntsOnServer. Server validates cooldown and broadcasts TauntsMulticast to all network clients to Spawn Sound at Location.',
      codeSnippet: 'IA_Taunt -> TauntsOnServer(Reliable) -> TauntsMulticast(NetMulticast) -> Spawn Sound at Location',
    },
    {
      title: 'Step 2: Cooldown Throttling & Randomization',
      tag: 'Rate Limiting',
      desc: 'Randomized sound cues are selected from the TauntSoundz array. A 1.0-second delay barrier and an automated periodic timer prevent spamming while keeping props findable.',
      codeSnippet: 'RandomIntegerInRange(0, TauntSoundz.Num()) -> PlaySound -> Delay(1.0s) -> ResetCooldown',
    },
    {
      title: 'Step 3: Hunter VOIP Component Binding',
      tag: 'Component Setup',
      desc: 'Hunter character initializes UVOIPTalker component via Multicast_InitVOIP, sets replicated VoiceMode state, and binds Client_CloseVoiceLine for channel management.',
      codeSnippet: 'Multicast_InitVOIP -> RegisterTalker(UVOIPTalker) -> SetReplicatedVoiceMode(VoiceMode)',
    },
    {
      title: 'Step 4: Spatial Attenuation Asset Configuration',
      tag: 'Spatial Audio',
      desc: 'Positional sound falloff and spatial spread are governed by the SA_VOIP.uasset attenuation profile, defining distance thresholds for directional audio rendering.',
      codeSnippet: 'SpawnSoundAtLocation(Sound, Location, AttenuationSettings = SA_VOIP)',
    },
    {
      title: 'Step 5: C++ Voice Packet Buffer Clearing',
      tag: 'C++ Subsystem Call',
      desc: 'C++ helper UVOIPLIB::ClearVoicePackets retrieves the online voice interface from IOnlineSubsystem and flushes pending packet buffers between rounds.',
      codeSnippet: 'IOnlineVoicePtr Voice = Online::GetVoiceInterface(Subsystem); if (Voice.IsValid()) Voice->ClearVoicePackets();',
    },
  ],
  boundaryTitle: 'Architectural Audit: VOIP Scope & Audio Processing Limits',
  boundaryDescription:
    'Inspection confirms UVOIPLIB contains only the static ClearVoicePackets method. Low-level audio buffer monitoring, voice capture activity state analysis, automated spectate voice routing, logarithmic falloff curves, and geometric line-trace occlusion filtering were not found in the inspected UVOIPLIB and inspected graphs/files/scope. Audio spatialization relies on standard engine attenuation settings without custom occlusion sweeps. These claims are classified as UNVERIFIED.',
  provenanceNote:
    'C++ VOIP Library: Project repository source (USER_CONFIRMED: pending). Audio clips: PROVENANCE_PENDING (files in Content/Core/sound).',
  authorshipStatus: 'USER_CONFIRMED: pending',
};

export const EXHIBIT_LIFECYCLE: ExhibitData = {
  id: 'EX-PH-LIFECYCLE',
  shortId: 'EX-PH-LIFECYCLE',
  title: 'Asymmetric Round Lifecycle & Replicated Game State',
  shortTitle: 'Round Lifecycle & HUD',
  subtitle: 'Inspected Blueprint graph analysis · Unreal Engine 5.7.4 (GM_ProphuntGameMode, BP_ThirdPersonPlayerController)',
  category: 'Game Mode & Multiplayer State',
  role: 'USER_CONFIRMED: pending (Gameplay Systems & UI Integration)',
  engine: 'Unreal Engine 5.7.4',
  tools: ['Blueprints', 'GameMode', 'UMG UI', 'PlayerState Replication'],
  summary:
    'Round management structure found in the inspected Blueprint graphs, including connected-player tracking, team partitioning into Props and Seekers, SeekerCount tracking, countdown handling, replicated player identity and voice state, and controller-to-UMG HUD plumbing.',
  mediaPlaceholders: [
    {
      id: 'PH-ROUNDFLOW',
      label: 'Round Lifecycle & HUD Telemetry Reel',
      duration: '30–40s HUD sync video',
      requirement: 'RUNTIME_VERIFIED',
      description: 'Multi-client recording showing lobby transition, role assignment, live countdown sync, kill feed updates, and victory screen resolution.',
      whatCaptureProves: 'Demonstrates round timer synchronization across clients, alive-player counter updates, and match termination.',
    },
  ],
  steps: [
    {
      title: 'Step 1: Connected Player Tracking & Team Partitioning',
      tag: 'GameMode Structure',
      desc: 'GM_ProphuntGameMode tracks connected players, partitions players into Props and Seekers, maintains SeekerCount, and controls match countdowns.',
      codeSnippet: 'GM_ProphuntGameMode -> Track Connected Players -> Partition (Props vs Seekers) -> SeekerCount -> Match Countdown',
    },
    {
      title: 'Step 2: Replicated Player Identity & Voice State',
      tag: 'PlayerState Replication',
      desc: 'PlayerState01 replicates persistent player identity, team assignment, and voice communication mode across network clients.',
      codeSnippet: 'PlayerState01 -> Replicate Player Identity -> Replicate Team Assignment -> Replicate VoiceMode',
    },
    {
      title: 'Step 3: Controller Event Dispatch to UMG',
      tag: 'Controller Plumbing',
      desc: 'BP_ThirdPersonPlayerController receives server state notifications and drives UMG interface widgets (UW_MainHUD, WBP_InGame, WBP_PlayerList).',
      codeSnippet: 'BP_ThirdPersonPlayerController -> Gameplay Notifications -> UW_MainHUD / WBP_InGame / WBP_PlayerList',
    },
    {
      title: 'Step 4: Alive-Prop Tracking & Kill Feed',
      tag: 'Dynamic UI Plumbing',
      desc: 'Eliminations trigger dynamic entries in WBP_KillFeedItem, decrement the alive-prop count, and refresh the active player roster.',
      codeSnippet: 'Elimination Event -> Decrement Alive Props -> WBP_KillFeedItem Entry -> Refresh Player Roster',
    },
    {
      title: 'Step 5: Victory Screens & Map Travel',
      tag: 'Match Resolution',
      desc: 'When all props are eliminated or the round timer expires, the GameMode triggers victory-screen overlays and map-travel handling.',
      codeSnippet: 'Zero Alive Props OR Countdown Expiry -> Trigger Victory Screen -> Map Travel Handling',
    },
  ],
  boundaryTitle: 'Architectural Audit: Multiplayer State Persistence & Travel',
  boundaryDescription:
    'GameMode round-management structure was found in the inspected Blueprint graphs; runtime multiplayer behavior remains capture pending. Multi-client state synchronization across latency spikes, client reconnects, multi-round persistence, and travel handoffs remain unverified at runtime. Public presentation frames verified state machine nodes while marking runtime delivery as CAPTURE_PENDING.',
  provenanceNote:
    'GameMode & Controller Blueprints: Project repository logic (USER_CONFIRMED: pending). UMG textures and UI assets: PROVENANCE_PENDING (Content/Core/Widgets/texture).',
  authorshipStatus: 'USER_CONFIRMED: pending',
};

export const EXHIBIT_CUSTOMIZATION: ExhibitData = {
  id: 'EX-PH-CUSTOMIZATION',
  shortId: 'EX-PH-CUSTOMIZATION',
  title: 'Modular Character Customization & Networked Emotes',
  shortTitle: 'Emotes & Modular Armor',
  subtitle: 'Inspected Blueprint graph analysis · Unreal Engine 5.7.4 (BP_ThirdPersonCharacter, Leader Pose)',
  category: 'Animation & Modular Systems',
  role: 'USER_CONFIRMED: pending (Animation Integration & Replication)',
  engine: 'Unreal Engine 5.7.4',
  tools: ['Blueprints', 'Skeletal Meshes', 'Leader Pose Component', 'Animation Montages'],
  summary:
    'Networked animation montage playback for character emotes and modular mesh synchronization using Blueprint Set Leader Pose Component structure for Body, Hands, and Helmet attachments.',
  mediaPlaceholders: [
    {
      id: 'PH-CUSTOMIZATION',
      label: 'Dual-Client Emote & Cosmetic Reel',
      duration: '15–20s dual-client video',
      requirement: 'RUNTIME_VERIFIED',
      description: 'Two-player recording demonstrating synchronized emote playback without montage desync and dynamic modular armor piece attachment.',
      whatCaptureProves: 'Demonstrates networked montage replication and modular mesh deformation bound via Set Leader Pose Component.',
    },
  ],
  steps: [
    {
      title: 'Step 1: Networked Emote RPC Chain',
      tag: 'Multicast Montage',
      desc: 'Client input invokes Server_Emote RPC. The server broadcasts Multicast_Emote to trigger PlayAnimMontage across client proxies.',
      codeSnippet: 'IA_Emote -> Server_Emote -> Multicast_Emote -> PlayAnimMontage',
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
];

export const EXHIBITS_MAP: Record<string, ExhibitData> = {
  'sheeshh-prop-hunt': EXHIBIT_TRANSFORM,
  'EX-PH-TRANSFORM': EXHIBIT_TRANSFORM,
  'EX-PH-DECOY': EXHIBIT_DECOY,
  'EX-PH-COMBAT': EXHIBIT_COMBAT,
  'EX-PH-AUDIO': EXHIBIT_AUDIO,
  'EX-PH-LIFECYCLE': EXHIBIT_LIFECYCLE,
  'EX-PH-CUSTOMIZATION': EXHIBIT_CUSTOMIZATION,
  // Aliases retained for backward compatibility
  'EX-PH-ROUND': EXHIBIT_LIFECYCLE,
  'EX-PH-EMOTES': EXHIBIT_CUSTOMIZATION,
};

export interface ExhibitIndexItem {
  id: string;
  shortId: string;
  title: string;
  subtitle: string;
  summary: string;
  engine: string;
}

export const EXHIBIT_INDEX: ExhibitIndexItem[] = ALL_EXHIBITS.map((e) => ({
  id: e.id,
  shortId: e.shortId,
  title: e.title,
  subtitle: e.subtitle,
  summary: e.summary,
  engine: e.engine,
}));

// Backwards compatibility export
export const FEATURED_PROP_HUNT = EXHIBIT_TRANSFORM;
