import React from 'react'
import PropTypes from 'prop-types'
import FAQAccordion from '../ui/FAQAccordion.jsx'

export default function ToolFAQSection({ items }) {
  if (!items || items.length === 0) return null

  return (
    <div>
      <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
        Frequently asked questions
      </h2>
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white px-6 dark:border-slate-800 dark:bg-slate-900">
        <FAQAccordion items={items} />
      </div>
    </div>
  )
}

ToolFAQSection.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
    })
  ),
}
