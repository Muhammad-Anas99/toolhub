/**
 * Holds the current access token in memory only — never localStorage or a
 * readable cookie. This is deliberate: anything in localStorage is
 * readable by any JavaScript on the page, including an XSS payload, and
 * would live indefinitely until manually cleared. Keeping the access
 * token in a JS variable means it vanishes on tab close/refresh, at which
 * point AuthContext silently re-fetches a new one using the httpOnly
 * refresh-token cookie (which JavaScript can never read directly).
 *
 * A plain module-level variable is enough here — api.js and AuthContext
 * both import this file, so they always see the same value without a
 * circular import between them.
 */
let accessToken = null

export function getAccessToken() {
  return accessToken
}

export function setAccessToken(token) {
  accessToken = token
}

export function clearAccessToken() {
  accessToken = null
}
