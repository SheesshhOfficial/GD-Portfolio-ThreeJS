import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import styles from './OrientationHud.module.css';

const SESSION_KEY = 'portfolio_orientation_dismissed';

function getStoredDismissed(): boolean {
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      return window.sessionStorage.getItem(SESSION_KEY) === 'true';
    }
  } catch {
    // Storage access restricted or disabled
  }
  return false;
}

function setStoredDismissed(): void {
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      window.sessionStorage.setItem(SESSION_KEY, 'true');
    }
  } catch {
    // Storage access restricted or disabled
  }
}

export const OrientationHud: React.FC = () => {
  const { state, dispatch } = usePortfolio();
  const [isDismissed, setIsDismissed] = useState<boolean>(getStoredDismissed);

  const handleDismiss = () => {
    setIsDismissed(true);
    setStoredDismissed();
  };

  const handleFocusStation = (
    station: 'transformation-bench' | 'systems-console',
    exhibitId: string
  ) => {
    handleDismiss();
    dispatch({ type: 'SET_CAMERA_FOCUS', payload: station });
    dispatch({ type: 'SET_ACTIVE_EXHIBIT', payload: exhibitId });
  };

  const handleOpenDirectMenu = () => {
    handleDismiss();
    dispatch({ type: 'SET_DIRECT_MENU', payload: true });
  };

  // Dismiss on Escape
  useEffect(() => {
    if (isDismissed || state.isEntranceActive || state.activeExhibitId || state.isDirectMenuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleDismiss();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isDismissed, state.isEntranceActive, state.activeExhibitId, state.isDirectMenuOpen]);

  // If dismissed, in entrance, modal open, direct menu open, or 2D mode, do not display
  if (
    isDismissed ||
    state.isEntranceActive ||
    state.activeExhibitId !== null ||
    state.isDirectMenuOpen ||
    state.viewMode !== '3d'
  ) {
    return null;
  }

  return (
    <aside
      id="orientation-hud"
      className={styles.hudContainer}
      role="region"
      aria-label="Studio Navigation Orientation Guide"
    >
      <div className={styles.hudCard}>
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            <div className={styles.badgeRow}>
              <span className={styles.guideBadge}>Recruiter &amp; Visitor Guide</span>
            </div>
            <h2 className={styles.title}>Explore Ashish Ranjan's Studio</h2>
            <p className={styles.subtitle}>
              Gameplay Systems Programming &amp; Technical Art · Unreal Engine 5 &amp; Blender
            </p>
          </div>
          <button
            type="button"
            id="orientation-hud-dismiss"
            className={styles.closeButton}
            onClick={handleDismiss}
            aria-label="Dismiss orientation guide"
          >
            ✕
          </button>
        </div>

        <div className={styles.grid}>
          {/* Station 1: Transformation Bench */}
          <button
            type="button"
            id="orientation-hud-bench"
            className={styles.stationPill}
            onClick={() => handleFocusStation('transformation-bench', 'sheeshh-prop-hunt')}
            aria-label="Focus Transformation Bench: Prop Disguise & Technical Art"
          >
            <span className={styles.stationIcon} aria-hidden="true">🛠️</span>
            <div className={styles.stationInfo}>
              <span className={styles.stationName}>Transformation Bench</span>
              <span className={styles.stationFocus}>Prop Disguise &amp; Tech Art →</span>
            </div>
          </button>

          {/* Station 2: Systems Console */}
          <button
            type="button"
            id="orientation-hud-systems"
            className={styles.stationPill}
            onClick={() => handleFocusStation('systems-console', 'EX-PH-COMBAT')}
            aria-label="Focus Systems Console: Multiplayer & Combat Systems"
          >
            <span className={styles.stationIcon} aria-hidden="true">🖥️</span>
            <div className={styles.stationInfo}>
              <span className={styles.stationName}>Systems Console</span>
              <span className={styles.stationFocus}>Combat, Audio &amp; Round Flow →</span>
            </div>
          </button>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            id="orientation-fast-track-btn"
            className={styles.fastTrackBtn}
            onClick={handleOpenDirectMenu}
          >
            <span aria-hidden="true">📑</span>
            <span>Open Direct Portfolio (Fast Track: 10 Exhibits)</span>
          </button>

          <button
            type="button"
            id="orientation-dismiss-btn"
            className={styles.dismissBtn}
            onClick={handleDismiss}
          >
            Explore Studio Freely
          </button>
        </div>
      </div>
    </aside>
  );
};
