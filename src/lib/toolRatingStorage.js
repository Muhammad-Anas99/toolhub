const STORAGE_PREFIX = 'toolhub_tool_rating_'

/**
 * Returns the rating (1-5) this browser has already given a tool, or
 * null if it hasn't rated yet.
 */
export function getStoredRating(slug) {
  try {
    const value = window.localStorage.getItem(STORAGE_PREFIX + slug)
    const parsed = Number(value)
    return Number.isInteger(parsed) && parsed >= 1 && parsed <= 5 ? parsed : null
  } catch {
    return null
  }
}

/**
 * Records this browser's rating for a tool.
 */
export function setStoredRating(slug, rating) {
  try {
    window.localStorage.setItem(STORAGE_PREFIX + slug, String(rating))
  } catch {
    // Storage unavailable (private browsing, disabled, quota) - the
    // rating still gets recorded on the server for this click, it just
    // won't be remembered as "already rated" on a future visit.
  }
}
