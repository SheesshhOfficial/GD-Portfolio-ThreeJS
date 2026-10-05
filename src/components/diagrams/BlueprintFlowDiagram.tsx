import React from 'react';

export const BlueprintFlowDiagram: React.FC = () => {
  return (
    <div style={{ width: '100%', overflowX: 'auto', background: '#080d14', borderRadius: '8px', padding: '1rem', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
      <svg
        viewBox="0 0 960 490"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Blueprint execution flow diagram for prop transformation and pivot correction"
        style={{ width: '100%', minWidth: '700px', height: 'auto', display: 'block' }}
      >
        <defs>
          {/* Blueprint Grid Pattern */}
          <pattern id="bp-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />
          </pattern>
          <linearGradient id="execGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
          <linearGradient id="multicastGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <linearGradient id="pivotGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
          <filter id="shadow" x="-5%" y="-5%" width="110%" height="115%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* Blueprint background grid */}
        <rect width="960" height="490" fill="#0b111a" rx="6" />
        <rect width="960" height="490" fill="url(#bp-grid)" rx="6" />

        {/* Connecting Execution Splines */}
        {/* Node 1 to Node 2 */}
        <path d="M 200 95 C 235 95, 235 95, 260 95" stroke="#38bdf8" strokeWidth="2.5" fill="none" />
        {/* Node 2 to Node 3 */}
        <path d="M 440 95 C 470 95, 470 95, 495 95" stroke="#38bdf8" strokeWidth="2.5" fill="none" />
        {/* Node 3 to Node 4 */}
        <path d="M 690 95 C 720 95, 720 95, 745 95" stroke="#38bdf8" strokeWidth="2.5" fill="none" />
        {/* Node 4 (True) to Node 5 */}
        <path d="M 850 160 C 850 210, 180 210, 180 270" stroke="url(#multicastGrad)" strokeWidth="2.5" strokeDasharray="4 2" fill="none" />
        {/* Node 5 to Node 6 */}
        <path d="M 390 325 C 420 325, 420 325, 450 325" stroke="#10b981" strokeWidth="2.5" fill="none" />
        {/* Node 6 to Node 7 */}
        <path d="M 650 325 C 680 325, 680 325, 710 325" stroke="url(#pivotGrad)" strokeWidth="2.5" fill="none" />

        {/* ================= NODE 1: Enhanced Input ================= */}
        <g transform="translate(30, 40)" filter="url(#shadow)">
          <rect width="170" height="110" rx="6" fill="#151d2a" stroke="#334155" strokeWidth="1.5" />
          <path d="M 0 6 Q 0 0, 6 0 L 164 0 Q 170 0, 170 6 L 170 28 L 0 28 Z" fill="#0284c7" />
          <text x="10" y="19" fill="#f8fafc" fontSize="11" fontWeight="700" fontFamily="monospace">IA_ChangeProp</text>
          <text x="10" y="46" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">Input: Enhanced Action</text>
          <text x="10" y="62" fill="#38bdf8" fontSize="9" fontFamily="sans-serif">Trigger: Pressed (E)</text>
          <circle cx="160" cy="55" r="4.5" fill="#38bdf8" />
          <rect x="10" y="86" width="130" height="15" rx="3" fill="rgba(56, 189, 248, 0.15)" />
          <text x="15" y="97" fill="#7dd3fc" fontSize="8" fontWeight="600" fontFamily="monospace">VERIFIED_IMPL</text>
        </g>

        {/* ================= NODE 2: Server RPC ================= */}
        <g transform="translate(260, 40)" filter="url(#shadow)">
          <rect width="180" height="110" rx="6" fill="#151d2a" stroke="#334155" strokeWidth="1.5" />
          <path d="M 0 6 Q 0 0, 6 0 L 174 0 Q 180 0, 180 6 L 180 28 L 0 28 Z" fill="#2563eb" />
          <text x="10" y="19" fill="#f8fafc" fontSize="11" fontWeight="700" fontFamily="monospace">ChangePropOnServer</text>
          <circle cx="8" cy="55" r="4.5" fill="#38bdf8" />
          <text x="18" y="58" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">Reliable Server RPC</text>
          <text x="18" y="74" fill="#cbd5e1" fontSize="9" fontFamily="sans-serif">PropChangesLeft &gt; 0</text>
          <circle cx="170" cy="55" r="4.5" fill="#38bdf8" />
          <rect x="10" y="86" width="140" height="15" rx="3" fill="rgba(56, 189, 248, 0.15)" />
          <text x="15" y="97" fill="#7dd3fc" fontSize="8" fontWeight="600" fontFamily="monospace">VERIFIED_IMPL (Max=10)</text>
        </g>

        {/* ================= NODE 3: Sphere Trace ================= */}
        <g transform="translate(495, 40)" filter="url(#shadow)">
          <rect width="195" height="110" rx="6" fill="#151d2a" stroke="#334155" strokeWidth="1.5" />
          <path d="M 0 6 Q 0 0, 6 0 L 189 0 Q 195 0, 195 6 L 195 28 L 0 28 Z" fill="#0d9488" />
          <text x="10" y="19" fill="#f8fafc" fontSize="11" fontWeight="700" fontFamily="monospace">SphereTraceSingle</text>
          <circle cx="8" cy="55" r="4.5" fill="#38bdf8" />
          <text x="18" y="58" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">Channel: Interaction</text>
          <text x="18" y="74" fill="#cbd5e1" fontSize="9" fontFamily="sans-serif">Hit: StaticMeshActor</text>
          <circle cx="185" cy="55" r="4.5" fill="#38bdf8" />
          <rect x="10" y="86" width="150" height="15" rx="3" fill="rgba(56, 189, 248, 0.15)" />
          <text x="15" y="97" fill="#7dd3fc" fontSize="8" fontWeight="600" fontFamily="monospace">VERIFIED_IMPL (Cast SMA)</text>
        </g>

        {/* ================= NODE 4: Mesh Validation ================= */}
        <g transform="translate(745, 40)" filter="url(#shadow)">
          <rect width="185" height="120" rx="6" fill="#151d2a" stroke="#334155" strokeWidth="1.5" />
          <path d="M 0 6 Q 0 0, 6 0 L 179 0 Q 185 0, 185 6 L 185 28 L 0 28 Z" fill="#7c3aed" />
          <text x="10" y="19" fill="#f8fafc" fontSize="11" fontWeight="700" fontFamily="monospace">PropAllowedMesh</text>
          <circle cx="8" cy="55" r="4.5" fill="#38bdf8" />
          <text x="18" y="58" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">Array_Contains Check</text>
          <text x="18" y="74" fill="#cbd5e1" fontSize="9" fontFamily="sans-serif">Branch: True / Valid</text>
          <circle cx="105" cy="115" r="4.5" fill="#10b981" />
          <rect x="10" y="94" width="140" height="15" rx="3" fill="rgba(56, 189, 248, 0.15)" />
          <text x="15" y="105" fill="#7dd3fc" fontSize="8" fontWeight="600" fontFamily="monospace">VERIFIED_IMPL</text>
        </g>

        {/* ================= NODE 5: Multicast Replication ================= */}
        <g transform="translate(180, 270)" filter="url(#shadow)">
          <rect width="210" height="110" rx="6" fill="#151d2a" stroke="#334155" strokeWidth="1.5" />
          <path d="M 0 6 Q 0 0, 6 0 L 204 0 Q 210 0, 210 6 L 210 28 L 0 28 Z" fill="#059669" />
          <text x="10" y="19" fill="#f8fafc" fontSize="11" fontWeight="700" fontFamily="monospace">UpdateMeshMulticast</text>
          <circle cx="8" cy="55" r="4.5" fill="#10b981" />
          <text x="18" y="58" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">Multicast RPC (All Clients)</text>
          <text x="18" y="74" fill="#cbd5e1" fontSize="9" fontFamily="sans-serif">Param: NewMesh (StaticMesh)</text>
          <circle cx="200" cy="55" r="4.5" fill="#10b981" />
          <rect x="10" y="86" width="150" height="15" rx="3" fill="rgba(56, 189, 248, 0.15)" />
          <text x="15" y="97" fill="#7dd3fc" fontSize="8" fontWeight="600" fontFamily="monospace">VERIFIED_IMPL (Broadcast)</text>
        </g>

        {/* ================= NODE 6: Set Static Mesh ================= */}
        <g transform="translate(450, 270)" filter="url(#shadow)">
          <rect width="200" height="110" rx="6" fill="#151d2a" stroke="#334155" strokeWidth="1.5" />
          <path d="M 0 6 Q 0 0, 6 0 L 194 0 Q 200 0, 200 6 L 200 28 L 0 28 Z" fill="#4f46e5" />
          <text x="10" y="19" fill="#f8fafc" fontSize="11" fontWeight="700" fontFamily="monospace">SetStaticMesh</text>
          <circle cx="8" cy="55" r="4.5" fill="#10b981" />
          <text x="18" y="58" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">Target: PropMesh Component</text>
          <text x="18" y="74" fill="#cbd5e1" fontSize="9" fontFamily="sans-serif">New Mesh: Assigned</text>
          <circle cx="190" cy="55" r="4.5" fill="#f59e0b" />
          <rect x="10" y="86" width="140" height="15" rx="3" fill="rgba(56, 189, 248, 0.15)" />
          <text x="15" y="97" fill="#7dd3fc" fontSize="8" fontWeight="600" fontFamily="monospace">VERIFIED_IMPL</text>
        </g>

        {/* ================= NODE 7: Pivot Correction ================= */}
        <g transform="translate(710, 270)" filter="url(#shadow)">
          <rect width="220" height="110" rx="6" fill="#151d2a" stroke="#f59e0b" strokeWidth="1.5" />
          <path d="M 0 6 Q 0 0, 6 0 L 214 0 Q 220 0, 220 6 L 220 28 L 0 28 Z" fill="#d97706" />
          <text x="10" y="19" fill="#f8fafc" fontSize="11" fontWeight="700" fontFamily="monospace">MeshWithFAlsePivot</text>
          <circle cx="8" cy="55" r="4.5" fill="#f59e0b" />
          <text x="18" y="58" fill="#fef3c7" fontSize="9" fontFamily="sans-serif">Check Array &amp; Apply Offset</text>
          <text x="18" y="74" fill="#cbd5e1" fontSize="9" fontFamily="sans-serif">K2_SetRelativeLocation</text>
          <rect x="10" y="86" width="170" height="15" rx="3" fill="rgba(245, 158, 11, 0.2)" />
          <text x="15" y="97" fill="#fde68a" fontSize="8" fontWeight="600" fontFamily="monospace">VERIFIED_IMPL (Ground Offset)</text>
        </g>

        {/* ================= NODE 8: Camera Decoupling (Parallel) ================= */}
        <g transform="translate(30, 395)" filter="url(#shadow)">
          <rect width="360" height="75" rx="6" fill="#151d2a" stroke="#e11d48" strokeWidth="1.2" />
          <path d="M 0 6 Q 0 0, 6 0 L 354 0 Q 360 0, 360 6 L 360 24 L 0 24 Z" fill="#be123c" />
          <text x="10" y="16" fill="#f8fafc" fontSize="11" fontWeight="700" fontFamily="monospace">IA_RotationLock (Yaw Decoupling)</text>
          <text x="10" y="42" fill="#cbd5e1" fontSize="9" fontFamily="sans-serif">bUseControllerRotationYaw = false toggle configured; runtime orbit capture pending</text>
          <rect x="10" y="53" width="140" height="15" rx="3" fill="rgba(244, 63, 94, 0.15)" />
          <text x="15" y="64" fill="#fda4af" fontSize="8" fontWeight="600" fontFamily="monospace">VERIFIED_IMPL</text>
        </g>

        {/* Unverified Boundary Callout Strip inside diagram */}
        <g transform="translate(450, 400)">
          <rect width="480" height="70" rx="4" fill="rgba(239, 68, 68, 0.1)" stroke="rgba(239, 68, 68, 0.35)" strokeDasharray="3 3" />
          <text x="12" y="20" fill="#fca5a5" fontSize="10" fontWeight="700" fontFamily="sans-serif">⚠️ Architectural Boundary (UNVERIFIED in Inspected Graphs)</text>
          <text x="12" y="38" fill="#fecaca" fontSize="8.5" fontFamily="sans-serif">Dynamic UCapsuleComponent resizing [CapsuleRadius = 0.5 * max(Ex, Ey)] and pre-transform</text>
          <text x="12" y="52" fill="#fecaca" fontSize="8.5" fontFamily="sans-serif">collision sweeps NOT found in BP_propChar; runtime capsule behavior is UNVERIFIED.</text>
        </g>
      </svg>
    </div>
  );
};
