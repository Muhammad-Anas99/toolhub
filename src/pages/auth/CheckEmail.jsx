import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiOutlineEnvelopeOpen, HiOutlineCheckCircle } from 'react-icons/hi2'
import Container from '../../components/ui/Container.jsx'
import SEO from '../../components/ui/SEO.jsx'
import ErrorMessage from '../../components/tools/ErrorMessage.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { api } from '../../lib/api.js'

/**
 * Shown right after registration, before the dashboard — makes email
 * verification something the user sees immediately rather than something
 * they might stumble into later on the Settings page. They're already
 * signed in at this point (register() logs them in), so this is a
 * checkpoint, not a gate — "Continue to dashboard" always works.
 */
export default function CheckEmail() {
  const { user, status } = useAuth()
  const [resendStatus, setResendStatus] = useState('idle') // idle | sending | sent
  const [error, setError] = useState(null)

  // Reaching this page without being signed in (e.g. a direct bookmark
  // visit) doesn't make sense — send them to register instead.
  if (status === 'unauthenticated') {
    return <Navigate to="/register" replace />
  }

  async function handleResend() {
    setError(null)
    setResendStatus('sending')
    try {
      await api.resendVerification()
      setResendStatus('sent')
    } catch (err) {
      setError(err.message || 'Could not resend the verification email.')
      setResendStatus('idle')
    }
  }

  return (
    <>
      <SEO title="Check Your Email" description="Verify your ToolHub email address." canonicalPath="/check-email" />

      <Container className="py-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-md"
        >
          <div className="card flex flex-col items-center gap-3 p-10 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
              <HiOutlineEnvelopeOpen className="h-7 w-7" />
            </div>
            <h1 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
              Check your email
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              We&apos;ve sent a verification link to{' '}
              <strong className="text-slate-700 dark:text-slate-300">{user?.email}</strong>. Click
              it to verify your account — you can also do this anytime later from Settings.
            </p>

            {error && (
              <div className="w-full">
                <ErrorMessage message={error} onDismiss={() => setError(null)} />
              </div>
            )}

            {resendStatus === 'sent' ? (
              <p className="flex items-center gap-1.5 text-sm text-emerald-700 dark:text-emerald-400">
                <HiOutlineCheckCircle className="h-4 w-4" />
                Verification email sent again — check your inbox.
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={resendStatus === 'sending'}
                className="btn-secondary mt-1"
              >
                {resendStatus === 'sending' ? 'Sending...' : "Didn't get it? Resend email"}
              </button>
            )}

            <Link to="/dashboard" className="btn-primary mt-4 w-full">
              Continue to dashboard
            </Link>
          </div>
        </motion.div>
      </Container>
    </>
  )
}
