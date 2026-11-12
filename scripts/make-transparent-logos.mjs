/**
 * make-transparent-logos.mjs
 * --------------------------
 * One-shot (re-runnable) asset prep for the header logos:
 *
 *  - public/Logo_weiß_transparent.jpg -> public/images/logo-white.png
 *    The "white" logo was exported as JPEG, which cannot carry
 *    transparency — the tool flattened the background to solid
 *    white. This script flood-fills from the image edges through
 *    near-white pixels and makes only that background region
 *    transparent, keeping the white letter fills (enclosed by the
 *    gray outlines) intact.
 *
 *  - public/Logo_dunkel.png -> public/images/logo-dark.png
 *    Already a true-alpha PNG; re-encoded and renamed so both
 *    header assets follow the public/images/ convention and the
 *    WebP build pipeline picks them up.
 *
 * Afterwards the originals in public/ are removed.
 *
 * Run via `node scripts/make-transparent-logos.mjs`.
 */
import { rm, stat } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'

const ROOT = new URL('..', import.meta.url).pathname
const WHITE_JPG = join(ROOT, 'public/Logo_weiß_transparent.jpg')
const DARK_PNG = join(ROOT, 'public/Logo_dunkel.png')
const OUT_WHITE = join(ROOT, 'public/images/logo-white.png')
const OUT_DARK = join(ROOT, 'public/images/logo-dark.png')

const exists = (path) =>
  stat(path)
    .then(() => true)
    .catch(() => false)

/**
 * Flood fill from every edge pixel. A pixel is walkable while it is
 * near white (min channel >= 240) — the fill walks the background but
 * stops at the gray letter outlines, so the enclosed white fills are
 * left untouched. Walked pixels become fully transparent; the
 * outlines' own anti-aliased pixels (min < 240) stay opaque, which
 * keeps the edge crisp without a visible halo.
 *
 * Returns the number of walked (made transparent) pixels.
 */
function removeWhiteBackground(data, width, height) {
  const WALKABLE_MIN = 240
  const visited = new Uint8Array(width * height)
  const queue = new Uint32Array(width * height)
  let head = 0
  let tail = 0

  const isWalkable = (index) => {
    const i = index * 4
    return (
      Math.min(data[i], data[i + 1], data[i + 2]) >= WALKABLE_MIN &&
      data[i + 3] > 0
    )
  }

  const enter = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return
    const index = y * width + x
    if (visited[index] || !isWalkable(index)) return
    visited[index] = 1
    queue[tail++] = index
  }

  for (let x = 0; x < width; x++) {
    enter(x, 0)
    enter(x, height - 1)
  }
  for (let y = 0; y < height; y++) {
    enter(0, y)
    enter(width - 1, y)
  }

  while (head < tail) {
    const index = queue[head++]
    const x = index % width
    const y = (index / width) | 0
    enter(x - 1, y)
    enter(x + 1, y)
    enter(x, y - 1)
    enter(x, y + 1)
    data[index * 4 + 3] = 0
  }

  return tail
}

if (!(await exists(WHITE_JPG)) || !(await exists(DARK_PNG))) {
  console.log('logos: originals not found in public/ — nothing to do.')
  process.exit(0)
}

// --- white logo: JPG (white bg) -> transparent PNG -----------------------
const { data, info } = await sharp(WHITE_JPG, { failOn: 'none' })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })

const walked = removeWhiteBackground(data, info.width, info.height)

// "White-ish": after JPEG quantization the letter fills can be 250-254
// instead of exactly 255 — the check only needs to distinguish
// "fills intact" (thousands of pixels) from "fill leaked" (~0).
let opaqueWhite = 0
for (let i = 0; i < data.length; i += 4) {
  if (
    data[i + 3] > 0 &&
    data[i] >= 250 &&
    data[i + 1] >= 250 &&
    data[i + 2] >= 250
  ) {
    opaqueWhite++
  }
}

// If the flood fill leaked through a gap in the outlines, almost no
// opaque white (the letter fills) would remain — fail loudly then.
if (opaqueWhite < 500) {
  console.error(
    `logos: fill seems to have leaked into the lettering ` +
      `(${opaqueWhite} opaque white pixels left, expected thousands). ` +
      `Keeping the JPG, aborting.`,
  )
  process.exit(1)
}

// palette: true shrinks the result a lot (the logo is essentially
// monochrome; lossless RGBA would keep JPEG noise in every flat area)
await sharp(data, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .png({ palette: true })
  .toFile(OUT_WHITE)

// --- dark logo: true-alpha PNG -> re-encode into public/images/ ----------
await sharp(DARK_PNG, { failOn: 'none' }).png().toFile(OUT_DARK)

await rm(WHITE_JPG)
await rm(DARK_PNG)

console.log(
  `logos: walked ${walked} background pixels, kept ${opaqueWhite} opaque white; ` +
    `wrote logo-white.png + logo-dark.png, removed originals.`,
)
