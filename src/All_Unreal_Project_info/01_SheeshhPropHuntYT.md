> Current survey: 2026-10-11. Ashish confirms the included project folders are his workspaces. File presence and source inspection do not establish individual asset authorship, successful runtime, release status or commercial delivery. Older narrative below is retained as reference; current-inventory.json and 08_Current_Survey.md take precedence.

# SheeshhPropHuntYT — Prop Hunt Multiplayer Game

**Engine:** Unreal Engine 5.7
**Path:** `G:\Unreal Projects\SheeshhPropHuntYT\`
**Project File:** `SheeshhPropHuntYT.uproject`
**Disk Size:** ~47.4 GB
**Module Type:** Runtime C++ Module
**Status:** Primary portfolio project — VERIFIED_IMPLEMENTATION

---

## Project Summary

An asymmetric online multiplayer prop-hunt game built in Unreal Engine 5.7. Players take the role of either a prop (disguising as environment objects) or a hunter (finding and eliminating disguised props). The project includes a custom C++ runtime module, Blueprint gameplay systems, modular character customization, networked VOIP, and a developer debug overlay.

---

## C++ Source Files

**Location:** `Source/SheeshhPropHuntYT/`

```
Source/
├── SheeshhPropHuntYT.Target.cs        — Game target build rules
├── SheeshhPropHuntYTEditor.Target.cs  — Editor target build rules
└── SheeshhPropHuntYT/
    ├── SheeshhPropHuntYT.Build.cs     — Module dependency rules (Core, Engine, OnlineSubsystem, Voice)
    ├── SheeshhPropHuntYT.h / .cpp     — Module registration (IMPLEMENT_PRIMARY_GAME_MODULE)
    ├── MyClass.h / .cpp               — Stub placeholder class
    ├── Public/
    │   ├── VOIPLIB.h                  — UBlueprintFunctionLibrary: ClearVoicePackets()
    │   └── DebugMenuLib.h             — UBlueprintFunctionLibrary: IsDeveloperDebugAllowed(), GetDeveloperDebugInfo()
    └── Private/
        ├── VOIPLIB.cpp                — OnlineSubsystem voice interface packet flusher
        └── DebugMenuLib.cpp           — Compile-time Shipping guard; FPS, NetMode, ping, player count via GameState
```

### VOIPLIB — Voice Packet Flusher

```cpp
// VOIPLIB.h
UCLASS()
class SHEESHHPROPHUNTYT_API UVOIPLIB : public UBlueprintFunctionLibrary
{
    GENERATED_BODY()
public:
    UFUNCTION(BlueprintCallable, Category = "VOIPLIB")
    static void ClearVoicePackets(UObject* WorldContextObject);
};
```

**What it does:** Queries `IOnlineSubsystem` -> `IOnlineVoicePtr` and calls `ClearVoicePackets()` to flush the voice buffer. Used to prevent voice packets from dead players bleeding into the next round.

**Dependencies:** `OnlineSubsystem`, `OnlineSubsystemUtils`, `Interfaces/VoiceInterface.h`

---

### DebugMenuLib — Developer Diagnostics

```cpp
USTRUCT(BlueprintType)
struct FDeveloperDebugInfo
{
    bool bIsAvailable;
    float CurrentFPS;        // GAverageFPS
    float FrameTimeMs;       // GAverageMS
    FString CurrentMap;      // World->GetMapName()
    FString NetMode;         // Standalone / DedicatedServer / ListenServer / Client
    FString LocalEngineRole; // Authority / AutonomousProxy / SimulatedProxy
    int32 PlayerCount;       // GameState->PlayerArray.Num(), or -1 if unavailable
    int32 PingMs;            // PlayerState->GetPingInMilliseconds()
    FString BuildConfiguration; // Editor / Development / Debug / Test
};
```

**What it does:** Non-invasive read-only diagnostics exposed to Blueprints. Completely disabled in Shipping builds via `#if UE_BUILD_SHIPPING`. Used in a developer overlay HUD in-game.

---

## Build Module Dependencies

From `SheeshhPropHuntYT.Build.cs`:

```csharp
// Public (runtime)
"Core", "CoreUObject", "Engine", "InputCore"

// Private
"OnlineSubsystem", "OnlineSubsystemUtils", "Voice"

// Dynamic (Steam loaded at runtime)
"OnlineSubsystemSteam"
```

---

## Plugins Enabled

