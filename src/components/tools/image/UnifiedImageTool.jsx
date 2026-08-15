import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  HiOutlineArrowDownTray,
  HiXMark,
  HiOutlineArrowUturnLeft,
  HiOutlineLockClosed,
  HiOutlineLockOpen,
} from 'react-icons/hi2'
import DropZone from '../DropZone.jsx'
import ErrorMessage from '../ErrorMessage.jsx'
import ProgressBar from '../ProgressBar.jsx'
import { useMultiImageUpload, MAX_BATCH_FILES } from '../../../hooks/useMultiImageUpload.js'
import { processImageBatch } from '../../../lib/imageProcessing.js'
import { buildOutputFilename, downloadBlob } from '../../../lib/downloadBlob.js'
import { createZip } from '../../../lib/zipUtils.js'
import { formatBytes } from '../../../lib/formatBytes.js'
import { api } from '../../../lib/api.js'

const FORMAT_OPTIONS = [
  { id: 'original', label: 'Keep format', mimeType: null, extension: null },
  { id: 'jpg', label: 'JPG', mimeType: 'image/jpeg', extension: 'jpg' },
  { id: 'png', label: 'PNG', mimeType: 'image/png', extension: 'png' },
  { id: 'webp', label: 'WEBP', mimeType: 'image/webp', extension: 'webp' },
]
const ROTATE_OPTIONS = [0, 90, 180, 270]

function extensionFor(file, format) {
  if (format.extension) return format.extension
  return (file.name.split('.').pop() || 'png').toLowerCase()
}

/**
 * Shared by every upload-based image tool (JPG→PNG, PNG→JPG, WEBP→PNG,
 * WEBP→JPG, Convert to WEBP, Image Compressor, Image Resizer, Image
 * Rotator, Flip Image) — each page configures this with its own default
 * operation (via `defaultFormatId`/`defaultRotate`/etc. and
 * `primaryActionLabel`), but every control is always available and
 * combinable: upload up to 10 images, and whatever combination of
 * format/resize/rotate/flip is currently set applies to all of them in
 * one click, same as this file's earlier standalone "Image Editor"
 * version — just deployed per-tool instead of as one separate tool.
 */
