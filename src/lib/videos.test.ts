import { describe, expect, it } from 'vitest'
import {
  buildEmbedUrl,
  buildThumbnailUrl,
  buildWatchUrl,
  findVideo,
  videoButtonLabel,
} from './videos'
import type { VideoSection } from '@/types'

const sections: VideoSection[] = [
  {
    title: 'Musik & Live',
    videos: [
      { id: 'abc123', title: 'Konzertclip im Tempel' },
      { id: 'def456', title: 'Swing in Karlsruhe' },
    ],
  },
  {
    title: 'Weihnachts-/Neujahrsgrüße',
    videos: [
      { id: 'ghi789', title: 'Weihnachts-/Neujahrsgrüße 2025', year: '2025' },
    ],
  },
]

describe('buildEmbedUrl', () => {
  it('builds a privacy-friendly nocookie URL with autoplay', () => {
    expect(buildEmbedUrl('abc123')).toBe(
      'https://www.youtube-nocookie.com/embed/abc123?autoplay=1',
    )
  })

  it('can omit autoplay', () => {
    expect(buildEmbedUrl('abc123', false)).toBe(
      'https://www.youtube-nocookie.com/embed/abc123',
    )
  })
})

describe('buildWatchUrl', () => {
  it('links to the regular watch page', () => {
    expect(buildWatchUrl('abc123')).toBe(
      'https://www.youtube.com/watch?v=abc123',
    )
  })
})

describe('buildThumbnailUrl', () => {
  it('points at the hq thumbnail on YouTube\u2019s image CDN', () => {
    expect(buildThumbnailUrl('abc123')).toBe(
      'https://i.ytimg.com/vi/abc123/hqdefault.jpg',
    )
  })
})

describe('findVideo', () => {
  it('finds a video by section and position', () => {
    expect(findVideo(sections, 1, 0)?.id).toBe('ghi789')
  })

  it('returns null for positions that do not exist', () => {
    expect(findVideo(sections, 0, 5)).toBeNull()
    expect(findVideo(sections, 9, 0)).toBeNull()
  })
})

describe('videoButtonLabel', () => {
  it('prefers the year when present', () => {
    expect(videoButtonLabel(sections[1]!.videos[0]!)).toBe('2025')
  })

  it('falls back to the title', () => {
    expect(videoButtonLabel(sections[0]!.videos[0]!)).toBe(
      'Konzertclip im Tempel',
    )
  })
})
