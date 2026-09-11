const STORAGE_PREFIX = 'toolhub_blog_reaction_'

/**
 * Returns the reaction ('like' | 'dislike') this browser has already
 * recorded for a given post, or null if it hasn't reacted yet.
 */
export function getStoredReaction(slug) {
  try {
    const value = window.localStorage.getItem(STORAGE_PREFIX + slug)
    return value === 'like' || value === 'dislike' ? value : null
  } catch {
    return null
  }
}

/**
 * Records (or clears, if type is null) this browser's reaction to a
 * post.
 */
export function setStoredReaction(slug, type) {
  try {
    if (type === null) {
      window.localStorage.removeItem(STORAGE_PREFIX + slug)
    } else {
      window.localStorage.setItem(STORAGE_PREFIX + slug, type)
    }
  } catch {
    // Storage unavailable (private browsing, disabled, quota) - the
    // reaction still gets recorded on the server for this click, it
    // just won't be remembered as "already reacted" on a future visit.
  }
}
