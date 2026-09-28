/**
 * Windows FILETIME conversion logic.
 *
 * A FILETIME is an unsigned 64-bit count of 100-nanosecond intervals ("ticks")
 * since 1601-01-01 00:00:00 UTC. Current values are around 1.3e17, far past
 * JavaScript's safe integer limit (2^53 - 1 ≈ 9e15), so every calculation here
 * uses BigInt. Converting through a regular Number would silently round the
 * low digits, which for a value like 133801632000000000 means being off by
 * tens of seconds without any error.
 */

const TICKS_PER_SECOND = 10000000n
const TICKS_PER_MS = 10000n

// 1601-01-01 to 1970-01-01 = 11,644,473,600 seconds.
const UNIX_EPOCH_AS_FILETIME = 116444736000000000n

// .NET's DateTime.Ticks counts from 0001-01-01. 1600 years earlier than
// the FILETIME epoch = 584,388 days (388 leap days in years 1-1600).
const FILETIME_AS_DOTNET_TICKS = 504911232000000000n

export const MAX_FILETIME = 0xffffffffffffffffn
export const MAX_SIGNED_64 = 0x7fffffffffffffffn

function floorDiv(a, b) {
  // BigInt division truncates toward zero; dates before 1970 need floor.
  let quotient = a / b
  if (a % b < 0n) quotient -= 1n
  return quotient
}

function pad(value, width) {
  return String(value).padStart(width, '0')
}

/**
 * Parses LDAP "Generalized Time", the text format Active Directory uses for
 * whenCreated and whenChanged, e.g. 20250101120000.0Z. Only the full
 * 14-digit form (YYYYMMDDHHMMSS) is accepted, with an optional fraction of a
 * second and a required "Z" or numeric offset (+0500, -05, ...).
 *
 * The trailing Z / offset is what makes this unambiguous: a bare 14-digit
 * number with neither is left alone, because it is just as likely to be a
 * decimal FILETIME.
 *
 * Returns the moment as a FILETIME, keeping up to 7 fractional digits
 * (100 ns); anything finer is truncated.
 */
export function parseGeneralizedTime(raw) {
  const text = String(raw ?? '').trim()
  const match = /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(?:[.,](\d+))?(Z|[+-]\d{2}(?:\d{2})?)$/i.exec(text)
  if (!match) return null

  const [, y, mo, d, h, mi, s, fraction = '', zone] = match
  const year = Number(y), month = Number(mo), day = Number(d)
  const hour = Number(h), minute = Number(mi), second = Number(s)
  if (month < 1 || month > 12 || hour > 23 || minute > 59 || second > 59) {
    return { ok: false, error: 'That looks like an LDAP time, but one of its parts (month, hour, minute or second) is out of range.' }
  }

  // Build the moment as if it were UTC, then check the date really exists
  // (rejects 20250230...) by reading the components back.
  const date = new Date(0)
  date.setUTCFullYear(year, month - 1, day)
  date.setUTCHours(hour, minute, second, 0)
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) {
    return { ok: false, error: 'That looks like an LDAP time, but that date doesn\u2019t exist.' }
  }

  let offsetMinutes = 0
  if (zone.toUpperCase() !== 'Z') {
    const sign = zone[0] === '-' ? -1 : 1
    const offsetHours = Number(zone.slice(1, 3))
    const offsetMins = zone.length > 3 ? Number(zone.slice(3, 5)) : 0
    if (offsetHours > 23 || offsetMins > 59) {
      return { ok: false, error: 'That looks like an LDAP time, but its timezone offset isn\u2019t valid.' }
    }
    offsetMinutes = sign * (offsetHours * 60 + offsetMins)
  }

  // A local time at +05:00 is 5 hours ahead of UTC, so subtract the offset.
  const utcMs = date.getTime() - offsetMinutes * 60000
  const fractionTicks = BigInt((fraction + '0000000').slice(0, 7))
  const wholeSeconds = BigInt(Math.floor(utcMs / 1000))
  const value = (wholeSeconds + 11644473600n) * TICKS_PER_SECOND + fractionTicks

  if (value < 0n) {
    return { ok: false, error: 'A FILETIME can\u2019t represent dates before 1 January 1601.' }
  }
  return { ok: true, value, format: 'generalized' }
}

