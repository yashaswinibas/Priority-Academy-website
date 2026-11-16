// Builds ONE self-contained file:  single/index.html
// Everything (code, styles, fonts, logo, photos, videos) is inside it.
// Works on any host, and also by simply double-clicking the file.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  plugins: [react(), viteSingleFile({ removeViteModuleLoader: true })],
  define: { 'import.meta.env.VITE_SINGLE': 'true' },
  publicDir: false,
  build: { outDir: 'single', emptyOutDir: true, assetsInlineLimit: 100_000_000, chunkSizeWarningLimit: 100_000 },
})
