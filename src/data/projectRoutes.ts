// Small shared catalog: routing and build metadata without loading the evidence ledger.
export const projectRoutes = [
  {id:'EX-PG-DUNGEON',slug:'procedural-dungeons',title:'Procedural Dungeon Generation'},
  {id:'EX-PG-SESSIONS',slug:'multiplayer-lobbies',title:'Multiplayer Lobby Architecture'},
  {id:'EX-VR-PROJECT',slug:'vr-workspace',title:'VR Project Workspace'},
  {id:'EX-ZT-PROJECT',slug:'zombie-tomb',title:'Zombie Tomb Project Workspace'},
  {id:'EX-CLASS-PROJECT',slug:'level-experiments',title:'Level & Interaction Workspace'},
  {id:'EX-PH-TRANSFORM',slug:'prop-disguise',title:'Prop Disguise & Pivot'},
  {id:'EX-PH-DECOY',slug:'decoy-placement',title:'Decoy Placement & Clutter'},
  {id:'EX-PH-COMBAT',slug:'hunter-combat',title:'Hunter Ballistics & Spectating'},
  {id:'EX-PH-AUDIO',slug:'spatial-audio',title:'Spatial Taunts & VOIP'},
  {id:'EX-PH-LIFECYCLE',slug:'round-lifecycle',title:'Round Lifecycle & GameMode'},
  {id:'EX-PH-CUSTOMIZATION',slug:'modular-characters',title:'Modular Armor & Emotes'},
  {id:'EX-TA-IKRETARGET',slug:'ik-retargeting',title:'IK Rig & Retargeter'},
  {id:'EX-TA-RAGDOLL',slug:'physics-ragdoll',title:'PhAT Physics & Ragdoll'},
  {id:'EX-3D-ASSET-01',slug:'hard-surface-modeling',title:'Hard-Surface Modeling'},
  {id:'EX-3D-TEXTURING',slug:'uv-pbr-texturing',title:'UV & PBR Texturing'},
] as const;
export function projectForId(id:string|null){
  if(id==='sheeshh-prop-hunt')id='EX-PH-TRANSFORM';
  if(id==='EX-PH-ROUND')id='EX-PH-LIFECYCLE';
  if(id==='EX-PH-EMOTES')id='EX-PH-CUSTOMIZATION';
  return projectRoutes.find(project=>project.id===id);
}
export function projectForPath(path:string){return projectRoutes.find(project=>path===`/projects/${project.slug}`||path===`/projects/${project.slug}/`);}
export function projectPath(id:string|null){const project=projectForId(id);return project?`/projects/${project.slug}/`:'/';}
