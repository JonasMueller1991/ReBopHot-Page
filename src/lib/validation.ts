/**
 * lib/validation.ts
 * ------------------
 * Form validation as pure functions. Every validator returns a
 * result object: either { valid: true } or the error message.
 */

/** Either ok, or a German error message for the user. */
export type Validation = { valid: true } | { valid: false; error: string }

export function validateName(value: string): Validation {
  if (value.trim().length < 2) {
    return {
      valid: false,
      error: 'Bitte geben Sie Ihren Namen ein (mindestens 2 Zeichen).',
    }
  }
  return { valid: true }
}

export function validateEmail(value: string): Validation {
  // A simple, pragmatic regex — good enough for a client-side first check.
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(value.trim())) {
    return {
      valid: false,
      error: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
    }
  }
  return { valid: true }
}

export function validateDate(value: string): Validation {
  if (value === '') {
    return { valid: true } // optional field
  }
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) {
    return { valid: false, error: 'Bitte geben Sie ein gültiges Datum ein.' }
  }
  return { valid: true }
}

export function validateMessage(value: string): Validation {
  if (value.trim().length < 10) {
    return {
      valid: false,
      error: 'Ihre Nachricht sollte mindestens 10 Zeichen lang sein.',
    }
  }
  return { valid: true }
}

/** Returns true if validation failed; narrows the result to the error case. */
export function hasError(
  result: Validation,
): result is { valid: false; error: string } {
  return result.valid === false
}
