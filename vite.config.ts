import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      remotion: fileURLToPath(new URL('./node_modules/remotion', import.meta.url)),
      '@remotion/player': fileURLToPath(
        new URL('./node_modules/@remotion/player', import.meta.url),
      ),
    },
    dedupe: ['react', 'react-dom', 'remotion'],
  },
  optimizeDeps: {
    include: ['remotion', '@remotion/player'],
  },
})
