import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
 server: {
  proxy: {
    '/api': 'https://fitforge-ox0a.onrender.com',
  },
},
})