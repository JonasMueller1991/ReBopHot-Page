/**
 * vite.config.ts
 * Multi-page setup: every page of the site is its own HTML file,
 * each loading its own TypeScript entry from src/pages/.
 * The Tailwind CSS v4 plugin scans all HTML/TS files for utility classes.
 */
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        band: fileURLToPath(new URL('./band.html', import.meta.url)),
        termine: fileURLToPath(new URL('./termine.html', import.meta.url)),
        kontakt: fileURLToPath(new URL('./kontakt.html', import.meta.url)),
        galerie: fileURLToPath(new URL('./galerie.html', import.meta.url)),
        impressum: fileURLToPath(new URL('./impressum.html', import.meta.url)),
      },
    },
  },
})
