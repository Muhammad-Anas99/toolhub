import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import FavoriteButton from './FavoriteButton.jsx'

export default function ToolHeader({ icon: Icon, title, description, toolSlug }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-start gap-5"
    >
      {Icon && (
        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
          <Icon className="h-8 w-8" />
        </div>
      )}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{title}</h1>
        <p className="mt-2 max-w-xl text-slate-500 dark:text-slate-400">{description}</p>

        {toolSlug && (
          <div className="mt-4">
            <FavoriteButton toolSlug={toolSlug} />
          </div>
        )}
      </div>
    </motion.div>
  )
}

ToolHeader.propTypes = {
  icon: PropTypes.elementType,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  toolSlug: PropTypes.string,
}
