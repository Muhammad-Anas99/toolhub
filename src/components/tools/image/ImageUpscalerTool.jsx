import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineArrowDownTray, HiOutlineArrowsPointingOut, HiXMark, HiOutlineArrowUturnLeft } from 'react-icons/hi2'
import DropZone from '../DropZone.jsx'
import ErrorMessage from '../ErrorMessage.jsx'
import ProgressBar from '../ProgressBar.jsx'
import { useDocumentUpload } from '../../../hooks/useDocumentUpload.js'
import { loadImageData } from '../../../lib/backgroundRemovalUtils.js'
import { applyUnsharpMask } from '../../../lib/imageProcessingUtils.js'
import { downloadBlob, buildOutputFilename } from '../../../lib/downloadBlob.js'
import { createZip } from '../../../lib/zipUtils.js'
import { formatBytes } from '../../../lib/formatBytes.js'
import { api } from '../../../lib/api.js'

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const ACCEPTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp']
const SCALE_OPTIONS = [2, 3, 4]
const MAX_BATCH_FILES = 10

async function upscaleOne(file, scale) {
  const { imageData, width, height } = await loadImageData(file)
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
  return { blob, from: `${width}\u00d7${height}`, to: `${targetWidth}\u00d7${targetHeight}` }
}

/**
 * Extends the original single-file version to handle up to
 * MAX_BATCH_FILES images at once. A good batch candidate specifically
 * because the scale factor is deterministic — 2x always means exactly
 * 2x regardless of what's in the photo, unlike Background Remover's
 * tolerance setting, which can genuinely need a different value per
 * image and explicitly warns to preview before relying on the result.
 * That tool is deliberately left single-file; this one isn't the same
 * situation.
 */
