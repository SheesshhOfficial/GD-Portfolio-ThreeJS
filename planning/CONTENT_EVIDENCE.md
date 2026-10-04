# Content Evidence Ledger

## Verified implementation

Live Unreal inspection found:

- Prop transformation: sphere trace, allowed-mesh check, server event, multicast mesh update, limits, rotation lock, and special pivot offsets.
- Decoy spawning: mesh assignment, physics/gravity setup, and limited count.
- Hunter combat: firing timer, client camera information, server trace, damage, effects, death handling, and spectator possession.
- Taunts/voice: server and multicast taunts, randomized audio, cooldown, VOIP talker setup, replicated voice mode, and C++ voice-packet clearing.
- Round/UI flow: players, roles, alive props, timers, HUD events, player list, countdown, kill feed, and results.
- Animation/customization: networked emotes, montages, cosmetic mesh switching, and leader-pose setup.

## Unverified claims

Do not publish as verified yet:

- Dynamic capsule resizing and the dossier's collision formula
- Complete collision-safe transformation and server validation
- Lag-compensation buffers and rollback validation
- Audio occlusion and specific attenuation curves
- Stable measured 120 FPS
- Exact UV packing, sampler, or draw-call reductions
- Zero-distortion retargeting
- Complete Steam lobby, invite, and browser behaviour

## Classifications

- `VERIFIED_IMPLEMENTATION`: inspected in source, Blueprint, asset, or config
- `RUNTIME_VERIFIED`: observed in a controlled test or recording
- `USER_CONFIRMED`: explicitly confirmed by Ashish
- `UNVERIFIED`: unsupported so far
- `FUTURE`: planned work

Before publication, record whether every model, animation, material, sound, environment, plugin, and system is original, modified, tutorial-derived, marketplace-sourced, or collaborative.

