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
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'), // Changed from template.html to index.html
      },
    }
  },
  server: {
    headers: {
      'Content-Type': 'application/javascript',
    },
  },
  base: '/',  // Changed from './' to '/'
})

