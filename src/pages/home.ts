/**
 * pages/home.ts — entry script of the start page.
 *
 * Demonstrates: importing shared modules, working with Date,
 * and writing typed functions with a return value.
 */
import { initChrome, escapeHtml } from '../components'
import { events } from '../data'
import type { BandEvent } from '../types'

initChrome('home')

/**
 * Returns the next upcoming event (or null if there is none).
 * Note how the parameter types and return type are declared explicitly —
 * TypeScript then checks that we really return what we promise.
 */
function findNextEvent(eventList: BandEvent[], today: Date): BandEvent | null {
  const upcoming = eventList
    .filter((event) => new Date(event.date) >= today)
    .sort((a, b) => a.date.localeCompare(b.date))

  // `upcoming[0]` has type `BandEvent` (or `undefined` with noUncheckedIndexedAccess);
  // returning it via a variable keeps things readable.
  const next = upcoming[0]
  return next !== undefined ? next : null
}

function renderNextEvent(): void {
  const container = document.getElementById('next-event')
  if (!container) return

  const nextEvent = findNextEvent(events, new Date())

  // Union type in action: `nextEvent` is `BandEvent | null`,
  // so TypeScript forces us to handle the null case first.
  if (nextEvent === null) {
    container.innerHTML = '<p class="event-banner">Aktuell sind keine Termine geplant.</p>'
    return
  }

  const weekday = new Date(nextEvent.date).toLocaleDateString('de-DE', {
    weekday: 'long',
  })
  const date = new Date(nextEvent.date).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

  container.innerHTML = `
    <div class="event-banner">
      <p class="event-banner-label">Nächster Termin</p>
      <p class="event-banner-text">
        ${weekday}, ${date} · ${escapeHtml(nextEvent.title)},
        ${escapeHtml(nextEvent.location)}${nextEvent.time ? ', ' + escapeHtml(nextEvent.time) : ''}
      </p>
      <a class="btn" href="termine.html">Alle Termine</a>
    </div>
  `
}

renderNextEvent()
