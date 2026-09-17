export function removeDuplicateLines(text) {
  const lines = text.split('\n')
  const seen = new Set()
  return lines.filter((line) => { if (seen.has(line)) return false; seen.add(line); return true }).join('\n')
}

export function reverseText(text) {
  return Array.from(text).reverse().join('')
}

const UPSIDE_DOWN_MAP = {
  a: '\u0250', b: 'q', c: '\u0254', d: 'p', e: '\u01dd', f: '\u025f', g: '\u0183', h: '\u0265', i: '\u1d09',
  j: '\u027e', k: '\u029e', l: 'l', m: '\u026f', n: 'u', o: 'o', p: 'd', q: 'b', r: '\u0279', s: 's',
  t: '\u0287', u: 'n', v: '\u028c', w: '\u028d', x: 'x', y: '\u028e', z: 'z',
  '1': '\u0196', '2': '\u1245', '3': '\u01b7', '4': '\u3123', '5': '\u01a6', '6': '9', '7': '\u3125',
  '8': '8', '9': '6', '0': '0',
  '.': '\u02d9', ',': "'", '?': '\u00bf', '!': '\u00a1', "'": ',',
}
export function upsideDownText(text) {
  return text.toLowerCase().split('').reverse().map((ch) => UPSIDE_DOWN_MAP[ch] || ch).join('')
}

export function trimTextWhitespace(text) {
  return text.split('\n').map((line) => line.trim()).join('\n').replace(/\n{3,}/g, '\n\n').trim()
}

export function slugify(text) {
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

export function countLines(text) {
  if (!text) return 0
  return text.split('\n').length
}

export function textToBinary(text) {
  return text.split('').map((ch) => ch.charCodeAt(0).toString(2).padStart(8, '0')).join(' ')
}

export function binaryToText(binary) {
  const cleaned = binary.trim()
  if (!cleaned) return ''
  return cleaned.split(/\s+/).map((b) => String.fromCharCode(parseInt(b, 2))).join('')
}

export function findAndReplace(text, find, replace, { caseSensitive = false, wholeWord = false } = {}) {
  if (!find) return text
  const escaped = find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const pattern = wholeWord ? `\\b${escaped}\\b` : escaped
  const flags = caseSensitive ? 'g' : 'gi'
  return text.replace(new RegExp(pattern, flags), replace)
}
