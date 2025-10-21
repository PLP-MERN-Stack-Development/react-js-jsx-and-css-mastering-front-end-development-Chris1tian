import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Generate source maps for better debugging
    sourcemap: true,
    // Optimize chunks for better performance
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'theme': ['./src/context/ThemeContext.jsx'],
        }
      }
    },
    // Minify the output
    minify: 'terser',
    terserOptions: {
      compress: {
        // Remove console.logs in production
        drop_console: true
      }
    }
  },
  server: {
    // Enable HMR
    hmr: true,
    // Configure CORS
    cors: true
  }
})