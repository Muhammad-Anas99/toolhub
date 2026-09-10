import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineArrowDownTray, HiOutlineSpeakerWave } from 'react-icons/hi2'
import DropZone from '../DropZone.jsx'
import ErrorMessage from '../ErrorMessage.jsx'
import ProgressBar from '../ProgressBar.jsx'
import { useDocumentUpload } from '../../../hooks/useDocumentUpload.js'
import { decodeAudioFile, encodeWav, changeAudioVolume } from '../../../lib/audioUtils.js'
import { downloadBlob, buildOutputFilename } from '../../../lib/downloadBlob.js'
import { formatBytes } from '../../../lib/formatBytes.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

const ACCEPTED_TYPES = ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp4', 'audio/webm', 'audio/flac']
const ACCEPTED_EXTENSIONS = ['.mp3', '.wav', '.ogg', '.m4a', '.webm', '.flac']

export default function AudioVolumeChangerTool({ toolSlug, toolName, category }) {
  const upload = useDocumentUpload({ acceptedTypes: ACCEPTED_TYPES, acceptedExtensions: ACCEPTED_EXTENSIONS, maxSizeMB: 50 })
  const [gainPercent, setGainPercent] = useState(150)
  const [status, setStatus] = useState('idle')
  const [result, setResult] = useState(null)
  const { logNow } = useHistoryLogger({ toolSlug, toolName, category })

  async function handleApply() {
    if (!upload.file) return
    setStatus('processing')
    upload.setError(null)
    try {
      const audioBuffer = await decodeAudioFile(upload.file)
      const adjusted = changeAudioVolume(audioBuffer, gainPercent / 100)
      const blob = encodeWav(adjusted)
      setResult(blob)
      setStatus('done')
      logNow('Audio volume changed')
    } catch (err) {
      upload.setError('This file couldn\u2019t be read as audio. It may be corrupted or in a format your browser can\u2019t decode.')
      setStatus('idle')
    }
  }

  function handleReset() {
    upload.reset()
    setResult(null)
    setStatus('idle')
  }

  function handleDownload() {
    if (!result) return
    downloadBlob(result, buildOutputFilename(upload.file.name, 'wav', '-volume'))
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

          <div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">Volume</span>
              <span className="font-mono text-slate-700 dark:text-slate-300">{gainPercent}%</span>
            </div>
            <input
              type="range"
              min={10}
              max={300}
              step={5}
              value={gainPercent}
              onChange={(event) => setGainPercent(Number(event.target.value))}
              aria-label="Volume percentage"
              className="mt-1 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-brand-600 dark:bg-slate-700"
            />
            <p className="mt-1.5 text-xs text-slate-400 dark:text-slate-500">
              100% is unchanged. Above 100% may clip if the original audio is already loud.
            </p>
          </div>

          {status === 'idle' && (
            <button type="button" onClick={handleApply} className="btn-primary w-full sm:w-auto">
              <HiOutlineSpeakerWave className="h-4 w-4" />
              Apply Volume Change
            </button>
          )}

          {status === 'processing' && <ProgressBar label="Adjusting volume..." />}

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

AudioVolumeChangerTool.propTypes = {
  toolSlug: PropTypes.string,
  toolName: PropTypes.string,
  category: PropTypes.string,
}
