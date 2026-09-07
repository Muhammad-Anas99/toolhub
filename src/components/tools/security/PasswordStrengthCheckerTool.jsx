import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineEye, HiOutlineEyeSlash, HiOutlineExclamationTriangle } from 'react-icons/hi2'
import { checkPasswordStrength } from '../../../lib/passwordUtils.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

const SCORE_COLORS = [
  'bg-slate-300 dark:bg-slate-700', // None
  'bg-red-500', // Very Weak
  'bg-orange-500', // Weak
  'bg-yellow-500', // Fair
  'bg-emerald-500', // Strong (also used for Very Strong at full width)
]

const LABEL_COLORS = [
  'text-slate-400 dark:text-slate-500',
  'text-red-600 dark:text-red-400',
  'text-orange-600 dark:text-orange-400',
  'text-yellow-600 dark:text-yellow-400',
  'text-emerald-600 dark:text-emerald-400',
]

export default function PasswordStrengthCheckerTool({ toolSlug, toolName, category }) {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { logDebounced } = useHistoryLogger({ toolSlug, toolName, category })

  const result = checkPasswordStrength(password)
  const barCount = 5
  const filledBars = password ? result.score + 1 : 0
  // Very Strong (score 4) uses the same full-emerald color as Strong for
  // the bar fill, but the label itself still reads "Very Strong" - the
  // color scale tops out at 5 bars either way.
  const barColorIndex = Math.min(result.score, 4)

  function handleChange(event) {
    const value = event.target.value
    setPassword(value)
    if (value) logDebounced('Password strength checked')
  }

  return (
    <div className="space-y-5">
      <div className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
        Everything here happens on your device — the password you type is never sent anywhere, not even briefly.
      </div>

      <div>
        <label htmlFor="pw-check-input" className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Enter a password to check
        </label>
        <div className="relative mt-1.5">
          <input
            id="pw-check-input"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handleChange}
            placeholder="Type a password..."
            autoComplete="off"
            spellCheck={false}
            className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 pr-11 font-mono text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          >
            {showPassword ? <HiOutlineEyeSlash className="h-5 w-5" /> : <HiOutlineEye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {password && (
        <>
          <div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">Strength</span>
              <span className={`font-semibold ${LABEL_COLORS[Math.min(result.score, 4)]}`}>{result.label}</span>
            </div>
            <div className="mt-1.5 flex gap-1.5">
              {Array.from({ length: barCount }).map((_, i) => (
                <div
                  key={i}
                  className={`h-2 flex-1 rounded-full ${i < filledBars ? SCORE_COLORS[barColorIndex] : 'bg-slate-200 dark:bg-slate-700'}`}
                />
              ))}
            </div>
            <p className="mt-1.5 text-xs text-slate-400 dark:text-slate-500">{result.bits} bits of entropy</p>
          </div>

          {result.warnings.length > 0 && (
            <div className="space-y-2 rounded-xl bg-amber-50 p-4 dark:bg-amber-950">
              {result.warnings.map((warning, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-amber-800 dark:text-amber-300">
                  <HiOutlineExclamationTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span>{warning}</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

PasswordStrengthCheckerTool.propTypes = {
  toolSlug: PropTypes.string,
  toolName: PropTypes.string,
  category: PropTypes.string,
}
