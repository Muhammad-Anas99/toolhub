import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FaWhatsapp } from 'react-icons/fa6'
import CopyButton from '../CopyButton.jsx'
import { buildWhatsAppLink } from '../../../lib/whatsappUtils.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

export default function WhatsAppLinkGeneratorTool({ toolSlug, toolName, category }) {
  const [number, setNumber] = useState('')
  const [message, setMessage] = useState('')
  const { logDebounced } = useHistoryLogger({ toolSlug, toolName, category })

  const link = buildWhatsAppLink(number, message)
  const hasInput = number.trim().length > 0

  function handleNumberChange(event) {
    const value = event.target.value
    setNumber(value)
    const result = buildWhatsAppLink(value, message)
    if (result) logDebounced('WhatsApp link generated', result)
  }

  return (
    <div className="space-y-5">
      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Phone number (with country code)</label>
        <input
          type="text"
          value={number}
          onChange={handleNumberChange}
          placeholder="+1 234 567 8900"
          className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
        <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
          Include the country code. Spaces, dashes, and a leading + are all fine.
        </p>
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Pre-filled message (optional)</label>
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          rows={3}
          placeholder="Hi! I'd like to ask about..."
          className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
      </div>

      {hasInput && !link && (
        <p className="text-sm text-rose-600 dark:text-rose-400">
          That doesn&apos;t look like a complete phone number with a country code yet.
        </p>
      )}

      {link && (
        <div className="card space-y-3 p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-emerald-700 dark:text-emerald-400">
            <FaWhatsapp className="h-4 w-4" />
            Your link
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-900/40">
            <code className="flex-1 truncate text-sm text-slate-700 dark:text-slate-300">{link}</code>
            <CopyButton value={link} />
          </div>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:underline dark:text-brand-400"
          >
            Test it &mdash; open in WhatsApp
          </a>
        </div>
      )}
    </div>
  )
}

WhatsAppLinkGeneratorTool.propTypes = {
  toolSlug: PropTypes.string,
  toolName: PropTypes.string,
  category: PropTypes.string,
}
