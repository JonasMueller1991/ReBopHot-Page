/**
 * components.ts
 * -----------
 * Shared pieces that every page has: the navigation and the footer.
 * Each HTML page provides an empty <header id="site-header"> and
 * <footer id="site-footer">; the page script fills them via
 * `initChrome('home' | 'band' | ...)` (see src/pages/).
 *
 * All markup uses Tailwind utility classes; the design tokens come
 * from the @theme block in src/tailwind.css.
 */
import type { PageName } from './types'
import { bandName, contact } from './data'

/** Simple helper: escape text so it can be safely interpolated into HTML. */
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }
  return text.replace(/[&<>"']/g, (char) => map[char])
}

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

function renderHeader(activePage: PageName): void {
  const header = document.getElementById('site-header')
  if (!header) return

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
        class="logo-letterpress font-marquee text-2xl"
      >
        ReBop Hot
      </a>
      <nav class="flex flex-wrap gap-1 text-sm uppercase tracking-[0.15em]">
        ${linkHtml}
      </nav>
    </div>
  `
}

function renderFooter(): void {
  const footer = document.getElementById('site-footer')
  if (!footer) return

  footer.className = 'border-t-2 border-gold/60 bg-[#0a0a09]'

  footer.innerHTML = `
    <div class="mx-auto max-w-6xl px-6 py-8 text-center text-sm">
      <p class="font-marquee text-lg text-gold">
        ${bandName} &ndash; Vintage Dance Music
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

/** Fill header and footer. Call this first in every page script. */
export function initChrome(activePage: PageName): void {
  renderHeader(activePage)
  renderFooter()
}
