# Technical Architecture — Immersive Game Developer Portfolio

This document defines the web architecture, rendering pipeline, content data model, performance budgets, accessibility strategies, and deployment model for Ashish Ranjan's 3D game development portfolio.

---

## 1. Stack Evaluation & Recommendation

### 1.1 Requirements
* **Real-Time 3D Immersion**: Believable coastal observatory studio environment with restrained PBR lighting, smooth camera choreography, and interactive exhibits.
* **Dual-Layer Usability**: Seamless integration of a real-time WebGL canvas with rich, accessible 2D DOM interfaces (project cards, technical breakdown drawers, video playback).
* **Static Hosting**: Deployable as an optimized static bundle (e.g., GitHub Pages, Cloudflare Pages, Netlify) with zero backend runtime dependencies.
* **Universal Access**: High performance on modern desktop browsers, smooth execution on mobile/tablets, and the same essential portfolio content and actions on low-power devices or when WebGL is unavailable.
* **Maintainability & Modularity**: Strongly typed schemas, declarative UI components, and clean separation between 3D scene graphs and content state.

### 1.2 Comparison of Suitable Stacks

| Evaluation Dimension | Candidate 1: React + Vite + TypeScript + React Three Fiber (R3F) + Drei | Candidate 2: Vanilla TypeScript + Vite + Plain Three.js | Candidate 3: Next.js (App Router) + TypeScript + Three.js / R3F |
|---|---|---|---|
| **3D Scene Graph & Lifecycle** | **Declarative & Componentized**. R3F manages Three.js object lifecycles through React hooks (`useFrame`, `useThree`). Drei provides production-ready camera controls, loaders, and HTML overlays. | **Imperative & Manual**. Full manual control over scene graph, render loops, memory disposal, and resize events. | **Declarative (Client-Only)**. Must declare all 3D components as `'use client'`; server features do not benefit the WebGL canvas. |
| **2D UI & Accessibility Integration** | **Native React DOM**. Clean state synchronization between 3D camera/exhibits and accessible DOM overlays (modals, slide-out drawers, ARIA focus traps). | **Manual Vanilla DOM**. Requires custom DOM manipulation, bespoke event busses, and manual state management for complex UI dialogs. | **Native React DOM**. Rich UI capabilities, but SSR hydration mismatches with WebGL canvas elements require client-only mounting wrappers. |
| **Performance & Bundle Size** | **Moderate (~180 KB gzipped)**. Three.js (~130 KB) + React/DOM (~42 KB) + R3F (~12 KB). Efficient when mutating refs inside `useFrame`. | **Smallest (~140 KB gzipped)**. Zero UI framework overhead; maximum raw JS execution speed. | **Largest (~240+ KB gzipped)**. Next.js router runtime and framework chunk overhead without providing static site benefits over Vite. |
| **Mobile & Fallback Support** | **Clean Degradation**. Error boundaries isolate `<Canvas>`, gracefully falling back to a pure 2D presentation component on WebGL failure. | **Custom Implementation**. Fallback routing and DOM state switching must be custom-engineered. | **Clean Degradation**, but routing architecture adds unnecessary complexity to a single-page spatial experience. |
| **Development Velocity & Maintenance** | **High**. Modular exhibit components, vast Drei helper ecosystem, fast Vite HMR, and declarative UI composition. | **Low-Medium**. High boilerplate for camera animations, asset loaders, responsive UI binding, and state synchronization. | **Medium**. Hydration constraints, SSR configuration caveats, and static export quirks add build friction. |

### 1.3 Recommended Stack
**React + TypeScript + Vite + React Three Fiber + Drei + CSS Modules**

*(Note: Exact compatible package versions will be resolved and locked in `package.json` during environment setup).*

