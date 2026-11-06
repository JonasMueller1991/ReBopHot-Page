import { describe, expect, it } from 'vitest'
import { buildMailtoUrl } from './mailto'

const inquiry = {
  name: 'Max Musterfrau',
  email: 'max@example.com',
  date: '',
  message: 'Wir würden euch gern für unser Dorffest buchen!',
}

describe('buildMailtoUrl', () => {
  it('starts with the recipient address', () => {
    expect(buildMailtoUrl('band@rebophot.de', inquiry)).toMatch(
      /^mailto:band@rebophot\.de\?/,
    )
  })

  it('encodes subject and body with encodeURIComponent', () => {
    const url = buildMailtoUrl('band@rebophot.de', inquiry)
    const [, query] = url.split('?')
    const params = new URLSearchParams(query)

    expect(params.get('subject')).toBe('Buchungsanfrage')
    expect(params.get('body')).toBe(
      'Hallo ReBop Hot,\r\n\r\nWir würden euch gern für unser Dorffest buchen!\r\n\r\nViele Grüße\r\nMax Musterfrau\r\nmax@example.com',
    )
  })

  it('uses CRLF line breaks, as some mail clients require', () => {
    const url = buildMailtoUrl('band@rebophot.de', inquiry)
    // Every LF (%0A) must be part of a CRLF pair — no lone line feeds.
    const lfCount = url.match(/%0A/g)?.length ?? 0
    const crlfCount = url.match(/%0D%0A/g)?.length ?? 0
    expect(crlfCount).toBeGreaterThan(0)
    expect(lfCount).toBe(crlfCount)
  })

  it('includes the event date in subject and body when present', () => {
    const url = buildMailtoUrl('band@rebophot.de', {
      ...inquiry,
      date: '2026-12-31',
    })
    const [, query] = url.split('?')
    const params = new URLSearchParams(query)

    expect(params.get('subject')).toBe('Buchungsanfrage – 2026-12-31')
    expect(params.get('body')).toContain('Veranstaltungsdatum: 2026-12-31')
  })

  it('omits the date line when no date was given', () => {
    const url = buildMailtoUrl('band@rebophot.de', inquiry)
    const [, query] = url.split('?')
    const params = new URLSearchParams(query)

    expect(params.get('subject')).toBe('Buchungsanfrage')
    expect(params.get('body')).not.toContain('Veranstaltungsdatum')
  })

  it('survives umlauts, line breaks and special characters', () => {
    const url = buildMailtoUrl('band@rebophot.de', {
      ...inquiry,
      name: 'ÄÖÜ Ölaf Müller-Schmidt',
      message: 'Erste Zeile\n\nZweite Zeile mit & ? = Sonderzeichen',
    })

    // The query separators "?" / "=" / "&" of the URL itself stay
    // literal — only the user-provided values must be encoded.
    expect(url).not.toMatch(/[ÄÖÜäöü\n]/)
  })
})
