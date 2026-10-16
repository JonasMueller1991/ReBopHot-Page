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
  const lines: string[] = []

  lines.push(`<h3 class="event-title">${escapeHtml(event.title)}</h3>`)
  lines.push(`<p class="event-date">${formatEventDate(event.date)}</p>`)
  lines.push(`<p class="event-location">${escapeHtml(event.location)}</p>`)

  // Optional fields: `event.time` may or may not exist — `?.` + `??` handle both.
  const timeHtml = event.time ? `<p class="event-time">${escapeHtml(event.time)}</p>` : ''
  lines.push(timeHtml)

  const admissionHtml = event.admission
    ? `<p class="event-admission">${escapeHtml(event.admission)}</p>`
    : ''
  lines.push(admissionHtml)

  const noteHtml = event.note ? `<p class="event-note">${escapeHtml(event.note)}</p>` : ''
  lines.push(noteHtml)

  const cancelledHtml =
    event.cancelled === true
      ? '<p class="event-cancelled">— Termin wurde abgesagt —</p>'
      : ''

  return `
    <article class="event-card ${past ? 'event-past' : ''}">
      ${cancelledHtml}
      ${lines.join('')}
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
    ? `<h2>Kommende Termine</h2>
       <div class="event-list">
         ${upcoming.map((event) => eventCard(event, false)).join('')}
       </div>`
    : '<p>Aktuell sind keine neuen Termine geplant.</p>'

  pastSection.insertAdjacentHTML(
    'beforeend',
    `<div class="event-list event-list-past">
       ${past.map((event) => eventCard(event, true)).join('')}
     </div>`,
  )
}

renderEvents()
