import React, { useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

export const CinematicSkipButton: React.FC = () => {
  const { state, dispatch } = usePortfolio();

  // If prefers-reduced-motion becomes active while entrance is playing, complete entrance immediately
  useEffect(() => {
    if (state.isReducedMotion && state.isEntranceActive) {
      dispatch({ type: 'COMPLETE_ENTRANCE' });
    }
  }, [state.isReducedMotion, state.isEntranceActive, dispatch]);

  useEffect(() => {
    if (!state.isEntranceActive) return;

    // Any pointerdown or keypress (Enter, Space, Escape) skips the entrance immediately
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        dispatch({ type: 'COMPLETE_ENTRANCE' });
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      // Avoid intercepting clicks on TopBar buttons
      const target = e.target as HTMLElement | null;
      if (target?.closest('header') || target?.closest('#direct-navigation-menu')) {
        return;
      }
      dispatch({ type: 'COMPLETE_ENTRANCE' });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('pointerdown', handlePointerDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [state.isEntranceActive, dispatch]);

  if (!state.isEntranceActive) return null;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 150,
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
      }}
    >
      <button
        id="cinematic-skip-btn"
        type="button"
        onClick={() => dispatch({ type: 'COMPLETE_ENTRANCE' })}
        style={{
          background: 'rgba(15, 23, 42, 0.85)',
          border: '1px solid rgba(56, 189, 248, 0.4)',
          color: '#f8fafc',
          padding: '0.55rem 1.15rem',
          borderRadius: '9999px',
          fontSize: '0.8125rem',
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4), 0 0 12px rgba(56, 189, 248, 0.25)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          minHeight: '44px',
          minWidth: '44px',
        }}
        aria-label="Skip Cinematic Entrance"
      >
        <span>Skip Intro</span>
        <span style={{ fontSize: '0.75rem', color: '#94a3b8', background: 'rgba(255, 255, 255, 0.1)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
          Esc / Space
        </span>
        <span aria-hidden="true">⏭️</span>
      </button>
    </div>
  );
};
