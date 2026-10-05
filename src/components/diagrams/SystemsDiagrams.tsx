import React from 'react';

// Common SVG styling tokens
const STYLES = {
  container: {
    width: '100%',
    overflowX: 'auto' as const,
    background: '#070b12',
    border: '1px solid #1e293b',
    borderRadius: '8px',
    padding: '1rem',
  },
  svg: {
    width: '100%',
    maxWidth: '920px',
    height: 'auto',
    display: 'block',
    margin: '0 auto',
  },
};

/**
 * DecoySpawnFlowDiagram - Illustrates the decoy spawning loop:
 * IA_SpawnProp input, server capacity check (MaxSpawnProps = 5),
 * BP_SPawnedProp actor instantiation, MulticastSetMesh, and physics simulation.
 */
export const DecoySpawnFlowDiagram: React.FC = () => {
  return (
    <div style={STYLES.container}>
      <svg
        viewBox="0 0 880 280"
        style={STYLES.svg}
        role="img"
        aria-label="Decoy Prop Placement and Replication Pipeline Diagram"
      >
        <defs>
          <marker id="arrow-amber" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#f59e0b" />
          </marker>
        </defs>

        {/* Step 1: Input */}
        <g transform="translate(10, 20)">
          <rect width="195" height="180" rx="6" fill="#0f172a" stroke="#334155" />
          <rect width="195" height="26" rx="6 6 0 0" fill="#0284c7" />
          <text x="10" y="17" fill="#f8fafc" fontSize="10" fontWeight="700" fontFamily="sans-serif">1. CLIENT INPUT</text>
          <text x="12" y="46" fill="#38bdf8" fontSize="9.5" fontWeight="600" fontFamily="monospace">IA_SpawnProp</text>
          <text x="12" y="66" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">• Enhanced Input trigger</text>
          <text x="12" y="84" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">• Disguised prop pawn</text>
          <text x="12" y="102" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">• Calls Spawnproponserver</text>
          <text x="12" y="120" fill="#38bdf8" fontSize="8.5" fontFamily="monospace">Server RPC (Reliable)</text>
        </g>

        <line x1="210" y1="110" x2="230" y2="110" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-amber)" />

        {/* Step 2: Server Accounting */}
        <g transform="translate(235, 20)">
          <rect width="195" height="180" rx="6" fill="#0f172a" stroke="#334155" />
          <rect width="195" height="26" rx="6 6 0 0" fill="#d97706" />
          <text x="10" y="17" fill="#f8fafc" fontSize="10" fontWeight="700" fontFamily="sans-serif">2. RESOURCE CHECK</text>
          <text x="12" y="46" fill="#fbbf24" fontSize="9.5" fontWeight="600" fontFamily="monospace">SpawnPropsLeft</text>
          <text x="12" y="66" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">• MaxSpawnProps = 5</text>
          <text x="12" y="84" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">• Bounded counter check</text>
          <text x="12" y="102" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">• Decrements on spawn</text>
          <text x="12" y="120" fill="#f59e0b" fontSize="8.5" fontFamily="monospace">SpawnActor(BP_SPawnedProp)</text>
        </g>

        <line x1="435" y1="110" x2="455" y2="110" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-amber)" />

        {/* Step 3: Mesh Setup */}
        <g transform="translate(460, 20)">
          <rect width="195" height="180" rx="6" fill="#0f172a" stroke="#334155" />
          <rect width="195" height="26" rx="6 6 0 0" fill="#059669" />
          <text x="10" y="17" fill="#f8fafc" fontSize="10" fontWeight="700" fontFamily="sans-serif">3. MESH SYNC</text>
          <text x="12" y="46" fill="#34d399" fontSize="9.5" fontWeight="600" fontFamily="monospace">MulticastSetMesh</text>
          <text x="12" y="66" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">• Reads active disguise</text>
          <text x="12" y="84" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">• Assigns static mesh</text>
          <text x="12" y="102" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">• Matches material state</text>
          <text x="12" y="120" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">• Multicast broadcast</text>
        </g>

        <line x1="660" y1="110" x2="680" y2="110" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-amber)" />

        {/* Step 4: Physics Settling */}
        <g transform="translate(685, 20)">
          <rect width="185" height="180" rx="6" fill="#0f172a" stroke="#334155" />
          <rect width="185" height="26" rx="6 6 0 0" fill="#7c3aed" />
          <text x="10" y="17" fill="#f8fafc" fontSize="10" fontWeight="700" fontFamily="sans-serif">4. PHYSICS SETTLING</text>
          <text x="12" y="46" fill="#c084fc" fontSize="9.5" fontWeight="600" fontFamily="monospace">Physics &amp; Collision</text>
          <text x="12" y="66" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">• SetSimulatePhysics(true)</text>
          <text x="12" y="84" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">• Collision profile active</text>
          <text x="12" y="102" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">• Settles onto floor</text>
          <text x="12" y="120" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">• Destruction pending</text>
        </g>

        {/* Boundary callout */}
        <g transform="translate(10, 215)">
          <rect width="860" height="50" rx="4" fill="rgba(245, 158, 11, 0.08)" stroke="rgba(245, 158, 11, 0.3)" />
          <text x="16" y="20" fill="#fbbf24" fontSize="10" fontWeight="700" fontFamily="sans-serif">⚠️ Architectural Disclosure: Decoy Authority &amp; Destruction Discrepancy</text>
          <text x="16" y="38" fill="#cbd5e1" fontSize="9" fontFamily="sans-serif">Spawn logic and MulticastSetMesh are verified in Blueprints. Runtime placement, physics settling, hunter interaction, and destruction authority (Server_DestroyFakeProp metadata discrepancy vs Destroy Actor) remain CAPTURE_PENDING.</text>
        </g>
      </svg>
    </div>
  );
};

