import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { usePortfolio } from '../../context/PortfolioContext';

export const StudioScene: React.FC = () => {
  const { state, dispatch } = usePortfolio();
  const { camera } = useThree();

  // Camera animation target references (mutated without React re-renders)
  const currentLookAt = useRef(new THREE.Vector3(0, 1.0, 0));
  const targetPosition = useRef(new THREE.Vector3(0, 2.2, 5.5));
  const targetLookAt = useRef(new THREE.Vector3(0, 1.0, 0));
  const reticleRef = useRef<THREE.Mesh>(null);

  // Update target coordinates based on focus mode
  if (state.cameraFocus === 'transformation-bench') {
    targetPosition.current.set(2.4, 1.6, 2.2);
    targetLookAt.current.set(2.2, 0.8, 0);
  } else {
    targetPosition.current.set(0, 2.2, 5.5);
    targetLookAt.current.set(0, 1.0, 0);
  }

  useFrame((_, delta) => {
    // If reduced motion is active, snap instantly without interpolation
    if (state.isReducedMotion) {
      camera.position.copy(targetPosition.current);
      currentLookAt.current.copy(targetLookAt.current);
      camera.lookAt(currentLookAt.current);
      return;
    }

    // Smooth camera damping for standard mode (mutating Three.js vectors directly)
    const dampFactor = Math.min(delta * 3.5, 0.25);
    camera.position.lerp(targetPosition.current, dampFactor);
    currentLookAt.current.lerp(targetLookAt.current, dampFactor);
    camera.lookAt(currentLookAt.current);

    // Subtle idle hover on hotspot reticle
    if (reticleRef.current) {
      reticleRef.current.rotation.z += delta * 0.5;
    }
  });

  const handleBenchClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    dispatch({ type: 'SET_ACTIVE_EXHIBIT', payload: 'sheeshh-prop-hunt' });
  };

  const handlePointerOver = () => {
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    document.body.style.cursor = 'auto';
  };

  return (
    <>
      {/* Coastal Atmospheric Lighting */}
      <color attach="background" args={['#0a0f18']} />
      <fog attach="fog" args={['#0a0f18', 8, 22]} />

      <ambientLight intensity={0.6} color="#1e293b" />
      {/* Cool exterior coastal daylight streaming through observatory windows */}
      <directionalLight
        position={[-6, 6, 4]}
        intensity={1.4}
        color="#93c5fd"
        castShadow={false}
      />
      {/* Warm focused studio lighting over the Transformation Bench */}
      <spotLight
        position={[2.2, 4.2, 0.5]}
        target-position={[2.2, 0.8, 0]}
        intensity={3.2}
        color="#fbbf24"
        angle={0.65}
        penumbra={0.7}
      />

      {/* Procedural Coastal Observatory Architecture */}
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <circleGeometry args={[12, 32]} />
        <meshStandardMaterial color="#0f172a" roughness={0.7} metalness={0.2} />
      </mesh>

      {/* Floor Grid Accents */}
      <gridHelper args={[16, 16, '#1e293b', '#0f172a']} position={[0, 0.01, 0]} />

      {/* Curved Observatory Wall Pillars & Window Apertures */}
      {[-1.2, -0.6, 0, 0.6, 1.2].map((angle, idx) => {
        const radius = 9;
        const x = Math.sin(angle) * radius;
        const z = -Math.cos(angle) * radius;
        return (
          <group key={idx} position={[x, 3, z]}>
            {/* Architectural Column */}
            <mesh>
              <cylinderGeometry args={[0.25, 0.35, 6, 8]} />
              <meshStandardMaterial color="#1e293b" roughness={0.8} />
            </mesh>
            {/* Luminous Coastal Sky Horizon outside */}
            <mesh position={[0, 0, -0.2]}>
              <planeGeometry args={[2.8, 5]} />
              <meshBasicMaterial color="#1a273b" />
            </mesh>
          </group>
        );
      })}

      {/* Interactive Transformation Bench Station */}
      <group
        position={[2.2, 0, 0]}
        onClick={handleBenchClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        {/* Tabletop */}
        <mesh position={[0, 0.75, 0]}>
          <boxGeometry args={[2.0, 0.1, 1.0]} />
          <meshStandardMaterial color="#243046" roughness={0.5} metalness={0.3} />
        </mesh>

        {/* Steel Desk Legs */}
        <mesh position={[-0.85, 0.35, -0.38]}>
          <boxGeometry args={[0.08, 0.7, 0.08]} />
          <meshStandardMaterial color="#0f172a" roughness={0.9} />
        </mesh>
        <mesh position={[0.85, 0.35, -0.38]}>
          <boxGeometry args={[0.08, 0.7, 0.08]} />
          <meshStandardMaterial color="#0f172a" roughness={0.9} />
        </mesh>
        <mesh position={[-0.85, 0.35, 0.38]}>
          <boxGeometry args={[0.08, 0.7, 0.08]} />
          <meshStandardMaterial color="#0f172a" roughness={0.9} />
        </mesh>
        <mesh position={[0.85, 0.35, 0.38]}>
          <boxGeometry args={[0.08, 0.7, 0.08]} />
          <meshStandardMaterial color="#0f172a" roughness={0.9} />
        </mesh>

        {/* Procedural Prototype Props on the Bench */}
        {/* Prototype Disguise Cone */}
        <mesh position={[-0.45, 1.05, 0.1]}>
          <coneGeometry args={[0.18, 0.5, 12]} />
          <meshStandardMaterial color="#ea580c" roughness={0.4} />
        </mesh>

        {/* Prototype Storage Crate */}
        <mesh position={[0.35, 0.95, -0.1]}>
          <boxGeometry args={[0.35, 0.3, 0.35]} />
          <meshStandardMaterial color="#78350f" roughness={0.8} />
        </mesh>

        {/* Hotspot Floating Reticle */}
        <mesh ref={reticleRef} position={[0, 1.55, 0]}>
          <torusGeometry args={[0.22, 0.02, 8, 24]} />
          <meshStandardMaterial
            color={state.activeExhibitId === 'sheeshh-prop-hunt' ? '#38bdf8' : '#f59e0b'}
            emissive={state.activeExhibitId === 'sheeshh-prop-hunt' ? '#0ea5e9' : '#d97706'}
            emissiveIntensity={0.6}
            roughness={0.2}
          />
        </mesh>
      </group>
    </>
  );
};
