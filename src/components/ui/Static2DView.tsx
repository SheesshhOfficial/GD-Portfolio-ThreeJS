import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { FEATURED_PROP_HUNT } from '../../data/exhibits';
import styles from './Static2DView.module.css';

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

            {/* Media Placeholders */}
            <div className={styles.placeholderGrid}>
              <div className={styles.placeholderBox}>
                <div className={styles.placeholderTop}>
                  <span className={styles.badgePending}>Capture pending</span>
                  <span className={styles.mediaId}>{FEATURED_PROP_HUNT.mediaOverviewId}</span>
                </div>
                <h3 className={styles.boxTitle}>Gameplay Overview Reel</h3>
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

            <div className={styles.milestoneNotice}>
              The full interactive transformation breakdown drawer and Blueprint graph inspection belong to the next milestone.
            </div>
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
