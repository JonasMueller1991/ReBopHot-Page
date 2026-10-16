/**
 * pages/band.ts — the "Band" page.
 *
 * Demonstrates: looping over a typed array (map), building HTML
 * from data, and a small typed function with a template literal.
 */
import { initChrome, escapeHtml } from '../components'
import { bandDescription, bandMembers } from '../data'
import type { BandMember } from '../types'

initChrome('band')

/** Turn one BandMember object into the HTML of a member card. */
function memberCard(member: BandMember): string {
  // Two initials for the placeholder "photo", e.g. "Ilse" -> "IL"
  const initials = member.name.slice(0, 2).toUpperCase()

  return `
    <article class="rounded-lg border border-gold/40 bg-stage-soft p-6 text-center">
      <div
        class="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-gold to-rust font-marquee text-2xl text-stage"
        aria-hidden="true"
      >
        ${initials}
      </div>
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

function renderDescription(): void {
  const element = document.getElementById('band-description')
  if (!element) return
  // whitespace-pre-line on the <p> renders the \n\n in data.ts as paragraphs
  element.textContent = bandDescription
}

function renderMembers(): void {
  const grid = document.getElementById('member-grid')
  if (!grid) return

  // `map` turns every BandMember into a card; `join` glues them together.
  grid.innerHTML = bandMembers.map(memberCard).join('')
}

renderDescription()
renderMembers()
