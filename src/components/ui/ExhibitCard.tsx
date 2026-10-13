import {lazy,Suspense,useEffect,useRef,useState} from 'react';
import {usePortfolio,projectTrigger} from '../../context/PortfolioContext';
import {ALL_EXHIBITS,EXHIBITS_MAP} from '../../data/exhibits';
import {projectPath} from '../../data/projectRoutes';
import {OverviewStoryboardSvg,TransformStoryboardSvg} from '../diagrams/MediaStoryboardDiagrams';
import {ProjectArtwork} from './ProjectArtwork';
import styles from './ExhibitCard.module.css';
const InteractiveStudy=lazy(()=>import('../studies/InteractiveStudy'));

export function ExhibitCard(){
 const {state,dispatch}=usePortfolio();
 const card=useRef<HTMLDivElement>(null),close=useRef<HTMLButtonElement>(null),origin=useRef<HTMLElement|null>(null);
 const [demoOpen,setDemoOpen]=useState(false),[shareStatus,setShareStatus]=useState('');
 const exhibit=state.activeExhibitId?EXHIBITS_MAP[state.activeExhibitId]:null;
 const handleClose=()=>{dispatch({type:'SET_ACTIVE_EXHIBIT',payload:null});requestAnimationFrame(()=>{const target=projectTrigger()||origin.current;(target?.isConnected&&target!==document.body?target:document.getElementById('direct-portfolio-btn'))?.focus();});};
 useEffect(()=>{
  if(!exhibit)return;
  setDemoOpen(false);setShareStatus('');
  if(!card.current?.contains(document.activeElement))origin.current=document.activeElement as HTMLElement;
  const previous=document.body.style.overflow;document.body.style.overflow='hidden';
  card.current?.scrollTo(0,0);close.current?.focus({preventScroll:true});
  return()=>{document.body.style.overflow=previous;};
 },[exhibit]);
 useEffect(()=>{
  if(!exhibit)return;
  const key=(e:KeyboardEvent)=>{
   if(state.isBreakdownOpen)return;
   if(e.key==='Escape'){e.preventDefault();e.stopImmediatePropagation();handleClose();}
   if(e.key==='Tab'&&card.current){
    const items=Array.from(card.current.querySelectorAll<HTMLElement>('button:not([disabled]),a[href],input:not([disabled]),summary,[tabindex]:not([tabindex="-1"])')).filter(el=>el.getClientRects().length>0);
    const first=items[0],last=items[items.length-1];
    if(e.shiftKey&&(document.activeElement===first||!card.current.contains(document.activeElement))){e.preventDefault();last?.focus();}
    else if(!e.shiftKey&&(document.activeElement===last||!card.current.contains(document.activeElement))){e.preventDefault();first?.focus();}
   }
  };
  window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key);
 },[exhibit,state.isBreakdownOpen,dispatch]);
 if(!exhibit)return null;
 const required=exhibit.evidenceStatus==='EVIDENCE_REQUIRED';
 const kind=['sheeshh-prop-hunt','EX-PH-TRANSFORM'].includes(exhibit.id)?'transform':exhibit.id==='EX-PH-COMBAT'?'combat':null;
 const url=new URL(projectPath(exhibit.id),window.location.origin).href;
 const copy=async()=>{try{await navigator.clipboard.writeText(url);setShareStatus('Project link copied.');}catch{setShareStatus('Copy the project address below.');}};
 const index=ALL_EXHIBITS.findIndex(item=>item.id===exhibit.id),next=ALL_EXHIBITS[(index+1)%ALL_EXHIBITS.length];
 return <aside className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="study-title">
  <div ref={card} className={styles.page} inert={state.isBreakdownOpen}>
   <header className={styles.toolbar}><button onClick={handleClose}>← Back to portfolio</button><span>THE WORK / {exhibit.shortId}</span><button ref={close} onClick={handleClose} aria-label="Close Exhibit Card">✕</button></header>
   <div className={styles.hero}>
    <figure><ProjectArtwork id={exhibit.id}/><figcaption>Concept illustration · project recordings coming later</figcaption></figure>
    <div className={styles.intro}><p className={styles.eyebrow}>{exhibit.category}</p><h1 id="study-title">{exhibit.title}</h1><p className={styles.subtitle}>{exhibit.subtitle}</p><div className={styles.badges}><span>{exhibit.engine}</span><span>{exhibit.badgeLabel}</span></div><button className={styles.share} onClick={copy}>Copy project link ↗</button><p className={styles.shareStatus} role="status">{shareStatus}</p>{shareStatus==='Copy the project address below.'&&<input aria-label="Project address" readOnly value={url} onFocus={e=>e.target.select()}/>}</div>
   </div>
   <div className={styles.content}>
    <article className={styles.main}>
     <section><p className={styles.eyebrow}>01 / THE STUDY</p><h2>{required?'What this study will show':'A closer look at the system.'}</h2><p className={styles.summary}>{exhibit.summary}</p><div className={styles.tools}>{exhibit.tools.map(tool=><span key={tool}>{tool}</span>)}</div></section>
     {kind&&<section><button className={styles.demo} aria-expanded={demoOpen} aria-controls="browser-study" onClick={()=>setDemoOpen(!demoOpen)}>{demoOpen?'Close interactive study':'Try the interactive study'} <span>{demoOpen?'−':'↗'}</span></button>{demoOpen&&<div id="browser-study"><Suspense fallback={<p className={styles.loading} role="status">Opening browser study…</p>}><InteractiveStudy key={exhibit.id} kind={kind}/></Suspense></div>}</section>}
     <section><p className={styles.eyebrow}>02 / HOW IT IS STRUCTURED</p><h2>{required?'Submission standards':'Technical notes, at your pace.'}</h2><p>Expand a section for the implementation detail and its limits.</p><div className={styles.steps}>{exhibit.steps.map((step,i)=><details key={exhibit.id+'-'+i} open={i===0?true:undefined}><summary><span>{String(i+1).padStart(2,'0')}</span>{step.title}</summary><div><p>{step.desc}</p>{step.codeSnippet&&<pre><code>{step.codeSnippet}</code></pre>}</div></details>)}</div><button className={styles.secondary} id={['sheeshh-prop-hunt','EX-PH-TRANSFORM'].includes(exhibit.id)?'inspect-transform-btn':'inspect-architecture-btn'} onClick={()=>dispatch({type:'SET_BREAKDOWN_OPEN',payload:true})}>{required?'Open full submission checklist':'Open architecture diagrams & evidence'} →</button></section>
     <section><p className={styles.eyebrow}>03 / SEE IT IN ACTION</p><h2>Footage is being prepared.</h2><p>These slots describe the recording each study needs. The artwork above is conceptual.</p><div className={styles.media}>{exhibit.mediaPlaceholders.map(media=><article key={media.id}><span className={styles.pending}>{required?'Source asset needed':'Recording pending'}</span><h3>{media.label}</h3><p>{media.description}</p>{['PH-OVERVIEW','PH-TRANSFORM'].includes(media.id)&&<details><summary>View capture storyboard</summary>{media.id==='PH-OVERVIEW'?<OverviewStoryboardSvg/>:<TransformStoryboardSvg/>}</details>}</article>)}</div></section>
    </article>
    <aside className={styles.notes} aria-label="Study evidence and credits"><section><p className={styles.eyebrow}>WHAT IS ESTABLISHED</p><h3>{exhibit.badgeLabel}</h3><p>{exhibit.boundaryDescription}</p>{exhibit.boundaryFormula&&<code>{exhibit.boundaryFormula}</code>}</section><section><p className={styles.eyebrow}>CONTRIBUTION & CREDITS</p><p>{exhibit.authorshipStatus}</p><details><summary>Source and provenance</summary><p>{exhibit.provenanceNote}</p></details></section></aside>
   </div>
   <footer className={styles.footer}><button onClick={handleClose}>← All portfolio work</button><button onClick={()=>dispatch({type:'SET_ACTIVE_EXHIBIT',payload:next.id})}>Next study: {next.shortTitle} →</button></footer>
  </div>
 </aside>;
}
export default ExhibitCard;
