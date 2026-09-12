import React, { useEffect, useState } from 'react'
import { HiOutlineEnvelope, HiOutlineTrash, HiOutlineCheckCircle, HiOutlineExclamationTriangle } from 'react-icons/hi2'
import SEO from '../../components/ui/SEO.jsx'
import ErrorMessage from '../../components/tools/ErrorMessage.jsx'
import { api } from '../../lib/api.js'

function formatDate(dateString) {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export default function AdminContactMessages() {
  const [messages, setMessages] = useState(null)
  const [error, setError] = useState(null)
  const [expandedId, setExpandedId] = useState(null)

  useEffect(() => {
    api
      .adminGetContactMessages()
      .then(({ data }) => setMessages(data))
      .catch((err) => setError(err.message || 'Could not load messages.'))
  }, [])

  async function handleDelete(id) {
    setError(null)
    try {
      await api.adminDeleteContactMessage(id)
      setMessages((prev) => prev.filter((m) => m._id !== id))
    } catch (err) {
      setError(err.message || 'Could not delete this message.')
    }
  }

  return (
    <>
      <SEO title="Admin \u2014 Contact Messages" description="Messages submitted through the contact form." canonicalPath="/admin/contact" noIndex />

      <h1 className="text-lg font-semibold text-slate-900 dark:text-white">Contact Messages</h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Every message submitted through the Contact page, newest first.
      </p>

      {error && (
        <div className="mt-4">
          <ErrorMessage message={error} onDismiss={() => setError(null)} />
        </div>
      )}

      {!messages && !error && <p className="mt-6 text-sm text-slate-400 dark:text-slate-500">Loading messages...</p>}

      {messages && messages.length === 0 && (
        <div className="mt-6 flex flex-col items-center gap-2 rounded-2xl border border-dashed border-slate-200 py-12 text-center dark:border-slate-800">
          <HiOutlineEnvelope className="h-8 w-8 text-slate-300 dark:text-slate-600" />
          <p className="text-sm text-slate-400 dark:text-slate-500">No messages yet.</p>
        </div>
      )}

      {messages && messages.length > 0 && (
        <ul className="mt-6 space-y-3">
          {messages.map((msg) => {
            const isExpanded = expandedId === msg._id
            return (
              <li key={msg._id} className="card p-4">
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : msg._id)}
                  className="flex w-full flex-wrap items-start justify-between gap-3 text-left"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">{msg.name}</span>
                      <span className="text-xs text-slate-400 dark:text-slate-500">{msg.email}</span>
                    </div>
                    <p className="mt-1 truncate text-sm text-slate-600 dark:text-slate-300">
                      {msg.subject || '(No subject)'}
                    </p>
                  </div>
                  <div className="flex flex-shrink-0 items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
                    {msg.emailDelivered ? (
                      <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                        <HiOutlineCheckCircle className="h-3.5 w-3.5" />
                        Notified
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                        <HiOutlineExclamationTriangle className="h-3.5 w-3.5" />
                        Not delivered
                      </span>
                    )}
                    <span>{formatDate(msg.createdAt)}</span>
                  </div>
                </button>

                {isExpanded && (
                  <div className="mt-3 border-t border-slate-100 pt-3 dark:border-slate-800">
                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {msg.message}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleDelete(msg._id)}
                      className="mt-3 flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-rose-600 dark:text-slate-500 dark:hover:text-rose-400"
                    >
                      <HiOutlineTrash className="h-3.5 w-3.5" />
                      Delete
                    </button>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </>
  )
}
