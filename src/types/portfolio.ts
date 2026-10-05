export type ViewMode = '3d' | '2d';
export type CameraFocus = 'center' | 'transformation-bench';

export interface PortfolioState {
  viewMode: ViewMode;
  activeExhibitId: string | null;
  isDirectMenuOpen: boolean;
  isReducedMotion: boolean;
  webglSupported: boolean;
  cameraFocus: CameraFocus;
}

export type PortfolioAction =
  | { type: 'SET_VIEW_MODE'; payload: ViewMode }
  | { type: 'SET_ACTIVE_EXHIBIT'; payload: string | null }
  | { type: 'TOGGLE_DIRECT_MENU' }
  | { type: 'SET_DIRECT_MENU'; payload: boolean }
  | { type: 'SET_REDUCED_MOTION'; payload: boolean }
  | { type: 'SET_WEBGL_SUPPORTED'; payload: boolean }
  | { type: 'SET_CAMERA_FOCUS'; payload: CameraFocus };

export interface ExhibitData {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  engine: string;
  tools: string[];
  summary: string;
  provenanceNote: string;
  mediaOverviewId: string;
  mediaTransformId: string;
}
