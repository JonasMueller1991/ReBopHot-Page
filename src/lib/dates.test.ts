import { describe, expect, it } from 'vitest'
import { daysUntil, daysUntilLabel, formatEventDate, startOfDay } from './dates'

// Month is 0-based in the Date constructor: 9 === October.
const today = new Date(2026, 9, 16, 14, 30) // 16.10.2026, afternoon

describe('startOfDay', () => {
  it('strips the time of day', () => {
    const result = startOfDay(today)
    expect(result.getHours()).toBe(0)
    expect(result.getDate()).toBe(16)
  })
})

describe('daysUntil', () => {
  it('returns 0 for the same day', () => {
    expect(daysUntil('2026-10-16', today)).toBe(0)
  })

  it('counts whole days regardless of the current time', () => {
    expect(daysUntil('2026-10-18', today)).toBe(2)
  })

  it('returns negative values for past dates', () => {
    expect(daysUntil('2026-10-14', today)).toBe(-2)
  })
})

describe('daysUntilLabel', () => {
  it('labels today, tomorrow and future dates in German', () => {
    expect(daysUntilLabel('2026-10-16', today)).toBe('heute')
    expect(daysUntilLabel('2026-10-17', today)).toBe('morgen')
    expect(daysUntilLabel('2026-10-28', today)).toBe('in 12 Tagen')
  })
})

describe('formatEventDate', () => {
  it('formats in long German including the weekday', () => {
    expect(formatEventDate('2026-10-28')).toBe('Mittwoch, 28. Oktober 2026')
  })
})
