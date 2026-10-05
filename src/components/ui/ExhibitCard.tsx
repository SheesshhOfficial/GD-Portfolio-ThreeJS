import React, { useEffect, useRef } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { EXHIBITS_MAP } from '../../data/exhibits';
import { OverviewStoryboardSvg, TransformStoryboardSvg } from '../diagrams/MediaStoryboardDiagrams';
import styles from './ExhibitCard.module.css';

export const ExhibitCard: React.FC = () => {
  const { state, dispatch } = usePortfolio();
  const cardRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const originatingElementRef = useRef<HTMLElement | null>(null);

  const exhibit = state.activeExhibitId ? EXHIBITS_MAP[state.activeExhibitId] : null;

  // Capture originating focus and move focus into card
  useEffect(() => {
    if (exhibit) {
      if (document.activeElement && document.activeElement !== document.body) {
        originatingElementRef.current = document.activeElement as HTMLElement;
      }
      const timer = setTimeout(() => {
        closeBtnRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [exhibit]);

  // Handle Escape key and Tab trapping inside the card
  useEffect(() => {
    if (!exhibit) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // If breakdown drawer is open, let breakdown drawer handle Escape
      if (state.isBreakdownOpen) return;

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
  }, [exhibit, state.isBreakdownOpen]);

  if (!exhibit) {
    return null;
  }

  const handleClose = () => {
    dispatch({ type: 'SET_ACTIVE_EXHIBIT', payload: null });
    const target = originatingElementRef.current || document.getElementById('direct-portfolio-btn');
    if (target && typeof target.focus === 'function') {
      setTimeout(() => target.focus(), 0);
    }
  };

  const inspectBtnId =
    exhibit.id === 'sheeshh-prop-hunt' || exhibit.id === 'EX-PH-TRANSFORM'
      ? 'inspect-transform-btn'
      : 'inspect-architecture-btn';

  return (
    <aside
      className={styles.cardContainer}
      role="dialog"
      aria-modal="true"
      aria-label={`${exhibit.title} Exhibit Card`}
    >
      <div ref={cardRef} className={styles.card}>
        <div className={styles.header}>
          <div>
            <div className={styles.metaRow}>
              <span className={styles.engineBadge}>{exhibit.engine}</span>
              <span className={styles.roleBadge}>{exhibit.role}</span>
            </div>
            <h2 className={styles.title}>{exhibit.title}</h2>
            <p className={styles.subtitle}>{exhibit.subtitle}</p>
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
          {/* Tool Badges */}
          <div className={styles.tagList} aria-label="Key Technologies">
            {exhibit.tools.map((tool) => (
              <span key={tool} className={styles.toolTag}>
                {tool}
              </span>
            ))}
          </div>

          {/* System Summary */}
          <p className={styles.summary}>{exhibit.summary}</p>

          {/* Deep-Dive Drawer Action Button */}
          <div className={styles.actionSection}>
            <button
              id={inspectBtnId}
              type="button"
              className={styles.inspectButton}
              onClick={() => dispatch({ type: 'SET_BREAKDOWN_OPEN', payload: true })}
            >
              <span>Inspect {exhibit.shortTitle} Architecture →</span>
            </button>
          </div>

          {/* Structured Media Placeholders with Inline Storyboards */}
          <div className={styles.placeholderGrid}>
            {exhibit.mediaPlaceholders.map((media) => (
              <div key={media.id} className={styles.placeholderCard}>
                <div className={styles.placeholderHeader}>
                  <span className={styles.badgePending}>Capture pending</span>
                  <span className={styles.mediaId}>{media.id}</span>
                </div>
                <h4 className={styles.placeholderTitle}>{media.label}</h4>
                {media.id === 'PH-OVERVIEW' && <OverviewStoryboardSvg />}
                {media.id === 'PH-TRANSFORM' && <TransformStoryboardSvg />}
                <p className={styles.placeholderDesc}>{media.description}</p>
                <div className={styles.placeholderFooter}>
                  <span className={styles.evidenceReq}>Required: {media.requirement}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Sourcing and Evidence Boundaries */}
          <div className={styles.provenanceBox}>
            <span className={styles.provenanceTag}>Provenance &amp; Sourcing</span>
            <p className={styles.provenanceText}>{exhibit.provenanceNote}</p>
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

export default ExhibitCard;
