# Current survey — 2026-10-11

Scope: top-level workspaces only; excluded folders are never traversed. Asset and map counts describe files, not authored deliverables. Descriptor engine association is reported as written, not inferred from folder names. No builds, editor launches, gameplay tests or project writes were performed.

## Procedural_Gen

- Project: Procedural_Gen.uproject.
- Engine association: 5.8.
- Enabled descriptor plugins: ModelingToolsEditorMode, VisualStudioTools, OnlineSubsystem, OnlineSubsystemSteam. Enabled does not prove usage.
- Source files: 39; asset files: 1140; maps: 2.
- Content roots: __ExternalActors__, __ExternalObjects__, Characters, Collections, Dataset, Developers, Imported, Input, LevelPrototyping, Maps, PDG_files, ThirdPerson, UI. Third-party-looking directories require credits, not personal-authorship claims.
- Map paths: `Content\Maps\Lvl_MainMenu.umap`, `Content\ThirdPerson\Lvl_ThirdPerson.umap`.

## Procedural_Gen_Plugin_Backups

- Project: No root project descriptor; associated plugin backup folder.
- Engine association: Not applicable.
- Enabled descriptor plugins: None declared. Enabled does not prove usage.
- Source files: 0; asset files: 0; maps: 0.
- Content roots: Not applicable. Third-party-looking directories require credits, not personal-authorship claims.
- Map paths: None found.
- Archive contents: AdvancedSessions, AdvancedSteamSessions, ExampleBlueprints.

## SheeshhPropHuntYT

- Project: SheeshhPropHuntYT.uproject.
- Engine association: 5.7.
- Enabled descriptor plugins: Monolith, ModelingToolsEditorMode, GameplayStateTree, AIAssistant. Enabled does not prove usage.
- Source files: 11; asset files: 2880; maps: 5.
- Content roots: __ExternalActors__, __ExternalObjects__, Characters, Collections, Core, Developers, Emberlight, Input, resources, Sample, StarterContent, ThirdPerson. Third-party-looking directories require credits, not personal-authorship claims.
- Map paths: `Content\Core\Map\Boot_Lvl.umap`, `Content\Emberlight\Maps\MapHarvest_Demo.umap`, `Content\Emberlight\Maps\MapHarvest_Overview.umap`, `Content\resources\Stylized_Egypt\Maps\Map1.umap`, `Content\resources\Stylized_Egypt\Maps\Stylized_Egypt_Demo.umap`.

## unrealclassmahe

- Project: unrealclassmahe.uproject.
- Engine association: 5.7.
- Enabled descriptor plugins: ModelingToolsEditorMode. Enabled does not prove usage.
- Source files: 0; asset files: 1542; maps: 12.
- Content roots: __ExternalActors__, __ExternalObjects__, _GENERATED, AssetsvilleTown, Characters, coca-cola_can_4k_texture, Collections, day4, Developers, Fab, Input, LevelPrototyping, main, MPMECH, ThirdPerson. Third-party-looking directories require credits, not personal-authorship claims.
- Map paths: `Content\map3.umap`, `Content\NewMap.umap`, `Content\neww.umap`, `Content\AssetsvilleTown\Maps\Demonstration.umap`, `Content\AssetsvilleTown\Maps\Overview.umap`, `Content\day4\map3.umap`, `Content\day4\NewMap.umap`, `Content\day4\neww.umap`, `Content\main\day7\blankStartScreen.umap`, `Content\main\level\powerups.umap`, `Content\MPMECH\Maps\TEST-MAP.umap`, `Content\ThirdPerson\Lvl_ThirdPerson.umap`.

## VR_CLass_5_8

- Project: VR_CLass_5_8.uproject.
- Engine association: 5.7.
- Enabled descriptor plugins: OpenXR, OpenXREyeTracker, OpenXRHandTracking, OculusXR. Enabled does not prove usage.
- Source files: 0; asset files: 460; maps: 3.
- Content roots: Collections, Developers, Emberlight, LevelPrototyping, Oculus, VRSpectator, VRTemplate, Weapons, XRFramework, XRMannequins. Third-party-looking directories require credits, not personal-authorship claims.
- Map paths: `Content\Emberlight\Maps\MapHarvest_Demo.umap`, `Content\Emberlight\Maps\MapHarvest_Overview.umap`, `Content\VRTemplate\VRTemplateMap.umap`.

## Zombie_Tomb_Z

- Project: Zombie_Tomb_Z.uproject.
- Engine association: 5.8.
- Enabled descriptor plugins: ModelingToolsEditorMode, GameplayStateTree. Enabled does not prove usage.
- Source files: 0; asset files: 1332; maps: 5.
- Content roots: __ExternalActors__, __ExternalObjects__, Characters, Collections, Developers, FirstPerson, FPS_Weapon_Bundle, Game, Input, LevelPrototyping, MilitaryCharDark48, MilitaryWeapDark, MilitaryWeapSilver. Third-party-looking directories require credits, not personal-authorship claims.
- Map paths: `Content\FirstPerson\Lvl_FirstPerson.umap`, `Content\FPS_Weapon_Bundle\Maps\Weapons_Showcase.umap`, `Content\MilitaryCharDark48\data\Content\MilitaryCharDark\Showcase.umap`, `Content\MilitaryWeapDark\data\Content\MilitaryWeapDark\Overview.umap`, `Content\MilitaryWeapSilver\data\Content\MilitaryWeapSilver\Showcase.umap`.

## Procedural source inspection

DungeonGenerator.cpp: BeginPlay guards generation with HasAuthority; SpawnRoomAtExit aligns candidate actors, applies themes, checks overlaps and collects exits. TryPlaceRoomAtExit shuffles the configured candidate pool (not a fixed ten rooms), tries each with collision checking, and uses a resolved close-wall fallback with collision checking disabled. SpawnNextRoom handles starter exits, expands with a MaxFails = 60 guard, and caps remaining exits. This corrects the earlier claim that a cap receives the same overlap trial.

MultiplayerSessionsSubsystem.h/.cpp exposes create/find/join/leave, direct IP, lobby codes and Steam overlay helpers. Session delegate registration/cleanup and client travel are present. This establishes code paths, not a successful Steam session or multiplayer runtime. Room-code comments disagree about five/six characters; omit a public code length until a runtime capture confirms it.

RoomBase and six RB_Dungeon001–006 source pairs are present. Blueprint room-class bindings, generated layouts, visual quality, determinism, network synchronization and performance remain untested. Personal contribution details and third-party asset credits are pending.

## Snapshot limits

VR_CLass_5_8 actually declares engine 5.7. OpenXR, eye/hand tracking and OculusXR plugins are enabled; this does not prove implemented tracking features. Zombie_Tomb_Z declares 5.8, includes first-person/weapon content and map files; working zombie AI, combat and original weapon authorship are unverified. unrealclassmahe declares 5.7 and contains map/prototyping content; course origin and personal models require confirmation.

## Pending user inputs

See [Humanwork.md](../../../Humanwork.md) (project root): provide one walkthrough and one editor/source capture per selected project, a contribution list, third-party credits and permission to publish assets. Media can be supplied later as already agreed.
