import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt'],
      workbox:{
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // e.g., 5MB
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'document',
            handler: 'CacheFirst',
            options: {
              cacheName: 'documents',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
              }
            }
          }
        ]
      },
      manifest: {
        name: 'iFusionOne',
        short_name: 'iFusionOne',
        description: 'iFusionOne a platform for all dev needs!',
        display: 'standalone',
        start_url: '/',
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
      }
    })
  ]
})
