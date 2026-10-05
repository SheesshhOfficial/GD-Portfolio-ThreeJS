import React from 'react';
import { Canvas } from '@react-three/fiber';
import { StudioScene } from './StudioScene';
import styles from './CanvasContainer.module.css';

export const CanvasContainer: React.FC = () => {
  return (
    <div className={styles.canvasWrapper} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 2.2, 5.5], fov: 48, near: 0.1, far: 50 }}
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
