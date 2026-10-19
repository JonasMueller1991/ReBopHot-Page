/**
 * lib/videos.ts
 * -------------
 * Pure logic around the band's videos: building the privacy-friendly
 * YouTube URLs (nocookie embeds, facade thumbnails) and looking up
 * videos inside the sections. No DOM here — pages/videos.ts wires it.
 */
import type { BandVideo, VideoSection } from '@/types'

/**
 * Embed URL for the jukebox screen. Uses youtube-nocookie.com
 * (YouTube's privacy-enhanced mode). The iframe is only created when
 * the visitor actually plays a video (facade pattern), so nothing
 * from YouTube loads on page view alone.
 */
export function buildEmbedUrl(id: string, autoplay = true): string {
  const query = autoplay ? '?autoplay=1' : ''
  return `https://www.youtube-nocookie.com/embed/${id}${query}`
}

/** Link to the regular watch page on youtube.com. */
export function buildWatchUrl(id: string): string {
  return `https://www.youtube.com/watch?v=${id}`
}

/**
 * Thumbnail URL on YouTube's image CDN — a plain `<img>` request that
 * sets no cookies. Shown in the facade before the video is played.
 */
export function buildThumbnailUrl(id: string): string {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
}

/**
 * Look up a video by its position in the sections; null when the
 * position does not exist (guards against stale data attributes).
 */
export function findVideo(
  sections: VideoSection[],
  sectionIndex: number,
  videoIndex: number,
): BandVideo | null {
  const video = sections[sectionIndex]?.videos[videoIndex]
  return video !== undefined ? video : null
}

/** Label for a selector button: the year when present, else the title. */
export function videoButtonLabel(video: BandVideo): string {
  return video.year ?? video.title
}
