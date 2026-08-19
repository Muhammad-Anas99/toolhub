import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import FavoriteButton from './FavoriteButton.jsx'

export default function ToolHeader({ icon: Icon, title, description, toolSlug }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-3"
    >
      {Icon && (
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
          <Icon className="h-5 w-5" />
        </div>
      )}
      <div className="min-w-0">
        <h1 className="truncate text-lg font-semibold text-slate-900 dark:text-white">{title}</h1>
        <p className="truncate text-xs text-slate-500 dark:text-slate-400">{description}</p>
      </div>

      {toolSlug && (
        <div className="flex-shrink-0">
          <FavoriteButton toolSlug={toolSlug} />
        </div>
      )}
    </motion.div>
  )
}

ToolHeader.propTypes = {
  icon: PropTypes.elementType,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  toolSlug: PropTypes.string,
}
