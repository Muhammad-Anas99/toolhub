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
      className="mb-6 flex flex-col items-center text-center"
    >
      {Icon && (
        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
          <Icon className="h-5 w-5" />
        </div>
      )}
      <h1 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">{title}</h1>
      <p className="mt-1 max-w-md text-sm text-slate-500 dark:text-slate-400">{description}</p>

      {toolSlug && (
        <div className="mt-3">
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