| Plugin | Purpose |
|---|---|
| `Monolith` | Editor-only — Blueprint inspection MCP |
| `ModelingToolsEditorMode` | Editor mesh editing tools |
| `GameplayStateTree` | State tree framework |
| `AIAssistant` | AI editor integration |

---

## Content Directory Structure

```
Content/
├── Core/
│   ├── ANIMATION/
│   │   ├── Miximo/
│   │   │   ├── AssasinChar/         — Mixamo character animations
│   │   │   └── Manny_retargeted/    — Manny retargeted animation set
│   │   └── OldChar/
│   │       ├── locomotion/          — Locomotion animation sequences
│   │       └── rifleanim/           — Rifle animation sequences
│   ├── BluePrints/
│   │   ├── Interfaces/              — Blueprint interfaces (BPI_*)
│   │   └── thirdpersontemplate/     — Third-person template BPs
│   ├── characters/
│   │   └── 1/                       — Character skeletal meshes (PROVENANCE_PENDING)
│   ├── images/
│   │   └── Gifsadd/                 — UI GIF images
│   ├── Map/                         — Level maps
│   ├── prop/                        — Prop static meshes
│   ├── sound/
│   │   └── Settings/                — Audio settings/VOIP assets (SA_VOIP.uasset)
│   └── Widgets/
│       ├── MainMenu/
│       │   ├── Data/                — Data assets for menus
│       │   └── UI/                  — UMG widget Blueprints
│       ├── mainmenuvideo/           — Video textures for main menu
│       └── texture/                 — Widget texture atlas
├── resources/
│   ├── Construction_VOL1/           — Prop meshes (PROVENANCE_PENDING)
│   ├── Downtown_West/               — Environment level pack (PROVENANCE_PENDING)
│   │   ├── Blueprints/
│   │   ├── Maps/
│   │   ├── Materials/
│   │   ├── Meshes/
│   │   ├── Textures/
│   │   └── VFX/
│   ├── Man/                         — Character mesh pack
│   ├── QuantumCharacter/            — Alternative character mesh
│   ├── Stylized_Egypt/              — Alternative map pack
│   ├── ThirdPerson/Blueprints/VOIP/ — VOIP-specific BPs
│   └── WeaponSniper/                — Sniper weapon asset pack
├── StarterContent/                  — UE Starter Content
└── ThirdPerson/Blueprints/          — Third-person template
```

---

## Key Blueprint Classes

### BP_propChar — Prop Player Character
The prop player's character Blueprint. Contains the core disguise and decoy system logic.

**Key systems inspected:**
- `IA_ChangeProp` → `SphereTraceSingle` → `ChangePropOnServer` (Server RPC)
- `PropChangesLeft` (max 10) resource accounting
- `Array_Contains(PropAllowedMesh)` validation
- `UpdateMeshMulticast` → `SetStaticMesh` replication
- `MeshWithFAlsePivot` array → `K2_SetRelativeLocation` pivot correction
- `IA_SpawnProp` → `Spawnproponserver` → `SpawnActor(BP_SPawnedProp)` decoy system
- `SpawnPropsLeft` (max 5) decoy resource accounting
- Health system → `SetActorEnableCollision(false)` → `SpawnActor(BP_SpectatorPawn)` → Possess on elimination

### BP_ThirdPersonCharacter — Hunter Player Character
The hunter's character Blueprint. Contains the weapon firing and VOIP logic.

**Key systems inspected:**
- `StartFireOnServer` → `SetTimerByFunctionName(FireRifle, 0.1s, Looping=true)`
- Client RPC `"get clientCamera Action"` → `LineTraceOnserver(CamLoc, CamRot)`
- `F_RifleLinerace` → `LineTraceByChannel` execution on server
- `MulticastFireEvnt` (recoil montage) + `MulticasttHitEffict` (particles)
- `Controller->PlayrossairHit()` crosshair hit feedback
- `ApplyDamage` to `ActorHasTag("prop")` targets
- `UVOIPTalker` component registration → `Multicast_InitVOIP(VoiceMode)`
- `Server_Emote` → `Multicast_Emote` dance animations
- `Server_costumeChange` → `Multicast_CostumeChange` modular mesh swaps
- Leader Pose Component for Body/Hands/Helmet modular armor

### GM_ProphuntGameMode — Server Game Mode
Server-authoritative GameMode controlling match lifecycle.

**Key systems inspected:**
- `PostLogin` → Team assignment (Props vs Seekers) → `SeekerCount` increment
- Preparation timer (freezes hunters while props disperse)
- `UW_MainHUD` creation with replicated bindings
- Kill feed `WBP_KillFeedItem` widget broadcasting
- Win condition evaluation → `ServerTravel(NextMap)`

