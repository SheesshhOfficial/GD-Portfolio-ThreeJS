import { useEffect, useRef, useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import './StudioPanel.css';

type Props = { mode: 'about' | 'services' | 'settings'; onClose: () => void };
export default function StudioPanel({mode,onClose}: Props) {
  const {state,dispatch} = usePortfolio();
  const panel = useRef<HTMLDivElement>(null);
  const [metrics,setMetrics] = useState({fps:'—',calls:'—',triangles:'—',mode:'Waiting for scene'});
  useEffect(()=>{
    const original=document.activeElement as HTMLElement|null;
    const overflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    panel.current?.querySelector<HTMLButtonElement>('button')?.focus();
    const handle=(e: KeyboardEvent)=>{
      if(e.key==='Escape'){e.preventDefault();onClose();}
      if(e.key==='Tab'){
        const controls=panel.current?.querySelectorAll<HTMLElement>('button:not([disabled]),a[href],select,input');
        if(!controls?.length)return;
        const first=controls[0],last=controls[controls.length-1];
        if(e.shiftKey && (document.activeElement===first || !panel.current?.contains(document.activeElement))){e.preventDefault();last.focus();}
        else if(!e.shiftKey && (document.activeElement===last || !panel.current?.contains(document.activeElement))){e.preventDefault();first.focus();}
      }
    };
    window.addEventListener('keydown',handle);
    return ()=>{window.removeEventListener('keydown',handle);document.body.style.overflow=overflow;original?.isConnected && original.focus();};
  },[onClose]);
  useEffect(()=>{
    if(mode!=='settings')return;
    const update=()=>{
      const scene=document.getElementById('studio-renderer');
      setMetrics({fps:scene?.dataset.fps || '—',calls:scene?.dataset.calls || '—',triangles:scene?.dataset.triangles || '—',mode:scene?.dataset.renderMode || 'Gallery mode'});
    };
    update();const timer=window.setInterval(update,2000);return()=>clearInterval(timer);
  },[mode]);
  return <div className="studio-panel-backdrop" onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
    <section ref={panel} role="dialog" aria-modal="true" aria-labelledby="studio-panel-title" className="studio-panel">
      <header><span className="eyebrow">{mode==='about'?'THE PERSON BEHIND THE WORK':mode==='services'?'LET’S TALK ABOUT YOUR PROJECT':'MAKE YOURSELF COMFORTABLE'}</span><button aria-label="Close panel" onClick={onClose}>×</button></header>
      {mode==='services'?<>
        <h2 id="studio-panel-title">From a brief<br />to <em>something playable.</em></h2>
        <p className="panel-lead">Have a game idea, a mechanic to explore, or a pipeline problem? Let’s discuss a focused first step.</p>
        <div className="service-list">
          <article><span>01 / PROTOTYPING</span><h3>Unreal gameplay prototypes</h3><p>Discuss a small interaction, a mechanic, or a greybox gameplay loop.</p><dl><dt>Possible scope</dt><dd>Inputs, interaction rules, and a playable test scene.</dd><dt>Possible handover</dt><dd>A scoped prototype and notes explaining setup and limitations.</dd></dl></article>
          <article><span>02 / GAMEPLAY LOGIC</span><h3>Blueprint system work</h3><p>Discuss readable logic for gameplay interactions, combat flow, or round state.</p><dl><dt>Possible scope</dt><dd>A defined system, its edge cases, and an agreed test checklist.</dd><dt>Possible handover</dt><dd>Blueprint overview, integration notes, and an explanation of tradeoffs.</dd></dl><button onClick={()=>{dispatch({type:'SET_ACTIVE_EXHIBIT',payload:'EX-PH-COMBAT'});onClose();}}>See the inspected combat study ↗</button></article>
          <article><span>03 / VISUAL WORKFLOWS</span><h3>Technical art & asset integration</h3><p>Discuss a Blender-to-Unreal workflow, character asset setup, or material integration.</p><dl><dt>Possible scope</dt><dd>A small workflow review or asset integration task.</dd><dt>Possible handover</dt><dd>Setup notes and an agreed asset validation checklist.</dd></dl><button onClick={()=>{dispatch({type:'SET_GALLERY_FILTER',payload:2});dispatch({type:'SET_VIEW_MODE',payload:'2d'});onClose();}}>Browse technical art studies ↗</button></article>
        </div>
        <p className="service-boundary">These are enquiry areas and possible deliverables, not claims of completed client engagements. Final scope, availability, authorship examples and delivery terms will be agreed after reviewing your brief.</p>
        <div className="profile-contact"><h3>Send a useful first brief.</h3><p>Include your game idea, engine version, the task you need, your deadline, and any existing assets. Budget and platform constraints help define a realistic scope.</p><a className="service-email" href={`mailto:ashish.mitblr2023@learner.manipal.edu?subject=${encodeURIComponent('Game development project enquiry')}&body=${encodeURIComponent('Hi Ashish,\n\nProject idea:\nEngine/version:\nWhat I need help with:\nTarget platform:\nExisting assets or project:\nDeadline:\nBudget range:\n\nThanks,')}`}>Email a project brief ↗</a></div>
      </>:mode==='about'?<>
        <h2 id="studio-panel-title">Hi, I’m <em>Ashish.</em></h2>
        <p className="panel-lead">A game developer interested in the meeting point between playable systems and visual craft.</p>
        <p>I work with Unreal Engine and explore gameplay programming, multiplayer systems, technical art, and Blender workflows. This portfolio brings together my project studies and the problems behind them.</p>
        <p className="profile-education">B.Tech Computer Science & Engineering · Manipal Institute of Technology, Bengaluru · Expected 2027</p>
        <div className="profile-areas"><article><span>01</span><h3>Gameplay</h3><p>Input, interaction, transformation, combat, and round flow.</p></article><article><span>02</span><h3>Technical art</h3><p>Rigging assets, animation retargeting, and character workflows.</p></article><article><span>03</span><h3>3D exploration</h3><p>Modeling, UVs, materials, and the Blender-to-Unreal pipeline.</p></article></div>
        <h3>How to read my work</h3><p>Each study distinguishes inspected implementation, available assets, and evidence still to be captured. Project credits and individual contributions will be confirmed alongside the final case studies.</p>
        <div className="profile-contact"><h3>Let’s build something playable.</h3><p>For project conversations, freelance enquiries, and game-development opportunities.</p><a className="profile-email" href="mailto:ashish.mitblr2023@learner.manipal.edu">ashish.mitblr2023@learner.manipal.edu ↗</a><div className="profile-links"><a href="https://github.com/SheesshhOfficial" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/sheesshh/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="/portfolio-media/ashish-ranjan-profile.pdf" download>Download profile PDF ↓</a></div></div>
        <button className="settings-gallery" onClick={()=>{dispatch({type:'SET_VIEW_MODE',payload:'2d'});onClose();}}>Browse project studies ↗</button>
      </>:<>
        <h2 id="studio-panel-title">Your studio,<br /><em>your settings.</em></h2>
        <p className="panel-lead">Choose visual detail and movement that feel comfortable on your device.</p>
        <label className="quality-label" htmlFor="quality-mode">Scene quality</label>
        <select id="quality-mode" value={state.quality} onChange={e=>dispatch({type:'SET_QUALITY',payload:e.target.value as 'auto'|'high'|'low'})}><option value="auto">Auto — adapt to this device</option><option value="high">High — detailed shadows and reflections</option><option value="low">Economy — fewer pixels, simpler lighting</option></select>
        <label className="motion-option"><input type="checkbox" checked={state.motionPaused} onChange={e=>dispatch({type:'SET_MOTION_PAUSED',payload:e.target.checked})} /><span>Pause ambient motion<small>Stops sculpture rotation and pointer parallax.</small></span></label>
        {state.isReducedMotion && <p className="settings-note">Your system requests reduced motion. Ambient animation and camera transitions are disabled.</p>}
        <button className="settings-gallery" onClick={()=>{dispatch({type:'SET_VIEW_MODE',payload:'2d'});onClose();}}>Use the lightweight gallery ↗</button>
        <details className="render-details"><summary>Live rendering details</summary><p>{metrics.mode}. Measurements describe this browser, not a benchmark for other devices.</p><dl><div><dt>Rendered frames / sec</dt><dd>{metrics.fps}</dd></div><div><dt>Draw calls / frame</dt><dd>{metrics.calls}</dd></div><div><dt>Triangles / frame</dt><dd>{metrics.triangles}</dd></div></dl></details>
      </>}
    </section>
  </div>;
}
