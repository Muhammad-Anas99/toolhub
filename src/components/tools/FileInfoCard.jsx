import React from 'react'
import PropTypes from 'prop-types'
import { HiOutlineDocument, HiOutlineArrowsPointingOut, HiXMark } from 'react-icons/hi2'
import { formatBytes } from '../../lib/formatBytes.js'
import { MIME_LABELS } from '../../lib/imageProcessing.js'

export default function FileInfoCard({ file, dimensions, onRemove }) {
  if (!file) return null

  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
        <HiOutlineDocument className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-slate-900 dark:text-white">{file.name}</p>
        <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
          <span>{formatBytes(file.size)}</span>
          <span>{MIME_LABELS[file.type] || file.type}</span>
          {dimensions && (
            <span className="inline-flex items-center gap-1">
              <HiOutlineArrowsPointingOut className="h-3.5 w-3.5" />
              {dimensions.width} &times; {dimensions.height}px
            </span>
          )}
        </div>
      </div>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove file"
          className="flex-shrink-0 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
        >
          <HiXMark className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

FileInfoCard.propTypes = {
  file: PropTypes.shape({
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
  }),
  dimensions: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  onRemove: PropTypes.func,
}
