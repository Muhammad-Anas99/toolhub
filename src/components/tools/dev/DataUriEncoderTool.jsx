import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import DropZone from '../DropZone.jsx'
import ErrorMessage from '../ErrorMessage.jsx'
import CopyButton from '../CopyButton.jsx'
import { useImageUpload } from '../../../hooks/useImageUpload.js'
import { formatBytes } from '../../../lib/formatBytes.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/svg+xml']

export default function DataUriEncoderTool({ toolSlug, toolName, category }) {
  const upload = useImageUpload({ acceptedTypes: ACCEPTED_TYPES, maxSizeMB: 5 })
  const [dataUri, setDataUri] = useState('')
  const { logNow } = useHistoryLogger({ toolSlug, toolName, category })

  useEffect(() => {
    if (!upload.file) {
      setDataUri('')
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      setDataUri(reader.result)
      logNow('Image encoded as data URI')
    }
    reader.readAsDataURL(upload.file)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upload.file])

  return (
    <div className="space-y-5">
      {upload.error && <ErrorMessage message={upload.error} onDismiss={() => upload.setError(null)} />}

      {!upload.file ? (
        <DropZone
          dropZoneProps={upload.dropZoneProps}
          inputProps={upload.inputProps}
          acceptedTypes={ACCEPTED_TYPES}
          maxSizeMB={5}
          isDragActive={upload.isDragActive}
          label="Drag & drop an image here"
          uploadLabel="Upload Image"
        />
      ) : (
        <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-900/40">
          <img src={upload.previewUrl} alt="Uploaded preview" className="h-16 w-16 rounded-lg object-contain" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-slate-900 dark:text-white">{upload.file.name}</p>
            <p className="text-xs text-slate-400 dark:text-slate-500">{formatBytes(upload.file.size)}</p>
          </div>
          <button type="button" onClick={upload.reset} className="btn-secondary text-xs">
            Reset
          </button>
        </div>
      )}

      {dataUri && (
        <div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Data URI</label>
            <CopyButton value={dataUri} />
          </div>
          <textarea value={dataUri} readOnly rows={8} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 font-mono text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-900/40 dark:text-white" />
          <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">{dataUri.length.toLocaleString()} characters</p>
        </div>
      )}
    </div>
  )
}

DataUriEncoderTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
