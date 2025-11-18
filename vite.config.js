import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          vendor: ['src/main.js', 'src/data.js']
        }
      }
    }
  },
  server: {
    host: true,
    port: 3000
  },
  // Remove base: './' to let Vercel handle serving from root
})