/**
 * CombatTraceFlowDiagram - Illustrates the networked hit-scan firing loop,
 * client-informed camera query, server raycast, hit reaction, and spectator hand-off.
 */
export const CombatTraceFlowDiagram: React.FC = () => {
  return (
    <div style={STYLES.container}>
      <svg
        viewBox="0 0 880 340"
        style={STYLES.svg}
        role="img"
        aria-label="Hunter Ballistics and Elimination Pipeline Diagram"
      >
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#38bdf8" />
          </marker>
          <marker id="arrow-warn" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#f59e0b" />
          </marker>
        </defs>

        {/* Column 1: Client Input & Query */}
        <g transform="translate(10, 20)">
          <rect width="240" height="240" rx="6" fill="#0f172a" stroke="#334155" />
          <rect width="240" height="28" rx="6 6 0 0" fill="#0369a1" />
          <text x="12" y="19" fill="#f8fafc" fontSize="11" fontWeight="700" fontFamily="sans-serif">1. CLIENT: INPUT &amp; CAMERA QUERY</text>
          
          <rect x="12" y="40" width="216" height="50" rx="4" fill="#1e293b" />
          <text x="20" y="58" fill="#e2e8f0" fontSize="10" fontWeight="600" fontFamily="monospace">IA_Fire Pressed</text>
          <text x="20" y="76" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">Calls StartFireOnServer(Reliable)</text>

          <rect x="12" y="102" width="216" height="60" rx="4" fill="#1e293b" />
          <text x="20" y="120" fill="#e2e8f0" fontSize="10" fontWeight="600" fontFamily="monospace">get clientCamera Action</text>
          <text x="20" y="136" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">Client RPC returns Camera Location</text>
          <text x="20" y="150" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">&amp; Forward Rotation to Server</text>

          <rect x="12" y="174" width="216" height="50" rx="4" fill="#1e293b" />
          <text x="20" y="192" fill="#38bdf8" fontSize="10" fontWeight="600" fontFamily="monospace">LineTraceOnserver(CamLoc, CamRot)</text>
          <text x="20" y="210" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">Server receives client camera vectors</text>
        </g>

        {/* Flow Line 1 to 2 */}
        <line x1="250" y1="140" x2="288" y2="140" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow)" />

        {/* Column 2: Server Firing Loop & Raycast */}
        <g transform="translate(290, 20)">
          <rect width="270" height="240" rx="6" fill="#0f172a" stroke="#334155" />
          <rect width="270" height="28" rx="6 6 0 0" fill="#1e3a8a" />
          <text x="12" y="19" fill="#f8fafc" fontSize="11" fontWeight="700" fontFamily="sans-serif">2. SERVER: LOOPING TRACE &amp; HIT</text>

          <rect x="12" y="40" width="246" height="50" rx="4" fill="#1e293b" />
          <text x="20" y="58" fill="#e2e8f0" fontSize="10" fontWeight="600" fontFamily="monospace">0.1s Looping FireTimer</text>
          <text x="20" y="76" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">Iterates FireRifle until StopFireOnServer</text>

          <rect x="12" y="102" width="246" height="60" rx="4" fill="#1e293b" />
          <text x="20" y="120" fill="#e2e8f0" fontSize="10" fontWeight="600" fontFamily="monospace">F_RifleLinerace Function</text>
          <text x="20" y="136" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">LineTraceByChannel forward along</text>
          <text x="20" y="150" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">client vectors * bulletDistance</text>

          <rect x="12" y="174" width="246" height="50" rx="4" fill="#1e293b" />
          <text x="20" y="192" fill="#e2e8f0" fontSize="10" fontWeight="600" fontFamily="monospace">Tag Check: ActorHasTag("prop")</text>
          <text x="20" y="210" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">Filters hits vs static background mesh</text>
        </g>

        {/* Flow Line 2 to 3 */}
        <line x1="560" y1="140" x2="598" y2="140" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow)" />

        {/* Column 3: Multicast Presentation & Spectator Handoff */}
        <g transform="translate(600, 20)">
          <rect width="270" height="240" rx="6" fill="#0f172a" stroke="#334155" />
          <rect width="270" height="28" rx="6 6 0 0" fill="#047857" />
          <text x="12" y="19" fill="#f8fafc" fontSize="11" fontWeight="700" fontFamily="sans-serif">3. REPLICATION &amp; ELIMINATION</text>

          <rect x="12" y="40" width="246" height="50" rx="4" fill="#1e293b" />
          <text x="20" y="58" fill="#e2e8f0" fontSize="10" fontWeight="600" fontFamily="monospace">Multicast Feedback</text>
          <text x="20" y="76" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">MulticastFireEvnt + MulticasttHitEffict</text>

          <rect x="12" y="102" width="246" height="60" rx="4" fill="#1e293b" />
          <text x="20" y="120" fill="#e2e8f0" fontSize="10" fontWeight="600" fontFamily="monospace">PlayrossairHit &amp; Damage</text>
          <text x="20" y="136" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">Hunter HUD flashes red hit reticle;</text>
          <text x="20" y="150" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">Prop executes Event AnyDamage</text>

          <rect x="12" y="174" width="246" height="50" rx="4" fill="#1e293b" />
          <text x="20" y="192" fill="#e2e8f0" fontSize="10" fontWeight="600" fontFamily="monospace">Spectator Transition</text>
          <text x="20" y="210" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">Health &lt;= 0: disable collision, possess spectator</text>
        </g>

        {/* Boundary callout at bottom */}
        <g transform="translate(10, 275)">
          <rect width="860" height="50" rx="4" fill="rgba(245, 158, 11, 0.08)" stroke="rgba(245, 158, 11, 0.3)" />
          <text x="16" y="20" fill="#fbbf24" fontSize="10" fontWeight="700" fontFamily="sans-serif">⚠️ Architectural Disclosure: Client Camera Vectors &amp; Absence of Lag Compensation</text>
          <text x="16" y="38" fill="#cbd5e1" fontSize="9" fontFamily="sans-serif">Line traces rely on client-supplied camera coordinates. Server position rewind buffers, tick timestamp indexing, and lag compensation were not found in the inspected graphs/files/scope; traces execute immediately at current server state.</text>
        </g>
      </svg>
    </div>
  );
};

