import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineExclamationTriangle, HiOutlineXCircle, HiOutlineInformationCircle } from 'react-icons/hi2'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

const ICONS = {
  error: { Icon: HiOutlineXCircle, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-950' },
  warning: { Icon: HiOutlineExclamationTriangle, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950' },
  info: { Icon: HiOutlineInformationCircle, color: 'text-sky-500', bg: 'bg-sky-50 dark:bg-sky-950' },
}

export default function FakeErrorDesignerTool({ toolSlug, toolName, category }) {
  const [type, setType] = useState('error')
  const [title, setTitle] = useState('Oops! Something Went Wrong')
  const [message, setMessage] = useState('Your coffee has run out. Please refill and try again.')
  const [buttonText, setButtonText] = useState('OK')
  const { logDebounced } = useHistoryLogger({ toolSlug, toolName, category })

  const { Icon, color, bg } = ICONS[type]
  logDebounced('Fake error message designed', title)

  return (
    <div className="space-y-5">
      <div className="rounded-xl bg-slate-50 px-4 py-3 text-xs text-slate-500 dark:bg-slate-900/40 dark:text-slate-400">
        A fun, obviously-a-joke error card for memes and pranks among friends \u2014 not a realistic system dialog.
      </div>

      <div className="flex gap-2">
        {Object.keys(ICONS).map((t) => (
          <button key={t} type="button" onClick={() => setType(t)} className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${type === t ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="grid gap-3">
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Message</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Button text</label>
          <input type="text" value={buttonText} onChange={(e) => setButtonText(e.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
        </div>
      </div>

      <div className="mx-auto max-w-sm rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-xl dark:border-slate-700 dark:bg-slate-900">
        <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${bg}`}>
          <Icon className={`h-8 w-8 ${color}`} />
        </div>
        <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{message}</p>
        <button type="button" className="btn-primary mt-5 w-full justify-center">
          {buttonText}
        </button>
      </div>
    </div>
  )
}

FakeErrorDesignerTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
