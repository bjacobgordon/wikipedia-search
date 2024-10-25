import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

declare global {
  interface ImportMeta {
    readonly env: {
      readonly VITE_API_URL: string
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: './distribution',
  },
  server: {
    host: true,
    port: 3000,
    strictPort: true,
    proxy: {
      '/api': {
        target: import.meta.env.VITE_API_URL,
        changeOrigin: true,
        secure: false,
      },
    }
  },
})