/**
 * AudioVoipDiagram - Illustrates spatial taunt multicast rate-limiting
 * and C++ UVOIPLIB::ClearVoicePackets subsystem integration.
 */
export const AudioVoipDiagram: React.FC = () => {
  return (
    <div style={STYLES.container}>
      <svg
        viewBox="0 0 880 300"
        style={STYLES.svg}
        role="img"
        aria-label="Positional Audio and VOIP Subsystem Diagram"
      >
        <defs>
          <marker id="arrow-cyan" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#38bdf8" />
          </marker>
        </defs>

        {/* Upper Pipeline: Spatial Taunts */}
        <g transform="translate(10, 20)">
          <rect width="860" height="110" rx="6" fill="#0f172a" stroke="#1e293b" />
          <rect width="860" height="24" rx="6 6 0 0" fill="#0369a1" />
          <text x="12" y="16" fill="#f8fafc" fontSize="10" fontWeight="700" fontFamily="sans-serif">PIPELINE A: 3D SPATIAL TAUNT BROADCAST &amp; COOLDOWN RATE-LIMITING</text>

          <g transform="translate(20, 36)">
            <rect width="170" height="56" rx="4" fill="#1e293b" />
            <text x="10" y="24" fill="#38bdf8" fontSize="10" fontWeight="600" fontFamily="monospace">IA_Taunt</text>
            <text x="10" y="42" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">Client trigger input</text>
          </g>

          <line x1="195" y1="64" x2="235" y2="64" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow-cyan)" />

          <g transform="translate(240, 36)">
            <rect width="190" height="56" rx="4" fill="#1e293b" />
            <text x="10" y="24" fill="#e2e8f0" fontSize="10" fontWeight="600" fontFamily="monospace">TauntsOnServer(Reliable)</text>
            <text x="10" y="42" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">Queries TauntSoundz array</text>
          </g>

          <line x1="435" y1="64" x2="475" y2="64" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow-cyan)" />

          <g transform="translate(480, 36)">
            <rect width="170" height="56" rx="4" fill="#1e293b" />
            <text x="10" y="24" fill="#e2e8f0" fontSize="10" fontWeight="600" fontFamily="monospace">1.0s Cooldown Delay</text>
            <text x="10" y="42" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">Throttles rapid triggers</text>
          </g>

          <line x1="655" y1="64" x2="695" y2="64" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow-cyan)" />

          <g transform="translate(700, 36)">
            <rect width="145" height="56" rx="4" fill="#1e293b" />
            <text x="10" y="24" fill="#10b981" fontSize="10" fontWeight="600" fontFamily="monospace">SpawnSound(SA_VOIP)</text>
            <text x="10" y="42" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">Spatial 3D falloff profile</text>
          </g>
        </g>

        {/* Lower Pipeline: C++ VOIP Subsystem */}
        <g transform="translate(10, 145)">
          <rect width="860" height="95" rx="6" fill="#0f172a" stroke="#1e293b" />
          <rect width="860" height="24" rx="6 6 0 0" fill="#4338ca" />
          <text x="12" y="16" fill="#f8fafc" fontSize="10" fontWeight="700" fontFamily="sans-serif">PIPELINE B: CUSTOM C++ VOIP PACKET BUFFER CLEARING (UVOIPLIB)</text>

          <g transform="translate(20, 36)">
            <rect width="230" height="46" rx="4" fill="#1e293b" />
            <text x="10" y="20" fill="#a5b4fc" fontSize="9.5" fontWeight="600" fontFamily="monospace">UVOIPLIB::ClearVoicePackets()</text>
            <text x="10" y="36" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">Static method invoked on round reset</text>
          </g>

          <line x1="255" y1="59" x2="300" y2="59" stroke="#818cf8" strokeWidth="2" markerEnd="url(#arrow-cyan)" />

          <g transform="translate(305, 36)">
            <rect width="250" height="46" rx="4" fill="#1e293b" />
            <text x="10" y="20" fill="#e2e8f0" fontSize="9.5" fontWeight="600" fontFamily="monospace">IOnlineSubsystem::GetVoiceInterface()</text>
            <text x="10" y="36" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">Accesses engine voice subsystem interface</text>
          </g>

          <line x1="560" y1="59" x2="605" y2="59" stroke="#818cf8" strokeWidth="2" markerEnd="url(#arrow-cyan)" />

          <g transform="translate(610, 36)">
            <rect width="235" height="46" rx="4" fill="#1e293b" />
            <text x="10" y="20" fill="#10b981" fontSize="9.5" fontWeight="600" fontFamily="monospace">VoiceInterface-&gt;ClearVoicePackets()</text>
            <text x="10" y="36" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">Flushes queued stale audio buffers</text>
          </g>
        </g>

        {/* Boundary callout */}
        <g transform="translate(10, 252)">
          <text x="6" y="14" fill="#f59e0b" fontSize="9" fontWeight="700" fontFamily="sans-serif">⚠️ Architectural Boundary:</text>
          <text x="160" y="14" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">UVOIPLIB contains only ClearVoicePackets(). Low-level buffer inspection, automated spectate routing, and geometric line-trace occlusion filtering were not found in the inspected UVOIPLIB and inspected graphs/files/scope.</text>
        </g>
      </svg>
    </div>
  );
};

