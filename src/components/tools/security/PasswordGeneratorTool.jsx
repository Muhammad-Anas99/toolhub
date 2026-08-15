import React, { useState } from 'react'
import { HiOutlineArrowPath } from 'react-icons/hi2'
import { generatePassword, calculatePasswordStrength, getCharsetSize } from '../../../lib/passwordUtils.js'
import CopyButton from '../CopyButton.jsx'

const OPTIONS = [
  { id: 'uppercase', label: 'Uppercase (A-Z)' },
  { id: 'lowercase', label: 'Lowercase (a-z)' },
  { id: 'numbers', label: 'Numbers (0-9)' },
  { id: 'symbols', label: 'Symbols (!@#$...)' },
]

export default function PasswordGeneratorTool() {
  const [length, setLength] = useState(16)
  const [charsets, setCharsets] = useState({ uppercase: true, lowercase: true, numbers: true, symbols: true })
  const [password, setPassword] = useState(() => generatePassword({ length: 16, ...charsets }))

  const atLeastOneCharset = Object.values(charsets).some(Boolean)
  const strength = calculatePasswordStrength(length, getCharsetSize(charsets))

  function handleGenerate() {
    if (!atLeastOneCharset) return
    setPassword(generatePassword({ length, ...charsets }))
  }

  function toggleCharset(id) {
    setCharsets((prev) => {
      const next = { ...prev, [id]: !prev[id] }
      // Never allow every option to be turned off — generating would have
      // nothing to draw characters from.
      if (!Object.values(next).some(Boolean)) return prev
      return next
    })
  }

  const strengthColors = {
    0: 'bg-slate-200 dark:bg-slate-700',
    1: 'bg-rose-500',
    2: 'bg-amber-500',
    3: 'bg-emerald-500',
    4: 'bg-emerald-600',
  }

  return (
    <div className="space-y-6">
      <div className="card p-5">
        <div className="flex items-center justify-between gap-4">
          <p className="flex-1 truncate font-mono text-lg text-slate-900 dark:text-white">{password || '\u2014'}</p>
          <div className="flex flex-shrink-0 gap-2">
            <CopyButton value={password} />
            <button type="button" onClick={handleGenerate} className="btn-secondary text-xs">
              <HiOutlineArrowPath className="h-3.5 w-3.5" />
              New
            </button>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex h-1.5 gap-1">
            {[1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`flex-1 rounded-full ${level <= strength.score ? strengthColors[strength.score] : 'bg-slate-200 dark:bg-slate-700'}`}
              />
            ))}
          </div>
          <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
            {strength.label} — ~{strength.bits} bits of entropy
          </p>
        </div>
      </div>

      <div className="card space-y-5 p-5">
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password-length" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Length
            </label>
            <span className="text-sm font-semibold text-brand-600 dark:text-brand-400">{length}</span>
          </div>
          <input
            id="password-length"
            type="range"
            min="6"
            max="64"
            value={length}
            onChange={(event) => setLength(Number(event.target.value))}
            className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-brand-600 dark:bg-slate-700"
          />
        </div>

        <div className="space-y-2.5">
          {OPTIONS.map((option) => (
            <label key={option.id} className="flex cursor-pointer items-center justify-between">
              <span className="text-sm text-slate-700 dark:text-slate-300">{option.label}</span>
              <input
                type="checkbox"
                checked={charsets[option.id]}
                onChange={() => toggleCharset(option.id)}
                className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500 dark:border-slate-600"
              />
            </label>
          ))}
        </div>

        <button type="button" onClick={handleGenerate} className="btn-primary w-full">
          Generate Password
        </button>
      </div>
    </div>
  )
}
