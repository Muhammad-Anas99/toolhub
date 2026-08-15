import React from 'react'
import PropTypes from 'prop-types'
import { HiOutlineCheckCircle } from 'react-icons/hi2'

export default function UseCasesSection({ useCases }) {
  if (!useCases || useCases.length === 0) return null

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
        Use Cases
      </h2>
      <ul className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        {useCases.map((useCase) => (
          <li key={useCase} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
            <HiOutlineCheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-500" />
            <span className="leading-relaxed">{useCase}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

UseCasesSection.propTypes = {
  useCases: PropTypes.arrayOf(PropTypes.string),
}
