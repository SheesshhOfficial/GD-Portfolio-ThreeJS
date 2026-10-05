import React, { useEffect, useRef } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { FEATURED_PROP_HUNT } from '../../data/exhibits';
import styles from './ExhibitCard.module.css';

export const ExhibitCard: React.FC = () => {
  const { state, dispatch } = usePortfolio();
  const cardRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const originatingElementRef = useRef<HTMLElement | null>(null);

  // Capture originating focus and move focus into card
  useEffect(() => {
    if (state.activeExhibitId === FEATURED_PROP_HUNT.id) {
      if (document.activeElement && document.activeElement !== document.body) {
        originatingElementRef.current = document.activeElement as HTMLElement;
      }
      const timer = setTimeout(() => {
        closeBtnRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [state.activeExhibitId]);

  // Handle Escape key and Tab trapping inside the card
  useEffect(() => {
    if (state.activeExhibitId !== FEATURED_PROP_HUNT.id) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        handleClose();
        return;
      }

      if (e.key === 'Tab') {
        if (!cardRef.current) return;
        const focusable = cardRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first || !cardRef.current.contains(document.activeElement)) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last || !cardRef.current.contains(document.activeElement)) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.activeExhibitId]);

  if (state.activeExhibitId !== FEATURED_PROP_HUNT.id) {
    return null;
  }

  const handleClose = () => {
    dispatch({ type: 'SET_ACTIVE_EXHIBIT', payload: null });
    const target = originatingElementRef.current || document.getElementById('direct-portfolio-btn');
    if (target && typeof target.focus === 'function') {
      setTimeout(() => target.focus(), 0);
    }
  };

  return (
    <aside
      className={styles.cardContainer}
      role="dialog"
      aria-modal="true"
      aria-label={`${FEATURED_PROP_HUNT.title} Exhibit Card`}
    >
      <div ref={cardRef} className={styles.card}>
        <div className={styles.header}>
          <div>
            <div className={styles.metaRow}>
              <span className={styles.engineBadge}>{FEATURED_PROP_HUNT.engine}</span>
              <span className={styles.roleBadge}>Role: Confirmation pending</span>
            </div>
            <h2 className={styles.title}>{FEATURED_PROP_HUNT.title}</h2>
            <p className={styles.subtitle}>{FEATURED_PROP_HUNT.subtitle}</p>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            className={styles.closeBtn}
            onClick={handleClose}
            aria-label="Close Exhibit Card"
          >
            ✕
          </button>
        </div>

        <div className={styles.body}>
          {/* Tool Stack Badges */}
          <div className={styles.tagList}>
            {FEATURED_PROP_HUNT.tools.map((t) => (
              <span key={t} className={styles.toolTag}>{t}</span>
            ))}
          </div>

          <p className={styles.summary}>{FEATURED_PROP_HUNT.summary}</p>

          {/* Structured Media Placeholders */}
          <div className={styles.placeholderGrid}>
            <div className={styles.placeholderCard}>
              <div className={styles.placeholderHeader}>
                <span className={styles.badgePending}>Capture pending</span>
                <span className={styles.mediaId}>{FEATURED_PROP_HUNT.mediaOverviewId}</span>
              </div>
              <h4 className={styles.placeholderTitle}>Gameplay Overview Reel</h4>
              <p className={styles.placeholderDesc}>
                45–60s video evidence showing asymmetric hide-and-seek loop from hunter and prop perspectives.
              </p>
              <div className={styles.placeholderFooter}>
                <span className={styles.evidenceReq}>Required: RUNTIME_VERIFIED</span>
              </div>
            </div>

            <div className={styles.placeholderCard}>
              <div className={styles.placeholderHeader}>
                <span className={styles.badgePending}>Capture pending</span>
                <span className={styles.mediaId}>{FEATURED_PROP_HUNT.mediaTransformId}</span>
              </div>
              <h4 className={styles.placeholderTitle}>Multi-View Transformation Clip</h4>
              <p className={styles.placeholderDesc}>
                20–30s split-screen recording validating host targeting, replicated mesh swap, and pivot correction.
              </p>
              <div className={styles.placeholderFooter}>
                <span className={styles.evidenceReq}>Required: RUNTIME_VERIFIED</span>
              </div>
            </div>
          </div>

          {/* Sourcing and Evidence Note */}
          <div className={styles.provenanceBox}>
            <span className={styles.provenanceTag}>Provenance & Sourcing</span>
            <p className={styles.provenanceText}>{FEATURED_PROP_HUNT.provenanceNote}</p>
          </div>

          <div className={styles.milestoneNotice}>
            <span className={styles.noticeIcon}>ℹ️</span>
            <span>The full interactive transformation breakdown drawer and node diagrams belong to the next milestone.</span>
          </div>
        </div>

        <div className={styles.footer}>
          <button type="button" className={styles.dismissButton} onClick={handleClose}>
            Back to Studio View
          </button>
        </div>
      </div>
    </aside>
  );
};
