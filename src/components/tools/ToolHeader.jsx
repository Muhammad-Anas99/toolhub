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
      className="relative mx-auto max-w-2xl text-center"
    >
      <div className="pointer-events-none absolute inset-x-0 -top-6 -z-10 flex justify-center" aria-hidden="true">
        <div className="h-32 w-64 rounded-full bg-gradient-to-br from-brand-200/40 to-fuchsia-200/20 blur-3xl dark:from-brand-900/30 dark:to-fuchsia-900/10" />
      </div>

      {Icon && (
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 ring-4 ring-brand-50/50 dark:bg-brand-950 dark:text-brand-400 dark:ring-brand-950/50">
          <Icon className="h-7 w-7" />
        </div>
      )}
      <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
        {title}
      </h1>
      <p className="mx-auto mt-3 max-w-xl leading-relaxed text-slate-500 dark:text-slate-400">{description}</p>

      {toolSlug && (
        <div className="mt-4">
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
