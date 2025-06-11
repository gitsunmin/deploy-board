import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import { copyFileSync } from 'node:fs';
import { ENV } from './../../packages/env'
import { match } from 'ts-pattern';


export default defineConfig(({ mode }) => {
  const url = new URL(ENV.EXTERNAL_SERVER_URL);

  const server = match(mode)
    .with('production', () => ({
      port: ENV.CLIENT_PORT,
      allowedHosts: [url.origin || 'localhost'],
    }))
    .otherwise(() => ({
      port: ENV.CLIENT_PORT,
      allowedHosts: ['localhost'],
    }));

  return {
    server,
    plugins: [
      TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
      tailwindcss(),
      react(),
      {
        name: 'generate-404-html', // 플러그인 이름
        apply: 'build', // build 단계에서 실행
        closeBundle() {
          try {
            copyFileSync('dist/index.html', 'dist/404.html');
            console.log('✅ 404.html created successfully');
          } catch (error) {
            console.error('❌ Failed to create 404.html:', error);
          }
        },
      },
    ],
    base: '/',
    resolve: {
      alias: [
        { find: '@', replacement: path.resolve(__dirname, 'src') },
        { find: '@repo', replacement: path.resolve(__dirname, '../../packages') }
      ],
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
    },
    define: {
      'process.env': process.env,
    },
  }
});
