/*
 * Keeps the site owner's own visits out of the page-view log.
 *
 * Signing in as an admin sets a flag in this browser's localStorage, so
 * later visits from the same browser are skipped even when signed out
 * (the usual case when checking the public site). The server separately
 * refuses to record requests from a signed-in admin, which covers a
 * browser that has never had the flag set.
 */
const STORAGE_KEY = 'toolhub:ignore-page-views'

export function markPageViewsIgnored() {
  try {
    window.localStorage.setItem(STORAGE_KEY, '1')
  } catch {
    // Storage can be unavailable (private mode, blocked). Nothing breaks:
    // the server-side admin check still applies while signed in.
  }
}

export function arePageViewsIgnored() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

/**
 * True for the admin panel itself. React Router matches paths
 * case-insensitively, so the comparison lowercases. Mirrors
 * isAdminPanelPath in server/utils/pageViewPolicy.js - keep the two in step.
 */
export function isAdminPanelPath(path) {
  const lower = String(path).toLowerCase()
  return lower === '/admin' || lower.startsWith('/admin/')
}
