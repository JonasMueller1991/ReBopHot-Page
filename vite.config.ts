/**
 * vite.config.ts
 * Multi-page setup: every page of the site lives in its own
 * directory as index.html (clean URLs like /termine/), each loading
 * its own TypeScript entry from src/pages/.
 * The Tailwind CSS v4 plugin scans all HTML/TS files for utility classes.
 */
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  // GitHub Pages serves the site from a sub-path
  // (https://jonasmueller1991.github.io/ReBopHot-Page/), so all asset
  // URLs are built relative to it. In dev mode this has no effect.
  base: '/ReBopHot-Page/',
  plugins: [tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        band: fileURLToPath(new URL('./band/index.html', import.meta.url)),
        termine: fileURLToPath(
          new URL('./termine/index.html', import.meta.url),
        ),
        kontakt: fileURLToPath(
          new URL('./kontakt/index.html', import.meta.url),
        ),
        videos: fileURLToPath(new URL('./videos/index.html', import.meta.url)),
        galerie: fileURLToPath(
          new URL('./galerie/index.html', import.meta.url),
        ),
        impressum: fileURLToPath(
          new URL('./impressum/index.html', import.meta.url),
        ),
      },
    },
  },
})
