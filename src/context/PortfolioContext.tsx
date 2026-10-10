import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { PortfolioState, PortfolioAction, CameraFocus, QualityMode } from '../types/portfolio';

function savedPreferences(): {quality: QualityMode; motionPaused: boolean} {
  try {
    const data=JSON.parse(window.localStorage.getItem('ashish-studio-preferences') || '{}');
    return {quality:['auto','high','low'].includes(data.quality) ? data.quality : 'auto',motionPaused:data.motionPaused===true};
  } catch { return {quality:'auto',motionPaused:false}; }
}
const preferences=savedPreferences();

function checkInitialReducedMotion(): boolean {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  return false;
}

const initialState: PortfolioState = {
  viewMode: new URLSearchParams(window.location.search).get('view') === 'gallery' ? '2d' : '3d',
  activeExhibitId: null,
  isDirectMenuOpen: false,
  isReducedMotion: checkInitialReducedMotion(),
  webglSupported: true,
  cameraFocus: 'center',
  isEntranceActive: !checkInitialReducedMotion(),
  isBreakdownOpen: false,
  quality: preferences.quality,
  motionPaused: preferences.motionPaused,
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
    case 'SET_QUALITY':
      return { ...state, quality: action.payload };
    case 'SET_MOTION_PAUSED':
      return { ...state, motionPaused: action.payload };
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
  useEffect(()=>{
    try {window.localStorage.setItem('ashish-studio-preferences',JSON.stringify({quality:state.quality,motionPaused:state.motionPaused}));}catch { /* Preferences still work in memory. */ }
  },[state.quality,state.motionPaused]);
  useEffect(()=>{
    const url=new URL(window.location.href);
    if(state.viewMode==='2d')url.searchParams.set('view','gallery');else url.searchParams.delete('view');
    window.history.replaceState(null,'',url);
  },[state.viewMode]);

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
