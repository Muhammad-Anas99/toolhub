/**
 * Removes a background by flood-filling from the image edges through
 * connected, color-similar pixels. Verified independently before being
 * ported here: perfect segmentation on a clean high-contrast test
 * image, perfect segmentation on a background with a smooth gradient
 * (simulating uneven real-world lighting, handled correctly because
 * each step only compares to its immediate neighbor rather than one
 * fixed reference color), and a confirmed, real limitation directly
 * tested: any pixel that touches the image border is always treated
 * as background, regardless of its own color, since border pixels are
 * used unconditionally as the starting seed points. A subject that
 * extends all the way to the edge of the photo will have that
 * edge-touching portion incorrectly removed.
 *
 * This is a classical computer-vision technique (similar to a "magic
 * wand" selection tool), not a neural network - there's no AI model
 * involved, and no claim here that there is.
 */
export function removeBackgroundFloodFill(imageData, tolerance) {
  const { width, height, data } = imageData
  const visited = new Uint8Array(width * height)
  const queue = []

  function pushIfUnvisited(x, y) {
    const idx = y * width + x
    if (!visited[idx]) {
      visited[idx] = 2
      queue.push(idx)
    }
  }

  for (let x = 0; x < width; x++) {
    pushIfUnvisited(x, 0)
    pushIfUnvisited(x, height - 1)
  }
  for (let y = 0; y < height; y++) {
    pushIfUnvisited(0, y)
    pushIfUnvisited(width - 1, y)
  }

  while (queue.length > 0) {
    const idx = queue.pop()
    if (visited[idx] === 1) continue
    visited[idx] = 1

    const x = idx % width
    const y = Math.floor(idx / width)
    const pIdx = idx * 4
    const r = data[pIdx]
    const g = data[pIdx + 1]
    const b = data[pIdx + 2]

    const neighbors = [
      [x, y - 1],
      [x, y + 1],
      [x - 1, y],
      [x + 1, y],
    ]
    for (const [nx, ny] of neighbors) {
      if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue
      const nIdx = ny * width + nx
      if (visited[nIdx] === 1) continue

      const nPIdx = nIdx * 4
      const nr = data[nPIdx]
      const ng = data[nPIdx + 1]
      const nb = data[nPIdx + 2]
      const dist = Math.sqrt((r - nr) ** 2 + (g - ng) ** 2 + (b - nb) ** 2)

      if (dist <= tolerance) {
        if (visited[nIdx] !== 2) {
          visited[nIdx] = 2
          queue.push(nIdx)
        }
      }
    }
  }

  for (let i = 0; i < width * height; i++) {
    if (visited[i] === 1) {
      data[i * 4 + 3] = 0
    }
  }

  return imageData
}

/**
 * Loads a File into an ImageData object via canvas, for the removal
 * function above to process.
 */
export async function loadImageData(file) {
  const img = new Image()
  const url = URL.createObjectURL(file)
  await new Promise((resolve, reject) => {
    img.onload = resolve
    img.onerror = () => reject(new Error('Could not read this image file.'))
    img.src = url
  })

  const canvas = document.createElement('canvas')
  canvas.width = img.naturalWidth
  canvas.height = img.naturalHeight
  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0)
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

  URL.revokeObjectURL(url)
  return { imageData, width: canvas.width, height: canvas.height }
}

/**
 * Renders an ImageData back to a PNG Blob (PNG specifically, since it's
 * the only common format that supports the transparency this tool
 * produces).
 */
export function imageDataToPngBlob(imageData) {
  const canvas = document.createElement('canvas')
  canvas.width = imageData.width
  canvas.height = imageData.height
  const ctx = canvas.getContext('2d')
  ctx.putImageData(imageData, 0, 0)
  return new Promise((resolve) => canvas.toBlob(resolve, 'image/png'))
}
