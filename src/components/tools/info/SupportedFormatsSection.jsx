import React from 'react'
import PropTypes from 'prop-types'

export default function SupportedFormatsSection({ formats }) {
  if (!formats) return null

  const rows = [
    formats.input && { label: 'Input formats', value: formats.input },
    formats.output && { label: 'Output formats', value: formats.output },
    formats.maxSize && { label: 'Maximum file size', value: formats.maxSize },
    formats.notes && { label: 'Notes', value: formats.notes },
  ].filter(Boolean)

  if (rows.length === 0) return null

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
        Supported Formats &amp; Limits
      </h2>
      <dl className="mt-6 divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
        {rows.map((row) => (
          <div key={row.label} className="flex flex-col gap-1 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">{row.label}</dt>
            <dd className="text-sm text-slate-900 dark:text-white sm:text-right">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

SupportedFormatsSection.propTypes = {
  formats: PropTypes.shape({
    input: PropTypes.string,
    output: PropTypes.string,
    maxSize: PropTypes.string,
    notes: PropTypes.string,
  }),
}
