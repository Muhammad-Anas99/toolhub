import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

export default function ProgressBar({ label = 'Processing...' }) {
  return (
    <div role="status" aria-live="polite" className="w-full">
      <div className="flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
        <span>{label}</span>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <motion.div
          className="h-full w-1/3 rounded-full bg-brand-600"
          animate={{ x: ['-100%', '250%'] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </div>
  )
}

ProgressBar.propTypes = {
  label: PropTypes.string,
}
