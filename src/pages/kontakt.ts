/**
 * pages/kontakt.ts — the "Kontakt" page with a validated form.
 *
 * Thin DOM wiring: the validators (and their tests) live in src/lib/.
 */
import { initChrome, qs, qsa } from '@/components'
import { contact } from '@/data'
import { escapeHtml } from '@/lib/escape'
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
  qsa<HTMLElement>('.error').forEach((element) => {
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

    if (allValid) {
      // A real project would POST this to a server; for learning we
      // keep the message in the browser only.
      console.log('Kontaktanfrage:', { name, email, date, message })
      successMessage.hidden = false
      form.reset()
    } else {
      successMessage.hidden = true
    }
  })
}

renderContactDetails()
setupForm()
