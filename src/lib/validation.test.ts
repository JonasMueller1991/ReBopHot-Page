import { describe, expect, it } from 'vitest'
import {
  hasError,
  validateDate,
  validateEmail,
  validateMessage,
  validateName,
} from './validation'

describe('validateName', () => {
  it('rejects names shorter than 2 characters', () => {
    const result = validateName(' J ')
    expect(hasError(result)).toBe(true)
  })

  it('accepts ordinary names', () => {
    expect(validateName('Jonas')).toEqual({ valid: true })
  })
})

describe('validateEmail', () => {
  it('rejects strings without an @ or domain', () => {
    expect(hasError(validateEmail('jonas-at-example.de'))).toBe(true)
    expect(hasError(validateEmail('jonas@'))).toBe(true)
  })

  it('accepts a well-formed address', () => {
    expect(validateEmail('jonas@example.de')).toEqual({ valid: true })
  })
})

describe('validateDate', () => {
  it('accepts the empty string because the field is optional', () => {
    expect(validateDate('')).toEqual({ valid: true })
  })

  it('rejects unparseable dates', () => {
    expect(hasError(validateDate('not-a-date'))).toBe(true)
  })

  it('accepts ISO dates', () => {
    expect(validateDate('2027-05-01')).toEqual({ valid: true })
  })
})

describe('validateMessage', () => {
  it('rejects messages shorter than 10 characters', () => {
    expect(hasError(validateMessage('zu kurz'))).toBe(true)
  })

  it('accepts longer messages', () => {
    expect(validateMessage('Bitte spielen Sie auf unserer Party!')).toEqual({
      valid: true,
    })
  })
})

describe('hasError type guard', () => {
  it('exposes the error message only in the error case', () => {
    const result = validateName('')
    if (hasError(result)) {
      expect(result.error.length).toBeGreaterThan(0)
    } else {
      throw new Error('should have been an error')
    }
  })
})
