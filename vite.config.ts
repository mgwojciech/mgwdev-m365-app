import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  build: {
    rollupOptions: {
      input:{
        main: resolve(__dirname, 'index.html'),
        redirect: resolve(__dirname, 'redirect.html')
      }
    }
  }
})
