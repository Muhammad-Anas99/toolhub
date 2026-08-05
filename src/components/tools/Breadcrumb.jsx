import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { HiChevronRight, HiOutlineHome } from 'react-icons/hi2'

export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm">
      <Link
        to="/"
        className="flex items-center text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
        aria-label="Home"
      >
        <HiOutlineHome className="h-4 w-4" />
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        return (
          <React.Fragment key={item.label}>
            <HiChevronRight className="h-3.5 w-3.5 flex-shrink-0 text-slate-300 dark:text-slate-700" />
            {item.to && !isLast ? (
              <Link
                to={item.to}
                className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className="truncate text-slate-700 dark:text-slate-300"
                aria-current={isLast ? 'page' : undefined}
              >
                {item.label}
              </span>
            )}
          </React.Fragment>
        )
      })}
    </nav>
  )
}

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      to: PropTypes.string,
    })
  ).isRequired,
}
