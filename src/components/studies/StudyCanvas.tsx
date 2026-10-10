import {useEffect, useRef} from 'react';
import {Canvas, useFrame, useThree} from '@react-three/fiber';
import {Group, Vector3} from 'three';
import type {Disguise} from './studyModel';

type Props={kind:'transform'|'combat'; disguise:Disguise; trace:boolean; miss:boolean; eliminated:boolean; still:boolean; onFailure:()=>void};
function Material({color}:{color:string}) {return <meshStandardMaterial color={color} roughness={0.58} metalness={0.06}/>;}
function DisguiseMesh({disguise}:{disguise:Disguise}){
  if(disguise==='cone')return <group><mesh position={[0,.045,0]}><boxGeometry args={[1.05,.09,1.05]}/><Material color="#a57b41"/></mesh><mesh position={[0,.61,0]}><coneGeometry args={[.43,1.15,32]}/><Material color="#bd8d50"/></mesh><mesh position={[0,.52,0]}><cylinderGeometry args={[.20,.27,.18,32]}/><Material color="#f4efd9"/></mesh></group>;
  if(disguise==='barrel')return <group><mesh position={[0,.65,0]}><cylinderGeometry args={[.43,.43,1.3,32]}/><Material color="#73865c"/></mesh>{[.17,.64,1.1].map(y=><mesh key={y} position={[0,y,0]}><cylinderGeometry args={[.455,.455,.065,32]}/><Material color="#344634"/></mesh>)}</group>;
  if(disguise==='crate')return <group><mesh position={[0,.53,0]}><boxGeometry args={[1.05,1.05,1.05]}/><Material color="#b69b70"/></mesh>{[-.38,.38].map(x=><mesh key={x} position={[x,.53,.54]}><boxGeometry args={[.11,1.05,.055]}/><Material color="#765f3c"/></mesh>)}{[.14,.9].map(y=><mesh key={y} position={[0,y,.55]}><boxGeometry args={[1.07,.1,.055]}/><Material color="#765f3c"/></mesh>)}</group>;
  return <group><mesh position={[0,.56,0]}><capsuleGeometry args={[.26,.56,6,24]}/><Material color="#6b805c"/></mesh><mesh position={[0,1.25,0]}><sphereGeometry args={[.22,24,16]}/><Material color="#c8cfba"/></mesh></group>;
}
function Scene(props:Props){
  const {invalidate,gl}=useThree();
  const object=useRef<Group>(null);
  const scale=useRef(1);
  useEffect(()=>{
    const canvas=gl.domElement;
    const lost=(event:Event)=>{event.preventDefault();props.onFailure();};
    canvas.addEventListener('webglcontextlost',lost);
    return()=>canvas.removeEventListener('webglcontextlost',lost);
  },[gl,props.onFailure]);
  useEffect(()=>{scale.current=props.still?1:.76;invalidate();},[props.disguise,props.still,invalidate]);
  useFrame((_,delta)=>{
    if(object.current){scale.current+= (1-scale.current)*Math.min(1,delta*15);object.current.scale.setScalar(scale.current);if(scale.current<.999)invalidate();}
  });
  return <>
    <color attach="background" args={['#e9ecdf']}/>
    <ambientLight intensity={1.15}/><directionalLight position={[3,5,4]} intensity={2.5}/><directionalLight position={[-3,2,-3]} intensity={.8} color="#c7d4bb"/>
    <mesh position={[0,-.16,0]}><cylinderGeometry args={[1.4,1.4,.3,64]}/><Material color="#d1d7c2"/></mesh>
    <gridHelper args={[5,10,'#a0af8c','#c9d1be']} position={[0,-.32,0]}/>
    {props.kind==='transform'?<group ref={object}><DisguiseMesh disguise={props.disguise}/></group>:<group>
      <mesh position={[0,.7,0]} rotation={[0,0,Math.PI/2]} visible={!props.eliminated}><cylinderGeometry args={[.58,.58,.16,40]}/><Material color="#6e805b"/></mesh>
      <mesh position={[.085,.7,0]} rotation={[0,0,Math.PI/2]} visible={!props.eliminated}><cylinderGeometry args={[.3,.3,.02,32]}/><Material color="#e5e5cd"/></mesh>
      <mesh position={[0,.22,0]}><boxGeometry args={[.14,.44,.14]}/><Material color="#4c5c41"/></mesh>
      {props.trace&&<Trace miss={props.miss}/>}
      {props.eliminated&&<mesh position={[0,.85,0]}><torusGeometry args={[.4,.06,12,40]}/><Material color="#b49255"/></mesh>}
    </group>}
  </>;
}
function Trace({miss}:{miss:boolean}){
  const start=new Vector3(2.2,.7,0),end=new Vector3(0,miss?1.65:.7,0),mid=start.clone().add(end).multiplyScalar(.5);
  const direction=end.clone().sub(start);
  return <mesh position={mid} quaternion={new Group().quaternion.setFromUnitVectors(new Vector3(0,1,0),direction.clone().normalize())}><cylinderGeometry args={[.012,.012,direction.length(),8]}/><meshBasicMaterial color={miss?'#a38f64':'#617c42'}/></mesh>;
}
export default function StudyCanvas(props:Props){
  return <Canvas frameloop="demand" dpr={1} camera={{position:[3,2.4,3.5],fov:36}} onCreated={({camera})=>camera.lookAt(0,.55,0)} gl={{antialias:true,alpha:false}}><Scene {...props}/></Canvas>;
}
