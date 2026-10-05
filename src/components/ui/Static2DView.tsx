import React, { lazy, Suspense } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ALL_EXHIBITS } from '../../data/exhibits';
import { EvidenceStatus } from '../../types/portfolio';
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

const DecoySpawnFlowDiagram = lazy(() =>
  import('../diagrams/SystemsDiagrams').then((m) => ({
    default: m.DecoySpawnFlowDiagram,
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

const IKRetargeterDiagram = lazy(() =>
  import('../diagrams/TechArtDiagrams').then((m) => ({
    default: m.IKRetargeterDiagram,
  }))
);

const RagdollPhysicsDiagram = lazy(() =>
  import('../diagrams/TechArtDiagrams').then((m) => ({
    default: m.RagdollPhysicsDiagram,
  }))
);

const HardSurfaceSubmissionDiagram = lazy(() =>
  import('../diagrams/TechArtDiagrams').then((m) => ({
    default: m.HardSurfaceSubmissionDiagram,
  }))
);

const UVTexturingSubmissionDiagram = lazy(() =>
  import('../diagrams/TechArtDiagrams').then((m) => ({
    default: m.UVTexturingSubmissionDiagram,
  }))
);

export const Static2DView: React.FC = () => {
  const { state, dispatch } = usePortfolio();

  const handleOpenBreakdown = (exhibitId: string) => {
    dispatch({ type: 'SET_ACTIVE_EXHIBIT', payload: exhibitId });
    dispatch({ type: 'SET_BREAKDOWN_OPEN', payload: true });
  };

  const getStatusBadgeClass = (status: EvidenceStatus, badgeLabel: string) => {
    if (badgeLabel === 'Evidence needed' || status === 'EVIDENCE_REQUIRED') {
      return styles.statusRequired;
    }
    if (badgeLabel === 'Asset presence verified' || status === 'ASSET_PRESENCE_VERIFIED') {
      return styles.statusSetup;
    }
    return styles.statusVerified;
  };

  const pillar1Exhibits = ALL_EXHIBITS.filter((e) => e.pillarId === 1);
  const pillar2Exhibits = ALL_EXHIBITS.filter((e) => e.pillarId === 2);
  const pillar3Exhibits = ALL_EXHIBITS.filter((e) => e.pillarId === 3);

  const renderExhibitCard = (exhibit: typeof ALL_EXHIBITS[0], isFirst: boolean) => {
    const isEvidenceRequired = exhibit.evidenceStatus === 'EVIDENCE_REQUIRED';

    return (
      <article
        key={exhibit.id}
        className={styles.projectCard}
        aria-labelledby={`exhibit-${exhibit.shortId.toLowerCase()}-title`}
      >
        <div className={styles.metaRow}>
          <span className={styles.engineBadge}>{exhibit.shortId}</span>
          <span className={styles.engineBadge}>{exhibit.engine}</span>
          <span className={getStatusBadgeClass(exhibit.evidenceStatus, exhibit.badgeLabel)}>
            {exhibit.badgeLabel}
          </span>
        </div>

        <h3
          id={isFirst ? 'breakdown-title' : `exhibit-${exhibit.shortId.toLowerCase()}-title`}
          className={styles.projectTitle}
        >
          {exhibit.title}
        </h3>
        <p className={styles.projectSubtitle}>{exhibit.subtitle}</p>

        {/* Tools */}
        <div className={styles.tagList}>
          {exhibit.tools.map((t) => (
            <span key={t} className={styles.toolTag}>
              {t}
            </span>
          ))}
        </div>

        {/* Summary */}
        <p className={styles.heroDescription}>{exhibit.summary}</p>

        {/* Candidate Submission Checklist for Evidence Required Exhibits */}
        {isEvidenceRequired && exhibit.submissionRequirements && (
          <div className={styles.checklistCard}>
            <div className={styles.checklistHeading}>Candidate Submission Deliverables Checklist:</div>
            <ul className={styles.checklistList}>
              {exhibit.submissionRequirements.map((req, rIdx) => (
                <li key={rIdx} className={styles.checklistItem}>
                  <span className={styles.checklistIcon}>◻</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Implementation Steps Grid or Required Standards */}
        <div>
          <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#f8fafc', marginBottom: '0.75rem' }}>
            {isEvidenceRequired ? 'Required Technical Standards & Pipeline Specifications' : 'Inspected Implementation Sequence'}
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
            {exhibit.steps.map((step, sIdx) => (
              <div
                key={sIdx}
                style={{
                  background: 'rgba(10, 14, 20, 0.65)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '6px',
                  padding: '0.85rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <h5 style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#f8fafc', margin: 0 }}>{step.title}</h5>
                  <span className={step.tag.includes('Evidence') ? styles.statusRequired : styles.stepTag}>
                    {step.tag}
                  </span>
                </div>
                <p style={{ fontSize: '0.75rem', color: '#cbd5e1', lineHeight: 1.4, margin: '0 0 0.5rem 0' }}>{step.desc}</p>
                <div className={styles.codeSnippet}>{step.codeSnippet}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Vector Graph / Pipeline Diagram */}
        <div>
          <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#f8fafc', marginBottom: '0.75rem' }}>
            {isEvidenceRequired
              ? 'Pipeline Standards & Verification Flow'
              : exhibit.pillarId === 2
              ? 'Asset Setup & Rig Hierarchy Flow'
              : 'Graph Execution Architecture'}
          </h4>
          <Suspense
            fallback={
              <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8', background: '#0b111a', borderRadius: '6px' }}>
                Loading schematic diagram...
              </div>
            }
          >
            {exhibit.shortId === 'EX-PH-TRANSFORM' && <BlueprintFlowDiagram />}
            {exhibit.shortId === 'EX-PH-DECOY' && <DecoySpawnFlowDiagram />}
            {exhibit.shortId === 'EX-PH-COMBAT' && <CombatTraceFlowDiagram />}
            {exhibit.shortId === 'EX-PH-AUDIO' && <AudioVoipDiagram />}
            {(exhibit.shortId === 'EX-PH-LIFECYCLE' || exhibit.shortId === 'EX-PH-ROUND') && <RoundLifecycleDiagram />}
            {(exhibit.shortId === 'EX-PH-CUSTOMIZATION' || exhibit.shortId === 'EX-PH-EMOTES') && <EmotesLeaderPoseDiagram />}
            {exhibit.shortId === 'EX-TA-IKRETARGET' && <IKRetargeterDiagram />}
            {exhibit.shortId === 'EX-TA-RAGDOLL' && <RagdollPhysicsDiagram />}
            {exhibit.shortId === 'EX-3D-ASSET-01' && <HardSurfaceSubmissionDiagram />}
            {exhibit.shortId === 'EX-3D-TEXTURING' && <UVTexturingSubmissionDiagram />}
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
            {isEvidenceRequired ? 'Submission Deliverables & Acceptance Criteria' : 'Media Evidence Placeholders & Verification Criteria'}
          </h4>
          <div className={styles.placeholderGrid}>
            {exhibit.mediaPlaceholders.map((media) => (
              <div
                key={media.id}
                style={{
                  background: 'rgba(10, 14, 20, 0.65)',
                  border: isEvidenceRequired
                    ? '1px dashed rgba(245, 158, 11, 0.4)'
                    : '1px dashed rgba(56, 189, 248, 0.35)',
                  borderRadius: '6px',
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, color: isEvidenceRequired ? '#fbbf24' : '#f59e0b' }}>
                    {isEvidenceRequired ? 'Submission needed' : 'Capture pending'}
                  </span>
                  <span style={{ fontSize: '0.6875rem', fontFamily: 'monospace', color: '#64748b' }}>{media.id}</span>
                </div>
                <h5 style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#f8fafc', margin: 0 }}>{media.label}</h5>
                {media.id === 'PH-OVERVIEW' && (
                  <Suspense fallback={<div style={{ padding: '1rem', color: '#64748b' }}>Loading storyboard...</div>}>
                    <OverviewStoryboardSvg />
                  </Suspense>
                )}
                {media.id === 'PH-TRANSFORM' && (
                  <Suspense fallback={<div style={{ padding: '1rem', color: '#64748b' }}>Loading storyboard...</div>}>
                    <TransformStoryboardSvg />
                  </Suspense>
                )}
                <p style={{ fontSize: '0.75rem', color: '#cbd5e1', lineHeight: 1.35, margin: 0 }}>{media.description}</p>
                <p style={{ fontSize: '0.75rem', color: '#64748b', fontStyle: 'italic', margin: '0.25rem 0' }}>
                  Proof: {media.whatCaptureProves}
                </p>
                <span style={{ fontSize: '0.625rem', fontFamily: 'monospace', color: isEvidenceRequired ? '#fbbf24' : '#38bdf8' }}>
                  Requirement: {media.requirement}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Drawer Launch Action */}
        <div style={{ marginTop: '0.5rem' }}>
          <button
            id={`open-breakdown-${exhibit.shortId.toLowerCase()}`}
            type="button"
            className={styles.switch3dButton}
            onClick={() => handleOpenBreakdown(exhibit.id)}
            style={{ fontSize: '0.8125rem', padding: '0.6rem 1.2rem' }}
          >
            {isEvidenceRequired
              ? `Open Focused ${exhibit.shortTitle} Submission Checklist →`
              : `Open Focused ${exhibit.shortTitle} Breakdown Drawer →`}
          </button>
        </div>

        {/* Provenance and Authorship */}
        <div style={{ background: 'rgba(0, 0, 0, 0.3)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '4px', padding: '0.75rem', fontSize: '0.75rem', color: '#94a3b8' }}>
          <strong style={{ color: '#cbd5e1' }}>Provenance &amp; Sourcing:</strong> {exhibit.provenanceNote}
        </div>
      </article>
    );
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
            Enhanced Input architecture, positional audio pipelines, modern UE5 IK Retargeters, and 3D DCC production pipelines.
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

        {/* ================= PILLAR 1: SHEESHH PROP HUNT GAMEPLAY SYSTEMS ================= */}
        <section aria-labelledby="pillar-1-heading" className={styles.projectSection}>
          <div className={styles.sectionHeader}>
            <span id="pillar-1-heading" className={styles.sectionPillar}>
              Pillar 1: Verified Sheeshh Prop Hunt Gameplay Systems
            </span>
            <h2 className={styles.projectTitle}>Networked Multiplayer Systems Collection</h2>
            <p className={styles.projectSubtitle}>
              Inspected C++ &amp; Blueprint gameplay engineering in Unreal Engine 5.7.4. All implementations are categorized by verified engine findings and evidence boundaries.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {pillar1Exhibits.map((exhibit, idx) => renderExhibitCard(exhibit, idx === 0))}
          </div>
        </section>

        {/* ================= PILLAR 2: TECHNICAL ART & RIGGING ================= */}
        <section aria-labelledby="pillar-2-heading" className={styles.projectSection} style={{ marginTop: '2rem' }}>
          <div className={styles.sectionHeader}>
            <span id="pillar-2-heading" className={styles.sectionPillar}>
              Pillar 2: Technical Art Pipelines (Asset Presence Verified)
            </span>
            <h2 className={styles.projectTitle}>Modern UE5 IK Rig &amp; Physics Simulation</h2>
            <p className={styles.projectSubtitle}>
              Evaluated Unreal Engine 5 IK Rig, IK Retargeter, and Physics Asset (PhAT) files. Asset presence is verified in the project repository; internal configuration, motion quality, and runtime blending require editor capture.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {pillar2Exhibits.map((exhibit) => renderExhibitCard(exhibit, false))}
          </div>
        </section>

        {/* ================= PILLAR 3: 3D ASSET PRODUCTION & PIPELINES ================= */}
        <section aria-labelledby="pillar-3-heading" className={styles.projectSection} style={{ marginTop: '2rem' }}>
          <div className={styles.sectionHeader}>
            <span id="pillar-3-heading" className={styles.sectionPillar} style={{ color: '#fbbf24' }}>
              Pillar 3: 3D Art &amp; Texturing Pipelines (Evidence Required)
            </span>
            <h2 className={styles.projectTitle}>Blender to Unreal 5 Asset &amp; UV Pipeline</h2>
            <p className={styles.projectSubtitle}>
              Evidence-request cards specifying candidate submission standards for hard-surface quad modeling, uniform texel density, and PBR texture packing. No authored asset has been selected yet.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {pillar3Exhibits.map((exhibit) => renderExhibitCard(exhibit, false))}
          </div>
        </section>

        {/* ================= PILLAR 4: CREDENTIALS & ACADEMIC PROFILE ================= */}
        <section className={styles.projectSection} aria-label="Academic Background & Credentials" style={{ marginTop: '2rem' }}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionPillar}>Pillar 4: Academic Background &amp; Profile</span>
            <h2 className={styles.projectTitle}>Computer Science Foundation &amp; Credentials</h2>
          </div>
          <div style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border-subtle)', borderRadius: '8px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <p style={{ fontSize: '0.9375rem', color: '#f8fafc', margin: 0, fontWeight: 600 }}>
              Ashish Ranjan — Manipal Institute of Technology (MIT), Bengaluru
            </p>
            <p style={{ fontSize: '0.8125rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
              Candidate for Bachelor of Technology in Computer Science &amp; Engineering (B.Tech CSE '27).
              Focused on Unreal Engine gameplay systems, networked multiplayer architecture, technical art, and digital content creation pipelines.
            </p>
            <div style={{ fontSize: '0.75rem', color: '#64748b', fontStyle: 'italic' }}>
              Academic coursework and certifications: Object-Oriented Programming (UPenn) and Data Structures &amp; Algorithms (Meta) sourced as USER_CONFIRMED: pending credential evidence. Public resume document pending authoring.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Static2DView;
