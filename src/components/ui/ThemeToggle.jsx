import React from 'react'
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi2'
import { useTheme } from '../../context/ThemeContext.jsx'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
    >
      {isDark ? <HiOutlineSun className="h-5 w-5" /> : <HiOutlineMoon className="h-5 w-5" />}
    </button>
  )
}
