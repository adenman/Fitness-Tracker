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
    "bcrypt",
    "bootstrap",
    "bootstrap-icons",
    "class-variance-authority",
    "clsx",
    "dayjs",
    "dotenv",
    "flowbite",
    "flowbite-react",
    "graphql",
    "jsonwebtoken",
    "lucide-react",
    "mongodb",
    "mongoose",
    "next",
    "react",
    "react-big-calendar",
    "react-bootstrap",
    "react-dom",
    "react-drag-drop-files",
    "read-more-react",
    "tailwind-merge",
    "tailwindcss-animate"]
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