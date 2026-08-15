/**
 * Uses crypto.getRandomValues — the browser's cryptographically secure
 * random number generator, the same class of API used for
 * crypto.randomUUID() elsewhere in Developer Tools — never Math.random(),
 * which is not appropriate for anything security-related.
 */

const CHARSETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
}

export function generatePassword({ length = 16, uppercase = true, lowercase = true, numbers = true, symbols = true }) {
  let charset = ''
  if (uppercase) charset += CHARSETS.uppercase
  if (lowercase) charset += CHARSETS.lowercase
  if (numbers) charset += CHARSETS.numbers
  if (symbols) charset += CHARSETS.symbols

  if (!charset) return ''

  const randomValues = new Uint32Array(length)
  crypto.getRandomValues(randomValues)

  return Array.from(randomValues, (value) => charset[value % charset.length]).join('')
}

/**
 * Entropy-based strength: real bits-of-entropy calculation from the
 * actual character set size and length used, not a cosmetic progress bar
 * with made-up thresholds.
 */
export function calculatePasswordStrength(length, charsetSize) {
  if (!length || !charsetSize) return { label: 'None', score: 0, bits: 0 }
  const bits = Math.round(length * Math.log2(charsetSize))
  if (bits < 40) return { label: 'Weak', score: 1, bits }
  if (bits < 60) return { label: 'Fair', score: 2, bits }
  if (bits < 80) return { label: 'Strong', score: 3, bits }
  return { label: 'Very Strong', score: 4, bits }
}

export function getCharsetSize({ uppercase, lowercase, numbers, symbols }) {
  let size = 0
  if (uppercase) size += CHARSETS.uppercase.length
  if (lowercase) size += CHARSETS.lowercase.length
  if (numbers) size += CHARSETS.numbers.length
  if (symbols) size += CHARSETS.symbols.length
  return size
}
