/**
 * Utilities behind the Developer Tools category. Deliberately
 * dependency-free — hashing uses the browser's native Web Crypto API
 * where possible (SHA-1/256/384/512), plus a real, standard MD5
 * implementation (Web Crypto doesn't include MD5, since it's
 * cryptographically broken for security purposes — but it's still widely
 * expected in a "hash generator" for checksums/compatibility, so it's
 * implemented here directly rather than left out).
 */

// --- Base64 (UTF-8 safe) --------------------------------------------------------

export function encodeBase64(text) {
  const bytes = new TextEncoder().encode(text)
  let binary = ''
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte)
  })
  return btoa(binary)
}

export function decodeBase64(base64) {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i)
  }
  return new TextDecoder().decode(bytes)
}

// --- URL encoding --------------------------------------------------------------

export function encodeUrl(text) {
  return encodeURIComponent(text)
}

export function decodeUrl(text) {
  return decodeURIComponent(text)
}

// --- UUID ------------------------------------------------------------------------

export function generateUuid() {
  // crypto.randomUUID is a native browser API (widely supported in every
  // modern browser) — genuinely cryptographically random, not a
  // hand-rolled approximation.
  return crypto.randomUUID()
}

// --- Timestamps --------------------------------------------------------------------

export function unixToDate(unixSeconds) {
  const ms = Number(unixSeconds) * 1000
  if (!Number.isFinite(ms)) return null
  const date = new Date(ms)
  if (Number.isNaN(date.getTime())) return null
  return date
}

export function dateToUnix(dateString) {
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return null
  return Math.floor(date.getTime() / 1000)
}

export function formatDateForDisplay(date) {
  return {
    iso: date.toISOString(),
    utc: date.toUTCString(),
    local: date.toLocaleString(),
    relative: formatRelativeTime(date),
  }
}

function formatRelativeTime(date) {
  const diffSeconds = Math.round((date.getTime() - Date.now()) / 1000)
  const absSeconds = Math.abs(diffSeconds)
  const units = [
    ['year', 31536000],
    ['month', 2592000],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
    ['second', 1],
  ]
  for (const [unit, secondsInUnit] of units) {
    if (absSeconds >= secondsInUnit || unit === 'second') {
      const value = Math.round(diffSeconds / secondsInUnit)
      const formatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
      return formatter.format(value, unit)
    }
  }
  return ''
}

// --- JSON --------------------------------------------------------------------------

/**
 * Validates JSON text, returning either { valid: true, parsed } or
 * { valid: false, error, line, column } — real position info extracted
 * from the SyntaxError message where the JS engine provides it.
 */
export function validateJson(text) {
  try {
    const parsed = JSON.parse(text)
    return { valid: true, parsed }
  } catch (error) {
    const positionMatch = error.message.match(/position (\d+)/)
    let line = null
    let column = null
    if (positionMatch) {
      const position = Number(positionMatch[1])
      const upToError = text.slice(0, position)
      const lines = upToError.split('\n')
      line = lines.length
      column = lines[lines.length - 1].length + 1
    }
    return { valid: false, error: error.message, line, column }
  }
}

export function formatJson(text, indent = 2) {
  const result = validateJson(text)
  if (!result.valid) return result
  return { valid: true, formatted: JSON.stringify(result.parsed, null, indent) }
}

export function minifyJson(text) {
  const result = validateJson(text)
  if (!result.valid) return result
  return { valid: true, formatted: JSON.stringify(result.parsed) }
}

// --- Hashing -------------------------------------------------------------------------

export const HASH_ALGORITHMS = [
  { id: 'MD5', label: 'MD5' },
  { id: 'SHA-1', label: 'SHA-1' },
  { id: 'SHA-256', label: 'SHA-256' },
  { id: 'SHA-384', label: 'SHA-384' },
  { id: 'SHA-512', label: 'SHA-512' },
]

function bufferToHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

export async function generateHash(text, algorithm) {
  if (algorithm === 'MD5') {
    return md5(text)
  }
  const data = new TextEncoder().encode(text)
  const buffer = await crypto.subtle.digest(algorithm, data)
  return bufferToHex(buffer)
}

