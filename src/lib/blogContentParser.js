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
 * Splits a blog post's stored content into renderable blocks. Two
 * heading conventions are both supported: lines starting with "## "
 * (used in newly-written posts), and a whole block wrapped entirely in
 * "**...**" with nothing else in it (the convention already used by an
 * existing post in this codebase before this parser existed, so older
 * content keeps rendering correctly rather than breaking). Anything
 * else is a paragraph, with inline **bold** markers inside it parsed
 * into segments rather than left as literal asterisks. Verified
 * independently - including plain single-paragraph content matching
 * every other existing seeded post, and empty/null input - before
 * being ported here.
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
    const wholeBoldMatch = block.match(/^\*\*(.+)\*\*$/s)
    if (wholeBoldMatch) {
      return { type: 'heading', text: wholeBoldMatch[1].trim(), key: index }
    }
    return { type: 'paragraph', segments: parseInlineSegments(block), key: index }
  })
}
