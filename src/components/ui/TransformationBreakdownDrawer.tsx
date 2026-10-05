import React, { useEffect, useRef } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { EXHIBITS_MAP, EXHIBIT_TRANSFORM } from '../../data/exhibits';
import { BlueprintFlowDiagram } from '../diagrams/BlueprintFlowDiagram';
import {
  DecoySpawnFlowDiagram,
  CombatTraceFlowDiagram,
  AudioVoipDiagram,
  RoundLifecycleDiagram,
  EmotesLeaderPoseDiagram,
} from '../diagrams/SystemsDiagrams';
import { TransformStoryboardSvg } from '../diagrams/MediaStoryboardDiagrams';
import styles from './TransformationBreakdownDrawer.module.css';

interface TransformationBreakdownDrawerProps {
  originatingButtonRef?: React.RefObject<HTMLElement | null>;
}

export const TransformationBreakdownDrawer: React.FC<TransformationBreakdownDrawerProps> = ({
  originatingButtonRef,
}) => {
  const { state, dispatch } = usePortfolio();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const cachedTriggerRef = useRef<HTMLElement | null>(null);

  const exhibit = state.activeExhibitId ? EXHIBITS_MAP[state.activeExhibitId] || EXHIBIT_TRANSFORM : EXHIBIT_TRANSFORM;

  useEffect(() => {
    if (state.isBreakdownOpen) {
      if (document.activeElement && document.activeElement !== document.body) {
        cachedTriggerRef.current = document.activeElement as HTMLElement;
      }
      const timer = setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [state.isBreakdownOpen]);

  useEffect(() => {
    if (!state.isBreakdownOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        handleClose();
        return;
      }

      if (e.key === 'Tab') {
        if (!drawerRef.current) return;
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first || !drawerRef.current.contains(document.activeElement)) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last || !drawerRef.current.contains(document.activeElement)) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.isBreakdownOpen]);

  if (!state.isBreakdownOpen) return null;

  const handleClose = () => {
    dispatch({ type: 'SET_BREAKDOWN_OPEN', payload: false });
    const inspectBtn =
      document.getElementById('inspect-transform-btn') ||
      document.getElementById('inspect-architecture-btn');
    const target =
      originatingButtonRef?.current && originatingButtonRef.current !== document.body
        ? originatingButtonRef.current
        : inspectBtn ||
          (cachedTriggerRef.current && cachedTriggerRef.current !== document.body
            ? cachedTriggerRef.current
            : null);
    if (target && typeof target.focus === 'function') {
      setTimeout(() => target.focus(), 10);
    }
  };

  return (
    <div
      id="transformation-breakdown-drawer"
      className={styles.backdrop}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${exhibit.title} Architecture Deep Dive`}
    >
      <div
        ref={drawerRef}
        className={styles.drawer}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <div className={styles.headerTitleGroup}>
            <div className={styles.idBadgeRow}>
              <span className={styles.idBadge}>{exhibit.shortId}</span>
              <span className={styles.statusBadge}>VERIFIED_IMPLEMENTATION</span>
            </div>
            <h2 className={styles.title}>{exhibit.title}</h2>
            <p className={styles.subtitle}>{exhibit.subtitle}</p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className={styles.closeButton}
            onClick={handleClose}
            aria-label="Close Architecture Breakdown Drawer"
          >
            ✕
          </button>
        </div>

        <div className={styles.content}>
          {/* Section 1: Inspected Implementation Steps */}
          <section className={styles.section}>
            <h3 className={styles.sectionHeading}>1. Inspected Implementation Steps</h3>
            <div className={styles.stepGrid}>
              {exhibit.steps.map((step, idx) => (
                <div key={idx} className={styles.stepCard}>
                  <div className={styles.stepHeader}>
                    <h4 className={styles.stepTitle}>{step.title}</h4>
                    <span className={styles.stepTag}>{step.tag}</span>
                  </div>
                  <p className={styles.stepDesc}>{step.desc}</p>
                  <div className={styles.codeSnippet}>{step.codeSnippet}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: Interactive Blueprint Flow Diagram */}
          <section className={styles.section}>
            <h3 className={styles.sectionHeading}>2. System Graph Execution Flow</h3>
            <p className={styles.stepDesc}>
              Vector schematic reflecting the verified Blueprint node connectivity and execution paths inspected in the project source:
            </p>
            {exhibit.shortId === 'EX-PH-TRANSFORM' && <BlueprintFlowDiagram />}
            {exhibit.shortId === 'EX-PH-DECOY' && <DecoySpawnFlowDiagram />}
            {exhibit.shortId === 'EX-PH-COMBAT' && <CombatTraceFlowDiagram />}
            {exhibit.shortId === 'EX-PH-AUDIO' && <AudioVoipDiagram />}
            {(exhibit.shortId === 'EX-PH-LIFECYCLE' || exhibit.shortId === 'EX-PH-ROUND') && <RoundLifecycleDiagram />}
            {(exhibit.shortId === 'EX-PH-CUSTOMIZATION' || exhibit.shortId === 'EX-PH-EMOTES') && <EmotesLeaderPoseDiagram />}
          </section>

          {/* Section 3: Technical Boundary & Unverified Claims Disclosure */}
          <section className={styles.section}>
            <h3 className={styles.sectionHeading}>3. Technical Boundaries &amp; Unverified Claims Disclosure</h3>
            <div className={styles.boundaryCard}>
              <div className={styles.boundaryHeader}>
                <span>⚠️ {exhibit.boundaryTitle}</span>
              </div>
              {exhibit.boundaryFormula && (
                <div className={styles.boundaryFormula}>{exhibit.boundaryFormula}</div>
              )}
              <p className={styles.boundaryText}>{exhibit.boundaryDescription}</p>
            </div>
          </section>

          {/* Section 4: Capture Viewport & Verification Requirements */}
          <section className={styles.section}>
            <h3 className={styles.sectionHeading}>4. Capture Prerequisite &amp; Media Viewport</h3>
            <p className={styles.stepDesc}>
              Verified capture criteria required to transition this system from VERIFIED_IMPLEMENTATION to RUNTIME_VERIFIED:
            </p>
            {exhibit.shortId === 'EX-PH-TRANSFORM' ? (
              <TransformStoryboardSvg />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
                {exhibit.mediaPlaceholders.map((media) => (
                  <div
                    key={media.id}
                    style={{
                      background: 'rgba(10, 14, 20, 0.75)',
                      border: '1px dashed rgba(56, 189, 248, 0.4)',
                      borderRadius: '6px',
                      padding: '1rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f59e0b' }}>
                        PREREQUISITE: {media.id} ({media.duration})
                      </span>
                      <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#38bdf8' }}>
                        {media.requirement}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.8125rem', color: '#cbd5e1', margin: '0 0 0.5rem 0' }}>
                      {media.description}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0, fontStyle: 'italic' }}>
                      Target Proof: {media.whatCaptureProves}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Section 5: Provenance & Sourcing */}
          <section className={styles.section}>
            <h3 className={styles.sectionHeading}>5. Provenance &amp; Authorship</h3>
            <div className={styles.provenanceBox}>
              <p className={styles.provenanceText}>{exhibit.provenanceNote}</p>
            </div>
          </section>
        </div>

        <div className={styles.footer}>
          <button type="button" className={styles.backBtn} onClick={handleClose}>
            Back to Exhibit Card
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransformationBreakdownDrawer;
