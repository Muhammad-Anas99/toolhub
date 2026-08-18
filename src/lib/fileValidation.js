export const DEFAULT_MAX_FILE_SIZE_MB = 25

const MIME_EXTENSIONS = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/webp': ['.webp'],
  'image/gif': ['.gif'],
  'image/bmp': ['.bmp'],
}

/**
 * Validate an uploaded File against a list of accepted mime types and a max
 * size in megabytes. Returns { valid: boolean, error?: string }.
 */
export function validateImageFile(file, acceptedTypes, maxSizeMB = DEFAULT_MAX_FILE_SIZE_MB) {
  if (!file) {
    return { valid: false, error: 'No file was selected.' }
  }

  if (!file.type.startsWith('image/')) {
    return { valid: false, error: 'That file doesn\u2019t look like an image. Please choose an image file.' }
  }

  if (acceptedTypes && acceptedTypes.length > 0 && !acceptedTypes.includes(file.type)) {
    const readableTypes = acceptedTypes
      .map((type) => MIME_EXTENSIONS[type]?.[0]?.replace('.', '').toUpperCase() ?? type)
      .join(', ')
    return {
      valid: false,
      error: `Unsupported file type. This tool accepts: ${readableTypes}.`,
    }
  }

  const maxBytes = maxSizeMB * 1024 * 1024
  if (file.size > maxBytes) {
    return {
      valid: false,
      error: `File is too large. Please choose an image under ${maxSizeMB} MB.`,
    }
  }

  return { valid: true }
}

export function getAcceptAttribute(acceptedTypes) {
  return acceptedTypes.join(',')
}

/**
 * Validates a non-image file (currently just PDFs) against accepted mime
 * types and a max size — the PDF-tools equivalent of validateImageFile
 * above, kept separate because the image version's "must start with
 * image/" check would incorrectly reject every PDF outright.
 */
export function validatePdfFile(file, maxSizeMB = DEFAULT_MAX_FILE_SIZE_MB) {
  if (!file) {
    return { valid: false, error: 'No file was selected.' }
  }
  if (file.type !== 'application/pdf') {
    return { valid: false, error: 'That file doesn\u2019t look like a PDF. Please choose a .pdf file.' }
  }
  const maxBytes = maxSizeMB * 1024 * 1024
  if (file.size > maxBytes) {
    return { valid: false, error: `File is too large. Please choose a PDF under ${maxSizeMB} MB.` }
  }
  return { valid: true }
}

/**
 * Validates an uploaded Office document (Excel/Word) against accepted
 * mime types AND file extension — browsers are notoriously inconsistent
 * about what mime type they report for these formats (some report
 * application/octet-stream, some omit the type entirely, depending on
 * the OS's own file-type registration), so mime type alone isn't
 * reliable enough here the way it is for images/PDFs.
 */
export function validateDocumentFile(file, acceptedTypes, acceptedExtensions, maxSizeMB = DEFAULT_MAX_FILE_SIZE_MB) {
  if (!file) {
    return { valid: false, error: 'No file was selected.' }
  }

  const hasValidType = acceptedTypes.includes(file.type)
  const hasValidExtension = acceptedExtensions.some((ext) => file.name.toLowerCase().endsWith(ext))

  if (!hasValidType && !hasValidExtension) {
    const readableExtensions = acceptedExtensions.map((ext) => ext.replace('.', '').toUpperCase()).join(', ')
    return { valid: false, error: `Unsupported file type. This tool accepts: ${readableExtensions}.` }
  }

  const maxBytes = maxSizeMB * 1024 * 1024
  if (file.size > maxBytes) {
    return { valid: false, error: `File is too large. Please choose a file under ${maxSizeMB} MB.` }
  }

  return { valid: true }
}
