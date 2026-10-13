> Current survey: 2026-10-11. Ashish confirms the included project folders are his workspaces. File presence and source inspection do not establish individual asset authorship, successful runtime, release status or commercial delivery. Older narrative below is retained as reference; current-inventory.json and 08_Current_Survey.md take precedence.

# C++ Source Code Reference

Historical source excerpts from Unreal projects. Personal authorship and tutorial/third-party provenance still require contribution confirmation.

---

## SheeshhPropHuntYT — VOIPLIB

### Public/VOIPLIB.h

```cpp
// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "Kismet/BlueprintFunctionLibrary.h"
#include "VOIPLIB.generated.h"

/**
 * Blueprint Function Library for VOIP packet management
 */
UCLASS()
class SHEESHHPROPHUNTYT_API UVOIPLIB : public UBlueprintFunctionLibrary
{
    GENERATED_BODY()

public:
    UFUNCTION(BlueprintCallable, Category = "VOIPLIB")
    static void ClearVoicePackets(UObject* WorldContextObject);
};
```

### Private/VOIPLIB.cpp

```cpp
#include "VOIPLIB.h"
#include "Engine/Engine.h"
#include "Engine/World.h"
#include "OnlineSubsystem.h"
#include "OnlineSubsystemUtils.h"
#include "Interfaces/VoiceInterface.h"

void UVOIPLIB::ClearVoicePackets(UObject* WorldContextObject)
{
    if (!WorldContextObject)
        return;

    UWorld* World = GEngine->GetWorldFromContextObject(
        WorldContextObject, EGetWorldErrorMode::LogAndReturnNull);

    if (!World)
        return;

    IOnlineSubsystem* Subsystem = Online::GetSubsystem(World);
    if (!Subsystem)
        return;

    IOnlineVoicePtr VoiceInterface = Subsystem->GetVoiceInterface();
    if (!VoiceInterface.IsValid())
        return;

    VoiceInterface->ClearVoicePackets();
}
```

---

## SheeshhPropHuntYT — DebugMenuLib

### Public/DebugMenuLib.h

```cpp
#pragma once

#include "CoreMinimal.h"
#include "Kismet/BlueprintFunctionLibrary.h"
#include "DebugMenuLib.generated.h"

USTRUCT(BlueprintType)
struct FDeveloperDebugInfo
{
    GENERATED_BODY()

    UPROPERTY(BlueprintReadOnly, Category = "Debug")
    bool bIsAvailable = false;

    UPROPERTY(BlueprintReadOnly, Category = "Debug")
    float CurrentFPS = 0.0f;

    UPROPERTY(BlueprintReadOnly, Category = "Debug")
    float FrameTimeMs = 0.0f;

    UPROPERTY(BlueprintReadOnly, Category = "Debug")
    FString CurrentMap = TEXT("Unavailable");

    UPROPERTY(BlueprintReadOnly, Category = "Debug")
    FString NetMode = TEXT("Unavailable");

    /** Local network simulation role (Engine ENetRole), distinct from gameplay roles (Prop/Hunter) */
    UPROPERTY(BlueprintReadOnly, Category = "Debug")
    FString LocalEngineRole = TEXT("Unavailable");

    /** Player count from GameStateBase::PlayerArray, or -1 if unavailable */
    UPROPERTY(BlueprintReadOnly, Category = "Debug")
    int32 PlayerCount = -1;

    UPROPERTY(BlueprintReadOnly, Category = "Debug")
    int32 PingMs = 0;

    UPROPERTY(BlueprintReadOnly, Category = "Debug")
    FString BuildConfiguration = TEXT("Unavailable");
};

/**
 * Developer Debug Blueprint Function Library with compile-time Shipping guard
 */
UCLASS()
class SHEESHHPROPHUNTYT_API UDebugMenuLib : public UBlueprintFunctionLibrary
{
    GENERATED_BODY()

public:
    /** Returns true only in non-shipping builds (Editor, Development, Debug) */
    UFUNCTION(BlueprintPure, Category = "Developer Debug")
    static bool IsDeveloperDebugAllowed();

    /** Gathers non-invasive diagnostics in non-shipping builds */
    UFUNCTION(BlueprintCallable, Category = "Developer Debug", meta = (WorldContext = "WorldContextObject"))
    static FDeveloperDebugInfo GetDeveloperDebugInfo(const UObject* WorldContextObject);
};
```

### Private/DebugMenuLib.cpp (abbreviated)

