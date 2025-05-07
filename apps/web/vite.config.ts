import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
// import relay from 'vite-plugin-relay';

export default defineConfig({
  plugins: [
    TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
    tailwindcss(),
    react({
      babel: {
        plugins: [
          [
            'relay',
            {
              src: path.join(__dirname, 'src'),
              exclude: ['**/node_modules/**', '**/__generated__/**'],
              include: ['**/*.ts', '**/*.tsx'],
              artifactDirectory: path.join(__dirname, 'src/__generated__'),
              schema: path.join(__dirname, 'schema.graphql'),
            },
          ],
        ],
      },
    }),
    // relay,
  ],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
});
