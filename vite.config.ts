import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Souvik Biswas — Portfolio',
        short_name: 'Souvik',
        description: 'Souvik Biswas — Full-Stack Developer Portfolio',
        theme_color: '#000000',
        background_color: '#000000',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/logo.svg',
            sizes: 'any',
            type: 'image/svg+xml',
          },
        ],
      },
    }),
  ],
  server: {
    watch: {
      usePolling: true,
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