```cpp
bool UDebugMenuLib::IsDeveloperDebugAllowed()
{
#if UE_BUILD_SHIPPING
    return false;
#else
    return true;
#endif
}

FDeveloperDebugInfo UDebugMenuLib::GetDeveloperDebugInfo(const UObject* WorldContextObject)
{
    FDeveloperDebugInfo Info;

#if UE_BUILD_SHIPPING
    Info.bIsAvailable = false;
    return Info;
#else
    // Gather: BuildConfiguration, FPS (GAverageFPS), FrameTimeMs (GAverageMS),
    //         CurrentMap (World->GetMapName()), NetMode (World->GetNetMode()),
    //         LocalEngineRole (PC->GetLocalRole()), PingMs (PlayerState->GetPingInMilliseconds()),
    //         PlayerCount (GameState->PlayerArray.Num(), or -1 if GameState null)
    // ...
#endif
}
```

---

## SheeshhPropHuntYT — Build Rules

### SheeshhPropHuntYT.Build.cs

```csharp
using UnrealBuildTool;

public class SheeshhPropHuntYT : ModuleRules
{
    public SheeshhPropHuntYT(ReadOnlyTargetRules Target) : base(Target)
    {
        PCHUsage = PCHUsageMode.UseExplicitOrSharedPCHs;

        PublicDependencyModuleNames.AddRange(new string[]
        {
            "Core", "CoreUObject", "Engine", "InputCore"
        });

        PrivateDependencyModuleNames.AddRange(new string[]
        {
            "OnlineSubsystem", "OnlineSubsystemUtils", "Voice"
        });

        // Steam loaded dynamically at runtime (not in Public to avoid link-time dep)
        DynamicallyLoadedModuleNames.Add("OnlineSubsystemSteam");
    }
}
```

---

## Procedural_Gen — MultiplayerSessionsSubsystem.h (Key Interface)

```cpp
USTRUCT(BlueprintType)
struct FLobbyData
{
    FString LobbyName;
    FString HostName;
    int32 CurrentPlayers;
    int32 MaxPlayers;
    int32 PingMs;
    int32 SearchResultIndex;
};

DECLARE_DYNAMIC_MULTICAST_DELEGATE_TwoParams(FOnCreateLobbyComplete, bool, bSuccessful, const FString&, LobbyName);
DECLARE_DYNAMIC_MULTICAST_DELEGATE_TwoParams(FOnLobbiesFound, const TArray<FLobbyData>&, Lobbies, bool, bSuccessful);
DECLARE_DYNAMIC_MULTICAST_DELEGATE_OneParam(FOnJoinLobbyComplete, bool, bSuccessful);

UCLASS()
class PROCEDURAL_GEN_API UMultiplayerSessionsSubsystem : public UGameInstanceSubsystem
{
    // Key Blueprint-callable functions:
    void CreateLobby(int32 MaxPlayers = 4, FString LobbyName = "Dungeon Run");
    void FindLobbies(int32 MaxResults = 100, const FString& FilterCode = "");
    void JoinLobby(int32 SearchResultIndex);
    void JoinByDirectIP(const FString& IPAddress);
    void OpenSteamFriendsOverlay();
    void OpenSteamInviteOverlay();
    FString GetActiveSteamUsername() const;
    bool IsSteamActive() const;
    int64 GetCurrentSteamLobbyID() const;
    FString GetCurrentLobbyCode() const;
    void JoinLobbyByCode(const FString& InCode);
    static FString GenerateLobbyCode();
    void LeaveLobby();

    // Events broadcast to UI
    FOnCreateLobbyComplete OnCreateLobbyComplete;
    FOnLobbiesFound OnLobbiesFound;
    FOnJoinLobbyComplete OnJoinLobbyComplete;
};
```

---

## Procedural_Gen — DungeonGenerator.h (Key Properties)

```cpp
UCLASS()
class PROCEDURAL_GEN_API ADungeonGenerator : public AActor
{
protected:
    TSubclassOf<ARB_Dungeon001> StarterRoom;
    TArray<TSubclassOf<ARoomBase>> RoomsToBeSpawned;
    TSubclassOf<ARoomBase> CloseWall;
    TSubclassOf<ARoomBase> CapRoomClass;       // 5x5m dead-end cap
    TSubclassOf<ARoomBase> EndRoom;            // Legacy alias
    int32 RoomAmount;

    TArray<USceneComponent*> Exits;
    ARoomBase* LatestSpawnedRoom;

    void SpawnStarterRoom();
    void SpawnNextRoom();
    void RemoveOverlappingRooms();
    bool SpawnRoomAtExit(USceneComponent* Exit, TSubclassOf<ARoomBase> Room, bool bCheckCollision = true);
    bool TryPlaceRoomAtExit(USceneComponent* Exit);
    void CapRemainingExits(TSubclassOf<ARoomBase> DeadEndRoomClass);

    int32 LastThemeIndex = -1;
    int32 PickRandomThemeIndex();
    void ApplyThemeToRoom(ARoomBase* Room, int32 ThemeIndex);
};
```
