import { defineConfig } from 'vite'


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

