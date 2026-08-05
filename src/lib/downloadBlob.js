/**
 * Trigger a browser download for the given Blob.
 */
export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  // Release the object URL on the next tick so the download has started.
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

/**
 * Build an output filename by swapping the original file's extension.
 */
export function buildOutputFilename(originalName, newExtension, suffix = '') {
  const baseName = originalName.replace(/\.[^/.]+$/, '')
  const cleanExtension = newExtension.replace(/^\./, '')
  return `${baseName}${suffix}.${cleanExtension}`
}
