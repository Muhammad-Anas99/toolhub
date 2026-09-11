import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineArrowDownTray, HiOutlineArrowsPointingOut } from 'react-icons/hi2'
import DropZone from '../DropZone.jsx'
import ErrorMessage from '../ErrorMessage.jsx'
import ProgressBar from '../ProgressBar.jsx'
import { useDocumentUpload } from '../../../hooks/useDocumentUpload.js'
import { loadImageData } from '../../../lib/backgroundRemovalUtils.js'
import { applyUnsharpMask } from '../../../lib/imageProcessingUtils.js'
import { downloadBlob, buildOutputFilename } from '../../../lib/downloadBlob.js'
import { formatBytes } from '../../../lib/formatBytes.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const ACCEPTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp']
const SCALE_OPTIONS = [2, 3, 4]

export default function ImageUpscalerTool({ toolSlug, toolName, category }) {
  const upload = useDocumentUpload({ acceptedTypes: ACCEPTED_TYPES, acceptedExtensions: ACCEPTED_EXTENSIONS, maxSizeMB: 15 })
  const [scale, setScale] = useState(2)
  const [status, setStatus] = useState('idle')
  const [resultUrl, setResultUrl] = useState(null)
  const [resultBlob, setResultBlob] = useState(null)
  const [dimensions, setDimensions] = useState(null)
  const { logNow } = useHistoryLogger({ toolSlug, toolName, category })

  async function handleUpscale() {
    if (!upload.file) return
    setStatus('processing')
    upload.setError(null)
    try {
      const { imageData, width, height } = await loadImageData(upload.file)
      const targetWidth = width * scale
      const targetHeight = height * scale

      const sourceCanvas = document.createElement('canvas')
      sourceCanvas.width = width
      sourceCanvas.height = height
      sourceCanvas.getContext('2d').putImageData(imageData, 0, 0)

      const targetCanvas = document.createElement('canvas')
      targetCanvas.width = targetWidth
      targetCanvas.height = targetHeight
      const ctx = targetCanvas.getContext('2d')
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      ctx.drawImage(sourceCanvas, 0, 0, targetWidth, targetHeight)

      const upscaledImageData = ctx.getImageData(0, 0, targetWidth, targetHeight)
      const sharpened = applyUnsharpMask(upscaledImageData, 1.2, 0.6)
      ctx.putImageData(sharpened, 0, 0)

      const blob = await new Promise((resolve) => targetCanvas.toBlob(resolve, 'image/png'))
      if (resultUrl) URL.revokeObjectURL(resultUrl)
      setResultUrl(URL.createObjectURL(blob))
      setResultBlob(blob)
      setDimensions({ from: `${width}\u00d7${height}`, to: `${targetWidth}\u00d7${targetHeight}` })
      setStatus('done')
      logNow('Image upscaled')
    } catch (err) {
      upload.setError('This image couldn\u2019t be processed. It may be corrupted or in a format your browser can\u2019t decode.')
      setStatus('idle')
    }
  }

  function handleReset() {
    upload.reset()
    if (resultUrl) URL.revokeObjectURL(resultUrl)
    setResultUrl(null)
    setResultBlob(null)
    setDimensions(null)
    setStatus('idle')
  }

  function handleDownload() {
    if (!resultBlob) return
    downloadBlob(resultBlob, buildOutputFilename(upload.file.name, 'png', `-${scale}x`))
  }

  return (
    <div className="space-y-5">
      <div className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:bg-amber-950 dark:text-amber-300">
        This uses high-quality interpolation plus sharpening, a real classical technique, not an AI model. It works
        best for modest enlargements (2-4x); it can't invent detail that was never captured in the original photo.
      </div>

      {upload.error && <ErrorMessage message={upload.error} onDismiss={() => upload.setError(null)} />}

      {!upload.file ? (
        <DropZone
          dropZoneProps={upload.dropZoneProps}
          inputProps={upload.inputProps}
          acceptedTypes={ACCEPTED_TYPES}
          maxSizeMB={15}
          isDragActive={upload.isDragActive}
          label="Drag & drop an image here"
          uploadLabel="Upload Image"
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

          {status !== 'processing' && (
            <>
              <div>
                <label htmlFor="scale-select" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Scale factor
                </label>
                <select
                  id="scale-select"
                  value={scale}
                  onChange={(event) => setScale(Number(event.target.value))}
                  className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  {SCALE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}x
                    </option>
                  ))}
                </select>
              </div>

              <button type="button" onClick={handleUpscale} className="btn-primary w-full sm:w-auto">
                <HiOutlineArrowsPointingOut className="h-4 w-4" />
                {status === 'done' ? 'Upscale Again' : 'Upscale Image'}
              </button>
            </>
          )}

          {status === 'processing' && <ProgressBar label="Upscaling image..." />}

          {status === 'done' && resultUrl && (
            <div className="space-y-3">
              <img src={resultUrl} alt="Upscaled result" className="mx-auto max-h-96 w-auto rounded-xl border border-slate-200 dark:border-slate-700" />

              <div className="flex flex-wrap items-center gap-3 rounded-xl bg-emerald-50 p-4 dark:bg-emerald-950">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
                    {dimensions && `${dimensions.from} \u2192 ${dimensions.to}`}
                  </p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400">{formatBytes(resultBlob.size)}</p>
                </div>
                <button type="button" onClick={handleDownload} className="btn-primary text-sm">
                  <HiOutlineArrowDownTray className="h-4 w-4" />
                  Download PNG
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

ImageUpscalerTool.propTypes = {
  toolSlug: PropTypes.string,
  toolName: PropTypes.string,
  category: PropTypes.string,
}
