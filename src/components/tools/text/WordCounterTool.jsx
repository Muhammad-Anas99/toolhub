import React, { useState } from 'react'
import { analyzeText, formatReadingTime } from '../../../lib/textToolsUtils.js'

export default function WordCounterTool() {
  const [text, setText] = useState('')
  const stats = analyzeText(text)

  const statItems = [
    { label: 'Words', value: stats.words },
    { label: 'Characters', value: stats.characters },
    { label: 'Characters (no spaces)', value: stats.charactersNoSpaces },
    { label: 'Sentences', value: stats.sentences },
    { label: 'Paragraphs', value: stats.paragraphs },
  ]

  return (
    <div className="space-y-5">
      <div>
        <label htmlFor="word-counter-input" className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Paste or type your text
        </label>
        <textarea
          id="word-counter-input"
          rows={12}
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Start typing or paste text here..."
          className="mt-1.5 w-full resize-y rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {statItems.map((item) => (
          <div key={item.label} className="card p-4 text-center">
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{item.value}</p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{item.label}</p>
          </div>
        ))}
      </div>

      {stats.words > 0 && (
        <p className="text-center text-sm text-slate-400 dark:text-slate-500">
          {formatReadingTime(stats.readingTimeMinutes)}
        </p>
      )}
    </div>
  )
}
