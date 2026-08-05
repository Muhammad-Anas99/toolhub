import React from 'react'
import PropTypes from 'prop-types'

export default function PreviewPanel({ before, after, beforeLabel = 'Original', afterLabel = 'Result' }) {
  if (!before) return null

  if (!after) {
    return (
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
        <img src={before} alt="Preview" className="mx-auto max-h-96 w-auto object-contain" />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <p className="mb-2 text-center text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
          {beforeLabel}
        </p>
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
          <img src={before} alt={beforeLabel} className="mx-auto max-h-80 w-auto object-contain" />
        </div>
      </div>
      <div>
        <p className="mb-2 text-center text-xs font-medium uppercase tracking-wide text-brand-500">
          {afterLabel}
        </p>
        <div className="overflow-hidden rounded-2xl border border-brand-200 bg-brand-50/40 dark:border-brand-900 dark:bg-brand-950/40">
          <img src={after} alt={afterLabel} className="mx-auto max-h-80 w-auto object-contain" />
        </div>
      </div>
    </div>
  )
}

PreviewPanel.propTypes = {
  before: PropTypes.string,
  after: PropTypes.string,
  beforeLabel: PropTypes.string,
  afterLabel: PropTypes.string,
}
