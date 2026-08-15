/**
 * Core image-processing utilities. Everything here runs entirely in the
 * browser using the Canvas API and File/Blob APIs — no server involved.
 */

/**
 * Load a File/Blob into an HTMLImageElement, resolving with the element
 * plus its natural dimensions. Always revoke the object URL created here
 * once the caller is done with the image if they hold onto `url`.
 */
export function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()

    img.onload = () => {
      resolve({ img, width: img.naturalWidth, height: img.naturalHeight, url })
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('This file could not be read as an image. It may be corrupted or unsupported.'))
    }

    img.src = url
  })
}

/**
 * Convert a canvas to a Blob, wrapping the callback-based canvas.toBlob in
 * a Promise. Falls back to a manual data URL conversion in the rare case
 * toBlob is unavailable.
 */
export function canvasToBlob(canvas, mimeType = 'image/png', quality = 0.92) {
  return new Promise((resolve, reject) => {
    if (canvas.toBlob) {
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob)
          else reject(new Error('Could not create the output image.'))
        },
        mimeType,
        quality
      )
      return
    }

    try {
      const dataUrl = canvas.toDataURL(mimeType, quality)
      const byteString = atob(dataUrl.split(',')[1])
      const buffer = new Uint8Array(byteString.length)
      for (let i = 0; i < byteString.length; i += 1) {
        buffer[i] = byteString.charCodeAt(i)
      }
      resolve(new Blob([buffer], { type: mimeType }))
    } catch (error) {
      reject(error)
    }
  })
}

function createCanvas(width, height) {
  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, Math.round(width))
  canvas.height = Math.max(1, Math.round(height))
  return canvas
}

/**
 * Draw a loaded image onto a plain canvas at its natural size and export it
 * as a Blob in a different format. Used for format-conversion tools
 * (JPG -> PNG, PNG -> JPG, WEBP -> PNG, WEBP -> JPG, any -> WEBP).
 *
 * JPG/WEBP output onto a canvas defaults to a transparent background, which
 * renders as black in formats without alpha — so we fill white first for
 * any output format that doesn't support transparency.
 */
