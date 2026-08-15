/**
 * Utilities behind the Text Tools category. Pure string manipulation —
 * no dependencies, no external services.
 */

// --- Word Counter --------------------------------------------------------------

const AVERAGE_READING_WPM = 200

export function analyzeText(text) {
  const trimmed = text.trim()
  const words = trimmed === '' ? [] : trimmed.split(/\s+/)
  const characters = text.length
  const charactersNoSpaces = text.replace(/\s/g, '').length
  const sentenceMatches = trimmed === '' ? [] : (trimmed.match(/[^.!?]*[.!?]+/g) || []).filter((s) => s.trim())
  // Text with no terminal punctuation at all (e.g. "Hello world") still
  // reads as one sentence to a person looking at a word count \u2014 showing
  // "0 sentences" for non-empty text would be confusing, not more correct.
  const sentences = trimmed === '' ? 0 : sentenceMatches.length || 1
  const paragraphs = trimmed === '' ? 0 : trimmed.split(/\n\s*\n/).filter((p) => p.trim()).length
  const readingTimeMinutes = words.length / AVERAGE_READING_WPM

  return {
    words: words.length,
    characters,
    charactersNoSpaces,
    sentences,
    paragraphs: paragraphs || (trimmed ? 1 : 0),
    readingTimeMinutes,
  }
}

export function formatReadingTime(minutes) {
  if (minutes < 1) return '< 1 min read'
  const rounded = Math.round(minutes)
  return `${rounded} min read`
}

// --- Case Converter --------------------------------------------------------------

export function toUpperCase(text) {
  return text.toUpperCase()
}

export function toLowerCase(text) {
  return text.toLowerCase()
}

export function toTitleCase(text) {
  return text.replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
}

export function toSentenceCase(text) {
  const lower = text.toLowerCase()
  return lower.replace(/(^\s*\w|[.!?]\s*\w)/g, (match) => match.toUpperCase())
}

export function toCamelCase(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
}

export function toSnakeCase(text) {
  return text
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .toLowerCase()
    .replace(/^_+|_+$/g, '')
}

export function toKebabCase(text) {
  return text
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .toLowerCase()
    .replace(/^-+|-+$/g, '')
}

export const CASE_OPTIONS = [
  { id: 'upper', label: 'UPPERCASE', fn: toUpperCase },
  { id: 'lower', label: 'lowercase', fn: toLowerCase },
  { id: 'title', label: 'Title Case', fn: toTitleCase },
  { id: 'sentence', label: 'Sentence case', fn: toSentenceCase },
  { id: 'camel', label: 'camelCase', fn: toCamelCase },
  { id: 'snake', label: 'snake_case', fn: toSnakeCase },
  { id: 'kebab', label: 'kebab-case', fn: toKebabCase },
]

// --- Lorem Ipsum Generator --------------------------------------------------------------

const LOREM_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum',
]

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

function generateSentence(wordCount) {
  const words = Array.from({ length: wordCount }, () => LOREM_WORDS[randomInt(0, LOREM_WORDS.length - 1)])
  return `${capitalize(words[0])} ${words.slice(1).join(' ')}.`
}

function generateParagraph(sentenceCount) {
  return Array.from({ length: sentenceCount }, () => generateSentence(randomInt(6, 14))).join(' ')
}

/**
 * Generates classic Lorem Ipsum placeholder text. `startWithClassic`
 * keeps the well-known opening ("Lorem ipsum dolor sit amet...") on the
 * first output, matching what most placeholder-text tools do, so the
 * result still reads as recognizably "lorem ipsum" rather than pure
 * random Latin-looking words.
 */
export function generateLoremIpsum({ unit = 'paragraphs', count = 3, startWithClassic = true } = {}) {
  const safeCount = Math.max(1, Math.min(50, count))

  if (unit === 'words') {
    const words = Array.from({ length: safeCount }, () => LOREM_WORDS[randomInt(0, LOREM_WORDS.length - 1)])
    if (startWithClassic) {
      const classicStart = ['lorem', 'ipsum', 'dolor', 'sit', 'amet']
      classicStart.forEach((word, index) => {
        if (index < words.length) words[index] = word
      })
    }
    return capitalize(words.join(' ')) + '.'
  }

  if (unit === 'sentences') {
    const sentences = Array.from({ length: safeCount }, () => generateSentence(randomInt(6, 14)))
    if (startWithClassic) {
      sentences[0] =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }
    return sentences.join(' ')
  }

  // paragraphs
  const paragraphs = Array.from({ length: safeCount }, () => generateParagraph(randomInt(3, 6)))
  if (startWithClassic) {
    paragraphs[0] =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
      paragraphs[0]
  }
  return paragraphs.join('\n\n')
}

export const LOREM_UNITS = [
  { id: 'paragraphs', label: 'Paragraphs' },
  { id: 'sentences', label: 'Sentences' },
  { id: 'words', label: 'Words' },
]
