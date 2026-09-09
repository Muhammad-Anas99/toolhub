import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineArrowDownTray, HiOutlineScissors } from 'react-icons/hi2'
import DropZone from '../DropZone.jsx'
import ErrorMessage from '../ErrorMessage.jsx'
import { useDocumentUpload } from '../../../hooks/useDocumentUpload.js'
import { trimVideo } from '../../../lib/videoTrimUtils.js'
import { downloadBlob, buildOutputFilename } from '../../../lib/downloadBlob.js'
import { formatBytes } from '../../../lib/formatBytes.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

const ACCEPTED_TYPES = ['video/mp4', 'video/webm', 'video/quicktime', 'video/ogg']
const ACCEPTED_EXTENSIONS = ['.mp4', '.webm', '.mov', '.ogv']

export default function VideoTrimmerTool({ toolSlug, toolName, category }) {
  const upload = useDocumentUpload({ acceptedTypes: ACCEPTED_TYPES, acceptedExtensions: ACCEPTED_EXTENSIONS, maxSizeMB: 200 })
  const [videoDuration, setVideoDuration] = useState(null)
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)
  const [status, setStatus] = useState('idle')
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState(null)

  const { logNow } = useHistoryLogger({ toolSlug, toolName, category })

  function handleVideoLoaded(event) {
    const duration = event.target.duration
    setVideoDuration(duration)
    setStart(0)
    setEnd(duration)
  }

  function handleReset() {
    upload.reset()
    setVideoDuration(null)
    setResult(null)
    setStatus('idle')
    setProgress(0)
  }

  async function handleTrim() {
    if (!upload.file || end <= start) return
    setStatus('processing')
    setProgress(0)
    upload.setError(null)

    try {
      const blob = await trimVideo(upload.file, { startTime: start, endTime: end, onProgress: setProgress })
      setResult(blob)
      setStatus('done')
      logNow('Video trimmed')
    } catch (err) {
      upload.setError(err.message || 'This video couldn\u2019t be trimmed.')
      setStatus('idle')
    }
  }

  function handleDownload() {
    if (!result) return
    downloadBlob(result, buildOutputFilename(upload.file.name, 'webm', '-trimmed'))
  }

  return (
    <div className="space-y-5">
      <div className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:bg-amber-950 dark:text-amber-300">
        Trimming works by playing through the selected range, so it takes about as long as the clip itself — a
        30-second clip takes roughly 30 seconds to trim. Keep this tab active while it runs. The result downloads as
        WebM.
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

          <video
            src={URL.createObjectURL(upload.file)}
            onLoadedMetadata={handleVideoLoaded}
            controls
            className="w-full rounded-xl bg-black"
            style={{ maxHeight: '300px' }}
          />

          {videoDuration != null && status === 'idle' && (
            <>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Start</span>
                    <span className="font-mono text-slate-700 dark:text-slate-300">{start.toFixed(1)}s</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={videoDuration}
                    step={0.1}
                    value={start}
                    onChange={(event) => setStart(Math.min(Number(event.target.value), end))}
                    aria-label="Trim start time"
                    className="mt-1 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-brand-600 dark:bg-slate-700"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">End</span>
                    <span className="font-mono text-slate-700 dark:text-slate-300">{end.toFixed(1)}s</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={videoDuration}
                    step={0.1}
                    value={end}
                    onChange={(event) => setEnd(Math.max(Number(event.target.value), start))}
                    aria-label="Trim end time"
                    className="mt-1 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-brand-600 dark:bg-slate-700"
                  />
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-500">Selected: {(end - start).toFixed(1)}s</p>
              </div>

              <button type="button" onClick={handleTrim} className="btn-primary w-full sm:w-auto">
                <HiOutlineScissors className="h-4 w-4" />
                Trim
              </button>
            </>
          )}

          {status === 'processing' && (
            <div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                <div className="h-full bg-brand-600 transition-all" style={{ width: `${Math.round(progress * 100)}%` }} />
              </div>
              <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">Recording... {Math.round(progress * 100)}%</p>
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

VideoTrimmerTool.propTypes = {
  toolSlug: PropTypes.string,
  toolName: PropTypes.string,
  category: PropTypes.string,
}
