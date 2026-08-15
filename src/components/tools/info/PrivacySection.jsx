import React from 'react'
import PropTypes from 'prop-types'
import { HiOutlineShieldCheck } from 'react-icons/hi2'

export default function PrivacySection({ privacy }) {
  if (!privacy) return null

  return (
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-900 dark:bg-emerald-950">
      <div className="flex items-start gap-3">
        <HiOutlineShieldCheck className="mt-0.5 h-6 w-6 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Privacy &amp; Security</h2>
          <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">{privacy}</p>
        </div>
      </div>
    </div>
  )
}

PrivacySection.propTypes = {
  privacy: PropTypes.string,
}
