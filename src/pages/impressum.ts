/**
 * pages/impressum.ts — the "Impressum" page.
 * Mostly static HTML; wires up the shared chrome and adds a "Stand" note
 * so you can see immediately that the script ran.
 */
import { initChrome, qs } from '@/components'

initChrome('impressum')

const today = new Date().toLocaleDateString('de-DE', {
  weekday: 'long',
  day: '2-digit',
  month: 'long',
  year: 'numeric',
})

qs<HTMLElement>('main').insertAdjacentHTML(
  'beforeend',
  `<p class="mt-8 text-sm italic text-cream-dim">Stand: ${today} (dieser Hinweis wird per TypeScript eingefügt)</p>`,
)
