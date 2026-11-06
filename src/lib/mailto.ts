/**
 * lib/mailto.ts
 * -------------
 * Turns a validated booking inquiry into a `mailto:` URL, so the
 * visitor's own mail program opens with the message pre-filled.
 * Pure string building — no DOM here (wired up in pages/kontakt.ts).
 */

/** The fields of the contact form, already validated. */
export interface InquiryData {
  /** Name of the inquirer. */
  name: string
  /** Reply address of the inquirer. */
  email: string
  /** Optional date of the event, ISO format (YYYY-MM-DD) or empty. */
  date: string
  /** Free-text message. */
  message: string
}

/**
 * Builds the mailto URL for one booking inquiry.
 *
 * Line breaks are CRLF (`%0D%0A` after encoding): some mail clients
 * show `%0A`-only line breaks as a single line, so the body is
 * assembled with `\r\n` throughout.
 */
export function buildMailtoUrl(
  recipient: string,
  inquiry: InquiryData,
): string {
  const subject = inquiry.date
    ? `Buchungsanfrage – ${inquiry.date}`
    : 'Buchungsanfrage'

  const lines = ['Hallo ReBop Hot,', '', inquiry.message]
  if (inquiry.date) {
    lines.push('', `Veranstaltungsdatum: ${inquiry.date}`)
  }
  lines.push('', 'Viele Grüße', inquiry.name, inquiry.email)

  const body = lines.join('\r\n')

  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
