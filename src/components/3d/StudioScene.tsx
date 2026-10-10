import { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { usePortfolio } from '../../context/PortfolioContext';
import './StudioScene.css';

const softBox = new RoundedBoxGeometry(1,1,1,2,.045);
const grainPixels=new Uint8Array(64*64*4);
for(let i=0;i<64*64;i++){const value=170+((i*73 ^ (i>>4)*29)%70);grainPixels.set([value,value,value,255],i*4);}
const stoneGrain=new THREE.DataTexture(grainPixels,64,64);
stoneGrain.wrapS=stoneGrain.wrapT=THREE.RepeatWrapping;
stoneGrain.repeat.set(6,6);stoneGrain.needsUpdate=true;

function Block({ position, scale, color = '#d8dac9' }: {position: [number,number,number]; scale: [number,number,number]; color?: string}) {
  return <mesh position={position} scale={scale} geometry={softBox} castShadow receiveShadow><meshStandardMaterial color={color} roughness={0.85} bumpMap={stoneGrain} bumpScale={.012} /></mesh>;
}

function Plant({ position }: {position: [number,number,number]}) {
  return <group position={position}>
    <mesh position={[0,.18,0]} castShadow><cylinderGeometry args={[.2,.14,.36,24]} /><meshStandardMaterial color="#b8ac92" roughness={.95} /></mesh>
    {Array.from({length:7}, (_,i) => <group key={i} rotation={[0,i*2.4,0]}>
      <mesh position={[0,.58,0]} rotation={[0,0,-.35]} castShadow><cylinderGeometry args={[.014,.02,.7,6]} /><meshStandardMaterial color="#596b44" /></mesh>
      <mesh position={[.14,.77,0]} rotation={[0,0,-.6-i*.08]} scale={[.13,.33,.045]} castShadow><sphereGeometry args={[1,12,8]} /><meshStandardMaterial color={i%2 ? '#798b59' : '#4e6645'} roughness={.9} /></mesh>
    </group>)}
  </group>;
}

export function StudioScene({economy=false}: {economy?: boolean}) {
  const {state,dispatch} = usePortfolio();
  const {camera,size,pointer,invalidate} = useThree();
  const paused=state.isReducedMotion || state.motionPaused;
  useEffect(()=>{invalidate();},[state.cameraFocus,state.isEntranceActive,paused,size.width,size.height,invalidate]);
  const sculpture = useRef<THREE.Group>(null);
  const time = useRef(0);
  const look = useRef(new THREE.Vector3());
  const target = useRef(new THREE.Vector3());
  const aim = useRef(new THREE.Vector3());
  const [hotspotsReady, setHotspotsReady] = useState(false);
  const readyRef = useRef(false);
  const mobile = size.width < 760;
  const open = (id: string) => { dispatch({type:'COMPLETE_ENTRANCE'}); dispatch({type:'SET_ACTIVE_EXHIBIT',payload:id}); };
  useFrame((_,delta) => {
    time.current += delta;
    if (sculpture.current && !paused) {
      sculpture.current.rotation.y += delta*.12;
      sculpture.current.position.y = 2.15 + Math.sin(time.current*.7)*.055;
    }
    if (state.cameraFocus === 'transformation-bench') { target.current.set(4.7,3.1,6); aim.current.set(.5,1.6,0); }
    else if (state.cameraFocus === 'systems-console') { target.current.set(1.2,2.3,5.5); aim.current.set(-1.35,.9,1.3); }
    else if (mobile) { target.current.set(7,6.5,12); aim.current.set(0,3.1,0); }
    else { target.current.set(7,5.2,10); aim.current.set(-2,1.25,0); }
    if (!paused && !mobile && state.cameraFocus === 'center') {
      target.current.x += pointer.x * .24;
      target.current.y += pointer.y * .12;
    }
    if(state.isEntranceActive && time.current>1.7) dispatch({type:'COMPLETE_ENTRANCE'});
    const speed = state.isReducedMotion ? 1 : 1-Math.exp(-delta*2.3);
    camera.position.lerp(target.current,speed);
    look.current.lerp(aim.current,speed);
    camera.lookAt(look.current);
    if(paused && (camera.position.distanceTo(target.current)>.002 || look.current.distanceTo(aim.current)>.002 || state.isEntranceActive))invalidate();
    const ready = !state.activeExhibitId && !state.isEntranceActive && camera.position.distanceTo(target.current)<.35;
    if (ready !== readyRef.current) {
      readyRef.current = ready;
      setHotspotsReady(ready);
    }
  });
  return <>
    <color attach="background" args={['#f1f1e8']} />
    <fog attach="fog" args={['#f1f1e8',19,38]} />
    <hemisphereLight args={['#fff9e9','#a7b49c',2.2]} />
    <directionalLight position={[-3,9,5]} intensity={3.5} color="#fff7e6" castShadow shadow-mapSize={[1024,1024]} shadow-camera-left={-10} shadow-camera-right={10} shadow-camera-top={10} shadow-camera-bottom={-10} shadow-bias={-.001} />
    <directionalLight position={[7,4,-3]} intensity={1.2} color="#dce7de" />
    <mesh rotation={[-Math.PI/2,0,0]} position={[0,-.09,0]} receiveShadow><planeGeometry args={[100,100]} /><meshStandardMaterial color="#eeeee3" roughness={1} /></mesh>
    <group position={[.65,0,0]}>
      <mesh position={[0,.04,0]} receiveShadow><cylinderGeometry args={[3.7,3.8,.15,80]} /><meshStandardMaterial color="#d7dccb" roughness={.94} /></mesh>
      <mesh position={[0,.14,0]} receiveShadow><cylinderGeometry args={[3.25,3.3,.12,80]} /><meshStandardMaterial color="#e5e7da" roughness={.9} /></mesh>
      {/* Architectural backdrop: softened concrete and open timber fins. */}
      <Block position={[0,1.75,-2.3]} scale={[4.7,3.2,.18]} color="#c5cfb9" />
      <Block position={[2.45,.8,-1.05]} scale={[.18,1.3,2.6]} color="#d4dcc8" />
      <Block position={[2.45,3.25,-1.05]} scale={[.18,.2,2.6]} color="#c5cfb9" />
      <Block position={[2.45,2.35,.2]} scale={[.18,1.7,.16]} color="#c5cfb9" />
      <Block position={[2.45,2.35,-2.3]} scale={[.18,1.7,.16]} color="#c5cfb9" />
      <mesh position={[2.45,2.35,-1.05]} scale={[.035,1.7,2.45]} geometry={softBox}>
        {economy ? <meshStandardMaterial color="#e1e6d6" transparent opacity={.2} /> : <meshPhysicalMaterial color="#dbe4d1" transparent opacity={.25} roughness={.15} metalness={.08} clearcoat={1} depthWrite={false} side={THREE.DoubleSide} />}
      </mesh>
      {Array.from({length:10},(_,i)=><Block key={i} position={[-2.25+i*.47,3.43,-1.2]} scale={[.085,.16,2.6]} color="#a9ad91" />)}
      <mesh position={[.3,1.9,-2.18]}><ringGeometry args={[.91,1.02,64]} /><meshStandardMaterial color="#8d9b74" roughness={.5} metalness={.2} /></mesh>
      <mesh position={[.3,1.9,-2.2]}><circleGeometry args={[.9,64]} /><meshStandardMaterial color="#d9e1c9" /></mesh>
      <Block position={[.45,.61,0]} scale={[1.65,.85,1.65]} color="#bac7a6" />
      <Block position={[.45,1.065,0]} scale={[1.75,.08,1.75]} color="#e5e9d9" />
      <group ref={sculpture} position={[.45,2.15,0]} rotation={[.25,.4,.15]} onClick={e=>{e.stopPropagation();document.body.style.cursor='auto';open('sheeshh-prop-hunt');}} onPointerOver={()=>{document.body.style.cursor='pointer';}} onPointerOut={()=>{document.body.style.cursor='auto';}}>
        {[-1,1].flatMap(x=>[-1,1].flatMap(y=>[-1,1].map(z=><mesh key={`${x}${y}${z}`} position={[x*.34,y*.34,z*.34]} scale={.61} castShadow receiveShadow>
          <primitive object={softBox} attach="geometry" /><meshPhysicalMaterial color={x===y ? '#859963' : '#c4cfaa'} roughness={.28} metalness={.16} clearcoat={.4} clearcoatRoughness={.3} />
        </mesh>)))}
        <mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[1.08,.012,8,100]} /><meshStandardMaterial color="#82906d" metalness={.6} roughness={.3} /></mesh>
      </group>
      {/* A smaller workstation represents the systems collection. */}
      <Block position={[-1.55,.64,1.5]} scale={[1.1,.9,.8]} color="#d2cbb8" />
      <Block position={[-1.55,1.11,1.5]} scale={[1.2,.07,.9]} color="#e9e4d8" />
      <Block position={[-1.55,1.43,1.43]} scale={[.06,.55,.06]} color="#59684e" />
      <Block position={[-1.55,1.72,1.4]} scale={[.9,.51,.055]} color="#4c5d43" />
      <Block position={[-1.55,1.72,1.44]} scale={[.81,.42,.015]} color="#a7bb8e" />
      {Array.from({length:4},(_,i)=><Block key={i} position={[-1.83+i*.15,1.69,1.455]} scale={[.07,.12+i*.05,.01]} color="#657b54" />)}
      <Plant position={[1.85,.2,-1.25]} /><Plant position={[-2.5,.2,-1.25]} />
      <mesh position={[2.3,.32,1.2]} castShadow><sphereGeometry args={[.18,24,16]} /><meshStandardMaterial color="#aa8a5b" roughness={.35} metalness={.4} /></mesh>
      <Block position={[2.3,.23,1.2]} scale={[.6,.12,.6]} color="#d8cbb2" />
      {hotspotsReady && !state.activeExhibitId && !state.isDirectMenuOpen && !state.isEntranceActive && <>
        <Html position={[1.5,1.85,.5]} center zIndexRange={[5,0]}><button className="scene-hotspot" id="hotspot-btn-bench" onClick={()=>open('sheeshh-prop-hunt')} aria-label="Explore prop transformation"><span>+</span><small>PROP TRANSFORMATION</small></button></Html>
        <Html position={[-1.75,1.1,2]} center zIndexRange={[5,0]}><button className="scene-hotspot" id="hotspot-btn-systems" onClick={()=>open('EX-PH-COMBAT')} aria-label="Explore gameplay systems"><span>+</span><small>GAMEPLAY SYSTEMS</small></button></Html>
      </>}
    </group>
  </>;
}
