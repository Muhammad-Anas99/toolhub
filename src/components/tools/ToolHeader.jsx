import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

export default function ToolHeader({ icon: Icon, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-2xl text-center"
    >
      {Icon && (
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
          <Icon className="h-6 w-6" />
        </div>
      )}
      <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
        {title}
      </h1>
      <p className="mt-3 text-slate-500 dark:text-slate-400">{description}</p>
    </motion.div>
  )
}

ToolHeader.propTypes = {
  icon: PropTypes.elementType,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}
