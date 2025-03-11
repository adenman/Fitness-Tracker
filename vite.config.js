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
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
  base: './'
})

