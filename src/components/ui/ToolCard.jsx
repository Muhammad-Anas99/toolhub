import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi2'

export default function ToolCard({ tool }) {
  const Icon = tool.icon

  const cardContent = (
    <>
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
          <Icon className="h-5 w-5" />
        </div>
        {tool.comingSoon && (
          <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 dark:bg-amber-950 dark:text-amber-400">
            Coming soon
          </span>
        )}
      </div>

      <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">
        {tool.name}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
        {tool.description}
      </p>

      {!tool.comingSoon && (
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 dark:text-brand-400">
          Open tool
          <HiArrowRight className="h-4 w-4" />
        </span>
      )}
    </>
  )

  if (tool.comingSoon) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="card cursor-not-allowed p-5 opacity-90"
        aria-disabled="true"
      >
        {cardContent}
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      <Link
        to={tool.path}
        className="card group block p-5 hover:shadow-card-hover hover:-translate-y-0.5 transition-transform duration-200"
      >
        {cardContent}
      </Link>
    </motion.div>
  )
}

ToolCard.propTypes = {
  tool: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
    comingSoon: PropTypes.bool,
  }).isRequired,
}
