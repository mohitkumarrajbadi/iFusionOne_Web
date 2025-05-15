import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifestFilename: 'manifest.webmanifest',
      includeAssets: ['favicon.svg', 'robots.txt'],
      manifest: {
        name: 'iFusionOne',
        short_name: 'iFusionOne',
        description: 'iFusionOne — a platform for all dev needs!',
        display: 'standalone',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: '/fuso-superhero-logo-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/fuso-superhero-logo-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        // ✅ Fix: Increase max file size for precaching to 10 MB
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10MB

        // Optional: runtime caching example for APIs
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/your-api-domain\.com\/.*$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24, // 1 day
              },
              cacheableResponse: {
                statuses: [0, 200],
              }
            }
          }
        ]
      }
    })
  ]
})
