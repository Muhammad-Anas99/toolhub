import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineHandRaised } from 'react-icons/hi2'
import { getStoredConsent, setStoredConsent, loadAnalyticsAndAds } from '../../lib/cookieConsent.js'

/**
 * Shows once for a new visitor (no stored choice yet) and stays hidden
 * for every later visit once a choice is made, either way. Genuinely
 * gates whether Analytics/AdSense load at all — see cookieConsent.js —
 * rather than just displaying a notice alongside cookies that are
 * already being set regardless, which is exactly the distinction
 * Google's own EU User Consent Policy requires ("continued browsing is
 * not consent").
 */
export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(getStoredConsent() === null)
    function handleReopen() {
      setVisible(true)
    }
    window.addEventListener('toolhub:open-cookie-preferences', handleReopen)
    return () => window.removeEventListener('toolhub:open-cookie-preferences', handleReopen)
  }, [])

  function handleAccept() {
    setStoredConsent('granted')
    loadAnalyticsAndAds()
    setVisible(false)
  }

  function handleReject() {
    setStoredConsent('denied')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          role="region"
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6"
        >
          <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-xl dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:gap-6 sm:p-6">
            <div className="flex flex-shrink-0 items-center justify-center sm:order-1">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
                <HiOutlineHandRaised className="h-6 w-6" aria-hidden="true" />
              </span>
            </div>

            <p className="flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              We use cookies for analytics and to show ads. Nothing loads until you choose —
              you can accept, or reject and keep browsing without them.{' '}
              <Link to="/privacy-policy" className="font-medium text-brand-600 underline hover:text-brand-700 dark:text-brand-400">
                Privacy policy
              </Link>
            </p>

            <div className="flex flex-shrink-0 gap-2.5">
              <button type="button" onClick={handleReject} className="btn-secondary flex-1 justify-center text-sm sm:flex-none">
                Reject
              </button>
              <button type="button" onClick={handleAccept} className="btn-primary flex-1 justify-center text-sm sm:flex-none">
                Accept all
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
