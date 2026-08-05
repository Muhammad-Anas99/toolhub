import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { HiOutlineExclamationTriangle, HiXMark } from 'react-icons/hi2'

export default function ErrorMessage({ message, onDismiss }) {
  if (!message) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      role="alert"
      className="flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-400"
    >
      <HiOutlineExclamationTriangle className="mt-0.5 h-5 w-5 flex-shrink-0" />
      <p className="flex-1">{message}</p>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss error"
          className="flex-shrink-0 text-rose-400 hover:text-rose-600 dark:hover:text-rose-300"
        >
          <HiXMark className="h-4 w-4" />
        </button>
      )}
    </motion.div>
  )
}

ErrorMessage.propTypes = {
  message: PropTypes.string,
  onDismiss: PropTypes.func,
}
