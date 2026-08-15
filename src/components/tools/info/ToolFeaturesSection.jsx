import React from 'react'
import PropTypes from 'prop-types'

export default function ToolFeaturesSection({ features }) {
  if (!features || features.length === 0) return null

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
        Features
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-brand-200 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-900"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
              <feature.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-3.5 text-base font-semibold text-slate-900 dark:text-white">
              {feature.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

ToolFeaturesSection.propTypes = {
  features: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired,
    })
  ),
}
