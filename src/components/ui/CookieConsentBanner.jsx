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
          className="fixed inset-x-0 bottom-0 z-50 w-full border-t-4 border-brand-500 bg-gradient-to-r from-brand-950 via-[#1c2560] to-brand-950 shadow-[0_-8px_30px_rgba(0,0,0,0.25)]"
        >
          <div className="flex w-full flex-col items-stretch gap-5 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-10 sm:py-7 lg:px-16">
            <div className="flex items-center gap-4 sm:flex-1">
              <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-brand-500/20 text-brand-300 ring-1 ring-inset ring-brand-400/40">
                <HiOutlineHandRaised className="h-7 w-7" aria-hidden="true" />
              </span>
              <div>
                <p className="text-base font-bold text-white sm:text-lg">We use cookies</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-300 sm:text-[15px]">
                  For analytics and to show ads. Nothing loads until you choose — reject and keep
                  browsing without them, no penalty either way.{' '}
                  <Link to="/privacy-policy" className="font-semibold text-brand-300 underline hover:text-brand-200">
                    Privacy policy
                  </Link>
                </p>
              </div>
            </div>

            <div className="flex flex-shrink-0 gap-3 sm:gap-4">
              <button
                type="button"
                onClick={handleReject}
                className="flex-1 rounded-xl border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:flex-none sm:px-8"
              >
                Reject
              </button>
              <button
                type="button"
                onClick={handleAccept}
                className="flex-1 rounded-xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition-colors hover:bg-brand-400 sm:flex-none sm:px-8"
              >
                Accept all
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
