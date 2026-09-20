const STORAGE_KEY = 'toolhub-cookie-consent'

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID
const ADSENSE_ID = import.meta.env.VITE_ADSENSE_CLIENT_ID

/**
 * Reads the stored consent choice: 'granted', 'denied', or null if the
 * visitor hasn't decided yet (or localStorage isn't available — private
 * browsing in some browsers, or storage disabled entirely). A read
 * failure is treated the same as "not decided yet" rather than an
 * error, so the banner still shows and works correctly for the current
 * session even without persistence.
 */
export function getStoredConsent() {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

export function setStoredConsent(value) {
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    // Fails silently for the same reason as the read above — the choice
    // just won't be remembered on a future visit, which is a minor
    // degradation, not a broken experience for the current one.
  }
}

let alreadyLoaded = false

function injectScript(src, attrs = {}) {
  const script = document.createElement('script')
  script.src = src
  script.async = true
  Object.entries(attrs).forEach(([key, value]) => script.setAttribute(key, value))
  document.head.appendChild(script)
}

/**
 * Loads Google Analytics and AdSense — called only after genuine
 * consent (either just granted via the banner, or previously stored
 * from an earlier visit). This is the actual mechanism that makes
 * consent real rather than decorative: per Google's own EU User
 * Consent Policy, cookies must not be set until a specific affirmative
 * action is taken, so these scripts must never load unconditionally
 * the way they previously did directly in index.html.
 *
 * Reproduces the standard GA4 snippet (the dataLayer queue and gtag
 * function) exactly, just moved here and gated behind consent instead
 * of running unconditionally at page load.
 */
export function loadAnalyticsAndAds() {
  if (alreadyLoaded) return
  alreadyLoaded = true

  if (GA_ID) {
    window.dataLayer = window.dataLayer || []
    // eslint-disable-next-line no-inner-declarations
    function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments)
    }
    window.gtag = gtag
    window.gtag('js', new Date())
    window.gtag('config', GA_ID)
    injectScript(`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`)
  }

  if (ADSENSE_ID) {
    injectScript(`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`, {
      crossorigin: 'anonymous',
    })
  }
}

/**
 * Called once when the app first mounts. If consent was already
 * granted on a previous visit, loads the scripts immediately without
 * showing the banner again. Returns the stored choice so the caller
 * (the banner component) knows whether to display itself.
 */
export function initConsent() {
  const consent = getStoredConsent()
  if (consent === 'granted') loadAnalyticsAndAds()
  return consent
}
