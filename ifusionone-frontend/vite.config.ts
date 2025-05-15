import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifestFilename: 'manifest.webmanifest', // ✅ important!
      includeAssets: ['favicon.svg', 'robots.txt'],
      manifest: {
        name: 'iFusionOne',
        short_name: 'iFusionOne',
        description: 'iFusionOne a platform for all dev needs!',
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
      }
    })
  ]
})
