import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api/': 'https://vercel-backend-1-cyan.vercel.app',
      '/uploads/': 'https://vercel-backend-1-cyan.vercel.app',
    },
  },
});
    // '/api/': 'https://big-e-commerce-tamplate.vercel.app',
    //   '/uploads/': 'https://big-e-commerce-tamplate.vercel.app',
