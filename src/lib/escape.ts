/**
 * lib/escape.ts
 * -------------
 * Pure text helpers — no DOM, no imports, trivially unit-testable.
 */

/** Escape text so it can be safely interpolated into HTML. */
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }
  return text.replace(/[&<>"']/g, (char) => map[char] ?? char)
}
