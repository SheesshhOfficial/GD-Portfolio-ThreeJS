import type {Plugin,ResolvedConfig} from 'vite';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {resolve} from 'node:path';
import {projectRoutes} from '../src/data/projectRoutes';
import {EXHIBITS_MAP} from '../src/data/exhibits';

const homeTitle='Ashish Ranjan — Game Development & Technical Art Portfolio';
const homeDescription='Explore Ashish Ranjan’s game-development portfolio: Unreal gameplay systems, technical art studies, interactive browser demonstrations and project enquiries.';
const escape=(value:string)=>value.replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]!));
function metadata(title:string,description:string,path:string,origin:string,indexing:boolean){
  const url=origin?`${origin}${path}`:'';
  const image=origin?`${origin}/social-preview.png`:'/social-preview.png';
  return `<meta name="robots" content="${indexing?'index,follow':'noindex,follow'}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Ashish Ranjan · Interactive Portfolio" />
    <meta property="og:title" content="${escape(title)}" />
    <meta property="og:description" content="${escape(description)}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:width" content="1200" /><meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Ashish Ranjan — Unreal gameplay systems and technical art, illustrated with an olive cube sculpture" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escape(title)}" />
    <meta name="twitter:description" content="${escape(description)}" />
    <meta name="twitter:image" content="${image}" />
    ${url?`<meta property="og:url" content="${url}" /><link rel="canonical" href="${url}" />`:''}
    <script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@type':'WebPage',name:title,description,...(url?{url}:{}),about:{'@type':'Person',name:'Ashish Ranjan',jobTitle:'Game Developer',sameAs:['https://github.com/SheesshhOfficial','https://www.linkedin.com/in/sheesshh/']}}).replace(/</g,'\\u003c')}</script>`;
}
export function launchMetadata(rawOrigin:string,indexRequested:boolean):Plugin{
  let config:ResolvedConfig;
  const origin=rawOrigin.trim().replace(/\/$/,'');
  if(origin){const url=new URL(origin);if(url.protocol!=='https:'||url.pathname!=='/'||url.search||url.hash||url.username||url.password)throw new Error('SITE_URL must be a public HTTPS origin with no path, credentials, query or fragment.');}
  const indexing=!!origin&&indexRequested;
  return {
    name:'portfolio-launch-metadata',
    configResolved(value){config=value;},
    transformIndexHtml(html){return html.replace('<!-- LAUNCH_METADATA -->',metadata(homeTitle,homeDescription,'/',origin,indexing));},
    writeBundle(){
      const output=resolve(config.root,config.build.outDir);
      const home=readFileSync(resolve(output,'index.html'),'utf8');
      // Replace the generated metadata block before emitting each distinct project document.
      const homeMetadata=metadata(homeTitle,homeDescription,'/',origin,indexing);
      for(const project of projectRoutes){
        const exhibit=EXHIBITS_MAP[project.id];
        const description=`${project.title} — ${exhibit.badgeLabel.toLowerCase()} study. ${project.id.startsWith('EX-3D')?'Original source assets and contribution details are pending.':'Explore the project approach and its evidence boundaries. Gameplay or editor recordings are pending.'}`;
        const title=`${project.title} — Ashish Ranjan`;
        const page=home.replace(/<title>[^<]*<\/title>/,`<title>${escape(title)}</title>`)
          .replace(/<meta name="description" content="[^"]*"\s*\/>/,`<meta name="description" content="${escape(description)}" />`)
          .replace(homeMetadata,metadata(title,description,`/projects/${project.slug}/`,origin,indexing))
          .replace('<h1 class="shell-title">Ashish Ranjan</h1>',`<h1 class="shell-title">${escape(project.title)}</h1>`)
          .replace('<p class="shell-subtitle">Gameplay Systems Programming & Technical Art</p>',`<p class="shell-subtitle">${escape(description)}</p>`)
          .replace('<h1>Ashish Ranjan</h1>',`<h1>${escape(project.title)}</h1><p>${escape(description)}</p><p><a href="/">Back to Ashish’s portfolio</a></p>`);
        const directory=resolve(output,'projects',project.slug);mkdirSync(directory,{recursive:true});writeFileSync(resolve(directory,'index.html'),page);
      }
      writeFileSync(resolve(output,'robots.txt'),`User-agent: *\nAllow: /\n${indexing?`Sitemap: ${origin}/sitemap.xml\n`:''}`);
      if(indexing)writeFileSync(resolve(output,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${['/',...projectRoutes.map(project=>`/projects/${project.slug}/`)].map(path=>`<url><loc>${origin}${path}</loc></url>`).join('')}</urlset>`);
      writeFileSync(resolve(output,'launch-status.json'),JSON.stringify({publicOriginConfigured:!!origin,searchIndexing:indexing,projectPages:projectRoutes.length,physicalPhoneTest:'pending'},null,2));
    },
  };
}
