import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/dashtic-ts/preview/', 
  base: '/', 
  plugins: [react()],
  define: {
    'process.env': {}
  },
  build: {
    chunkSizeWarningLimit: 5000,
    minify: true
  },
  server: {
    host: true,
  }
  
})
