import React, { lazy, Suspense } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { FEATURED_PROP_HUNT } from '../../data/exhibits';
const OverviewStoryboardSvg = lazy(() =>
  import('../diagrams/MediaStoryboardDiagrams').then((m) => ({
    default: m.OverviewStoryboardSvg,
  }))
);

const TransformStoryboardSvg = lazy(() =>
  import('../diagrams/MediaStoryboardDiagrams').then((m) => ({
    default: m.TransformStoryboardSvg,
  }))
);

import styles from './Static2DView.module.css';

const BlueprintFlowDiagram = lazy(() =>
  import('../diagrams/BlueprintFlowDiagram').then((m) => ({
    default: m.BlueprintFlowDiagram,
  }))
);

export const Static2DView: React.FC = () => {
  const { state, dispatch } = usePortfolio();

  return (
    <main id="main-content" className={styles.container} role="main">
      <div className={styles.wrapper}>
        {/* Editorial Hero */}
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.badgeRow}>
            <span className={styles.heroBadge}>Editorial 2D Gallery</span>
            {!state.webglSupported && (
              <span className={styles.fallbackBadge}>WebGL Fallback Active</span>
            )}
            {state.isReducedMotion && (
              <span className={styles.motionBadge}>Reduced Motion Active</span>
            )}
          </div>
          <h1 id="hero-title" className={styles.heroTitle}>
            Ashish Ranjan
          </h1>
          <p className={styles.heroSubtitle}>
            Gameplay Systems Programming & Technical Art · Unreal Engine 5 & Blender Pipelines
          </p>
          <p className={styles.heroDescription}>
            A technical development portfolio exploring server-routed RPC and multicast replication (runtime authority validation pending),
            Enhanced Input architecture, positional audio pipelines, and modern UE5 IK Retargeters.
          </p>
          {state.webglSupported && (
            <div className={styles.heroActions}>
              <button
                type="button"
                className={styles.switch3dButton}
                onClick={() => dispatch({ type: 'SET_VIEW_MODE', payload: '3d' })}
              >
                Enter 3D Observatory Studio →
              </button>
            </div>
          )}
        </section>

        {/* Featured Project Showcase */}
        <section className={styles.projectSection} aria-labelledby="project-title">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionPillar}>Pillar 1: Featured Game System</span>
            <h2 id="project-title" className={styles.projectTitle}>
              {FEATURED_PROP_HUNT.title}
            </h2>
            <p className={styles.projectSubtitle}>{FEATURED_PROP_HUNT.subtitle}</p>
          </div>

          <div className={styles.projectCard}>
            <div className={styles.metaRow}>
              <span className={styles.engineBadge}>{FEATURED_PROP_HUNT.engine}</span>
              <span className={styles.roleBadge}>Role: Confirmation pending</span>
            </div>

            <div className={styles.tagList}>
              {FEATURED_PROP_HUNT.tools.map((tool) => (
                <span key={tool} className={styles.toolTag}>{tool}</span>
              ))}
            </div>

            <p className={styles.summaryText}>{FEATURED_PROP_HUNT.summary}</p>

            <button
              type="button"
              className={styles.openDrawerBtn}
              onClick={() => dispatch({ type: 'SET_BREAKDOWN_OPEN', payload: true })}
            >
              Open Architecture Breakdown Drawer →
            </button>

            {/* Media Placeholders with Inline Vector Storyboards */}
            <div className={styles.placeholderGrid}>
              <div className={styles.placeholderBox}>
                <div className={styles.placeholderTop}>
                  <span className={styles.badgePending}>Capture pending</span>
                  <span className={styles.mediaId}>{FEATURED_PROP_HUNT.mediaOverviewId}</span>
                </div>
                <h3 className={styles.boxTitle}>Gameplay Overview Reel</h3>
                <Suspense fallback={<div className={styles.diagramSkeleton}>Loading storyboard...</div>}>
                  <OverviewStoryboardSvg />
                </Suspense>
                <p className={styles.boxDesc}>
                  45–60s video evidence demonstrating round loop, disguise, taunts, and elimination from hunter and prop viewpoints.
                </p>
                <span className={styles.evidenceTag}>Requirement: RUNTIME_VERIFIED</span>
              </div>

              <div className={styles.placeholderBox}>
                <div className={styles.placeholderTop}>
                  <span className={styles.badgePending}>Capture pending</span>
                  <span className={styles.mediaId}>{FEATURED_PROP_HUNT.mediaTransformId}</span>
                </div>
                <h3 className={styles.boxTitle}>Multi-View Transformation Clip</h3>
                <Suspense fallback={<div className={styles.diagramSkeleton}>Loading storyboard...</div>}>
                  <TransformStoryboardSvg />
                </Suspense>
                <p className={styles.boxDesc}>
                  20–30s split-screen recording validating host targeting, replicated mesh swap, and pivot correction.
                </p>
                <span className={styles.evidenceTag}>Requirement: RUNTIME_VERIFIED</span>
              </div>
            </div>

            {/* Sourcing and Evidence Boundaries */}
            <div className={styles.provenanceNotice}>
              <strong>Provenance & Sourcing:</strong> {FEATURED_PROP_HUNT.provenanceNote}
            </div>
          </div>
        </section>

        {/* Deep-Dive Architectural Breakdown Section (Inline Editorial) */}
        <section className={styles.breakdownSection} aria-labelledby="breakdown-title">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionPillar}>Technical Deep-Dive: EX-PH-TRANSFORM</span>
            <h2 id="breakdown-title" className={styles.projectTitle}>
              Real-Time Prop Disguise &amp; Pivot Offset Architecture
            </h2>
            <p className={styles.projectSubtitle}>
              Inspected Blueprint graph analysis · Unreal Engine 5.7.4 (BP_propChar)
            </p>
          </div>

          <div className={styles.stepGrid}>
            <div className={styles.stepCard}>
              <div className={styles.stepHeader}>
                <h3 className={styles.stepTitle}>1. Input &amp; Interaction Trace</h3>
                <span className={styles.stepTag}>Client Initiated</span>
              </div>
              <p className={styles.stepDesc}>
                Enhanced Input Action <code>IA_ChangeProp</code> fires a <code>SphereTraceSingle</code> on the interaction channel to detect environmental static mesh actors.
              </p>
              <div className={styles.codeSnippet}>
                IA_ChangeProp -&gt; SphereTraceSingle(ECC_Interaction) -&gt; Cast To StaticMeshActor
              </div>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepHeader}>
                <h3 className={styles.stepTitle}>2. Server RPC &amp; Resource Validation</h3>
                <span className={styles.stepTag}>Server RPC Execution</span>
              </div>
              <p className={styles.stepDesc}>
                Client calls Server RPC <code>ChangePropOnServer</code>. The server checks <code>PropChangesLeft</code> against <code>MaxPropChanges = 10</code> and validates mesh against <code>PropAllowedMesh</code>.
              </p>
              <div className={styles.codeSnippet}>
                ChangePropOnServer(Reliable) -&gt; Check(PropChangesLeft &gt; 0) -&gt; Array_Contains(PropAllowedMesh)
              </div>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepHeader}>
                <h3 className={styles.stepTitle}>3. Multicast Replication</h3>
                <span className={styles.stepTag}>Multicast Event</span>
              </div>
              <p className={styles.stepDesc}>
                Server broadcasts <code>UpdateMeshMulticast</code>, calling <code>SetStaticMesh</code> on the replicated <code>PropMesh</code> component across all client proxies.
              </p>
              <div className={styles.codeSnippet}>
                UpdateMeshMulticast(NetMulticast) -&gt; PropMesh-&gt;SetStaticMesh(NewMesh)
              </div>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepHeader}>
                <h3 className={styles.stepTitle}>4. Pivot Offset Correction</h3>
                <span className={styles.stepTag}>Ground Alignment</span>
              </div>
              <p className={styles.stepDesc}>
                Queries <code>MeshWithFAlsePivot</code> array and applies relative offset via <code>K2_SetRelativeLocation</code> to ground non-standard asset pivots.
              </p>
              <div className={styles.codeSnippet}>
                Array_Contains(MeshWithFAlsePivot) == True -&gt; PropMesh-&gt;K2_SetRelativeLocation(Offset)
              </div>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepHeader}>
                <h3 className={styles.stepTitle}>5. Camera Decoupling &amp; Free Look</h3>
                <span className={styles.stepTag}>Pawn Control</span>
              </div>
              <p className={styles.stepDesc}>
                <code>IA_RotationLock</code> sets <code>bUseControllerRotationYaw = false</code>, decoupling controller yaw from actor rotation. Resulting runtime 360° camera orbit behavior remains capture pending.
              </p>
              <div className={styles.codeSnippet}>
                IA_RotationLock -&gt; Set bUseControllerRotationYaw = false (Yaw Decoupled; Orbit Capture Pending)
              </div>
            </div>
          </div>

          {/* Interactive Blueprint Flow Diagram */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#f8fafc', marginBottom: '0.75rem' }}>
              Blueprint Graph Execution Flow
            </h3>
            <Suspense
              fallback={
                <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8', background: '#0b111a', borderRadius: '6px' }}>
                  Loading Blueprint diagram...
                </div>
              }
            >
              <BlueprintFlowDiagram />
            </Suspense>
          </div>

          {/* Architectural Boundary Disclosure */}
          <div className={styles.boundaryCard}>
            <div className={styles.boundaryHeader}>
              <span>⚠️ Architectural Audit Disclosure</span>
            </div>
            <p className={styles.boundaryText}>
              Early design dossiers claimed dynamic collision bounds calculation where the character capsule automatically resizes to match the transformed prop dimensions:
            </p>
            <div className={styles.boundaryFormula}>
              CapsuleRadius = 0.5 * max(Extent.X, Extent.Y) | CapsuleHalfHeight = max(Extent.Z, CapsuleRadius)
            </div>
            <p className={styles.boundaryText}>
              <strong>Inspected Reality:</strong> Functions such as <code>GetLocalBounds</code>, <code>SetCapsuleSize</code>, and dynamic ground offsets were <em>not found</em> in the inspected <code>BP_propChar</code> scope. Dynamic capsule resizing nodes were not found in the inspected Blueprint scope, and runtime capsule behavior remains unverified; collision is only disabled upon elimination. Pre-transform geometry collision sweeps were likewise not found in the inspected graphs. These claims are classified as <strong>UNVERIFIED</strong>; runtime verification remains pending.
            </p>
          </div>
        </section>

        {/* Future Milestones Summary */}
        <section className={styles.roadmapSection} aria-label="Additional Pillars">
          <h2 className={styles.roadmapTitle}>Additional Engineering Pillars</h2>
          <div className={styles.roadmapGrid}>
            <div className={styles.roadmapCard}>
              <h3>Technical Art & Rigging</h3>
              <p>Presence of UE5 IK Rig, IK Retargeter, and Physics Asset setup assets (joint constraint and motion quality evidence pending).</p>
              <span className={styles.roadmapStatus}>Milestone P004</span>
            </div>
            <div className={styles.roadmapCard}>
              <h3>3D Asset Pipelines</h3>
              <p>Blender-to-Unreal hard-surface modeling pipeline and UV layouts (density benchmarks and optimization evidence pending).</p>
              <span className={styles.roadmapStatus}>Milestone P004</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
