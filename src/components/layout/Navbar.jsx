import React, { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { HiBars3, HiXMark, HiOutlineMagnifyingGlass, HiChevronDown } from 'react-icons/hi2'
import Container from '../ui/Container.jsx'
import ThemeToggle from '../ui/ThemeToggle.jsx'
import SearchModal from '../ui/SearchModal.jsx'
import MegaMenu from './MegaMenu.jsx'
import CategoryToolsDropdown from './CategoryToolsDropdown.jsx'
import UserMenu from './UserMenu.jsx'
import { categories } from '../../data/categories.js'
import { useAuth } from '../../context/AuthContext.jsx'

// Desktop: hover dropdowns showing that category's tools directly, next to
// the full "Categories" mega menu. Mobile: simple tap-through links to the
// filtered Tools page instead (hover doesn't apply on touch, and mobile
// already has the full Categories accordion for browsing everything).
const CATEGORY_SHORTCUTS = [
  { label: 'Image Tools', slug: 'image-tools' },
  { label: 'PDF Tools', slug: 'pdf-tools' },
]

const NAV_LINKS = [
  { label: 'Blog', to: '/blog' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const { isAuthenticated } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  // Close the mobile menu whenever the viewport is resized back to desktop.
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Keyboard shortcut: Cmd/Ctrl+K opens search.
  useEffect(() => {
    function handleKeyDown(event) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setIsSearchOpen(true)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
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
          <NavLink
            to="/"
            className="flex flex-shrink-0 items-center gap-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white"
            >
              T
            </span>
            <span className="text-lg font-bold text-slate-900 dark:text-white">ToolHub</span>
          </NavLink>

          <div className="hidden items-center gap-8 md:flex">
            <MegaMenu />
            {CATEGORY_SHORTCUTS.map((shortcut) => (
              <CategoryToolsDropdown key={shortcut.slug} categorySlug={shortcut.slug} label={shortcut.label} />
            ))}
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} className={linkClasses}>
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-400 transition-colors hover:border-slate-300 hover:text-slate-600 dark:border-slate-800 dark:hover:border-slate-700 dark:hover:text-slate-300"
            >
              <HiOutlineMagnifyingGlass className="h-4 w-4" />
              <span>Search</span>
              <kbd className="ml-2 rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-medium text-slate-400 dark:border-slate-700 dark:bg-slate-800">
                &#8984;K
              </kbd>
            </button>
            <ThemeToggle />
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <Link to="/register" className="btn-primary px-4 py-2 text-sm shadow-sm">
                Get Started
              </Link>
            )}
          </div>

          <div className="flex items-center gap-1.5 md:hidden">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <HiOutlineMagnifyingGlass className="h-5 w-5" />
            </button>
            <ThemeToggle />
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              // Visible directly in the navbar, not tucked inside the
              // hamburger menu — the whole point of this being here.
              <Link
                to="/register"
                className="btn-primary flex-shrink-0 whitespace-nowrap px-3 py-1.5 text-xs sm:text-sm"
              >
                Get Started
              </Link>
            )}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {isMobileMenuOpen ? <HiXMark className="h-6 w-6" /> : <HiBars3 className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </Container>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-slate-200 bg-white md:hidden dark:border-slate-800 dark:bg-slate-950"
          >
            <Container className="flex flex-col gap-1 py-3">
              <button
                type="button"
                onClick={() => setIsMobileCategoriesOpen((prev) => !prev)}
                aria-expanded={isMobileCategoriesOpen}
                className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900"
              >
                Categories
                <motion.span
                  animate={{ rotate: isMobileCategoriesOpen ? 180 : 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <HiChevronDown className="h-4 w-4" />
                </motion.span>
              </button>

              <AnimatePresence>
                {isMobileCategoriesOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden pl-3"
                  >
                    <div className="flex flex-col gap-1 border-l border-slate-200 pl-3 dark:border-slate-800">
                      {categories.map((category) => (
                        <Link
                          key={category.id}
                          to={`/tools?category=${category.slug}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2.5 text-sm font-medium ${
                      isActive
                        ? 'bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400'
                        : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              {isAuthenticated && (
                <>
                  <div className="my-1 border-t border-slate-200 dark:border-slate-800" />
                  <NavLink
                    to="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900"
                  >
                    Dashboard
                  </NavLink>
                </>
              )}

              {!isAuthenticated && (
                <>
                  <div className="my-1 border-t border-slate-200 dark:border-slate-800" />
                  <NavLink
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900"
                  >
                    Log In
                  </NavLink>
                </>
              )}
            </Container>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  )
}
