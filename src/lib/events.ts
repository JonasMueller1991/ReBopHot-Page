/**
 * lib/events.ts
 * -------------
 * Pure logic around the band's events: finding the next gig and
 * splitting the list into upcoming / past. Again, `today` is a
 * parameter, so tests stay deterministic.
 */
import type { BandEvent } from '@/types'

export interface EventSplit {
  upcoming: BandEvent[]
  past: BandEvent[]
}

/**
 * Returns the next upcoming event (or null if there is none).
 * The explicit `BandEvent | null` return type forces callers to
 * handle the "nothing found" case at the call site.
 */
export function findNextEvent(
  eventList: BandEvent[],
  today: Date,
): BandEvent | null {
  const upcoming = eventList
    .filter((event) => new Date(event.date) >= today)
    .sort((a, b) => a.date.localeCompare(b.date))

  const next = upcoming[0]
  return next !== undefined ? next : null
}

/**
 * Split events into upcoming (soonest first) and past (most recent first).
 */
export function splitByDate(eventList: BandEvent[], today: Date): EventSplit {
  const upcoming = eventList
    .filter((event) => new Date(event.date) >= today)
    .sort((a, b) => a.date.localeCompare(b.date))

  const past = eventList
    .filter((event) => new Date(event.date) < today)
    .sort((a, b) => b.date.localeCompare(a.date))

  return { upcoming, past }
}
