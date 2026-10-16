/**
 * components.ts
 * -----------
 * Reusable pieces that every page shares: the navigation and the footer.
 * Each page calls `initChrome('home' | 'band' | ...)` from its own
 * entry script (see src/pages/), which fills the empty <header> and
 * <footer> elements that every HTML page provides.
 */
import type { PageName } from './types'
import { bandName, contact } from './data'

/** Simple helper: escape user-unfriendly characters so text can be
 *  safely interpolated into an HTML string. */
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

  // Build one <a> per link; the current page gets the "active" class.
  const linkHtml = navLinks
    .map(
      (link) =>
        `<a href="${link.href}" class="${link.name === activePage ? 'active' : ''}">${link.label}</a>`,
    )
    .join('')

  header.innerHTML = `
    <div class="nav-inner">
      <a href="index.html" class="logo">${bandName}</a>
      <nav class="site-nav">${linkHtml}</nav>
    </div>
  `
}

function renderFooter(): void {
  const footer = document.getElementById('site-footer')
  if (!footer) return

  footer.innerHTML = `
    <div class="footer-inner">
      <p class="footer-band">${bandName} – Vintage Dance Music</p>
      <p>
        ${contact.city}, ${contact.country} |
        <a href="tel:${contact.phone.replace(/\s/g, '')}">${contact.phone}</a>
      </p>
      <p class="footer-links">
        <a href="${contact.facebookUrl}" target="_blank" rel="noopener">Facebook</a>
        <a href="mailto:${contact.email}">${contact.email}</a>
        <a href="impressum.html">Impressum</a>
      </p>
    </div>
  `
}

/** Fill header and footer. Call this first in every page script. */
export function initChrome(activePage: PageName): void {
  renderHeader(activePage)
  renderFooter()
}
