/**
 * pages/kontakt.ts — the "Kontakt" page with a validated form.
 *
 * Thin DOM wiring: the validators (and their tests) live in src/lib/.
 */
import { initChrome, qs, qsa } from '@/components'
import { contact } from '@/data'
import { escapeHtml } from '@/lib/escape'
import { buildMailtoUrl } from '@/lib/mailto'
import {
  hasError,
  validateDate,
  validateEmail,
  validateMessage,
  validateName,
} from '@/lib/validation'
import type { Validation } from '@/lib/validation'

initChrome('kontakt')

// ---------- 1. Static contact details ----------

function renderContactDetails(): void {
  qs<HTMLElement>('#contact-details').innerHTML = `
    <address class="rounded-lg border border-gold/40 bg-stage-soft px-6 py-5 not-italic leading-relaxed text-cream-dim">
      <p>
        ${escapeHtml(contact.city)}, ${escapeHtml(contact.country)} |
        <a class="text-gold transition-colors hover:text-cream" href="tel:${contact.phone.replace(/\s/g, '')}">
          ${escapeHtml(contact.phone)}
        </a>
      </p>
      <p class="mt-2">
        <a class="text-gold transition-colors hover:text-cream" href="mailto:${escapeHtml(contact.email)}">${escapeHtml(contact.email)}</a>
        &middot;
        <a class="text-gold transition-colors hover:text-cream" href="${contact.facebookUrl}" target="_blank" rel="noopener">Facebook</a>
      </p>
    </address>
  `
}

// ---------- 2. Form handling ----------

function showError(fieldName: string, message: string): void {
  const errorElement = qs<HTMLElement>(`[data-error-for="${fieldName}"]`)
  errorElement.textContent = message
}

function clearErrors(): void {
  qsa<HTMLElement>('[data-error-for]').forEach((element) => {
    element.textContent = ''
  })
}

function setupForm(): void {
  const form = qs<HTMLFormElement>('#contact-form')

  form.addEventListener('submit', (event) => {
    event.preventDefault() // stop the browser's default page reload

    clearErrors()

    // FormData reads all named inputs of the form at once.
    const data = new FormData(form)
    const name = String(data.get('name') ?? '')
    const email = String(data.get('email') ?? '')
    const date = String(data.get('date') ?? '')
    const message = String(data.get('message') ?? '')

    // Validate everything first, then show all problems at once.
    const results: Record<string, Validation> = {
      name: validateName(name),
      email: validateEmail(email),
      date: validateDate(date),
      message: validateMessage(message),
    }

    let allValid = true
    for (const [field, result] of Object.entries(results)) {
      if (hasError(result)) {
        showError(field, result.error)
        allValid = false
      }
    }

    const successMessage = qs<HTMLElement>('#form-success')
    const fallbackMessage = qs<HTMLElement>('#form-fallback')

    if (allValid) {
      // There is no backend (the site is static), so the visitor's own
      // mail program does the sending: it opens with subject and body
      // pre-filled, and the visitor just clicks "send" there.
      window.location.href = buildMailtoUrl(contact.email, {
        name,
        email,
        date,
        message,
      })

      // For visitors without a mail program (e.g. webmail-only), point
      // at the plain address so nothing is lost.
      fallbackMessage.innerHTML = `Kein E-Mail-Programm geöffnet? Schreiben Sie uns direkt an
        <a class="text-gold underline transition-colors hover:text-cream" href="mailto:${escapeHtml(contact.email)}">${escapeHtml(contact.email)}</a>.`

      successMessage.hidden = false
      fallbackMessage.hidden = false
      form.reset()
    } else {
      successMessage.hidden = true
      fallbackMessage.hidden = true
    }
  })
}

renderContactDetails()
setupForm()
