import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { HiOutlineSparkles, HiOutlineClock } from 'react-icons/hi2'

/**
 * Used for tools that genuinely don't work yet — currently the AI tools,
 * which need a paid third-party API ToolHub hasn't connected (see
 * Phase 7 notes: no paid AI APIs are activated). This is deliberately
 * NOT a fake "processing" UI — it's honest about what's missing and why,
 * with no upload area or button that would imply the tool actually does
 * something.
 */
export default function ComingSoonTool({ toolName, whatItWillDo, whyNotYet }) {
  return (
    <div className="card overflow-hidden">
      <div className="border-b border-dashed border-amber-200 bg-amber-50 px-6 py-4 dark:border-amber-900 dark:bg-amber-950">
        <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300">
          <HiOutlineClock className="h-5 w-5 flex-shrink-0" />
          <p className="text-sm font-semibold">Coming soon — not available yet</p>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
          <HiOutlineSparkles className="h-6 w-6" />
        </div>

        <h2 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">
          What {toolName} will do
        </h2>
        <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">{whatItWillDo}</p>

        <h2 className="mt-6 text-lg font-semibold text-slate-900 dark:text-white">Why it isn&apos;t live yet</h2>
        <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">{whyNotYet}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/tools?category=image-tools" className="btn-primary text-sm">
            Explore working image tools
          </Link>
          <Link to="/tools" className="btn-secondary text-sm">
            Browse all tools
          </Link>
        </div>
      </div>
    </div>
  )
}

ComingSoonTool.propTypes = {
  toolName: PropTypes.string.isRequired,
  whatItWillDo: PropTypes.string.isRequired,
  whyNotYet: PropTypes.string.isRequired,
}
