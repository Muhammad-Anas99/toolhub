import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiOutlineCheckCircle } from 'react-icons/hi2'
import Container from '../../components/ui/Container.jsx'
import SEO from '../../components/ui/SEO.jsx'
import ErrorMessage from '../../components/tools/ErrorMessage.jsx'
import { api } from '../../lib/api.js'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)
    try {
      await api.forgotPassword(email)
      setIsSubmitted(true)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <SEO title="Forgot Password" description="Reset your ToolHub password." canonicalPath="/forgot-password" />

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
              <h1 className="text-lg font-semibold text-slate-900 dark:text-white">Check your email</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                If an account exists for <strong>{email}</strong>, we&apos;ve sent a link to reset your
                password. It expires in 1 hour.
              </p>
              <Link to="/login" className="btn-secondary mt-2">
                Back to sign in
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center">
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  Forgot your password?
                </h1>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Enter your email and we&apos;ll send you a reset link.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="card mt-8 space-y-5 p-6 sm:p-8">
                {error && <ErrorMessage message={error} onDismiss={() => setError(null)} />}

                <div>
                  <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    autoComplete="email"
                    className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
                  {isSubmitting ? 'Sending...' : 'Send reset link'}
                </button>

                <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                  <Link to="/login" className="font-medium text-brand-600 dark:text-brand-400">
                    Back to sign in
                  </Link>
                </p>
              </form>
            </>
          )}
        </motion.div>
      </Container>
    </>
  )
}
