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
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          role="region"
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-0 z-50 w-full border-t border-slate-200 bg-white shadow-[0_-8px_30px_rgba(0,0,0,0.1)] dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex w-full flex-col items-stretch gap-5 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-10 sm:py-7 lg:px-16">
            <div className="flex items-center gap-4 sm:flex-1">
              <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                <HiOutlineHandRaised className="h-7 w-7" aria-hidden="true" />
              </span>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-[15px]">
                We use cookies for analytics and to show ads. Nothing loads until you choose —
                reject and keep browsing without them, no penalty either way.{' '}
                <Link to="/privacy-policy" className="font-medium text-brand-600 underline hover:text-brand-700 dark:text-brand-400">
                  Privacy policy
                </Link>
              </p>
            </div>

            <div className="flex flex-shrink-0 gap-3 sm:gap-4">
              <button type="button" onClick={handleReject} className="btn-secondary flex-1 justify-center px-6 py-3 text-sm sm:flex-none sm:px-8">
                Reject
              </button>
              <button type="button" onClick={handleAccept} className="btn-primary flex-1 justify-center px-6 py-3 text-sm sm:flex-none sm:px-8">
                Accept all
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
