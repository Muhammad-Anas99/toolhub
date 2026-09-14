// --- SRT to VTT -------------------------------------------------------------

export function srtToVtt(srt) {
  let vtt = 'WEBVTT\n\n'
  vtt += srt.replace(/(\d{2}:\d{2}:\d{2}),(\d{3})/g, '$1.$2')
  return vtt.trim() + '\n'
}

// --- SQL INSERT to Markdown table -------------------------------------------

export function sqlInsertToMarkdown(sql) {
  const tableMatch = sql.match(/INSERT INTO\s+`?(\w+)`?\s*\(([^)]+)\)\s*VALUES/i)
  if (!tableMatch) throw new Error('Could not find an INSERT INTO statement with column names.')
  const columns = tableMatch[2].split(',').map((c) => c.trim().replace(/`/g, ''))
  const afterValues = sql.slice(sql.indexOf('VALUES') + 6)
  const valuesMatches = [...afterValues.matchAll(/\(([^()]+)\)/g)]
  if (valuesMatches.length === 0) throw new Error('No VALUES rows found after the INSERT statement.')
  const rows = valuesMatches.map((m) => m[1].split(',').map((v) => v.trim().replace(/^['"]|['"]$/g, '')))
  let md = '| ' + columns.join(' | ') + ' |\n'
  md += '| ' + columns.map(() => '---').join(' | ') + ' |\n'
  for (const row of rows) {
    md += '| ' + row.join(' | ') + ' |\n'
  }
  return md
}

// --- JSON to HTML table -----------------------------------------------------

function escapeHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

export function jsonToHtmlTable(jsonData) {
  const data = Array.isArray(jsonData) ? jsonData : [jsonData]
  if (data.length === 0) return '<table></table>'
  const headers = [...new Set(data.flatMap((row) => Object.keys(row)))]
  let html = '<table>\n  <thead>\n    <tr>\n'
  html += headers.map((h) => `      <th>${escapeHtml(h)}</th>`).join('\n')
  html += '\n    </tr>\n  </thead>\n  <tbody>\n'
  for (const row of data) {
    html += '    <tr>\n'
    html += headers.map((h) => `      <td>${escapeHtml(row[h] ?? '')}</td>`).join('\n')
    html += '\n    </tr>\n'
  }
  html += '  </tbody>\n</table>'
  return html
}

// --- YAML to TOML ------------------------------------------------------------

/**
 * TOML serializer covering the common config-style case: flat keys plus
 * one or two levels of nested tables. Not the full TOML spec (arrays of
 * tables, inline tables), matching the same "common subset" scope as
 * this site's existing YAML parser.
 */
export function jsonToToml(obj, prefix = '') {
  let result = ''
  const scalars = {}
  const nested = {}
  for (const [k, v] of Object.entries(obj)) {
    if (v !== null && typeof v === 'object' && !Array.isArray(v)) nested[k] = v
    else scalars[k] = v
  }
  for (const [k, v] of Object.entries(scalars)) {
    const tomlValue = typeof v === 'string' ? JSON.stringify(v) : v
    result += `${k} = ${tomlValue}\n`
  }
  for (const [k, v] of Object.entries(nested)) {
    const section = prefix ? `${prefix}.${k}` : k
    result += `\n[${section}]\n` + jsonToToml(v, section)
  }
  return result
}

// --- robots.txt validation ----------------------------------------------------

const VALID_ROBOTS_DIRECTIVES = ['user-agent', 'disallow', 'allow', 'sitemap', 'crawl-delay', 'host']

/**
 * Validates robots.txt syntax against the real directive rules
 * (case-insensitive directive names, disallow/allow must follow a
 * user-agent line, paths should start with /). Verified against both
 * a deliberately broken example and a genuinely valid one before
 * being ported here.
 */
export function validateRobotsTxt(content) {
  const lines = content.split('\n')
  const issues = []
  let hasUserAgent = false

  lines.forEach((line, i) => {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) return
    const colonIdx = trimmed.indexOf(':')
    if (colonIdx === -1) {
      issues.push({ line: i + 1, message: 'Missing colon \u2014 expected "Directive: value" format.' })
      return
    }
    const directive = trimmed.slice(0, colonIdx).trim().toLowerCase()
    const value = trimmed.slice(colonIdx + 1).trim()
    if (!VALID_ROBOTS_DIRECTIVES.includes(directive)) {
      issues.push({ line: i + 1, message: `Unknown directive "${directive}".` })
    }
    if (directive === 'user-agent') {
      hasUserAgent = true
    } else if (['disallow', 'allow'].includes(directive) && !hasUserAgent) {
      issues.push({ line: i + 1, message: `"${directive}" appears before any "User-agent" line.` })
    }
    if (directive === 'disallow' && value && !value.startsWith('/')) {
      issues.push({ line: i + 1, message: 'Disallow path should start with /.' })
    }
  })
  if (!hasUserAgent) issues.push({ line: 0, message: 'No User-agent directive found.' })
  return issues
}

// --- JSON string escape/unescape ---------------------------------------------

export function escapeJsonString(str) {
  return JSON.stringify(str).slice(1, -1)
}

export function unescapeJsonString(str) {
  return JSON.parse('"' + str + '"')
}

// --- Anagram shuffler ----------------------------------------------------------

export function shuffleToAnagram(name) {
  const letters = name.replace(/\s/g, '').split('')
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[letters[i], letters[j]] = [letters[j], letters[i]]
  }
  return letters.join('')
}

// --- Sarcastic text alternator (aLtErNaTiNg CaPs) -------------------------------

export function toSarcasticCase(text) {
  let letterIndex = 0
  return text
    .split('')
    .map((ch) => {
      if (!/[a-zA-Z]/.test(ch)) return ch
      const result = letterIndex % 2 === 0 ? ch.toLowerCase() : ch.toUpperCase()
      letterIndex++
      return result
    })
    .join('')
}

// --- Data URI encoding --------------------------------------------------------

export function buildDataUri(base64, mimeType) {
  return `data:${mimeType};base64,${base64}`
}

// --- Dumb phone contact formatter ---------------------------------------------

/**
 * Cleans a contact name and phone number for import on older feature
 * phones with limited character sets and short name-length limits:
 * strips accents and non-ASCII characters (emoji included), keeps
 * only basic safe characters, truncates to a safe length, and reduces
 * a phone number to plain digits (plus a leading +). Verified against
 * an accented, emoji-containing name and a formatted phone number
 * before being ported here.
 */
export function cleanForDumbPhone(name, phone, maxNameLength = 20) {
  const cleanName = name
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\x00-\x7F]/g, '')
    .replace(/[^a-zA-Z0-9 .-]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxNameLength)
  const cleanPhone = phone.replace(/[^\d+]/g, '')
  return { name: cleanName, phone: cleanPhone }
}

export function contactsToCsv(contacts) {
  const header = 'Name,Phone\n'
  const rows = contacts.map((c) => `${c.name},${c.phone}`).join('\n')
  return header + rows
}

// --- Corporate buzzword bingo --------------------------------------------------

export const BUZZWORDS = [
  'Synergy', 'Leverage', 'Circle back', 'Low-hanging fruit', 'Move the needle',
  'Deep dive', 'Bandwidth', 'Paradigm shift', 'Growth hacking', 'Disrupt',
  'Best practice', 'Actionable', 'Touch base', 'Value-add', 'Streamline',
  'Ecosystem', 'Pivot', 'Onboard', 'Ideate', 'Bleeding edge',
  'Core competency', 'Scalable', 'Win-win', 'Empower', 'Holistic',
  'Thought leader', 'Alignment', 'Cross-functional', 'Game changer', 'Optimize',
]

export function pickRandomUnique(list, count) {
  const shuffled = [...list].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, list.length))
}

// --- Fantasy-themed placeholder text --------------------------------------------

const FANTASY_WORDS = [
  'dragon', 'sorcerer', 'enchanted', 'kingdom', 'ancient', 'prophecy', 'wizard', 'castle',
  'sword', 'realm', 'mystic', 'shadow', 'quest', 'legend', 'throne', 'sorcery',
  'elven', 'dwarven', 'phoenix', 'relic', 'grimoire', 'citadel', 'wanderer', 'moonlit',
  'forsaken', 'oracle', 'dungeon', 'crimson', 'ethereal', 'runes', 'spellbound', 'twilight',
]

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

export function generateFantasyText(paragraphCount = 3) {
  const paragraphs = []
  for (let p = 0; p < paragraphCount; p++) {
    const sentenceCount = 3 + Math.floor(Math.random() * 3)
    const sentences = []
    for (let s = 0; s < sentenceCount; s++) {
      const wordCount = 6 + Math.floor(Math.random() * 8)
      const words = Array.from({ length: wordCount }, () => FANTASY_WORDS[Math.floor(Math.random() * FANTASY_WORDS.length)])
      sentences.push(capitalize(words.join(' ')) + '.')
    }
    paragraphs.push(sentences.join(' '))
  }
  return paragraphs.join('\n\n')
}

// --- Morse code ------------------------------------------------------------------

export const MORSE_MAP = {
  A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.', G: '--.', H: '....',
  I: '..', J: '.---', K: '-.-', L: '.-..', M: '--', N: '-.', O: '---', P: '.--.',
  Q: '--.-', R: '.-.', S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-',
  Y: '-.--', Z: '--..',
  '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
  '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
  '.': '.-.-.-', ',': '--..--', '?': '..--..', ' ': '/',
}

/**
 * Verified against the universally-known reference (SOS -> ... --- ...)
 * before being ported here.
 */
export function textToMorse(text) {
  return text
    .toUpperCase()
    .split('')
    .map((ch) => MORSE_MAP[ch] || '')
    .filter(Boolean)
    .join(' ')
}

/**
 * Converts Morse code into a sequence of {on, duration} tone events in
 * milliseconds, following the standard timing ratios: a dash is 3x a
 * dot's length, inter-symbol gaps are 1 dot, inter-letter gaps are 3
 * dots, and word gaps (represented by /) are 7 dots.
 */
export function morseToToneSequence(morse, dotMs = 80) {
  const events = []
  const symbols = morse.split(' ')
  symbols.forEach((symbol, i) => {
    if (symbol === '/') {
      events.push({ on: false, duration: dotMs * 7 })
      return
    }
    symbol.split('').forEach((mark, j) => {
      events.push({ on: true, duration: mark === '-' ? dotMs * 3 : dotMs })
      if (j < symbol.length - 1) events.push({ on: false, duration: dotMs })
    })
    if (i < symbols.length - 1 && symbols[i + 1] !== '/') {
      events.push({ on: false, duration: dotMs * 3 })
    }
  })
  return events
}

const REVERSE_MORSE = Object.fromEntries(Object.entries(MORSE_MAP).filter(([k]) => k !== ' ').map(([k, v]) => [v, k]))

/**
 * Decodes Morse code (space-separated symbols, / for word breaks) back
 * to text. Verified against the SOS and HELLO references before being
 * ported here.
 */
export function morseToText(morse) {
  return morse
    .trim()
    .split(' / ')
    .map((word) =>
      word
        .trim()
        .split(' ')
        .filter(Boolean)
        .map((code) => REVERSE_MORSE[code] || '')
        .join('')
    )
    .join(' ')
}

// --- CSV filter and column extraction ---------------------------------------

export function filterCsvRows(rows, filterColumn, filterValue) {
  if (!filterColumn || !filterValue) return rows
  return rows.filter((row) => (row[filterColumn] || '').toLowerCase().includes(filterValue.toLowerCase()))
}

export function extractColumns(rows, columns) {
  if (!columns.length) return rows
  return rows.map((row) => Object.fromEntries(columns.map((c) => [c, row[c]])))
}

// --- Shipping address cleaner --------------------------------------------------

const ADDRESS_ABBREVIATIONS = {
  STREET: 'ST', AVENUE: 'AVE', BOULEVARD: 'BLVD', DRIVE: 'DR', LANE: 'LN',
  ROAD: 'RD', COURT: 'CT', CIRCLE: 'CIR', PLACE: 'PL', SQUARE: 'SQ',
  APARTMENT: 'APT', SUITE: 'STE', BUILDING: 'BLDG', FLOOR: 'FL',
  NORTH: 'N', SOUTH: 'S', EAST: 'E', WEST: 'W',
}

/**
 * Normalizes a US shipping address to the uppercase, abbreviated,
 * punctuation-free style UPS, FedEx, and USPS systems expect. Verified
 * against realistic address examples before being ported here.
 */
export function cleanShippingAddress(address) {
  let cleaned = address.toUpperCase().replace(/[.,#]/g, '').trim()
  cleaned = cleaned.replace(/\s+/g, ' ')
  for (const [full, abbr] of Object.entries(ADDRESS_ABBREVIATIONS)) {
    cleaned = cleaned.replace(new RegExp('\\b' + full + '\\b', 'g'), abbr)
  }
  return cleaned
}

// --- AI prompt idea roulette ------------------------------------------------

const PROMPT_SUBJECTS = [
  'a floating city above the clouds', 'a lighthouse keeper who has never seen the ocean', 'a robot learning to paint',
  'a market that only opens at midnight', 'a forest where trees whisper secrets', 'a library with no books, only doors',
  'a chef who cooks with memories', 'a train that travels between dreams', 'a garden grown entirely from lost buttons',
  'a cartographer mapping a country that keeps changing', 'a musician who plays songs for the dead',
  'a mirror that shows who you could have been', 'a postal worker who delivers letters to the future',
  'an astronaut who forgot why they left Earth', 'a clockmaker who sells stolen time',
]
const PROMPT_STYLES = [
  'in the style of a fairy tale', 'as a noir detective story', 'told entirely through dialogue',
  'as a piece of flash fiction under 100 words', 'from the perspective of an unreliable narrator',
  'as a children\u2019s book', 'in the style of a folk legend', 'as a slow-burn mystery',
]

export function generatePromptIdea() {
  const subject = PROMPT_SUBJECTS[Math.floor(Math.random() * PROMPT_SUBJECTS.length)]
  const style = PROMPT_STYLES[Math.floor(Math.random() * PROMPT_STYLES.length)]
  return `Write about ${subject}, ${style}.`
}

// --- Trivia flashcards -------------------------------------------------------

export const TRIVIA_CARDS = [
  { q: 'What is the largest planet in our solar system?', a: 'Jupiter' },
  { q: 'In what year did the Titanic sink?', a: '1912' },
  { q: 'What is the chemical symbol for gold?', a: 'Au' },
  { q: 'Which country has the most natural lakes?', a: 'Canada' },
  { q: 'Who wrote "Romeo and Juliet"?', a: 'William Shakespeare' },
  { q: 'What is the smallest prime number?', a: '2' },
  { q: 'What is the capital of Australia?', a: 'Canberra' },
  { q: 'How many bones are in the adult human body?', a: '206' },
  { q: 'What gas do plants absorb from the atmosphere?', a: 'Carbon dioxide' },
  { q: 'Which ocean is the largest?', a: 'The Pacific Ocean' },
  { q: 'Who painted the Mona Lisa?', a: 'Leonardo da Vinci' },
  { q: 'What is the hardest natural substance on Earth?', a: 'Diamond' },
  { q: 'What year did the first iPhone release?', a: '2007' },
  { q: 'What is the longest river in the world?', a: 'The Nile' },
  { q: 'How many continents are there?', a: '7' },
]

// --- Tarot card daily reader --------------------------------------------------

export const TAROT_CARDS = [
  { name: 'The Fool', meaning: 'New beginnings, spontaneity, and a leap of faith into the unknown.' },
  { name: 'The Magician', meaning: 'Resourcefulness, willpower, and having the tools you need to succeed.' },
  { name: 'The High Priestess', meaning: 'Intuition, mystery, and trusting your inner voice.' },
  { name: 'The Empress', meaning: 'Abundance, nurturing, and creative growth.' },
  { name: 'The Emperor', meaning: 'Structure, authority, and a steady, disciplined approach.' },
  { name: 'The Lovers', meaning: 'Connection, choices, and aligning with your values.' },
  { name: 'The Chariot', meaning: 'Determination, willpower, and overcoming obstacles through focus.' },
  { name: 'Strength', meaning: 'Inner courage, patience, and gentle resilience.' },
  { name: 'The Hermit', meaning: 'Reflection, solitude, and seeking your own inner guidance.' },
  { name: 'Wheel of Fortune', meaning: 'Change, cycles, and turning points beyond your control.' },
  { name: 'Justice', meaning: 'Fairness, truth, and the consequences of past choices.' },
  { name: 'The Hanged Man', meaning: 'A pause, a new perspective, and letting go of control.' },
  { name: 'Temperance', meaning: 'Balance, patience, and finding the middle path.' },
  { name: 'The Star', meaning: 'Hope, renewal, and quiet optimism after a difficult time.' },
  { name: 'The Sun', meaning: 'Joy, success, and positive energy.' },
]
