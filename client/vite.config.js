import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/WEB_PORTFOLIO/',
  plugins: [react()],
  server: {
    port: 3000,
  },
})
