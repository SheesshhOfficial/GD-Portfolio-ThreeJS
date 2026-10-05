export type ViewMode = '3d' | '2d';
export type CameraFocus = 'center' | 'transformation-bench' | 'systems-console';

export interface PortfolioState {
  viewMode: ViewMode;
  activeExhibitId: string | null;
  isDirectMenuOpen: boolean;
  isReducedMotion: boolean;
  webglSupported: boolean;
  cameraFocus: CameraFocus;
  isEntranceActive: boolean;
  isBreakdownOpen: boolean;
}

export type PortfolioAction =
  | { type: 'SET_VIEW_MODE'; payload: ViewMode }
  | { type: 'SET_ACTIVE_EXHIBIT'; payload: string | null }
  | { type: 'TOGGLE_DIRECT_MENU' }
  | { type: 'SET_DIRECT_MENU'; payload: boolean }
  | { type: 'SET_REDUCED_MOTION'; payload: boolean }
  | { type: 'SET_WEBGL_SUPPORTED'; payload: boolean }
  | { type: 'SET_CAMERA_FOCUS'; payload: CameraFocus }
  | { type: 'COMPLETE_ENTRANCE' }
  | { type: 'SET_BREAKDOWN_OPEN'; payload: boolean };

export interface ExhibitStep {
  title: string;
  tag: string;
  desc: string;
  codeSnippet: string;
}

export interface MediaPlaceholder {
  id: string;
  label: string;
  duration: string;
  requirement: 'RUNTIME_VERIFIED' | 'VERIFIED_IMPLEMENTATION' | 'USER_CONFIRMED';
  description: string;
  whatCaptureProves: string;
}

export interface ExhibitData {
  id: string;
  shortId: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  category: string;
  role: string;
  engine: string;
  tools: string[];
  summary: string;
  mediaPlaceholders: MediaPlaceholder[];
  steps: ExhibitStep[];
  boundaryTitle: string;
  boundaryFormula?: string;
  boundaryDescription: string;
  provenanceNote: string;
  authorshipStatus: string;
}
