import { defineConfig,loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import {launchMetadata} from './build/launchMetadata';

export default defineConfig(({mode})=>{
const env=loadEnv(mode,process.cwd(),'');
return {
  plugins: [react(),launchMetadata(process.env.SITE_URL||env.SITE_URL||'',(process.env.SITE_INDEXING||env.SITE_INDEXING)==='true')],
  server: {
    host: '127.0.0.1',
    port: 5173,
  },
  build: {
    target: 'es2022',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three/')) {
            return 'three-vendor';
          }
          if (id.includes('node_modules/@react-three/')) {
            return 'r3f-vendor';
          }
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/scheduler/') ||
            id.includes('preload-helper')
          ) {
            return 'react-vendor';
          }
        },
      },
    },
  },
};});
