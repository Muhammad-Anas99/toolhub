import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { HiOutlineCloudArrowUp } from 'react-icons/hi2'
import { getAcceptAttribute } from '../../lib/fileValidation.js'

export default function DropZone({
  dropZoneProps,
  inputProps,
  acceptedTypes,
  maxSizeMB,
  isDragActive,
  label = 'Drag & drop your image here',
  uploadLabel = 'Upload image',
}) {
  const inputRef = useRef(null)
  const readableTypes = acceptedTypes
    .map((type) => type.split('/')[1]?.toUpperCase() ?? type)
    .join(', ')

  return (
    <div
      {...dropZoneProps}
      className={`relative rounded-2xl border-2 border-dashed p-10 text-center transition-colors sm:p-14 ${
        isDragActive
          ? 'border-brand-500 bg-brand-50 dark:bg-brand-950'
          : 'border-slate-300 bg-slate-50 hover:border-brand-300 hover:bg-brand-50/40 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-brand-800'
      }`}
    >
      <motion.div
        animate={{ y: isDragActive ? -4 : 0, scale: isDragActive ? 1.05 : 1 }}
        transition={{ duration: 0.2 }}
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-brand-600 shadow-card dark:bg-slate-800 dark:text-brand-400"
      >
        <HiOutlineCloudArrowUp className="h-8 w-8" />
      </motion.div>

      <p className="mt-5 text-base font-semibold text-slate-900 dark:text-white">{label}</p>
      <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
        or click the button below to browse your files
      </p>

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="btn-primary mt-6"
      >
        Choose File
      </button>

      <input
        ref={inputRef}
        type="file"
        accept={getAcceptAttribute(acceptedTypes)}
        className="sr-only"
        aria-label={uploadLabel}
        {...inputProps}
      />

      <p className="mt-5 text-xs text-slate-400 dark:text-slate-500">
        Supports {readableTypes} &middot; Max {maxSizeMB} MB &middot; Processed entirely in your
        browser
      </p>
    </div>
  )
}

DropZone.propTypes = {
  dropZoneProps: PropTypes.object.isRequired,
  inputProps: PropTypes.object.isRequired,
  acceptedTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  maxSizeMB: PropTypes.number.isRequired,
  isDragActive: PropTypes.bool,
  label: PropTypes.string,
  uploadLabel: PropTypes.string,
}
