import React, { useCallback, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { StudioScene } from './StudioScene';
import styles from './CanvasContainer.module.css';
import { usePortfolio } from '../../context/PortfolioContext';
import { RendererHealth } from './RendererHealth';

export const CanvasContainer: React.FC = () => {
  const {state} = usePortfolio();
  const [autoLow,setAutoLow]=useState(()=>window.matchMedia('(pointer: coarse)').matches);
  const [visible,setVisible]=useState(!document.hidden);
  const economy=state.quality==='low' || (state.quality==='auto' && autoLow);
  const onSlow=useCallback(()=>setAutoLow(true),[]);
  useEffect(()=>{const change=()=>setVisible(!document.hidden);document.addEventListener('visibilitychange',change);return()=>document.removeEventListener('visibilitychange',change);},[]);
  return (
    <div id="studio-renderer" className={styles.canvasWrapper} role="region" aria-label="Interactive 3D workshop" inert={!!state.activeExhibitId||state.tourStep!==null}>
      <Canvas
        shadows={economy?false:'soft'}
        frameloop={!visible ? 'never' : state.motionPaused || state.isReducedMotion ? 'demand' : 'always'}
        camera={{ position: [9, 6, 13], fov: 42, near: 0.1, far: 100 }}
        dpr={economy ? 1 : [1, 1.5]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: false,
        }}
      >
        <StudioScene economy={economy} />
        <RendererHealth economy={economy} onSlow={onSlow} />
      </Canvas>
    </div>
  );
};

export default CanvasContainer;
