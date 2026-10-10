import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { PMREMGenerator } from 'three';
import { usePortfolio } from '../../context/PortfolioContext';

export function RendererHealth({economy,onSlow}: {economy: boolean; onSlow: ()=>void}) {
  const {gl,scene} = useThree();
  const {state,dispatch} = usePortfolio();
  const sample=useRef({elapsed:0,frames:0,total:0,windows:0,slowWindows:0});
  useEffect(()=>{
    const lost=(e:Event)=>{e.preventDefault();dispatch({type:'SET_WEBGL_SUPPORTED',payload:false});};
    gl.domElement.addEventListener('webglcontextlost',lost);
    return()=>gl.domElement.removeEventListener('webglcontextlost',lost);
  },[gl,dispatch]);
  useEffect(()=>{
    if(economy)return;
    const room=new RoomEnvironment();
    const generator=new PMREMGenerator(gl);
    const target=generator.fromScene(room,.04);
    scene.environment=target.texture;
    scene.environmentIntensity=.35;
    room.dispose();generator.dispose();
    return()=>{scene.environment=null;scene.environmentIntensity=1;target.dispose();};
  },[gl,scene,economy]);
  useFrame((_,delta)=>{
    const root=document.getElementById('studio-renderer');
    const paused=state.motionPaused || state.isReducedMotion;
    if(root)root.dataset.renderMode=paused ? 'On-demand rendering (motion paused)' : economy ? 'Economy rendering' : 'High-quality rendering';
    const s=sample.current;
    s.total++;
    if(root)root.dataset.renderedFrames=String(s.total);
    if(delta>.25){s.elapsed=0;s.frames=0;return;}
    s.elapsed+=delta;s.frames++;
    if(root){root.dataset.calls=String(gl.info.render.calls);root.dataset.triangles=String(gl.info.render.triangles);}
    if(paused){if(root)root.dataset.fps='On demand';return;}
    if(s.elapsed<2)return;
    const fps=Math.round(s.frames/s.elapsed);
    if(root)root.dataset.fps=String(fps);
    s.windows++;
    if(s.windows>1 && fps<35)s.slowWindows++;else s.slowWindows=0;
    if(s.slowWindows>=2 && state.quality==='auto' && !economy)onSlow();
    s.elapsed=0;s.frames=0;
  });
  return null;
}
