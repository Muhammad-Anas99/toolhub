import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineArrowDownTray, HiOutlineArrowPath } from 'react-icons/hi2'
import DropZone from '../DropZone.jsx'
import ErrorMessage from '../ErrorMessage.jsx'
import { useDocumentUpload } from '../../../hooks/useDocumentUpload.js'
import { convertVideoFormat } from '../../../lib/videoProcessingUtils.js'
import { downloadBlob, buildOutputFilename } from '../../../lib/downloadBlob.js'
import { formatBytes } from '../../../lib/formatBytes.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

const ACCEPTED_TYPES = ['video/mp4', 'video/webm', 'video/quicktime', 'video/ogg']
const ACCEPTED_EXTENSIONS = ['.mp4', '.webm', '.mov', '.ogv']

export default function VideoConverterTool({ toolSlug, toolName, category }) {
  const upload = useDocumentUpload({ acceptedTypes: ACCEPTED_TYPES, acceptedExtensions: ACCEPTED_EXTENSIONS, maxSizeMB: 200 })
  const [targetFormat, setTargetFormat] = useState('mp4')
  const [status, setStatus] = useState('idle')
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState(null)
  const { logNow } = useHistoryLogger({ toolSlug, toolName, category })

  async function handleConvert() {
    if (!upload.file) return
    setStatus('processing')
    setProgress(0)
    upload.setError(null)
    try {
      const { blob, achievedFormat } = await convertVideoFormat(upload.file, { targetFormat, onProgress: setProgress })
      setResult({ blob, achievedFormat })
      setStatus('done')
      logNow('Video converted')
    } catch (err) {
      upload.setError(err.message || 'This video couldn\u2019t be processed.')
      setStatus('idle')
    }
  }

  function handleReset() {
    upload.reset()
    setResult(null)
    setStatus('idle')
    setProgress(0)
  }

  function handleDownload() {
    if (!result) return
    downloadBlob(result.blob, buildOutputFilename(upload.file.name, result.achievedFormat, '-converted'))
  }

  return (
    <div className="space-y-5">
      <div className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:bg-amber-950 dark:text-amber-300">
        This plays through the video to re-record it, so it takes about as long as the video itself. Keep this
        tab active while it runs. MP4 output depends on your browser supporting it &mdash; if it doesn&apos;t, this
        falls back to WebM and tells you which one you actually got.
      </div>

      {upload.error && <ErrorMessage message={upload.error} onDismiss={() => upload.setError(null)} />}

      {!upload.file ? (
        <DropZone
          dropZoneProps={upload.dropZoneProps}
          inputProps={upload.inputProps}
          acceptedTypes={ACCEPTED_TYPES}
          maxSizeMB={200}
          isDragActive={upload.isDragActive}
          label="Drag & drop a video file here"
          uploadLabel="Upload Video"
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
            <p className="text-sm text-slate-500 dark:text-slate-400">Convert to</p>
            <div className="mt-2 flex gap-2">
              {['mp4', 'webm'].map((format) => (
                <button
                  key={format}
                  type="button"
                  onClick={() => setTargetFormat(format)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium uppercase transition-colors ${
                    targetFormat === format
                      ? 'bg-brand-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {format}
                </button>
              ))}
            </div>
          </div>

          {status === 'idle' && (
            <button type="button" onClick={handleConvert} className="btn-primary w-full sm:w-auto">
              <HiOutlineArrowPath className="h-4 w-4" />
              Convert Video
            </button>
          )}

          {status === 'processing' && (
            <div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                <div className="h-full bg-brand-600 transition-all" style={{ width: `${Math.round(progress * 100)}%` }} />
              </div>
              <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">Processing... {Math.round(progress * 100)}%</p>
            </div>
          )}

          {status === 'done' && result && (
            <div className="rounded-xl bg-emerald-50 p-4 dark:bg-emerald-950">
              {result.achievedFormat !== targetFormat && (
                <p className="mb-2 text-xs text-emerald-700 dark:text-emerald-400">
                  Your browser doesn&apos;t support recording {targetFormat.toUpperCase()}, so this came out as{' '}
                  {result.achievedFormat.toUpperCase()} instead.
                </p>
              )}
              <div className="flex items-center gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
                    {formatBytes(result.blob.size)} {'\u00b7'} {result.achievedFormat.toUpperCase()}
                  </p>
                </div>
                <button type="button" onClick={handleDownload} className="btn-primary text-sm">
                  <HiOutlineArrowDownTray className="h-4 w-4" />
                  Download
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

VideoConverterTool.propTypes = {
  toolSlug: PropTypes.string,
  toolName: PropTypes.string,
  category: PropTypes.string,
}
