import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineArrowDownTray, HiOutlineFilm } from 'react-icons/hi2'
import DropZone from '../DropZone.jsx'
import ErrorMessage from '../ErrorMessage.jsx'
import ProgressBar from '../ProgressBar.jsx'
import { useDocumentUpload } from '../../../hooks/useDocumentUpload.js'
import { extractVideoFrames, quantizeFrame, buildAnimatedGif } from '../../../lib/gifUtils.js'
import { downloadBlob, buildOutputFilename } from '../../../lib/downloadBlob.js'
import { formatBytes } from '../../../lib/formatBytes.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

const ACCEPTED_TYPES = ['video/mp4', 'video/webm', 'video/quicktime', 'video/ogg']
const ACCEPTED_EXTENSIONS = ['.mp4', '.webm', '.mov', '.ogv']
const MAX_CLIP_SECONDS = 10
const FPS_OPTIONS = [5, 10, 15]

export default function VideoToGifTool({ toolSlug, toolName, category }) {
  const upload = useDocumentUpload({ acceptedTypes: ACCEPTED_TYPES, acceptedExtensions: ACCEPTED_EXTENSIONS, maxSizeMB: 100 })
  const [videoDuration, setVideoDuration] = useState(null)
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)
  const [fps, setFps] = useState(10)
  const [status, setStatus] = useState('idle')
  const [progressText, setProgressText] = useState('')
  const [result, setResult] = useState(null)

  const { logNow } = useHistoryLogger({ toolSlug, toolName, category })

  function handleVideoLoaded(event) {
    const duration = event.target.duration
    setVideoDuration(duration)
    setStart(0)
    setEnd(Math.min(duration, MAX_CLIP_SECONDS))
  }

  function handleReset() {
    upload.reset()
    setVideoDuration(null)
    setResult(null)
    setStatus('idle')
  }

  async function handleGenerate() {
    if (!upload.file || end <= start) return
    setStatus('processing')
    upload.setError(null)

    try {
      setProgressText('Extracting frames...')
      const { frames, width, height } = await extractVideoFrames(upload.file, { startTime: start, endTime: end, fps })

      setProgressText(`Encoding ${frames.length} frames...`)
      const gifFrames = frames.map((frameData) => quantizeFrame(frameData, 128))

      const blob = buildAnimatedGif(width, height, gifFrames, 1000 / fps)
      setResult(blob)
      setStatus('done')
      logNow('Video converted to GIF')
    } catch (err) {
      upload.setError('This video couldn\u2019t be processed. It may be in a format your browser can\u2019t decode, or the clip may be too long for your device to handle.')
      setStatus('idle')
    }
  }

  function handleDownload() {
    if (!result) return
    downloadBlob(result, buildOutputFilename(upload.file.name, 'gif'))
  }

  return (
    <div className="space-y-5">
      <div className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:bg-amber-950 dark:text-amber-300">
        Clips are limited to {MAX_CLIP_SECONDS} seconds. Encoding happens entirely in your browser, so longer clips or
        higher frame rates will take real time and use real memory on your device.
      </div>

      {upload.error && <ErrorMessage message={upload.error} onDismiss={() => upload.setError(null)} />}

      {!upload.file ? (
        <DropZone
          dropZoneProps={upload.dropZoneProps}
          inputProps={upload.inputProps}
          acceptedTypes={ACCEPTED_TYPES}
          maxSizeMB={100}
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

          {videoDuration != null && (
            <>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Start (seconds)</span>
                    <span className="font-mono text-slate-700 dark:text-slate-300">{start.toFixed(1)}s</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={videoDuration}
                    step={0.1}
                    value={start}
                    onChange={(event) => {
                      const value = Math.min(Number(event.target.value), end)
                      setStart(value)
                      if (end - value > MAX_CLIP_SECONDS) setEnd(value + MAX_CLIP_SECONDS)
                    }}
                    aria-label="Clip start time"
                    className="mt-1 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-brand-600 dark:bg-slate-700"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">End (seconds)</span>
                    <span className="font-mono text-slate-700 dark:text-slate-300">{end.toFixed(1)}s</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={videoDuration}
                    step={0.1}
                    value={end}
                    onChange={(event) => {
                      const value = Math.max(Number(event.target.value), start)
                      setEnd(Math.min(value, start + MAX_CLIP_SECONDS))
                    }}
                    aria-label="Clip end time"
                    className="mt-1 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-brand-600 dark:bg-slate-700"
                  />
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-500">Selected: {(end - start).toFixed(1)}s (max {MAX_CLIP_SECONDS}s)</p>
              </div>

              <div>
                <label htmlFor="gif-fps" className="text-xs text-slate-500 dark:text-slate-400">
                  Frame rate
                </label>
                <select
                  id="gif-fps"
                  value={fps}
                  onChange={(event) => setFps(Number(event.target.value))}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  {FPS_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option} fps
                    </option>
                  ))}
                </select>
              </div>

              {status === 'idle' && (
                <button type="button" onClick={handleGenerate} className="btn-primary w-full sm:w-auto">
                  <HiOutlineFilm className="h-4 w-4" />
                  Create GIF
                </button>
              )}
            </>
          )}

          {status === 'processing' && <ProgressBar label={progressText} />}

          {status === 'done' && result && (
            <div className="flex items-center gap-3 rounded-xl bg-emerald-50 p-4 dark:bg-emerald-950">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">{formatBytes(result.size)}</p>
              </div>
              <button type="button" onClick={handleDownload} className="btn-primary text-sm">
                <HiOutlineArrowDownTray className="h-4 w-4" />
                Download GIF
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

VideoToGifTool.propTypes = {
  toolSlug: PropTypes.string,
  toolName: PropTypes.string,
  category: PropTypes.string,
}
