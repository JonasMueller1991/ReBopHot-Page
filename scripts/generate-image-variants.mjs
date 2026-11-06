/**
 * generate-image-variants.mjs
 * ---------------------------
 * Build-time image optimization for mobile: walks public/images/,
 * converts every JPG/PNG into responsive WebP variants
 * (480/768/1024/1536px wide) that the markup then serves via
 * <picture>/<source srcset> (see src/lib/images.ts).
 *
 * Why WebP: all modern browsers support it, it keeps PNG alpha, and
 * it typically shinks these photos by 70-90% versus the committed
 * originals. The original files stay untouched as fallbacks.
 *
 * Idempotent: a variant is only regenerated when its source file is
 * newer. Run locally via `npm run images`, or implicitly through
 * `npm run build` (also in the GitHub Pages workflow).
 *
 * Node (no TypeScript): it runs before tsc/vite in the build chain.
 */
import { readdir, stat, unlink } from 'node:fs/promises'
import { extname, join } from 'node:path'
import sharp from 'sharp'

/** The widths the markup can request — keep in sync with src/lib/images.ts. */
export const VARIANT_WIDTHS = [480, 768, 1024, 1536]

const IMAGES_DIR = new URL('../public/images/', import.meta.url).pathname
const WEBP_QUALITY = 78

/** True when the file name looks like a generated variant (foo-480.webp). */
function isVariant(fileName) {
  return /-\d+\.webp$/.test(fileName)
}

/** Recursively list image files (sources only, no generated variants). */
async function collectSourceFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await collectSourceFiles(fullPath)))
    } else if (
      /\.(jpe?g|png)$/i.test(extname(entry.name)) &&
      !isVariant(entry.name)
    ) {
      files.push(fullPath)
    }
  }
  return files
}

/** Generate the WebP variants of one source image. */
async function generateVariants(sourcePath) {
  const sourceStat = await stat(sourcePath)
  const image = sharp(sourcePath, { failOn: 'none' })
  const { width } = await image.metadata()

  const generated = []

  for (const variantWidth of VARIANT_WIDTHS) {
    if (variantWidth > width) continue // never upscale

    const variantPath = sourcePath.replace(
      new RegExp(`\\${extname(sourcePath)}$`),
      `-${variantWidth}.webp`,
    )

    // Idempotency: skip when the variant is already up to date.
    try {
      if ((await stat(variantPath)).mtimeMs >= sourceStat.mtimeMs) continue
    } catch {
      /* no variant yet — generate it below */
    }

    await image
      .clone()
      .resize({ width: variantWidth, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toFile(variantPath)

    generated.push(variantPath)
  }

  return generated
}

/** Remove generated variants that no longer have a matching source. */
async function removeOrphans(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  let removed = 0

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      removed += await removeOrphans(fullPath)
    } else if (isVariant(entry.name)) {
      const sourcePath = fullPath
        .replace(/-\d+(\.webp)$/, '$1')
        .replace(/\.webp$/, '')
      // "foo-480.webp" -> try foo.jpg / foo.jpeg / foo.png
      const candidates = [
        `${sourcePath}.jpg`,
        `${sourcePath}.jpeg`,
        `${sourcePath}.png`,
      ]
      const sourceExists = await Promise.all(
        candidates.map((candidate) =>
          stat(candidate)
            .then(() => true)
            .catch(() => false),
        ),
      )
      if (!sourceExists.some(Boolean)) {
        await unlink(fullPath)
        removed += 1
      }
    }
  }
  return removed
}

const sources = await collectSourceFiles(IMAGES_DIR)
let created = 0
let variantBytes = 0

for (const source of sources) {
  const variants = await generateVariants(source)
  created += variants.length
  for (const variant of variants) {
    variantBytes += (await stat(variant)).size
  }
}

const orphans = await removeOrphans(IMAGES_DIR)

console.log(
  `images: ${created} WebP variant(s) generated from ${sources.length} source(s) ` +
    `(${(variantBytes / 1024 / 1024).toFixed(1)} MB), ${orphans} orphan(s) removed`,
)
