import { usePortfolio } from '../../context/PortfolioContext';
import './StudioLanding.css';

export function StudioLanding() {
  const { state, dispatch } = usePortfolio();
  if (state.activeExhibitId || state.isDirectMenuOpen) return null;
  const open = (id: string) => {
    dispatch({ type: 'COMPLETE_ENTRANCE' });
    dispatch({ type: 'SET_ACTIVE_EXHIBIT', payload: id });
  };
  return (
    <div className="studio-editorial">
      <section className="studio-intro" aria-labelledby="studio-headline">
        <p className="eyebrow"><span /> THE INTERACTIVE PORTFOLIO</p>
        <h1 id="studio-headline">Worlds worth<br />getting <em>lost in.</em></h1>
        <p className="studio-description">I’m Ashish. I build gameplay systems and explore the art behind them — from an idea to something you can play.</p>
        <button className="studio-primary" onClick={() => open('sheeshh-prop-hunt')}>Explore my work <span aria-hidden="true">↗</span></button>
        <div className="studio-disciplines"><span>UNREAL ENGINE</span><span>GAMEPLAY SYSTEMS</span><span>TECHNICAL ART</span></div>
      </section>
      <div className="scene-caption" aria-hidden="true"><span className="caption-rule" /><span>01 / THE WORKSHOP<br /><small>A space for systems & imagination</small></span></div>
      <section className="studio-selected" aria-label="Selected portfolio work">
        <div className="selected-heading"><span>SELECTED EXPLORATIONS</span><span>Choose a project to go deeper ↓</span></div>
        <div className="selected-grid">
          <button onClick={() => open('sheeshh-prop-hunt')}><span className="project-glyph glyph-cube" aria-hidden="true">◇</span><span><small>01 / GAMEPLAY</small><strong>Hide. Transform. Survive.</strong><span>Prop Hunt · Unreal Engine</span></span><span className="project-arrow" aria-hidden="true">↗</span></button>
          <button onClick={() => open('EX-PH-COMBAT')}><span className="project-glyph glyph-target" aria-hidden="true">⊕</span><span><small>02 / SYSTEMS</small><strong>The logic behind the action.</strong><span>Combat · Damage · Multiplayer</span></span><span className="project-arrow" aria-hidden="true">↗</span></button>
          <button onClick={() => open('EX-TA-IKRETARGET')}><span className="project-glyph glyph-motion" aria-hidden="true">≋</span><span><small>03 / TECHNICAL ART</small><strong>Making movement matter.</strong><span>Rigging & retargeting · Asset study</span></span><span className="project-arrow" aria-hidden="true">↗</span></button>
        </div>
      </section>
      <footer className="studio-footer"><span>ASHISH RANJAN / GAME DEVELOPER</span><span>Built around curiosity. Made to be explored.</span></footer>
    </div>
  );
}
