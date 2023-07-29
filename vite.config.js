import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
      '@':   "/resources/js",
      '@api':   "/resources/api",
      '@assets':  "/assets",
    },
  },
  // 跨域处理
  server:{
    proxy:{
      "/api":{
        target: "http://movie.com/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      }
    }
  }
})