/**
 * RoundLifecycleDiagram - Illustrates GameMode state machine,
 * player partitioning, HUD telemetry plumbing, and match resolution.
 */
export const RoundLifecycleDiagram: React.FC = () => {
  return (
    <div style={STYLES.container}>
      <svg
        viewBox="0 0 880 280"
        style={STYLES.svg}
        role="img"
        aria-label="Round Lifecycle and Game State Replication Diagram"
      >
        <defs>
          <marker id="arrow-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#10b981" />
          </marker>
        </defs>

        {/* Step 1 */}
        <g transform="translate(10, 20)">
          <rect width="195" height="180" rx="6" fill="#0f172a" stroke="#334155" />
          <rect width="195" height="26" rx="6 6 0 0" fill="#047857" />
          <text x="10" y="17" fill="#f8fafc" fontSize="10" fontWeight="700" fontFamily="sans-serif">1. GAMEMODE LOBBY</text>
          <text x="12" y="46" fill="#6ee7b7" fontSize="9.5" fontWeight="600" fontFamily="monospace">GM_ProphuntGameMode</text>
          <text x="12" y="66" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">• Connected player tracking</text>
          <text x="12" y="84" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">• Partitions Seekers vs Props</text>
          <text x="12" y="102" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">• Tracks SeekerCount</text>
          <text x="12" y="120" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">• Match countdown timer</text>
        </g>

        <line x1="210" y1="110" x2="230" y2="110" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-green)" />

        {/* Step 2 */}
        <g transform="translate(235, 20)">
          <rect width="195" height="180" rx="6" fill="#0f172a" stroke="#334155" />
          <rect width="195" height="26" rx="6 6 0 0" fill="#0f766e" />
          <text x="10" y="17" fill="#f8fafc" fontSize="10" fontWeight="700" fontFamily="sans-serif">2. REPLICATED STATE</text>
          <text x="12" y="46" fill="#5eead4" fontSize="9.5" fontWeight="600" fontFamily="monospace">PlayerState01</text>
          <text x="12" y="66" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">• Replicates PlayerName</text>
          <text x="12" y="84" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">• Replicates Team enum</text>
          <text x="12" y="102" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">• Replicates VoiceMode</text>
          <text x="12" y="120" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">• Persistent player identity</text>
        </g>

        <line x1="435" y1="110" x2="455" y2="110" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-green)" />

        {/* Step 3 */}
        <g transform="translate(460, 20)">
          <rect width="195" height="180" rx="6" fill="#0f172a" stroke="#334155" />
          <rect width="195" height="26" rx="6 6 0 0" fill="#1d4ed8" />
          <text x="10" y="17" fill="#f8fafc" fontSize="10" fontWeight="700" fontFamily="sans-serif">3. CONTROLLER &amp; UMG</text>
          <text x="12" y="46" fill="#93c5fd" fontSize="9.5" fontWeight="600" fontFamily="monospace">BP_ThirdPersonController</text>
          <text x="12" y="66" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">• Drives UW_MainHUD</text>
          <text x="12" y="84" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">• Updates WBP_InGame timers</text>
          <text x="12" y="102" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">• Feeds WBP_PlayerList</text>
          <text x="12" y="120" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">• Spawns WBP_KillFeedItem</text>
        </g>

        <line x1="660" y1="110" x2="680" y2="110" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-green)" />

        {/* Step 4 */}
        <g transform="translate(685, 20)">
          <rect width="185" height="180" rx="6" fill="#0f172a" stroke="#334155" />
          <rect width="185" height="26" rx="6 6 0 0" fill="#b91c1c" />
          <text x="10" y="17" fill="#f8fafc" fontSize="10" fontWeight="700" fontFamily="sans-serif">4. MATCH RESOLUTION</text>
          <text x="12" y="46" fill="#fca5a5" fontSize="9.5" fontWeight="600" fontFamily="monospace">Win &amp; Travel Handling</text>
          <text x="12" y="66" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">• Evaluates alive prop count</text>
          <text x="12" y="84" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">• Evaluates round countdown</text>
          <text x="12" y="102" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">• Victory screen overlay</text>
          <text x="12" y="120" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">• Server map-travel handling</text>
        </g>

        {/* Boundary callout */}
        <g transform="translate(10, 215)">
          <rect width="860" height="50" rx="4" fill="rgba(245, 158, 11, 0.08)" stroke="rgba(245, 158, 11, 0.3)" />
          <text x="16" y="20" fill="#fbbf24" fontSize="10" fontWeight="700" fontFamily="sans-serif">⚠️ Architectural Disclosure: Multiplayer Edge Cases</text>
          <text x="16" y="38" fill="#cbd5e1" fontSize="9" fontFamily="sans-serif">GameMode round-management structure was found in the inspected Blueprint graphs; runtime multiplayer behavior remains capture pending across latency spikes, client reconnects, and map travel.</text>
        </g>
      </svg>
    </div>
  );
};

