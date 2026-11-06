/**
 * pages/home.ts — entry script of the start page.
 *
 * Thin DOM wiring: the logic lives in src/lib/ (unit-tested there).
 */
import { initChrome, qs } from '@/components'
import { events } from '@/data'
import { daysUntilLabel } from '@/lib/dates'
import { findNextEvent } from '@/lib/events'
import { escapeHtml } from '@/lib/escape'
import { withBase } from '@/lib/url'

initChrome('home')

function renderNextEvent(): void {
  const container = qs<HTMLElement>('#next-event')

  const today = new Date()
  const nextEvent = findNextEvent(events, today)

  // No event in the future: show a friendly notice instead.
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
      <a href="${withBase('/termine/')}" class="btn-retro mt-8">Alle Termine</a>
    </div>
  `
}

renderNextEvent()
