> Current survey: 2026-10-11. Ashish confirms the included project folders are his workspaces. File presence and source inspection do not establish individual asset authorship, successful runtime, release status or commercial delivery. Older narrative below is retained as reference; current-inventory.json and 08_Current_Survey.md take precedence.

# Procedural_Gen — Procedural Dungeon Generator with Steam Multiplayer

**Engine:** Unreal Engine 5.8
**Path:** `G:\Unreal Projects\Procedural_Gen\`
**Project File:** `Procedural_Gen.uproject`
**Disk Size:** ~17.2 GB
**Module Type:** Runtime C++ Module (`LoadingPhase: PreDefault`)
**Status:** Active development — significant C++ authorship

---

## Project Summary

A procedural dungeon generation game with Steam multiplayer lobby support, built on UE 5.8. Features a C++ room-based generation algorithm that spawns diverse dungeon rooms from a template library, handles collision trials, and caps open doorways. Includes a full Steam session management subsystem and a server browser with lobby codes.

---

## C++ Source File Tree (42 Files)

```
Source/
├── Procedural_Gen.Target.cs
├── Procedural_GenEditor.Target.cs
└── Procedural_Gen/
    ├── Procedural_Gen.Build.cs              — Module dependencies
    ├── Procedural_Gen.h / .cpp              — Module registration
    ├── Procedural_GenCharacter.h / .cpp     — Player character
    ├── Procedural_GenGameMode.h / .cpp      — Game mode
    ├── Procedural_GenPlayerController.h / .cpp
    │
    ├── DungeonGenerator.h / .cpp            — Core procedural dungeon system
    ├── RoomBase.h / .cpp                    — Base room actor class
    ├── RB_Dungeon001.h / .cpp               — Room variant 1 (4-Way Grand Hall, 12m x 10m)
    ├── RB_Dungeon002.h / .cpp               — Room variant 2 (T-Junction, 10m x 10m)
    ├── RB_Dungeon003.h / .cpp               — Room variant 3 (Long Gallery, 14m x 6m)
    ├── RB_Dungeon004.h / .cpp               — Room variant 4 (Corner Turn, 8m x 8m)
    ├── RB_Dungeon005.h / .cpp               — Room variant 5 (Left Branch, 10m x 8m)
    ├── RB_Dungeon006.h / .cpp               — Room variant 6 (Right Branch, 10m x 12m)
    │
    ├── MultiplayerSessionsSubsystem.h / .cpp — Steam lobby subsystem
    ├── MainMenuWidget.h / .cpp               — Main menu UMG widget
    ├── MenuGameMode.h / .cpp                 — Menu level game mode
    ├── MenuPlayerController.h / .cpp         — Menu player controller
    ├── ServerBrowserWidget.h / .cpp          — Server browser UMG widget
    └── ServerRowWidget.h / .cpp              — Individual lobby row widget
