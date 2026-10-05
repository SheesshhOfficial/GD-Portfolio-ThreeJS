import React, { useEffect, useRef } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { BlueprintFlowDiagram } from '../diagrams/BlueprintFlowDiagram';
import { TransformStoryboardSvg } from '../diagrams/MediaStoryboardDiagrams';
import styles from './TransformationBreakdownDrawer.module.css';

interface TransformationBreakdownDrawerProps {
  originatingButtonRef?: React.RefObject<HTMLElement | null>;
}

export const TransformationBreakdownDrawer: React.FC<TransformationBreakdownDrawerProps> = ({ originatingButtonRef }) => {
  const { state, dispatch } = usePortfolio();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const cachedTriggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (state.isBreakdownOpen) {
      if (document.activeElement && document.activeElement !== document.body) {
        cachedTriggerRef.current = document.activeElement as HTMLElement;
      }
      const timer = setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [state.isBreakdownOpen]);

  useEffect(() => {
    if (!state.isBreakdownOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        handleClose();
        return;
      }

      if (e.key === 'Tab') {
        if (!drawerRef.current) return;
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first || !drawerRef.current.contains(document.activeElement)) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last || !drawerRef.current.contains(document.activeElement)) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.isBreakdownOpen]);

  if (!state.isBreakdownOpen) return null;

  const handleClose = () => {
    dispatch({ type: 'SET_BREAKDOWN_OPEN', payload: false });
    const fallback = document.getElementById('inspect-transform-btn');
    const target =
      originatingButtonRef?.current && originatingButtonRef.current !== document.body
        ? originatingButtonRef.current
        : cachedTriggerRef.current && cachedTriggerRef.current !== document.body
        ? cachedTriggerRef.current
        : fallback;
    if (target && typeof target.focus === 'function') {
      setTimeout(() => target.focus(), 10);
    }
  };

  return (
    <div
      className={styles.backdrop}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Real-Time Prop Disguise & Pivot Offset Architecture Deep Dive"
    >
      <div
        ref={drawerRef}
        className={styles.drawer}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <div className={styles.headerTitleGroup}>
            <div className={styles.idBadgeRow}>
              <span className={styles.idBadge}>EX-PH-TRANSFORM</span>
              <span className={styles.statusBadge}>VERIFIED_IMPLEMENTATION</span>
            </div>
            <h2 className={styles.title}>Prop Disguise &amp; Pivot Offset Architecture</h2>
            <p className={styles.subtitle}>
              Inspected Blueprint graph analysis · Unreal Engine 5.7.4 (BP_propChar)
            </p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className={styles.closeButton}
            onClick={handleClose}
            aria-label="Close Architecture Breakdown Drawer"
          >
            ✕
          </button>
        </div>

        <div className={styles.content}>
          {/* Section 1: Verified Execution Pipeline */}
          <section className={styles.section}>
            <h3 className={styles.sectionHeading}>1. Verified Implementation Pipeline</h3>
            <div className={styles.stepGrid}>
              <div className={styles.stepCard}>
                <div className={styles.stepHeader}>
                  <h4 className={styles.stepTitle}>Step 1: Input &amp; Interaction Trace</h4>
                  <span className={styles.stepTag}>Client Initiated</span>
                </div>
                <p className={styles.stepDesc}>
                  Enhanced Input Action <code>IA_ChangeProp</code> binds to pressing the interaction key (E). Executes a <code>SphereTraceSingle</code> along the player camera interaction channel. Hits on valid world actors are cast to <code>StaticMeshActor</code>.
                </p>
                <div className={styles.codeSnippet}>
                  IA_ChangeProp -&gt; SphereTraceSingle(ECC_Interaction) -&gt; Cast To StaticMeshActor
                </div>
              </div>

              <div className={styles.stepCard}>
                <div className={styles.stepHeader}>
                  <h4 className={styles.stepTitle}>Step 2: Server RPC &amp; Resource Validation</h4>
                  <span className={styles.stepTag}>Server RPC Execution</span>
                </div>
                <p className={styles.stepDesc}>
                  Client invokes reliable Server RPC <code>ChangePropOnServer</code>. The server queries <code>PropChangesLeft</code> bounded by <code>MaxPropChanges = 10</code>. The targeted static mesh is validated against the permitted prop array <code>PropAllowedMesh</code> using <code>Array_Contains</code>.
                </p>
                <div className={styles.codeSnippet}>
                  ChangePropOnServer(Reliable) -&gt; Check(PropChangesLeft &gt; 0) -&gt; Array_Contains(PropAllowedMesh)
                </div>
              </div>

              <div className={styles.stepCard}>
                <div className={styles.stepHeader}>
                  <h4 className={styles.stepTitle}>Step 3: Multicast Replication &amp; Mesh Swap</h4>
                  <span className={styles.stepTag}>Multicast Event</span>
                </div>
                <p className={styles.stepDesc}>
                  After the inspected server-side checks pass, the server broadcasts <code>UpdateMeshMulticast</code> passing the new <code>StaticMesh</code> reference. All client proxies receive the event and call <code>SetStaticMesh</code> on their replicated <code>PropMesh</code> component.
                </p>
                <div className={styles.codeSnippet}>
                  UpdateMeshMulticast(NetMulticast) -&gt; PropMesh-&gt;SetStaticMesh(NewMesh)
                </div>
              </div>

              <div className={styles.stepCard}>
                <div className={styles.stepHeader}>
                  <h4 className={styles.stepTitle}>Step 4: Pivot Offset Correction</h4>
                  <span className={styles.stepTag}>Ground Alignment</span>
                </div>
                <p className={styles.stepDesc}>
                  Props with non-centered or non-ground pivot points are indexed in the <code>MeshWithFAlsePivot</code> array. When matched, hardcoded relative translation adjustments are applied via <code>K2_SetRelativeLocation</code> to keep the disguised mesh grounded.
                </p>
                <div className={styles.codeSnippet}>
                  Array_Contains(MeshWithFAlsePivot) == True -&gt; PropMesh-&gt;K2_SetRelativeLocation(Offset)
                </div>
              </div>

              <div className={styles.stepCard}>
                <div className={styles.stepHeader}>
                  <h4 className={styles.stepTitle}>Step 5: Camera Decoupling &amp; Free Look</h4>
                  <span className={styles.stepTag}>Pawn Control</span>
                </div>
                <p className={styles.stepDesc}>
                  <code>EnhancedInputAction IA_RotationLock</code> toggles <code>bUseControllerRotationYaw</code> to false, decoupling controller yaw from actor rotation. Resulting runtime 360° camera orbit behavior remains capture pending.
                </p>
                <div className={styles.codeSnippet}>
                  IA_RotationLock -&gt; Set bUseControllerRotationYaw = false (Yaw Decoupled; Orbit Capture Pending)
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Interactive Blueprint Flow Diagram */}
          <section className={styles.section}>
            <h3 className={styles.sectionHeading}>2. Blueprint Graph Execution Flow</h3>
            <p className={styles.stepDesc}>
              Vector schematic reflecting the verified Blueprint node connectivity inspected inside <code>BP_propChar</code>:
            </p>
            <BlueprintFlowDiagram />
          </section>

          {/* Section 3: Technical Boundary & Unverified Claims Disclosure */}
          <section className={styles.section}>
            <h3 className={styles.sectionHeading}>3. Technical Boundaries &amp; Unverified Claims Disclosure</h3>
            <div className={styles.boundaryCard}>
              <div className={styles.boundaryHeader}>
                <span>⚠️ Architectural Audit Disclosure</span>
              </div>
              <p className={styles.boundaryText}>
                Early design dossiers claimed dynamic collision bounds calculation where the character capsule automatically resizes to match the transformed prop dimensions:
              </p>
              <div className={styles.boundaryFormula}>
                CapsuleRadius = 0.5 * max(Extent.X, Extent.Y) | CapsuleHalfHeight = max(Extent.Z, CapsuleRadius)
              </div>
              <p className={styles.boundaryText}>
                <strong>Inspected Reality:</strong> Functions such as <code>GetLocalBounds</code>, <code>SetCapsuleSize</code>, and dynamic ground offsets were <em>not found</em> in the inspected <code>BP_propChar</code> scope. Dynamic capsule resizing nodes were not found in the inspected Blueprint scope, and runtime capsule behavior remains unverified; collision is only disabled upon elimination. Pre-transform geometry collision sweeps were likewise not found in the inspected graphs. These claims are classified as <strong>UNVERIFIED</strong>; runtime verification remains pending.
              </p>
            </div>
          </section>

          {/* Section 4: Video Proof Viewport */}
          <section className={styles.section}>
            <h3 className={styles.sectionHeading}>4. Split-Screen Evidence Viewport (PH-TRANSFORM)</h3>
            <p className={styles.stepDesc}>
              Structured storyboard demonstrating the dual-client recording required to substantiate multiplayer replication:
            </p>
            <TransformStoryboardSvg />
          </section>

          {/* Section 5: Provenance & Sourcing */}
          <section className={styles.section}>
            <h3 className={styles.sectionHeading}>5. Provenance &amp; Authorship</h3>
            <div className={styles.provenanceBox}>
              <p className={styles.provenanceText}>
                <strong>Logic Authorship:</strong> <code>USER_CONFIRMED: pending</code> (project repository <code>BP_propChar</code>).
              </p>
              <p className={styles.provenanceText}>
                <strong>Prop Meshes &amp; Materials:</strong> <code>PROVENANCE_PENDING</code> (folder <code>Content/resources/Construction_VOL1</code>).
              </p>
              <p className={styles.provenanceText}>
                <strong>Engine Version:</strong> Unreal Engine 5.7.4 (Source: <code>G:\Unreal Projects\SheeshhPropHuntYT</code>).
              </p>
            </div>
          </section>
        </div>

        <div className={styles.footer}>
          <button type="button" className={styles.dismissBtn} onClick={handleClose}>
            Back to Exhibit Card
          </button>
        </div>
      </div>
    </div>
  );
};
