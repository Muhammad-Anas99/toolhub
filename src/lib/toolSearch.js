/**
 * A small, dependency-free search scorer for the Cmd+K command palette.
 *
 * Deliberately not using a library (Fuse.js was the original plan) - for
 * searching ~200 short tool names and descriptions, a library adds real
 * weight for a need simple substring/prefix scoring covers well. Ranks:
 *   1. Exact name match
 *   2. Name starts with the query
 *   3. Any word in the name starts with the query (so "color" finds
 *      "Random Color Generator", not just names literally starting with it)
 *   4. Name contains the query anywhere
 *   5. Description contains the query
 * Case-insensitive throughout. Returns tools in that priority order, ties
 * broken by keeping the original array order stable.
 */
export function searchTools(query, tools) {
  const q = query.trim().toLowerCase()
  if (!q) return []

  const scored = []
  for (const tool of tools) {
    const name = tool.name.toLowerCase()
    const description = (tool.description || '').toLowerCase()

    let score = null
    if (name === q) score = 0
    else if (name.startsWith(q)) score = 1
    else if (name.split(/\s+/).some((word) => word.startsWith(q))) score = 2
    else if (name.includes(q)) score = 3
    else if (description.includes(q)) score = 4

    if (score !== null) scored.push({ tool, score })
  }

  scored.sort((a, b) => a.score - b.score)
  return scored.map((s) => s.tool)
}
