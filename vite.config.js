import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  server: {
    host: true
  },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Ma Super App',
        short_name: 'App',
        description: 'Une application React + Supabase installable',
        theme_color: '#7e22ce',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/logo_noir.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/logo_noir.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
