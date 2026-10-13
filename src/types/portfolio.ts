export type ViewMode = '3d' | '2d';
export type CameraFocus = 'center' | 'transformation-bench' | 'systems-console' | 'technical-art';
export type QualityMode = 'auto' | 'high' | 'low';

export interface PortfolioState {
  viewMode: ViewMode;
  activeExhibitId: string | null;
  isDirectMenuOpen: boolean;
  isReducedMotion: boolean;
  webglSupported: boolean;
  cameraFocus: CameraFocus;
  isEntranceActive: boolean;
  isBreakdownOpen: boolean;
  quality: QualityMode;
  motionPaused: boolean;
  tourStep: number | null;
  galleryFilter: number;
}

export type PortfolioAction =
  | { type: 'SET_TOUR_STEP'; payload: number | null }
  | { type: 'SET_GALLERY_FILTER'; payload: number }
  | { type: 'SYNC_ROUTE'; payload: {exhibitId:string|null;viewMode:ViewMode} }
  | { type: 'SET_QUALITY'; payload: QualityMode }
  | { type: 'SET_MOTION_PAUSED'; payload: boolean }
  | { type: 'SET_VIEW_MODE'; payload: ViewMode }
  | { type: 'SET_ACTIVE_EXHIBIT'; payload: string | null }
  | { type: 'TOGGLE_DIRECT_MENU' }
  | { type: 'SET_DIRECT_MENU'; payload: boolean }
  | { type: 'SET_REDUCED_MOTION'; payload: boolean }
  | { type: 'SET_WEBGL_SUPPORTED'; payload: boolean }
  | { type: 'SET_CAMERA_FOCUS'; payload: CameraFocus }
  | { type: 'COMPLETE_ENTRANCE' }
  | { type: 'SET_BREAKDOWN_OPEN'; payload: boolean };

export type EvidenceStatus = 'VERIFIED_IMPLEMENTATION' | 'ASSET_PRESENCE_VERIFIED' | 'EVIDENCE_REQUIRED' | 'USER_CONFIRMED';
export type PillarId = 1 | 2 | 3;

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
  requirement: 'RUNTIME_VERIFIED' | 'VERIFIED_IMPLEMENTATION' | 'ASSET_INSPECTION_REQUIRED' | 'USER_CONFIRMED: pending' | 'EVIDENCE_REQUIRED';
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
  pillarId: PillarId;
  evidenceStatus: EvidenceStatus;
  badgeLabel: string;
  role: string;
  engine: string;
  tools: string[];
  summary: string;
  mediaPlaceholders: MediaPlaceholder[];
  steps: ExhibitStep[];
  submissionRequirements?: string[];
  boundaryTitle: string;
  boundaryFormula?: string;
  boundaryDescription: string;
  provenanceNote: string;
  authorshipStatus: string;
}

export interface ExhibitIndexItem {
  id: string;
  shortId: string;
  title: string;
  shortTitle?: string;
  subtitle: string;
  summary: string;
  engine: string;
  pillarId: PillarId;
  evidenceStatus: EvidenceStatus;
  badgeLabel: string;
}
