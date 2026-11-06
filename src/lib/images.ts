/**
 * lib/images.ts
 * --------------
 * Responsive image helpers: the paths and srcset of the WebP variants
 * generated at build time by scripts/generate-image-variants.mjs.
 *
 * The markup never hardcodes variant URLs: it asks this module which
 * variants exist for an image (derived deterministically from its
 * intrinsic width) and gets a ready-to-use <picture> snippet.
 *
 * Pure string building — no DOM, so it is unit-testable like the
 * other lib modules. Only `withBase` ties it to the build.
 */
import { withBase } from '@/lib/url'
import { escapeHtml } from '@/lib/escape'

/**
 * The widths a variant can have — keep in sync with
 * scripts/generate-image-variants.mjs (which only ever generates
 * variants that are not wider than the source).
 */
export const VARIANT_WIDTHS = [480, 768, 1024, 1536] as const

/**
 * Path of one generated WebP variant:
 * '/images/galerie/foo.jpg' → '/images/galerie/foo-480.webp'.
 * The path is NOT base-prefixed — wrap in `withBase` when rendering.
 */
export function variantPath(src: string, width: number): string {
  const extension = src.slice(src.lastIndexOf('.'))
  return `${src.slice(0, -extension.length)}-${width}.webp`
}

/**
 * srcset of every variant not wider than the image's intrinsic
 * width, ready to be interpolated into a <source srcset="...">.
 * Root-absolute paths are base-prefixed via `withBase`.
 */
export function webpSrcset(src: string, intrinsicWidth: number): string {
  return VARIANT_WIDTHS.filter((width) => width <= intrinsicWidth)
    .map((width) => `${withBase(variantPath(src, width))} ${width}w`)
    .join(', ')
}

/** Input for `responsivePictureHtml` — one responsive <picture> element. */
export interface ResponsivePicture {
  /** Original image (JPG/PNG), used as the <img> fallback source */
  src: string
  /** Accessible description */
  alt: string
  /** Intrinsic pixel size — rendered as width/height to avoid layout shift */
  width: number
  height: number
  /**
   * CSS `sizes` of the image — how wide it is displayed at which
   * viewport, so the browser can pick the smallest sufficient variant.
   */
  sizes: string
  /** Utility classes of the <img> (the <picture> wrapper stays bare) */
  className: string
  /** `lazy` for below-the-fold images, omitted otherwise */
  loading?: 'lazy'
  /** CSS `object-position` for non-center crops, e.g. "50% 20%" */
  objectPosition?: string
}

/**
 * A <picture> that serves the WebP variants to browsers that support
 * them (all modern ones do) and falls back to the original file.
 * `alt` and `objectPosition` are escaped; paths go through `withBase`.
 */
export function responsivePictureHtml(picture: ResponsivePicture): string {
  const srcset = webpSrcset(picture.src, picture.width)

  const source = srcset
    ? `<source type="image/webp" srcset="${srcset}" sizes="${picture.sizes}" />`
    : ''

  return `<picture>${source}<img
      src="${withBase(picture.src)}"
      alt="${escapeHtml(picture.alt)}"
      width="${picture.width}"
      height="${picture.height}"
      ${picture.loading ? `loading="${picture.loading}"` : ''}
      class="${picture.className}"
      ${picture.objectPosition ? `style="object-position: ${escapeHtml(picture.objectPosition)}"` : ''}
    /></picture>`
}
