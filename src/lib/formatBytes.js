/**
 * Format a byte count into a human-readable string, e.g. 1536 -> "1.5 KB".
 */
export function formatBytes(bytes, decimals = 1) {
  if (!Number.isFinite(bytes) || bytes < 0) return '0 B'
  if (bytes === 0) return '0 B'

  const units = ['B', 'KB', 'MB', 'GB']
  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1)
  const value = bytes / Math.pow(1024, exponent)

  return `${value.toFixed(exponent === 0 ? 0 : decimals)} ${units[exponent]}`
}

/**
 * Return a "X% smaller" style string comparing an original and new byte size.
 */
export function formatSavings(originalBytes, newBytes) {
  if (!originalBytes) return '0%'
  const diff = originalBytes - newBytes
  const percent = (diff / originalBytes) * 100
  return `${percent.toFixed(1)}%`
}