**Rationale & Technical Decisions**:
1. **Dual-Layer Synergy**: The portfolio requires rich 2D UI layers (direct navigation menu, deep-dive breakdown drawers, video player controls) operating synchronously over a 3D canvas. React's state management coordinates 3D camera targets with 2D DOM modals without manual event spaghetti.
2. **Declarative 3D Abstraction**: React Three Fiber provides a declarative React renderer abstraction over Three.js. Frame-critical animations, camera updates, and continuous motion mutate Three.js object references directly inside `useFrame`, avoiding React state updates per frame to maintain steady frame pacing.
3. **State Architecture for Vertical Slice**: The vertical slice uses standard **React Context with `useReducer`** (`PortfolioContext`). This provides predictable unidirectional state management for active exhibit selection, camera target mode, navigation drawer toggles, and accessibility preferences without introducing an additional external state library dependency.
4. **Reduced-Motion vs. Static 2D Distinction**: Reduced-motion mode preserves the 3D observatory studio while stripping out continuous camera interpolation and floating reticle animations. Static 2D mode is provided as a separate user choice via the top-bar mode toggle or as an automatic runtime fallback when WebGL is unavailable.
5. **Static Hosting Simplicity**: Vite builds a pure static distribution (`dist/`) that can be hosted on GitHub Pages or Cloudflare Pages with zero monthly cost and instant edge CDN delivery.
6. **Resilient Fallback**: By wrapping the 3D `<Canvas>` in a React Error Boundary and WebGL feature detector, the application immediately falls back to a responsive 2D portfolio layout if WebGL initialization fails or GPU context is lost.

---

## 2. System Architecture & Dual-Layer Design

The application is structured into two cleanly decoupled layers connected by React Context:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Top Bar & Global Controls                       │
│  [Logo / Name]   [Direct 2D Index]   [Audio Toggle]   [3D/2D Toggle]   │
└────────────────────────────────────────────────────────────────────────┘
┌───────────────────────────────────────┬────────────────────────────────┐
│         3D World Layer (Canvas)       │   2D UI & Presentation Layer   │
│                                       │                                │
│  • WebGLRenderer (Three.js / R3F)     │  • Direct 2D Navigation Menu   │
│  • Scene: Coastal Observatory Studio  │  • Exhibit Presentation Card   │
│  • Lighting: Cool Sun + Warm Interior │  • Technical Breakdown Drawer  │
│  • Camera Director (useFrame damp)    │  • Video Player Modal          │
│  • Interactive Exhibit Stations:      │  • ARIA Live & Focus Trapping  │
│    - Prop Hunt Transformation Bench   │  • WebGL Error / 2D Fallback   │
│    - Combat Range / Rigging Station   │                                │
└───────────────────────────────────────┴────────────────────────────────┘
                                    ▲
                                    │ (usePortfolioContext)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│             PortfolioContext & usePortfolioReducer                     │
│                                                                        │
│  • activeExhibitId: string | null     • cameraMode: 'free' | 'focus'   │
│  • isDirectMenuOpen: boolean          • isBreakdownOpen: boolean       │
│  • audioEnabled: boolean (default off)• isReducedMotion: boolean       │
│  • webglSupported: boolean            • loadingProgress: number        │
└────────────────────────────────────────────────────────────────────────┘
```

### 2.1 3D World Layer (Canvas)
* **Canvas Shell**: Full-viewport `<Canvas>` with customized render settings:
  * `dpr={[1, 1.5]}`: Clamped device pixel ratio to safeguard mobile GPU fillrates.
  * `gl={{ antialias: true, powerPreference: 'high-performance', alpha: false }}`.
  * Tone mapping: `ACESFilmicToneMapping` with balanced exposure.
* **Camera Director**: Central camera controller managed via Drei's `CameraControls` or custom `useFrame` dampening (`MathUtils.damp`). Directly mutates camera position and look-at target vectors between preset exhibit viewpoints based on `activeExhibitId`.
* **Scene Hierarchy**:
  * `Environment`: Low-poly coastal observatory architecture (floor, architectural columns, observation windows, sky gradient).
  * `Lighting`: Key directional cool exterior light (`#d0e4ff`), soft ambient fill, and focused warm interior spotlights (`#ffeedd`) highlighting exhibit benches.
  * `Exhibit Stations`: Distinct 3D interactive hubs (e.g., the Transformation Bench) with hover reticles, floating labels, and click-to-focus triggers.

### 2.2 2D Presentation & Accessibility Layer (DOM)
* Rendered completely in standard HTML5 and CSS Modules above the canvas (`z-index: 10+`).
* **Direct 2D Navigation Index**: Accessible drawer/overlay listing all exhibits, technical pillars, resume, and contact links. Can be opened at any time, instantly moving camera to the target or bypassing 3D navigation entirely.
* **Exhibit Card**: Bottom/side slide-in modal displaying the high-level project summary, tech badges, and primary video reel.
* **Technical Breakdown Drawer**: Expands on demand to present deep-dive architectural diagrams, Blueprint flowcards, C++ snippets, tradeoffs, and verified evidence statements.
* **Focus Management**: Traps keyboard focus inside active modals; pressing `Escape` closes drawers and returns camera focus to the central studio.

