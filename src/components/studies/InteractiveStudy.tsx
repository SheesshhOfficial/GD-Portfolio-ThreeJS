import {lazy,Suspense,useCallback,useEffect,useReducer,useState} from 'react';
import {usePortfolio} from '../../context/PortfolioContext';
import {ErrorBoundary} from '../common/ErrorBoundary';
import {initialShot,shotReducer,shotResult,shotStages} from './studyModel';
import type {Disguise,ShotExample} from './studyModel';
import './InteractiveStudy.css';
const StudyCanvas=lazy(()=>import('./StudyCanvas'));
const candidates=[{id:'crate',label:'Crate',note:'A broad, square silhouette.'},{id:'cone',label:'Cone',note:'A narrow silhouette on a flat base.'},{id:'barrel',label:'Barrel',note:'A tall, cylindrical silhouette.'}] as const;

function StillPreview({kind,disguise,trace,miss,eliminated}:{kind:'transform'|'combat';disguise:Disguise;trace:boolean;miss:boolean;eliminated:boolean}){
  return <svg className="study-still" viewBox="0 0 420 220" role="img" aria-label={kind==='transform'?`${disguise} demonstration on a reference platform`:`Simulated target ${eliminated?'eliminated':trace?miss?'missed':'hit':'ready'}`}>
    <path d="M40 170 205 110 385 170 220 210Z" fill="#d1d7c2"/>
    <path d="M40 170v8l180 40 165-40v-8l-165 40Z" fill="#b8c3a8"/>
    <path d="M85 177H340" stroke="#8c9d75" strokeDasharray="4 4"/>
    {kind==='transform' ? <>
      {disguise==='pawn'&&<g fill="#6b805c"><rect x="189" y="73" width="42" height="105" rx="21"/><circle cx="210" cy="51" r="18" fill="#a4b290"/></g>}
      {disguise==='crate'&&<g><path d="m153 102 63-22 62 22v60l-62 20-63-20Z" fill="#b69b70"/><path d="m216 122 62-20v60l-62 20Z" fill="#967b50"/><path d="m153 102 63 20 62-20-62-22Z" fill="#ccb68e"/><path d="M165 108v57m38-45v58m-50-63 63 20m-63 11 63 20" fill="none" stroke="#765f3c" strokeWidth="7"/></g>}
      {disguise==='cone'&&<g><path d="m161 164 53-17 52 17-52 18Z" fill="#9c763e"/><path d="m178 164 36-100 36 100q-35 16-72 0" fill="#bd8d50"/><path d="m194 119 20 5 20-5 6 17-26 7-26-7Z" fill="#f4efd9"/></g>}
      {disguise==='barrel'&&<g><path d="M172 91v74q42 28 84 0V91" fill="#73865c"/><ellipse cx="214" cy="91" rx="42" ry="14" fill="#a8b391"/><path d="M172 109q42 26 84 0m-84 34q42 26 84 0" fill="none" stroke="#344634" strokeWidth="6"/></g>}
    </> : <>
      <path d="M211 178v-36" stroke="#4c5c41" strokeWidth="10"/>
      {!eliminated?<><circle cx="211" cy="105" r="41" fill="#6e805b"/><circle cx="211" cy="105" r="24" fill="#e5e5cd"/><circle cx="211" cy="105" r="9" fill="#6e805b"/></>:<circle cx="211" cy="105" r="31" fill="none" stroke="#b49255" strokeWidth="7"/>}
      {trace&&<path d={`M350 120 211 ${miss?45:105}`} stroke={miss?'#a38f64':'#617c42'} strokeWidth="3" strokeDasharray="7 4"/>}
    </>}
  </svg>;
}

