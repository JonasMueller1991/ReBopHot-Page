/**
 * pages/termine.ts — the "Termine" (events) page.
 *
 * Demonstrates: splitting/sorting arrays by date, formatting dates
 * in German, and optional interface fields (note the `?.` and `??`).
 */
import { initChrome, escapeHtml } from '../components'
import { events } from '../data'
import type { BandEvent } from '../types'

initChrome('termine')

/** A little formatter we reuse for every date shown on this page. */
function formatEventDate(date: string): string {
  return new Date(date).toLocaleDateString('de-DE', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

/** Render one event as a card. */
function eventCard(event: BandEvent, past: boolean): string {
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

  return `
    <article class="rounded-lg border border-gold/40 bg-stage-soft p-6 ${past ? 'opacity-75' : ''}">
      ${cancelledHtml}
      <h3 class="font-display text-xl text-cream">${escapeHtml(event.title)}</h3>
      <p class="mt-1 text-sm uppercase tracking-[0.15em] text-gold">${formatEventDate(event.date)}</p>
      <p class="mt-1 text-cream-dim">${escapeHtml(event.location)}</p>
      ${timeHtml}
      ${admissionHtml}
      ${noteHtml}
    </article>
  `
}

function renderEvents(): void {
  const upcomingSection = document.getElementById('upcoming-events')
  const pastSection = document.getElementById('past-events')
  if (!upcomingSection || !pastSection) return

  const today = new Date()

  // Split the events into the two buckets, newest first / oldest first.
  const upcoming = events
    .filter((event) => new Date(event.date) >= today)
    .sort((a, b) => a.date.localeCompare(b.date))

  const past = events
    .filter((event) => new Date(event.date) < today)
    .sort((a, b) => b.date.localeCompare(a.date))

  upcomingSection.innerHTML = upcoming.length
    ? `<h2 class="font-marquee text-2xl text-gold">Kommende Termine</h2>
       <div class="mt-6 grid gap-6">
         ${upcoming.map((event) => eventCard(event, false)).join('')}
       </div>`
    : '<p class="font-display text-lg italic text-cream-dim">Aktuell sind keine neuen Termine geplant.</p>'

  pastSection.insertAdjacentHTML(
    'beforeend',
    `<div class="mt-8 grid gap-6">
       ${past.map((event) => eventCard(event, true)).join('')}
     </div>`,
  )
}

renderEvents()