---

## 3. Navigation & Content Data Model

All content is statically authored in strongly typed TypeScript data modules, preventing ad-hoc copy and enforcing evidence criteria at compile time.

### 3.1 Content Schemas (`src/types/content.ts`)

```typescript
export type EvidenceClassification =
  | 'VERIFIED_IMPLEMENTATION'
  | 'RUNTIME_VERIFIED'
  | 'USER_CONFIRMED'
  | 'PROVENANCE_PENDING'
  | 'UNVERIFIED'
  | 'FUTURE';

export type MediaStatus = 'ready' | 'missing' | 'placeholder';

export interface MediaAsset {
  id: string;
  type: 'video' | 'image' | 'turntable' | 'document';
  path: string;
  posterPath?: string;
  status: MediaStatus;
  altText: string;
  caption: string;
  requiredEvidence: EvidenceClassification;
  ownershipCredit: string;
}

export interface TechnicalBreakdownSection {
  title: string;
  implementationDetails: string;
  verifiedEvidence: string[];
  unverifiedDisclosures?: string[];
  codeSnippets?: Array<{
    language: 'cpp' | 'blueprint' | 'json';
    title: string;
    code: string;
  }>;
}

export interface ExhibitNode {
  id: string;
  pillarId: 'featured-games' | 'gameplay-systems' | 'technical-art' | '3d-assets' | 'about';
  title: string;
  subtitle: string;
  role: string;
  tools: string[];
  provenance: {
    codeAuthorship: string;
    assetSourcing: string;
  };
  cameraTarget: {
    position: [number, number, number];
    target: [number, number, number];
    fov?: number;
  };
  summary: string;
  featuredMediaId: string;
  breakdown: TechnicalBreakdownSection;
}

export interface NavigationPillar {
  id: string;
  title: string;
  exhibits: ExhibitNode[];
}
```

---

## 4. Proposed Folder & Module Structure

```
try 2/
├── content/                     # Static media and document assets
│   ├── media/
│   │   ├── sheeshh-prop-hunt/   # MP4/WebM video captures
│   │   ├── technical-art/       # Editor tool captures
│   │   └── 3d-art/              # Turntable videos and UV sheets
│   └── models/                  # Optimized GLTF/GLB 3D scene models
├── planning/                    # Approved architecture & coordination docs
├── src/
│   ├── assets/                  # UI icons, branding, local fonts
│   ├── components/
│   │   ├── 3d/                  # Three.js / R3F Canvas components
│   │   │   ├── CanvasContainer.tsx
│   │   │   ├── CameraDirector.tsx
│   │   │   ├── StudioEnvironment.tsx
│   │   │   ├── StudioLighting.tsx
│   │   │   └── stations/
│   │   │       ├── TransformationBench.tsx
│   │   │       └── CombatStation.tsx
│   │   ├── ui/                  # 2D DOM Presentation components
│   │   │   ├── TopBar.tsx
│   │   │   ├── DirectNavigationMenu.tsx
│   │   │   ├── ExhibitCard.tsx
│   │   │   ├── TechnicalBreakdownDrawer.tsx
│   │   │   ├── MediaViewer.tsx
│   │   │   ├── PlaceholderCard.tsx
│   │   │   └── Preloader.tsx
│   │   └── common/
│   │       ├── ErrorBoundary.tsx
│   │       └── AccessibleButton.tsx
│   ├── context/                 # Application state
│   │   ├── PortfolioContext.tsx
│   │   └── portfolioReducer.ts
│   ├── data/                    # Content registry and evidence ledger
│   │   ├── exhibits.ts
│   │   ├── mediaInventory.ts
│   │   └── navigation.ts
│   ├── hooks/                   # Custom React hooks
│   │   ├── usePortfolio.ts
│   │   ├── useReducedMotion.ts
│   │   └── useWebGLCapability.ts
│   ├── styles/                  # CSS Modules design system
│   │   ├── variables.css        # Color palette, spacing, typography tokens
│   │   ├── global.css           # Reset and base styles
│   │   ├── canvas.module.css
│   │   └── ui.module.css
│   ├── types/                   # TypeScript interfaces
│   │   └── content.ts
│   ├── App.tsx                  # Root composition (3D + 2D)
│   └── main.tsx                 # App mount & feature detection
├── index.html                   # HTML entry point with preloader shell
├── package.json                 # Dependencies (React, Three, R3F, Drei)
├── tsconfig.json                # Strict TypeScript configuration
└── vite.config.ts               # Vite bundler configuration
```

