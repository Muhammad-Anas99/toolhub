import React, { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiOutlineCheckCircle, HiOutlineExclamationTriangle } from 'react-icons/hi2'
import Container from '../../components/ui/Container.jsx'
import SEO from '../../components/ui/SEO.jsx'
import ErrorMessage from '../../components/tools/ErrorMessage.jsx'
import { api } from '../../lib/api.js'

export default function ResetPassword() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError(null)

    if (password.length < 8 || !/\d/.test(password)) {
      setError('Password must be at least 8 characters and contain a number.')
      return
    }

    setIsSubmitting(true)
    try {
      await api.resetPassword(token, password)
      setIsSubmitted(true)
      setTimeout(() => navigate('/login', { replace: true }), 2500)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!token) {
    return (
      <Container className="py-16">
        <div className="card mx-auto flex max-w-md flex-col items-center gap-3 p-10 text-center">
          <HiOutlineExclamationTriangle className="h-12 w-12 text-amber-500" />
          <h1 className="text-lg font-semibold text-slate-900 dark:text-white">Invalid link</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            This password reset link is missing its token. Request a new one below.
          </p>
          <Link to="/forgot-password" className="btn-secondary mt-2">
            Request a new link
          </Link>
        </div>
      </Container>
    )
  }

  return (
    <>
      <SEO title="Reset Password" description="Choose a new password for your ToolHub account." canonicalPath="/reset-password" />

      <Container className="py-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-md"
        >
          {isSubmitted ? (
            <div className="card flex flex-col items-center gap-3 p-10 text-center">
              <HiOutlineCheckCircle className="h-12 w-12 text-emerald-500" />
              <h1 className="text-lg font-semibold text-slate-900 dark:text-white">Password reset</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Redirecting you to sign in with your new password...
              </p>
            </div>
          ) : (
            <>
              <div className="text-center">
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  Choose a new password
                </h1>
              </div>

              <form onSubmit={handleSubmit} noValidate className="card mt-8 space-y-5 p-6 sm:p-8">
                {error && <ErrorMessage message={error} onDismiss={() => setError(null)} />}

                <div>
                  <label htmlFor="password" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    New password
                  </label>
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete="new-password"
                    className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                  <p className="mt-1.5 text-xs text-slate-400 dark:text-slate-500">
                    At least 8 characters, including a number.
                  </p>
                </div>

                <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
                  {isSubmitting ? 'Resetting...' : 'Reset password'}
                </button>
              </form>
            </>
          )}
        </motion.div>
      </Container>
    </>
  )
}
