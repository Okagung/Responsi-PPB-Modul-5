import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(), tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg', 'pwa-192.png'],
      manifest: {
        name: 'DuitKu - Catatan Keuangan', short_name: 'DuitKu',
        description: 'Catat pemasukan dan pengeluaran, bisa dipakai offline.',
        theme_color: '#059669', background_color: '#ffffff', display: 'standalone', start_url: '/',
        icons: [
          { src: 'pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: { globPatterns: ['**/*.{js,css,html,svg,png,ico}'], navigateFallback: '/index.html' },
    }),
  ],
})
