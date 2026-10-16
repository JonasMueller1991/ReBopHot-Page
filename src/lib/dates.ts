/**
 * lib/dates.ts
 * ------------
 * Pure date helpers. All functions take the reference date ("today")
 * as a parameter instead of reading the clock themselves — that is
 * what makes them deterministic and easy to test.
 */

/** Strip the time of day: 2026-10-16T14:23 -> 2026-10-16T00:00 (local). */
export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

/** Whole days between `today` and the given ISO date string. */
export function daysUntil(date: string, today: Date): number {
  const millisPerDay = 86_400_000
  return Math.round(
    (startOfDay(new Date(date)).getTime() - startOfDay(today).getTime()) /
      millisPerDay,
  )
}

/** German label like "heute", "morgen" or "in 12 Tagen". */
export function daysUntilLabel(date: string, today: Date): string {
  const days = daysUntil(date, today)
  if (days === 0) return 'heute'
  if (days === 1) return 'morgen'
  return `in ${days} Tagen`
}

/** Format an ISO date string in long German, e.g. "Mittwoch, 28. Oktober 2026". */
export function formatEventDate(date: string): string {
  return new Date(date).toLocaleDateString('de-DE', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}
