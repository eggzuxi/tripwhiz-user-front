import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'TripWhiz',
        short_name: 'TripWhiz',
        description: 'TripWhiz PWA',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        prefer_related_applications: true,
        lang: 'ko',
        display: 'standalone',
        icons: [
          {
            src: '192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          }
        ]
      }
    })
  ],
  server: {
    proxy: {
      '/api/shop': {
        target: 'https://tripwhiz.shop',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api\/shop/, '/api')
      },
      '/api/store': {
        target: 'https://tripwhiz.store',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api\/store/, '/api')
      }
    }
  } // 이 중괄호가 server 객체를 닫습니다.
}); // 이 중괄호가 전체 설정을 닫습니다.