---

## 5. Video and 3D Asset Pipeline

### 5.1 3D Geometry Pipeline
1. **Authoring & Clean-up**: Models exported from Blender in Centimeters, Z-Up / -Y Forward normalized, transforms applied (`scale = 1.0`).
2. **Compression**:
   * Process all `.glb` assets through `gltfpack`:
     ```bash
     gltfpack -i raw_model.glb -o studio_environment.glb -c -cc -tc
     ```
   * Quantize positions, normals, and UVs to reduce uncompressed buffer size by 60–75%.
3. **Instancing & Materials**:
   * Repeated environmental elements (observatory window frames, light fixtures) use `InstancedMesh` to keep draw calls below vertical-slice limits (<25 draw calls).
   * Restrained PBR textures: maximum 1024x1024 for environmental meshes; 2048x2048 reserved solely for featured project turntable models.

### 5.2 Video Pipeline
1. **Format Standards**:
   * Primary: WebM (`VP9` codec, crf 28, balanced quality/filesize).
   * Fallback: MP4 (`H.264` codec, baseline profile, max compatibility).
2. **Audio Policy**:
   * All portfolio videos are **muted by default** (`muted playsInline loop`).
   * Visitors can explicitly unmute via an on-screen audio toggle.
3. **Delivery & Posters**:
   * Every video has a lightweight WebP poster image loaded first.
   * Videos load strictly on demand when an exhibit card is opened (`preload="metadata"`), avoiding unnecessary data usage.

---

## 6. Loading, Fallback, Accessibility & Reduced Motion

### 6.1 Progressive Loading Strategy
* **Phase 1 (0–100ms)**: Lightweight HTML/CSS shell with preloader and title rendered immediately from static `index.html`.
* **Phase 2 (100–500ms)**: Bundled JS/CSS executes; checks WebGL capability and user preference for reduced motion. Direct 2D navigation becomes functional immediately.
* **Phase 3 (500ms–1500ms)**: Studio environment GLB streams in using Drei's `useGLTF.preload`. A percentage progress indicator updates.
* **Phase 4**: Canvas fades in smoothly, and initial camera entrance choreographs into the studio center.

### 6.2 WebGL Capability Detection & Fallback
* At application startup, an inline WebGL 2.0 context check runs:
  ```typescript
  const canvas = document.createElement('canvas');
  const isWebGL2Supported = !!(window.WebGL2RenderingContext && canvas.getContext('webgl2'));
  ```
* If WebGL 2.0 is unavailable or initialization throws an error:
  * The 3D `<Canvas>` is unmounted entirely.
  * The application automatically switches to **2D Direct Mode**, presenting a sleek, high-contrast, responsive gallery layout delivering the same essential portfolio content and actions (project cards, video playback, and technical breakdown drawers).

### 6.3 Reduced Motion Strategy (`prefers-reduced-motion`)
* The `useReducedMotion` hook monitors the CSS media query `(prefers-reduced-motion: reduce)`.
* When active:
  * Reduced-motion mode preserves the 3D scene and exhibit stations while removing continuous camera fly-throughs.
  * Camera position transitions snap directly to target angles without interpolation.
  * Idle floating and bobbing animations on 3D reticles are disabled.
  * Static 2D mode remains available as a separate user choice via the top-bar mode toggle.

### 6.4 Keyboard & Screen Reader Accessibility
* Every 3D exhibit station has an invisible, DOM-mirrored `<button>` rendered via Drei's `<Html>` or a dedicated keyboard navigation strip.
* Pressing `Tab` focuses through interactive stations sequentially, highlighting the active station with a high-contrast focus ring.
* Modals and breakdown drawers implement focus trapping (`Tab` cycles within the modal; `Escape` closes the modal and returns focus to the trigger).
* All technical breakdowns use semantic heading hierarchies (`<h2>`, `<h3>`), lists, and standard code blocks with ARIA live regions for dynamically expanded tabs, targeting **WCAG 2.2 AA**.

---

## 7. Performance Budgets & Quality Targets

Budgets are structured into immediate 2D shell budgets, lazy-loaded 3D asset limits, vertical-slice targets, and future full-portfolio ceilings.

