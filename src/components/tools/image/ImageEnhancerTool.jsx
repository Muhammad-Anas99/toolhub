import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineArrowDownTray, HiOutlineSparkles, HiXMark, HiOutlineArrowUturnLeft } from 'react-icons/hi2'
import DropZone from '../DropZone.jsx'
import ErrorMessage from '../ErrorMessage.jsx'
import ProgressBar from '../ProgressBar.jsx'
import { useDocumentUpload } from '../../../hooks/useDocumentUpload.js'
import { loadImageData } from '../../../lib/backgroundRemovalUtils.js'
import { applyUnsharpMask, applyGaussianBlur } from '../../../lib/imageProcessingUtils.js'
import { downloadBlob, buildOutputFilename } from '../../../lib/downloadBlob.js'
import { createZip } from '../../../lib/zipUtils.js'
import { formatBytes } from '../../../lib/formatBytes.js'
import { api } from '../../../lib/api.js'

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const ACCEPTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp']
const MAX_BATCH_FILES = 10

async function enhanceOne(file, sharpen, denoise) {
  let { imageData } = await loadImageData(file)

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

  return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), 'image/png'))
}

/**
 * Extends the original single-file version to handle up to
 * MAX_BATCH_FILES images at once, at one shared sharpen/denoise
 * setting applied to all of them - the same "one setting, many files"
 * shape as Compress PDF's quality slider. Worth being honest about the
 * real difference from that case though: sharpen/denoise is a taste
 * setting, not a correctness one - an overly strong value still
 * produces a valid, just possibly over-processed image, never a
 * broken one, which is what makes this a reasonable batch candidate
 * despite the tool's own existing "preview before committing to a
 * strong setting" caution. That's a different situation from
 * Background Remover, where the wrong setting can genuinely fail on a
 * specific image (a broken cutout, not just an over-processed one) -
 * that tool is deliberately left single-file for exactly that reason.
 */
export default function ImageEnhancerTool({ toolSlug, toolName, category }) {
  const upload = useDocumentUpload({ acceptedTypes: ACCEPTED_TYPES, acceptedExtensions: ACCEPTED_EXTENSIONS, maxSizeMB: 15, multiple: true })
  const [sharpen, setSharpen] = useState(40)
  const [denoise, setDenoise] = useState(0)
  const [status, setStatus] = useState('idle')
  const [progressLabel, setProgressLabel] = useState('Enhancing...')
  const [results, setResults] = useState([])
  const [isZipping, setIsZipping] = useState(false)

  async function handleEnhance() {
    if (upload.files.length === 0) return
    setStatus('processing')
    upload.setError(null)

    const nextResults = []
    for (const file of upload.files) {
      try {
        const fileIndex = nextResults.length + 1
        setProgressLabel(
          upload.files.length > 1 ? `Enhancing ${file.name} (${fileIndex} of ${upload.files.length})...` : 'Enhancing image...'
        )
        const blob = await enhanceOne(file, sharpen, denoise)
        nextResults.push({
          id: `${file.name}-${file.size}-${file.lastModified}`,
          file,
          filename: buildOutputFilename(file.name, 'png', '-enhanced'),
          blob,
          url: URL.createObjectURL(blob),
        })
      } catch {
        upload.setError(`${file.name}: This image couldn\u2019t be processed. It may be corrupted or in a format your browser can\u2019t decode.`)
      }
    }

    setResults(nextResults)
    setStatus('done')

    if (nextResults.length > 0) {
      api.logConversion({ toolSlug, toolName, category, action: `Image${nextResults.length > 1 ? 's' : ''} enhanced` }).catch(() => {})
    }
  }

  function handleDownloadOne(result) {
    downloadBlob(result.blob, result.filename)
  }

  async function handleDownloadAll() {
    setIsZipping(true)
    try {
      const zipBlob = await createZip(results.map((r) => ({ filename: r.filename, blob: r.blob })))
      downloadBlob(zipBlob, 'toolhub-enhanced-images.zip')
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
        This uses real, classical sharpening and noise-reduction techniques, not an AI model. Denoising trades some
        fine detail for smoother results, so start low and preview before committing to a strong setting — with
        multiple images, the same setting applies to all of them, so it's worth checking the first result before
        assuming the rest look right too. Add up to {MAX_BATCH_FILES} images to enhance them all in one go.
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
              Enhance {upload.files.length > 1 ? `${upload.files.length} Images` : 'Image'}
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
                alt="Enhanced result"
                className="mx-auto max-h-96 w-auto rounded-xl border border-slate-200 dark:border-slate-700"
              />
              <div className="flex items-center gap-3 rounded-xl bg-emerald-50 p-4 dark:bg-emerald-950">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">{formatBytes(results[0].blob.size)}</p>
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
                    <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">{formatBytes(result.blob.size)}</p>
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

ImageEnhancerTool.propTypes = {
  toolSlug: PropTypes.string,
  toolName: PropTypes.string,
  category: PropTypes.string,
}