```

*(Plus .editorconfig, shadertoolsconfig.json, dungeon size.md)*

---

## Core System: Procedural Dungeon Generator

### ADungeonGenerator — Central Orchestrator

The dungeon generator spawns a starter room and then iteratively places rooms at open exit points using a **multi-candidate trial placement algorithm**:

1. Shuffle all 10 room classes into a randomized trial list
2. Try each candidate at the current exit via `SpawnRoomAtExit(ExitPoint, CandidateClass, bCheckCollision=true)`
3. If no collision: keep the room, collect its exits, continue
4. If collision: `RemoveOverlappingRooms()` destroys it and tries the next candidate
5. If all 10 candidates fail: try the `CapRoomClass` (5m x 5m dead-end room)
6. If the cap also fails: leave the exit blank (consumed/obstructed)
7. When `RoomAmount <= 0`: cap all remaining open exits

**Key properties:**
```cpp
TSubclassOf<ARB_Dungeon001> StarterRoom;
TArray<TSubclassOf<ARoomBase>> RoomsToBeSpawned;  // 10 diverse room types
TSubclassOf<ARoomBase> CloseWall;                  // Wall sealer
TSubclassOf<ARoomBase> CapRoomClass;               // 5x5m dead-end cap
TSubclassOf<ARoomBase> EndRoom;                    // Legacy alias
int32 RoomAmount;                                   // Target room count
TArray<USceneComponent*> Exits;                    // Open exit points queue
ARoomBase* LatestSpawnedRoom;
```

**Key methods:**
```cpp
void SpawnStarterRoom();
void SpawnNextRoom();
void RemoveOverlappingRooms();
bool SpawnRoomAtExit(USceneComponent* Exit, TSubclassOf<ARoomBase> Room, bool bCheckCollision);
bool TryPlaceRoomAtExit(USceneComponent* Exit);
void CapRemainingExits(TSubclassOf<ARoomBase> DeadEndRoom);
int32 PickRandomThemeIndex();
void ApplyThemeToRoom(ARoomBase* Room, int32 ThemeIndex);
```

### ARoomBase — Room Actor Base Class

All dungeon rooms inherit from this. Key design:
- **Dynamic BoxCollision** sized to room dimensions with 25cm border margins
- **DoorWidth = 140cm** standard across all rooms (character mannequin walkthrough clearance)
- **RoomLength / RoomBreadth** properties for diverse footprints
- `PopulateRoomProps()` places furniture at corners relative to room dimensions
- Wall height: 400cm (4m); ceiling clearance: 300cm (3m)
- UV tiling on MI_Floor / MI_Wall automatically scales per room dimensions

### Room Variants

| Blueprint | Type | Dimensions | Exits |
|---|---|---|---|
| RB_Dungeon001 | 4-Way Grand Hall | 12m x 10m | 3 exits |
| RB_Dungeon002 | T-Junction Chamber | 10m x 10m | 2 exits |
| RB_Dungeon003 | Long Gallery Corridor | 14m x 6m | 1 exit straight |
| RB_Dungeon004 | Corner Turn Room | 8m x 8m | 1 exit right |
| RB_Dungeon005 | Left Branch Lounge | 10m x 8m | 2 exits |
| RB_Dungeon006 | Right Branch Chamber | 10m x 12m | 2 exits |
| *(+ 4 more planned: 007-010)* | | | |
| BP_Dungeon011 | Dead-End Cap Room | 5m x 5m | 0 exits |

---

## Core System: Multiplayer Sessions Subsystem

### UMultiplayerSessionsSubsystem — Steam Lobby Manager

A persistent `UGameInstanceSubsystem` (lives for the entire game session) managing all Steam lobby operations.

**Blueprint-callable interface:**
```cpp
void CreateLobby(int32 MaxPlayers = 4, FString LobbyName = "Dungeon Run");
void FindLobbies(int32 MaxResults = 100, const FString& FilterCode = "");
void JoinLobby(int32 SearchResultIndex);
void JoinByDirectIP(const FString& IPAddress);        // e.g. "192.168.1.50:7777"
void OpenSteamFriendsOverlay();
void OpenSteamInviteOverlay();
FString GetActiveSteamUsername() const;
bool IsSteamActive() const;
int64 GetCurrentSteamLobbyID() const;
FString GetCurrentLobbyCode() const;
void JoinLobbyByCode(const FString& InCode);          // 5-char room code or direct IP fallback
static FString GenerateLobbyCode();                    // Random 6-char alphanumeric
void LeaveLobby();
```

**Delegate broadcasts to UI:**
```cpp
FOnCreateLobbyComplete  OnCreateLobbyComplete    // (bool bSuccessful, FString LobbyName)
FOnLobbiesFound         OnLobbiesFound           // (TArray<FLobbyData> Lobbies, bool bSuccessful)
FOnJoinLobbyComplete    OnJoinLobbyComplete      // (bool bSuccessful)
```

**FLobbyData struct (passed to server browser widget):**
```cpp
FString LobbyName;
FString HostName;
int32 CurrentPlayers;
int32 MaxPlayers;
int32 PingMs;
int32 SearchResultIndex;
```

**Internal delegate pattern:** Binds `IOnlineSessionPtr` delegates per-call and unregisters handles on completion — avoiding dangling delegates.

---

## Online / Multiplayer

- **OnlineSubsystem:** Steam
- **Session features:** Create, Find, Join, Destroy, Leave, Direct IP, Room Codes
- **Steam API features:** Friends overlay, Invite overlay, Persona name, Lobby ID
- **Lobby codes:** Random 6-char codes embedded as Steam lobby metadata, searchable across all public lobbies
- **Fallback:** Direct IP connection (`"IP:Port"` string format)

---

## Plugins Enabled

| Plugin | Purpose |
|---|---|
| `ModelingToolsEditorMode` | Mesh editing in editor |
| `OnlineSubsystem` | Online layer |
| `OnlineSubsystemSteam` | Steam backend |
| *(Others disabled: StateTree, Paper2D, NNE, MCP tools)* | |

---

## Design Notes (from dungeon size.md)

- Doorway width standardized to **140 cm** (fits ~50cm mannequin capsule radius 42cm)
- Wall height: **400 cm** total (300cm ceiling clearance)
- Room footprints range from **8m x 6m** to **14m x 10m**
- Materials: `MI_Wall` and `MI_Floor` with auto UV tiling per room size
- The generator uses multi-candidate trial placement to maximize variety while avoiding spatial overlap
