import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { HiOutlineCheckCircle, HiOutlineArrowDownTray, HiOutlineArrowPath } from 'react-icons/hi2'
import { formatBytes } from '../../lib/formatBytes.js'

export default function DownloadPanel({
  outputSize,
  originalSize,
  onDownload,
  onReset,
  children,
}) {
  const savings =
    originalSize && outputSize && originalSize > outputSize
      ? Math.round(((originalSize - outputSize) / originalSize) * 100)
      : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-900 dark:bg-emerald-950"
    >
      <div className="flex items-start gap-3">
        <HiOutlineCheckCircle className="mt-0.5 h-6 w-6 flex-shrink-0 text-emerald-500" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-300">
            Your file is ready
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-emerald-700 dark:text-emerald-400">
            {originalSize != null && <span>Original: {formatBytes(originalSize)}</span>}
            {outputSize != null && <span>New: {formatBytes(outputSize)}</span>}
            {savings !== null && savings > 0 && (
              <span className="font-semibold">{savings}% smaller</span>
            )}
          </div>
        </div>
      </div>

      {children && <div className="mt-4">{children}</div>}

      <div className="mt-5 flex flex-wrap gap-3">
        <button type="button" onClick={onDownload} className="btn-primary">
          <HiOutlineArrowDownTray className="h-4 w-4" />
          Download
        </button>
        <button type="button" onClick={onReset} className="btn-secondary">
          <HiOutlineArrowPath className="h-4 w-4" />
          Process another image
        </button>
      </div>
    </motion.div>
  )
}

DownloadPanel.propTypes = {
  outputSize: PropTypes.number,
  originalSize: PropTypes.number,
  onDownload: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  children: PropTypes.node,
}
