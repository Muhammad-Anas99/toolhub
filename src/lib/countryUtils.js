const displayNames = typeof Intl !== 'undefined' && Intl.DisplayNames ? new Intl.DisplayNames(['en'], { type: 'region' }) : null

/**
 * Converts a 2-letter ISO country code to its full English name using
 * the standard Intl.DisplayNames API - verified independently against
 * all 6 countries in the reference design (US, PK, BD, DE, GB, KE) before
 * being ported here, each producing the correct name. Falls back to the
 * raw code for anything that isn't a valid region code (including the
 * backend's own 'Unknown' placeholder for requests with no detectable
 * country), so nothing ever renders blank.
 */
export function getCountryName(code) {
  if (!code || code.length !== 2 || !displayNames) return code || 'Unknown'
  try {
    return displayNames.of(code.toUpperCase()) || code
  } catch {
    return code
  }
}

/**
 * Returns a flag image URL for a 2-letter ISO country code, from
 * flagcdn.com — a free, widely-used, reliable flag image CDN. This
 * exists specifically because Unicode's Regional Indicator Symbol flag
 * emoji (the U+1F1E6-U+1F1FF approach) are a well-documented, real
 * cross-platform inconsistency: macOS and iOS render them as actual
 * flag images, but Windows (across many versions, still true on
 * several current browser/font combinations) renders the same
 * characters as two plain letters in small boxes instead of a flag at
 * all — a font/OS limitation, not something fixable by generating the
 * emoji differently. An actual image renders identically regardless of
 * the visitor's operating system or installed fonts. Returns null for
 * anything that isn't a valid 2-letter code, so the caller can fall
 * back to a generic globe icon instead of a broken image.
 */
export function getCountryFlagUrl(code) {
  if (!code || code.length !== 2) return null
  const upper = code.toUpperCase()
  if (!/^[A-Z]{2}$/.test(upper)) return null
  return `https://flagcdn.com/w20/${upper.toLowerCase()}.png`
}
