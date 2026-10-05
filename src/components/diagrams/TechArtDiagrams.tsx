import React from 'react';

/**
 * Modern UE5 IK Rig & Retargeter Editor Inspection Schematic
 * Restrained editor-style vector schematic representing the verified asset presence
 * (RTG_NewRetargeter, stormtrooperikrig, oldmilitiryrig) and the inspection checklist
 * required to evaluate internal chain mappings and rest pose alignment.
 */
export const IKRetargeterDiagram: React.FC = () => {
  return (
    <div
      style={{
        background: '#080d14',
        border: '1px solid rgba(56, 189, 248, 0.25)',
        borderRadius: '8px',
        padding: '1.25rem',
        margin: '1rem 0',
        overflowX: 'auto',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#38bdf8', fontWeight: 600 }}>
          UE5 IK RETARGETER · ASSET PRESENCE VERIFIED (RTG_NewRetargeter.uasset)
        </span>
        <span style={{ fontSize: '0.6875rem', background: 'rgba(2, 132, 199, 0.15)', color: '#38bdf8', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>
          Asset presence verified
        </span>
      </div>

      <svg
        viewBox="0 0 720 280"
        style={{ width: '100%', height: 'auto', display: 'block', minWidth: '600px' }}
        aria-label="UE5 IK Retargeter Editor Inspection Checklist"
        role="img"
      >
        <defs>
          <linearGradient id="sourceGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="targetGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <marker id="arrowCyan" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M 1 1 L 7 4 L 1 7 Z" fill="#38bdf8" />
          </marker>
        </defs>

        {/* Source Asset Box */}
        <rect x="20" y="30" width="200" height="220" rx="6" fill="url(#sourceGrad)" stroke="#334155" strokeWidth="1" />
        <rect x="20" y="30" width="200" height="32" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1" />
        <text x="35" y="52" fill="#94a3b8" fontSize="11" fontWeight="700" fontFamily="sans-serif">
          ASSET: oldmilitiryrig.uasset
        </text>
        <text x="35" y="70" fill="#64748b" fontSize="8.5" fontFamily="monospace">Content/Core/ANIMATION/OldChar</text>

        {/* Source Checklist Items */}
        <g fontSize="9.5" fontFamily="sans-serif" fill="#cbd5e1">
          <rect x="35" y="85" width="170" height="24" rx="4" fill="#0f172a" stroke="#1e293b" />
          <text x="45" y="101" fill="#7dd3fc">1. Inspect Root Bone Mapping</text>

          <rect x="35" y="115" width="170" height="24" rx="4" fill="#0f172a" stroke="#1e293b" />
          <text x="45" y="131" fill="#7dd3fc">2. Inspect Spine Solver Chains</text>

          <rect x="35" y="145" width="170" height="24" rx="4" fill="#0f172a" stroke="#1e293b" />
          <text x="45" y="161" fill="#7dd3fc">3. Inspect Arm Limb Chains</text>

          <rect x="35" y="175" width="170" height="24" rx="4" fill="#0f172a" stroke="#1e293b" />
          <text x="45" y="191" fill="#7dd3fc">4. Inspect Leg IK Goal Setup</text>

          <rect x="35" y="205" width="170" height="34" rx="4" fill="#1e1b4b" stroke="#6366f1" strokeWidth="0.5" />
          <text x="43" y="219" fill="#c7d2fe" fontSize="8" fontWeight="600">PROVENANCE_PENDING</text>
          <text x="43" y="231" fill="#a5b4fc" fontSize="7.5">Base armature &amp; anim origin</text>
        </g>

        {/* Central Retargeter Inspection Hub */}
        <rect x="260" y="35" width="200" height="210" rx="8" fill="#0c1929" stroke="#0284c7" strokeWidth="1.5" />
        <rect x="260" y="35" width="200" height="30" rx="8" fill="#0369a1" />
        <text x="275" y="55" fill="#f8fafc" fontSize="11" fontWeight="700" fontFamily="sans-serif">
          RTG_NewRetargeter.uasset
        </text>
        <text x="275" y="80" fill="#38bdf8" fontSize="9.5" fontFamily="monospace">Editor Inspection Checklist</text>

        <rect x="272" y="90" width="176" height="26" rx="4" fill="#082f49" stroke="#0ea5e9" strokeWidth="0.5" />
        <text x="280" y="103" fill="#7dd3fc" fontSize="8.5" fontFamily="sans-serif">Step 1: Identify Source/Target Rigs</text>
        <text x="280" y="112" fill="#38bdf8" fontSize="7.5" fontFamily="monospace">Status: Inspection Pending</text>

        <rect x="272" y="122" width="176" height="26" rx="4" fill="#082f49" stroke="#0ea5e9" strokeWidth="0.5" />
        <text x="280" y="135" fill="#7dd3fc" fontSize="8.5" fontFamily="sans-serif">Step 2: Inspect Chain Mappings</text>
        <text x="280" y="144" fill="#38bdf8" fontSize="7.5" fontFamily="monospace">Status: Mapping Review Pending</text>

        <rect x="272" y="154" width="176" height="26" rx="4" fill="#082f49" stroke="#0ea5e9" strokeWidth="0.5" />
        <text x="280" y="167" fill="#7dd3fc" fontSize="8.5" fontFamily="sans-serif">Step 3: Compare Rest Base Poses</text>
        <text x="280" y="176" fill="#38bdf8" fontSize="7.5" fontFamily="monospace">Status: Alignment Check Pending</text>

        <rect x="272" y="186" width="176" height="48" rx="4" fill="#1e1b4b" stroke="#6366f1" strokeWidth="0.5" />
        <text x="280" y="200" fill="#c7d2fe" fontSize="8.5" fontWeight="600" fontFamily="sans-serif">Step 4: Viewport Motion Capture</text>
        <text x="280" y="211" fill="#a5b4fc" fontSize="8" fontFamily="sans-serif">Capture: TA-IKRETARGET pending</text>
        <text x="280" y="222" fill="#818cf8" fontSize="7.5" fontFamily="sans-serif">Zero-distortion claim: Unverified</text>

        {/* Target Asset Box */}
        <rect x="500" y="30" width="200" height="220" rx="6" fill="url(#targetGrad)" stroke="#334155" strokeWidth="1" />
        <rect x="500" y="30" width="200" height="32" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1" />
        <text x="515" y="52" fill="#94a3b8" fontSize="11" fontWeight="700" fontFamily="sans-serif">
          ASSET: stormtrooperikrig.uasset
        </text>
        <text x="515" y="70" fill="#64748b" fontSize="8.5" fontFamily="monospace">Content/Core/characters/1</text>

        {/* Target Checklist Items */}
        <g fontSize="9.5" fontFamily="sans-serif" fill="#cbd5e1">
          <rect x="515" y="85" width="170" height="24" rx="4" fill="#0f172a" stroke="#1e293b" />
          <text x="525" y="101" fill="#7dd3fc">1. Verify Target Root Chain</text>

          <rect x="515" y="115" width="170" height="24" rx="4" fill="#0f172a" stroke="#1e293b" />
          <text x="525" y="131" fill="#7dd3fc">2. Verify Target Spine Chains</text>

          <rect x="515" y="145" width="170" height="24" rx="4" fill="#0f172a" stroke="#1e293b" />
          <text x="525" y="161" fill="#7dd3fc">3. Verify Target Arm Chains</text>

          <rect x="515" y="175" width="170" height="24" rx="4" fill="#0f172a" stroke="#1e293b" />
          <text x="525" y="191" fill="#7dd3fc">4. Verify Target Leg Chains</text>

          <rect x="515" y="205" width="170" height="34" rx="4" fill="#1e1b4b" stroke="#6366f1" strokeWidth="0.5" />
          <text x="523" y="219" fill="#c7d2fe" fontSize="8" fontWeight="600">PROVENANCE_PENDING</text>
          <text x="523" y="231" fill="#a5b4fc" fontSize="7.5">Base armature &amp; mesh origin</text>
        </g>

        {/* Inspection Flow Connectors */}
        <path d="M 205 105 L 260 105" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" markerEnd="url(#arrowCyan)" />
        <path d="M 205 155 L 260 135" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" markerEnd="url(#arrowCyan)" />
        <path d="M 460 105 L 500 105" stroke="#38bdf8" strokeWidth="1.5" markerEnd="url(#arrowCyan)" />
        <path d="M 460 135 L 500 155" stroke="#38bdf8" strokeWidth="1.5" markerEnd="url(#arrowCyan)" />

        {/* Footer Note */}
        <text x="20" y="268" fill="#64748b" fontSize="8.5" fontFamily="sans-serif">
          Inspection boundary: RTG_NewRetargeter and both IK Rig files exist in project. Internal solver setup, chain bindings, and motion quality remain editor inspection pending.
        </text>
      </svg>
    </div>
  );
};

/**
 * PhAT Character Physics Asset Editor Inspection Schematic
 * Restrained editor-style vector schematic representing verified asset file presence
 * (StormTrooper_PhysicsAsset.uasset) and the PhAT inspection checklist required
 * to inventory bodies, inspect constraints, review collisions, and record simulation.
 */
export const RagdollPhysicsDiagram: React.FC = () => {
  return (
    <div
      style={{
        background: '#080d14',
        border: '1px solid rgba(56, 189, 248, 0.25)',
        borderRadius: '8px',
        padding: '1.25rem',
        margin: '1rem 0',
        overflowX: 'auto',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#38bdf8', fontWeight: 600 }}>
          UNREAL ENGINE PhAT · ASSET PRESENCE VERIFIED (StormTrooper_PhysicsAsset.uasset)
        </span>
        <span style={{ fontSize: '0.6875rem', background: 'rgba(2, 132, 199, 0.15)', color: '#38bdf8', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>
          Asset presence verified
        </span>
      </div>

      <svg
        viewBox="0 0 720 280"
        style={{ width: '100%', height: 'auto', display: 'block', minWidth: '600px' }}
        aria-label="PhAT Physics Asset Editor Inspection Checklist"
        role="img"
      >
        {/* Editor Outline Grid */}
        <rect x="20" y="25" width="680" height="235" rx="6" fill="#0d1520" stroke="#1e293b" strokeWidth="1" />

        {/* Left Column: PhAT Asset Inspection Steps */}
        <rect x="35" y="40" width="220" height="205" rx="6" fill="#090e17" stroke="#334155" strokeWidth="1" />
        <rect x="35" y="40" width="220" height="28" rx="6" fill="#1e293b" />
        <text x="48" y="58" fill="#e2e8f0" fontSize="10.5" fontWeight="700" fontFamily="sans-serif">
          PhAT Inspection Checklist
        </text>

        <g fontSize="9" fontFamily="sans-serif" fill="#94a3b8">
          <rect x="48" y="76" width="194" height="26" rx="4" fill="#0f172a" stroke="#1e293b" />
          <text x="56" y="93" fill="#38bdf8">1. Open Asset in PhAT Editor</text>

          <rect x="48" y="108" width="194" height="26" rx="4" fill="#0f172a" stroke="#1e293b" />
          <text x="56" y="125" fill="#38bdf8">2. Inventory Configured Bodies</text>

          <rect x="48" y="140" width="194" height="26" rx="4" fill="#0f172a" stroke="#1e293b" />
          <text x="56" y="157" fill="#38bdf8">3. Inspect Joint Constraints</text>

          <rect x="48" y="172" width="194" height="26" rx="4" fill="#0f172a" stroke="#1e293b" />
          <text x="56" y="189" fill="#38bdf8">4. Review Collision Presets</text>

          <rect x="48" y="204" width="194" height="26" rx="4" fill="#0f172a" stroke="#1e293b" />
          <text x="56" y="221" fill="#38bdf8">5. Record Live Simulation</text>
        </g>

        {/* Center Column: Angular Constraints Schematic */}
        <rect x="270" y="40" width="200" height="205" rx="6" fill="#090e17" stroke="#334155" strokeWidth="1" />
        <rect x="270" y="40" width="200" height="28" rx="6" fill="#1e293b" />
        <text x="282" y="58" fill="#e2e8f0" fontSize="10.5" fontWeight="700" fontFamily="sans-serif">
          Constraint Inspection Review
        </text>

        {/* Joint Cone Visual */}
        <g transform="translate(370, 140)">
          <path d="M -50 -35 A 60 60 0 0 1 50 -35 L 0 20 Z" fill="rgba(56, 189, 248, 0.15)" stroke="#38bdf8" strokeWidth="1.5" />
          <line x1="0" y1="20" x2="-50" y2="-35" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
          <line x1="0" y1="20" x2="50" y2="-35" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
          <line x1="0" y1="20" x2="0" y2="-50" stroke="#10b981" strokeWidth="1.5" />
          <circle cx="0" cy="20" r="5" fill="#f8fafc" />
          <text x="-48" y="-45" fill="#f59e0b" fontSize="8" fontFamily="sans-serif">Inspect Swing Limits</text>
          <text x="10" y="-45" fill="#f59e0b" fontSize="8" fontFamily="sans-serif">Inspect Twist Limit</text>
          <text x="-35" y="42" fill="#cbd5e1" fontSize="9" fontFamily="sans-serif">Angular Joint Cone</text>
          <text x="-52" y="54" fill="#64748b" fontSize="7.5" fontFamily="sans-serif">Calibration values pending inspection</text>
        </g>

        {/* Right Column: Evidence & Technical Boundary */}
        <rect x="485" y="40" width="200" height="205" rx="6" fill="#090e17" stroke="#334155" strokeWidth="1" />
        <rect x="485" y="40" width="200" height="28" rx="6" fill="#1e293b" />
        <text x="497" y="58" fill="#e2e8f0" fontSize="10.5" fontWeight="700" fontFamily="sans-serif">
          Engineering Audit Boundary
        </text>

        <g fontSize="8.5" fontFamily="sans-serif">
          <rect x="495" y="76" width="180" height="42" rx="4" fill="#022c22" stroke="#059669" strokeWidth="0.5" />
          <text x="502" y="90" fill="#6ee7b7" fontWeight="600">Asset File Verified</text>
          <text x="502" y="102" fill="#a7f3d0">StormTrooper_PhysicsAsset exists</text>
          <text x="502" y="112" fill="#a7f3d0">File present in Content/Core/characters/1</text>

          <rect x="495" y="124" width="180" height="48" rx="4" fill="#451a03" stroke="#b45309" strokeWidth="0.5" />
          <text x="502" y="138" fill="#fcd34d" fontWeight="600">Ragdoll Blending Boundary</text>
          <text x="502" y="150" fill="#fde68a">Animation-to-ragdoll blending was not</text>
          <text x="502" y="160" fill="#fde68a">verified in the inspected scope</text>

          <rect x="495" y="178" width="180" height="54" rx="4" fill="#1e1b4b" stroke="#6366f1" strokeWidth="0.5" />
          <text x="502" y="192" fill="#c7d2fe" fontWeight="600">Required Capture Media</text>
          <text x="502" y="204" fill="#e0e7ff">TA-RAGDOLL (15–25s PhAT test)</text>
          <text x="502" y="215" fill="#a5b4fc">Simulation stability &amp; constraint</text>
          <text x="502" y="225" fill="#a5b4fc">response pending live recording</text>
        </g>
      </svg>
    </div>
  );
};

/**
 * Hard-Surface Asset Submission Requirements Diagram (EX-3D-ASSET-01)
 * Evidence-request card specification showing required deliverables from Ashish Ranjan.
 */
export const HardSurfaceSubmissionDiagram: React.FC = () => {
  return (
    <div
      style={{
        background: '#080d14',
        border: '1px solid rgba(245, 158, 11, 0.35)',
        borderRadius: '8px',
        padding: '1.25rem',
        margin: '1rem 0',
        overflowX: 'auto',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#f59e0b', fontWeight: 600 }}>
          EVIDENCE REQUEST · 3D HARD-SURFACE ASSET PIPELINE (3D-TURNTABLE-01)
        </span>
        <span style={{ fontSize: '0.6875rem', background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>
          Evidence needed
        </span>
      </div>

      <svg
        viewBox="0 0 720 220"
        style={{ width: '100%', height: 'auto', display: 'block', minWidth: '600px' }}
        aria-label="Hard Surface Asset Submission Specifications"
        role="img"
      >
        {/* Specification Cards Grid */}
        <g transform="translate(15, 20)">
          {/* Criteria 1: Source Model */}
          <rect x="0" y="0" width="160" height="175" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1" />
          <rect x="0" y="0" width="160" height="28" rx="6" fill="#1e293b" />
          <text x="12" y="18" fill="#f8fafc" fontSize="10" fontWeight="700" fontFamily="sans-serif">1. Source .blend File</text>
          <text x="12" y="46" fill="#fbbf24" fontSize="8" fontWeight="600" fontFamily="sans-serif">Authorship confirmation required</text>
          <text x="12" y="62" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">• Intact modifier stack</text>
          <text x="12" y="78" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">• Weighted Normal setup</text>
          <text x="12" y="94" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">• Construction history</text>
          <text x="12" y="110" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">• Written confirmation</text>
          <rect x="10" y="130" width="140" height="32" rx="4" fill="rgba(245, 158, 11, 0.1)" stroke="#b45309" strokeWidth="0.5" />
          <text x="18" y="145" fill="#f59e0b" fontSize="8" fontFamily="monospace">STATUS: PENDING</text>
          <text x="18" y="156" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">Awaiting file submission</text>

          {/* Criteria 2: Topology Standards */}
          <rect x="175" y="0" width="160" height="175" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1" />
          <rect x="175" y="0" width="160" height="28" rx="6" fill="#1e293b" />
          <text x="187" y="18" fill="#f8fafc" fontSize="10" fontWeight="700" fontFamily="sans-serif">2. Quad Topology</text>
          <text x="187" y="46" fill="#38bdf8" fontSize="8.5" fontWeight="600" fontFamily="sans-serif">Review Criteria</text>
          <text x="187" y="62" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">• Quad-dominant flow</text>
          <text x="187" y="78" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">• Clean bevel loops</text>
          <text x="187" y="94" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">• Evaluate non-manifold</text>
          <text x="187" y="110" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">• Document triangle budget</text>
          <rect x="185" y="130" width="140" height="32" rx="4" fill="rgba(56, 189, 248, 0.1)" stroke="#0284c7" strokeWidth="0.5" />
          <text x="193" y="145" fill="#38bdf8" fontSize="8" fontFamily="monospace">CHECK: WIREFRAME</text>
          <text x="193" y="156" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">Requires overlay proof</text>

          {/* Criteria 3: Export Units */}
          <rect x="350" y="0" width="160" height="175" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1" />
          <rect x="350" y="0" width="160" height="28" rx="6" fill="#1e293b" />
          <text x="362" y="18" fill="#f8fafc" fontSize="10" fontWeight="700" fontFamily="sans-serif">3. Export Standards</text>
          <text x="362" y="46" fill="#34d399" fontSize="8.5" fontWeight="600" fontFamily="sans-serif">Unreal Conversion</text>
          <text x="362" y="62" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">• Metric Centimeters</text>
          <text x="362" y="78" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">• Unit export scale</text>
          <text x="362" y="94" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">• Z-Up / -Y Forward</text>
          <text x="362" y="110" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">• Grounded mesh pivot</text>
          <rect x="360" y="130" width="140" height="32" rx="4" fill="rgba(16, 185, 129, 0.1)" stroke="#059669" strokeWidth="0.5" />
          <text x="368" y="145" fill="#34d399" fontSize="8" fontFamily="monospace">SCALE: CENTIMETERS</text>
          <text x="368" y="156" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">Must match UE5 engine units</text>

          {/* Criteria 4: Media Deliverable */}
          <rect x="525" y="0" width="165" height="175" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1" />
          <rect x="525" y="0" width="165" height="28" rx="6" fill="#1e293b" />
          <text x="537" y="18" fill="#f8fafc" fontSize="10" fontWeight="700" fontFamily="sans-serif">4. Media Deliverable</text>
          <text x="537" y="46" fill="#a78bfa" fontSize="8.5" fontWeight="600" fontFamily="sans-serif">3D-TURNTABLE-01</text>
          <text x="537" y="62" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">• 30s 360° turnaround</text>
          <text x="537" y="78" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">• Shaded + Wireframe pass</text>
          <text x="537" y="94" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">• Turnaround recording</text>
          <text x="537" y="110" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">• Neutral lighting</text>
          <rect x="535" y="130" width="145" height="32" rx="4" fill="rgba(139, 92, 246, 0.1)" stroke="#7c3aed" strokeWidth="0.5" />
          <text x="543" y="145" fill="#a78bfa" fontSize="8" fontFamily="monospace">REQUIRED: VIDEO MP4</text>
          <text x="543" y="156" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">content/media/3d-art/</text>
        </g>
      </svg>
    </div>
  );
};

/**
 * UV Optimization & PBR Texturing Submission Requirements Diagram (EX-3D-TEXTURING)
 * Evidence-request card specification showing required deliverables from Ashish Ranjan.
 */
export const UVTexturingSubmissionDiagram: React.FC = () => {
  return (
    <div
      style={{
        background: '#080d14',
        border: '1px solid rgba(245, 158, 11, 0.35)',
        borderRadius: '8px',
        padding: '1.25rem',
        margin: '1rem 0',
        overflowX: 'auto',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#f59e0b', fontWeight: 600 }}>
          EVIDENCE REQUEST · UV UNWRAPPING &amp; PBR TEXTURING PIPELINE (3D-UV-BREAKDOWN)
        </span>
        <span style={{ fontSize: '0.6875rem', background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>
          Evidence needed
        </span>
      </div>

      <svg
        viewBox="0 0 720 220"
        style={{ width: '100%', height: 'auto', display: 'block', minWidth: '600px' }}
        aria-label="UV Optimization and PBR Texturing Submission Specifications"
        role="img"
      >
        <g transform="translate(15, 20)">
          {/* Deliverable 1: UV Island Packing */}
          <rect x="0" y="0" width="160" height="175" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1" />
          <rect x="0" y="0" width="160" height="28" rx="6" fill="#1e293b" />
          <text x="12" y="18" fill="#f8fafc" fontSize="10" fontWeight="700" fontFamily="sans-serif">1. UV Island Packing</text>
          <text x="12" y="46" fill="#fbbf24" fontSize="8" fontWeight="600" fontFamily="sans-serif">Authorship confirmation required</text>
          <text x="12" y="62" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">• Strategic seam placement</text>
          <text x="12" y="78" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">• Adequate island padding</text>
          <text x="12" y="94" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">• Non-overlapping shells</text>
          <text x="12" y="110" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">• Minimal angle distortion</text>
          <rect x="10" y="130" width="140" height="32" rx="4" fill="rgba(245, 158, 11, 0.1)" stroke="#b45309" strokeWidth="0.5" />
          <text x="18" y="145" fill="#f59e0b" fontSize="8" fontFamily="monospace">STATUS: PENDING</text>
          <text x="18" y="156" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">Awaiting UV layout export</text>

          {/* Deliverable 2: Texel Density */}
          <rect x="175" y="0" width="160" height="175" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1" />
          <rect x="175" y="0" width="160" height="28" rx="6" fill="#1e293b" />
          <text x="187" y="18" fill="#f8fafc" fontSize="10" fontWeight="700" fontFamily="sans-serif">2. Texel Density Test</text>
          <text x="187" y="46" fill="#38bdf8" fontSize="8.5" fontWeight="600" fontFamily="sans-serif">Review Criteria</text>
          <text x="187" y="62" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">• Uniform px/cm scale</text>
          <text x="187" y="78" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">• Record chosen measurement</text>
          <text x="187" y="94" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">• Zero stretching or shear</text>
          <text x="187" y="110" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">• Shell ratio balance</text>
          <rect x="185" y="130" width="140" height="32" rx="4" fill="rgba(56, 189, 248, 0.1)" stroke="#0284c7" strokeWidth="0.5" />
          <text x="193" y="145" fill="#38bdf8" fontSize="8" fontFamily="monospace">PROOF: CHECKERBOARD</text>
          <text x="193" y="156" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">3D-UV-BREAKDOWN render</text>

          {/* Deliverable 3: PBR Texture Set */}
          <rect x="350" y="0" width="160" height="175" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1" />
          <rect x="350" y="0" width="160" height="28" rx="6" fill="#1e293b" />
          <text x="362" y="18" fill="#f8fafc" fontSize="10" fontWeight="700" fontFamily="sans-serif">3. PBR Channels</text>
          <text x="362" y="46" fill="#34d399" fontSize="8.5" fontWeight="600" fontFamily="sans-serif">Authored Maps</text>
          <text x="362" y="62" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">• BaseColor (sRGB)</text>
          <text x="362" y="78" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">• Normal (DirectX tangent)</text>
          <text x="362" y="94" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">• Roughness (Linear)</text>
          <text x="362" y="110" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">• Metallic (Linear)</text>
          <rect x="360" y="130" width="140" height="32" rx="4" fill="rgba(16, 185, 129, 0.1)" stroke="#059669" strokeWidth="0.5" />
          <text x="368" y="145" fill="#34d399" fontSize="8" fontFamily="monospace">MAPS: PBR CHANNELS</text>
          <text x="368" y="156" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">Standard PBR texture set</text>

          {/* Deliverable 4: Packed ORM Map */}
          <rect x="525" y="0" width="165" height="175" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1" />
          <rect x="525" y="0" width="165" height="28" rx="6" fill="#1e293b" />
          <text x="537" y="18" fill="#f8fafc" fontSize="10" fontWeight="700" fontFamily="sans-serif">4. Texture Packing</text>
          <text x="537" y="46" fill="#a78bfa" fontSize="8.5" fontWeight="600" fontFamily="sans-serif">Unreal ORM Format</text>
          <text x="537" y="62" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">• Red: Ambient Occlusion</text>
          <text x="537" y="78" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">• Green: Roughness</text>
          <text x="537" y="94" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">• Blue: Metallic</text>
          <text x="537" y="110" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">• Single texture sampler</text>
          <rect x="535" y="130" width="145" height="32" rx="4" fill="rgba(139, 92, 246, 0.1)" stroke="#7c3aed" strokeWidth="0.5" />
          <text x="543" y="145" fill="#a78bfa" fontSize="8" fontFamily="monospace">PACKING: ORM MAP</text>
          <text x="543" y="156" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">Optimized for UE5 shaders</text>
        </g>
      </svg>
    </div>
  );
};
