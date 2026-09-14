import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { HiOutlineClipboard, HiOutlineCheck } from 'react-icons/hi2'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

const RICKROLL_URL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'

export default function RickrollGeneratorTool({ toolSlug, toolName, category }) {
  const [copied, setCopied] = useState(false)
  const { logNow } = useHistoryLogger({ toolSlug, toolName, category })

  function copy() {
    navigator.clipboard.writeText(RICKROLL_URL)
    setCopied(true)
    logNow('Rickroll link copied')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-5">
      <div className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:bg-slate-900/40 dark:text-slate-300">
        This always links to the same well-known video \u2014 it\u2019s a classic, harmless internet joke, not a tool for
        disguising where a link actually goes.
      </div>

      <div className="card flex items-center justify-between gap-4 p-4">
        <code className="min-w-0 flex-1 truncate font-mono text-sm text-slate-900 dark:text-white">{RICKROLL_URL}</code>
        <button type="button" onClick={copy} className="btn-primary flex-shrink-0 text-sm">
          {copied ? <HiOutlineCheck className="h-4 w-4" /> : <HiOutlineClipboard className="h-4 w-4" />}
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
      </div>

      <p className="text-xs text-slate-400 dark:text-slate-500">
        Want it to look less obvious when shared? You can shorten this link with this site&apos;s own{' '}
        <Link to="/tools/url-shortener" className="text-brand-600 hover:underline dark:text-brand-400">
          URL Shortener
        </Link>
        .
      </p>
    </div>
  )
}

RickrollGeneratorTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
