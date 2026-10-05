import React from 'react';

/**
 * 16:9 Technical Storyboard for PH-OVERVIEW (Gameplay Overview Reel)
 */
export const OverviewStoryboardSvg: React.FC = () => {
  return (
    <svg
      viewBox="0 0 640 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Technical storyboard illustration for PH-OVERVIEW gameplay loop"
      style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '6px' }}
    >
      <defs>
        <pattern id="ov-grid" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
        </pattern>
        <linearGradient id="hunterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="propGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>

      {/* Frame Background */}
      <rect width="640" height="360" fill="#0b111a" rx="6" />
      <rect width="640" height="360" fill="url(#ov-grid)" rx="6" />
      <rect width="640" height="360" stroke="rgba(56, 189, 248, 0.25)" strokeWidth="1.5" rx="6" />

      {/* Top Telemetry Header */}
      <rect x="0" y="0" width="640" height="36" fill="rgba(15, 23, 42, 0.9)" />
      <text x="16" y="22" fill="#38bdf8" fontSize="11" fontWeight="700" fontFamily="monospace">
        [ PH-OVERVIEW STORYBOARD: ASYMMETRIC 2-PLAYER ROUND LOOP ]
      </text>
      <rect x="490" y="8" width="134" height="20" rx="3" fill="rgba(245, 158, 11, 0.15)" stroke="rgba(245, 158, 11, 0.4)" strokeWidth="1" />
      <text x="498" y="22" fill="#fbbf24" fontSize="9" fontWeight="600" fontFamily="monospace">
        RUNTIME_VERIFIED REQ
      </text>

      {/* Center Dividing Boundary */}
      <line x1="320" y1="36" x2="320" y2="320" stroke="rgba(148, 163, 184, 0.2)" strokeDasharray="4 4" strokeWidth="1" />

      {/* LEFT SECTION: Hunter Search & Ballistics */}
      <g transform="translate(20, 50)">
        <rect x="0" y="0" width="280" height="260" rx="6" fill="rgba(18, 24, 38, 0.6)" stroke="#1e293b" />
        <rect x="0" y="0" width="280" height="26" rx="6 6 0 0" fill="rgba(56, 189, 248, 0.1)" />
        <text x="12" y="17" fill="#7dd3fc" fontSize="10" fontWeight="700" fontFamily="sans-serif">
          1. HUNTER SEARCH &amp; BALLISTICS
        </text>

        {/* Hunter Aiming Cone & Line Trace */}
        <circle cx="50" cy="90" r="16" fill="url(#hunterGrad)" />
        <text x="42" y="94" fill="#fff" fontSize="10" fontWeight="700">H</text>
        <line x1="66" y1="90" x2="220" y2="90" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
        <polygon points="220,86 230,90 220,94" fill="#38bdf8" />
        <circle cx="230" cy="90" r="4" fill="#f43f5e" />

        <text x="12" y="145" fill="#f8fafc" fontSize="10" fontWeight="600" fontFamily="sans-serif">
          Networked Rifle Tracing:
        </text>
        <text x="12" y="165" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">
          • StartFireOnServer (0.1s FireTimer loop)
        </text>
        <text x="12" y="180" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">
          • F_RifleLinerace on ECC_Camera
        </text>
        <text x="12" y="195" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">
          • PlayrossairHit audio-visual feedback
        </text>

        <rect x="12" y="215" width="256" height="32" rx="4" fill="rgba(15, 23, 42, 0.8)" stroke="#334155" />
        <text x="20" y="234" fill="#cbd5e1" fontSize="8.5" fontFamily="monospace">
          Evidence: Host/Remote fire synchronization
        </text>
      </g>

      {/* RIGHT SECTION: Prop Disguise, Taunt & Spectator */}
      <g transform="translate(340, 50)">
        <rect x="0" y="0" width="280" height="260" rx="6" fill="rgba(18, 24, 38, 0.6)" stroke="#1e293b" />
        <rect x="0" y="0" width="280" height="26" rx="6 6 0 0" fill="rgba(245, 158, 11, 0.1)" />
        <text x="12" y="17" fill="#fde68a" fontSize="10" fontWeight="700" fontFamily="sans-serif">
          2. PROP DISGUISE &amp; SPECTATOR LOOP
        </text>

        {/* Prop Pylon Disguise Graphic */}
        <polygon points="70,60 85,115 55,115" fill="url(#propGrad)" />
        <rect x="50" y="115" width="40" height="6" rx="2" fill="#ea580c" />
        {/* Taunt Audio Waves */}
        <path d="M 95 75 A 15 15 0 0 1 95 105" stroke="#f59e0b" strokeWidth="2" fill="none" />
        <path d="M 105 68 A 25 25 0 0 1 105 112" stroke="#f59e0b" strokeWidth="2" strokeDasharray="2 2" fill="none" />
        <text x="120" y="93" fill="#fcd34d" fontSize="9" fontWeight="600" fontFamily="monospace">IA_Taunt</text>

        <text x="12" y="145" fill="#f8fafc" fontSize="10" fontWeight="600" fontFamily="sans-serif">
          Disguise &amp; Elimination Sequence:
        </text>
        <text x="12" y="165" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">
          • Replicated mesh swap (Construction pylon)
        </text>
        <text x="12" y="180" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">
          • Spatial sound cue broadcast via server RPC
        </text>
        <text x="12" y="195" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">
          • Fatal damage -&gt; BP_SpectatorPawn possession
        </text>

        <rect x="12" y="215" width="256" height="32" rx="4" fill="rgba(15, 23, 42, 0.8)" stroke="#334155" />
        <text x="20" y="234" fill="#cbd5e1" fontSize="8.5" fontFamily="monospace">
          Evidence: Multi-angle gameplay reel (45-60s)
        </text>
      </g>

      {/* Bottom Footer Callout */}
      <rect x="0" y="324" width="640" height="36" fill="rgba(10, 14, 20, 0.95)" />
      <text x="16" y="346" fill="#64748b" fontSize="9" fontFamily="monospace">
        PREREQUISITE: Unreal 5.7.4 dedicated/listen capture · Downtown_West / Construction_VOL1 provenance pending
      </text>
    </svg>
  );
};

