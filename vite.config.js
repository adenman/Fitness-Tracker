import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react': './node_modules/react',
      'react-dom': './node_modules/react-dom'
    }
  }
})

