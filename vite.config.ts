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
        main: resolve(import.meta.dirname, 'index.html'),
        redirect: resolve(import.meta.dirname, 'redirect.html')
      },
      output: {
        manualChunks(id) {
          const normalizedId = id.replaceAll('\\', '/');
          if (!normalizedId.includes('/node_modules/')) {
            return;
          }

          if (/\/node_modules\/(@fluentui\/tokens|@griffel\/|@floating-ui\/|tabster\/|rtl-css-js\/)/.test(normalizedId)) {
            return 'fluent-base';
          }
          if (/\/node_modules\/@fluentui\/react-/.test(normalizedId)) {
            return 'fluent-components';
          }
          if (/\/node_modules\/(react|react-dom|react-router|react-router-dom|scheduler)\//.test(normalizedId)) {
            return 'vendor';
          }
        }
      }
    }
  }
})
