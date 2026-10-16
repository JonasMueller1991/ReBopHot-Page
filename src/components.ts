/**
 * components.ts
 * -------------
 * Shared pieces that every page has: the fonts, the navigation,
 * the footer, a skip-to-content link, and small typed DOM helpers.
 *
 * Every page provides an empty <header id="site-header"> and
 * <footer id="site-footer">; the page script fills them via
 * `initChrome('home' | 'band' | ...)` (see src/pages/).
 *
 * All markup uses Tailwind utility classes; the design tokens come
 * from the @theme block in src/tailwind.css.
 */

// Self-hosted fonts (@fontsource): loaded through this module so all
// six pages get them via their `initChrome` import — no Google CDN
// request, GDPR-friendly, and identical on every page.
import '@fontsource/pacifico'
import '@fontsource/limelight'
import '@fontsource/oswald/400.css'
import '@fontsource/oswald/600.css'
import '@fontsource/playfair-display/400.css'
import '@fontsource/playfair-display/600.css'
import '@fontsource/playfair-display/400-italic.css'
import '@fontsource/playfair-display/600-italic.css'

import type { PageName } from '@/types'
import { contact } from '@/data'

// ---------------------------------------------------------------------------
// Typed DOM helpers
// ---------------------------------------------------------------------------

/**
 * `querySelector` that throws a helpful error instead of returning null.
 * Use it for elements the page cannot work without — a missing element
 * is a bug you want to see immediately, not a silent `if (!el) return`.
 */
export function qs<T extends Element>(
  selector: string,
  root: ParentNode = document,
): T {
  const element = root.querySelector<T>(selector)
  if (element === null) {
    throw new Error(`Required element not found: "${selector}"`)
  }
  return element
}

/** Typed variant of `querySelectorAll` (no null case to handle). */
export function qsa<T extends Element>(
  selector: string,
  root: ParentNode = document,
): NodeListOf<T> {
  return root.querySelectorAll<T>(selector)
}

// ---------------------------------------------------------------------------
// Shared chrome: skip link, header, footer
// ---------------------------------------------------------------------------

interface NavLink {
  name: PageName
  href: string
  label: string
}

/** The main menu — the same on every page. */
const navLinks: NavLink[] = [
  { name: 'home', href: 'index.html', label: 'Home' },
  { name: 'band', href: 'band.html', label: 'Band' },
  { name: 'termine', href: 'termine.html', label: 'Termine' },
  { name: 'kontakt', href: 'kontakt.html', label: 'Kontakt' },
  { name: 'galerie', href: 'galerie.html', label: 'Galerie' },
  { name: 'impressum', href: 'impressum.html', label: 'Impressum' },
]

/** Accessibility: the first tabbable element jumps straight to the content. */
function renderSkipLink(): void {
  if (document.querySelector('.skip-link') !== null) return

  const link = document.createElement('a')
  link.href = '#main-content'
  link.textContent = 'Zum Inhalt springen'
  link.className =
    'skip-link sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-gold focus:px-4 focus:py-2 focus:font-condensed focus:text-sm focus:text-stage'
  document.body.prepend(link)
}

function renderHeader(activePage: PageName): void {
  const header = qs<HTMLElement>('#site-header')

  // Build one <a> per link; the current page is highlighted in gold.
  const linkHtml = navLinks
    .map((link) => {
      const state =
        link.name === activePage
          ? 'bg-stage-soft text-gold'
          : 'text-cream-dim transition-colors hover:bg-stage-soft hover:text-cream'
      return `<a href="${link.href}" class="rounded-sm px-3 py-1.5 ${state}">${link.label}</a>`
    })
    .join('')

  header.className =
    'sticky top-0 z-20 border-b-2 border-gold/60 bg-stage/85 backdrop-blur'

  header.innerHTML = `
    <div class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-2 px-6 py-3">
      <a
        href="index.html"
        class="logo-letterpress font-script text-3xl leading-none"
      >
        ReBopHot
      </a>
      <nav class="flex flex-wrap gap-1 text-sm uppercase tracking-[0.15em]">
        ${linkHtml}
      </nav>
    </div>
  `
}

function renderFooter(): void {
  const footer = qs<HTMLElement>('#site-footer')

  footer.className = 'border-t-2 border-gold/60 bg-[#0a0a09]'

  footer.innerHTML = `
    <div class="mx-auto max-w-6xl px-6 py-8 text-center text-sm">
      <p class="logo-letterpress font-script text-2xl leading-snug">
        ReBopHot
      </p>
      <p class="mt-1 text-xs uppercase tracking-[0.3em] text-cream-dim">
        Vintage Dance Music
      </p>
      <p class="mt-2 text-cream-dim">
        ${contact.city}, ${contact.country} |
        <a class="text-gold transition-colors hover:text-cream" href="tel:${contact.phone.replace(/\s/g, '')}">${contact.phone}</a>
      </p>
      <p class="mt-3 flex flex-wrap justify-center gap-6 uppercase tracking-[0.15em]">
        <a class="text-gold transition-colors hover:text-cream" href="${contact.facebookUrl}" target="_blank" rel="noopener">Facebook</a>
        <a class="text-gold transition-colors hover:text-cream" href="mailto:${contact.email}">${contact.email}</a>
        <a class="text-gold transition-colors hover:text-cream" href="impressum.html">Impressum</a>
      </p>
    </div>
  `
}

/** Fill skip link, header and footer. Call this first in every page script. */
export function initChrome(activePage: PageName): void {
  renderSkipLink()
  renderHeader(activePage)
  renderFooter()
}
