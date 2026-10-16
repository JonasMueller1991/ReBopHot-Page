/**
 * pages/home.ts — entry script of the start page.
 *
 * The shared header/footer come from src/components.ts (initChrome).
 * This script handles the data-driven part: the "next gig" admission ticket.
 *
 * Demonstrates: importing shared modules, Date arithmetic, union types
 * (BandEvent | null) and template literals with Tailwind classes.
 */
import { initChrome, escapeHtml } from '../components'
import { events } from '../data'
import type { BandEvent } from '../types'

initChrome('home')

/**
 * Returns the next upcoming event (or null if there is none).
 * The explicit return type `BandEvent | null` forces us to handle
 * the "nothing found" case at the call site.
 */
function findNextEvent(eventList: BandEvent[], today: Date): BandEvent | null {
  const upcoming = eventList
    .filter((event) => new Date(event.date) >= today)
    .sort((a, b) => a.date.localeCompare(b.date))

  const next = upcoming[0]
  return next !== undefined ? next : null
}

/** Whole days between `today` (with its time stripped) and the event date. */
function daysUntil(date: string, today: Date): number {
  const startOfDay = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate())

  const millisPerDay = 86_400_000
  return Math.round(
    (startOfDay(new Date(date)).getTime() - startOfDay(today).getTime()) /
      millisPerDay,
  )
}

/** German label like "heute", "morgen" or "in 12 Tagen". */
function daysUntilLabel(date: string, today: Date): string {
  const days = daysUntil(date, today)
  if (days === 0) return 'heute'
  if (days === 1) return 'morgen'
  return `in ${days} Tagen`
}

function renderNextEvent(): void {
  const container = document.getElementById('next-event')
  if (!container) return

  const today = new Date()
  const nextEvent = findNextEvent(events, today)

  // Union type in action: we must handle `null` before touching the event.
  if (nextEvent === null) {
    container.innerHTML = `
      <p class="rounded-lg border-2 border-dashed border-gold/70 bg-stage-soft px-8 py-6 text-center font-display text-lg italic text-cream-dim">
        Aktuell sind keine Termine geplant.
      </p>`
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
    <div class="ticket mx-auto border-2 border-dashed border-gold/70 bg-stage-soft px-8 py-10 text-center sm:px-14">
      <p class="text-xs uppercase tracking-[0.4em] text-cream-dim">
        Nächster Termin · ${escapeHtml(daysUntilLabel(nextEvent.date, today))}
      </p>
      <h2 class="mt-3 font-marquee text-2xl text-gold sm:text-3xl">
        ${escapeHtml(nextEvent.title)}
      </h2>
      <p class="mt-3 font-display text-lg italic text-cream">
        ${weekday}, ${date} · ${escapeHtml(nextEvent.location)}
        ${nextEvent.time ? ' · ' + escapeHtml(nextEvent.time) : ''}
      </p>
      <a href="termine.html" class="btn-retro mt-8">Alle Termine</a>
    </div>
  `
}

renderNextEvent()
