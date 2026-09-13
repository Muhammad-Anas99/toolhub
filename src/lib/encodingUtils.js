const ENTITY_MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
const REVERSE_ENTITY_MAP = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&apos;': "'" }

export function encodeHtmlEntities(text) {
  return text.replace(/[&<>"']/g, (ch) => ENTITY_MAP[ch])
}

export function decodeHtmlEntities(text) {
  return text.replace(/&(amp|lt|gt|quot|#39|apos);/g, (m) => REVERSE_ENTITY_MAP[m])
}

function base64UrlDecode(str) {
  const padded = str.replace(/-/g, '+').replace(/_/g, '/').padEnd(str.length + ((4 - (str.length % 4)) % 4), '=')
  return decodeURIComponent(
    atob(padded)
      .split('')
      .map((c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
      .join('')
  )
}

/**
 * Decodes a JWT's header and payload without verifying its signature
 * - this is a decoder, not a verifier, matching what a JWT debugging
 * tool is actually for (inspecting claims), not confirming
 * authenticity, which would require the issuer's secret or public key.
 * Verified against jwt.io's own well-known reference example token
 * before being ported here.
 */
export function decodeJwt(token) {
  const parts = token.trim().split('.')
  if (parts.length !== 3) throw new Error('This doesn\u2019t look like a valid JWT (expected three dot-separated parts).')
  return {
    header: JSON.parse(base64UrlDecode(parts[0])),
    payload: JSON.parse(base64UrlDecode(parts[1])),
    signature: parts[2],
  }
}
