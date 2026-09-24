import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { HiChevronDown, HiOutlineArrowRight } from 'react-icons/hi2'
import { categories, categoryColorClasses } from '../../data/categories.js'
import { getToolsByCategory, getToolBySlug } from '../../data/tools.js'

// A curated handful of genuinely popular/flagship tools per category,
// shown as direct one-click links rather than making every visitor
// go through a second click into the category page first — matching
// the established pattern on every major site in this exact space
// (iLovePDF, TinyWow, Smallpdf): "each tool has its own freestanding
// web link" is explicitly what makes those sites fast to use.
// Deliberately short lists (4 each) rather than every tool in the
// category, so this stays genuinely scannable at a glance instead of
// turning into a second, cluttered version of the full Tools page.
const FEATURED_TOOL_SLUGS = {
  'image-tools': ['image-compressor', 'image-resizer', 'background-remover', 'jpg-to-png'],
  'pdf-tools': ['compress-pdf', 'merge-pdf', 'pdf-to-word', 'split-pdf'],
  'developer-tools': ['json-formatter', 'timestamp-converter', 'base64-encoder', 'uuid-generator'],
  'text-tools': ['word-counter', 'case-converter', 'text-diff-checker', 'lorem-ipsum-generator'],
  'color-tools': ['color-picker', 'palette-generator', 'hex-to-rgb', 'color-contrast-checker'],
  'security-tools': ['password-generator', 'password-strength-checker', 'my-ip-address', 'rsa-key-pair-generator'],
  'social-media-tools': ['instagram-post-resizer', 'youtube-thumbnail-downloader', 'whatsapp-link-generator', 'facebook-image-resizer'],
  'audio-video-tools': ['video-to-gif', 'video-compressor', 'audio-trimmer', 'video-trimmer'],
  'unit-converters': ['length-converter', 'temperature-converter', 'time-converter', 'data-converter'],
  'calculator-tools': ['compound-interest-calculator', 'loan-calculator', 'percentage-calculator', 'age-calculator'],
  'fun-tools': ['random-name-picker', 'dice-roller', 'coin-flipper', 'choice-wheel-spinner'],
}

export default function MegaMenu({ onNavigate }) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState(categories[0])
  const containerRef = useRef(null)
  const location = useLocation()

  // Closes on any navigation, not just a click on one of this menu's
  // own links - a sibling dropdown (like an individual category's
  // hover menu) can also trigger navigation, and without this, this
  // menu wouldn't know to close along with it.
  useEffect(() => {
    setIsOpen(false)
  }, [location.key])

  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(event) {
      if (event.key === 'Escape') setIsOpen(false)
    }
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  function handleLinkClick() {
    setIsOpen(false)
    onNavigate?.()
  }

  const featuredTools = (FEATURED_TOOL_SLUGS[activeCategory.slug] || [])
    .map((slug) => getToolBySlug(slug))
    .filter(Boolean)
  const activeColors = categoryColorClasses[activeCategory.color] ?? categoryColorClasses.brand
  const totalToolCount = getToolsByCategory(activeCategory.slug).length

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="flex items-center gap-1 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
      >
        Tools
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.15 }}>
          <HiChevronDown className="h-4 w-4" />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute left-1/2 top-full z-40 mt-3 flex w-[720px] -translate-x-1/2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900"
          >
            {/* Left panel: category list. Hovering a row swaps the right
                panel's featured tools - no click needed to preview a
                category, only to actually navigate. */}
            <div className="w-[260px] flex-shrink-0 border-r border-slate-100 bg-slate-50/60 p-2 dark:border-slate-800 dark:bg-slate-950/40">
              {categories.map((category) => {
                const Icon = category.icon
                const colors = categoryColorClasses[category.color] ?? categoryColorClasses.brand
                const isActive = category.slug === activeCategory.slug
                return (
                  <button
                    key={category.id}
                    type="button"
                    onMouseEnter={() => setActiveCategory(category)}
                    onClick={() => setActiveCategory(category)}
                    className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left transition-colors ${
                      isActive ? 'bg-white shadow-sm dark:bg-slate-900' : 'hover:bg-white/60 dark:hover:bg-slate-900/60'
                    }`}
                  >
                    <div className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg ${colors.bg} ${colors.text}`}>
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <span
                      className={`truncate text-sm ${
                        isActive ? 'font-semibold text-slate-900 dark:text-white' : 'font-medium text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {category.name}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Right panel: the active category's featured tools as
                direct, one-click links. */}
            <div className="flex-1 p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                  Popular in {activeCategory.name}
                </p>
                <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${activeColors.bg} ${activeColors.text}`}>
                  {totalToolCount} tools
                </span>
              </div>

              <div className="grid grid-cols-2 gap-1">
                {featuredTools.map((tool) => {
                  const ToolIcon = tool.icon
                  return (
                    <Link
                      key={tool.id}
                      to={tool.path}
                      onClick={handleLinkClick}
                      className="flex items-center gap-2.5 rounded-xl p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                        <ToolIcon className="h-4 w-4" />
                      </div>
                      <span className="truncate text-sm font-medium text-slate-700 dark:text-slate-200">{tool.name}</span>
                    </Link>
                  )
                })}
              </div>

              <Link
                to={`/tools?category=${activeCategory.slug}`}
                onClick={handleLinkClick}
                className="mt-2 flex items-center gap-1 rounded-xl px-2.5 py-2 text-sm font-medium text-brand-600 hover:bg-brand-50 dark:text-brand-400 dark:hover:bg-brand-950"
              >
                View all {activeCategory.name.toLowerCase()}
                <HiOutlineArrowRight className="h-3.5 w-3.5" />
              </Link>

              <div className="mt-3 border-t border-slate-100 pt-3 dark:border-slate-800">
                <Link
                  to="/tools"
                  onClick={handleLinkClick}
                  className="block rounded-xl px-2.5 py-2 text-sm font-medium text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  Browse all tools &rarr;
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

MegaMenu.propTypes = {
  onNavigate: PropTypes.func,
}
