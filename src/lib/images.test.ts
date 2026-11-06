import { describe, expect, it } from 'vitest'
import { responsivePictureHtml, variantPath, webpSrcset } from './images'

describe('variantPath', () => {
  it('replaces the extension with a width-suffixed webp variant', () => {
    expect(variantPath('/images/galerie/foo.jpg', 480)).toBe(
      '/images/galerie/foo-480.webp',
    )
  })

  it('handles .jpeg and .png the same way', () => {
    expect(variantPath('/images/a/b.jpeg', 768)).toBe('/images/a/b-768.webp')
    expect(variantPath('/images/c.png', 1536)).toBe('/images/c-1536.webp')
  })
})

describe('webpSrcset', () => {
  it('lists all variants up to the intrinsic width, smallest first', () => {
    expect(webpSrcset('/images/band.jpg', 2000)).toBe(
      '/images/band-480.webp 480w, /images/band-768.webp 768w, ' +
        '/images/band-1024.webp 1024w, /images/band-1536.webp 1536w',
    )
  })

  it('omits variants wider than the intrinsic size', () => {
    // The member portraits are 480px wide: exactly one variant.
    expect(webpSrcset('/images/mitglieder/ilse.png', 480)).toBe(
      '/images/mitglieder/ilse-480.webp 480w',
    )
  })

  it('never upscales: a small image gets the variants that fit', () => {
    expect(webpSrcset('/images/small.jpg', 800)).toBe(
      '/images/small-480.webp 480w, /images/small-768.webp 768w',
    )
  })
})

describe('responsivePictureHtml', () => {
  it('wraps a webp source around the fallback image', () => {
    const html = responsivePictureHtml({
      src: '/images/band.jpg',
      alt: 'Die Band',
      width: 1536,
      height: 1024,
      sizes: '(min-width: 720px) 672px, calc(100vw - 3rem)',
      className: 'w-full',
    })

    expect(html).toContain('<picture>')
    expect(html).toContain('<source type="image/webp"')
    expect(html).toContain(
      'sizes="(min-width: 720px) 672px, calc(100vw - 3rem)"',
    )
    expect(html).toContain('src="/images/band.jpg"')
    expect(html).toContain('alt="Die Band"')
    expect(html).toContain('width="1536"')
    expect(html).toContain('height="1024"')
    expect(html).toContain('class="w-full"')
    expect(html).toContain('</picture>')
  })

  it('passes through lazy loading and the object-position crop', () => {
    const html = responsivePictureHtml({
      src: '/images/m.png',
      alt: 'Porträt',
      width: 480,
      height: 600,
      sizes: '80px',
      className: 'rounded-full',
      loading: 'lazy',
      objectPosition: '50% 20%',
    })

    expect(html).toContain('loading="lazy"')
    expect(html).toContain('style="object-position: 50% 20%"')
  })

  it('escapes alt text and object-position', () => {
    const html = responsivePictureHtml({
      src: '/images/m.png',
      alt: 'Ilse "die Stimme" <Gesang>',
      width: 480,
      height: 600,
      sizes: '80px',
      className: 'rounded',
      objectPosition: '50% 20%" onerror="alert(1)',
    })

    expect(html).toContain('Ilse &quot;die Stimme&quot; &lt;Gesang&gt;')
    expect(html).not.toContain('<Gesang>')
    // The injected quote is escaped, so the payload stays inside the
    // (inert) attribute value and cannot open a new onerror attribute.
    expect(html).toContain(
      'style="object-position: 50% 20%&quot; onerror=&quot;alert(1)"',
    )
  })

  it('renders no source when the image is narrower than every variant', () => {
    const html = responsivePictureHtml({
      src: '/images/tiny.jpg',
      alt: 'Klein',
      width: 300,
      height: 200,
      sizes: '50px',
      className: 'w-12',
    })

    expect(html).not.toContain('<source')
    expect(html).toContain('src="/images/tiny.jpg"')
  })
})
