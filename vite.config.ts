import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //CORS 에러 때문에 넣었는데 안 먹히는 듯 _SY
  server: {
    host: "0.0.0.0", // 모든 네트워크 인터페이스에서 접속 허용
    port: 5173,      // 기본 포트 (변경 가능)
    proxy: {
      '/api': {
        target: 'http://localhost:8081', //백엔드 서버 주소
        changeOrigin: true,
        secure:false,
      }
    }
  }
})
