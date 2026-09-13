import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineBold, HiOutlineItalic, HiOutlineCodeBracket } from 'react-icons/hi2'
import CopyButton from '../CopyButton.jsx'
import { applyWhatsAppFormat } from '../../../lib/whatsappUtils.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

const FORMAT_BUTTONS = [
  { id: 'bold', label: 'Bold', icon: HiOutlineBold },
  { id: 'italic', label: 'Italic', icon: HiOutlineItalic },
  { id: 'strikethrough', label: 'Strike', icon: null },
  { id: 'monospace', label: 'Mono', icon: HiOutlineCodeBracket },
]

export default function WhatsAppTextFormatterTool({ toolSlug, toolName, category }) {
  const [text, setText] = useState('')
  const textareaRef = useRef(null)
  const { logDebounced } = useHistoryLogger({ toolSlug, toolName, category })

  function applyFormat(formatId) {
    const textarea = textareaRef.current
    if (!textarea) return
    const { selectionStart, selectionEnd, value } = textarea
    const selected = value.slice(selectionStart, selectionEnd)
    if (!selected) return

    const formatted = applyWhatsAppFormat(selected, formatId)
    const newValue = value.slice(0, selectionStart) + formatted + value.slice(selectionEnd)
    setText(newValue)
    logDebounced('WhatsApp text formatted', newValue)

    requestAnimationFrame(() => {
      textarea.focus()
      const newCursorPos = selectionStart + formatted.length
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    })
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:bg-slate-900/40 dark:text-slate-300">
        Select some text below, then click a format button. This uses WhatsApp&apos;s own formatting characters, so
        the result works when pasted directly into a real WhatsApp message.
      </div>

      <div className="flex gap-2">
        {FORMAT_BUTTONS.map((btn) => (
          <button
            key={btn.id}
            type="button"
            onClick={() => applyFormat(btn.id)}
            className="flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            {btn.icon && <btn.icon className="h-4 w-4" />}
            {btn.label}
          </button>
        ))}
      </div>

      <textarea
        ref={textareaRef}
        value={text}
        onChange={(event) => setText(event.target.value)}
        rows={6}
        placeholder="Type your message, then select text and click a format button above."
        className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 font-mono text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
      />

      {text && (
        <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-900/40">
          <span className="text-xs text-slate-400 dark:text-slate-500">Ready to paste into WhatsApp</span>
          <CopyButton value={text} />
        </div>
      )}
    </div>
  )
}

WhatsAppTextFormatterTool.propTypes = {
  toolSlug: PropTypes.string,
  toolName: PropTypes.string,
  category: PropTypes.string,
}
