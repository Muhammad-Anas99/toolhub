import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineArrowDownTray } from 'react-icons/hi2'
import DropZone from '../DropZone.jsx'
import ErrorMessage from '../ErrorMessage.jsx'
import { useImageUpload } from '../../../hooks/useImageUpload.js'
import { loadImage, canvasToBlob } from '../../../lib/imageProcessing.js'
import { downloadBlob } from '../../../lib/downloadBlob.js'
import { formatBytes } from '../../../lib/formatBytes.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export default function ExifScrubberTool({ toolSlug, toolName, category }) {
  const upload = useImageUpload({ acceptedTypes: ACCEPTED_TYPES, maxSizeMB: 15 })
  const [status, setStatus] = useState('idle')
  const [resultBlob, setResultBlob] = useState(null)
  const { logNow } = useHistoryLogger({ toolSlug, toolName, category })

  async function handleScrub() {
    if (!upload.file) return
    setStatus('processing')
    upload.setError(null)
    try {
      const { img, url } = await loadImage(upload.file)
      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      URL.revokeObjectURL(url)
      const blob = await canvasToBlob(canvas, upload.file.type === 'image/png' ? 'image/png' : 'image/jpeg', 0.95)
      setResultBlob(blob)
      setStatus('done')
      logNow('EXIF metadata scrubbed')
    } catch (err) {
      upload.setError('Could not process this image.')
      setStatus('idle')
    }
  }

  function handleReset() {
    upload.reset()
    setResultBlob(null)
    setStatus('idle')
  }

  return (
    <div className="space-y-5">
      {upload.error && <ErrorMessage message={upload.error} onDismiss={() => upload.setError(null)} />}

      {!upload.file ? (
        <DropZone
          dropZoneProps={upload.dropZoneProps}
          inputProps={upload.inputProps}
          acceptedTypes={ACCEPTED_TYPES}
          maxSizeMB={15}
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
          <button type="button" onClick={handleReset} className="btn-secondary text-xs">
            Reset
          </button>
        </div>
      )}

      {upload.file && status === 'idle' && (
        <button type="button" onClick={handleScrub} className="btn-primary">
          Remove Metadata
        </button>
      )}

      {status === 'processing' && <p className="text-sm text-slate-400 dark:text-slate-500">Processing...</p>}

      {status === 'done' && resultBlob && (
        <div className="card flex items-center justify-between gap-4 p-4">
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-white">Metadata removed</p>
            <p className="text-xs text-slate-400 dark:text-slate-500">{formatBytes(resultBlob.size)}</p>
          </div>
          <button type="button" onClick={() => downloadBlob(resultBlob, 'scrubbed-' + upload.file.name)} className="btn-primary text-sm">
            <HiOutlineArrowDownTray className="h-4 w-4" />
            Download
          </button>
        </div>
      )}
    </div>
  )
}

ExifScrubberTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
