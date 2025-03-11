// import { defineConfig } from 'vite'


// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   build: {
//     rollupOptions: {
//     external: ["react", "react-dom"]
//     }
//   },
//   resolve: {
//     alias: {
//       'react': './node_modules/react',
//       'react-dom': './node_modules/react-dom'
//     }
//   }
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    manifest: true,
    rollupOptions: {
      external: ['react', 'react-dom']
    }
  }
})

