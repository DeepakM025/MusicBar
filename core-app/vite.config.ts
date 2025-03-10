import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      remotes: {
        musicLibrary: 'http://localhost:5001/assets/remoteEntry.js',
      },
    }),
  ],
  server: {
    port: 5000, // Core App runs on port 5000
  },
});
