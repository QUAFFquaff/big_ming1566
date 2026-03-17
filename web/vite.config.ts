import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // GitHub Pages publishes this repo at /big_ming1566/
  base: '/big_ming1566/',
  plugins: [react()],
})
