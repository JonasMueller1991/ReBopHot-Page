/**
 * pages/galerie.ts — the "Galerie" page with a lightbox.
 *
 * Demonstrates: event listeners, clicking elements, hidden/shown state,
 * and closing a modal with Escape (KeyboardEvent).
 */
import { initChrome } from '../components'
import { galleryPictures } from '../data'
import type { GalleryPicture } from '../types'

initChrome('galerie')

function renderGallery(): void {
  const grid = document.getElementById('gallery-grid')
  if (!grid) return

  grid.innerHTML = galleryPictures
    .map(
      (picture, index) => `
        <button type="button" class="gallery-item" data-index="${index}">
          <div class="gallery-picture" style="background: ${picture.gradient}"></div>
          <p class="gallery-caption">${picture.title}</p>
        </button>
      `,
    )
    .join('')
}

function openLightbox(picture: GalleryPicture): void {
  const lightbox = document.getElementById('lightbox')
  const image = lightbox?.querySelector('.lightbox-picture')
  const caption = lightbox?.querySelector('.lightbox-caption')

  if (lightbox && image && caption) {
    ;(image as HTMLElement).style.background = picture.gradient
    caption.textContent = picture.title
    lightbox.hidden = false
  }
}

function closeLightbox(): void {
  const lightbox = document.getElementById('lightbox')
  if (lightbox) {
    lightbox.hidden = true
  }
}

function setupLightbox(): void {
  const grid = document.getElementById('gallery-grid')
  const lightbox = document.getElementById('lightbox')
  const closeButton = lightbox?.querySelector('.lightbox-close')

  // Event delegation: one listener on the grid handles every picture.
  grid?.addEventListener('click', (event) => {
    const target = event.target as HTMLElement
    const item = target.closest<HTMLElement>('.gallery-item')

    if (item) {
      const index = Number(item.dataset.index)
      const picture = galleryPictures[index]
      if (picture) {
        openLightbox(picture)
      }
    }
  })

  closeButton?.addEventListener('click', closeLightbox)

  // Click on the dark background also closes the lightbox.
  lightbox?.addEventListener('click', (event) => {
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
