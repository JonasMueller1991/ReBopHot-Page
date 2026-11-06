/**
 * pages/termine.ts — the "Termine" (events) page.
 *
 * Thin DOM wiring: date formatting and the upcoming/past split live
 * in src/lib/ (unit-tested there). Clicking an event card opens the
 * picture of that event in a lightbox (see the markup in
 * termine/index.html).
 */
import { initChrome, qs } from '@/components'
import { events } from '@/data'
import { formatEventDate } from '@/lib/dates'
import { splitByDate } from '@/lib/events'
import { escapeHtml } from '@/lib/escape'
import { webpSrcset } from '@/lib/images'
import { withBase } from '@/lib/url'
import type { BandEvent } from '@/types'

initChrome('termine')

/** Render one event as a card. Index refers to the global `events` array. */
function eventCard(event: BandEvent, index: number, past: boolean): string {
  // Optional fields: `event.time` may or may not exist.
  const timeHtml = event.time
    ? `<p class="mt-1 text-cream-dim">${escapeHtml(event.time)}</p>`
    : ''

  const admissionHtml = event.admission
    ? `<p class="mt-1 text-teal">${escapeHtml(event.admission)}</p>`
    : ''

  const noteHtml = event.note
    ? `<p class="mt-3 text-sm leading-relaxed text-cream-dim">${escapeHtml(event.note)}</p>`
    : ''

  const cancelledHtml =
    event.cancelled === true
      ? '<p class="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-error">&mdash; Termin wurde abgesagt &mdash;</p>'
      : ''

  // Cards with a picture are clickable and open the lightbox.
  const clickable = event.photo !== undefined
  const photoHintHtml = clickable
    ? '<p class="mt-4 text-xs uppercase tracking-[0.2em] text-gold/80 transition-colors group-hover:text-gold">Foto ansehen</p>'
    : ''

  const interactiveClasses = clickable
    ? 'group cursor-pointer transition-colors hover:border-gold'
    : ''

  return `
    <article
      class="rounded-lg border border-gold/40 bg-stage-soft p-6 ${past ? 'opacity-75' : ''} ${interactiveClasses}"
      ${clickable ? `data-event-index="${index}" tabindex="0" role="button"` : ''}
    >
      ${cancelledHtml}
      <h3 class="font-display text-xl text-cream">${escapeHtml(event.title)}</h3>
      <p class="mt-1 text-sm uppercase tracking-[0.15em] text-gold">${formatEventDate(event.date)}</p>
      <p class="mt-1 text-cream-dim">${escapeHtml(event.location)}</p>
      ${timeHtml}
      ${admissionHtml}
      ${noteHtml}
      ${photoHintHtml}
    </article>
  `
}

function renderEvents(): void {
  const upcomingSection = qs<HTMLElement>('#upcoming-events')
  const pastSection = qs<HTMLElement>('#past-events')

  const { upcoming, past } = splitByDate(events, new Date())

  upcomingSection.innerHTML = upcoming.length
    ? `<h2 class="font-marquee text-2xl text-gold">Kommende Termine</h2>
       <div class="mt-6 grid gap-6">
         ${upcoming.map((event) => eventCard(event, events.indexOf(event), false)).join('')}
       </div>`
    : '<p class="font-display text-lg italic text-cream-dim">Aktuell sind keine neuen Termine geplant.</p>'

  pastSection.insertAdjacentHTML(
    'beforeend',
    `<div class="mt-8 grid gap-6">
       ${past.map((event) => eventCard(event, events.indexOf(event), true)).join('')}
     </div>`,
  )
}

// ---------------------------------------------------------------------------
// Lightbox for the event pictures
// ---------------------------------------------------------------------------

function openLightbox(event: BandEvent): void {
  if (event.photo === undefined) return

  const lightbox = qs<HTMLElement>('#event-lightbox')
  const source = qs<HTMLSourceElement>('.lightbox-source', lightbox)
  const image = qs<HTMLImageElement>('.lightbox-picture', lightbox)
  const caption = qs<HTMLElement>('.lightbox-caption', lightbox)

  source.srcset = webpSrcset(event.photo.src, event.photo.width)
  image.src = withBase(event.photo.src)
  image.alt = event.photo.alt
  image.width = event.photo.width
  image.height = event.photo.height
  caption.textContent = `${event.title} — ${formatEventDate(event.date)}`
  lightbox.hidden = false
}

function closeLightbox(): void {
  qs<HTMLElement>('#event-lightbox').hidden = true
}

function setupLightbox(): void {
  const main = qs<HTMLElement>('#main-content')
  const lightbox = qs<HTMLElement>('#event-lightbox')
  const closeButton = qs<HTMLButtonElement>('.lightbox-close', lightbox)

  // Event delegation: one listener on the main content handles every card.
  main.addEventListener('click', (event) => {
    const target = event.target as HTMLElement
    const card = target.closest<HTMLElement>('[data-event-index]')

    if (card) {
      const index = Number(card.dataset.eventIndex)
      const bandEvent = events[index]
      if (bandEvent) {
        openLightbox(bandEvent)
      }
    }
  })

  // Keyboard support: Enter or Space opens the focused card's picture.
  main.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key !== 'Enter' && event.key !== ' ') return

    const target = event.target as HTMLElement
    const card = target.closest<HTMLElement>('[data-event-index]')

    if (card) {
      event.preventDefault()
      const index = Number(card.dataset.eventIndex)
      const bandEvent = events[index]
      if (bandEvent) {
        openLightbox(bandEvent)
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

renderEvents()
setupLightbox()
