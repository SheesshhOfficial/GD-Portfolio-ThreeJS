import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { PortfolioState, PortfolioAction } from '../types/portfolio';

function checkInitialReducedMotion(): boolean {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  return false;
}

const initialState: PortfolioState = {
  viewMode: '3d',
  activeExhibitId: null,
  isDirectMenuOpen: false,
  isReducedMotion: checkInitialReducedMotion(),
  webglSupported: true,
  cameraFocus: 'center',
};

function portfolioReducer(state: PortfolioState, action: PortfolioAction): PortfolioState {
  switch (action.type) {
    case 'SET_VIEW_MODE':
      // If WebGL is not supported, do not permit switching to 3d mode
      if (!state.webglSupported && action.payload === '3d') {
        return state;
      }
      return {
        ...state,
        viewMode: action.payload,
        isDirectMenuOpen: false,
      };
    case 'SET_ACTIVE_EXHIBIT':
      return {
        ...state,
        activeExhibitId: action.payload,
        cameraFocus: action.payload ? 'transformation-bench' : 'center',
        isDirectMenuOpen: false,
      };
    case 'TOGGLE_DIRECT_MENU':
      return {
        ...state,
        isDirectMenuOpen: !state.isDirectMenuOpen,
      };
    case 'SET_DIRECT_MENU':
      return {
        ...state,
        isDirectMenuOpen: action.payload,
      };
    case 'SET_REDUCED_MOTION':
      return {
        ...state,
        isReducedMotion: action.payload,
      };
    case 'SET_WEBGL_SUPPORTED':
      return {
        ...state,
        webglSupported: action.payload,
        viewMode: action.payload ? state.viewMode : '2d',
      };
    case 'SET_CAMERA_FOCUS':
      return {
        ...state,
        cameraFocus: action.payload,
      };
    default:
      return state;
  }
}

interface PortfolioContextValue {
  state: PortfolioState;
  dispatch: React.Dispatch<PortfolioAction>;
}

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(portfolioReducer, initialState);

  // Sync with OS reduced-motion changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => {
      dispatch({ type: 'SET_REDUCED_MOTION', payload: e.matches });
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <PortfolioContext.Provider value={{ state, dispatch }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export function usePortfolio(): PortfolioContextValue {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
