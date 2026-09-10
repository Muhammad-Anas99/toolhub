import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineArrowDownTray, HiOutlineScissors } from 'react-icons/hi2'
import DropZone from '../DropZone.jsx'
import ErrorMessage from '../ErrorMessage.jsx'
import ProgressBar from '../ProgressBar.jsx'
import { useDocumentUpload } from '../../../hooks/useDocumentUpload.js'
import { loadImageData, removeBackgroundFloodFill, imageDataToPngBlob } from '../../../lib/backgroundRemovalUtils.js'
import { downloadBlob, buildOutputFilename } from '../../../lib/downloadBlob.js'
import { formatBytes } from '../../../lib/formatBytes.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const ACCEPTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp']

export default function BackgroundRemoverTool({ toolSlug, toolName, category }) {
  const upload = useDocumentUpload({ acceptedTypes: ACCEPTED_TYPES, acceptedExtensions: ACCEPTED_EXTENSIONS, maxSizeMB: 25 })
  const [tolerance, setTolerance] = useState(35)
  const [status, setStatus] = useState('idle')
  const [resultUrl, setResultUrl] = useState(null)
  const [resultBlob, setResultBlob] = useState(null)
  const { logNow } = useHistoryLogger({ toolSlug, toolName, category })

  async function handleRemove() {
    if (!upload.file) return
    setStatus('processing')
    upload.setError(null)
    try {
      const { imageData } = await loadImageData(upload.file)
      const processed = removeBackgroundFloodFill(imageData, tolerance)
      const blob = await imageDataToPngBlob(processed)
      if (resultUrl) URL.revokeObjectURL(resultUrl)
      setResultUrl(URL.createObjectURL(blob))
      setResultBlob(blob)
      setStatus('done')
      logNow('Background removed')
    } catch (err) {
      upload.setError('This image couldn\u2019t be processed. It may be corrupted or in a format your browser can\u2019t decode.')
      setStatus('idle')
    }
  }

  function handleReset() {
    upload.reset()
    if (resultUrl) URL.revokeObjectURL(resultUrl)
    setResultUrl(null)
    setResultBlob(null)
    setStatus('idle')
  }

  function handleDownload() {
    if (!resultBlob) return
    downloadBlob(resultBlob, buildOutputFilename(upload.file.name, 'png', '-no-bg'))
  }

  return (
    <div className="space-y-5">
      <div className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:bg-amber-950 dark:text-amber-300">
        This uses a classical color-detection technique, not an AI model, so it works best on photos with a fairly
        plain, uniform background. It also won’t preserve any part of the subject that touches the very edge of
        the photo. Preview your result before relying on it.
      </div>

      {upload.error && <ErrorMessage message={upload.error} onDismiss={() => upload.setError(null)} />}

      {!upload.file ? (
        <DropZone
          dropZoneProps={upload.dropZoneProps}
          inputProps={upload.inputProps}
          acceptedTypes={ACCEPTED_TYPES}
          maxSizeMB={25}
          isDragActive={upload.isDragActive}
          label="Drag & drop an image here"
          uploadLabel="Upload Image"
        />
      ) : (
        <>
          <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-900/40">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-900 dark:text-white">{upload.file.name}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500">{formatBytes(upload.file.size)}</p>
            </div>
            <button type="button" onClick={handleReset} className="btn-secondary text-xs">
              Reset
            </button>
          </div>

          <div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">Sensitivity</span>
              <span className="font-mono text-slate-700 dark:text-slate-300">{tolerance}</span>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              step={5}
              value={tolerance}
              onChange={(event) => setTolerance(Number(event.target.value))}
              aria-label="Background detection sensitivity"
              className="mt-1 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-brand-600 dark:bg-slate-700"
            />
            <p className="mt-1.5 text-xs text-slate-400 dark:text-slate-500">
              Higher removes more of the background but risks eating into the subject. Lower is safer but may leave
              background behind.
            </p>
          </div>

          {status !== 'processing' && (
            <button type="button" onClick={handleRemove} className="btn-primary w-full sm:w-auto">
              <HiOutlineScissors className="h-4 w-4" />
              {status === 'done' ? 'Try Again' : 'Remove Background'}
            </button>
          )}

          {status === 'processing' && <ProgressBar label="Removing background..." />}

          {status === 'done' && resultUrl && (
            <div className="space-y-3">
              <div
                className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700"
                style={{
                  backgroundImage:
                    'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',
                  backgroundSize: '20px 20px',
                  backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
                }}
              >
                <img src={resultUrl} alt="Background removed preview" className="mx-auto max-h-96 w-auto" />
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-emerald-50 p-4 dark:bg-emerald-950">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
                    {resultBlob && formatBytes(resultBlob.size)}
                  </p>
                </div>
                <button type="button" onClick={handleDownload} className="btn-primary text-sm">
                  <HiOutlineArrowDownTray className="h-4 w-4" />
                  Download PNG
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

BackgroundRemoverTool.propTypes = {
  toolSlug: PropTypes.string,
  toolName: PropTypes.string,
  category: PropTypes.string,
}