export async function convertImageFormat(file, { mimeType, quality = 0.92 }) {
  const { img, width, height, url } = await loadImage(file)
  try {
    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext('2d')

    if (mimeType === 'image/jpeg') {
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    const blob = await canvasToBlob(canvas, mimeType, quality)
    return { blob, width: canvas.width, height: canvas.height }
  } finally {
    URL.revokeObjectURL(url)
  }
}

/**
 * Re-encode an image at a given quality to reduce file size. Keeps the
 * same pixel dimensions and format.
 */
export async function compressImage(file, { quality = 0.7, mimeType }) {
  // Quality-based compression only meaningfully reduces file size for lossy
  // formats. PNG re-encoding via canvas ignores the quality argument, so we
  // default every input (including PNG) to a JPEG output unless the caller
  // explicitly overrides it.
  const outputType = mimeType || 'image/jpeg'
  const { img, width, height, url } = await loadImage(file)
  try {
    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext('2d')

    if (outputType === 'image/jpeg') {
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    // PNG is lossless and ignores the quality argument, so compression for
    // PNG inputs works best by re-encoding as JPEG. We keep the original
    // format when the caller explicitly asks for it.
    const blob = await canvasToBlob(canvas, outputType, quality)
    return { blob, width: canvas.width, height: canvas.height }
  } finally {
    URL.revokeObjectURL(url)
  }
}

/**
 * Resize an image to exact pixel dimensions.
 */
export async function resizeImage(file, { width, height, mimeType, quality = 0.92 }) {
  const outputType = mimeType || file.type || 'image/png'
  const { img, url } = await loadImage(file)
  try {
    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext('2d')

    if (outputType === 'image/jpeg') {
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

    const blob = await canvasToBlob(canvas, outputType, quality)
    return { blob, width: canvas.width, height: canvas.height }
  } finally {
    URL.revokeObjectURL(url)
  }
}

/**
 * Rotate an image by an arbitrary number of degrees (typically 90/180/270)
 * and/or flip it horizontally/vertically. The output canvas is sized to fit
 * the rotated result so nothing gets clipped.
 */
export async function rotateFlipImage(
  file,
  { degrees = 0, flipHorizontal = false, flipVertical = false, mimeType, quality = 0.92 }
) {
  const outputType = mimeType || file.type || 'image/png'
  const { img, width, height, url } = await loadImage(file)
  try {
    const radians = (degrees * Math.PI) / 180
    const isQuarterTurn = Math.abs(degrees % 180) === 90
    const canvasWidth = isQuarterTurn ? height : width
    const canvasHeight = isQuarterTurn ? width : height

    const canvas = createCanvas(canvasWidth, canvasHeight)
    const ctx = canvas.getContext('2d')

    if (outputType === 'image/jpeg') {
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.rotate(radians)
    ctx.scale(flipHorizontal ? -1 : 1, flipVertical ? -1 : 1)
    ctx.drawImage(img, -width / 2, -height / 2, width, height)

    const blob = await canvasToBlob(canvas, outputType, quality)
    return { blob, width: canvas.width, height: canvas.height }
  } finally {
    URL.revokeObjectURL(url)
  }
}

/**
 * Crop a region out of an image. `crop` coordinates and dimensions are in
 * source-image pixels (i.e. already converted from any on-screen zoom).
 */
export async function cropImage(file, { crop, mimeType, quality = 0.92 }) {
  const outputType = mimeType || file.type || 'image/png'
  const { img, url } = await loadImage(file)
  try {
    const canvas = createCanvas(crop.width, crop.height)
    const ctx = canvas.getContext('2d')

    if (outputType === 'image/jpeg') {
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    ctx.drawImage(
      img,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      0,
      0,
      canvas.width,
      canvas.height
    )

    const blob = await canvasToBlob(canvas, outputType, quality)
    return { blob, width: canvas.width, height: canvas.height }
  } finally {
    URL.revokeObjectURL(url)
  }
}

/**
 * Combines rotate/flip, resize, and format conversion into a single
 * pipeline — used by the batch Image Editor, where a user can apply all
 * three to one or many images at once instead of running them through
 * separate tools one at a time. The transform logic itself (the rotate/
 * flip canvas math, the resize smoothing settings, the JPEG white-
 * background fill) is identical to rotateFlipImage/resizeImage above —
 * this composes the same two canvas passes rather than reimplementing
 * them, so it stays correct by construction as those get reused.
 *
 * Order: rotate/flip is applied first (at the image's natural size), then
 * resize (if requested) is applied to that rotated result — matching what
 * a user visually expects when they rotate first and then specify a
 * target size for the now-rotated orientation.
 */
export async function processImageBatch(
  file,
  {
    rotateDegrees = 0,
    flipHorizontal = false,
    flipVertical = false,
    targetWidth = null,
    targetHeight = null,
    mimeType,
    quality = 0.92,
  } = {}
) {
  const outputType = mimeType || file.type || 'image/png'
  const { img, width, height, url } = await loadImage(file)
  try {
    const isQuarterTurn = Math.abs(rotateDegrees % 180) === 90
    const rotatedWidth = isQuarterTurn ? height : width
    const rotatedHeight = isQuarterTurn ? width : height

    // Pass 1: rotate/flip onto an intermediate canvas — same transform
    // sequence as rotateFlipImage above.
    const rotateCanvas = createCanvas(rotatedWidth, rotatedHeight)
    const rotateCtx = rotateCanvas.getContext('2d')
    if (outputType === 'image/jpeg') {
      rotateCtx.fillStyle = '#ffffff'
      rotateCtx.fillRect(0, 0, rotateCanvas.width, rotateCanvas.height)
    }
    const radians = (rotateDegrees * Math.PI) / 180
    rotateCtx.translate(rotateCanvas.width / 2, rotateCanvas.height / 2)
    rotateCtx.rotate(radians)
    rotateCtx.scale(flipHorizontal ? -1 : 1, flipVertical ? -1 : 1)
    rotateCtx.drawImage(img, -width / 2, -height / 2, width, height)

    // Pass 2: resize (only if actually requested) onto the final canvas —
    // same smoothing settings as resizeImage above.
    const needsResize = Boolean(targetWidth) || Boolean(targetHeight)
    let finalCanvas = rotateCanvas
    if (needsResize) {
      const finalWidth = targetWidth || rotatedWidth
      const finalHeight = targetHeight || rotatedHeight
      finalCanvas = createCanvas(finalWidth, finalHeight)
      const finalCtx = finalCanvas.getContext('2d')
      if (outputType === 'image/jpeg') {
        finalCtx.fillStyle = '#ffffff'
        finalCtx.fillRect(0, 0, finalCanvas.width, finalCanvas.height)
      }
      finalCtx.imageSmoothingEnabled = true
      finalCtx.imageSmoothingQuality = 'high'
      finalCtx.drawImage(rotateCanvas, 0, 0, finalCanvas.width, finalCanvas.height)
    }

    const blob = await canvasToBlob(finalCanvas, outputType, quality)
    return { blob, width: finalCanvas.width, height: finalCanvas.height }
  } finally {
    URL.revokeObjectURL(url)
  }
}

/**
 * Resizes an image to an exact target size using either "cover" (scales
 * to fill the target, cropping any overflow — no distortion, some content
 * may be cropped at the edges) or "contain" (scales to fit entirely
 * within the target, padding any empty space with a background color —
 * no cropping, no distortion). Used by the Instagram Post Resizer for
 * fitting arbitrary source images into Instagram's fixed post/story
 * dimensions without stretching them.
 */
export async function resizeToFit(file, { targetWidth, targetHeight, mode = 'cover', backgroundColor = '#ffffff', mimeType, quality = 0.92 }) {
  const outputType = mimeType || file.type || 'image/jpeg'
  const { img, width, height, url } = await loadImage(file)
  try {
    const canvas = createCanvas(targetWidth, targetHeight)
    const ctx = canvas.getContext('2d')

    // Fill the background first — needed for JPEG output (no
    // transparency) and always needed in "contain" mode, where padding
    // is visible around the scaled image.
    if (outputType === 'image/jpeg' || mode === 'contain') {
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, targetWidth, targetHeight)
    }

    const sourceRatio = width / height
    const targetRatio = targetWidth / targetHeight
    let drawWidth
    let drawHeight

    if (mode === 'cover') {
      if (sourceRatio > targetRatio) {
        drawHeight = targetHeight
        drawWidth = targetHeight * sourceRatio
      } else {
        drawWidth = targetWidth
        drawHeight = targetWidth / sourceRatio
      }
    } else {
      // contain
      if (sourceRatio > targetRatio) {
        drawWidth = targetWidth
        drawHeight = targetWidth / sourceRatio
      } else {
        drawHeight = targetHeight
        drawWidth = targetHeight * sourceRatio
      }
    }

    const offsetX = (targetWidth - drawWidth) / 2
    const offsetY = (targetHeight - drawHeight) / 2

    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)

    const blob = await canvasToBlob(canvas, outputType, quality)
    return { blob, width: targetWidth, height: targetHeight }
  } finally {
    URL.revokeObjectURL(url)
  }
}

export const MIME_LABELS = {
  'image/jpeg': 'JPG',
  'image/png': 'PNG',
  'image/webp': 'WEBP',
  'image/gif': 'GIF',
  'image/bmp': 'BMP',
  'application/pdf': 'PDF',
}
