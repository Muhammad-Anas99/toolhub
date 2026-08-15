import React from 'react'
import PropTypes from 'prop-types'

export default function HowToUseSection({ toolName, steps }) {
  if (!steps || steps.length === 0) return null

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
        How to Use {toolName}
      </h2>
      <ol className="mt-6 space-y-4">
        {steps.map((step, index) => (
          <li key={index} className="flex gap-4">
            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-50 text-sm font-bold text-brand-600 dark:bg-brand-950 dark:text-brand-400">
              {index + 1}
            </span>
            <p className="mt-1 leading-relaxed text-slate-600 dark:text-slate-300">{step}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}

HowToUseSection.propTypes = {
  toolName: PropTypes.string.isRequired,
  steps: PropTypes.arrayOf(PropTypes.string),
}
