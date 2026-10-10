import assert from 'node:assert/strict';
import {initialShot,shotReducer,shotResult} from '../src/components/studies/studyModel.ts';

for(const [example,health] of [['hit',60],['miss',100],['eliminate',0]]){
  let state=shotReducer(initialShot,{type:'fire',example,animate:true});
  for(let i=0;i<4;i++)state=shotReducer(state,{type:'tick',sequence:state.sequence});
  assert.equal(state.stage,4);
  assert.equal(state.playing,false);
  assert.equal(shotResult(state).health,health);
  assert.equal(shotResult(state).eliminated,example==='eliminate');
  assert.deepEqual(shotResult(state),shotResult(shotReducer(initialShot,{type:'fire',example,animate:false})));
}
const first=shotReducer(initialShot,{type:'fire',example:'hit',animate:true});
const replay=shotReducer(first,{type:'fire',example:'miss',animate:true});
assert.strictEqual(shotReducer(replay,{type:'tick',sequence:first.sequence}),replay,'stale callbacks must not advance a new shot');
const paused=shotReducer(replay,{type:'toggle'});
assert.strictEqual(shotReducer(paused,{type:'tick',sequence:paused.sequence}),paused,'pause must stop progress');
const resumed=shotReducer(paused,{type:'toggle'});
assert.equal(shotReducer(resumed,{type:'tick',sequence:resumed.sequence}).stage,1);
const inspected=shotReducer(resumed,{type:'inspect',stage:2});
assert.equal(inspected.playing,false);
assert.equal(shotResult(inspected).health,100,'damage must wait for resolution');
const reset=shotReducer(resumed,{type:'reset'});
assert.strictEqual(shotReducer(reset,{type:'tick',sequence:resumed.sequence}),reset,'reset must invalidate old callbacks');
assert.deepEqual(shotResult(reset),{health:100,eliminated:false,trace:false,miss:true});
for(const [example,health] of [['hit',60],['miss',100],['eliminate',0]]){
  const chosen=shotReducer(initialShot,{type:'reset',example});
  assert.equal(shotResult(shotReducer(chosen,{type:'inspect',stage:4})).health,health,'inspection must use the selected example');
}
assert.equal(shotReducer(reset,{type:'inspect',stage:99}).stage,4);
assert.equal(shotReducer(reset,{type:'inspect',stage:-99}).stage,0);
console.log('Study checks passed: hit/miss/elimination, reduced-motion equivalence, stale callbacks, pause/resume, inspection and reset.');
