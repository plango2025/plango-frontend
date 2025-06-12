import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {fileURLToPath, URL} from 'url'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://13.238.28.77:8080", // 백엔드 주소
        changeOrigin: true,
        secure: false, //http 니깐깐
      },
    },
  },
  //위 코드는 실제로 "http://13.238.28.77:8080" 이 주소로 요청이 가게 만든다.
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
      "@components": fileURLToPath(
        new URL("./src/components", import.meta.url)
      ),
      "@pages": fileURLToPath(new URL("./src/pages", import.meta.url)),
      "@types": fileURLToPath(new URL("./src/types", import.meta.url)),
      "@recoil": fileURLToPath(new URL("./src/recoil", import.meta.url)),
      "@apis": fileURLToPath(new URL("./src/apis", import.meta.url)),
    },
  },
  //SCSS 전역 사용
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@assets/styles/main";`,
      },
    },
  },
});