export default function UnifiedImageTool({
  toolSlug,
  toolName,
  category,
  acceptedTypes,
  primaryActionLabel = 'Process',
  defaultFormatId = 'original',
  defaultRotate = 0,
  defaultFlipHorizontal = false,
  defaultFlipVertical = false,
  defaultQuality = 0.9,
  defaultResizeEnabled = false,
  defaultResizeMode = 'percentage',
  outputSuffix = '-edited',
}) {
  const upload = useMultiImageUpload({ acceptedTypes, maxSizeMB: 25 })

  const [formatId, setFormatId] = useState(defaultFormatId)
  const [resizeEnabled, setResizeEnabled] = useState(defaultResizeEnabled)
  const [resizeMode, setResizeMode] = useState(defaultResizeMode) // percentage | pixels
  const [scalePercent, setScalePercent] = useState(100)
  const [pixelWidth, setPixelWidth] = useState('')
  const [pixelHeight, setPixelHeight] = useState('')
  const [lockAspect, setLockAspect] = useState(true)
  const [rotateDegrees, setRotateDegrees] = useState(defaultRotate)
  const [flipHorizontal, setFlipHorizontal] = useState(defaultFlipHorizontal)
  const [flipVertical, setFlipVertical] = useState(defaultFlipVertical)
  const [quality, setQuality] = useState(defaultQuality)

  const [status, setStatus] = useState('idle') // idle | processing | done
  const [results, setResults] = useState([])
  const [isZipping, setIsZipping] = useState(false)

  const format = FORMAT_OPTIONS.find((option) => option.id === formatId)

  function handlePixelWidthChange(value) {
    setPixelWidth(value)
    if (lockAspect && upload.items[0] && value !== '') {
      const ratio = upload.items[0].dimensions.height / upload.items[0].dimensions.width
      setPixelHeight(String(Math.round(Number(value) * ratio)))
    }
  }

  function handlePixelHeightChange(value) {
    setPixelHeight(value)
    if (lockAspect && upload.items[0] && value !== '') {
      const ratio = upload.items[0].dimensions.width / upload.items[0].dimensions.height
      setPixelWidth(String(Math.round(Number(value) * ratio)))
    }
  }

  async function handleProcess() {
    if (upload.items.length === 0) return
    setStatus('processing')
    upload.setError(null)

    const nextResults = []
    for (const item of upload.items) {
      try {
        let targetWidth = null
        let targetHeight = null
        if (resizeEnabled) {
          if (resizeMode === 'percentage' && scalePercent !== 100) {
            targetWidth = Math.round(item.dimensions.width * (scalePercent / 100))
            targetHeight = Math.round(item.dimensions.height * (scalePercent / 100))
          } else if (resizeMode === 'pixels' && pixelWidth && pixelHeight) {
            targetWidth = Number(pixelWidth)
            targetHeight = Number(pixelHeight)
          }
        }

        const { blob } = await processImageBatch(item.file, {
          rotateDegrees,
          flipHorizontal,
          flipVertical,
          targetWidth,
          targetHeight,
          mimeType: format.mimeType || undefined,
          quality,
        })

        nextResults.push({
          id: item.id,
          filename: buildOutputFilename(item.file.name, extensionFor(item.file, format), outputSuffix),
          blob,
          url: URL.createObjectURL(blob),
          originalSize: item.file.size,
        })
      } catch (error) {
        upload.setError(`${item.file.name}: ${error.message || 'Could not process this image.'}`)
      }
    }

    setResults(nextResults)
    setStatus('done')

    if (nextResults.length > 0) {
      api.logConversion({ toolSlug, toolName, category }).catch(() => {})
    }
  }

  function handleDownloadOne(result) {
    downloadBlob(result.blob, result.filename)
  }

  async function handleDownloadAll() {
    setIsZipping(true)
    try {
      const zipBlob = await createZip(results.map((r) => ({ filename: r.filename, blob: r.blob })))
      downloadBlob(zipBlob, 'toolhub-images.zip')
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
    setFormatId(defaultFormatId)
    setResizeEnabled(defaultResizeEnabled)
    setResizeMode(defaultResizeMode)
    setScalePercent(100)
    setPixelWidth('')
    setPixelHeight('')
    setRotateDegrees(defaultRotate)
    setFlipHorizontal(defaultFlipHorizontal)
    setFlipVertical(defaultFlipVertical)
  }

  return (
    <div className="space-y-6">
      {upload.error && <ErrorMessage message={upload.error} onDismiss={() => upload.setError(null)} />}

      {upload.items.length === 0 ? (
        <DropZone
          dropZoneProps={upload.dropZoneProps}
          inputProps={upload.inputProps}
          acceptedTypes={acceptedTypes}
          maxSizeMB={25}
          isDragActive={upload.isDragActive}
          label={`Drag & drop up to ${MAX_BATCH_FILES} images here`}
          uploadLabel="Upload images"
        />
      ) : (
        <>
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {upload.items.length} of {MAX_BATCH_FILES} images
            </p>
            {upload.items.length < MAX_BATCH_FILES && status === 'idle' && (
              <label className="cursor-pointer text-sm font-medium text-brand-600 dark:text-brand-400">
                Add more
                <input type="file" accept={acceptedTypes.join(',')} multiple className="sr-only" {...upload.inputProps} />
              </label>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
            {upload.items.map((item) => (
              <div key={item.id} className="group relative aspect-square overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
                <img src={item.previewUrl} alt={item.file.name} className="h-full w-full object-cover" />
                {status === 'idle' && (
                  <button
                    type="button"
                    onClick={() => upload.removeItem(item.id)}
                    aria-label={`Remove ${item.file.name}`}
                    className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <HiXMark className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {upload.items.length > 0 && status !== 'done' && (
        <div className="card space-y-6 p-5">
          <div>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Format</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {FORMAT_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setFormatId(option.id)}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    formatId === option.id
                      ? 'bg-brand-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Resize</p>
              <button
                type="button"
                onClick={() => setResizeEnabled((prev) => !prev)}
                aria-pressed={resizeEnabled}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  resizeEnabled
                    ? 'bg-brand-600 text-white'
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                {resizeEnabled ? 'On' : 'Off'}
              </button>
            </div>

            {resizeEnabled && (
              <div className="mt-3 space-y-3">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setResizeMode('percentage')}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                      resizeMode === 'percentage'
                        ? 'bg-brand-600 text-white'
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    By percentage
                  </button>
                  <button
                    type="button"
                    onClick={() => setResizeMode('pixels')}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                      resizeMode === 'pixels'
                        ? 'bg-brand-600 text-white'
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    By width &amp; height
                  </button>
                </div>

                {resizeMode === 'percentage' ? (
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400 dark:text-slate-500">Scale</span>
                      <span className="text-sm font-semibold text-brand-600 dark:text-brand-400">{scalePercent}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="200"
                      step="5"
                      value={scalePercent}
                      onChange={(event) => setScalePercent(Number(event.target.value))}
                      className="mt-1 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-brand-600 dark:bg-slate-700"
                    />
                    {upload.items.length > 1 && (
                      <p className="mt-1.5 text-xs text-slate-400 dark:text-slate-500">
                        Applied to each image&apos;s own size, so every image keeps its correct aspect ratio.
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <label htmlFor="unified-width" className="text-xs text-slate-400 dark:text-slate-500">
                        Width (px)
                      </label>
                      <input
                        id="unified-width"
                        type="number"
                        min="1"
                        value={pixelWidth}
                        onChange={(event) => handlePixelWidthChange(event.target.value)}
                        className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-sm text-slate-900 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setLockAspect((prev) => !prev)}
                      aria-label={lockAspect ? 'Unlock aspect ratio' : 'Lock aspect ratio'}
                      aria-pressed={lockAspect}
                      className="mb-1 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
                    >
                      {lockAspect ? <HiOutlineLockClosed className="h-4 w-4" /> : <HiOutlineLockOpen className="h-4 w-4" />}
                    </button>
                    <div className="flex-1">
                      <label htmlFor="unified-height" className="text-xs text-slate-400 dark:text-slate-500">
                        Height (px)
                      </label>
                      <input
                        id="unified-height"
                        type="number"
                        min="1"
                        value={pixelHeight}
                        onChange={(event) => handlePixelHeightChange(event.target.value)}
                        className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-sm text-slate-900 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      />
                    </div>
                    {upload.items.length > 1 && (
                      <p className="w-full text-xs text-slate-400 dark:text-slate-500">
                        Applied to every image identically — use percentage mode instead if your images are
                        different sizes and you want to keep each one's own proportions.
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <div>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Rotate</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {ROTATE_OPTIONS.map((degrees) => (
                <button
                  key={degrees}
                  type="button"
                  onClick={() => setRotateDegrees(degrees)}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    rotateDegrees === degrees
                      ? 'bg-brand-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {degrees}°
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Flip</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setFlipHorizontal((prev) => !prev)}
                aria-pressed={flipHorizontal}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  flipHorizontal
                    ? 'bg-brand-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                Horizontal
              </button>
              <button
                type="button"
                onClick={() => setFlipVertical((prev) => !prev)}
                aria-pressed={flipVertical}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  flipVertical
                    ? 'bg-brand-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                Vertical
              </button>
            </div>
          </div>

          {(formatId === 'jpg' || formatId === 'webp') && (
            <div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Quality</p>
                <span className="text-sm font-semibold text-brand-600 dark:text-brand-400">
                  {Math.round(quality * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0.4"
                max="1"
                step="0.05"
                value={quality}
                onChange={(event) => setQuality(Number(event.target.value))}
                className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-brand-600 dark:bg-slate-700"
              />
            </div>
          )}

          <button type="button" onClick={handleProcess} disabled={status === 'processing'} className="btn-primary w-full sm:w-auto">
            {status === 'processing'
              ? 'Processing...'
              : `${primaryActionLabel}${upload.items.length > 1 ? ` (${upload.items.length} images)` : ''}`}
          </button>
        </div>
      )}

      {status === 'processing' && <ProgressBar label="Processing your images..." />}

      {status === 'done' && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {results.length} image{results.length === 1 ? '' : 's'} ready
            </p>
            <div className="flex gap-2">
              <button type="button" onClick={handleReset} className="btn-secondary text-sm">
                <HiOutlineArrowUturnLeft className="h-4 w-4" />
                Start over
              </button>
              {results.length > 1 && (
                <button type="button" onClick={handleDownloadAll} disabled={isZipping} className="btn-primary text-sm">
                  <HiOutlineArrowDownTray className="h-4 w-4" />
                  {isZipping ? 'Zipping...' : 'Download All (.zip)'}
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {results.map((result) => (
              <div key={result.id} className="card overflow-hidden">
                <div className="aspect-square bg-slate-50 dark:bg-slate-900">
                  <img src={result.url} alt={result.filename} className="h-full w-full object-contain" />
                </div>
                <div className="p-3">
                  <p className="truncate text-xs font-medium text-slate-900 dark:text-white">{result.filename}</p>
                  <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                    {formatBytes(result.originalSize)} &rarr; {formatBytes(result.blob.size)}
                  </p>
                  <button type="button" onClick={() => handleDownloadOne(result)} className="btn-secondary mt-2 w-full text-xs">
                    <HiOutlineArrowDownTray className="h-3.5 w-3.5" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

UnifiedImageTool.propTypes = {
  toolSlug: PropTypes.string,
  toolName: PropTypes.string,
  category: PropTypes.string,
  acceptedTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  primaryActionLabel: PropTypes.string,
  defaultFormatId: PropTypes.oneOf(['original', 'jpg', 'png', 'webp']),
  defaultRotate: PropTypes.oneOf([0, 90, 180, 270]),
  defaultFlipHorizontal: PropTypes.bool,
  defaultFlipVertical: PropTypes.bool,
  defaultQuality: PropTypes.number,
  defaultResizeEnabled: PropTypes.bool,
  defaultResizeMode: PropTypes.oneOf(['percentage', 'pixels']),
  outputSuffix: PropTypes.string,
}
