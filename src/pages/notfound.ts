/**
 * pages/notfound.ts — the 404 page.
 *
 * Thin DOM wiring: renders the shared chrome (no nav item is active on
 * a 404) and the way-back links. The hrefs go through withBase because
 * GitHub Pages serves the 404 page from any URL depth — relative links
 * would resolve against the (nonexistent) requested path and break.
 */
import { initChrome, qs } from '@/components'
import { withBase } from '@/lib/url'

interface WayBackLink {
  href: string
  label: string
  primary?: boolean
}

const wayBackLinks: WayBackLink[] = [
  { href: '/', label: 'Zur Startseite', primary: true },
  { href: '/termine/', label: 'Zu den Terminen' },
  { href: '/band/', label: 'Zur Band' },
  { href: '/videos/', label: 'Musik hören' },
  { href: '/kontakt/', label: 'Buch uns' },
]

initChrome(null)

qs<HTMLElement>('#notfound-links').innerHTML = wayBackLinks
  .map(
    (link) =>
      `<a href="${withBase(link.href)}" class="${link.primary ? 'btn-retro' : 'btn-retro-outline'}">${link.label}</a>`,
  )
  .join('')
