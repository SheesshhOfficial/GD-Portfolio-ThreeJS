import React, { useRef, useLayoutEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { usePortfolio } from '../../context/PortfolioContext';

// Instanced meshes for architectural perimeter (columns and sky horizons)
const ObservatoryPerimeter: React.FC = () => {
  const columnsRef = useRef<THREE.InstancedMesh>(null);
  const skyPlanesRef = useRef<THREE.InstancedMesh>(null);

  useLayoutEffect(() => {
    const dummy = new THREE.Object3D();
    const angles = [-1.2, -0.6, 0, 0.6, 1.2];
    const radius = 9;

    angles.forEach((angle, idx) => {
      const x = Math.sin(angle) * radius;
      const z = -Math.cos(angle) * radius;

      // Architectural Column
      dummy.position.set(x, 3, z);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      if (columnsRef.current) {
        columnsRef.current.setMatrixAt(idx, dummy.matrix);
      }

      // Exterior coastal sky horizon aperture
      dummy.position.set(x, 3, z - 0.2);
      dummy.updateMatrix();
      if (skyPlanesRef.current) {
        skyPlanesRef.current.setMatrixAt(idx, dummy.matrix);
      }
    });

    if (columnsRef.current) columnsRef.current.instanceMatrix.needsUpdate = true;
    if (skyPlanesRef.current) skyPlanesRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <>
      <instancedMesh ref={columnsRef} args={[undefined, undefined, 5]}>
        <cylinderGeometry args={[0.25, 0.35, 6, 8]} />
        <meshStandardMaterial color="#1e293b" roughness={0.8} />
      </instancedMesh>
      <instancedMesh ref={skyPlanesRef} args={[undefined, undefined, 5]}>
        <planeGeometry args={[2.8, 5]} />
        <meshBasicMaterial color="#1a273b" />
      </instancedMesh>
    </>
  );
};

// Instanced desk legs and footplates for the transformation workstation
const TableLegsAndFeet: React.FC = () => {
  const legsRef = useRef<THREE.InstancedMesh>(null);
  const feetRef = useRef<THREE.InstancedMesh>(null);

  useLayoutEffect(() => {
    const dummy = new THREE.Object3D();
    const positions = [
      [-0.9, 0.36, -0.4],
      [0.9, 0.36, -0.4],
      [-0.9, 0.36, 0.4],
      [0.9, 0.36, 0.4],
    ];

    positions.forEach(([lx, ly, lz], idx) => {
      // Leg column
      dummy.position.set(lx, ly, lz);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      if (legsRef.current) {
        legsRef.current.setMatrixAt(idx, dummy.matrix);
      }

      // Foot plate
      dummy.position.set(lx, ly - 0.35, lz);
      dummy.updateMatrix();
      if (feetRef.current) {
        feetRef.current.setMatrixAt(idx, dummy.matrix);
      }
    });

    if (legsRef.current) legsRef.current.instanceMatrix.needsUpdate = true;
    if (feetRef.current) feetRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <>
      <instancedMesh ref={legsRef} args={[undefined, undefined, 4]}>
        <boxGeometry args={[0.07, 0.72, 0.07]} />
        <meshStandardMaterial color="#0f172a" roughness={0.8} metalness={0.6} />
      </instancedMesh>
      <instancedMesh ref={feetRef} args={[undefined, undefined, 4]}>
        <boxGeometry args={[0.12, 0.02, 0.12]} />
        <meshStandardMaterial color="#334155" roughness={0.5} metalness={0.7} />
      </instancedMesh>
    </>
  );
};

// Instanced reflective white striping for the disguise traffic cone
const ConeStripes: React.FC = () => {
  const stripesRef = useRef<THREE.InstancedMesh>(null);

  useLayoutEffect(() => {
    if (!stripesRef.current) return;
    const dummy = new THREE.Object3D();

    // Lower stripe
    dummy.position.set(0, 0.22, 0);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1.0, 1.0, 1.0);
    dummy.updateMatrix();
    stripesRef.current.setMatrixAt(0, dummy.matrix);

    // Upper stripe
    dummy.position.set(0, 0.33, 0);
    dummy.scale.set(0.65, 0.85, 0.65);
    dummy.updateMatrix();
    stripesRef.current.setMatrixAt(1, dummy.matrix);

    stripesRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <instancedMesh ref={stripesRef} args={[undefined, undefined, 2]}>
      <cylinderGeometry args={[0.105, 0.12, 0.07, 16]} />
      <meshStandardMaterial color="#f8fafc" roughness={0.2} />
    </instancedMesh>
  );
};

// Instanced corner bracing for prototype wooden crate
const CrateBracing: React.FC = () => {
  const braceRef = useRef<THREE.InstancedMesh>(null);

  useLayoutEffect(() => {
    if (!braceRef.current) return;
    const dummy = new THREE.Object3D();

    // Horizontal reinforcement brace
    dummy.position.set(0, 0.16, 0.181);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(0.32, 0.03, 0.01);
    dummy.updateMatrix();
    braceRef.current.setMatrixAt(0, dummy.matrix);

    // Vertical reinforcement brace
    dummy.position.set(0, 0.16, 0.181);
    dummy.scale.set(0.03, 0.28, 0.01);
    dummy.updateMatrix();
    braceRef.current.setMatrixAt(1, dummy.matrix);

    braceRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <instancedMesh ref={braceRef} args={[undefined, undefined, 2]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#451a03" roughness={0.9} />
    </instancedMesh>
  );
};

// Instanced triple telemetry screen array for Systems Console station
const ConsoleScreens: React.FC = () => {
  const screensRef = useRef<THREE.InstancedMesh>(null);

  useLayoutEffect(() => {
    if (!screensRef.current) return;
    const dummy = new THREE.Object3D();

    // Screen 1: Center Primary Telemetry Screen
    dummy.position.set(0, 1.18, -0.05);
    dummy.rotation.set(-0.2, 0, 0);
    dummy.scale.set(0.75, 0.46, 1);
    dummy.updateMatrix();
    screensRef.current.setMatrixAt(0, dummy.matrix);

    // Screen 2: Left Diagnostic Screen (angled inward)
    dummy.position.set(-0.58, 1.16, 0.02);
    dummy.rotation.set(-0.2, 0.35, 0);
    dummy.scale.set(0.42, 0.40, 1);
    dummy.updateMatrix();
    screensRef.current.setMatrixAt(1, dummy.matrix);

    // Screen 3: Right Combat/Audio Telemetry Screen (angled inward)
    dummy.position.set(0.58, 1.16, 0.02);
    dummy.rotation.set(-0.2, -0.35, 0);
    dummy.scale.set(0.42, 0.40, 1);
    dummy.updateMatrix();
    screensRef.current.setMatrixAt(2, dummy.matrix);

    screensRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <instancedMesh ref={screensRef} args={[undefined, undefined, 3]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial color="#0284c7" />
    </instancedMesh>
  );
};

export const StudioScene: React.FC = () => {
  const { state, dispatch } = usePortfolio();
  const { camera } = useThree();

  // Camera animation target references
  const currentLookAt = useRef(new THREE.Vector3(0, 1.2, 0));
  const targetPosition = useRef(new THREE.Vector3(0, 2.2, 5.5));
  const targetLookAt = useRef(new THREE.Vector3(0, 1.2, 0));

  // Cinematic Entrance parameters
  const entranceStartPos = useRef(new THREE.Vector3(-6, 3, 8));
  const entranceStartLook = useRef(new THREE.Vector3(0, 1.5, 0));
  const entranceTime = useRef(0);

  // Mesh references for micro-animations
  const benchReticleRef = useRef<THREE.Mesh>(null);
  const systemsReticleRef = useRef<THREE.Mesh>(null);
  const benchGlowRef = useRef<THREE.PointLight>(null);
  const systemsGlowRef = useRef<THREE.PointLight>(null);

  // Update target coordinates based on focus mode
  if (state.cameraFocus === 'transformation-bench') {
    targetPosition.current.set(2.4, 1.6, 2.2);
    targetLookAt.current.set(2.2, 0.9, 0);
  } else if (state.cameraFocus === 'systems-console') {
    targetPosition.current.set(-2.4, 1.6, 2.2);
    targetLookAt.current.set(-2.2, 0.9, 0);
  } else {
    targetPosition.current.set(0, 2.2, 5.5);
    targetLookAt.current.set(0, 1.2, 0);
  }

  useFrame((_, delta) => {
    // 1. Reduced motion overrides all transitions instantly
    if (state.isReducedMotion) {
      if (state.isEntranceActive) {
        dispatch({ type: 'COMPLETE_ENTRANCE' });
      }
      camera.position.copy(targetPosition.current);
      currentLookAt.current.copy(targetLookAt.current);
      camera.lookAt(currentLookAt.current);
      return;
    }

    // 2. Cinematic Entrance Pan (approx. 2.5s)
    if (state.isEntranceActive) {
      entranceTime.current += delta;
      const duration = 2.5;
      const progress = Math.min(entranceTime.current / duration, 1.0);

      // Smooth easeInOutCubic curve
      const eased =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      camera.position.lerpVectors(entranceStartPos.current, targetPosition.current, eased);
      currentLookAt.current.lerpVectors(entranceStartLook.current, targetLookAt.current, eased);
      camera.lookAt(currentLookAt.current);

      if (progress >= 1.0) {
        dispatch({ type: 'COMPLETE_ENTRANCE' });
      }
      return;
    }

    // 3. Standard Camera Damping
    const dampFactor = Math.min(delta * 3.5, 0.25);
    camera.position.lerp(targetPosition.current, dampFactor);
    currentLookAt.current.lerp(targetLookAt.current, dampFactor);
    camera.lookAt(currentLookAt.current);

    // Subtle idle hover on hotspot reticles
    if (benchReticleRef.current) {
      benchReticleRef.current.rotation.z += delta * 0.4;
    }
    if (systemsReticleRef.current) {
      systemsReticleRef.current.rotation.z -= delta * 0.4;
    }
  });

  const handleBenchClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    if (state.isEntranceActive) {
      dispatch({ type: 'COMPLETE_ENTRANCE' });
    }
    dispatch({ type: 'SET_CAMERA_FOCUS', payload: 'transformation-bench' });
    dispatch({ type: 'SET_ACTIVE_EXHIBIT', payload: 'sheeshh-prop-hunt' });
  };

  const handleSystemsConsoleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    if (state.isEntranceActive) {
      dispatch({ type: 'COMPLETE_ENTRANCE' });
    }
    dispatch({ type: 'SET_CAMERA_FOCUS', payload: 'systems-console' });
    dispatch({ type: 'SET_ACTIVE_EXHIBIT', payload: 'EX-PH-COMBAT' });
  };

  const handlePointerOver = () => {
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    document.body.style.cursor = 'auto';
  };

  const isBenchActive = state.activeExhibitId === 'sheeshh-prop-hunt' || state.activeExhibitId === 'EX-PH-TRANSFORM';
  const isSystemsActive =
    state.activeExhibitId === 'EX-PH-COMBAT' ||
    state.activeExhibitId === 'EX-PH-AUDIO' ||
    state.activeExhibitId === 'EX-PH-LIFECYCLE' ||
    state.activeExhibitId === 'EX-PH-CUSTOMIZATION' ||
    state.activeExhibitId === 'EX-PH-ROUND' ||
    state.activeExhibitId === 'EX-PH-EMOTES';

  return (
    <>
      {/* Coastal Atmospheric Lighting */}
      <color attach="background" args={['#0a0f18']} />
      <fog attach="fog" args={['#0a0f18', 8, 22]} />

      <ambientLight intensity={0.65} color="#1e293b" />
      {/* Cool exterior coastal daylight streaming through observatory windows */}
      <directionalLight
        position={[-6, 6, 4]}
        intensity={1.3}
        color="#93c5fd"
        castShadow={false}
      />
      {/* Warm focused studio lighting over Transformation Bench */}
      <spotLight
        position={[2.2, 4.5, 0.5]}
        target-position={[2.2, 0.8, 0]}
        intensity={3.4}
        color="#fbbf24"
        angle={0.65}
        penumbra={0.7}
      />
      {/* Cool cyan focused studio lighting over Systems Console */}
      <spotLight
        position={[-2.2, 4.5, 0.5]}
        target-position={[-2.2, 0.8, 0]}
        intensity={3.4}
        color="#38bdf8"
        angle={0.65}
        penumbra={0.7}
      />

      {/* Subtle local diagnostic glows */}
      <pointLight
        ref={benchGlowRef}
        position={[2.2, 1.2, 0.2]}
        intensity={0.6}
        color="#38bdf8"
        distance={3.5}
      />
      <pointLight
        ref={systemsGlowRef}
        position={[-2.2, 1.3, 0.2]}
        intensity={0.5}
        color="#0ea5e9"
        distance={3.5}
      />

      {/* Procedural Coastal Observatory Architecture */}
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <circleGeometry args={[12, 32]} />
        <meshStandardMaterial color="#0f172a" roughness={0.7} metalness={0.2} />
      </mesh>

      {/* Floor Grid Accents */}
      <gridHelper args={[16, 16, '#1e293b', '#0f172a']} position={[0, 0.01, 0]} />

      {/* Curved Observatory Wall Pillars & Window Apertures (Instanced: 2 draw calls for 10 meshes) */}
      <ObservatoryPerimeter />

      {/* ================= STATION 1: TRANSFORMATION BENCH ================= */}
      <group
        position={[2.2, 0, 0]}
        onClick={handleBenchClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        {/* Main Workstation Desk Tabletop */}
        <mesh position={[0, 0.75, 0]}>
          <boxGeometry args={[2.1, 0.08, 1.05]} />
          <meshStandardMaterial color="#1f2937" roughness={0.4} metalness={0.3} />
        </mesh>

        {/* Metal Edge Trim on Tabletop */}
        <mesh position={[0, 0.75, 0.52]}>
          <boxGeometry args={[2.12, 0.082, 0.02]} />
          <meshStandardMaterial color="#38bdf8" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Lower Equipment Shelf */}
        <mesh position={[0, 0.22, 0]}>
          <boxGeometry args={[1.9, 0.04, 0.85]} />
          <meshStandardMaterial color="#111827" roughness={0.7} metalness={0.4} />
        </mesh>

        {/* Steel Desk Legs with Foot Plates (Instanced: 2 draw calls for 8 meshes) */}
        <TableLegsAndFeet />

        {/* Structural Cross-Brace Beams */}
        <mesh position={[0, 0.36, -0.4]}>
          <boxGeometry args={[1.75, 0.03, 0.03]} />
          <meshStandardMaterial color="#1e293b" roughness={0.8} />
        </mesh>

        {/* Props on Bench */}
        {/* 1. Prototype Disguise Cone (with instanced reflective stripes) */}
        <group position={[-0.55, 0.8, 0.15]}>
          <mesh position={[0, 0.015, 0]}>
            <boxGeometry args={[0.38, 0.03, 0.38]} />
            <meshStandardMaterial color="#c2410c" roughness={0.6} />
          </mesh>
          <mesh position={[0, 0.26, 0]}>
            <coneGeometry args={[0.16, 0.5, 16]} />
            <meshStandardMaterial color="#ea580c" roughness={0.35} />
          </mesh>
          <ConeStripes />
        </group>

        {/* 2. Prototype Wooden Storage Crate with Bracing */}
        <group position={[0.45, 0.8, -0.15]}>
          <mesh position={[0, 0.16, 0]}>
            <boxGeometry args={[0.36, 0.32, 0.36]} />
            <meshStandardMaterial color="#78350f" roughness={0.85} />
          </mesh>
          <CrateBracing />
        </group>

        {/* 3. Engineering Caliper Diagnostic Tool */}
        <group position={[-0.05, 0.805, 0.28]} rotation={[0, -0.2, 0]}>
          <mesh>
            <boxGeometry args={[0.32, 0.008, 0.035]} />
            <meshStandardMaterial color="#94a3b8" roughness={0.2} metalness={0.9} />
          </mesh>
          <mesh position={[-0.14, 0.005, -0.03]}>
            <boxGeometry args={[0.03, 0.012, 0.06]} />
            <meshStandardMaterial color="#cbd5e1" roughness={0.2} metalness={0.9} />
          </mesh>
        </group>

        {/* 4. Blueprint Drafting Schematic */}
        <mesh position={[0.05, 0.795, -0.08]} rotation={[-Math.PI / 2, 0, 0.12]}>
          <planeGeometry args={[0.48, 0.34]} />
          <meshStandardMaterial color="#0369a1" roughness={0.8} />
        </mesh>

        {/* 5. Diagnostic Screen Stand */}
        <group position={[0.75, 0.8, 0.15]} rotation={[0, -0.4, 0]}>
          <mesh position={[0, 0.01, 0]}>
            <boxGeometry args={[0.15, 0.02, 0.12]} />
            <meshStandardMaterial color="#0f172a" roughness={0.5} metalness={0.7} />
          </mesh>
          <mesh position={[0, 0.14, 0]} rotation={[-0.2, 0, 0]}>
            <boxGeometry args={[0.26, 0.18, 0.015]} />
            <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
          </mesh>
          <mesh position={[0, 0.14, 0.009]} rotation={[-0.2, 0, 0]}>
            <planeGeometry args={[0.23, 0.15]} />
            <meshBasicMaterial color="#0284c7" />
          </mesh>
        </group>

        {/* 6. Hotspot Floating Reticle */}
        <group position={[0, 1.6, 0]}>
          <mesh ref={benchReticleRef}>
            <torusGeometry args={[0.24, 0.02, 8, 24]} />
            <meshStandardMaterial
              color={isBenchActive ? '#38bdf8' : '#f59e0b'}
              emissive={isBenchActive ? '#0ea5e9' : '#d97706'}
              emissiveIntensity={0.8}
              roughness={0.2}
            />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.04, 12, 12]} />
            <meshBasicMaterial color={isBenchActive ? '#38bdf8' : '#fbbf24'} />
          </mesh>
        </group>
      </group>

      {/* ================= STATION 2: SYSTEMS CONSOLE ================= */}
      <group
        position={[-2.2, 0, 0]}
        onClick={handleSystemsConsoleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        {/* Base Pedestal */}
        <mesh position={[0, 0.45, 0]}>
          <boxGeometry args={[1.5, 0.9, 0.9]} />
          <meshStandardMaterial color="#0f172a" roughness={0.7} metalness={0.5} />
        </mesh>

        {/* Angled Control Deck */}
        <mesh position={[0, 0.92, 0.05]} rotation={[-0.25, 0, 0]}>
          <boxGeometry args={[1.52, 0.05, 0.95]} />
          <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.6} />
        </mesh>

        {/* Emissive Edge Accent */}
        <mesh position={[0, 0.93, 0.52]} rotation={[-0.25, 0, 0]}>
          <boxGeometry args={[1.54, 0.04, 0.02]} />
          <meshStandardMaterial color="#38bdf8" roughness={0.2} metalness={0.9} />
        </mesh>

        {/* Triple Telemetry Screens (Instanced: 1 draw call for 3 screens) */}
        <ConsoleScreens />

        {/* Hotspot Floating Reticle */}
        <group position={[0, 1.6, 0]}>
          <mesh ref={systemsReticleRef}>
            <torusGeometry args={[0.24, 0.02, 8, 24]} />
            <meshStandardMaterial
              color={isSystemsActive ? '#38bdf8' : '#0ea5e9'}
              emissive={isSystemsActive ? '#38bdf8' : '#0284c7'}
              emissiveIntensity={0.8}
              roughness={0.2}
            />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.04, 12, 12]} />
            <meshBasicMaterial color={isSystemsActive ? '#38bdf8' : '#0ea5e9'} />
          </mesh>
        </group>
      </group>
    </>
  );
};

export default StudioScene;