export default function ImageUpscalerTool({ toolSlug, toolName, category }) {
  const upload = useDocumentUpload({ acceptedTypes: ACCEPTED_TYPES, acceptedExtensions: ACCEPTED_EXTENSIONS, maxSizeMB: 15, multiple: true })
  const [scale, setScale] = useState(2)
  const [status, setStatus] = useState('idle')
  const [progressLabel, setProgressLabel] = useState('Upscaling...')
  const [results, setResults] = useState([])
  const [isZipping, setIsZipping] = useState(false)

  async function handleUpscale() {
    if (upload.files.length === 0) return
    setStatus('processing')
    upload.setError(null)

    const nextResults = []
    for (const file of upload.files) {
      try {
        const fileIndex = nextResults.length + 1
        setProgressLabel(
          upload.files.length > 1 ? `Upscaling ${file.name} (${fileIndex} of ${upload.files.length})...` : 'Upscaling image...'
        )
        const { blob, from, to } = await upscaleOne(file, scale)
        nextResults.push({
          id: `${file.name}-${file.size}-${file.lastModified}`,
          file,
          filename: buildOutputFilename(file.name, 'png', `-${scale}x`),
          blob,
          url: URL.createObjectURL(blob),
          from,
          to,
        })
      } catch {
        upload.setError(`${file.name}: This image couldn\u2019t be processed. It may be corrupted or in a format your browser can\u2019t decode.`)
      }
    }

    setResults(nextResults)
    setStatus('done')

    if (nextResults.length > 0) {
      api.logConversion({ toolSlug, toolName, category, action: `Image${nextResults.length > 1 ? 's' : ''} upscaled` }).catch(() => {})
    }
  }

  function handleDownloadOne(result) {
    downloadBlob(result.blob, result.filename)
  }

  async function handleDownloadAll() {
    setIsZipping(true)
    try {
      const zipBlob = await createZip(results.map((r) => ({ filename: r.filename, blob: r.blob })))
      downloadBlob(zipBlob, 'toolhub-upscaled-images.zip')
    } catch {
      upload.setError('Could not create a ZIP file. Try downloading images individually instead.')
    } finally {
      setIsZipping(false)
    }
  }

  function handleReset() {
    results.forEach((result) => URL.revokeObjectURL(result.url))
    setResults([])
    setStatus('idle')
    upload.reset()
  }

  return (
    <div className="space-y-5">
      <div className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:bg-amber-950 dark:text-amber-300">
        This uses high-quality interpolation plus sharpening, a real classical technique, not an AI model. It works
        best for modest enlargements (2-4x); it can't invent detail that was never captured in the original photo.
        Add up to {MAX_BATCH_FILES} images to upscale them all in one go.
      </div>

      {upload.error && <ErrorMessage message={upload.error} onDismiss={() => upload.setError(null)} />}

      {upload.files.length === 0 ? (
        <DropZone
          dropZoneProps={upload.dropZoneProps}
          inputProps={upload.inputProps}
          acceptedTypes={ACCEPTED_TYPES}
          maxSizeMB={15}
          isDragActive={upload.isDragActive}
          label="Drag & drop images here"
          uploadLabel="Upload Images"
        />
      ) : (
        status === 'idle' && (
          <div className="space-y-4">
            <ul className="space-y-2">
              {upload.files.map((file, index) => (
                <li
                  key={`${file.name}-${file.size}-${index}`}
                  className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-900 dark:text-white">{file.name}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">{formatBytes(file.size)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => upload.removeFile(index)}
                    aria-label={`Remove ${file.name}`}
                    className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950 dark:hover:text-rose-400"
                  >
                    <HiXMark className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>

            {upload.files.length < MAX_BATCH_FILES && (
              <label className="cursor-pointer text-sm font-medium text-brand-600 dark:text-brand-400">
                Add another image
                <input type="file" accept={ACCEPTED_TYPES.join(',')} multiple className="sr-only" {...upload.inputProps} />
              </label>
            )}

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
              Upscale {upload.files.length > 1 ? `${upload.files.length} Images` : 'Image'}
            </button>
          </div>
        )
      )}

      {status === 'processing' && <ProgressBar label={progressLabel} />}

      {status === 'done' && results.length > 0 && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button type="button" onClick={handleReset} className="btn-secondary text-sm">
              <HiOutlineArrowUturnLeft className="h-4 w-4" />
              Start Over
            </button>
            {results.length > 1 && (
              <button type="button" onClick={handleDownloadAll} disabled={isZipping} className="btn-primary text-sm">
                <HiOutlineArrowDownTray className="h-4 w-4" />
                {isZipping ? 'Zipping...' : 'Download All (.zip)'}
              </button>
            )}
          </div>

          {results.length === 1 ? (
            <div className="space-y-3">
              <img
                src={results[0].url}
                alt="Upscaled result"
                className="mx-auto max-h-96 w-auto rounded-xl border border-slate-200 dark:border-slate-700"
              />
              <div className="flex flex-wrap items-center gap-3 rounded-xl bg-emerald-50 p-4 dark:bg-emerald-950">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
                    {results[0].from} &rarr; {results[0].to}
                  </p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400">{formatBytes(results[0].blob.size)}</p>
                </div>
                <button type="button" onClick={() => handleDownloadOne(results[0])} className="btn-primary text-sm">
                  <HiOutlineArrowDownTray className="h-4 w-4" />
                  Download PNG
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {results.map((result) => (
                <div key={result.id} className="card overflow-hidden">
                  <div className="aspect-square bg-slate-50 dark:bg-slate-900">
                    <img src={result.url} alt={result.filename} className="h-full w-full object-contain" />
                  </div>
                  <div className="p-3">
                    <p className="truncate text-xs font-medium text-slate-900 dark:text-white">{result.filename}</p>
                    <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                      {result.from} &rarr; {result.to}
                    </p>
                    <button type="button" onClick={() => handleDownloadOne(result)} className="btn-secondary mt-2 w-full text-xs">
                      <HiOutlineArrowDownTray className="h-3.5 w-3.5" />
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

ImageUpscalerTool.propTypes = {
  toolSlug: PropTypes.string,
  toolName: PropTypes.string,
  category: PropTypes.string,
}
