import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { PortfolioState, PortfolioAction, CameraFocus } from '../types/portfolio';

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
  isEntranceActive: !checkInitialReducedMotion(),
  isBreakdownOpen: false,
};

export function getStationForExhibit(exhibitId: string | null): CameraFocus {
  if (!exhibitId) return 'center';
  const systemsExhibits = new Set([
    'EX-PH-COMBAT',
    'EX-PH-AUDIO',
    'EX-PH-LIFECYCLE',
    'EX-PH-CUSTOMIZATION',
    'EX-PH-ROUND',
    'EX-PH-EMOTES',
  ]);
  if (systemsExhibits.has(exhibitId)) {
    return 'systems-console';
  }
  return 'transformation-bench';
}

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
        cameraFocus: getStationForExhibit(action.payload),
        isDirectMenuOpen: false,
        isBreakdownOpen: action.payload === null ? false : state.isBreakdownOpen,
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
        isEntranceActive: action.payload ? false : state.isEntranceActive,
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
    case 'COMPLETE_ENTRANCE':
      return {
        ...state,
        isEntranceActive: false,
      };
    case 'SET_BREAKDOWN_OPEN':
      return {
        ...state,
        isBreakdownOpen: action.payload,
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
