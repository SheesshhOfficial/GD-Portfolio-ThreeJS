# Media Inventory — Ashish Ranjan Portfolio

This ledger tracks all planned, captured, credited, and published media assets across Ashish Ranjan's portfolio exhibits.

> **Publication Rule**: Mark nothing as **Public-Ready (`yes`)** unless the media file physically exists in the repository, resolution and quality standards are satisfied, and ownership/attribution is fully confirmed.

---

## 1. Inventory Summary

* **Total Planned Media Assets**: 12
* **Physically Available in `try 2`**: 0
* **Missing / Pending Capture**: 12
* **Public-Ready**: 0
* **Confirmed Authorship / Provenance**: 0 (all pending user confirmation or provenance documentation)

---

## 2. Master Media Inventory Table

| ID | Exhibit / System | Media Type | File Status | Target / Storage Path | Ownership & Attribution | Public-Ready | Required Evidence Level | Notes & Dependencies |
|---|---|---|---|---|---|---|---|---|
| **`PH-OVERVIEW`** | Sheeshh Prop Hunt Overview | 45-60s Edited Reel (MP4) | `missing` | `content/media/sheeshh-prop-hunt/ph-overview.mp4` | Gameplay code: `USER_CONFIRMED: pending`; Environment: `PROVENANCE_PENDING` (folder `Downtown_West`); Audio: `PROVENANCE_PENDING`. | `no` | `RUNTIME_VERIFIED` | Record after completing 2-player runtime checklist. |
| **`PH-TRANSFORM`** | Prop Transformation & Pivot | 20-30s Split-Screen Video (MP4) | `missing` | `content/media/sheeshh-prop-hunt/ph-transform.mp4` | Blueprint logic: `USER_CONFIRMED: pending`; Meshes: `PROVENANCE_PENDING` (folder `Construction_VOL1`). | `no` | `RUNTIME_VERIFIED` | Split-screen Host vs Remote Client; show pivot alignment. |
| **`PH-DECOY`** | Decoy Prop Placement | 15-20s Gameplay Clip (MP4) | `missing` | `content/media/sheeshh-prop-hunt/ph-decoy.mp4` | Actor spawn & physics Blueprint logic: `USER_CONFIRMED: pending`. | `no` | `RUNTIME_VERIFIED` | Demonstrate 5-prop spawn limit and hunter interaction. |
| **`PH-COMBAT`** | Hunter Combat & Spectating | 20-25s Split-Screen Video (MP4) | `missing` | `content/media/sheeshh-prop-hunt/ph-combat.mp4` | Ballistics, health, and spectator logic: `USER_CONFIRMED: pending`; Rifle mesh: `PROVENANCE_PENDING`. | `no` | `RUNTIME_VERIFIED` | Synchronized shooter hit-marker and target health loss/spectate. |
| **`PH-AUDIO`** | Spatial Taunts & VOIP Helper | 20-30s Gameplay Clip with Audio | `missing` | `content/media/sheeshh-prop-hunt/ph-audio.mp4` | `UVOIPLIB` C++ helper: `USER_CONFIRMED: pending`; Audio files: `PROVENANCE_PENDING` (files in `Content/Core/sound`). | `no` | `RUNTIME_VERIFIED` | Demonstrate 3D spatial panning, cooldown, and C++ code overlay. |
| **`PH-ROUNDFLOW`** | GameMode & UMG Lifecycle | 30-40s HUD Sync Video (MP4) | `missing` | `content/media/sheeshh-prop-hunt/ph-roundflow.mp4` | GameMode authority and UMG controller logic: `USER_CONFIRMED: pending`. | `no` | `RUNTIME_VERIFIED` | Synchronized countdown, kill feed, and victory screen. |
| **`PH-CUSTOMIZATION`** | Networked Emotes & Cosmetics | 15-20s Dual-Client Video (MP4) | `missing` | `content/media/sheeshh-prop-hunt/ph-customization.mp4` | RPC emote & leader-pose setup: `USER_CONFIRMED: pending`; Character mesh/animations: `PROVENANCE_PENDING` (folders `characters/1`, `ANIMATION`). | `no` | `RUNTIME_VERIFIED` | Show emote sync and modular armor mesh attachment. |
| **`TA-IKRETARGET`** | UE5 IK Rig & Retargeter | 20-30s Editor Tool Video (MP4) | `missing` | `content/media/technical-art/ta-ikretarget.mp4` | IK Rig & Retargeter setup: `USER_CONFIRMED: pending`; Base assets: `PROVENANCE_PENDING` (StormTrooper / Mixamo). | `no` | `VERIFIED_IMPLEMENTATION` | Viewport capture of `RTG_NewRetargeter` comparing source/target skeletons. |
| **`TA-RAGDOLL`** | PhAT Joint Physics Setup | 15-25s PhAT Simulation Video | `missing` | `content/media/technical-art/ta-ragdoll.mp4` | PhAT body creation and constraint configuration: `USER_CONFIRMED: pending`; Base mesh: `PROVENANCE_PENDING`. | `no` | `VERIFIED_IMPLEMENTATION` | PhAT constraint inspection and physics simulation test. |
| **`3D-TURNTABLE-01`** | Blender Hard-Surface Asset | 30s 360° Turntable Video (MP4) | `missing` | `content/media/3d-art/3d-turntable-01.mp4` | 3D model modeled in Blender: `USER_CONFIRMED: pending` (asset selection required). | `no` | `USER_CONFIRMED` | Pending selection of original `.blend` file by Ashish. |
| **`3D-UV-BREAKDOWN`** | UV Island Layout & PBR Maps | High-Resolution Image (PNG/WebP) | `missing` | `content/media/3d-art/3d-uv-breakdown.png` | UV unwrapping and texture packing: `USER_CONFIRMED: pending` (asset selection required). | `no` | `USER_CONFIRMED` | Display UV packing layout and checkerboard test. |
| **`DOC-RESUME-PDF`** | Recruiter-Facing Resume | Downloadable Document (PDF) | `missing` | `content/documents/Ashish_Ranjan_Resume.pdf` | Authored profile of Ashish Ranjan; `USER_CONFIRMED: pending` authoring of concise resume. | `no` | `USER_CONFIRMED` | The five-page dossier (`Ashish_Ranjan_GameDev_Complete_Dossier.pdf`) is background material; status is missing pending creation of a concise recruiter-facing resume. |

---

## 3. Asset Placeholder Policy

Until physical video captures and high-resolution renders are generated:
1. **Never use blank or broken media tags**: Use structured interactive placeholder cards that display:
   * The Media ID (e.g., `[PH-TRANSFORM: Pending Capture]`)
   * A brief technical storyboard description of the pending clip
   * The underlying verified engineering summary and Blueprint node references
2. **Never substitute stock gameplay footage**: Do not display footage from unrelated projects as representative of `Sheeshh Prop Hunt`.
3. **Public Readiness Gate**: No asset row in Section 2 shall be flipped to `yes` until:
   * File is committed to repository media directory.
   * Visual inspection verifies absence of frame drops or rendering artifacts.
   * Attribution caption is approved.
