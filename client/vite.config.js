import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      external: ["@apollo/client",
    "@emotion/react",
    "@emotion/styled",
    "@fullcalendar/core",
    "@fullcalendar/daygrid",
    "@fullcalendar/interaction",
    "@fullcalendar/react",
    "@fullcalendar/timegrid",
    "@material-tailwind/react",
    "@mui/icons-material",
    "@mui/material",
    "@radix-ui/react-icons",
    "@tailwindcss/forms",
    "@apollo/all",
    "@apollo/apollo",
    "@apollo/apollo-server-express",
    "@npm/bcrypt",
    "@npm/bootstrap",
    "@npm/bootstrap-icons",
    "@npm/class-variance-authority",
    "@npm/clsx",
    "@npm/dayjs",
    "@npm/dotenv",
    "@npm/flowbite",
    "@npm/flowbite-react",
    "@npm/graphql",
    "@npm/jsonwebtoken",
    "@npm/lucide-react",
    "@npm/mongodb",
    "@npm/mongoose",
    "@npm/next",
    "@npm/react",
    "@npm/react-big-calendar",
    "@npm/react-bootstrap",
    "@npm/react-dom",
    "@npm/react-drag-drop-files",
    "@npm/read-more-react",
    "@npm/tailwind-merge",
    "@npm/tailwindcss-animate"]
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
  },
})