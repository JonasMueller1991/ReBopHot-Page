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
import { initTheme } from '@/theme'
import { withBase } from '@/lib/url'

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

/** The main menu — the same on every page.
 *  Href are root-absolute; `withBase` prefixes them at render time so
 *  they work from every directory depth *and* under the GitHub Pages
 *  sub-path (see src/lib/url.ts). */
const navLinks: NavLink[] = [
  { name: 'home', href: '/', label: 'Home' },
  { name: 'band', href: '/band/', label: 'Band' },
  { name: 'termine', href: '/termine/', label: 'Termine' },
  { name: 'kontakt', href: '/kontakt/', label: 'Kontakt' },
  { name: 'videos', href: '/videos/', label: 'Musik & Video' },
  { name: 'galerie', href: '/galerie/', label: 'Galerie' },
  { name: 'impressum', href: '/impressum/', label: 'Impressum' },
]

/** Accessibility: the first tabbable element jumps straight to the content. */
function renderSkipLink(): void {
  if (document.querySelector('.skip-link') !== null) return

  const link = document.createElement('a')
  link.href = '#main-content'
  link.textContent = 'Zum Inhalt springen'
  link.className =
    'skip-link sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-gold-pop focus:px-4 focus:py-2 focus:font-condensed focus:text-sm focus:text-ink'
  document.body.prepend(link)
}

function renderHeader(activePage: PageName): void {
  const header = qs<HTMLElement>('#site-header')

  // Build one <a> per link; the current page is highlighted in gold.
  // max-lg:py-3 gives the drawer links touch targets of 44px+ on
  // phones; the horizontal nav keeps its tighter py-1.5.
  const linkHtml = navLinks
    .map((link) => {
      const state =
        link.name === activePage
          ? 'bg-stage-soft text-gold'
          : 'text-cream-dim transition-colors hover:bg-stage-soft hover:text-cream'
      return `<a href="${withBase(link.href)}" class="rounded-sm px-3 py-1.5 max-lg:py-3 ${state}">${link.label}</a>`
    })
    .join('')

  header.className =
    'sticky top-0 z-20 border-b-2 border-gold/60 bg-stage/85 backdrop-blur'

  header.innerHTML = `
    <div class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-2 px-6 py-3">
      <a
        href="${withBase('/')}"
        class="logo-letterpress font-script text-3xl leading-none"
      >
        ReBopHot
      </a>
      <div class="flex items-center gap-3">
        <!-- One nav, two shapes: a horizontal row from lg up, and a
             full-width drawer dropping down under the header bar on
             smaller screens. The burger key below lg shows and hides
             it (setupMobileNav at the bottom of this file). -->
        <nav
          id="site-nav"
          aria-label="Hauptnavigation"
          class="max-lg:hidden max-lg:absolute max-lg:inset-x-0 max-lg:top-full max-lg:flex-col max-lg:gap-1 max-lg:border-b-2 max-lg:border-gold/60 max-lg:bg-stage max-lg:px-6 max-lg:py-3 max-lg:shadow-xl lg:flex-wrap text-sm uppercase tracking-[0.15em]"
        >
          ${linkHtml}
        </nav>
        <!-- Light/dark switch: a small jukebox-style key. The icons
             state what clicking switches to (sun = go light, moon =
             go dark); visibility is driven by html[data-theme] in
             tailwind.css, the label by src/theme.ts. -->
        <button
          type="button"
          id="theme-toggle"
          class="grid h-11 w-11 place-items-center rounded-full border-2 border-gold/60 bg-stage-soft text-gold transition-colors hover:border-gold"
          aria-label="Farbe wechseln"
        >
          <svg
            class="theme-icon-sun h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4" />
            <path
              d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"
            />
          </svg>
          <svg
            class="theme-icon-moon h-5 w-5"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M20.6 14.6A8.5 8.5 0 0 1 9.4 3.4a8.5 8.5 0 1 0 11.2 11.2z"
            />
          </svg>
        </button>
        <!-- Burger key: opens the nav drawer below lg (the bars morph
             into an X while the menu is open — see .burger in
             tailwind.css). Hidden on desktop, where the nav is
             always a horizontal row. -->
        <button
          type="button"
          id="nav-toggle"
          class="burger relative grid h-11 w-11 place-items-center rounded-full border-2 border-gold/60 bg-stage-soft text-gold transition-colors hover:border-gold lg:hidden"
          aria-expanded="false"
          aria-controls="site-nav"
          aria-label="Menü öffnen"
        >
          <span class="burger-bar burger-bar-top" aria-hidden="true"></span>
          <span class="burger-bar burger-bar-middle" aria-hidden="true"></span>
          <span class="burger-bar burger-bar-bottom" aria-hidden="true"></span>
        </button>
      </div>
    </div>
  `

  setupMobileNav(header)
}

/** Toggle logic of the mobile nav drawer (see renderHeader above). */
function setupMobileNav(header: HTMLElement): void {
  const nav = qs<HTMLElement>('#site-nav', header)
  const toggle = qs<HTMLButtonElement>('#nav-toggle', header)

  const isOpen = (): boolean => toggle.getAttribute('aria-expanded') === 'true'

  const setOpen = (open: boolean): void => {
    nav.classList.toggle('max-lg:hidden', !open)
    toggle.setAttribute('aria-expanded', String(open))
    toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen')
  }

  toggle.addEventListener('click', () => {
    setOpen(!isOpen())
  })

  // Escape closes the drawer — the same pattern as the lightboxes.
  document.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setOpen(false)
    }
  })

  // Clicking anywhere outside the header closes the drawer too.
  document.addEventListener('click', (event: MouseEvent) => {
    if (isOpen() && !header.contains(event.target as Node)) {
      setOpen(false)
    }
  })

  // Turning a phone sideways (viewport ≥ lg) turns the drawer back
  // into the horizontal nav — reset the toggle state with it.
  window
    .matchMedia('(min-width: 1024px)')
    .addEventListener('change', (event) => {
      if (event.matches) {
        setOpen(false)
      }
    })
}

function renderFooter(): void {
  const footer = qs<HTMLElement>('#site-footer')

  // The footer band follows the theme: near-black on the dark stage,
  // deep paper under a bronze rule in light mode (--color-footer).
  footer.className = 'border-t-2 border-gold/60 bg-footer'

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
        <a class="text-gold transition-colors hover:text-cream" href="${withBase('/impressum/')}">Impressum</a>
      </p>
    </div>
  `
}

/** Fill skip link, header and footer. Call this first in every page script. */
export function initChrome(activePage: PageName): void {
  renderSkipLink()
  renderHeader(activePage)
  renderFooter()
  initTheme()
}
