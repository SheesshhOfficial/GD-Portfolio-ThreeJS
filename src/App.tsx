import React, { lazy, Suspense, useEffect } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { TopBar } from './components/ui/TopBar';
import { CinematicSkipButton } from './components/ui/CinematicSkipButton';
import { ErrorBoundary } from './components/common/ErrorBoundary';

// Lazy-load direct navigation menu drawer
const DirectNavigationMenu = lazy(() =>
  import('./components/ui/DirectNavigationMenu').then((m) => ({
    default: m.DirectNavigationMenu,
  }))
);

// Lazy-load static 2D view for non-3D / fallback modes
const Static2DView = lazy(() =>
  import('./components/ui/Static2DView').then((m) => ({
    default: m.Static2DView,
  }))
);

// Lazy-load 3D canvas bundle to keep initial HTML/CSS/2D shell minimal
const CanvasContainer = lazy(() => import('./components/3d/CanvasContainer'));

// Lazy-load deep-dive breakdown drawer to keep initial shell under budget
const TransformationBreakdownDrawer = lazy(() =>
  import('./components/ui/TransformationBreakdownDrawer').then((m) => ({
    default: m.TransformationBreakdownDrawer,
  }))
);

// Lazy-load interactive exhibit modal card
const ExhibitCard = lazy(() =>
  import('./components/ui/ExhibitCard').then((m) => ({
    default: m.ExhibitCard,
  }))
);

// Lazy-load orientation and recruiter guide HUD
const OrientationHud = lazy(() =>
  import('./components/ui/OrientationHud').then((m) => ({
    default: m.OrientationHud,
  }))
);

const PortfolioApp: React.FC = () => {
  const { state, dispatch } = usePortfolio();

  // WebGL 2.0 runtime capability verification
  useEffect(() => {
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl2');
      if (!gl) {
        console.warn('WebGL 2.0 context is unavailable. Falling back to 2D view.');
        dispatch({ type: 'SET_WEBGL_SUPPORTED', payload: false });
      }
    } catch (e) {
      console.warn('WebGL check threw error. Falling back to 2D view.', e);
      dispatch({ type: 'SET_WEBGL_SUPPORTED', payload: false });
    }
  }, [dispatch]);

  const handleCanvasError = () => {
    console.error('Canvas error occurred. Switching to 2D view.');
    dispatch({ type: 'SET_WEBGL_SUPPORTED', payload: false });
  };

  return (
    <>
      {/* Accessible skip link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Global Top Bar Navigation */}
      <TopBar />

      {/* Direct Navigation Drawer Overlay */}
      <Suspense fallback={null}>
        <DirectNavigationMenu />
      </Suspense>

      {/* Primary Content Presentation */}
      {state.viewMode === '3d' && state.webglSupported ? (
        <main id="main-content" style={{ width: '100%', height: '100%', position: 'relative' }}>
          {/* Skip Intro button during 2.5s cinematic entrance */}
          <CinematicSkipButton />

          <ErrorBoundary
            fallback={
              <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>Loading gallery...</div>}>
                <Static2DView />
              </Suspense>
            }
            onError={handleCanvasError}
          >
            <Suspense
              fallback={
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#0a0e14',
                    color: '#94a3b8',
                    fontFamily: 'sans-serif',
                  }}
                >
                  Loading 3D observatory studio...
                </div>
              }
            >
              <CanvasContainer />
            </Suspense>
          </ErrorBoundary>

          {/* Interactive Exhibit Card (Overlaid above Canvas) */}
          <Suspense fallback={null}>
            <ExhibitCard />
          </Suspense>

          {/* Deep-Dive Technical Breakdown Drawer */}
          <Suspense fallback={null}>
            <TransformationBreakdownDrawer />
          </Suspense>

          {/* Orientation & Recruiter Guide HUD */}
          <Suspense fallback={null}>
            <OrientationHud />
          </Suspense>
        </main>
      ) : (
        <>
          <Suspense
            fallback={
              <div style={{ padding: '3rem 2rem', textAlign: 'center', color: '#94a3b8', background: '#0a0e14', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                <div style={{ width: '32px', height: '32px', border: '3px solid rgba(56, 189, 248, 0.2)', borderTopColor: '#38bdf8', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                <span style={{ fontSize: '0.875rem', color: '#cbd5e1' }}>Loading 2D Portfolio Gallery...</span>
              </div>
            }
          >
            <Static2DView />
          </Suspense>
          <Suspense fallback={null}>
            <TransformationBreakdownDrawer />
          </Suspense>
        </>
      )}
    </>
  );
};

export const App: React.FC = () => {
  return (
    <PortfolioProvider>
      <PortfolioApp />
    </PortfolioProvider>
  );
};

export default App;
