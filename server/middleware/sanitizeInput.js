/**
 * Lightweight, dependency-free input sanitization applied to every request
 * body, query, and params object:
 *  - Strips keys starting with "$" or containing "." (NoSQL/Mongo operator
 *    injection, e.g. { "$gt": "" }).
 *  - Strips HTML tags and dangerous URI schemes (javascript:, data:text/html)
 *    from string values.
 *
 * Deliberately does NOT HTML-entity-escape ordinary characters like quotes
 * and apostrophes — the API stores plain text/Markdown, not HTML, and the
 * React frontend already escapes everything it renders. Escaping here too
 * would double-escape and corrupt normal text (e.g. "don't" -> "don&#x27;t").
 * Written by hand rather than pulling in a package so behavior is fully
 * predictable with zero extra dependencies to keep patched.
 */
const HTML_TAG_PATTERN = /<[^>]*>/g
const DANGEROUS_URI_PATTERN = /(javascript|data):/gi

function sanitizeString(value) {
  return value.replace(HTML_TAG_PATTERN, '').replace(DANGEROUS_URI_PATTERN, '')
}

function sanitizeValue(value) {
  if (typeof value === 'string') {
    return sanitizeString(value)
  }

  if (Array.isArray(value)) {
    return value.map(sanitizeValue)
  }

  if (value && typeof value === 'object') {
    return sanitizeObject(value)
  }

  return value
}

function sanitizeObject(input) {
  const output = {}
  for (const [key, value] of Object.entries(input)) {
    if (key.startsWith('$') || key.includes('.')) {
      // Drop the key entirely rather than trying to "clean" it — an
      // operator-injection attempt has no legitimate sanitized form.
      continue
    }
    output[key] = sanitizeValue(value)
  }
  return output
}

export function sanitizeInput(req, res, next) {
  if (req.body && typeof req.body === 'object') {
    req.body = sanitizeObject(req.body)
  }
  if (req.query && typeof req.query === 'object') {
    req.query = sanitizeObject(req.query)
  }
  if (req.params && typeof req.params === 'object') {
    req.params = sanitizeObject(req.params)
  }
  next()
}