/**
 * Parses user input as a FILETIME. Accepts decimal ("133801632000000000"),
 * hex with a 0x prefix ("0x01DB5E5F3A2B4000"), or bare hex containing at
 * least one a-f letter (a purely numeric string is always read as decimal,
 * since there's no way to tell "12345" apart otherwise). Spaces, commas and
 * underscores are ignored so a value copied from a spreadsheet or a
 * formatted log still works.
 */
export function parseFiletime(raw) {
  const generalized = parseGeneralizedTime(raw)
  if (generalized) return generalized

  const cleaned = String(raw ?? '').trim().replace(/[\s,_]/g, '')
  if (cleaned === '') return { ok: false, empty: true }

  if (cleaned.startsWith('-')) {
    return { ok: false, error: 'A FILETIME is unsigned, so a negative number isn\u2019t a valid value.' }
  }

  let value
  let format
  if (/^0x[0-9a-f]+$/i.test(cleaned)) {
    value = BigInt(cleaned)
    format = 'hex'
  } else if (/^[0-9a-f]+$/i.test(cleaned) && /[a-f]/i.test(cleaned)) {
    value = BigInt('0x' + cleaned)
    format = 'hex'
  } else if (/^[0-9]+$/.test(cleaned)) {
    value = BigInt(cleaned)
    format = 'decimal'
  } else {
    return { ok: false, error: 'Enter a FILETIME as a decimal number (like 133801632000000000), hex (like 0x01DB5BE019BA4000), or an LDAP time (like 20250101120000.0Z).' }
  }

  if (value > MAX_FILETIME) {
    return { ok: false, error: 'That\u2019s larger than a 64-bit FILETIME can hold.' }
  }
  return { ok: true, value, format }
}

export function formatIso(date, fractionTicks) {
  const year = date.getUTCFullYear()
  const yearText = year >= 0 && year <= 9999 ? pad(year, 4) : (year < 0 ? '-' : '+') + pad(Math.abs(year), 6)
  return (
    `${yearText}-${pad(date.getUTCMonth() + 1, 2)}-${pad(date.getUTCDate(), 2)}` +
    `T${pad(date.getUTCHours(), 2)}:${pad(date.getUTCMinutes(), 2)}:${pad(date.getUTCSeconds(), 2)}` +
    `.${pad(fractionTicks.toString(), 7)}Z`
  )
}

export function toHex(value) {
  return '0x' + value.toString(16).toUpperCase().padStart(16, '0')
}

/**
 * Everything derivable from one FILETIME value. The UTC string keeps the
 * full 100ns precision (7 fractional digits) rather than rounding to
 * milliseconds like a JavaScript Date would.
 */
export function describeFiletime(value) {
  const ticksSinceUnix = value - UNIX_EPOCH_AS_FILETIME
  const unixSeconds = floorDiv(ticksSinceUnix, TICKS_PER_SECOND)
  const fractionTicks = ticksSinceUnix - unixSeconds * TICKS_PER_SECOND
  const unixMs = floorDiv(ticksSinceUnix, TICKS_PER_MS)

  // |unixSeconds| <= ~1.8e12 for any 64-bit FILETIME, so seconds * 1000
  // stays well inside a JavaScript Date's range (about 8.64e15 ms).
  const date = new Date(Number(unixSeconds) * 1000)

  return {
    value,
    decimal: value.toString(),
    hex: toHex(value),
    highDword: value >> 32n,
    lowDword: value & 0xffffffffn,
    unixSeconds: unixSeconds.toString(),
    unixMs: unixMs.toString(),
    dotNetTicks: (value + FILETIME_AS_DOTNET_TICKS).toString(),
    date,
    iso: formatIso(date, fractionTicks),
  }
}

