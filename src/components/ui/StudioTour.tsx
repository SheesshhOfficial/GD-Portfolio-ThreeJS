import {useEffect,useRef} from 'react';
import {usePortfolio} from '../../context/PortfolioContext';
import './StudioTour.css';
const chapters=[
  {label:'Explore gameplay',title:'The logic behind the play.',text:'Start with interaction, transformation and combat. Open a study to try its browser demonstration or inspect the Unreal Blueprint flow.',id:'EX-PH-COMBAT',action:'Open the combat study',pillar:1},
  {label:'Explore technical art',title:'Where systems meet visual craft.',text:'Explore rigging and physics asset studies. Asset presence is inspected; animation quality and personal contributions still await source captures.',id:'EX-TA-IKRETARGET',action:'Open the retargeting study',pillar:2},
  {label:'View all work',title:'Find the detail that matters to you.',text:'Browse the project collection, filter by discipline, and share a direct study link. Procedural systems, multiplayer and VR workspaces join the Prop Hunt and technical art studies.',id:null,action:'View all work',pillar:0},
];
export default function StudioTour(){
  const {state,dispatch}=usePortfolio();
  const panel=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const original=document.activeElement as HTMLElement|null;
    panel.current?.querySelector<HTMLButtonElement>('button')?.focus();
    const close=(e:KeyboardEvent)=>{if(e.key==='Escape'){e.preventDefault();e.stopImmediatePropagation();dispatch({type:'SET_TOUR_STEP',payload:null});}};
    window.addEventListener('keydown',close);
    return()=>{window.removeEventListener('keydown',close);requestAnimationFrame(()=>{if(document.activeElement===document.body&&original?.isConnected)original.focus();});};
  },[dispatch]);
  if(state.tourStep===null)return null;
  const step=state.tourStep,chapter=chapters[step];
  const gallery=()=>{dispatch({type:'SET_GALLERY_FILTER',payload:chapter.pillar});dispatch({type:'SET_VIEW_MODE',payload:'2d'});};
  return <section className="studio-tour" ref={panel} role="region" aria-label="Guided studio tour">
    <header><span>THE STUDIO TOUR / {step+1} OF 3</span><button aria-label="Exit studio tour" onClick={()=>dispatch({type:'SET_TOUR_STEP',payload:null})}>×</button></header>
    <nav aria-label="Tour chapters">{chapters.map((item,index)=><button key={item.label} aria-current={index===step?'step':undefined} onClick={()=>dispatch({type:'SET_TOUR_STEP',payload:index})}>{item.label}</button>)}</nav>
    <div className="tour-story" aria-live="polite"><p className="tour-location">{step===0?'STUDIO LOCATION / GAMEPLAY CONSOLE':step===1?'STUDIO LOCATION / TECHNICAL ART WALL':'STUDIO LOCATION / THE WORKSHOP'}</p><h2>{chapter.title}</h2><p>{chapter.text}</p></div>
    {!state.webglSupported&&<p className="tour-fallback">You’re using the lightweight tour. Every study is available below.</p>}
    <div className="tour-actions"><button className="tour-open" onClick={()=>chapter.id?dispatch({type:'SET_ACTIVE_EXHIBIT',payload:chapter.id}):gallery()}>{chapter.action} ↗</button>{chapter.id&&<button onClick={gallery}>Browse this discipline</button>}</div>
    <footer><button disabled={step===0} onClick={()=>dispatch({type:'SET_TOUR_STEP',payload:step-1})}>← Previous</button><span>No autoplay. Explore at your pace.</span><button disabled={step===2} onClick={()=>dispatch({type:'SET_TOUR_STEP',payload:step+1})}>Next →</button></footer>
  </section>;
}
