import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineArrowDownTray, HiOutlineScissors } from 'react-icons/hi2'
import DropZone from '../DropZone.jsx'
import ErrorMessage from '../ErrorMessage.jsx'
import ProgressBar from '../ProgressBar.jsx'
import { useDocumentUpload } from '../../../hooks/useDocumentUpload.js'
import { decodeAudioFile, encodeWav, trimAudioBuffer, formatDuration } from '../../../lib/audioUtils.js'
import { downloadBlob, buildOutputFilename } from '../../../lib/downloadBlob.js'
import { formatBytes } from '../../../lib/formatBytes.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

const ACCEPTED_TYPES = ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp4', 'audio/webm', 'audio/flac']
const ACCEPTED_EXTENSIONS = ['.mp3', '.wav', '.ogg', '.m4a', '.webm', '.flac']

export default function AudioTrimmerTool({ toolSlug, toolName, category }) {
  const upload = useDocumentUpload({ acceptedTypes: ACCEPTED_TYPES, acceptedExtensions: ACCEPTED_EXTENSIONS, maxSizeMB: 50 })
  const [status, setStatus] = useState('idle')
  const [audioBuffer, setAudioBuffer] = useState(null)
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)
  const [result, setResult] = useState(null)
  const { logNow } = useHistoryLogger({ toolSlug, toolName, category })

  async function handleFileReady() {
    if (!upload.file) return
    setStatus('loading')
    upload.setError(null)
    try {
      const buffer = await decodeAudioFile(upload.file)
      setAudioBuffer(buffer)
      setStart(0)
      setEnd(buffer.duration)
      setStatus('ready')
    } catch (err) {
      upload.setError('This file couldn\u2019t be read as audio. It may be corrupted or in a format your browser can\u2019t decode.')
      setStatus('idle')
    }
  }

  useEffect(() => {
    if (upload.file) handleFileReady()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upload.file])

  function handleReset() {
    upload.reset()
    setAudioBuffer(null)
    setResult(null)
    setStart(0)
    setEnd(0)
    setStatus('idle')
  }

  function handleTrim() {
    if (!audioBuffer || end <= start) return
    const trimmed = trimAudioBuffer(audioBuffer, start, end)
    const blob = encodeWav(trimmed)
    setResult(blob)
    logNow('Audio trimmed')
  }

  function handleDownload() {
    if (!result) return
    downloadBlob(result, buildOutputFilename(upload.file.name, 'wav', '-trimmed'))
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
              <p className="text-xs text-slate-400 dark:text-slate-500">{formatBytes(upload.file.size)}</p>
            </div>
            <button type="button" onClick={handleReset} className="btn-secondary text-xs">
              Reset
            </button>
          </div>

          {status === 'loading' && <ProgressBar label="Reading audio..." />}

          {status === 'ready' && audioBuffer && (
            <>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Start</span>
                    <span className="font-mono text-slate-700 dark:text-slate-300">{formatDuration(start)}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={audioBuffer.duration}
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
                    <span className="font-mono text-slate-700 dark:text-slate-300">{formatDuration(end)}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={audioBuffer.duration}
                    step={0.1}
                    value={end}
                    onChange={(event) => setEnd(Math.max(Number(event.target.value), start))}
                    aria-label="Trim end time"
                    className="mt-1 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-brand-600 dark:bg-slate-700"
                  />
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Selected: {formatDuration(end - start)} of {formatDuration(audioBuffer.duration)}
                </p>
              </div>

              <button type="button" onClick={handleTrim} className="btn-primary w-full sm:w-auto">
                <HiOutlineScissors className="h-4 w-4" />
                Trim
              </button>
            </>
          )}

          {result && (
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

AudioTrimmerTool.propTypes = {
  toolSlug: PropTypes.string,
  toolName: PropTypes.string,
  category: PropTypes.string,
}
