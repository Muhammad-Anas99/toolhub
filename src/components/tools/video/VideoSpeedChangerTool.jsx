import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineArrowDownTray, HiOutlineForward } from 'react-icons/hi2'
import DropZone from '../DropZone.jsx'
import ErrorMessage from '../ErrorMessage.jsx'
import { useDocumentUpload } from '../../../hooks/useDocumentUpload.js'
import { reencodeVideo } from '../../../lib/videoProcessingUtils.js'
import { downloadBlob, buildOutputFilename } from '../../../lib/downloadBlob.js'
import { formatBytes } from '../../../lib/formatBytes.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

const ACCEPTED_TYPES = ['video/mp4', 'video/webm', 'video/quicktime', 'video/ogg']
const ACCEPTED_EXTENSIONS = ['.mp4', '.webm', '.mov', '.ogv']
const SPEED_OPTIONS = [0.5, 0.75, 1.25, 1.5, 2]

export default function VideoSpeedChangerTool({ toolSlug, toolName, category }) {
  const upload = useDocumentUpload({ acceptedTypes: ACCEPTED_TYPES, acceptedExtensions: ACCEPTED_EXTENSIONS, maxSizeMB: 200 })
  const [speed, setSpeed] = useState(1.5)
  const [status, setStatus] = useState('idle')
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState(null)
  const { logNow } = useHistoryLogger({ toolSlug, toolName, category })

  async function handleApply() {
    if (!upload.file) return
    setStatus('processing')
    setProgress(0)
    upload.setError(null)
    try {
      const blob = await reencodeVideo(upload.file, { playbackRate: speed, onProgress: setProgress })
      setResult(blob)
      setStatus('done')
      logNow('Video speed changed')
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
    downloadBlob(result, buildOutputFilename(upload.file.name, 'webm', `-${speed}x`))
  }

  return (
    <div className="space-y-5">
      <div className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:bg-amber-950 dark:text-amber-300">
        This plays through the video at the new speed to record it, so processing itself still takes real time
        (roughly the new, sped-up or slowed-down duration, not the original one). Keep this tab active while it runs.
        The result downloads as WebM.
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

          {status === 'idle' && (
            <>
              <div>
                <label htmlFor="speed-select" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Playback speed
                </label>
                <select
                  id="speed-select"
                  value={speed}
                  onChange={(event) => setSpeed(Number(event.target.value))}
                  className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  {SPEED_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}x
                    </option>
                  ))}
                </select>
              </div>

              <button type="button" onClick={handleApply} className="btn-primary w-full sm:w-auto">
                <HiOutlineForward className="h-4 w-4" />
                Change Speed
              </button>
            </>
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
            <div className="flex items-center gap-3 rounded-xl bg-emerald-50 p-4 dark:bg-emerald-950">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">{formatBytes(result.size)}</p>
              </div>
              <button type="button" onClick={handleDownload} className="btn-primary text-sm">
                <HiOutlineArrowDownTray className="h-4 w-4" />
                Download
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

VideoSpeedChangerTool.propTypes = {
  toolSlug: PropTypes.string,
  toolName: PropTypes.string,
  category: PropTypes.string,
}
