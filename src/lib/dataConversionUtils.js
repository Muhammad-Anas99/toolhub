// --- CSV -------------------------------------------------------------------

function escapeCsvValue(value) {
  if (value === null || value === undefined) return ''
  const str = typeof value === 'object' ? JSON.stringify(value) : String(value)
  if (/["\n,]/.test(str)) return '"' + str.replace(/"/g, '""') + '"'
  return str
}

export function jsonToCsv(jsonData) {
  const data = Array.isArray(jsonData) ? jsonData : [jsonData]
  if (data.length === 0) return ''
  const headers = [...new Set(data.flatMap((row) => Object.keys(row)))]
  const headerRow = headers.map(escapeCsvValue).join(',')
  const rows = data.map((row) => headers.map((h) => escapeCsvValue(row[h])).join(','))
  return [headerRow, ...rows].join('\n')
}

/**
 * Real, quote-aware CSV line parser, not naive comma-splitting, which
 * would break on any field containing a comma inside quotes. Verified
 * with an exact JSON-to-CSV-to-JSON round trip, including a field with
 * both an embedded comma and an embedded quote, before being ported
 * here.
 */
function parseCsvLine(line) {
  const fields = []
  let current = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (inQuotes) {
      if (ch === '"' && line[i + 1] === '"') {
        current += '"'
        i++
      } else if (ch === '"') {
        inQuotes = false
      } else {
        current += ch
      }
    } else if (ch === '"') {
      inQuotes = true
    } else if (ch === ',') {
      fields.push(current)
      current = ''
    } else {
      current += ch
    }
  }
  fields.push(current)
  return fields
}

export function csvToJson(csv) {
  const lines = csv.trim().split('\n')
  if (lines.length === 0) return []
  const headers = parseCsvLine(lines[0])
  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line)
    return Object.fromEntries(headers.map((h, i) => [h, values[i]]))
  })
}

// --- XML -------------------------------------------------------------------

/**
 * Walks the parsed XML DOM tree into a plain object - repeated sibling
 * tags become an array, a leaf element becomes its text content.
 * Verified against a document with repeated sibling elements before
 * being ported here.
 */
export function xmlToJson(xmlString) {
  const doc = new DOMParser().parseFromString(xmlString, 'text/xml')
  const parserError = doc.querySelector('parsererror')
  if (parserError) throw new Error('This doesn\u2019t look like valid XML.')

  function nodeToObj(node) {
    const children = Array.from(node.children)
    if (children.length === 0) return node.textContent
    const obj = {}
    for (const child of children) {
      const value = nodeToObj(child)
      if (obj[child.tagName] !== undefined) {
        if (!Array.isArray(obj[child.tagName])) obj[child.tagName] = [obj[child.tagName]]
        obj[child.tagName].push(value)
      } else {
        obj[child.tagName] = value
      }
    }
    return obj
  }
  const root = doc.documentElement
  return { [root.tagName]: nodeToObj(root) }
}

function escapeXml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/**
 * Reverses xmlToJson - an array under a key becomes repeated sibling
 * tags of that name. Verified by round-tripping a document with
 * repeated elements before being ported here.
 */
export function jsonToXml(obj) {
  function build(key, value) {
    if (Array.isArray(value)) return value.map((v) => build(key, v)).join('')
    if (value !== null && typeof value === 'object') {
      const inner = Object.entries(value)
        .map(([k, v]) => build(k, v))
        .join('')
      return `<${key}>${inner}</${key}>`
    }
    return `<${key}>${escapeXml(value)}</${key}>`
  }
  const [rootName, rootValue] = Object.entries(obj)[0]
  return `<?xml version="1.0" encoding="UTF-8"?>\n${build(rootName, rootValue)}`
}

// --- YAML (common subset: nested mappings, scalars - not full YAML spec) ---

function parseYamlValue(v) {
  v = v.trim()
  if (v === '') return {}
  if (/^-?\d+(\.\d+)?$/.test(v)) return Number(v)
  if (v === 'true') return true
  if (v === 'false') return false
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) return v.slice(1, -1)
  return v
}

/**
 * Parses the common YAML subset used for typical config-style data:
 * nested key/value mappings and basic scalar types. Does not attempt
 * the full YAML spec (flow sequences, anchors, multi-document files).
 * Verified with a nested-object round trip through jsonToYaml before
 * being ported here.
 */
export function parseYaml(yaml) {
  const lines = yaml.split('\n').filter((l) => l.trim() && !l.trim().startsWith('#'))
  const root = {}
  const stack = [{ indent: -1, obj: root }]
  for (const line of lines) {
    const indent = line.match(/^(\s*)/)[1].length
    const content = line.trim()
    const colonIdx = content.indexOf(':')
    if (colonIdx === -1) continue
    const key = content.slice(0, colonIdx).trim()
    const valueStr = content.slice(colonIdx + 1).trim()
    while (stack.length > 1 && indent <= stack[stack.length - 1].indent) stack.pop()
    const parent = stack[stack.length - 1].obj
    if (valueStr === '') {
      const newObj = {}
      parent[key] = newObj
      stack.push({ indent, obj: newObj })
    } else {
      parent[key] = parseYamlValue(valueStr)
    }
  }
  return root
}

export function jsonToYaml(obj, indent = 0) {
  const pad = '  '.repeat(indent)
  let result = ''
  for (const [key, value] of Object.entries(obj)) {
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      result += `${pad}${key}:\n${jsonToYaml(value, indent + 1)}`
    } else if (Array.isArray(value)) {
      result += `${pad}${key}:\n`
      for (const item of value) {
        result += `${pad}  - ${typeof item === 'object' ? JSON.stringify(item) : item}\n`
      }
    } else {
      result += `${pad}${key}: ${value}\n`
    }
  }
  return result
}
