/**
 * YouTube serves thumbnails at stable, public, unauthenticated URLs for
 * any video ID — no API key or backend needed. This just needs the
 * correct video ID extracted from whatever format the user pastes in.
 */

const VIDEO_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/

const URL_PATTERNS = [
  /(?:youtube\.com\/watch\?v=)([A-Za-z0-9_-]{11})/,
  /(?:youtube\.com\/embed\/)([A-Za-z0-9_-]{11})/,
  /(?:youtube\.com\/shorts\/)([A-Za-z0-9_-]{11})/,
  /(?:youtu\.be\/)([A-Za-z0-9_-]{11})/,
]

export function extractYoutubeVideoId(input) {
  const trimmed = input.trim()
  if (VIDEO_ID_PATTERN.test(trimmed)) return trimmed

  for (const pattern of URL_PATTERNS) {
    const match = trimmed.match(pattern)
    if (match) return match[1]
  }
  return null
}

// Ordered highest to lowest resolution. maxresdefault (1280x720) doesn't
// exist for every video (only ones uploaded at sufficient source
// resolution) — the UI is responsible for detecting and hiding options
// that don't actually load a real thumbnail.
export const THUMBNAIL_QUALITIES = [
  { id: 'maxresdefault', label: 'Max Resolution', dimensions: '1280\u00d7720' },
  { id: 'sddefault', label: 'Standard Definition', dimensions: '640\u00d7480' },
  { id: 'hqdefault', label: 'High Quality', dimensions: '480\u00d7360' },
  { id: 'mqdefault', label: 'Medium Quality', dimensions: '320\u00d7180' },
  { id: 'default', label: 'Default', dimensions: '120\u00d790' },
]

export function getThumbnailUrl(videoId, qualityId) {
  return `https://img.youtube.com/vi/${videoId}/${qualityId}.jpg`
}