/**
 * Converts a JavaScript timestamp in ms (an integer) to a FILETIME.
 * Fails for anything before 1601-01-01 UTC, which a FILETIME can't represent.
 */
export function millisToFiletime(ms) {
  if (!Number.isFinite(ms)) return { ok: false, error: 'That date isn\u2019t valid.' }
  const value = (BigInt(Math.trunc(ms)) + 11644473600000n) * TICKS_PER_MS
  if (value < 0n) {
    return { ok: false, error: 'A FILETIME can\u2019t represent dates before 1 January 1601.' }
  }
  if (value > MAX_FILETIME) {
    return { ok: false, error: 'That date is too far in the future for a 64-bit FILETIME.' }
  }
  return { ok: true, value }
}

/**
 * Parses a <input type="datetime-local"> value as either UTC or the
 * viewer's local time. Uses setUTCFullYear/setFullYear rather than
 * Date.UTC/new Date(y, ...) so years below 100 aren't silently remapped to
 * 19xx, which the shorter forms do.
 */
export function dateInputToMillis(text, mode) {
  const match = /^(\d{4,})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?$/.exec(String(text ?? '').trim())
  if (!match) return NaN
  const [, y, mo, d, h, mi, s] = match
  const date = new Date(0)
  if (mode === 'local') {
    date.setFullYear(Number(y), Number(mo) - 1, Number(d))
    date.setHours(Number(h), Number(mi), Number(s || 0), 0)
  } else {
    date.setUTCFullYear(Number(y), Number(mo) - 1, Number(d))
    date.setUTCHours(Number(h), Number(mi), Number(s || 0), 0)
  }
  return date.getTime()
}

export function currentFiletime() {
  return (BigInt(Date.now()) + 11644473600000n) * TICKS_PER_MS
}

/**
 * Plain-language notes for values Windows and Active Directory give special
 * meaning to. Returns null for ordinary values.
 */
export function describeSpecialValue(value) {
  if (value === 0n) {
    return 'A FILETIME of 0 is 1 January 1601, but Windows and Active Directory often use 0 to mean \u201cnot set.\u201d For example, accountExpires = 0 means the account never expires, and pwdLastSet = 0 means the password must be changed at next logon.'
  }
  if (value === MAX_SIGNED_64) {
    return '9223372036854775807 (0x7FFFFFFFFFFFFFFF) is the largest signed 64-bit value. Active Directory uses it to mean \u201cnever\u201d \u2014 for example, accountExpires set to this value means the account never expires.'
  }
  return null
}

/**
 * A real FILETIME for any date after 1604 is above 1e15. Anything tiny but
 * non-zero (for example a 14-digit number) lands in the first years of 1601,
 * which almost always means the number isn't a FILETIME at all - a date
 * written as digits, or a Unix timestamp - rather than a genuine 1601 date.
 */
export function describeSuspiciousValue(value) {
  if (value > 0n && value < 1000000000000000n) {
    return 'This value falls in the first few years of 1601, which usually means it isn\u2019t a FILETIME. A real FILETIME for a modern date has about 18 digits. It may be a Unix timestamp, or a date written as digits (like 20250101120000).'
  }
  return null
}

/**
 * Converts one FILETIME per line. Blank lines are skipped; a line that
 * can't be parsed gets its own error instead of aborting the whole batch,
 * since a pasted column of AD values usually has a header or a stray blank
 * cell in it.
 */
export function convertBatch(text, maxLines = 500) {
  const lines = String(text ?? '').split(/\r?\n/)
  const rows = []
  let truncated = false

  for (const line of lines) {
    if (line.trim() === '') continue
    if (rows.length >= maxLines) {
      truncated = true
      break
    }
    const parsed = parseFiletime(line)
    if (parsed.ok) {
      const described = describeFiletime(parsed.value)
      rows.push({ input: line.trim(), ok: true, iso: described.iso, unixSeconds: described.unixSeconds })
    } else {
      rows.push({ input: line.trim(), ok: false, error: parsed.error || 'Not a valid FILETIME.' })
    }
  }

  return { rows, truncated }
}
