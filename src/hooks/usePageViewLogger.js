import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { api } from '../lib/api.js'
import { getStoredConsent } from '../lib/cookieConsent.js'

/**
 * Logs a page view on every route change, anywhere in the app - not
 * just tool pages. Gated behind the visitor's existing cookie consent
 * choice: this captures IP and derived country/city for every page
 * landed on, which is a meaningfully broader kind of tracking than the
 * site's existing tool-conversion logging (that only fires when
 * someone takes a deliberate action), so it follows the same consent
 * basis already established for Google Analytics rather than treating
 * itself as exempt. A visitor who hasn't decided yet, or declined,
 * generates no page-view log at all - re-checked on every navigation
 * (not just once on mount), so logging starts immediately once consent
 * is granted mid-session without needing a page reload, and stops
 * immediately if a visitor revokes consent from Cookie Preferences.
 */
export function usePageViewLogger() {
  const location = useLocation()

  useEffect(() => {
    if (getStoredConsent() !== 'granted') return
    api.logPageView(location.pathname).catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])
}
