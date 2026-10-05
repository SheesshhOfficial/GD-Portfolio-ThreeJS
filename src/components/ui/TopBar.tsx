import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import styles from './TopBar.module.css';

export const TopBar: React.FC = () => {
  const { state, dispatch } = usePortfolio();

  return (
    <header className={styles.topBar} role="banner">
      <div className={styles.brand}>
        <h1 className={styles.name}>Ashish Ranjan</h1>
        <span className={styles.divider} aria-hidden="true">|</span>
        <span className={styles.title}>Game Dev & Tech Art</span>
      </div>

      <nav className={styles.controls} aria-label="Portfolio View Controls">
        {/* Direct Navigation Button */}
        <button
          id="direct-portfolio-btn"
          type="button"
          className={`${styles.button} ${styles.directButton} ${state.isDirectMenuOpen ? styles.buttonActive : ''}`}
          onClick={() => dispatch({ type: 'TOGGLE_DIRECT_MENU' })}
          aria-expanded={state.isDirectMenuOpen}
          aria-controls="direct-navigation-menu"
        >
          <span className={styles.icon} aria-hidden="true">📑</span>
          <span className={styles.btnLabel}>Direct Portfolio</span>
          <span className={styles.btnLabelShort}>Portfolio</span>
        </button>

        {/* 3D / 2D View Mode Toggle */}
        <button
          id="view-mode-toggle-btn"
          type="button"
          className={`${styles.button} ${styles.modeButton} ${!state.webglSupported ? styles.disabledButton : ''}`}
          disabled={!state.webglSupported}
          onClick={() => {
            if (!state.webglSupported) return;
            dispatch({
              type: 'SET_VIEW_MODE',
              payload: state.viewMode === '3d' ? '2d' : '3d',
            });
          }}
          aria-disabled={!state.webglSupported}
          title={!state.webglSupported ? '3D Studio unavailable (WebGL 2.0 unsupported in this environment)' : `Switch to ${state.viewMode === '3d' ? '2D Gallery' : '3D Studio'} view`}
          aria-label={!state.webglSupported ? '3D Studio unavailable: WebGL 2.0 is not supported in this browser' : `Switch to ${state.viewMode === '3d' ? '2D Gallery' : '3D Studio'} view`}
        >
          <span className={styles.icon} aria-hidden="true">
            {state.webglSupported && state.viewMode === '3d' ? '🏛️' : '📄'}
          </span>
          <span className={styles.btnLabel}>
            {!state.webglSupported
              ? 'View: 2D (3D Unavailable)'
              : state.viewMode === '3d'
              ? 'View: 3D Studio'
              : 'View: 2D Gallery'}
          </span>
          <span className={styles.btnLabelShort}>
            {!state.webglSupported
              ? '2D Only'
              : state.viewMode === '3d'
              ? '3D'
              : '2D'}
          </span>
        </button>

        {/* Sound Control (Disabled: audio implementation pending) */}
        <button
          id="sound-control-btn"
          type="button"
          className={`${styles.button} ${styles.disabledButton} ${styles.soundButton}`}
          disabled
          aria-disabled="true"
          title="Sound: Coming later (Audio implementation pending)"
          aria-label="Sound: Coming later (Audio implementation pending)"
        >
          <span className={styles.icon} aria-hidden="true">🔇</span>
          <span className={styles.btnLabel}>Sound: Coming later</span>
        </button>
      </nav>
    </header>
  );
};
