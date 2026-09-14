import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineArrowDownTray } from 'react-icons/hi2'
import DropZone from '../DropZone.jsx'
import ErrorMessage from '../ErrorMessage.jsx'
import ProgressBar from '../ProgressBar.jsx'
import { useImageUpload } from '../../../hooks/useImageUpload.js'
import { convertSvgToPng, convertSvgToIco, PNG_OUTPUT_SIZES } from '../../../lib/svgConversionUtils.js'
import { downloadBlob } from '../../../lib/downloadBlob.js'
import { formatBytes } from '../../../lib/formatBytes.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

const ACCEPTED_TYPES = ['image/svg+xml']

export default function SvgConverterTool({ toolSlug, toolName, category }) {
  const upload = useImageUpload({ acceptedTypes: ACCEPTED_TYPES, maxSizeMB: 10 })
  const [format, setFormat] = useState('png')
  const [size, setSize] = useState(512)
  const [status, setStatus] = useState('idle') // idle | processing | done
  const [resultBlob, setResultBlob] = useState(null)
  const [resultUrl, setResultUrl] = useState(null)
  const { logNow } = useHistoryLogger({ toolSlug, toolName, category })

  async function handleConvert() {
    if (!upload.file) return
    setStatus('processing')
    upload.setError(null)

    try {
      const blob = format === 'png' ? await convertSvgToPng(upload.file, size) : await convertSvgToIco(upload.file)
      setResultBlob(blob)
      setResultUrl(URL.createObjectURL(blob))
      setStatus('done')
      logNow(`SVG converted to ${format.toUpperCase()}`)
    } catch (err) {
      upload.setError(
        err.message ||
          'Could not convert this SVG. Some SVG files need explicit width and height attributes (not just a viewBox) to render reliably.'
      )
      setStatus('idle')
    }
  }

  function handleReset() {
    upload.reset()
    setResultBlob(null)
    setResultUrl(null)
    setStatus('idle')
  }

  function handleDownload() {
    if (!resultBlob) return
    const filename = format === 'png' ? `converted-${size}x${size}.png` : 'converted.ico'
    downloadBlob(resultBlob, filename)
  }

  return (
    <div className="space-y-5">
      {upload.error && <ErrorMessage message={upload.error} onDismiss={() => upload.setError(null)} />}

      {!upload.file ? (
        <DropZone
          dropZoneProps={upload.dropZoneProps}
          inputProps={upload.inputProps}
          acceptedTypes={ACCEPTED_TYPES}
          maxSizeMB={10}
          isDragActive={upload.isDragActive}
          label="Drag & drop an SVG file here"
          uploadLabel="Upload SVG"
        />
      ) : (
        <>
          <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-900/40">
            <img src={upload.previewUrl} alt="Uploaded SVG preview" className="h-16 w-16 rounded-lg object-contain" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-900 dark:text-white">{upload.file.name}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500">{formatBytes(upload.file.size)}</p>
            </div>
            <button type="button" onClick={handleReset} className="btn-secondary text-xs">
              Reset
            </button>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Output format</label>
            <div className="mt-1.5 flex gap-2">
              {[
                { id: 'png', label: 'PNG' },
                { id: 'ico', label: 'ICO (icon)' },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => {
                    setFormat(f.id)
                    setStatus('idle')
                    setResultBlob(null)
                  }}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    format === f.id
                      ? 'bg-brand-600 text-white'
                      : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {format === 'png' && (
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Output size</label>
              <select
                value={size}
                onChange={(e) => {
                  setSize(Number(e.target.value))
                  setStatus('idle')
                  setResultBlob(null)
                }}
                className="mt-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                {PNG_OUTPUT_SIZES.map((s) => (
                  <option key={s} value={s}>
                    {s} &times; {s}px
                  </option>
                ))}
              </select>
            </div>
          )}

          {format === 'ico' && (
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Builds a real multi-resolution .ico file (16&times;16, 32&times;32, 48&times;48 bundled together), the
              format browsers and Windows expect for a favicon or app icon.
            </p>
          )}

          {status === 'idle' && (
            <button type="button" onClick={handleConvert} className="btn-primary w-full sm:w-auto">
              Convert
            </button>
          )}

          {status === 'processing' && <ProgressBar label="Converting..." />}

          {status === 'done' && resultBlob && (
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <img
                src={resultUrl}
                alt="Converted result preview"
                className="h-24 w-24 rounded-lg object-contain"
                style={{ imageRendering: format === 'ico' || size <= 48 ? 'pixelated' : 'auto' }}
              />
              <p className="text-xs text-slate-400 dark:text-slate-500">{formatBytes(resultBlob.size)}</p>
              <button type="button" onClick={handleDownload} className="btn-primary text-sm">
                <HiOutlineArrowDownTray className="h-4 w-4" />
                Download {format.toUpperCase()}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

SvgConverterTool.propTypes = {
  toolSlug: PropTypes.string,
  toolName: PropTypes.string,
  category: PropTypes.string,
}
