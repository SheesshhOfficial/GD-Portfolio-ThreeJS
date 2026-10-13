import {readFileSync,existsSync} from 'node:fs';
import assert from 'node:assert/strict';
import {projectRoutes} from '../src/data/projectRoutes.ts';
const output=process.argv[2]||'dist';
const status=JSON.parse(readFileSync(`${output}/launch-status.json`,'utf8'));
for(const project of projectRoutes){
  const html=readFileSync(`${output}/projects/${project.slug}/index.html`,'utf8');
  assert.ok(html.includes(`<title>${project.title.replaceAll('&','&amp;')} — Ashish Ranjan</title>`));
  assert.ok(html.includes('property="og:image"'));
  assert.ok(html.includes(`property="og:title" content="${project.title.replaceAll('&','&amp;')} — Ashish Ranjan"`));
  assert.ok(html.includes('name="twitter:card" content="summary_large_image"'));
  assert.ok(html.includes('application/ld+json'));
  assert.ok(html.includes('/assets/index-'),'nested pages must use root asset addresses');
  if(status.publicOriginConfigured)assert.ok(html.includes('rel="canonical"'));
  if(status.publicOriginConfigured)assert.ok(html.includes(`/projects/${project.slug}/" />`),'project canonical must name its own path');
  if(status.searchIndexing)assert.ok(html.includes('name="robots" content="index,follow"'));
  else assert.ok(html.includes('name="robots" content="noindex,follow"'));
}
const image=readFileSync(`${output}/social-preview.png`);
assert.equal(image.subarray(1,4).toString(),'PNG');
assert.equal(image.readUInt32BE(16),1200);assert.equal(image.readUInt32BE(20),630);
assert.ok(existsSync(`${output}/robots.txt`));
if(status.searchIndexing){
  const map=readFileSync(`${output}/sitemap.xml`,'utf8');
  assert.equal((map.match(/<loc>/g)||[]).length,projectRoutes.length+1);
  for(const project of projectRoutes)assert.ok(map.includes(`/projects/${project.slug}/</loc>`));
}
console.log(`Launch checks passed: ${projectRoutes.length} project documents, social image, metadata, root asset paths and robots. Public origin: ${status.publicOriginConfigured?'configured':'pending'}; search indexing: ${status.searchIndexing?'enabled':'disabled'}.`);
