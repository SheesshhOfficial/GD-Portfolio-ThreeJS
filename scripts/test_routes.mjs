import assert from 'node:assert/strict';
import {projectRoutes,projectForId,projectForPath,projectPath} from '../src/data/projectRoutes.ts';
assert.equal(new Set(projectRoutes.map(project=>project.slug)).size,10);
for(const project of projectRoutes){
  assert.equal(projectForPath(projectPath(project.id))?.id,project.id);
  assert.equal(projectForPath(`/projects/${project.slug}`)?.id,project.id);
}
assert.equal(projectForId('sheeshh-prop-hunt')?.id,'EX-PH-TRANSFORM');
assert.equal(projectForId('EX-PH-ROUND')?.id,'EX-PH-LIFECYCLE');
assert.equal(projectForPath('/projects/not-a-project/'),undefined);
assert.equal(projectForPath('/projects/prop-disguise/extra'),undefined);
assert.equal(projectPath(null),'/');
console.log('Route checks passed: all ten round trips, aliases, exact matching and home.');
