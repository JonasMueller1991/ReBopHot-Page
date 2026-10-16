/**
 * pages/impressum.ts — the "Impressum" page.
 * It is mostly static HTML; the script only wires up the shared
 * navigation and footer.
 */
import { initChrome } from '../components'

initChrome('impressum')

// Small learning exercise: highlight today's date at the bottom of the page,
// so you can see immediately that the script ran.
const today = new Date().toLocaleDateString('de-DE', {
  weekday: 'long',
  day: '2-digit',
  month: 'long',
  year: 'numeric',
})

const main = document.querySelector('main')
main?.insertAdjacentHTML(
  'beforeend',
  `<p class="page-hint">Stand: ${today} (dieser Hinweis wird per TypeScript eingefügt)</p>`,
)
