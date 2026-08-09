import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Container from '../../components/ui/Container.jsx'
import SEO from '../../components/ui/SEO.jsx'
import ErrorMessage from '../../components/tools/ErrorMessage.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

const INITIAL_FORM = { name: '', email: '', password: '' }

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Please enter your name.'
  if (!form.email.trim()) {
    errors.email = 'Please enter your email.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!form.password) {
    errors.password = 'Please choose a password.'
  } else if (form.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.'
  } else if (!/\d/.test(form.password)) {
    errors.password = 'Password must contain at least one number.'
  }
  return errors
}

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState(INITIAL_FORM)
  const [fieldErrors, setFieldErrors] = useState({})
  const [formError, setFormError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (fieldErrors[name]) setFieldErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const errors = validate(form)
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) return

    setFormError(null)
    setIsSubmitting(true)
    try {
      await register(form)
      navigate('/check-email', { replace: true })
    } catch (err) {
      setFormError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <SEO title="Create Account" description="Create a free ToolHub account." canonicalPath="/register" />

      <Container className="py-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-md"
        >
          <div className="text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Create your account
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Free forever. Save favorites, track your conversion history.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="card mt-8 space-y-5 p-6 sm:p-8">
            {formError && <ErrorMessage message={formError} onDismiss={() => setFormError(null)} />}

            <div>
              <label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
                aria-invalid={Boolean(fieldErrors.name)}
                className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
              {fieldErrors.name && <p className="mt-1.5 text-xs text-rose-500">{fieldErrors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                aria-invalid={Boolean(fieldErrors.email)}
                className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
              {fieldErrors.email && <p className="mt-1.5 text-xs text-rose-500">{fieldErrors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                autoComplete="new-password"
                aria-invalid={Boolean(fieldErrors.password)}
                className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
              {fieldErrors.password ? (
                <p className="mt-1.5 text-xs text-rose-500">{fieldErrors.password}</p>
              ) : (
                <p className="mt-1.5 text-xs text-slate-400 dark:text-slate-500">
                  At least 8 characters, including a number.
                </p>
              )}
            </div>

            <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
              {isSubmitting ? 'Creating account...' : 'Create account'}
            </button>

            <p className="text-center text-sm text-slate-500 dark:text-slate-400">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-brand-600 dark:text-brand-400">
                Sign in
              </Link>
            </p>
          </form>
        </motion.div>
      </Container>
    </>
  )
}
