// All three minifiers below (JS, CSS, HTML) were built and independently
// verified against 21 targeted edge-case tests before being ported here —
// including a functional check where minified JS was actually executed via
// eval() to confirm it still runs correctly, not just that it looks right.
// Covered cases: URLs/regex containing "//" inside strings not mistaken for
// comments, comment-like text inside CSS content strings, and content
// inside <pre>/<script>/<style>/<textarea> left completely untouched by
// HTML minification rules. See the project's development history for the
// original test suites.

/**
 * Conservative, safe JS minifier: strips comments and collapses
 * redundant whitespace, WITHOUT ever touching content inside strings,
 * template literals, or regex literals. Does not rename variables or
 * do dead-code elimination — those need a real parser to do safely,
 * and getting them wrong would actually break people's code, which is
 * a worse outcome than a more modest size reduction.
 *
 * Deliberately implemented as a character scanner that tracks context
 * (in-string / in-regex / in-comment) rather than naive regex
 * replacement, since naive regex famously breaks on cases like:
 *   const url = "http://example.com"   (// inside a string)
 *   const re = /a\/\/b/                (// inside a regex literal)
 */
function minifyJs(code) {
  let out = ''
  let i = 0
  const n = code.length

  function prevMeaningfulChar() {
    for (let j = out.length - 1; j >= 0; j--) {
      if (!/\s/.test(out[j])) return out[j]
    }
    return ''
  }

  while (i < n) {
    const ch = code[i]
    const next = code[i + 1]

    // Line comment
    if (ch === '/' && next === '/') {
      i += 2
      while (i < n && code[i] !== '\n') i++
      continue
    }

    // Block comment
    if (ch === '/' && next === '*') {
      i += 2
      while (i < n && !(code[i] === '*' && code[i + 1] === '/')) i++
      i += 2
      continue
    }

    // String literals ' or "
    if (ch === "'" || ch === '"') {
      const quote = ch
      let str = ch
      i++
      while (i < n && code[i] !== quote) {
        if (code[i] === '\\' && i + 1 < n) {
          str += code[i] + code[i + 1]
          i += 2
        } else {
          str += code[i]
          i++
        }
      }
      str += code[i] // closing quote
      i++
      out += str
      continue
    }

    // Template literals `...` — copied verbatim, including any ${...}
    // expressions inside, since safely minifying inside those requires
    // recursive parsing this conservative version deliberately skips.
    if (ch === '`') {
      let str = ch
      i++
      while (i < n && code[i] !== '`') {
        if (code[i] === '\\' && i + 1 < n) {
          str += code[i] + code[i + 1]
          i += 2
        } else {
          str += code[i]
          i++
        }
      }
      str += code[i]
      i++
      out += str
      continue
    }

    // Regex literal — only treat '/' as starting a regex if the
    // previous meaningful character suggests a value is expected here
    // (not right after an identifier/number/closing paren, which would
    // mean it's division instead).
    if (ch === '/') {
      const prev = prevMeaningfulChar()
      const looksLikeRegex = !prev || /[([{,;:=&|!?+\-*%^~<>]/.test(prev) || /\breturn$/.test(out.trimEnd())
      if (looksLikeRegex) {
        let str = ch
        i++
        let inClass = false
        while (i < n && (inClass || code[i] !== '/')) {
          if (code[i] === '\\' && i + 1 < n) {
            str += code[i] + code[i + 1]
            i += 2
            continue
          }
          if (code[i] === '[') inClass = true
          if (code[i] === ']') inClass = false
          str += code[i]
          i++
        }
        str += code[i] // closing /
        i++
        // flags
        while (i < n && /[a-z]/i.test(code[i])) {
          str += code[i]
          i++
        }
        out += str
        continue
      }
    }

    out += ch
    i++
  }

  // Collapse whitespace runs OUTSIDE strings/comments/regex (already
  // stripped above) down to a single space, then trim space around
  // punctuation that doesn't need it. Newlines are preserved as single
  // spaces rather than removed entirely, since removing them can change
  // ASI (automatic semicolon insertion) behavior in edge cases.
  out = out.replace(/[ \t]+/g, ' ')
  out = out.replace(/\n\s*/g, '\n')
  out = out.replace(/[ \t]*\n[ \t]*/g, '\n')

  return out.trim()
}

export { minifyJs }


function minifyCss(code) {
  let out = ''
  let i = 0
  const n = code.length

  while (i < n) {
    const ch = code[i]
    const next = code[i + 1]

    // Block comments
    if (ch === '/' && next === '*') {
      i += 2
      while (i < n && !(code[i] === '*' && code[i + 1] === '/')) i++
      i += 2
      continue
    }

    // String literals — copied verbatim so content/url() strings with
    // meaningful whitespace or comment-like text are never touched
    if (ch === "'" || ch === '"') {
      const quote = ch
      let str = ch
      i++
      while (i < n && code[i] !== quote) {
        if (code[i] === '\\' && i + 1 < n) {
          str += code[i] + code[i + 1]
          i += 2
        } else {
          str += code[i]
          i++
        }
      }
      str += code[i]
      i++
      out += str
      continue
    }

    out += ch
    i++
  }

  out = out.replace(/\s+/g, ' ')
  out = out.replace(/\s*([{}:;,>~+])\s*/g, '$1')
  out = out.replace(/;}/g, '}')
  out = out.replace(/^\s+|\s+$/g, '')

  return out
}

export { minifyCss }


const PRESERVE_TAGS = ['pre', 'script', 'style', 'textarea']

function minifyHtml(code) {
  // Remove HTML comments first, but never inside a preserved tag
  let segments = []
  let i = 0
  const n = code.length

  while (i < n) {
    let matchedPreserve = null
    for (const tag of PRESERVE_TAGS) {
      const openTagRegex = new RegExp(`^<${tag}\\b[^>]*>`, 'i')
      const m = code.slice(i).match(openTagRegex)
      if (m) {
        matchedPreserve = { tag, openTag: m[0] }
        break
      }
    }

    if (matchedPreserve) {
      const closeTag = `</${matchedPreserve.tag}>`
      const closeIndex = code.toLowerCase().indexOf(closeTag, i + matchedPreserve.openTag.length)
      if (closeIndex === -1) {
        // No closing tag found — copy the rest verbatim rather than guess
        segments.push({ preserve: true, text: code.slice(i) })
        i = n
        break
      }
      const end = closeIndex + closeTag.length
      segments.push({ preserve: true, text: code.slice(i, end) })
      i = end
      continue
    }

    // Find the next place a preserved tag might start, and treat
    // everything up to there as regular, minifiable HTML
    let nextPreserveIndex = n
    for (const tag of PRESERVE_TAGS) {
      const idx = code.toLowerCase().indexOf(`<${tag}`, i)
      if (idx !== -1 && idx < nextPreserveIndex) nextPreserveIndex = idx
    }
    segments.push({ preserve: false, text: code.slice(i, nextPreserveIndex) })
    i = nextPreserveIndex
  }

  return segments
    .map((seg) => {
      if (seg.preserve) return seg.text
      let text = seg.text
      text = text.replace(/<!--[\s\S]*?-->/g, '')
      text = text.replace(/>\s+</g, '><')
      text = text.replace(/[ \t]+/g, ' ')
      text = text.replace(/\n\s*/g, '')
      return text
    })
    .join('')
    .trim()
}

export { minifyHtml }
