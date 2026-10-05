import React, { useEffect, useRef } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { EXHIBIT_INDEX } from '../../data/exhibits';
import { EvidenceStatus } from '../../types/portfolio';
import styles from './DirectNavigationMenu.module.css';

export const DirectNavigationMenu: React.FC = () => {
  const { state, dispatch } = usePortfolio();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const originatingTriggerRef = useRef<HTMLElement | null>(null);

  // Capture originating trigger element and handle focus entry/cleanup
  useEffect(() => {
    if (state.isDirectMenuOpen) {
      if (document.activeElement && document.activeElement !== document.body) {
        originatingTriggerRef.current = document.activeElement as HTMLElement;
      }

      const timer = setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [state.isDirectMenuOpen]);

  // Trap focus and handle Escape
  useEffect(() => {
    if (!state.isDirectMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        handleClose();
        return;
      }

      if (e.key === 'Tab') {
        if (!drawerRef.current) return;
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
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
  }, [state.isDirectMenuOpen]);

  if (!state.isDirectMenuOpen) return null;

  const handleClose = () => {
    dispatch({ type: 'SET_DIRECT_MENU', payload: false });
    const target = originatingTriggerRef.current || document.getElementById('direct-portfolio-btn');
    if (target && typeof target.focus === 'function') {
      setTimeout(() => target.focus(), 0);
    }
  };

  const handleSelectExhibit = (exhibitId: string) => {
    dispatch({ type: 'SET_ACTIVE_EXHIBIT', payload: exhibitId });
    dispatch({
      type: 'SET_CAMERA_FOCUS',
      payload: exhibitId === 'sheeshh-prop-hunt' || exhibitId === 'EX-PH-TRANSFORM' ? 'transformation-bench' : 'systems-console',
    });
    dispatch({ type: 'SET_DIRECT_MENU', payload: false });
  };

  const getBadgeClass = (status: EvidenceStatus, badgeLabel: string) => {
    if (badgeLabel === 'Evidence needed' || status === 'EVIDENCE_REQUIRED') {
      return styles.statusRequired;
    }
    if (badgeLabel === 'Asset presence verified' || status === 'ASSET_PRESENCE_VERIFIED') {
      return styles.statusSetup;
    }
    return styles.statusVerified;
  };

  const pillar1Exhibits = EXHIBIT_INDEX.filter((e) => e.pillarId === 1);
  const pillar2Exhibits = EXHIBIT_INDEX.filter((e) => e.pillarId === 2);
  const pillar3Exhibits = EXHIBIT_INDEX.filter((e) => e.pillarId === 3);

  return (
    <div
      className={styles.backdrop}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Direct Portfolio Index"
      id="direct-navigation-menu"
    >
      <div
        ref={drawerRef}
        className={styles.drawer}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h2 className={styles.title}>Direct Portfolio Index</h2>
          <button
            ref={closeButtonRef}
            type="button"
            className={styles.closeButton}
            onClick={handleClose}
            aria-label="Close Direct Portfolio Index"
          >
            ✕
          </button>
        </div>

        <div className={styles.content}>
          {/* Recruiter Overview & Fast Stats */}
          <div className={styles.recruiterHeader}>
            <div className={styles.recruiterStats}>
              <span className={styles.statPill}><strong>10</strong> Total Exhibits</span>
              <span className={styles.statPill}><strong>3</strong> Technical Pillars</span>
              <span className={styles.statPillHighlight}>Unreal Engine 5.7.4 &amp; Blender</span>
            </div>
            <p className={styles.recruiterSummary}>
              Direct technical index for reviewers: select any exhibit below to position the studio camera and inspect verified engineering breakdowns.
            </p>
          </div>

          {/* Pillar 1: Verified Gameplay Systems Exhibits */}
          <section className={styles.section}>
            <span className={styles.pillarTag}>Pillar 1: Verified Sheeshh Prop Hunt Gameplay Systems</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '0.4rem' }}>
              {pillar1Exhibits.map((exhibit) => (
                <button
                  key={exhibit.id}
                  type="button"
                  id={`direct-exhibit-${exhibit.shortId.toLowerCase()}`}
                  className={styles.itemCard}
                  onClick={() => handleSelectExhibit(exhibit.id)}
                  style={{ textAlign: 'left', width: '100%', cursor: 'pointer' }}
                >
                  <div className={styles.itemHeader}>
                    <h3 className={styles.itemTitle}>{exhibit.title}</h3>
                    <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                      <span className={styles.engineBadge}>{exhibit.shortId}</span>
                      <span className={getBadgeClass(exhibit.evidenceStatus, exhibit.badgeLabel)}>
                        {exhibit.badgeLabel}
                      </span>
                    </div>
                  </div>
                  <p className={styles.itemDesc}>{exhibit.summary.slice(0, 140)}...</p>
                  <div className={styles.actionRow}>
                    <span className={styles.actionHint}>Select to inspect system details &amp; graph flow →</span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Pillar 2: Technical Art Pipelines (Asset Presence Verified) */}
          <section className={styles.section}>
            <span className={styles.pillarTag}>Pillar 2: Technical Art Pipelines (Asset Presence Verified)</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '0.4rem' }}>
              {pillar2Exhibits.map((exhibit) => (
                <button
                  key={exhibit.id}
                  type="button"
                  id={`direct-exhibit-${exhibit.shortId.toLowerCase()}`}
                  className={styles.itemCard}
                  onClick={() => handleSelectExhibit(exhibit.id)}
                  style={{ textAlign: 'left', width: '100%', cursor: 'pointer' }}
                >
                  <div className={styles.itemHeader}>
                    <h3 className={styles.itemTitle}>{exhibit.title}</h3>
                    <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                      <span className={styles.engineBadge}>{exhibit.shortId}</span>
                      <span className={getBadgeClass(exhibit.evidenceStatus, exhibit.badgeLabel)}>
                        {exhibit.badgeLabel}
                      </span>
                    </div>
                  </div>
                  <p className={styles.itemDesc}>{exhibit.summary.slice(0, 140)}...</p>
                  <div className={styles.actionRow}>
                    <span className={styles.actionHint}>Select to inspect rig &amp; physics asset checklists →</span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Pillar 3: 3D Asset Pipelines (Evidence Required) */}
          <section className={styles.section}>
            <span className={styles.pillarTag}>Pillar 3: 3D Art &amp; Texturing Pipelines (Evidence Required)</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '0.4rem' }}>
              {pillar3Exhibits.map((exhibit) => (
                <button
                  key={exhibit.id}
                  type="button"
                  id={`direct-exhibit-${exhibit.shortId.toLowerCase()}`}
                  className={styles.itemCard}
                  onClick={() => handleSelectExhibit(exhibit.id)}
                  style={{ textAlign: 'left', width: '100%', cursor: 'pointer' }}
                >
                  <div className={styles.itemHeader}>
                    <h3 className={styles.itemTitle}>{exhibit.title}</h3>
                    <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                      <span className={styles.engineBadge}>{exhibit.shortId}</span>
                      <span className={getBadgeClass(exhibit.evidenceStatus, exhibit.badgeLabel)}>
                        {exhibit.badgeLabel}
                      </span>
                    </div>
                  </div>
                  <p className={styles.itemDesc}>{exhibit.summary.slice(0, 140)}...</p>
                  <div className={styles.actionRow}>
                    <span className={styles.actionHint} style={{ color: '#fbbf24' }}>
                      Select to view required submission criteria &amp; checklist →
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Pillar 4: Credentials & Academic Profile */}
          <section className={styles.section}>
            <span className={styles.pillarTag}>Pillar 4: Credentials &amp; Contact</span>
            <div className={styles.credentialsBox}>
              <p className={styles.profileText}>
                <strong>Ashish Ranjan</strong> — Manipal Institute of Technology (MIT), Bengaluru (B.Tech CSE '27)
              </p>
              <p className={styles.noteText}>
                Supplied data pending publication approval. Public resume document pending authoring.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DirectNavigationMenu;
