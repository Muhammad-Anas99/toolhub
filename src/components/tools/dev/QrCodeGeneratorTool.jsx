import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineArrowDownTray } from 'react-icons/hi2'
import { encode, renderToCanvas, renderToSvg, ERROR_CORRECTION_LEVELS } from '../../../lib/qrCodeUtils.js'
import { downloadBlob } from '../../../lib/downloadBlob.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

export default function QrCodeGeneratorTool({ toolSlug, toolName, category }) {
  const [text, setText] = useState('')
  const [errorLevel, setErrorLevel] = useState('M')
  const [foreground, setForeground] = useState('#000000')
  const [background, setBackground] = useState('#ffffff')
  const [error, setError] = useState(null)
  const canvasRef = useRef(null)
  const { logDebounced } = useHistoryLogger({ toolSlug, toolName, category })

  useEffect(() => {
    if (!text.trim()) {
      setError(null)
      const canvas = canvasRef.current
      if (canvas) {
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
      return
    }

    try {
      const qr = encode(text, errorLevel)
      renderToCanvas(qr, canvasRef.current, { moduleSize: 8, foreground, background })
      setError(null)
      logDebounced('QR code generated', text)
    } catch (err) {
      setError('Could not generate a QR code for this input — it may be too long for the selected error correction level.')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, errorLevel, foreground, background])

  function handleDownloadPng() {
    if (!text.trim() || !canvasRef.current) return
    canvasRef.current.toBlob((blob) => {
      downloadBlob(blob, 'qrcode.png')
    }, 'image/png')
  }

  function handleDownloadSvg() {
    if (!text.trim()) return
    try {
      const qr = encode(text, errorLevel)
      const svg = renderToSvg(qr, { moduleSize: 8, foreground, background })
      downloadBlob(new Blob([svg], { type: 'image/svg+xml' }), 'qrcode.svg')
    } catch (err) {
      setError('Could not generate a QR code for this input.')
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <label htmlFor="qr-text" className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Text or URL
        </label>
        <textarea
          id="qr-text"
          rows={3}
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="https://example.com or any text..."
          className="mt-1.5 w-full resize-none rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="qr-error-level" className="text-xs text-slate-500 dark:text-slate-400">
            Error correction
          </label>
          <select
            id="qr-error-level"
            value={errorLevel}
            onChange={(event) => setErrorLevel(event.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            {ERROR_CORRECTION_LEVELS.map((level) => (
              <option key={level.id} value={level.id}>
                {level.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="qr-foreground" className="text-xs text-slate-500 dark:text-slate-400">
            Foreground
          </label>
          <input
            id="qr-foreground"
            type="color"
            value={foreground}
            onChange={(event) => setForeground(event.target.value)}
            className="mt-1 h-9 w-full cursor-pointer rounded-lg border border-slate-200 dark:border-slate-700"
          />
        </div>
        <div>
          <label htmlFor="qr-background" className="text-xs text-slate-500 dark:text-slate-400">
            Background
          </label>
          <input
            id="qr-background"
            type="color"
            value={background}
            onChange={(event) => setBackground(event.target.value)}
            className="mt-1 h-9 w-full cursor-pointer rounded-lg border border-slate-200 dark:border-slate-700"
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

      <div className="flex flex-col items-center gap-4 rounded-xl bg-slate-50 p-6 dark:bg-slate-900/40">
        <canvas
          ref={canvasRef}
          className={`rounded-lg ${text.trim() ? 'block' : 'hidden'}`}
          style={{ imageRendering: 'pixelated', maxWidth: '280px', width: '100%', height: 'auto' }}
        />
        {!text.trim() && (
          <p className="py-12 text-sm text-slate-400 dark:text-slate-500">Enter text or a URL above to generate a QR code</p>
        )}

        {text.trim() && !error && (
          <div className="flex gap-2">
            <button type="button" onClick={handleDownloadPng} className="btn-primary text-sm">
              <HiOutlineArrowDownTray className="h-4 w-4" />
              Download PNG
            </button>
            <button type="button" onClick={handleDownloadSvg} className="btn-secondary text-sm">
              <HiOutlineArrowDownTray className="h-4 w-4" />
              Download SVG
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

QrCodeGeneratorTool.propTypes = {
  toolSlug: PropTypes.string,
  toolName: PropTypes.string,
  category: PropTypes.string,
}
