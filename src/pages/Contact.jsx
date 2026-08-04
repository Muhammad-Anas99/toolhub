import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { HiOutlineEnvelope, HiOutlineCheckCircle } from 'react-icons/hi2'
import Container from '../components/ui/Container.jsx'
import SEO from '../components/ui/SEO.jsx'

const INITIAL_FORM = { name: '', email: '', subject: '', message: '' }

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Please enter your name.'
  if (!form.email.trim()) {
    errors.email = 'Please enter your email.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!form.subject.trim()) errors.subject = 'Please add a subject.'
  if (!form.message.trim()) {
    errors.message = 'Please write a message.'
  } else if (form.message.trim().length < 10) {
    errors.message = 'Your message should be at least 10 characters.'
  }
  return errors
}

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | submitted

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    // No backend is connected yet — this simulates a successful submission
    // so the form's UX can be built and tested ahead of the API integration.
    setStatus('submitting')
    setTimeout(() => {
      setStatus('submitted')
      setForm(INITIAL_FORM)
    }, 600)
  }

  return (
    <>
      <SEO
        title="Contact"
        description="Get in touch with the ToolHub team with questions, feedback or tool requests."
        canonicalPath="/contact"
      />

      <Container className="py-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-xl text-center"
        >
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Get in touch
          </h1>
          <p className="mt-4 text-slate-500 dark:text-slate-400">
            Have a question, found a bug, or want to suggest a new tool? We&apos;d love to hear
            from you.
          </p>
        </motion.div>

        <div className="mx-auto mt-12 max-w-xl">
          {status === 'submitted' ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="card flex flex-col items-center gap-3 p-10 text-center"
            >
              <HiOutlineCheckCircle className="h-12 w-12 text-emerald-500" />
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Message sent
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Thanks for reaching out — we&apos;ll get back to you as soon as we can.
              </p>
              <button type="button" onClick={() => setStatus('idle')} className="btn-secondary mt-2">
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="card space-y-5 p-6 sm:p-8">
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
                  aria-invalid={Boolean(errors.name)}
                  className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
                {errors.name && <p className="mt-1.5 text-xs text-rose-500">{errors.name}</p>}
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
                  aria-invalid={Boolean(errors.email)}
                  className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
                {errors.email && <p className="mt-1.5 text-xs text-rose-500">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="subject" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.subject)}
                  className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
                {errors.subject && <p className="mt-1.5 text-xs text-rose-500">{errors.subject}</p>}
              </div>

              <div>
                <label htmlFor="message" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.message)}
                  className="mt-1.5 w-full resize-none rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
                {errors.message && <p className="mt-1.5 text-xs text-rose-500">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn-primary w-full"
              >
                <HiOutlineEnvelope className="h-4 w-4" />
                {status === 'submitting' ? 'Sending...' : 'Send message'}
              </button>
            </form>
          )}
        </div>
      </Container>
    </>
  )
}
