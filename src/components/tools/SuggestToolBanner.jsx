import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2'

export default function SuggestToolBanner({ className = '' }) {
  return (
    <div className={`rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-6 text-white sm:p-8 ${className}`}>
      <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/15">
          <HiOutlineChatBubbleLeftRight className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold">Can&apos;t find a tool?</h2>
          <p className="mt-1 text-sm text-brand-100">
            We&apos;re adding new tools every week. Let us know what you want to see!
          </p>
        </div>
        <Link
          to="/contact?subject=Tool%20Suggestion"
          className="flex-shrink-0 whitespace-nowrap rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
        >
          Suggest a Tool
          <span aria-hidden="true"> &rarr;</span>
        </Link>
      </div>
    </div>
  )
}

SuggestToolBanner.propTypes = {
  className: PropTypes.string,
}