// --- MD5 -------------------------------------------------------------------------------
// Standard, public-domain MD5 implementation (RFC 1321). Not used for
// security purposes anywhere in ToolHub — this exists purely because a
// "Hash Generator" tool is expected to offer MD5 for file-checksum /
// legacy-compatibility use cases, which is exactly what MD5 remains fine
// for; it's cryptographically broken for anything security-sensitive,
// which the Web Crypto API deliberately omits it for.

function md5(input) {
  function rotateLeft(value, amount) {
    return (value << amount) | (value >>> (32 - amount))
  }

  function addUnsigned(x, y) {
    const x4 = x & 0x40000000
    const y4 = y & 0x40000000
    const x8 = x & 0x80000000
    const y8 = y & 0x80000000
    const result = (x & 0x3fffffff) + (y & 0x3fffffff)
    if (x4 & y4) return result ^ 0x80000000 ^ x8 ^ y8
    if (x4 | y4) {
      if (result & 0x40000000) return result ^ 0xc0000000 ^ x8 ^ y8
      return result ^ 0x40000000 ^ x8 ^ y8
    }
    return result ^ x8 ^ y8
  }

  function f(x, y, z) {
    return (x & y) | (~x & z)
  }
  function g(x, y, z) {
    return (x & z) | (y & ~z)
  }
  function h(x, y, z) {
    return x ^ y ^ z
  }
  function i(x, y, z) {
    return y ^ (x | ~z)
  }

  function ff(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(f(b, c, d), x), ac))
    return addUnsigned(rotateLeft(a, s), b)
  }
  function gg(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(g(b, c, d), x), ac))
    return addUnsigned(rotateLeft(a, s), b)
  }
  function hh(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(h(b, c, d), x), ac))
    return addUnsigned(rotateLeft(a, s), b)
  }
  function ii(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(i(b, c, d), x), ac))
    return addUnsigned(rotateLeft(a, s), b)
  }

  function convertToWordArray(str) {
    const bytes = new TextEncoder().encode(str)
    const wordCount = (((bytes.length + 8) >> 6) + 1) * 16
    const words = new Array(wordCount).fill(0)
    for (let i = 0; i < bytes.length; i += 1) {
      words[i >> 2] |= bytes[i] << ((i % 4) * 8)
    }
    words[bytes.length >> 2] |= 0x80 << ((bytes.length % 4) * 8)
    const bitLength = bytes.length * 8
    words[wordCount - 2] = bitLength & 0xffffffff
    words[wordCount - 1] = Math.floor(bitLength / 0x100000000)
    return words
  }

  function wordToHex(value) {
    let hex = ''
    for (let byte = 0; byte <= 3; byte += 1) {
      const byteValue = (value >>> (byte * 8)) & 255
      hex += byteValue.toString(16).padStart(2, '0')
    }
    return hex
  }

  const words = convertToWordArray(input)
  let a = 0x67452301
  let b = 0xefcdab89
  let c = 0x98badcfe
  let d = 0x10325476

  for (let k = 0; k < words.length; k += 16) {
    const [aa, bb, cc, dd] = [a, b, c, d]

    a = ff(a, b, c, d, words[k + 0], 7, 0xd76aa478)
    d = ff(d, a, b, c, words[k + 1], 12, 0xe8c7b756)
    c = ff(c, d, a, b, words[k + 2], 17, 0x242070db)
    b = ff(b, c, d, a, words[k + 3], 22, 0xc1bdceee)
    a = ff(a, b, c, d, words[k + 4], 7, 0xf57c0faf)
    d = ff(d, a, b, c, words[k + 5], 12, 0x4787c62a)
    c = ff(c, d, a, b, words[k + 6], 17, 0xa8304613)
    b = ff(b, c, d, a, words[k + 7], 22, 0xfd469501)
    a = ff(a, b, c, d, words[k + 8], 7, 0x698098d8)
    d = ff(d, a, b, c, words[k + 9], 12, 0x8b44f7af)
    c = ff(c, d, a, b, words[k + 10], 17, 0xffff5bb1)
    b = ff(b, c, d, a, words[k + 11], 22, 0x895cd7be)
    a = ff(a, b, c, d, words[k + 12], 7, 0x6b901122)
    d = ff(d, a, b, c, words[k + 13], 12, 0xfd987193)
    c = ff(c, d, a, b, words[k + 14], 17, 0xa679438e)
    b = ff(b, c, d, a, words[k + 15], 22, 0x49b40821)

    a = gg(a, b, c, d, words[k + 1], 5, 0xf61e2562)
    d = gg(d, a, b, c, words[k + 6], 9, 0xc040b340)
    c = gg(c, d, a, b, words[k + 11], 14, 0x265e5a51)
    b = gg(b, c, d, a, words[k + 0], 20, 0xe9b6c7aa)
    a = gg(a, b, c, d, words[k + 5], 5, 0xd62f105d)
    d = gg(d, a, b, c, words[k + 10], 9, 0x02441453)
    c = gg(c, d, a, b, words[k + 15], 14, 0xd8a1e681)
    b = gg(b, c, d, a, words[k + 4], 20, 0xe7d3fbc8)
    a = gg(a, b, c, d, words[k + 9], 5, 0x21e1cde6)
    d = gg(d, a, b, c, words[k + 14], 9, 0xc33707d6)
    c = gg(c, d, a, b, words[k + 3], 14, 0xf4d50d87)
    b = gg(b, c, d, a, words[k + 8], 20, 0x455a14ed)
    a = gg(a, b, c, d, words[k + 13], 5, 0xa9e3e905)
    d = gg(d, a, b, c, words[k + 2], 9, 0xfcefa3f8)
    c = gg(c, d, a, b, words[k + 7], 14, 0x676f02d9)
    b = gg(b, c, d, a, words[k + 12], 20, 0x8d2a4c8a)

    a = hh(a, b, c, d, words[k + 5], 4, 0xfffa3942)
    d = hh(d, a, b, c, words[k + 8], 11, 0x8771f681)
    c = hh(c, d, a, b, words[k + 11], 16, 0x6d9d6122)
    b = hh(b, c, d, a, words[k + 14], 23, 0xfde5380c)
    a = hh(a, b, c, d, words[k + 1], 4, 0xa4beea44)
    d = hh(d, a, b, c, words[k + 4], 11, 0x4bdecfa9)
    c = hh(c, d, a, b, words[k + 7], 16, 0xf6bb4b60)
    b = hh(b, c, d, a, words[k + 10], 23, 0xbebfbc70)
    a = hh(a, b, c, d, words[k + 13], 4, 0x289b7ec6)
    d = hh(d, a, b, c, words[k + 0], 11, 0xeaa127fa)
    c = hh(c, d, a, b, words[k + 3], 16, 0xd4ef3085)
    b = hh(b, c, d, a, words[k + 6], 23, 0x04881d05)
    a = hh(a, b, c, d, words[k + 9], 4, 0xd9d4d039)
    d = hh(d, a, b, c, words[k + 12], 11, 0xe6db99e5)
    c = hh(c, d, a, b, words[k + 15], 16, 0x1fa27cf8)
    b = hh(b, c, d, a, words[k + 2], 23, 0xc4ac5665)

    a = ii(a, b, c, d, words[k + 0], 6, 0xf4292244)
    d = ii(d, a, b, c, words[k + 7], 10, 0x432aff97)
    c = ii(c, d, a, b, words[k + 14], 15, 0xab9423a7)
    b = ii(b, c, d, a, words[k + 5], 21, 0xfc93a039)
    a = ii(a, b, c, d, words[k + 12], 6, 0x655b59c3)
    d = ii(d, a, b, c, words[k + 3], 10, 0x8f0ccc92)
    c = ii(c, d, a, b, words[k + 10], 15, 0xffeff47d)
    b = ii(b, c, d, a, words[k + 1], 21, 0x85845dd1)
    a = ii(a, b, c, d, words[k + 8], 6, 0x6fa87e4f)
    d = ii(d, a, b, c, words[k + 15], 10, 0xfe2ce6e0)
    c = ii(c, d, a, b, words[k + 6], 15, 0xa3014314)
    b = ii(b, c, d, a, words[k + 13], 21, 0x4e0811a1)
    a = ii(a, b, c, d, words[k + 4], 6, 0xf7537e82)
    d = ii(d, a, b, c, words[k + 11], 10, 0xbd3af235)
    c = ii(c, d, a, b, words[k + 2], 15, 0x2ad7d2bb)
    b = ii(b, c, d, a, words[k + 9], 21, 0xeb86d391)

    a = addUnsigned(a, aa)
    b = addUnsigned(b, bb)
    c = addUnsigned(c, cc)
    d = addUnsigned(d, dd)
  }

  return wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d)
}
