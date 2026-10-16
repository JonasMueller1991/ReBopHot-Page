import { describe, expect, it } from 'vitest'
import { escapeHtml } from './escape'

describe('escapeHtml', () => {
  it('escapes the five HTML-dangerous characters', () => {
    expect(escapeHtml('<script>alert("x")</script>')).toBe(
      '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;',
    )
  })

  it('escapes ampersands first, avoiding double-encoding lookalikes', () => {
    expect(escapeHtml('Tom & Jerry')).toBe('Tom &amp; Jerry')
    expect(escapeHtml('a &amp; b')).toBe('a &amp;amp; b')
  })

  it('escapes single quotes', () => {
    expect(escapeHtml("it's")).toBe('it&#39;s')
  })

  it('leaves plain text untouched', () => {
    expect(escapeHtml('ReBop Hot 2026')).toBe('ReBop Hot 2026')
  })
})
