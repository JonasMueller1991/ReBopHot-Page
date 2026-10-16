/**
 * pages/galerie.ts — the "Galerie" page with a lightbox.
 *
 * Thin DOM wiring; the picture data lives in src/data.ts.
 */
import { initChrome, qs } from '@/components'
import { galleryPictures } from '@/data'
import { escapeHtml } from '@/lib/escape'
import type { GalleryPicture } from '@/types'

initChrome('galerie')

function renderGallery(): void {
  qs<HTMLElement>('#gallery-grid').innerHTML = galleryPictures
    .map(
      (picture, index) => `
        <button
          type="button"
          class="group cursor-pointer overflow-hidden rounded-lg border border-gold/40 bg-stage-soft p-4 transition-colors hover:border-gold"
          data-index="${index}"
        >
          <img
            src="${picture.src}"
            alt="${picture.alt}"
            width="${picture.width}"
            height="${picture.height}"
            loading="lazy"
            class="aspect-[4/3] w-full rounded-md object-cover"
          />
          <p class="mt-3 text-center text-sm uppercase tracking-[0.15em] text-cream-dim transition-colors group-hover:text-cream">
            ${escapeHtml(picture.title)}
          </p>
        </button>
      `,
    )
    .join('')
}

function openLightbox(picture: GalleryPicture): void {
  const lightbox = qs<HTMLElement>('#lightbox')
  const image = qs<HTMLImageElement>('.lightbox-picture', lightbox)
  const caption = qs<HTMLElement>('.lightbox-caption', lightbox)

  image.src = picture.src
  image.alt = picture.alt
  caption.textContent = picture.title
  lightbox.hidden = false
}

function closeLightbox(): void {
  qs<HTMLElement>('#lightbox').hidden = true
}

function setupLightbox(): void {
  const grid = qs<HTMLElement>('#gallery-grid')
  const lightbox = qs<HTMLElement>('#lightbox')
  const closeButton = qs<HTMLButtonElement>('.lightbox-close', lightbox)

  // Event delegation: one listener on the grid handles every picture.
  grid.addEventListener('click', (event) => {
    const target = event.target as HTMLElement
    const item = target.closest<HTMLElement>('[data-index]')

    if (item) {
      const index = Number(item.dataset.index)
      const picture = galleryPictures[index]
      if (picture) {
        openLightbox(picture)
      }
    }
  })

  closeButton.addEventListener('click', closeLightbox)

  // Click on the dark background also closes the lightbox.
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeLightbox()
    }
  })

  // Escape key closes the lightbox — note the typed KeyboardEvent.
  document.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeLightbox()
    }
  })
}

renderGallery()
setupLightbox()
