/**
 * Builds a WhatsApp Click-to-Chat (wa.me) link. WhatsApp requires the
 * full international number as digits only - no +, spaces, dashes, or
 * a leading 0/00 before the country code - so the raw input is cleaned
 * before building the link. Verified against numbers written with a
 * leading +, spaces and dashes, a leading international 00 prefix, and
 * plain digits, before being ported here.
 */
export function buildWhatsAppLink(rawNumber, message) {
  const digitsOnly = String(rawNumber || '')
    .replace(/[^0-9]/g, '')
    .replace(/^0+/, '')
  if (!digitsOnly || digitsOnly.length < 7) return null
  const base = `https://wa.me/${digitsOnly}`
  return message?.trim() ? `${base}?text=${encodeURIComponent(message.trim())}` : base
}

/**
 * Wraps selected text with WhatsApp's own markup characters. WhatsApp
 * recognizes *text* as bold, _text_ as italic, ~text~ as strikethrough,
 * and ```text``` as monospace when the message is actually sent -
 * these aren't a custom invention, they're WhatsApp's real, documented
 * formatting syntax.
 */
export const WHATSAPP_FORMATS = {
  bold: { marker: '*', label: 'Bold' },
  italic: { marker: '_', label: 'Italic' },
  strikethrough: { marker: '~', label: 'Strikethrough' },
  monospace: { marker: '```', label: 'Monospace' },
}

export function applyWhatsAppFormat(text, formatId) {
  const format = WHATSAPP_FORMATS[formatId]
  if (!format || !text) return text
  return `${format.marker}${text}${format.marker}`
}
