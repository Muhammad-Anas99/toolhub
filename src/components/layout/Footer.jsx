import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa6'
import Container from '../ui/Container.jsx'
import { categories } from '../../data/categories.js'

const RESOURCE_LINKS = [
  { label: 'All Tools', to: '/tools' },
  { label: 'Blog', to: '/blog' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

const LEGAL_LINKS = [
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms & Conditions', to: '/terms' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  function handleSubscribe(event) {
    event.preventDefault()
    if (!email.trim()) return
    // Newsletter backend isn't wired up yet (Phase 2 covers frontend only).
    // This simply confirms the interaction in the UI for now.
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
                T
              </span>
              <span className="text-lg font-bold text-slate-900 dark:text-white">ToolHub</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-slate-500 dark:text-slate-400">
              Free online tools that work right in your browser. No installs, no sign-up.
            </p>

            <form onSubmit={handleSubscribe} className="mt-5 max-w-xs">
              <label htmlFor="footer-email" className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Get notified about new tools
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  id="footer-email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
                <button type="submit" className="btn-primary flex-shrink-0 px-4 py-2 text-sm">
                  Join
                </button>
              </div>
              {subscribed && (
                <p className="mt-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  Thanks — you&apos;re on the list!
                </p>
              )}
            </form>

            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ToolHub on GitHub"
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <FaGithub className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ToolHub on Twitter"
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <FaTwitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ToolHub on LinkedIn"
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Categories</h3>
            <ul className="mt-3 grid grid-cols-2 gap-2.5">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/tools?category=${category.slug}`}
                    className="text-sm text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Resources</h3>
            <ul className="mt-3 space-y-2.5">
              {RESOURCE_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 sm:flex-row dark:border-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            &copy; {year} ToolHub. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}
