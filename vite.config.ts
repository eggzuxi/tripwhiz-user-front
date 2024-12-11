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
  // CORS 에러 때문에 넣었는데 안 먹히는 듯 _SY
  server: {
    host: "0.0.0.0", // 모든 네트워크 인터페이스에서 접속 허용
    port: 5173,      // 기본 포트 (변경 가능)
    proxy: {
      '/api': {
        target: 'http://localhost:8081', // 백엔드 서버 주소
        changeOrigin: true,
        secure: false,
      }
    }
  }
});