| Metric | Target Budget Scope | Enforcement / Measurement Profile |
|---|---|---|
| **2D Shell JS/CSS (Immediate)** | < 80 KB gzipped | Measured baseline for the accessible React shell; keep changes within this ceiling. |
| **Lazy 3D JS Bundle** | < 300 KB gzipped | Three.js + R3F + app code chunk, split via Vite dynamic `import()`. |
| **Total Initial JS/CSS Bundle** | < 350 KB gzipped | Enforced in Vite build chunk analyzer. |
| **Initial 3D Assets (Environment)** | < 3.5 MB total transfer | `gltfpack` Draco/meshopt compression, 1024x1024 packed textures. |
| **Vertical Slice Scene Geometry** | **< 40,000 triangles** | Workshop room + transformation bench (Future Full-Portfolio Ceiling: < 60,000 triangles). |
| **Vertical Slice Draw Calls** | **< 25 draw calls per frame** | In main studio view (Future Full-Portfolio Ceiling: < 30 draw calls). |
| **Video Assets** | < 6 MB per focused clip; < 15 MB for overview reel | 1080p60 WebM/MP4, bitrate capped at 2.5 Mbps, lazy loaded. |
| **Desktop Framerate Target** | **60 FPS** | Measured via Chrome DevTools Performance panel on mid-tier desktop hardware (e.g. GTX 1650 / Apple M-series). |
| **Mobile Framerate Target** | **30–60 FPS** | Measured on modern mobile devices (e.g. iPhone 13+ / Pixel 6+) with `dpr` clamped to 1.0. |
| **Lab Loading Target (FCP / TTI)** | **FCP < 1.2s**, **TTI < 2.0s** | Measured via Google Lighthouse under simulated 4G mobile throttling profile (1.6 Mbps down, 150ms RTT). |

---

## 8. Testing & Deployment Approach

### 8.1 Testing Strategy
1. **Unit & Data Integrity Testing (Vitest)**:
   * Validate that all exhibits in `exhibits.ts` conform to the TypeScript schema.
   * Assert that every exhibit states its evidence requirements and attribution fields.
   * Verify that no media marked `ready` points to a missing file.
2. **Component & Accessibility Testing (React Testing Library + Axe)**:
   * Verify ARIA landmarks, dialog focus trapping, and keyboard `Escape` closing targeting WCAG 2.2 AA.
   * Test WebGL capability fallback: assert that if `<Canvas>` errors out, the 2D layout renders the same essential portfolio content and actions.
3. **End-to-End User Journey (Playwright)**:
   * Scenario: Load page -> verify preloader -> navigate to Prop Hunt station -> open exhibit card -> open transformation breakdown drawer -> close -> return to hub.
   * Test across desktop (Chromium, Firefox, WebKit) and simulated mobile viewport (iPhone 14 / Pixel 7).

### 8.2 Build & Deployment Pipeline
* **Build System**: Vite static production build (`npm run build` -> `dist/`).
* **Continuous Integration**: GitHub Actions workflow running on pull request:
  1. `npm run lint` & `tsc --noEmit`
  2. `npm run test`
  3. `npm run build`
  4. Bundle size budget validation.
* **Hosting**: GitHub Pages or Cloudflare Pages with edge caching for video and GLB files.

---

## 9. Technical Risks & Mitigations

| Risk | Severity | Impact | Mitigation Strategy |
|---|---|---|---|
| **Mobile WebGL Context Loss / Crash** | High | Black screen or frozen browser tab on low-memory mobile devices. | Implement `webglcontextlost` event listener. Unmount 3D canvas and smoothly switch to 2D Direct Mode with toast notification. Clamp DPR to 1.0 on mobile devices. |
| **Heavy Video Bandwidth & Slow Loading** | Medium | Stuttering playback or long delays before exhibits show proof. | Serve lightweight poster frames instantly. Only stream video when exhibit card is activated. Compress WebM clips under 6 MB. |
| **Browser Video Autoplay Restrictions** | Medium | Videos fail to play automatically when opening exhibits. | Set all `<video>` elements to `muted`, `playsInline`, and handle promise rejections by displaying a clear "Play Video" overlay button. |
| **Complex 3D Navigation Frustration** | Medium | Recruiters or busy reviewers abandon the site if navigation is tedious. | Sticky "Direct 2D Navigation" button accessible from frame one. Any exhibit can be opened directly without touching 3D controls. |
| **Shader Compilation Stutter** | Low | Frame drop when an exhibit model first renders. | Pre-compile all scene materials using Three.js `WebGLRenderer.compile()` during preloader phase. |
