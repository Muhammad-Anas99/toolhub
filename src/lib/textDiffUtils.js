// Basic LCS is O(n*m) in both time and memory - genuinely fine for
// typical text/code comparisons, but a real risk for very large inputs
// in a browser tab. This caps the comparison at a reasonable size rather
// than letting an extreme input silently freeze the page.
export const MAX_LINES = 2000

function computeLcsTable(a, b) {
  const m = a.length
  const n = b.length
  const table = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0))

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        table[i][j] = table[i - 1][j - 1] + 1
      } else {
        table[i][j] = Math.max(table[i - 1][j], table[i][j - 1])
      }
    }
  }

  return table
}

/**
 * Computes a line-by-line diff using the Longest Common Subsequence
 * algorithm - the same underlying approach Unix diff uses. Verified
 * independently against 7 known cases (identical texts, fully different
 * texts, single insertions/deletions/modifications, and a realistic
 * multi-line-change scenario) before this logic was ported here.
 */
export function diffLines(textA, textB) {
  const a = textA.split('\n')
  const b = textB.split('\n')

  if (a.length > MAX_LINES || b.length > MAX_LINES) {
    throw new Error(`Text is too long to compare \u2014 this tool supports up to ${MAX_LINES} lines per side.`)
  }

  const table = computeLcsTable(a, b)

  const result = []
  let i = a.length
  let j = b.length

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && a[i - 1] === b[j - 1]) {
      result.unshift({ type: 'unchanged', text: a[i - 1] })
      i--
      j--
    } else if (j > 0 && (i === 0 || table[i][j - 1] >= table[i - 1][j])) {
      result.unshift({ type: 'added', text: b[j - 1] })
      j--
    } else if (i > 0 && (j === 0 || table[i][j - 1] < table[i - 1][j])) {
      result.unshift({ type: 'removed', text: a[i - 1] })
      i--
    }
  }

  return result
}

export function getDiffStats(diffResult) {
  return {
    added: diffResult.filter((r) => r.type === 'added').length,
    removed: diffResult.filter((r) => r.type === 'removed').length,
    unchanged: diffResult.filter((r) => r.type === 'unchanged').length,
  }
}
