import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineDocumentDuplicate, HiOutlineExclamationTriangle } from 'react-icons/hi2'
import { generateMetaTags, validateMetaFields } from '../../../lib/metaTagUtils.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

const fieldInputClasses =
  'mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white'

export default function MetaTagGeneratorTool({ toolSlug, toolName, category }) {
  const [fields, setFields] = useState({
    title: '',
    description: '',
    canonicalUrl: '',
    ogImage: '',
    siteName: '',
    twitterCard: 'summary_large_image',
    twitterHandle: '',
  })
  const [copied, setCopied] = useState(false)
  const { logDebounced } = useHistoryLogger({ toolSlug, toolName, category })

  function updateField(name, value) {
    setFields((prev) => ({ ...prev, [name]: value }))
  }

  const output = useMemo(() => {
    const result = generateMetaTags(fields)
    if (fields.title) logDebounced('Meta tags generated')
    return result
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields])

  const warnings = validateMetaFields(fields)

  function handleCopy() {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <div>
          <label htmlFor="meta-title" className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Page title
          </label>
          <input
            id="meta-title"
            type="text"
            value={fields.title}
            onChange={(event) => updateField('title', event.target.value)}
            className={fieldInputClasses}
          />
        </div>
        <div>
          <label htmlFor="meta-description" className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Meta description
          </label>
          <textarea
            id="meta-description"
            rows={2}
            value={fields.description}
            onChange={(event) => updateField('description', event.target.value)}
            className={`${fieldInputClasses} resize-none`}
          />
        </div>
        <div>
          <label htmlFor="meta-canonical" className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Canonical URL
          </label>
          <input
            id="meta-canonical"
            type="text"
            placeholder="https://example.com/page"
            value={fields.canonicalUrl}
            onChange={(event) => updateField('canonicalUrl', event.target.value)}
            className={fieldInputClasses}
          />
        </div>
      </div>

      {(fields.title || fields.description) && (
        <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
          <p className="text-xs text-slate-400 dark:text-slate-500">Search result preview</p>
          <p className="mt-2 truncate text-sm text-emerald-700 dark:text-emerald-400">{fields.canonicalUrl || 'https://example.com/page'}</p>
          <p className="truncate text-lg text-blue-700 dark:text-blue-400">{fields.title || 'Page Title'}</p>
          <p className="mt-1 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">{fields.description || 'Meta description preview...'}</p>
        </div>
      )}

      {warnings.length > 0 && (
        <div className="space-y-1.5 rounded-xl bg-amber-50 p-4 dark:bg-amber-950">
          {warnings.map((warning, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-amber-800 dark:text-amber-300">
              <HiOutlineExclamationTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <span>{warning}</span>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="meta-og-image" className="text-xs text-slate-500 dark:text-slate-400">
            Social share image URL
          </label>
          <input
            id="meta-og-image"
            type="text"
            placeholder="https://example.com/image.png"
            value={fields.ogImage}
            onChange={(event) => updateField('ogImage', event.target.value)}
            className={fieldInputClasses}
          />
        </div>
        <div>
          <label htmlFor="meta-site-name" className="text-xs text-slate-500 dark:text-slate-400">
            Site name
          </label>
          <input
            id="meta-site-name"
            type="text"
            value={fields.siteName}
            onChange={(event) => updateField('siteName', event.target.value)}
            className={fieldInputClasses}
          />
        </div>
        <div>
          <label htmlFor="meta-twitter-card" className="text-xs text-slate-500 dark:text-slate-400">
            Twitter card type
          </label>
          <select
            id="meta-twitter-card"
            value={fields.twitterCard}
            onChange={(event) => updateField('twitterCard', event.target.value)}
            className={fieldInputClasses}
          >
            <option value="summary_large_image">Summary (large image)</option>
            <option value="summary">Summary (small image)</option>
          </select>
        </div>
        <div>
          <label htmlFor="meta-twitter-handle" className="text-xs text-slate-500 dark:text-slate-400">
            Twitter/X handle (optional)
          </label>
          <input
            id="meta-twitter-handle"
            type="text"
            placeholder="yourhandle"
            value={fields.twitterHandle}
            onChange={(event) => updateField('twitterHandle', event.target.value)}
            className={fieldInputClasses}
          />
        </div>
      </div>

      <button type="button" onClick={handleCopy} className="btn-primary text-sm">
        <HiOutlineDocumentDuplicate className="h-4 w-4" />
        {copied ? 'Copied!' : 'Copy Tags'}
      </button>

      <div className="rounded-xl bg-slate-900 p-4 dark:bg-slate-950">
        <pre className="overflow-x-auto whitespace-pre-wrap text-xs text-slate-200">
          <code>{output}</code>
        </pre>
      </div>
    </div>
  )
}

MetaTagGeneratorTool.propTypes = {
  toolSlug: PropTypes.string,
  toolName: PropTypes.string,
  category: PropTypes.string,
}
