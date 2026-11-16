/**
 * make-transparent-logos.mjs
 * --------------------------
 * One-shot (re-runnable) asset prep for the header logos:
 *
 *  - public/Logo_weiß_transparent.jpg + dark logo
 *      -> public/images/logo-white.png
 *
 *    The "white" logo was exported as JPEG, which cannot carry
 *    transparency — and worse: JPEG compression noise pulled the
 *    background around the lettering down to 200-239, sealing e.g.
 *    the band between "ReBop" and the underline off from any
 *    flood-fill approach (a lower threshold eats the letter fills
 *    instead — verified experimentally).
 *
 *    But the dark logo is a true-alpha export of the SAME artwork.
 *    So its alpha channel is used as a mask: keep the white JPEG's
 *    colors (white fills, gray outlines), take the transparency
 *    from the dark logo. The two exports differ by ~1px in size, so
 *    the dark logo is rescaled first and a small offset search then
 *    verifies the alignment (best offset, plus an agreement score
 *    that catches a wrong alpha source).
 *
 *    Alpha source, in order of preference:
 *      1. public/Logo_dunkel.png            (the original export)
 *      2. public/images/logo-dark.png       (the processed logo —
 *         re-running without re-staging the original uses this)
 *
 *  - public/Logo_dunkel.png -> public/images/logo-dark.png
 *    Re-encoded and renamed so both header assets follow the
 *    public/images/ convention (only when the original is staged).
 *
 *  Afterwards the staged white JPEG (and the original dark PNG) is
 *  removed again — Vite would otherwise copy it into dist/. To
 *  re-run later, stage the white JPEG at
 *  public/Logo_weiß_transparent.jpg again.
 *
 * Run via `node scripts/make-transparent-logos.mjs`.
 */
import { rm, stat } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'

const ROOT = new URL('..', import.meta.url).pathname
const WHITE_JPG = join(ROOT, 'public/Logo_weiß_transparent.jpg')
const DARK_PNG = join(ROOT, 'public/Logo_dunkel.png')
const DARK_PROCESSED = join(ROOT, 'public/images/logo-dark.png')
const OUT_WHITE = join(ROOT, 'public/images/logo-white.png')

const exists = (path) =>
  stat(path)
    .then(() => true)
    .catch(() => false)

/**
 * Minimum agreement between the white JPEG and the dark alpha at the
 * best offset ("is there lettering here" matches in both files).
 * Even at the correct alignment the agreement only reaches ~71%: the
 * JPEG noise band counts as "lettering" in the white file wherever
 * the dark logo is transparent. A genuinely different artwork scores
 * ~50% (random overlap), so the threshold sits between the two.
 */
const MIN_AGREEMENT = 0.65

if (!(await exists(WHITE_JPG))) {
  console.log('logos: white JPEG not found in public/ — nothing to do.')
  process.exit(0)
}

// Alpha source: the original dark export if staged, otherwise the
// already-processed dark logo (same artwork, losslessly re-encoded).
let darkSource = null
if (await exists(DARK_PNG)) {
  darkSource = DARK_PNG
} else if (await exists(DARK_PROCESSED)) {
  darkSource = DARK_PROCESSED
} else {
  console.error(
    'logos: no alpha source found — stage public/Logo_dunkel.png ' +
      'or keep public/images/logo-dark.png. Aborting.',
  )
  process.exit(1)
}

// --- white logo: JPEG colors + dark-logo alpha ---------------------------

const white = await sharp(WHITE_JPG, { failOn: 'none' })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })

// The two exports differ by ~1px in size; rescale the alpha source.
const dark = await sharp(darkSource, { failOn: 'none' })
  .resize(white.info.width, white.info.height)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })

const width = white.info.width
const height = white.info.height
const whitePixels = white.data
const darkPixels = dark.data

const darkAlpha = (x, y) =>
  x >= 0 && y >= 0 && x < width && y < height
    ? darkPixels[(y * width + x) * 4 + 3]
    : 0

// The two exports are the same artwork but shifted by a few pixels.
// Find the offset with the best agreement between "lettering here"
// in both files (sampled every 2nd pixel for speed).
let best = { dx: 0, dy: 0, score: -1 }
let samples = 0
for (let y = 2; y < height - 2; y += 2) {
  for (let x = 2; x < width - 2; x += 2) {
    samples++
  }
}
for (let dy = -3; dy <= 3; dy++) {
  for (let dx = -3; dx <= 3; dx++) {
    let score = 0
    for (let y = 2; y < height - 2; y += 2) {
      for (let x = 2; x < width - 2; x += 2) {
        const darkIsDesign = darkAlpha(x - dx, y - dy) > 128
        const i = (y * width + x) * 4
        // In the JPEG, anything that is not clean background counts
        // as design — the noise band below 250 is a constant penalty
        // on every offset and does not skew the ranking.
        const whiteIsDesign =
          Math.min(whitePixels[i], whitePixels[i + 1], whitePixels[i + 2]) < 250
        if (darkIsDesign === whiteIsDesign) score++
      }
    }
    if (score > best.score) best = { dx, dy, score }
  }
}
const agreement = best.score / samples

// Compose: white JPEG RGB + dark alpha at the found offset.
const out = Buffer.from(whitePixels)
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    out[(y * width + x) * 4 + 3] = darkAlpha(x - best.dx, y - best.dy)
  }
}

// Sanity check 1: the lettering survived — the white letter fills
// alone are > 200k pixels.
let opaqueWhite = 0
for (let i = 0; i < width * height; i++) {
  if (
    out[i * 4 + 3] > 0 &&
    out[i * 4] >= 250 &&
    out[i * 4 + 1] >= 250 &&
    out[i * 4 + 2] >= 250
  ) {
    opaqueWhite++
  }
}
if (opaqueWhite < 50000) {
  console.error(
    `logos: masking kept only ${opaqueWhite} white lettering pixels ` +
      `(expected > 200k) — the alpha source seems wrong. ` +
      `Keeping the JPEG, aborting.`,
  )
  process.exit(1)
}

// Sanity check 2: the alpha source matches the artwork. The mask
// copies the dark logo's alpha 1:1, so background cannot survive by
// construction — the real risk is a wrong/other artwork as the
// alpha source, which shows up as poor agreement.
if (agreement < MIN_AGREEMENT) {
  console.error(
    `logos: only ${(100 * agreement).toFixed(1)}% agreement between ` +
      `the white JPEG and the dark alpha (expected > ${100 * MIN_AGREEMENT}%) — ` +
      `the alpha source does not seem to be the same artwork. ` +
      `Keeping the JPEG, aborting.`,
  )
  process.exit(1)
}

// palette: true shrinks the result a lot (the logo is essentially
// monochrome; lossless RGBA would keep JPEG noise in every flat area)
await sharp(out, {
  raw: { width, height, channels: 4 },
})
  .png({ palette: true })
  .toFile(OUT_WHITE)

// --- dark logo: re-encode the original when it was staged ----------------

if (darkSource === DARK_PNG) {
  await sharp(DARK_PNG, { failOn: 'none' }).png().toFile(DARK_PROCESSED)
  await rm(DARK_PNG)
}

// The staged white JPEG is removed again — Vite would otherwise copy
// it into dist/ (and the processed logo now carries its colors).
await rm(WHITE_JPG)

console.log(
  `logos: masked with dark alpha (offset ${best.dx},${best.dy}, ` +
    `${(100 * agreement).toFixed(1)}% agreement); ` +
    `kept ${opaqueWhite} white lettering pixels; ` +
    `wrote logo-white.png${darkSource === DARK_PNG ? ' + logo-dark.png' : ''}.`,
)
