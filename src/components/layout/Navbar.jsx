import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { HiBars3, HiXMark } from 'react-icons/hi2'
import Container from '../ui/Container.jsx'
import ThemeToggle from '../ui/ThemeToggle.jsx'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Tools', to: '/tools' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  // Close the mobile menu whenever the viewport is resized back to desktop.
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) setIsOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const linkClasses = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive
        ? 'text-brand-600 dark:text-brand-400'
        : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/80">
      <Container>
        <nav className="flex h-16 items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
              T
            </span>
            <span className="text-lg font-bold text-slate-900 dark:text-white">ToolHub</span>
          </NavLink>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} className={linkClasses} end={link.to === '/'}>
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {isOpen ? <HiXMark className="h-6 w-6" /> : <HiBars3 className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </Container>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-slate-200 bg-white md:hidden dark:border-slate-800 dark:bg-slate-950"
          >
            <Container className="flex flex-col gap-1 py-3">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2.5 text-sm font-medium ${
                      isActive
                        ? 'bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400'
                        : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900'
                    }`
                  }
                  end={link.to === '/'}
                >
                  {link.label}
                </NavLink>
              ))}
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
