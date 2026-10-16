import { describe, expect, it } from 'vitest'
import { findNextEvent, splitByDate } from './events'
import type { BandEvent } from '@/types'

const events: BandEvent[] = [
  { date: '2024-07-21', title: 'Stadtfest Rastatt', location: 'Rastatt' },
  { date: '2026-12-05', title: 'Adventsmarkt', location: 'Gaggenau' },
  { date: '2026-10-28', title: 'Weingut Klenert', location: 'Kraichtal' },
  { date: '2026-11-15', title: 'Jazzclub', location: 'Wiesloch' },
]

const today = new Date(2026, 9, 16) // 16.10.2026

describe('findNextEvent', () => {
  it('returns the soonest upcoming event', () => {
    const next = findNextEvent(events, today)
    expect(next?.title).toBe('Weingut Klenert')
  })

  it('returns null when every event is in the past', () => {
    expect(findNextEvent([events[0]!], today)).toBeNull()
  })
})

describe('splitByDate', () => {
  it('splits into upcoming (soonest first) and past (most recent first)', () => {
    const { upcoming, past } = splitByDate(events, today)

    expect(upcoming.map((event) => event.title)).toEqual([
      'Weingut Klenert',
      'Jazzclub',
      'Adventsmarkt',
    ])
    expect(past.map((event) => event.title)).toEqual(['Stadtfest Rastatt'])
  })

  it('keeps the past list sorted by most recent first', () => {
    const older: BandEvent[] = [
      { date: '2024-01-01', title: 'Old', location: 'X' },
      { date: '2025-01-01', title: 'Newer', location: 'X' },
    ]
    const { past } = splitByDate(older, today)
    expect(past[0]?.title).toBe('Newer')
  })
})
