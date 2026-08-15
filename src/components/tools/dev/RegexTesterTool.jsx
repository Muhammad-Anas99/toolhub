import React, { useMemo, useState } from 'react'

const FLAG_OPTIONS = [
  { id: 'g', label: 'Global (g)' },
  { id: 'i', label: 'Case-insensitive (i)' },
  { id: 'm', label: 'Multiline (m)' },
  { id: 's', label: 'Dot matches newline (s)' },
]

export default function RegexTesterTool() {
  const [pattern, setPattern] = useState('')
  const [flags, setFlags] = useState(['g'])
  const [testString, setTestString] = useState('')

  function toggleFlag(flag) {
    setFlags((prev) => (prev.includes(flag) ? prev.filter((f) => f !== flag) : [...prev, flag]))
  }

  const { regex, error, matches } = useMemo(() => {
    if (pattern === '') return { regex: null, error: null, matches: [] }
    try {
      const re = new RegExp(pattern, flags.join(''))
      const found = []
      if (flags.includes('g')) {
        let match
        // eslint-disable-next-line no-cond-assign
        while ((match = re.exec(testString)) !== null) {
          found.push(match)
          if (match[0] === '') re.lastIndex += 1 // avoid an infinite loop on zero-width matches
        }
      } else {
        const match = re.exec(testString)
        if (match) found.push(match)
      }
      return { regex: re, error: null, matches: found }
    } catch (err) {
      return { regex: null, error: err.message, matches: [] }
    }
  }, [pattern, flags, testString])

  const highlighted = useMemo(() => {
    if (!regex || testString === '' || matches.length === 0) return null
    const parts = []
    let lastIndex = 0
    matches.forEach((match, index) => {
      if (match.index > lastIndex) parts.push({ text: testString.slice(lastIndex, match.index), isMatch: false })
      parts.push({ text: match[0] || '', isMatch: true, key: index })
      lastIndex = match.index + (match[0]?.length || 0)
    })
    if (lastIndex < testString.length) parts.push({ text: testString.slice(lastIndex), isMatch: false })
    return parts
  }, [regex, testString, matches])

  return (
    <div className="space-y-5">
      <div>
        <label htmlFor="regex-pattern" className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Pattern
        </label>
        <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800">
          <span className="flex-shrink-0 font-mono text-sm text-slate-400">/</span>
          <input
            id="regex-pattern"
            type="text"
            value={pattern}
            onChange={(event) => setPattern(event.target.value)}
            placeholder="[a-z]+@[a-z]+\.[a-z]{2,}"
            spellCheck={false}
            className="w-full bg-transparent font-mono text-sm text-slate-900 focus:outline-none dark:text-white"
          />
          <span className="flex-shrink-0 font-mono text-sm text-slate-400">/{flags.join('')}</span>
        </div>
        {error && <p className="mt-2 text-sm text-rose-500">Invalid pattern: {error}</p>}
      </div>

      <div className="flex flex-wrap gap-2">
        {FLAG_OPTIONS.map((flag) => (
          <button
            key={flag.id}
            type="button"
            onClick={() => toggleFlag(flag.id)}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
              flags.includes(flag.id)
                ? 'bg-brand-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
            }`}
          >
            {flag.label}
          </button>
        ))}
      </div>

      <div>
        <label htmlFor="regex-test-string" className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Test string
        </label>
        <textarea
          id="regex-test-string"
          rows={6}
          value={testString}
          onChange={(event) => setTestString(event.target.value)}
          placeholder="Paste text to test your pattern against..."
          spellCheck={false}
          className="mt-1.5 w-full resize-y rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 font-mono text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
      </div>

      {pattern !== '' && !error && (
        <div className="card p-4">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {matches.length} match{matches.length === 1 ? '' : 'es'}
          </p>
          {highlighted && (
            <p className="mt-3 whitespace-pre-wrap break-words font-mono text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {highlighted.map((part, index) =>
                part.isMatch ? (
                  <mark
                    key={index}
                    className="rounded bg-brand-200 px-0.5 text-slate-900 dark:bg-brand-800 dark:text-white"
                  >
                    {part.text}
                  </mark>
                ) : (
                  <span key={index}>{part.text}</span>
                )
              )}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
