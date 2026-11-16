/**
 * pages/band.ts — the "Band" page.
 *
 * Thin DOM wiring: the logic lives in src/lib/ (unit-tested there).
 * Clicking a member card opens the member's detail modal (see the
 * markup in band/index.html).
 */
import { initChrome, qs } from '@/components'
import { bandDescription, bandIntro, bandMembers } from '@/data'
import { escapeHtml } from '@/lib/escape'
import { responsivePictureHtml, webpSrcset } from '@/lib/images'
import { withBase } from '@/lib/url'
import type { BandMember } from '@/types'

initChrome('band')

/** The initials of a member, e.g. "Ilse" -> "IL" — used by the
 *  placeholder "photo" of members without a portrait. */
function initialsOf(member: BandMember): string {
  return member.name.slice(0, 2).toUpperCase()
}

/** Turn one BandMember object into the HTML of a member card. */
function memberCard(member: BandMember, index: number): string {
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
          ${initialsOf(member)}
        </div>`

  return `
    <article
      class="group relative w-full cursor-pointer rounded-lg border border-gold/40 bg-stage-soft p-6 text-center transition-colors hover:border-gold sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] xl:w-[calc(25%-1.125rem)]"
    >
      ${photoHtml}
      <h3 class="mt-4 font-display text-lg text-cream">
        <!-- The name button's ::after stretches over the whole card
             (after:absolute after:inset-0, the article is the
             positioning context) — clicking anywhere on the card hits
             the button. A real <button> (like the Galerie cards) gets
             native Enter/Space support, unlike role="button" on the
             article, which would also hide the email link from
             screen readers ("children presentational"). -->
        <button
          type="button"
          class="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          data-member-index="${index}"
          aria-haspopup="dialog"
        >
          ${escapeHtml(member.role)}: ${escapeHtml(member.name)}
        </button>
      </h3>
      <p class="mt-1 text-sm">
        <!-- relative z-10 keeps the link clickable above the button's
             stretched ::after overlay -->
        <a
          class="relative z-10 text-gold transition-colors hover:text-cream"
          href="mailto:${escapeHtml(member.email)}"
        >
          ${escapeHtml(member.email)}
        </a>
      </p>
      <p class="mt-4 text-xs uppercase tracking-[0.2em] text-gold/80 transition-colors group-hover:text-gold">Mehr erfahren</p>
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
    .map((member, index) => memberCard(member, index))
    .join('')
}

// ---------------------------------------------------------------------------
// Detail modal for one band member
// ---------------------------------------------------------------------------

/**
 * The text shown under the name. Falls back to the same personalized
 * placeholder as in data.ts if a member has no description (yet).
 */
function memberDescription(member: BandMember): string {
  return (
    member.description ??
    `Eine kurze Vorstellung von ${member.name} folgt in Kürze.`
  )
}

function openMemberModal(member: BandMember): void {
  const modal = qs<HTMLElement>('#member-modal')
  const source = qs<HTMLSourceElement>('.member-modal-source', modal)
  const image = qs<HTMLImageElement>('.member-modal-picture', modal)
  const initialsBox = qs<HTMLElement>('.member-modal-initials', modal)
  const role = qs<HTMLElement>('.member-modal-role', modal)
  const name = qs<HTMLElement>('.member-modal-name', modal)
  const description = qs<HTMLElement>('.member-modal-description', modal)
  const email = qs<HTMLElement>('.member-modal-email', modal)

  const picture = image.closest<HTMLPictureElement>('picture')
  if (member.photo) {
    // Real portrait: show the picture, hide the initials placeholder.
    if (picture) picture.hidden = false
    initialsBox.hidden = true
    source.srcset = webpSrcset(member.photo.src, member.photo.width)
    image.src = withBase(member.photo.src)
    image.alt = member.photo.alt
    image.width = member.photo.width
    image.height = member.photo.height
  } else {
    // No portrait: show the big initials avatar instead of the picture.
    if (picture) picture.hidden = true
    initialsBox.hidden = false
    initialsBox.textContent = initialsOf(member)
    source.srcset = ''
  }

  role.textContent = member.role
  name.textContent = member.name
  description.textContent = memberDescription(member)
  email.innerHTML = `<a class="text-gold transition-colors hover:text-cream" href="mailto:${escapeHtml(member.email)}">${escapeHtml(member.email)}</a>`

  modal.hidden = false
}

function closeMemberModal(): void {
  qs<HTMLElement>('#member-modal').hidden = true
}

function setupMemberModal(): void {
  const grid = qs<HTMLElement>('#member-grid')
  const modal = qs<HTMLElement>('#member-modal')
  const closeButton = qs<HTMLButtonElement>('.member-modal-close', modal)

  // Event delegation: one listener on the grid handles every card.
  // The email link sits above the button's stretched ::after overlay
  // (relative z-10), so its clicks never reach the button — the mailto
  // opens, the modal does not. Keyboard users activate the button with
  // Enter/Space natively, so no extra keydown handling is needed.
  grid.addEventListener('click', (event) => {
    const target = event.target as HTMLElement
    const button = target.closest<HTMLButtonElement>('[data-member-index]')

    if (button) {
      const member = bandMembers[Number(button.dataset.memberIndex)]
      if (member) {
        openMemberModal(member)
      }
    }
  })

  closeButton.addEventListener('click', closeMemberModal)

  // Click on the dark background also closes the modal.
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeMemberModal()
    }
  })

  // Escape key closes the modal — the same pattern as the lightboxes.
  document.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeMemberModal()
    }
  })
}

renderIntro()
renderDescription()
renderMembers()
setupMemberModal()
