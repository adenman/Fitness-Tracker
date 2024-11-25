import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
    external: ["react", "react-dom"]
    }
  },
  define: {
    'process.env': {
      NEXT_PUBLIC_JWT_SECRET: JSON.stringify(process.env.NEXT_PUBLIC_JWT_SECRET),
      JWT_S: JSON.stringify(process.env.JWT_S)
    }
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: true,
    proxy: {
      '/graphql': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  css: {
    postcss: './postcss.config.js',
  }
})