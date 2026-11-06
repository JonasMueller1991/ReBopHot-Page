/**
 * pages/band.ts — the "Band" page.
 *
 * Thin DOM wiring: the logic lives in src/lib/ (unit-tested there).
 */
import { initChrome, qs } from '@/components'
import { bandDescription, bandIntro, bandMembers } from '@/data'
import { escapeHtml } from '@/lib/escape'
import { responsivePictureHtml } from '@/lib/images'
import type { BandMember } from '@/types'

initChrome('band')

/** Turn one BandMember object into the HTML of a member card. */
function memberCard(member: BandMember): string {
  // Real portrait when available, otherwise the initials as placeholder
  // "photo", e.g. "Ilse" -> "IL".
  const initials = member.name.slice(0, 2).toUpperCase()

  const photoHtml = member.photo
    ? responsivePictureHtml({
        src: member.photo.src,
        alt: member.photo.alt,
        width: member.photo.width,
        height: member.photo.height,
        // Displayed at 80×80px (h-20 w-20); the 480px variant also
        // covers 2× retina screens at a fraction of the PNG size.
        sizes: '80px',
        className: 'mx-auto h-20 w-20 rounded-full object-cover',
        objectPosition: member.photo.position,
      })
    : `<div
          class="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-gold-pop to-rust font-marquee text-2xl text-ink"
          aria-hidden="true"
        >
          ${initials}
        </div>`

  return `
    <article
      class="w-full rounded-lg border border-gold/40 bg-stage-soft p-6 text-center sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] xl:w-[calc(25%-1.125rem)]"
    >
      ${photoHtml}
      <h3 class="mt-4 font-display text-lg text-cream">
        ${escapeHtml(member.role)}: ${escapeHtml(member.name)}
      </h3>
      <p class="mt-1 text-sm">
        <a class="text-gold transition-colors hover:text-cream" href="mailto:${escapeHtml(member.email)}">
          ${escapeHtml(member.email)}
        </a>
      </p>
    </article>
  `
}

function renderIntro(): void {
  qs<HTMLElement>('#band-intro').textContent = bandIntro
}

function renderDescription(): void {
  // whitespace-pre-line on the <p> renders the \n\n in data.ts as paragraphs
  qs<HTMLElement>('#band-description').textContent = bandDescription
}

function renderMembers(): void {
  // `map` turns every BandMember into a card; `join` glues them together.
  qs<HTMLElement>('#member-grid').innerHTML = bandMembers
    .map(memberCard)
    .join('')
}

renderIntro()
renderDescription()
renderMembers()
