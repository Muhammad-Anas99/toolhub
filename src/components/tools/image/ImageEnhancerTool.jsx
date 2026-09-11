import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineArrowDownTray, HiOutlineSparkles } from 'react-icons/hi2'
import DropZone from '../DropZone.jsx'
import ErrorMessage from '../ErrorMessage.jsx'
import ProgressBar from '../ProgressBar.jsx'
import { useDocumentUpload } from '../../../hooks/useDocumentUpload.js'
import { loadImageData } from '../../../lib/backgroundRemovalUtils.js'
import { applyUnsharpMask, applyGaussianBlur } from '../../../lib/imageProcessingUtils.js'
import { downloadBlob, buildOutputFilename } from '../../../lib/downloadBlob.js'
import { formatBytes } from '../../../lib/formatBytes.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const ACCEPTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp']

export default function ImageEnhancerTool({ toolSlug, toolName, category }) {
  const upload = useDocumentUpload({ acceptedTypes: ACCEPTED_TYPES, acceptedExtensions: ACCEPTED_EXTENSIONS, maxSizeMB: 15 })
  const [sharpen, setSharpen] = useState(40)
  const [denoise, setDenoise] = useState(0)
  const [status, setStatus] = useState('idle')
  const [resultUrl, setResultUrl] = useState(null)
  const [resultBlob, setResultBlob] = useState(null)
  const { logNow } = useHistoryLogger({ toolSlug, toolName, category })

  async function handleEnhance() {
    if (!upload.file) return
    setStatus('processing')
    upload.setError(null)
    try {
      let { imageData } = await loadImageData(upload.file)

      if (denoise > 0) {
        const sigma = (denoise / 100) * 2
        imageData = applyGaussianBlur(imageData, sigma)
      }
      if (sharpen > 0) {
        const amount = sharpen / 100
        imageData = applyUnsharpMask(imageData, 1.0, amount)
      }

      const canvas = document.createElement('canvas')
      canvas.width = imageData.width
      canvas.height = imageData.height
      canvas.getContext('2d').putImageData(imageData, 0, 0)

      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'))
      if (resultUrl) URL.revokeObjectURL(resultUrl)
      setResultUrl(URL.createObjectURL(blob))
      setResultBlob(blob)
      setStatus('done')
      logNow('Image enhanced')
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
    setStatus('idle')
  }

  function handleDownload() {
    if (!resultBlob) return
    downloadBlob(resultBlob, buildOutputFilename(upload.file.name, 'png', '-enhanced'))
  }

  return (
    <div className="space-y-5">
      <div className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:bg-amber-950 dark:text-amber-300">
        This uses real, classical sharpening and noise-reduction techniques, not an AI model. Denoising trades some
        fine detail for smoother results, so start low and preview before committing to a strong setting.
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
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">Sharpen</span>
                  <span className="font-mono text-slate-700 dark:text-slate-300">{sharpen}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={sharpen}
                  onChange={(event) => setSharpen(Number(event.target.value))}
                  aria-label="Sharpen amount"
                  className="mt-1 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-brand-600 dark:bg-slate-700"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">Reduce noise</span>
                  <span className="font-mono text-slate-700 dark:text-slate-300">{denoise}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={denoise}
                  onChange={(event) => setDenoise(Number(event.target.value))}
                  aria-label="Noise reduction amount"
                  className="mt-1 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-brand-600 dark:bg-slate-700"
                />
              </div>

              <button type="button" onClick={handleEnhance} className="btn-primary w-full sm:w-auto">
                <HiOutlineSparkles className="h-4 w-4" />
                {status === 'done' ? 'Enhance Again' : 'Enhance Image'}
              </button>
            </>
          )}

          {status === 'processing' && <ProgressBar label="Enhancing image..." />}

          {status === 'done' && resultUrl && (
            <div className="space-y-3">
              <img src={resultUrl} alt="Enhanced result" className="mx-auto max-h-96 w-auto rounded-xl border border-slate-200 dark:border-slate-700" />

              <div className="flex items-center gap-3 rounded-xl bg-emerald-50 p-4 dark:bg-emerald-950">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">{formatBytes(resultBlob.size)}</p>
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

ImageEnhancerTool.propTypes = {
  toolSlug: PropTypes.string,
  toolName: PropTypes.string,
  category: PropTypes.string,
}
