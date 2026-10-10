import React from 'react';
import { Canvas } from '@react-three/fiber';
import { StudioScene } from './StudioScene';
import styles from './CanvasContainer.module.css';

export const CanvasContainer: React.FC = () => {
  return (
    <div className={styles.canvasWrapper} role="region" aria-label="3D Observatory Studio">
      <Canvas
        shadows
        camera={{ position: [9, 6, 13], fov: 42, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: false,
        }}
      >
        <StudioScene />
      </Canvas>
    </div>
  );
};

export default CanvasContainer;
