/**
 * theme.ts
 * ---------
 * Light & dark mode for the whole site.
 *
 * The look is chosen before first paint by a tiny inline script in
 * every HTML <head> (so the page never flashes the wrong mode): a
 * saved choice in localStorage wins, otherwise the OS preference
 * decides, and dark — the band's stage look — is the fallback.
 *
 * This module keeps the sun/moon button in the header (rendered by
 * src/components.ts) in sync and persists the visitor's choice on
 * every toggle. The colors themselves live in src/tailwind.css:
 * the tokens are re-pinned under html[data-theme='light'].
 */

/** The two looks of the site. Dark is the brand default. */
export type Theme = 'dark' | 'light'

/** localStorage key — shared with the inline head scripts. */
const STORAGE_KEY = 'rebophot-theme'

/** The visitor's saved choice, or null when nothing is stored. */
export function storedTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored === 'light' || stored === 'dark' ? stored : null
  } catch {
    // Storage unavailable (blocked or unsupported): like nothing saved.
    return null
  }
}

/** The OS preference; dark when the OS has no opinion. */
export function systemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark'
}

/** The theme currently applied to <html>. */
export function currentTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme
}

/**
 * Flip to the other theme, remember the choice and return it.
 * Toggling always stores an explicit choice, which then beats the
 * OS preference on the next visit.
 */
export function toggleTheme(): Theme {
  const next: Theme = currentTheme() === 'light' ? 'dark' : 'light'
  applyTheme(next)
  try {
    localStorage.setItem(STORAGE_KEY, next)
  } catch {
    // Storage unavailable: the choice lives until the next page load.
  }
  return next
}

/** What the header button should announce for the given theme. */
function toggleLabel(theme: Theme): string {
  return theme === 'dark'
    ? 'Zum hellen Design wechseln'
    : 'Zum dunklen Design wechseln'
}

/** Bring the header button's label in line with the applied theme. */
function updateToggleButton(): void {
  const button = document.getElementById('theme-toggle')
  if (button === null) return

  const label = toggleLabel(currentTheme())
  button.setAttribute('aria-label', label)
  button.setAttribute('title', label)
}

/**
 * Wire the theme up once the header has been rendered: make sure a
 * theme is applied (the head script normally did that already) and
 * hook the toggle button. Called from initChrome() on every page.
 */
export function initTheme(): void {
  if (document.documentElement.dataset.theme === undefined) {
    applyTheme(storedTheme() ?? systemTheme())
  }

  updateToggleButton()

  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    toggleTheme()
    updateToggleButton()
  })
}