/**
 * EmotesLeaderPoseDiagram - Illustrates master-to-slave skeletal binding
 * via Set Leader Pose Component and RPC montage broadcast.
 */
export const EmotesLeaderPoseDiagram: React.FC = () => {
  return (
    <div style={STYLES.container}>
      <svg
        viewBox="0 0 880 270"
        style={STYLES.svg}
        role="img"
        aria-label="Leader Pose Component and Emote Replication Diagram"
      >
        <defs>
          <marker id="arrow-purple" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#c084fc" />
          </marker>
        </defs>

        {/* Master Mesh Box */}
        <g transform="translate(20, 20)">
          <rect width="280" height="170" rx="6" fill="#0f172a" stroke="#6b21a8" strokeWidth="1.5" />
          <rect width="280" height="26" rx="6 6 0 0" fill="#6b21a8" />
          <text x="12" y="17" fill="#f8fafc" fontSize="10" fontWeight="700" fontFamily="sans-serif">MASTER SKELETAL MESH</text>
          <text x="14" y="50" fill="#e9d5ff" fontSize="10" fontWeight="600" fontFamily="monospace">GetMesh() (Master Skeletal Mesh)</text>
          <text x="14" y="70" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">• Evaluates locomotion &amp; blendspaces</text>
          <text x="14" y="88" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">• Server_Emote / Multicast_Emote</text>
          <text x="14" y="106" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">• Plays replicated animation montages</text>
          <text x="14" y="130" fill="#c084fc" fontSize="9.5" fontWeight="600" fontFamily="monospace">Multicast_CostumeChange Event</text>
        </g>

        {/* Binding arrows */}
        <line x1="305" y1="55" x2="395" y2="55" stroke="#c084fc" strokeWidth="2" markerEnd="url(#arrow-purple)" />
        <line x1="305" y1="105" x2="395" y2="105" stroke="#c084fc" strokeWidth="2" markerEnd="url(#arrow-purple)" />
        <line x1="305" y1="155" x2="395" y2="155" stroke="#c084fc" strokeWidth="2" markerEnd="url(#arrow-purple)" />

        {/* Modular Slave Meshes */}
        <g transform="translate(400, 20)">
          <rect width="455" height="170" rx="6" fill="#0f172a" stroke="#334155" />
          <rect width="455" height="26" rx="6 6 0 0" fill="#312e81" />
          <text x="12" y="17" fill="#f8fafc" fontSize="10" fontWeight="700" fontFamily="sans-serif">MODULAR ATTACHMENTS (SET LEADER POSE COMPONENT)</text>

          {/* Armor 1 */}
          <g transform="translate(15, 36)">
            <rect width="425" height="34" rx="4" fill="#1e293b" />
            <text x="10" y="21" fill="#cbd5e1" fontSize="9.5" fontFamily="monospace">Helmet -&gt; Set Leader Pose Component (Master Mesh)</text>
          </g>

          {/* Armor 2 */}
          <g transform="translate(15, 78)">
            <rect width="425" height="34" rx="4" fill="#1e293b" />
            <text x="10" y="21" fill="#cbd5e1" fontSize="9.5" fontFamily="monospace">Body -&gt; Set Leader Pose Component (Master Mesh)</text>
          </g>

          {/* Armor 3 */}
          <g transform="translate(15, 120)">
            <rect width="425" height="34" rx="4" fill="#1e293b" />
            <text x="10" y="21" fill="#cbd5e1" fontSize="9.5" fontFamily="monospace">Hands -&gt; Set Leader Pose Component (Master Mesh)</text>
          </g>
        </g>

        {/* Boundary callout */}
        <g transform="translate(20, 205)">
          <rect width="835" height="46" rx="4" fill="rgba(245, 158, 11, 0.08)" stroke="rgba(245, 158, 11, 0.3)" />
          <text x="16" y="18" fill="#fbbf24" fontSize="9.5" fontWeight="700" fontFamily="sans-serif">⚠️ Architectural Disclosure: Asset Sourcing &amp; Deformation Quality</text>
          <text x="16" y="34" fill="#cbd5e1" fontSize="8.5" fontFamily="sans-serif">Set Leader Pose Component structure for Body, Hands, and Helmet is verified in Blueprints. Character base meshes and montages are external assets (PROVENANCE_PENDING); runtime animation quality remains pending capture.</text>
        </g>
      </svg>
    </div>
  );
};
