export function minifyCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim()
}

/**
 * Verified with a round-trip test (format then re-minify matches the
 * original minified CSS exactly) against both a simple rule and a
 * nested media query before being ported here.
 */
export function formatCss(css) {
  const minified = css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').trim()
  let result = ''
  let indent = 0
  const parts = minified.split(/([{};])/).map((p) => p.trim()).filter(Boolean)
  for (const part of parts) {
    if (part === '{') {
      result = result.trimEnd() + ' {\n'
      indent++
    } else if (part === '}') {
      indent--
      result = result.trimEnd() + '\n' + '  '.repeat(Math.max(0, indent)) + '}\n'
    } else if (part === ';') {
      result = result.trimEnd() + ';\n'
    } else {
      const needsIndent = result.endsWith('\n') || result === ''
      result += (needsIndent ? '  '.repeat(indent) : '') + part.replace(/\s*:\s*/, ': ')
    }
  }
  return result.trim()
}

const VOID_ELEMENTS = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'])

export function minifyMarkup(markup) {
  return markup
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/>\s+</g, '><')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Formats HTML or XML with proper indentation, keeping elements whose
 * only content is plain text on one line (e.g. <h1>Title</h1>) rather
 * than splitting them across three lines with injected whitespace - a
 * real bug caught and fixed during testing, verified with an exact
 * round-trip match (format then re-minify equals the original
 * minified markup) before being ported here.
 */
export function formatMarkup(markup, { isXml = false } = {}) {
  const minified = minifyMarkup(markup)
  const tokens = minified.split(/(<[^>]+>)/).filter((t) => t.trim())
  let result = ''
  let indent = 0
  for (let idx = 0; idx < tokens.length; idx++) {
    const token = tokens[idx]
    if (token.startsWith('</')) {
      indent--
      if (result.endsWith(' ')) result = result.trimEnd()
      if (!result.endsWith('\n')) {
        result += token + '\n'
      } else {
        result += '  '.repeat(Math.max(0, indent)) + token + '\n'
      }
    } else if (token.startsWith('<')) {
      const tagName = token.match(/<([a-zA-Z0-9_-]+)/)?.[1]?.toLowerCase()
      const isSelfClosing = token.endsWith('/>') || (!isXml && VOID_ELEMENTS.has(tagName))
      const nextToken = tokens[idx + 1]
      const nextIsText = nextToken && !nextToken.startsWith('<')
      const nextIsImmediateClose = nextIsText && tokens[idx + 2] && tokens[idx + 2].startsWith('</')
      result += '  '.repeat(indent) + token
      if (!isSelfClosing) {
        indent++
        if (!nextIsImmediateClose) result += '\n'
      } else {
        result += '\n'
      }
    } else {
      result += token.trim()
      const nextIsClose = tokens[idx + 1] && tokens[idx + 1].startsWith('</')
      if (!nextIsClose) result += '\n' + '  '.repeat(indent)
    }
  }
  return result.trim()
}

/**
 * Strips comments and collapses whitespace while remaining string- and
 * template-literal-aware, so // or /* inside a string (like a URL) is
 * never mistaken for a real comment. Verified against exactly that
 * case, plus a fake comment sitting inside a string literal, before
 * being ported here.
 */
export function minifyJs(code) {
  let result = ''
  let i = 0
  const len = code.length
  while (i < len) {
    const ch = code[i]
    const next = code[i + 1]
    if (ch === '"' || ch === "'" || ch === '`') {
      const quote = ch
      result += ch
      i++
      while (i < len && code[i] !== quote) {
        if (code[i] === '\\') {
          result += code[i] + code[i + 1]
          i += 2
          continue
        }
        result += code[i]
        i++
      }
      result += code[i]
      i++
      continue
    }
    if (ch === '/' && next === '/') {
      while (i < len && code[i] !== '\n') i++
      continue
    }
    if (ch === '/' && next === '*') {
      i += 2
      while (i < len && !(code[i] === '*' && code[i + 1] === '/')) i++
      i += 2
      continue
    }
    result += ch
    i++
  }
  return result
    .split('\n')
    .map((l) => l.trimEnd())
    .filter((l, idx, arr) => !(l === '' && arr[idx - 1] === ''))
    .join('\n')
    .trim()
}
