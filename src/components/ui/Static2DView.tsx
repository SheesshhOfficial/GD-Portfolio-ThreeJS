import { usePortfolio } from '../../context/PortfolioContext';
import { ALL_EXHIBITS } from '../../data/exhibits';
import './PortfolioGallery.css';
import {ProjectArtwork} from './ProjectArtwork';

export function Static2DView() {
  const { state,dispatch } = usePortfolio();
  const filter=state.galleryFilter;
  const visible = ALL_EXHIBITS.filter(item=>filter===0 || item.pillarId===filter);
  return <main id="main-content" className="portfolio-gallery" inert={!!state.activeExhibitId}>
    <div className="gallery-intro"><p className="eyebrow">THE WORK / ASHISH RANJAN</p><h1>Ideas, built into<br /><em>playable systems.</em></h1><p>A closer look at gameplay mechanics, the engineering behind them, and technical art studies. Choose a study to explore its implementation.</p></div>
    <button className="gallery-tour" onClick={()=>dispatch({type:'SET_TOUR_STEP',payload:0})}>Take the guided studio tour ↗</button>
    <nav className="gallery-filters" aria-label="Filter portfolio work">{['All work','Gameplay systems','Technical art','3D pipeline'].map((label,index)=><button key={label} aria-pressed={filter===index} onClick={()=>dispatch({type:'SET_GALLERY_FILTER',payload:index})}>{label}<span>{ALL_EXHIBITS.filter(item=>index===0 || item.pillarId===index).length}</span></button>)}</nav>
    <div className="gallery-grid">{visible.map((item,index)=><button className={`gallery-project pillar-${item.pillarId}`} key={item.id} onClick={()=>dispatch({type:'SET_ACTIVE_EXHIBIT',payload:item.id})}>
      <div className="gallery-art"><ProjectArtwork id={item.id}/><span className="art-number">{String(index+1).padStart(2,'0')}</span><span className="art-caption">CONCEPT ILLUSTRATION</span></div>
      <div className="gallery-project-info"><p>{item.category}</p><h2>{item.shortTitle}<span aria-hidden="true">↗</span></h2><p className="gallery-description">{item.subtitle}</p><span className="gallery-evidence">{item.badgeLabel}</span></div>
    </button>)}</div>
    <p className="gallery-note">Illustrations are portfolio navigation artwork. Gameplay recordings and source-asset media are still being prepared; each study identifies the evidence currently available.</p>
  </main>;
}
