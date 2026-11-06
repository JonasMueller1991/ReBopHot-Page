/**
 * lib/url.ts
 * ----------
 * Prefixes site-internal paths with the Vite base URL so links work
 * everywhere: in dev mode (base "/") and on GitHub Pages, where the
 * site is served from a sub-path (base "/ReBopHot-Page/").
 *
 * Vite rewrites asset references itself, but not runtime hrefs injected
 * by JavaScript — those have to go through `withBase` by hand.
 */

/** Vite's configured base — "/" in dev, e.g. "/ReBopHot-Page/" in production. */
const base = import.meta.env.BASE_URL

/**
 * `withBase('/termine/')` → '/ReBopHot-Page/termine/' on GitHub Pages
 * and plain '/termine/' in dev mode. Paths that are not root-absolute
 * (external URLs, `#anchors`, `tel:`/`mailto:`) pass through untouched.
 */
export function withBase(path: string): string {
  if (!path.startsWith('/')) return path
  return `${base.replace(/\/$/, '')}${path}`
}
