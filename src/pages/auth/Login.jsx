import React, { useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import Container from '../../components/ui/Container.jsx'
import SEO from '../../components/ui/SEO.jsx'
import ErrorMessage from '../../components/tools/ErrorMessage.jsx'
import GoogleAuthButton from '../../components/auth/GoogleAuthButton.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

const GOOGLE_ERROR_MESSAGES = {
  google_auth_failed: 'Google sign-in was cancelled or could not be completed. Please try again.',
  google_not_configured: 'Google sign-in is not available right now. Please use your email and password.',
}

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const redirectTo = location.state?.from?.pathname || '/dashboard'
  const googleError = GOOGLE_ERROR_MESSAGES[searchParams.get('error')]

  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)
    try {
      await login(form)
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <SEO title="Log In" description="Log in to your ToolHub account." canonicalPath="/login" />

      <Container className="py-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-md"
        >
          <div className="text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {location.state?.message || 'Log in to access your favorites and conversion history.'}
            </p>
          </div>

          <div className="card mt-8 space-y-5 p-6 sm:p-8">
            {googleError && <ErrorMessage message={googleError} />}
            {error && <ErrorMessage message={error} onDismiss={() => setError(null)} />}

            <GoogleAuthButton />

            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
              <span className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
                or
              </span>
              <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div>
                <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                  className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Password
                  </label>
                  <Link to="/forgot-password" className="text-xs font-medium text-brand-600 dark:text-brand-400">
                    Forgot password?
                  </Link>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
                {isSubmitting ? 'Logging in...' : 'Log In'}
              </button>
            </form>

            <p className="text-center text-sm text-slate-500 dark:text-slate-400">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="font-medium text-brand-600 dark:text-brand-400">
                Create one
              </Link>
            </p>
          </div>
        </motion.div>
      </Container>
    </>
  )
}
