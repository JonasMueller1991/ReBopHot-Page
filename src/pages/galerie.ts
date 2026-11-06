/**
 * pages/galerie.ts — the "Galerie" page with a lightbox.
 *
 * Thin DOM wiring; the picture data lives in src/data.ts, grouped
 * into sections per event/shooting.
 */
import { initChrome, qs } from '@/components'
import { gallerySections } from '@/data'
import { escapeHtml } from '@/lib/escape'
import { withBase } from '@/lib/url'
import type { GalleryPicture } from '@/types'

initChrome('galerie')

function renderGallery(): void {
  qs<HTMLElement>('#gallery-sections').innerHTML = gallerySections
    .map(
      (section, sectionIndex) => `
        <section class="mt-12 first:mt-10">
          <h2
            class="border-b border-gold/30 pb-2 font-marquee text-2xl text-gold"
          >
            ${escapeHtml(section.title)}
          </h2>
          <div
            class="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            ${section.pictures
              .map(
                (picture, pictureIndex) => `
                  <button
                    type="button"
                    class="group cursor-pointer overflow-hidden rounded-lg border border-gold/40 bg-stage-soft p-4 transition-colors hover:border-gold"
                    data-section="${sectionIndex}"
                    data-picture="${pictureIndex}"
                  >
                    <img
                      src="${withBase(picture.src)}"
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
              .join('')}
          </div>
        </section>
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
  const sections = qs<HTMLElement>('#gallery-sections')
  const lightbox = qs<HTMLElement>('#lightbox')
  const closeButton = qs<HTMLButtonElement>('.lightbox-close', lightbox)

  // Event delegation: one listener on the container handles every picture.
  sections.addEventListener('click', (event) => {
    const target = event.target as HTMLElement
    const item = target.closest<HTMLElement>('[data-picture]')

    if (item) {
      const sectionIndex = Number(item.dataset.section)
      const pictureIndex = Number(item.dataset.picture)
      const picture = gallerySections[sectionIndex]?.pictures[pictureIndex]
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
