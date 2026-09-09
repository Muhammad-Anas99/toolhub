/**
 * Escapes a string for safe use inside an HTML attribute value - a
 * genuinely necessary step, since a title or description containing a
 * literal " or < character would otherwise produce broken, invalid
 * markup rather than just an oddly-rendered tag.
 */
function escapeHtmlAttr(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export function generateMetaTags(fields) {
  const lines = []

  if (fields.title) lines.push(`<title>${escapeHtmlAttr(fields.title)}</title>`)
  if (fields.description) lines.push(`<meta name="description" content="${escapeHtmlAttr(fields.description)}">`)
  if (fields.canonicalUrl) lines.push(`<link rel="canonical" href="${escapeHtmlAttr(fields.canonicalUrl)}">`)

  lines.push('')
  lines.push(`<meta property="og:title" content="${escapeHtmlAttr(fields.title)}">`)
  if (fields.description) lines.push(`<meta property="og:description" content="${escapeHtmlAttr(fields.description)}">`)
  lines.push(`<meta property="og:type" content="${escapeHtmlAttr(fields.ogType || 'website')}">`)
  if (fields.canonicalUrl) lines.push(`<meta property="og:url" content="${escapeHtmlAttr(fields.canonicalUrl)}">`)
  if (fields.ogImage) lines.push(`<meta property="og:image" content="${escapeHtmlAttr(fields.ogImage)}">`)
  if (fields.siteName) lines.push(`<meta property="og:site_name" content="${escapeHtmlAttr(fields.siteName)}">`)

  lines.push('')
  lines.push(`<meta name="twitter:card" content="${escapeHtmlAttr(fields.twitterCard || 'summary_large_image')}">`)
  if (fields.title) lines.push(`<meta name="twitter:title" content="${escapeHtmlAttr(fields.title)}">`)
  if (fields.description) lines.push(`<meta name="twitter:description" content="${escapeHtmlAttr(fields.description)}">`)
  if (fields.ogImage) lines.push(`<meta name="twitter:image" content="${escapeHtmlAttr(fields.ogImage)}">`)
  if (fields.twitterHandle) {
    const handle = fields.twitterHandle.startsWith('@') ? fields.twitterHandle : `@${fields.twitterHandle}`
    lines.push(`<meta name="twitter:site" content="${escapeHtmlAttr(handle)}">`)
  }

  return lines.join('\n')
}

export function validateMetaFields(fields) {
  const warnings = []
  if (fields.title && fields.title.length > 60) {
    warnings.push('Titles over about 60 characters often get cut off in search results.')
  }
  if (fields.description && fields.description.length > 160) {
    warnings.push('Descriptions over about 160 characters often get cut off in search results.')
  }
  return warnings
}