export default function InteractiveStudy({kind}:{kind:'transform'|'combat'}){
  const {state}=usePortfolio();
  const still=state.isReducedMotion||state.motionPaused;
  const [disguise,setDisguise]=useState<Disguise>('pawn');
  const [shot,send]=useReducer(shotReducer,initialShot);
  const [example,setExample]=useState<ShotExample>('hit');
  const [underHood,setUnderHood]=useState(false);
  const [three,setThree]=useState(false);
  const [failed,setFailed]=useState(false);
  const onFailure=useCallback(()=>setFailed(true),[]);
  const result=shotResult(shot);
  useEffect(()=>{
    if(!shot.playing)return;
    if(still){send({type:'inspect',stage:4});return;}
    const timer=setTimeout(()=>send({type:'tick',sequence:shot.sequence}),850);
    return()=>clearTimeout(timer);
  },[shot.playing,shot.stage,shot.sequence,still]);
  // Freeze playback while the technical drawer is on top of this study.
  useEffect(()=>{if(state.isBreakdownOpen&&shot.playing)send({type:'inspect',stage:shot.stage});},[state.isBreakdownOpen,shot.playing,shot.stage]);
  const preview=<StillPreview kind={kind} disguise={disguise} {...result}/>;
  const selected=candidates.find(item=>item.id===disguise);
  return <section className="interactive-study" aria-label={kind==='transform'?'Transformation browser study':'Combat browser study'}>
    <div className="study-kicker"><span>INTERACTIVE STUDY</span><span>Browser simulation</span></div>
    <h3>{kind==='transform'?'Choose your disguise.':'Follow a shot, step by step.'}</h3>
    <p className="study-intro">{kind==='transform'?'Try three silhouettes and see how a model rests on its reference plane.':'Explore a hit, a miss, or a health-zero transition at your own pace.'}</p>
    <div className="study-preview">
      {three&&!failed&&state.webglSupported?<ErrorBoundary onError={onFailure} fallback={preview}><Suspense fallback={preview}><StudyCanvas kind={kind} disguise={disguise} {...result} still={still} onFailure={onFailure}/></Suspense></ErrorBoundary>:preview}
      <span className="study-preview-label">{kind==='transform'?'GROUND REFERENCE / SIMPLIFIED MODELS':'ILLUSTRATIVE TARGET RANGE'}</span>
      {state.webglSupported&&!failed&&<button className="study-view-toggle" onClick={()=>setThree(!three)}>{three?'Use still preview':'View in 3D'}</button>}
    </div>
    {failed&&<p className="study-note">3D preview unavailable. All controls still work with the illustrated view.</p>}
    {kind==='transform'?<>
      <div className="study-choices" aria-label="Choose a disguise">{candidates.map(item=><button key={item.id} aria-pressed={disguise===item.id} onClick={()=>setDisguise(item.id)}><span aria-hidden="true">{item.id==='crate'?'◇':item.id==='cone'?'△':'▱'}</span>{item.label}</button>)}</div>
      <p className="study-result" role="status">{disguise==='pawn'?'Pawn ready. Choose a prop to swap its display model.':`${selected?.label} selected. ${selected?.note} Its base is aligned to the reference plane.`}</p>
      <div className="study-actions"><button onClick={()=>setDisguise('pawn')}>Reset disguise</button><button aria-expanded={underHood} onClick={()=>setUnderHood(!underHood)}>Under the hood {underHood?'−':'+'}</button></div>
      {underHood&&<div className="study-explanation"><strong>Input → target → checks → mesh swap → offset</strong><p>The inspected Unreal graphs use IA_ChangeProp, ChangePropOnServer and UpdateMeshMulticast. They check remaining changes and the allowed-mesh array, then apply fixed offsets for selected meshes.</p><p>These procedural models use local display state and hand-set geometry. This demo has no networking, capsule resizing, or collision validation.</p></div>}
    </>:<>
      <div className="study-choices" aria-label="Shot example">{(['hit','miss','eliminate'] as const).map(item=><button key={item} aria-pressed={example===item} onClick={()=>{setExample(item);send({type:'reset',example:item});}}>{item==='eliminate'?'Health zero':item==='hit'?'Hit':'Miss'}</button>)}</div>
      <div className="study-actions"><button className="study-fire" onClick={()=>send({type:'fire',example,animate:!still})}>{shot.stage<0?'Fire a simulated shot':'Replay simulated shot'}</button><button disabled={shot.stage<0||shot.stage===4} onClick={()=>send({type:'toggle'})}>{shot.playing?'Pause':'Resume'}</button><button onClick={()=>send({type:'reset'})}>Reset</button></div>
      <ol className="study-flow" aria-label="Inspect a shot stage">{shotStages.map((item,index)=><li key={item.label}><button aria-current={shot.stage===index?'step':undefined} aria-label={`Inspect stage ${index+1}: ${item.label}`} onClick={()=>send({type:'inspect',stage:index})}><span>{String(index+1).padStart(2,'0')}</span>{item.label}</button></li>)}</ol>
      <div className="study-health"><span>Simulated target health</span><meter min="0" max="100" value={result.health}>{result.health}/100</meter><strong>{result.health}/100</strong></div>
      <div className="study-result" role="status">{shot.stage<0?'Choose an example, then fire or inspect any stage.':`${shotStages[shot.stage].label}. ${shot.stage===4?result.eliminated?'Health zero: spectator transition.':shot.example==='miss'?'Miss: no damage applied.':'Hit: 40 illustrative damage applied.':shotStages[shot.stage].title}`}</div>
      {shot.stage>=0&&<div className="study-explanation"><strong>{shotStages[shot.stage].title}</strong><p>{shotStages[shot.stage].detail}</p><code>{shotStages[shot.stage].node}</code></div>}
      <p className="study-note">Each replay starts with 100 simulated health. Stage timing is illustrative, not measured network latency. Client-supplied camera data is present in the inspected graphs; server rewind, lag compensation and comprehensive hit validation remain unverified.</p>
    </>}
    <p className="study-boundary">Simplified browser demonstration — not Unreal gameplay footage. Real recordings and personal contribution details will be added later. Use “Inspect architecture” below for the inspected project logic.</p>
  </section>;
}
