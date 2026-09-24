import React, { useState } from 'react'
import DropZone from '../DropZone.jsx'
import ErrorMessage from '../ErrorMessage.jsx'
import ProgressBar from '../ProgressBar.jsx'
import { usePdfUpload } from '../../../hooks/usePdfUpload.js'
import { compressPdf } from '../../../lib/pdfCompressUtils.js'
import { buildOutputFilename, downloadBlob } from '../../../lib/downloadBlob.js'
import { createZip } from '../../../lib/zipUtils.js'
import { formatBytes } from '../../../lib/formatBytes.js'
import { api } from '../../../lib/api.js'
import { HiOutlineArrowDownTray, HiXMark, HiOutlineArrowUturnLeft } from 'react-icons/hi2'

const ACCEPTED_TYPES = ['application/pdf']
const MAX_BATCH_FILES = 10

/**
 * Extends the original single-file Compress PDF tool to handle up to
 * MAX_BATCH_FILES PDFs at once - same compressPdf() function per file
 * (the actual compression logic is untouched, same signature and
 * behavior as the single-file version), a results list instead of one
 * result panel when there's more than one file, and a "Download All
 * (.zip)" option reusing the same createZip() utility already proven
 * working for the image tools' batch mode - not a new implementation,
 * the same one. The "Add another PDF" affordance matches the exact
 * pattern already established and working in UnifiedImageTool.jsx (a
 * label wrapping a hidden multi-file input), not a second DropZone,
 * since DropZone doesn't have a compact variant for this use.
 */
export default function CompressPdfTool({ toolSlug, toolName, category }) {
  const upload = usePdfUpload({ maxSizeMB: 50, multiple: true })
  const [quality, setQuality] = useState(65)
  const [status, setStatus] = useState('idle') // idle | processing | done
  const [progressLabel, setProgressLabel] = useState('Compressing...')
  const [results, setResults] = useState([])
  const [isZipping, setIsZipping] = useState(false)

  async function handleCompress() {
    if (upload.files.length === 0) return
    setStatus('processing')
    upload.setError(null)

    const nextResults = []
    for (const file of upload.files) {
      try {
        const fileIndex = nextResults.length + 1
        setProgressLabel(
          upload.files.length > 1
            ? `Compressing ${file.name} (${fileIndex} of ${upload.files.length})...`
            : 'Compressing pages...'
        )
        const blob = await compressPdf(file, {
          quality: quality / 100,
          onProgress: (current, total) =>
            setProgressLabel(
              upload.files.length > 1
                ? `${file.name}: page ${current} of ${total} (file ${fileIndex} of ${upload.files.length})`
                : `Compressing page ${current} of ${total}...`
            ),
        })
        nextResults.push({
          id: `${file.name}-${file.size}-${file.lastModified}`,
          file,
          filename: buildOutputFilename(file.name, 'pdf', '-compressed'),
          blob,
        })
      } catch (error) {
        upload.setError(`${file.name}: ${error.message || 'Could not process this PDF.'}`)
      }
    }

    setResults(nextResults)
    setStatus('done')

    if (nextResults.length > 0) {
      const action = `PDF${nextResults.length > 1 ? 's' : ''} compressed`
      api.logConversion({ toolSlug, toolName, category, action }).catch(() => {})
    }
  }

  function handleDownloadOne(result) {
    downloadBlob(result.blob, result.filename)
  }

  async function handleDownloadAll() {
    setIsZipping(true)
    try {
      const zipBlob = await createZip(results.map((r) => ({ filename: r.filename, blob: r.blob })))
      downloadBlob(zipBlob, 'toolhub-compressed-pdfs.zip')
    } catch {
      upload.setError('Could not create a ZIP file. Try downloading PDFs individually instead.')
    } finally {
      setIsZipping(false)
    }
  }

  function handleReset() {
    setResults([])
    setStatus('idle')
    upload.reset()
  }

  return (
    <div className="space-y-5">
      {/* Honest, upfront disclosure — this rasterizes each page, so text
          stops being selectable/searchable in the output. Stated
          plainly rather than discovered as a surprise after the fact. */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300">
        This compresses each page as an image to genuinely shrink the file size — best for
        scanned or image-heavy PDFs. Text in the output won&apos;t be selectable or searchable
        afterward, since each page becomes a single compressed image. Add up to {MAX_BATCH_FILES}{' '}
        PDFs to compress them all in one go.
      </div>

      {upload.error && <ErrorMessage message={upload.error} onDismiss={() => upload.setError(null)} />}

      {upload.files.length === 0 ? (
        <DropZone
          dropZoneProps={upload.dropZoneProps}
          inputProps={upload.inputProps}
          acceptedTypes={ACCEPTED_TYPES}
          maxSizeMB={50}
          isDragActive={upload.isDragActive}
          label="Drag & drop PDFs here"
          uploadLabel="Upload PDFs"
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
                Add another PDF
                <input type="file" accept={ACCEPTED_TYPES.join(',')} multiple className="sr-only" {...upload.inputProps} />
              </label>
            )}

            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 dark:text-slate-500">Compression Level</span>
                <span className="text-sm font-semibold text-brand-600 dark:text-brand-400">{quality}%</span>
              </div>
              <input
                type="range"
                min="30"
                max="90"
                step="5"
                value={quality}
                onChange={(event) => setQuality(Number(event.target.value))}
                aria-label="Compression level"
                className="mt-1 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-brand-600 dark:bg-slate-700"
              />
              <p className="mt-1.5 text-xs text-slate-400 dark:text-slate-500">
                Lower quality means a smaller file. 65% is a good starting point for most PDFs.
              </p>

              <button type="button" onClick={handleCompress} className="btn-primary mt-4 w-full sm:w-auto">
                Compress {upload.files.length > 1 ? `${upload.files.length} PDFs` : 'PDF'}
              </button>
            </div>
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

          <ul className="space-y-2">
            {results.map((result) => {
              const percentSmaller =
                result.file.size > 0 ? Math.round(((result.file.size - result.blob.size) / result.file.size) * 100) : 0
              return (
                <li
                  key={result.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-900 dark:text-white">{result.filename}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      {formatBytes(result.file.size)} &rarr; {formatBytes(result.blob.size)}
                      {percentSmaller > 0 && ` \u00b7 ${percentSmaller}% smaller`}
                    </p>
                  </div>
                  <button type="button" onClick={() => handleDownloadOne(result)} className="btn-secondary flex-shrink-0 text-xs">
                    <HiOutlineArrowDownTray className="h-3.5 w-3.5" />
                    Download
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
