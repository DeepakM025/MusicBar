import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'musicLibrary',
      filename: 'remoteEntry.js',
      exposes: {
        './MusicLibrary': './src/app/App.tsx', // Expose this component
      },
    }),
  ],
  build: {
    target: 'esnext',
    minify: false,
    sourcemap: true,
  },
  server: {
    port: 5001, // Micro frontend runs on port 5001
  },
});
