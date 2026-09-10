import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineArrowDownTray, HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2'
import DropZone from '../DropZone.jsx'
import ErrorMessage from '../ErrorMessage.jsx'
import ProgressBar from '../ProgressBar.jsx'
import { useDocumentUpload } from '../../../hooks/useDocumentUpload.js'
import { decodeAudioFile, encodeWav, applyAudioFade, formatDuration } from '../../../lib/audioUtils.js'
import { downloadBlob, buildOutputFilename } from '../../../lib/downloadBlob.js'
import { formatBytes } from '../../../lib/formatBytes.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

const ACCEPTED_TYPES = ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp4', 'audio/webm', 'audio/flac']
const ACCEPTED_EXTENSIONS = ['.mp3', '.wav', '.ogg', '.m4a', '.webm', '.flac']

export default function AudioFadeTool({ toolSlug, toolName, category }) {
  const upload = useDocumentUpload({ acceptedTypes: ACCEPTED_TYPES, acceptedExtensions: ACCEPTED_EXTENSIONS, maxSizeMB: 50 })
  const [duration, setDuration] = useState(null)
  const [fadeIn, setFadeIn] = useState(2)
  const [fadeOut, setFadeOut] = useState(2)
  const [status, setStatus] = useState('idle')
  const [result, setResult] = useState(null)
  const { logNow } = useHistoryLogger({ toolSlug, toolName, category })

  useEffect(() => {
    if (!upload.file) return
    let cancelled = false
    setStatus('loading')
    upload.setError(null)
    decodeAudioFile(upload.file)
      .then((audioBuffer) => {
        if (cancelled) return
        setDuration(audioBuffer.duration)
        setFadeIn((prev) => Math.min(prev, audioBuffer.duration / 2))
        setFadeOut((prev) => Math.min(prev, audioBuffer.duration / 2))
        setStatus('ready')
      })
      .catch(() => {
        if (cancelled) return
        upload.setError('This file couldn\u2019t be read as audio. It may be corrupted or in a format your browser can\u2019t decode.')
        setStatus('idle')
      })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upload.file])

  async function handleApply() {
    if (!upload.file) return
    setStatus('processing')
    try {
      const audioBuffer = await decodeAudioFile(upload.file)
      const faded = applyAudioFade(audioBuffer, fadeIn, fadeOut)
      const blob = encodeWav(faded)
      setResult(blob)
      setStatus('done')
      logNow('Audio fade applied')
    } catch (err) {
      upload.setError('Something went wrong applying the fade.')
      setStatus('ready')
    }
  }

  function handleReset() {
    upload.reset()
    setResult(null)
    setDuration(null)
    setStatus('idle')
  }

  function handleDownload() {
    if (!result) return
    downloadBlob(result, buildOutputFilename(upload.file.name, 'wav', '-faded'))
  }

  return (
    <div className="space-y-5">
      {upload.error && <ErrorMessage message={upload.error} onDismiss={() => upload.setError(null)} />}

      {!upload.file ? (
        <DropZone
          dropZoneProps={upload.dropZoneProps}
          inputProps={upload.inputProps}
          acceptedTypes={ACCEPTED_TYPES}
          maxSizeMB={50}
          isDragActive={upload.isDragActive}
          label="Drag & drop an audio file here"
          uploadLabel="Upload Audio"
        />
      ) : (
        <>
          <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-900/40">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-900 dark:text-white">{upload.file.name}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                {formatBytes(upload.file.size)}
                {duration != null && ` \u00b7 ${formatDuration(duration)}`}
              </p>
            </div>
            <button type="button" onClick={handleReset} className="btn-secondary text-xs">
              Reset
            </button>
          </div>

          {status === 'loading' && <ProgressBar label="Reading audio..." />}

          {(status === 'ready' || status === 'done') && duration != null && (
            <>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Fade in</span>
                    <span className="font-mono text-slate-700 dark:text-slate-300">{fadeIn.toFixed(1)}s</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={Math.max(0.1, duration / 2)}
                    step={0.1}
                    value={fadeIn}
                    onChange={(event) => setFadeIn(Number(event.target.value))}
                    aria-label="Fade in duration"
                    className="mt-1 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-brand-600 dark:bg-slate-700"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Fade out</span>
                    <span className="font-mono text-slate-700 dark:text-slate-300">{fadeOut.toFixed(1)}s</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={Math.max(0.1, duration / 2)}
                    step={0.1}
                    value={fadeOut}
                    onChange={(event) => setFadeOut(Number(event.target.value))}
                    aria-label="Fade out duration"
                    className="mt-1 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-brand-600 dark:bg-slate-700"
                  />
                </div>
              </div>

              {status === 'ready' && (
                <button type="button" onClick={handleApply} className="btn-primary w-full sm:w-auto">
                  <HiOutlineAdjustmentsHorizontal className="h-4 w-4" />
                  Apply Fade
                </button>
              )}
            </>
          )}

          {status === 'processing' && <ProgressBar label="Applying fade..." />}

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

AudioFadeTool.propTypes = {
  toolSlug: PropTypes.string,
  toolName: PropTypes.string,
  category: PropTypes.string,
}
