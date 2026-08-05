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
