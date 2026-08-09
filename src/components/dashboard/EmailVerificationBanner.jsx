import React, { useState } from 'react'
import { HiOutlineCheckCircle } from 'react-icons/hi2'
import { useAuth } from '../../context/AuthContext.jsx'
import { api } from '../../lib/api.js'

/**
 * Shown at the top of every /dashboard/* page (mounted in
 * DashboardLayout.jsx) whenever the signed-in user hasn't verified their
 * email yet — not just tucked away on the Settings page, so it's the
 * first thing a user sees no matter which dashboard section they land on.
 */
export default function EmailVerificationBanner() {
  const { user } = useAuth()
  const [status, setStatus] = useState('idle') // idle | sending | sent
  const [error, setError] = useState(null)

  if (!user || user.isEmailVerified) return null

  async function handleResend() {
    setError(null)
    setStatus('sending')
    try {
      await api.resendVerification()
      setStatus('sent')
    } catch (err) {
      setError(err.message || 'Could not send verification email.')
      setStatus('idle')
    }
  }

  return (
    <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
          Your email address isn&apos;t verified yet.
        </p>
        {error && <p className="mt-1 text-sm text-rose-600 dark:text-rose-400">{error}</p>}
      </div>

      {status === 'sent' ? (
        <p className="flex flex-shrink-0 items-center gap-1.5 text-sm text-emerald-700 dark:text-emerald-400">
          <HiOutlineCheckCircle className="h-4 w-4" />
          Sent — check your inbox.
        </p>
      ) : (
        <button
          type="button"
          onClick={handleResend}
          disabled={status === 'sending'}
          className="btn-secondary flex-shrink-0 text-sm"
        >
          {status === 'sending' ? 'Sending...' : 'Resend verification email'}
        </button>
      )}
    </div>
  )
}