/**
 * 16:9 Technical Storyboard for PH-TRANSFORM (Multi-View Split-Screen Transformation Clip)
 */
export const TransformStoryboardSvg: React.FC = () => {
  return (
    <svg
      viewBox="0 0 640 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Technical storyboard illustration for PH-TRANSFORM split-screen capture"
      style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '6px' }}
    >
      <defs>
        <pattern id="tr-grid" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
        </pattern>
        <linearGradient id="splitLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="splitRightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
      </defs>

      {/* Frame Background */}
      <rect width="640" height="360" fill="#0b111a" rx="6" />
      <rect width="640" height="360" fill="url(#tr-grid)" rx="6" />
      <rect width="640" height="360" stroke="rgba(56, 189, 248, 0.25)" strokeWidth="1.5" rx="6" />

      {/* Top Telemetry Header */}
      <rect x="0" y="0" width="640" height="36" fill="rgba(15, 23, 42, 0.9)" />
      <text x="16" y="22" fill="#38bdf8" fontSize="11" fontWeight="700" fontFamily="monospace">
        [ PH-TRANSFORM STORYBOARD: DUAL-CLIENT SPLIT SCREEN ]
      </text>
      <rect x="470" y="8" width="154" height="20" rx="3" fill="rgba(56, 189, 248, 0.15)" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1" />
      <text x="478" y="22" fill="#7dd3fc" fontSize="9" fontWeight="600" fontFamily="monospace">
        SPLIT-SCREEN 20-30s REQ
      </text>

      {/* Vertical Split Line */}
      <line x1="320" y1="36" x2="320" y2="320" stroke="#38bdf8" strokeWidth="2" />

      {/* LEFT SPLIT: HOST POV (PROP PERSPECTIVE) */}
      <g transform="translate(15, 46)">
        <rect x="0" y="0" width="295" height="268" rx="4" fill="rgba(15, 23, 42, 0.7)" stroke="#1e293b" />
        <rect x="0" y="0" width="295" height="24" rx="4 4 0 0" fill="#0369a1" />
        <text x="10" y="16" fill="#f8fafc" fontSize="10" fontWeight="700" fontFamily="sans-serif">
          HOST VIEW: PROP POV (SphereTraceSingle)
        </text>

        {/* Reticle & Trace Visual */}
        <circle cx="147" cy="90" r="32" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" fill="none" />
        <circle cx="147" cy="90" r="4" fill="#38bdf8" />
        <line x1="147" y1="58" x2="147" y2="122" stroke="#38bdf8" strokeWidth="1" />
        <line x1="115" y1="90" x2="179" y2="90" stroke="#38bdf8" strokeWidth="1" />

        <text x="12" y="145" fill="#f8fafc" fontSize="9.5" fontWeight="600" fontFamily="sans-serif">
          1. SphereTraceSingle on Interaction Channel
        </text>
        <text x="12" y="162" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">
          • Hits StaticMeshActor -&gt; Cast To SMActor
        </text>
        <text x="12" y="177" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">
          • ChangePropOnServer reliable RPC dispatched
        </text>
        <text x="12" y="192" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">
          • PropChangesLeft decrements (Max: 10)
        </text>
        <text x="12" y="207" fill="#38bdf8" fontSize="8.5" fontFamily="sans-serif">
          • IA_RotationLock: bUseControllerRotationYaw=false (orbit capture pending)
        </text>

        <rect x="10" y="222" width="275" height="36" rx="4" fill="rgba(2, 132, 199, 0.15)" stroke="rgba(2, 132, 199, 0.4)" />
        <text x="18" y="237" fill="#7dd3fc" fontSize="8.5" fontWeight="600" fontFamily="monospace">
          VERIFIED: BP_propChar Graph
        </text>
        <text x="18" y="250" fill="#94a3b8" fontSize="8" fontFamily="monospace">
          bUseControllerRotationYaw = false
        </text>
      </g>

      {/* RIGHT SPLIT: REMOTE CLIENT POV (HUNTER PERSPECTIVE) */}
      <g transform="translate(330, 46)">
        <rect x="0" y="0" width="295" height="268" rx="4" fill="rgba(15, 23, 42, 0.7)" stroke="#1e293b" />
        <rect x="0" y="0" width="295" height="24" rx="4 4 0 0" fill="#047857" />
        <text x="10" y="16" fill="#f8fafc" fontSize="10" fontWeight="700" fontFamily="sans-serif">
          REMOTE CLIENT: REPLICATED MESH &amp; PIVOT
        </text>

        {/* Replicated Cone & Ground Alignment */}
        <polygon points="147,65 170,118 124,118" fill="#f59e0b" />
        <rect x="118" y="118" width="58" height="6" rx="2" fill="#d97706" />
        {/* Floor Line */}
        <line x1="90" y1="124" x2="204" y2="124" stroke="#10b981" strokeWidth="2" />
        <text x="210" y="127" fill="#10b981" fontSize="8" fontWeight="600" fontFamily="monospace">Z=0 Offset</text>

        <text x="12" y="145" fill="#f8fafc" fontSize="9.5" fontWeight="600" fontFamily="sans-serif">
          2. Multicast Replication &amp; Grounding
        </text>
        <text x="12" y="162" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">
          • UpdateMeshMulticast triggers across all clients
        </text>
        <text x="12" y="177" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">
          • SetStaticMesh updates PropMesh component
        </text>
        <text x="12" y="192" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">
          • MeshWithFAlsePivot array check
        </text>
        <text x="12" y="207" fill="#f59e0b" fontSize="8.5" fontFamily="sans-serif">
          • K2_SetRelativeLocation offsets floating origin
        </text>

        <rect x="10" y="222" width="275" height="36" rx="4" fill="rgba(16, 185, 129, 0.15)" stroke="rgba(16, 185, 129, 0.4)" />
        <text x="18" y="237" fill="#6ee7b7" fontSize="8.5" fontWeight="600" fontFamily="monospace">
          VERIFIED: Pivot array lookup
        </text>
        <text x="18" y="250" fill="#94a3b8" fontSize="8" fontFamily="monospace">
          Capsule resizing formula UNVERIFIED
        </text>
      </g>

      {/* Bottom Footer Callout */}
      <rect x="0" y="324" width="640" height="36" fill="rgba(10, 14, 20, 0.95)" />
      <text x="16" y="346" fill="#64748b" fontSize="9" fontFamily="monospace">
        PREREQUISITE: Dual-client split capture · Morph 3 props, show pivot correction, rotation lock toggle
      </text>
    </svg>
  );
};
