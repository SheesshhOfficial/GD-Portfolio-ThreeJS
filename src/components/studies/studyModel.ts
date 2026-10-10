export type Disguise = 'pawn' | 'crate' | 'cone' | 'barrel';
export type ShotExample = 'hit' | 'miss' | 'eliminate';
export interface ShotState {
  sequence: number;
  stage: number;
  example: ShotExample;
  playing: boolean;
}
export type ShotAction =
  | {type:'fire'; example:ShotExample; animate:boolean}
  | {type:'tick'; sequence:number}
  | {type:'inspect'; stage:number}
  | {type:'toggle'}
  | {type:'reset';example?:ShotExample};
export const initialShot: ShotState = {sequence:0,stage:-1,example:'hit',playing:false};
export const shotStages = [
  {label:'Input', title:'A shot starts with an input.', detail:'StartFireOnServer starts the inspected firing timer; StopFireOnServer clears it.', node:'StartFireOnServer → FireRifle'},
  {label:'Camera', title:'The client supplies the viewpoint.', detail:'The server requests camera data from the owning client. The client sends its location and rotation back.', node:'get clientCamera Action → LineTraceOnserver'},
  {label:'Trace', title:'A line checks the current world.', detail:'The inspected server function traces along the supplied camera direction. Hit and miss here are preset examples.', node:'F_RifleLinerace → LineTraceByChannel'},
  {label:'Feedback', title:'Players receive firing feedback.', detail:'The inspected multicast events drive recoil and impact effects. This browser study uses a quiet trace indicator.', node:'MulticastFireEvnt → MulticasttHitEffict'},
  {label:'Damage', title:'A tagged target can receive damage.', detail:'The inspected prop character reduces health. At zero, it hides the mesh and possesses a spectator pawn. Values here are illustrative.', node:'ApplyDamage → BP_propChar → BP_SpectatorPawn'},
] as const;
export function shotReducer(state:ShotState,action:ShotAction):ShotState {
  switch(action.type){
    case 'fire': return {sequence:state.sequence+1,stage:action.animate?0:4,example:action.example,playing:action.animate};
    case 'tick':
      if(action.sequence!==state.sequence || !state.playing)return state;
      return {...state,stage:Math.min(4,state.stage+1),playing:state.stage<3};
    case 'inspect': return {...state,stage:Math.max(0,Math.min(4,action.stage)),playing:false};
    case 'toggle': return state.stage<0 || state.stage===4 ? state : {...state,playing:!state.playing};
    case 'reset': return {...initialShot,example:action.example??state.example,sequence:state.sequence+1};
  }
}
export function shotResult(state:ShotState){
  const resolved=state.stage===4;
  const health=resolved ? state.example==='eliminate'?0:state.example==='hit'?60:100 : 100;
  return {health,eliminated:health===0,trace:state.stage>=2,miss:state.example==='miss'};
}
