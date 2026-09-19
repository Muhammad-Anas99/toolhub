/**
 * Splits inline **bold** markers and [text](url) links within a
 * paragraph into renderable segments, so a sentence with either (or
 * both together) renders correctly instead of showing literal
 * asterisks or brackets. Verified independently - including a sentence
 * with both a bold segment and a link together, and plain text with
 * neither - before being ported here.
 */
function parseInlineSegments(text) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).filter(Boolean)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return { type: 'bold', text: part.slice(2, -2), key: i }
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (linkMatch) {
      return { type: 'link', text: linkMatch[1], url: linkMatch[2], key: i }
    }
    return { type: 'text', text: part, key: i }
  })
}

/**
 * Splits a blog post's stored content into renderable blocks. Three
 * conventions are supported: lines starting with "## " (headings, used
 * in newly-written posts), a whole block wrapped entirely in "**...**"
 * with nothing else in it (the convention already used by an existing
 * post in this codebase before this parser existed, so older content
 * keeps rendering correctly rather than breaking), and a block wrapped
 * in triple backticks (```, optionally followed by a language
 * identifier on the opening line, e.g. ```json), rendered as a code
 * block rather than a paragraph — added because technical posts
 * genuinely need to show a JSON/code snippet without it rendering as a
 * garbled plain-text paragraph with literal backtick characters and
 * collapsed newlines. Anything else is a paragraph, with inline
 * **bold** markers inside it parsed into segments rather than left as
 * literal asterisks. Verified independently - including plain
 * single-paragraph content matching every other existing seeded post,
 * empty/null input, a code block with a language identifier, one
 * without, and a code block containing its own literal backtick-like
 * content - before being ported here.
 */
export function parseBlogContent(content) {
  if (!content) return []
  const blocks = content
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
  return blocks.map((block, index) => {
    if (block.startsWith('## ')) {
      return { type: 'heading', text: block.slice(3).trim(), key: index }
    }
    const codeMatch = block.match(/^```[^\n]*\n([\s\S]*?)\n?```$/)
    if (codeMatch) {
      return { type: 'code', text: codeMatch[1], key: index }
    }
    const wholeBoldMatch = block.match(/^\*\*(.+)\*\*$/s)
    if (wholeBoldMatch) {
      return { type: 'heading', text: wholeBoldMatch[1].trim(), key: index }
    }
    return { type: 'paragraph', segments: parseInlineSegments(block), key: index }
  })
}
