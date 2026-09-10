import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineArrowUp, HiOutlineArrowDown, HiOutlineTrash, HiOutlineArrowDownTray } from 'react-icons/hi2'
import DropZone from '../DropZone.jsx'
import ErrorMessage from '../ErrorMessage.jsx'
import ProgressBar from '../ProgressBar.jsx'
import { useMultiFileUpload } from '../../../hooks/useMultiFileUpload.js'
import { decodeAudioFile, encodeWav, mergeAudioBuffers } from '../../../lib/audioUtils.js'
import { downloadBlob } from '../../../lib/downloadBlob.js'
import { formatBytes } from '../../../lib/formatBytes.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

const ACCEPTED_TYPES = ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp4', 'audio/webm', 'audio/flac']
const ACCEPTED_EXTENSIONS = ['.mp3', '.wav', '.ogg', '.m4a', '.webm', '.flac']

export default function AudioMergerTool({ toolSlug, toolName, category }) {
  const upload = useMultiFileUpload({ acceptedTypes: ACCEPTED_TYPES, acceptedExtensions: ACCEPTED_EXTENSIONS, maxSizeMB: 50 })
  const [status, setStatus] = useState('idle')
  const [result, setResult] = useState(null)
  const { logNow } = useHistoryLogger({ toolSlug, toolName, category })

  async function handleMerge() {
    if (upload.files.length < 2) {
      upload.setError('Add at least two audio files to merge.')
      return
    }
    setStatus('processing')
    upload.setError(null)
    try {
      const buffers = await Promise.all(upload.files.map((file) => decodeAudioFile(file)))
      const merged = mergeAudioBuffers(buffers)
      const blob = encodeWav(merged)
      setResult(blob)
      setStatus('done')
      logNow('Audio files merged')
    } catch (err) {
      upload.setError('One of these files couldn\u2019t be read as audio. Check that every file is a valid audio format.')
      setStatus('idle')
    }
  }

  function handleDownload() {
    if (!result) return
    downloadBlob(result, 'merged.wav')
  }

  function handleReset() {
    upload.reset()
    setResult(null)
    setStatus('idle')
  }

  return (
    <div className="space-y-5">
      {upload.error && <ErrorMessage message={upload.error} onDismiss={() => upload.setError(null)} />}

      {upload.files.length === 0 ? (
        <DropZone
          dropZoneProps={upload.dropZoneProps}
          inputProps={upload.inputProps}
          acceptedTypes={ACCEPTED_TYPES}
          maxSizeMB={50}
          isDragActive={upload.isDragActive}
          label="Drag & drop two or more audio files here"
          uploadLabel="Upload Audio Files"
        />
      ) : (
        <>
          <div className="card divide-y divide-slate-100 dark:divide-slate-800">
            {upload.files.map((file, index) => (
              <div key={`${file.name}-${index}`} className="flex items-center gap-3 px-4 py-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-semibold text-brand-600 dark:bg-brand-950 dark:text-brand-400">
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-900 dark:text-white">{file.name}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">{formatBytes(file.size)}</p>
                </div>
                <div className="flex flex-shrink-0 items-center gap-1">
                  <button
                    type="button"
                    onClick={() => upload.reorderFiles(index, index - 1)}
                    disabled={index === 0}
                    aria-label={`Move ${file.name} up`}
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:opacity-30 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                  >
                    <HiOutlineArrowUp className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => upload.reorderFiles(index, index + 1)}
                    disabled={index === upload.files.length - 1}
                    aria-label={`Move ${file.name} down`}
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:opacity-30 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                  >
                    <HiOutlineArrowDown className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => upload.removeFile(index)}
                    aria-label={`Remove ${file.name}`}
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-rose-600 dark:hover:bg-slate-800 dark:hover:text-rose-400"
                  >
                    <HiOutlineTrash className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {status === 'idle' && !result && (
            <div className="flex flex-wrap gap-3">
              <label className="btn-secondary cursor-pointer text-sm">
                Add more audio
                <input
                  type="file"
                  accept={ACCEPTED_TYPES.join(',')}
                  multiple
                  className="sr-only"
                  {...upload.inputProps}
                />
              </label>
              <button type="button" onClick={handleMerge} disabled={upload.files.length < 2} className="btn-primary text-sm">
                Merge {upload.files.length} Files
              </button>
            </div>
          )}
        </>
      )}

      {status === 'processing' && <ProgressBar label="Merging your audio files..." />}

      {result && (
        <div className="flex items-center gap-3 rounded-xl bg-emerald-50 p-4 dark:bg-emerald-950">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">{formatBytes(result.size)}</p>
          </div>
          <button type="button" onClick={handleDownload} className="btn-primary text-sm">
            <HiOutlineArrowDownTray className="h-4 w-4" />
            Download
          </button>
          <button type="button" onClick={handleReset} className="btn-secondary text-sm">
            Reset
          </button>
        </div>
      )}
    </div>
  )
}

AudioMergerTool.propTypes = {
  toolSlug: PropTypes.string,
  toolName: PropTypes.string,
  category: PropTypes.string,
}
