import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

const ADSENSE_CLIENT_ID = import.meta.env.VITE_ADSENSE_CLIENT_ID

/**
 * Renders one AdSense ad unit, using Google's own documented pattern:
 * an <ins class="adsbygoogle"> element with data-ad-client/data-ad-slot,
 * followed by pushing an empty object onto the window.adsbygoogle queue
 * to tell the already-loaded adsbygoogle.js script to fill it.
 *
 * This is the piece that was actually missing before — the global
 * <script src=".../adsbygoogle.js?client=..."> tag in index.html loads
 * the AdSense library and verifies site ownership, but it doesn't
 * display a single ad on its own. Without at least one <ins
 * class="adsbygoogle"> somewhere on the page (this component), or Auto
 * ads separately enabled in the AdSense dashboard, no ad has anywhere
 * to actually render.
 *
 * Each placement needs a real ad unit slot ID, created in the AdSense
 * dashboard (Ads > By ad unit > + New ad unit) — there is no way to
 * generate or guess a working slot ID from code. Pass it via the `slot`
 * prop, sourced from its own env var per placement (see the two call
 * sites in ToolLayout.jsx and BlogPost.jsx) so each placement can be
 * configured — or left off — independently.
 */
export default function AdUnit({ slot, format = 'auto', className = '' }) {
  const insRef = useRef(null)
  const pushedRef = useRef(false)

  useEffect(() => {
    if (!ADSENSE_CLIENT_ID || !slot || pushedRef.current) return
    try {
      // eslint-disable-next-line no-undef
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      pushedRef.current = true
    } catch {
      // The adsbygoogle library can fail to load for reasons outside
      // this component's control — an ad blocker, a slow connection, a
      // network policy blocking googlesyndication.com. An ad slot
      // failing to fill is a non-critical, supplementary page element,
      // not something worth surfacing an error for.
    }
  }, [slot])

  // Render nothing at all — not even an empty placeholder box — when
  // AdSense isn't configured (local development, or this specific
  // placement's slot genuinely not set up yet) or a slot ID.
  if (!ADSENSE_CLIENT_ID || !slot) return null

  return (
    <ins
      ref={insRef}
      className={`adsbygoogle block ${className}`}
      style={{ display: 'block' }}
      data-ad-client={ADSENSE_CLIENT_ID}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  )
}

AdUnit.propTypes = {
  slot: PropTypes.string,
  format: PropTypes.string,
  className: PropTypes.string,
}
