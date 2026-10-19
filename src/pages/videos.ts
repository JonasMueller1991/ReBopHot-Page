/**
 * pages/videos.ts — the "Musik & Video" page as a video jukebox.
 *
 * One large "screen" plus push buttons grouped into sections. The
 * screen shows only a thumbnail facade until a video is actually
 * played, so no YouTube iframe (and no YouTube cookie) loads before
 * the visitor asks for it — GDPR-friendly, like the self-hosted fonts.
 *
 * Thin DOM wiring: URL building and lookups live in src/lib/videos.ts
 * (unit-tested there); the video data lives in src/data.ts.
 */
import { initChrome, qs } from '@/components'
import { videoSections } from '@/data'
import { escapeHtml } from '@/lib/escape'
import {
  buildEmbedUrl,
  buildThumbnailUrl,
  buildWatchUrl,
  findVideo,
  videoButtonLabel,
} from '@/lib/videos'
import type { BandVideo } from '@/types'

initChrome('videos')

// -- the jukebox parts -------------------------------------------------

const screen = qs<HTMLElement>('#jukebox-screen')
const nowPlaying = qs<HTMLElement>('#jukebox-now-playing')
const buttonsRoot = qs<HTMLElement>('#jukebox-buttons')

/** Which video is cued up on the screen (the one the facade plays). */
let currentVideo: BandVideo | null = null
/** The selector button belonging to the cued-up video. */
let currentButton: HTMLElement | null = null

// -- rendering ----------------------------------------------------------

/**
 * The facade: YouTube thumbnail + play button. Clicking it swaps in
 * the iframe — nothing from YouTube loads before that click.
 */
function renderFacade(video: BandVideo): void {
  nowPlaying.textContent = video.title
  screen.innerHTML = `
    <button
      type="button"
      class="group relative block w-full cursor-pointer overflow-hidden rounded-md"
      aria-label="${escapeHtml(video.title)} auf der Jukebox abspielen"
    >
      <img
        src="${buildThumbnailUrl(video.id)}"
        alt=""
        width="480"
        height="360"
        loading="lazy"
        class="aspect-video w-full object-cover opacity-70 transition-opacity group-hover:opacity-100"
      />
      <span class="absolute inset-0 grid place-items-center" aria-hidden="true">
        <span
          class="grid h-20 w-20 place-items-center rounded-full border-2 border-gold bg-stage/70 text-3xl text-gold transition-transform group-hover:scale-110"
        >
          &#9654;
        </span>
      </span>
    </button>
  `
}

/** Replace the facade with the playing iframe. */
function renderPlayer(video: BandVideo): void {
  nowPlaying.textContent = video.title
  screen.innerHTML = `
    <div class="relative aspect-video w-full overflow-hidden rounded-md bg-black">
      <iframe
        src="${buildEmbedUrl(video.id)}"
        title="${escapeHtml(video.title)}"
        class="absolute inset-0 h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        referrerpolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
    <p class="mt-3 text-center text-xs tracking-[0.25em] text-cream-dim/70 uppercase">
      Nicht sichtbar?
      <a
        class="text-gold transition-colors hover:text-cream"
        href="${buildWatchUrl(video.id)}"
        target="_blank"
        rel="noopener"
      >
        Direkt auf YouTube ansehen
      </a>
    </p>
  `
}

/** Cue a video on the screen (facade) or play it right away. */
function select(
  video: BandVideo,
  button: HTMLElement | null,
  play: boolean,
): void {
  if (play) {
    renderPlayer(video)
  } else {
    renderFacade(video)
  }

  currentButton?.setAttribute('aria-pressed', 'false')
  button?.setAttribute('aria-pressed', 'true')
  currentVideo = video
  currentButton = button
}

function renderButtons(): void {
  buttonsRoot.innerHTML = videoSections
    .map(
      (section, sectionIndex) => `
        <section class="mt-10 first:mt-0">
          <h2
            class="border-b border-gold/30 pb-2 text-center font-marquee text-xl text-gold sm:text-2xl"
          >
            ${escapeHtml(section.title)}
          </h2>
          <div class="mt-5 flex flex-wrap justify-center gap-3">
            ${section.videos
              .map(
                (video, videoIndex) => `
                  <button
                    type="button"
                    class="jukebox-button"
                    data-section="${sectionIndex}"
                    data-video="${videoIndex}"
                    aria-pressed="false"
                  >
                    ${escapeHtml(videoButtonLabel(video))}
                  </button>
                `,
              )
              .join('')}
          </div>
        </section>
      `,
    )
    .join('')
}

function setupJukebox(): void {
  // Pushing a button plays that video immediately — like a real jukebox.
  buttonsRoot.addEventListener('click', (event) => {
    const button = (event.target as HTMLElement).closest<HTMLElement>(
      '[data-video]',
    )
    if (button === null) return

    const video = findVideo(
      videoSections,
      Number(button.dataset.section),
      Number(button.dataset.video),
    )
    if (video) {
      select(video, button, true)
    }
  })

  // Clicking the facade plays the cued-up video.
  screen.addEventListener('click', (event) => {
    const facade = (event.target as HTMLElement).closest<HTMLButtonElement>(
      'button',
    )
    if (facade !== null && currentVideo !== null) {
      select(currentVideo, currentButton, true)
    }
  })
}

renderButtons()

// The first video is cued up from the start: its facade is on the
// screen and its button is pressed in — but nothing plays until the
// visitor clicks.
const firstVideo = findVideo(videoSections, 0, 0)
if (firstVideo !== null) {
  const firstButton = qs<HTMLElement>(
    '[data-section="0"][data-video="0"]',
    buttonsRoot,
  )
  select(firstVideo, firstButton, false)
}

setupJukebox()
