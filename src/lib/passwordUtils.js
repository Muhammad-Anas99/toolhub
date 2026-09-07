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

// --- Password strength checking (for an existing, typed password) ---
// Genuinely different from the generation logic above: rather than reading
// which character types the user WANTS included, this detects which
// character types are actually PRESENT in arbitrary typed text, then
// combines that with common-password and weak-pattern detection - since
// entropy math alone is well-documented to be misleading for passwords
// like "Password123!" (decent character variety, but a notoriously common
// real-world pattern that would be guessed almost immediately).

// A well-documented, stable list of the most common passwords, appearing
// consistently across annual breach-analysis reports for years. Checked
// case-insensitively.
const COMMON_PASSWORDS = new Set([
  '123456', 'password', '123456789', '12345678', '12345', '1234567', 'qwerty',
  'abc123', 'password1', '111111', '123123', 'admin', 'letmein', 'welcome',
  'monkey', 'login', 'dragon', 'passw0rd', 'master', 'hello', 'freedom',
  'whatever', 'qazwsx', 'trustno1', '654321', 'jordan23', 'harley', 'iloveyou',
  'sunshine', 'shadow', 'football', 'baseball', 'superman', 'michael',
  'ninja', 'mustang', 'access', 'flower', 'batman', '1q2w3e4r', 'starwars',
  'princess', 'qwertyuiop', 'solo', 'ashley', '000000', '121212', '1qaz2wsx',
  'zaq1zaq1', 'test', 'guest', 'default', 'changeme', 'welcome1', 'p@ssw0rd',
  'password123', 'admin123', 'root', 'toor', 'aa123456', 'iloveyou1',
  '1234567890', 'qwerty123', 'zxcvbnm', 'asdfghjkl', 'letmein1', '11111111',
])

function hasSequentialRun(password) {
  const lower = password.toLowerCase()
  for (let i = 0; i < lower.length - 2; i++) {
    const a = lower.charCodeAt(i)
    const b = lower.charCodeAt(i + 1)
    const c = lower.charCodeAt(i + 2)
    if (b - a === 1 && c - b === 1) return true
    if (a - b === 1 && b - c === 1) return true
  }
  return false
}

function hasRepeatedRun(password) {
  return /(.)\1\1/.test(password)
}

const KEYBOARD_PATTERNS = ['qwerty', 'asdf', 'zxcv', 'qazwsx', '1qaz', 'qwertyuiop', 'asdfghjkl']
function hasKeyboardPattern(password) {
  const lower = password.toLowerCase()
  return KEYBOARD_PATTERNS.some((pattern) => lower.includes(pattern))
}

function detectCharsetSize(password) {
  let size = 0
  if (/[a-z]/.test(password)) size += 26
  if (/[A-Z]/.test(password)) size += 26
  if (/[0-9]/.test(password)) size += 10
  if (/[^a-zA-Z0-9]/.test(password)) size += 33
  return size
}

export function checkPasswordStrength(password) {
  if (!password) return { label: 'None', score: 0, bits: 0, warnings: [] }

  const charsetSize = detectCharsetSize(password)
  const bits = charsetSize > 0 ? Math.round(password.length * Math.log2(charsetSize)) : 0

  const warnings = []
  const isCommon = COMMON_PASSWORDS.has(password.toLowerCase())
  if (isCommon) warnings.push('This is one of the most commonly used passwords and would be guessed almost instantly.')
  if (hasSequentialRun(password)) warnings.push('Contains a sequential run of characters (like "abc" or "123"), which is easy to guess.')
  if (hasRepeatedRun(password)) warnings.push('Contains the same character repeated 3+ times in a row.')
  if (hasKeyboardPattern(password)) warnings.push('Contains a common keyboard pattern (like "qwerty"), which is checked first by cracking tools.')
  if (password.length < 8) warnings.push('Shorter than 8 characters — modern guidance recommends at least 14–16.')

  let label, score
  if (isCommon || password.length < 6) {
    label = 'Very Weak'
    score = 0
  } else if (hasSequentialRun(password) || hasRepeatedRun(password) || hasKeyboardPattern(password) || bits < 40) {
    label = 'Weak'
    score = 1
  } else if (bits < 60) {
    label = 'Fair'
    score = 2
  } else if (bits < 80) {
    label = 'Strong'
    score = 3
  } else {
    label = 'Very Strong'
    score = 4
  }

  return { label, score, bits, warnings, charsetSize }
}
