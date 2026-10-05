import React, { lazy, Suspense } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ALL_EXHIBITS } from '../../data/exhibits';
import styles from './Static2DView.module.css';

// Lazy-load diagrams so immediate 2D shell remains minimal
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

const BlueprintFlowDiagram = lazy(() =>
  import('../diagrams/BlueprintFlowDiagram').then((m) => ({
    default: m.BlueprintFlowDiagram,
  }))
);

const CombatTraceFlowDiagram = lazy(() =>
  import('../diagrams/SystemsDiagrams').then((m) => ({
    default: m.CombatTraceFlowDiagram,
  }))
);

const AudioVoipDiagram = lazy(() =>
  import('../diagrams/SystemsDiagrams').then((m) => ({
    default: m.AudioVoipDiagram,
  }))
);

const RoundLifecycleDiagram = lazy(() =>
  import('../diagrams/SystemsDiagrams').then((m) => ({
    default: m.RoundLifecycleDiagram,
  }))
);

const EmotesLeaderPoseDiagram = lazy(() =>
  import('../diagrams/SystemsDiagrams').then((m) => ({
    default: m.EmotesLeaderPoseDiagram,
  }))
);

export const Static2DView: React.FC = () => {
  const { state, dispatch } = usePortfolio();

  const handleOpenBreakdown = (exhibitId: string) => {
    dispatch({ type: 'SET_ACTIVE_EXHIBIT', payload: exhibitId });
    dispatch({ type: 'SET_BREAKDOWN_OPEN', payload: true });
  };

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
            Gameplay Systems Programming &amp; Technical Art · Unreal Engine 5 &amp; Blender Pipelines
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

        {/* Section Header for Featured Exhibits */}
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#38bdf8', fontWeight: 600 }}>
            Pillar 1: Featured Gameplay Systems Collection
          </span>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#f8fafc', margin: '0.25rem 0' }}>
            Sheeshh: Prop Hunt Multiplayer Systems
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', margin: 0 }}>
            Inspected C++ &amp; Blueprint gameplay engineering in Unreal Engine 5.7.4. All implementations are categorized by verified engine findings and evidence boundaries.
          </p>
        </div>

        {/* All 5 Prop Hunt System Exhibits Rendered Sequentially */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {ALL_EXHIBITS.map((exhibit, exIdx) => (
            <article
              key={exhibit.id}
              className={styles.card}
              aria-labelledby={`exhibit-${exhibit.shortId.toLowerCase()}-title`}
            >
              <div className={styles.cardHeader}>
                <div className={styles.badgeRow}>
                  <span className={styles.engineBadge}>{exhibit.shortId}</span>
                  <span className={styles.engineBadge}>{exhibit.engine}</span>
                  <span className={styles.roleBadge}>{exhibit.category}</span>
                </div>
                <h3
                  id={exIdx === 0 ? 'breakdown-title' : `exhibit-${exhibit.shortId.toLowerCase()}-title`}
                  className={styles.projectTitle}
                >
                  {exhibit.title}
                </h3>
                <p className={styles.projectSubtitle}>{exhibit.subtitle}</p>
              </div>

              <div className={styles.cardBody}>
                {/* Tools */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {exhibit.tools.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: '0.6875rem',
                        padding: '0.15rem 0.5rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        color: '#94a3b8',
                        borderRadius: '4px',
                        fontFamily: 'monospace',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Summary */}
                <p className={styles.projectDescription}>{exhibit.summary}</p>

                {/* Implementation Steps Grid */}
                <div>
                  <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#f8fafc', marginBottom: '0.75rem' }}>
                    Inspected Implementation Sequence
                  </h4>
                  <div className={styles.stepGrid}>
                    {exhibit.steps.map((step, sIdx) => (
                      <div key={sIdx} className={styles.stepCard}>
                        <div className={styles.stepHeader}>
                          <h5 className={styles.stepTitle}>{step.title}</h5>
                          <span className={styles.stepTag}>{step.tag}</span>
                        </div>
                        <p className={styles.stepDesc}>{step.desc}</p>
                        <div className={styles.codeSnippet}>{step.codeSnippet}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Vector Graph Diagram */}
                <div>
                  <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#f8fafc', marginBottom: '0.75rem' }}>
                    Graph Execution Architecture
                  </h4>
                  <Suspense
                    fallback={
                      <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8', background: '#0b111a', borderRadius: '6px' }}>
                        Loading system diagram...
                      </div>
                    }
                  >
                    {exhibit.shortId === 'EX-PH-TRANSFORM' && <BlueprintFlowDiagram />}
                    {exhibit.shortId === 'EX-PH-COMBAT' && <CombatTraceFlowDiagram />}
                    {exhibit.shortId === 'EX-PH-AUDIO' && <AudioVoipDiagram />}
                    {(exhibit.shortId === 'EX-PH-LIFECYCLE' || exhibit.shortId === 'EX-PH-ROUND') && <RoundLifecycleDiagram />}
                    {(exhibit.shortId === 'EX-PH-CUSTOMIZATION' || exhibit.shortId === 'EX-PH-EMOTES') && <EmotesLeaderPoseDiagram />}
                  </Suspense>
                </div>

                {/* Technical Boundary Disclosure */}
                <div className={styles.boundaryCard}>
                  <div className={styles.boundaryHeader}>
                    <span>⚠️ {exhibit.boundaryTitle}</span>
                  </div>
                  {exhibit.boundaryFormula && (
                    <div className={styles.boundaryFormula}>{exhibit.boundaryFormula}</div>
                  )}
                  <p className={styles.boundaryText}>{exhibit.boundaryDescription}</p>
                </div>

                {/* Media Placeholders with Storyboard Views */}
                <div>
                  <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#f8fafc', marginBottom: '0.75rem' }}>
                    Media Evidence Placeholders &amp; Verification Criteria
                  </h4>
                  <div className={styles.placeholderGrid}>
                    {exhibit.mediaPlaceholders.map((media) => (
                      <div key={media.id} className={styles.placeholderBox}>
                        <div className={styles.placeholderTop}>
                          <span className={styles.badgePending}>Capture pending</span>
                          <span className={styles.mediaId}>{media.id}</span>
                        </div>
                        <h4 className={styles.boxTitle}>{media.label}</h4>
                        {media.id === 'PH-OVERVIEW' && (
                          <Suspense fallback={<div className={styles.diagramSkeleton}>Loading storyboard...</div>}>
                            <OverviewStoryboardSvg />
                          </Suspense>
                        )}
                        {media.id === 'PH-TRANSFORM' && (
                          <Suspense fallback={<div className={styles.diagramSkeleton}>Loading storyboard...</div>}>
                            <TransformStoryboardSvg />
                          </Suspense>
                        )}
                        <p className={styles.boxDesc}>{media.description}</p>
                        <p style={{ fontSize: '0.75rem', color: '#64748b', fontStyle: 'italic', margin: '0.25rem 0' }}>
                          Proof: {media.whatCaptureProves}
                        </p>
                        <span className={styles.evidenceTag}>Requirement: {media.requirement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Drawer Launch Action */}
                <div style={{ marginTop: '0.5rem' }}>
                  <button
                    type="button"
                    className={styles.switch3dButton}
                    onClick={() => handleOpenBreakdown(exhibit.id)}
                    style={{ fontSize: '0.8125rem', padding: '0.6rem 1.2rem' }}
                  >
                    Open Focused {exhibit.shortTitle} Breakdown Drawer →
                  </button>
                </div>

                {/* Provenance and Authorship */}
                <div className={styles.provenanceNotice}>
                  <strong>Provenance &amp; Sourcing:</strong> {exhibit.provenanceNote}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Future Milestones Summary */}
        <section className={styles.roadmapSection} aria-label="Additional Pillars" style={{ marginTop: '4rem' }}>
          <h2 className={styles.roadmapTitle}>Additional Engineering Pillars</h2>
          <div className={styles.roadmapGrid}>
            <div className={styles.roadmapCard}>
              <h3>Technical Art &amp; Rigging</h3>
              <p>Presence of UE5 IK Rig, IK Retargeter, and Physics Asset setup assets (joint constraint and motion quality evidence pending).</p>
              <span className={styles.roadmapMilestone}>Scheduled: Milestone P006</span>
            </div>
            <div className={styles.roadmapCard}>
              <h3>3D Asset Production &amp; Shaders</h3>
              <p>Hard-surface Blender modeling, UV unwrap layouts, texel density benchmarks, and PBR material setup.</p>
              <span className={styles.roadmapMilestone}>Scheduled: Milestone P007</span>
            </div>
            <div className={styles.roadmapCard}>
              <h3>Academic Background &amp; Profile</h3>
              <p>Computer Science foundation (MIT Bengaluru, B.Tech CSE '27) and verified personal contributions.</p>
              <span className={styles.roadmapMilestone}>Scheduled: Milestone P008</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Static2DView;
