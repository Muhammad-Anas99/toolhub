import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * React Router's client-side navigation does not reset scroll position
 * the way a real page load does, so without this, navigating away from
 * a page scrolled far down (a long category listing, for instance)
 * lands on the new page still scrolled to that same pixel offset,
 * which looks like the click did nothing until the page is manually
 * scrolled back up.
 *
 * Watches location.key rather than just location.pathname so this also
 * fires on query-param-only navigation (switching categories on
 * /tools?category=X keeps the same pathname), the same gap that
 * affected the account menu's close-on-navigate behavior.
 *
 * Rendered once near the root, outside of any route-specific
 * component, so it applies uniformly across the whole app rather than
 * needing to be added to every page individually.
 */
export default function ScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.key])

  return null
}
