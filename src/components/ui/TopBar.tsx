import React, { lazy, Suspense, useCallback, useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import styles from './TopBar.module.css';
const StudioPanel = lazy(()=>import('./StudioPanel'));

export const TopBar: React.FC = () => {
  const { state, dispatch } = usePortfolio();
  const [panel,setPanel] = useState<'about'|'settings'|null>(null);
  const closePanel=useCallback(()=>setPanel(null),[]);

  return (
    <header className={styles.topBar} role="banner">
      <div className={styles.brand}>
        <span className={styles.name}>ashish<span style={{color:'#81916b'}}>.</span></span>
        <span className={styles.divider} aria-hidden="true">|</span>
        <span className={styles.title}>GAME DEVELOPER & TECHNICAL ARTIST</span>
      </div>

      <nav className={styles.controls} aria-label="Portfolio View Controls">
        <button className={`${styles.button} ${styles.aboutButton}`} onClick={()=>setPanel('about')} aria-haspopup="dialog">About</button>
        <button className={styles.button} onClick={()=>setPanel('settings')} aria-label="Studio settings" aria-haspopup="dialog"><span aria-hidden="true">☷</span><span className={styles.btnLabel}>Settings</span></button>
        {/* Direct Navigation Button */}
        <button
          id="direct-portfolio-btn"
          type="button"
          className={`${styles.button} ${styles.directButton} ${state.isDirectMenuOpen ? styles.buttonActive : ''}`}
          onClick={() => dispatch({ type: 'TOGGLE_DIRECT_MENU' })}
          aria-expanded={state.isDirectMenuOpen}
          aria-controls="direct-navigation-menu"
        >
          <span className={styles.btnLabel}>All work ↗</span>
          <span className={styles.btnLabelShort}>Work ↗</span>
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
            {state.webglSupported && state.viewMode === '3d' ? '◈' : '☷'}
          </span>
          <span className={styles.btnLabel}>
            {!state.webglSupported
              ? 'View: 2D (3D Unavailable)'
              : state.viewMode === '3d'
              ? 'Gallery view'
              : 'Studio view'}
          </span>
          <span className={styles.btnLabelShort}>
            {!state.webglSupported
              ? '2D Only'
              : state.viewMode === '3d'
              ? '3D'
              : '2D'}
          </span>
        </button>

      </nav>
      <Suspense fallback={null}>{panel && <StudioPanel mode={panel} onClose={closePanel} />}</Suspense>
    </header>
  );
};
