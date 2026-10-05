import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { api } from '../lib/api.js'
import { getStoredConsent } from '../lib/cookieConsent.js'
import { useAuth } from '../context/AuthContext.jsx'
import { arePageViewsIgnored, markPageViewsIgnored, isAdminPanelPath } from '../lib/pageViewIgnore.js'

/**
 * Logs a page view on every route change, anywhere in the app - not
 * just tool pages. Gated behind the visitor's existing cookie consent
 * choice: this captures IP and derived country/city for every page
 * landed on, which is a meaningfully broader kind of tracking than the
 * site's existing tool-conversion logging, so it follows the same
 * consent basis already established for Google Analytics. It is
 * re-checked on every navigation, so granting consent mid-session starts
 * logging on the next page and revoking it stops logging immediately.
 *
 * The site owner's own visits are not logged:
 *  - the admin panel's own pages never are;
 *  - once a browser has been signed in as an admin it is remembered
 *    (see pageViewIgnore.js) and skipped from then on, signed in or not;
 *  - a signed-in admin is skipped, and the server also refuses to record
 *    one.
 *
 * On a fresh page load the session isn't known yet - the access token
 * lives in memory and only comes back once the silent refresh finishes -
 * so the very first page view would go out looking anonymous. The hook
 * therefore waits for the session check to finish before logging, rather
 * than counting the owner's first page of every visit.
 */
export function usePageViewLogger() {
  const location = useLocation()
  const { status, isAdmin } = useAuth()
  // The navigation entry already logged. Stops the same page being
  // counted twice when something else in the dependency list changes
  // (signing in mid-session, or React StrictMode re-running the effect
  // in development), while still counting A -> B -> A as three visits,
  // since every navigation gets its own location.key.
  const loggedKeyRef = useRef(null)

  useEffect(() => {
    if (isAdmin) markPageViewsIgnored()
  }, [isAdmin])

  useEffect(() => {
    if (getStoredConsent() !== 'granted') return
    if (isAdminPanelPath(location.pathname)) return
    if (arePageViewsIgnored()) return
    // Wait until the session check has resolved either way.
    if (status !== 'authenticated' && status !== 'unauthenticated') return
    if (isAdmin) return
    if (loggedKeyRef.current === location.key) return

    loggedKeyRef.current = location.key
    api.logPageView(location.pathname).catch(() => {})
  }, [location.pathname, location.key, status, isAdmin])
}
