/**
 * pages/kontakt.ts — the "Kontakt" page with a validated form.
 *
 * Demonstrates: form handling, input validation, union types for
 * the validation result, and narrowing with a type guard.
 */
import { initChrome } from '../components'
import { contact } from '../data'

initChrome('kontakt')

// ---------- 1. Static contact details ----------

function renderContactDetails(): void {
  const section = document.getElementById('contact-details')
  if (!section) return

  section.innerHTML = `
    <address class="rounded-lg border border-gold/40 bg-stage-soft px-6 py-5 not-italic leading-relaxed text-cream-dim">
      <p>
        ${contact.city}, ${contact.country} |
        <a class="text-gold transition-colors hover:text-cream" href="tel:${contact.phone.replace(/\s/g, '')}">
          ${contact.phone}
        </a>
      </p>
      <p class="mt-2">
        <a class="text-gold transition-colors hover:text-cream" href="mailto:${contact.email}">${contact.email}</a>
        &middot;
        <a class="text-gold transition-colors hover:text-cream" href="${contact.facebookUrl}" target="_blank" rel="noopener">Facebook</a>
      </p>
    </address>
  `
}

// ---------- 2. Form validation ----------

/** Every input value comes back from the DOM as a string — so we treat
 *  the validation result as a union: either a message or "ok". */
type Validation = { valid: true } | { valid: false; error: string }

function validateName(value: string): Validation {
  if (value.trim().length < 2) {
    return { valid: false, error: 'Bitte geben Sie Ihren Namen ein (mindestens 2 Zeichen).' }
  }
  return { valid: true }
}

function validateEmail(value: string): Validation {
  // A simple, pragmatic regex — good enough for a client-side first check.
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(value.trim())) {
    return { valid: false, error: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' }
  }
  return { valid: true }
}

function validateDate(value: string): Validation {
  if (value === '') {
    return { valid: true } // optional field
  }
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) {
    return { valid: false, error: 'Bitte geben Sie ein gültiges Datum ein.' }
  }
  return { valid: true }
}

function validateMessage(value: string): Validation {
  if (value.trim().length < 10) {
    return { valid: false, error: 'Ihre Nachricht sollte mindestens 10 Zeichen lang sein.' }
  }
  return { valid: true }
}

/** TypeScript "type guard": narrows a union into the error case. */
function hasError(result: Validation): result is { valid: false; error: string } {
  return result.valid === false
}

function showError(fieldName: string, message: string): void {
  const errorElement = document.querySelector(`[data-error-for="${fieldName}"]`)
  if (errorElement) {
    errorElement.textContent = message
  }
}

function clearErrors(): void {
  document.querySelectorAll('.error').forEach((element) => {
    element.textContent = ''
  })
}

function setupForm(): void {
  const form = document.getElementById('contact-form') as HTMLFormElement | null
  if (!form) return

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

    const successMessage = document.getElementById('form-success')

    if (allValid && successMessage) {
      // A real project would POST this to a server; for learning we
      // keep the message in the browser only.
      console.log('Kontaktanfrage:', { name, email, date, message })
      successMessage.hidden = false
      form.reset()
    } else if (successMessage) {
      successMessage.hidden = true
    }
  })
}

renderContactDetails()
setupForm()
