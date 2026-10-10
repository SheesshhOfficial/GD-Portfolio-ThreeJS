import React, { createContext, useContext, useReducer, useEffect, useCallback, ReactNode } from 'react';
import { PortfolioState, PortfolioAction, CameraFocus, QualityMode } from '../types/portfolio';
import {projectForPath,projectPath,projectForId} from '../data/projectRoutes';

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
  viewMode: new URLSearchParams(window.location.search).get('view') === 'gallery' || (projectForPath(window.location.pathname)&&new URLSearchParams(window.location.search).get('view')!=='studio') ? '2d' : '3d',
  activeExhibitId: projectForPath(window.location.pathname)?.id || null,
  isDirectMenuOpen: false,
  isReducedMotion: checkInitialReducedMotion(),
  webglSupported: true,
  cameraFocus: getStationForExhibit(projectForPath(window.location.pathname)?.id||null),
  isEntranceActive: !checkInitialReducedMotion(),
  isBreakdownOpen: false,
  quality: preferences.quality,
  motionPaused: preferences.motionPaused,
  tourStep: null,
  galleryFilter: 0,
};

export function getStationForExhibit(exhibitId: string | null): CameraFocus {
  if (!exhibitId) return 'center';
  if(exhibitId.startsWith('EX-TA-'))return 'technical-art';
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
    case 'SET_TOUR_STEP':
      return {...state,tourStep:action.payload===null?null:Math.max(0,Math.min(2,action.payload)),activeExhibitId:null,isBreakdownOpen:false,isDirectMenuOpen:false,isEntranceActive:false,viewMode:state.webglSupported?'3d':'2d',cameraFocus:action.payload===0?'systems-console':action.payload===1?'technical-art':'center'};
    case 'SET_GALLERY_FILTER': return {...state,galleryFilter:action.payload};
    case 'SYNC_ROUTE': return {...state,activeExhibitId:action.payload.exhibitId,viewMode:state.webglSupported?action.payload.viewMode:'2d',cameraFocus:getStationForExhibit(action.payload.exhibitId),tourStep:null,isBreakdownOpen:false,isDirectMenuOpen:false};
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
        tourStep:null,
        cameraFocus:state.activeExhibitId?state.cameraFocus:'center',
      };
    case 'SET_ACTIVE_EXHIBIT':
      return {
        ...state,
        activeExhibitId: action.payload,
        tourStep:null,
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
  const [state, send] = useReducer(portfolioReducer, initialState);
  const dispatch=useCallback((action:PortfolioAction)=>{
    if(action.type==='SET_ACTIVE_EXHIBIT'){
      const url=new URL(window.location.href);
      url.pathname=projectPath(action.payload);
      url.searchParams.delete('view');
      if(state.viewMode==='2d')url.searchParams.set('view','gallery');
      else if(action.payload)url.searchParams.set('view','studio');
      window.history.pushState(null,'',url);
    }
    send(action);
  },[state.viewMode]);
  useEffect(()=>{
    try {window.localStorage.setItem('ashish-studio-preferences',JSON.stringify({quality:state.quality,motionPaused:state.motionPaused}));}catch { /* Preferences still work in memory. */ }
  },[state.quality,state.motionPaused]);
  useEffect(()=>{
    const url=new URL(window.location.href);
    if(state.viewMode==='2d')url.searchParams.set('view','gallery');else if(state.activeExhibitId)url.searchParams.set('view','studio');else url.searchParams.delete('view');
    window.history.replaceState(null,'',url);
    const project=projectForId(state.activeExhibitId);
    document.title=project?`${project.title} — Ashish Ranjan`:'Ashish Ranjan — Game Development & Technical Art Portfolio';
  },[state.viewMode,state.activeExhibitId]);
  useEffect(()=>{
    const sync=()=>{
      const url=new URL(window.location.href),project=projectForPath(url.pathname);
      send({type:'SYNC_ROUTE',payload:{exhibitId:project?.id||null,viewMode:url.searchParams.get('view')==='gallery'||(project&&url.searchParams.get('view')!=='studio')?'2d':'3d'}});
    };
    window.addEventListener('popstate',sync);
    return()=>window.removeEventListener('popstate',sync);
  },[]);

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
