import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import {defineConfig, Plugin} from 'vite';

function staticHtmlPlugin(): Plugin {
  return {
    name: 'serve-static-apps-html',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const rawUrl = req.url?.split('?')[0];
        if (rawUrl && (rawUrl.startsWith('/apps/') || rawUrl === '/apps/studio-main.html') && rawUrl.endsWith('.html')) {
          const filePath = path.join(process.cwd(), 'public', rawUrl);
          if (fs.existsSync(filePath)) {
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            fs.createReadStream(filePath).pipe(res);
            return;
          }
        }
        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    // base './' ทำให้ไฟล์ที่ build แล้วเปิดได้จากทุกโฟลเดอร์/พอร์ต ไม่ขาวเพราะหา /assets ไม่เจอ
    base: './',
    plugins: [react(), tailwindcss(), staticHtmlPlugin()],
    build: {
      target: 'es2020',
      chunkSizeWarningLimit: 1500,
    },
    preview: {
      host: true,
      port: 3200,
    },
    resolve: {
      alias: {
        '@': path.resolve('.'),
      },
    },
    server: {
      host: true,
      port: 3200,
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