### BP_SPawnedProp — Decoy Actor
The spawned decoy static mesh actor placed by prop players.

**Key systems inspected:**
- `MulticastSetMesh` → `SetStaticMesh` replication across clients
- `SetSimulatePhysics(true)` → physics settling on spawn

### BP_SpectatorPawn — Spectator
Spawned on prop elimination; possessed by eliminated player.

### BP_ThirdPersonPlayerController — Player Controller
Manages HUD creation (`UW_MainHUD`), kill feed display, and VOIP talker registration.

---

## Audio System

- **SA_VOIP.uasset** — Attenuation sound asset
  - Inner Radius: 400.0
  - Falloff Distance: 2400.0
  - Spatialization: Binaural
- `TauntSoundz` array — randomized spatial taunt sound cues
- 1.0s cooldown gate on taunt input (`IA_Taunt`)
- `TauntsOnServer` → `TauntsMulticast` → `SpawnSoundAtLocation`

---

## Online / Multiplayer

- **OnlineSubsystem:** Steam (via `OnlineSubsystemSteam`)
- **steam_appid.txt:** 480 (Spacewar placeholder ID)
- **Session Plugins Confirmed:**
  - `OnlineSubsystem`
  - `OnlineSubsystemSteam` (dynamically loaded)
- **Match Type:** Listen Server (host plays + serves)
- **Replication Pattern:** Server RPC → Server authority → Multicast to clients

---

## Config Files

| File | Size | Purpose |
|---|---|---|
| `DefaultEngine.ini` | 3.7 KB | Engine settings, input/online config |
| `DefaultGame.ini` | 3.7 KB | Game class, map routing |
| `DefaultInput.ini` | 10 KB | Enhanced Input mappings |
| `DefaultEditor.ini` | 54.5 KB | Editor tool settings |

---

## IK Rig & Physics Assets (Pillar 2 — ASSET_PRESENCE_VERIFIED)

| Asset | Type | Notes |
|---|---|---|
| `RTG_NewRetargeter.uasset` | IK Retargeter | Retargets animation between disparate skeletons |
| `stormtrooperikrig.uasset` | IK Rig | Source IK rig for stormtrooper character |
| `oldmilitiryrig.uasset` | IK Rig | Source IK rig for old military character |
| `StormTrooper_PhysicsAsset.uasset` | Physics Asset | Rigid body collision + joint constraints for character |

**Evidence status:** ASSET_PRESENCE_VERIFIED — files confirmed in project; internal PhAT configuration and retarget chain mapping require editor capture to verify.

---

## Evidence Status Summary

| System | Status | Notes |
|---|---|---|
| Prop Disguise & Pivot Offset | VERIFIED_IMPLEMENTATION | Blueprint graphs inspected in detail |
| Decoy Placement | VERIFIED_IMPLEMENTATION | Blueprint graphs inspected in detail |
| Hunter Ballistics & Spectator | VERIFIED_IMPLEMENTATION | Blueprint graphs inspected in detail |
| Positional Taunts & VOIP | VERIFIED_IMPLEMENTATION | C++ + Blueprint both inspected |
| Asymmetric Round Lifecycle | VERIFIED_IMPLEMENTATION | Blueprint graphs inspected in detail |
| Modular Customization & Emotes | VERIFIED_IMPLEMENTATION | Blueprint graphs inspected in detail |
| IK Rig & Retargeter | ASSET_PRESENCE_VERIFIED | Asset files confirmed; editor inspection pending |
| Physics Asset (PhAT) | ASSET_PRESENCE_VERIFIED | Asset file confirmed; simulation capture pending |
| VOIP C++ Source | VERIFIED_IMPLEMENTATION | Full source code read and documented |
| Debug Menu C++ Source | VERIFIED_IMPLEMENTATION | Full source code read and documented |

---

## Provenance Notes

- **Gameplay Blueprints (BP_propChar, BP_ThirdPersonCharacter, GM_ProphuntGameMode):** Project repository logic — USER_CONFIRMED: pending
- **Environment (Downtown_West, Stylized_Egypt, Construction_VOL1):** PROVENANCE_PENDING — marketplace/third-party packs
- **Character meshes & animations (Content/Core/characters/1, ANIMATION/):** PROVENANCE_PENDING
- **Audio (Content/Core/sound/):** PROVENANCE_PENDING
- **C++ custom code (VOIPLIB, DebugMenuLib):** Authored code — USER_CONFIRMED: pending
