import React, { useState } from 'react'
import DropZone from '../DropZone.jsx'
import ErrorMessage from '../ErrorMessage.jsx'
import FileInfoCard from '../FileInfoCard.jsx'
import ProgressBar from '../ProgressBar.jsx'
import DownloadPanel from '../DownloadPanel.jsx'
import { usePdfUpload } from '../../../hooks/usePdfUpload.js'
import { useToolResult } from '../../../hooks/useToolResult.js'
import { compressPdf } from '../../../lib/pdfCompressUtils.js'
import { buildOutputFilename } from '../../../lib/downloadBlob.js'

const ACCEPTED_TYPES = ['application/pdf']

export default function CompressPdfTool({ toolSlug, toolName, category }) {
  const upload = usePdfUpload({ maxSizeMB: 25, multiple: false })
  const [quality, setQuality] = useState(65)
  const [progressLabel, setProgressLabel] = useState('Compressing...')
  const { status, result, run, clearResult, download } = useToolResult({
    toolSlug,
    toolName,
    category,
    action: 'PDF compressed',
  })

  function handleCompress() {
    setProgressLabel('Compressing pages...')
    run(
      () =>
        compressPdf(upload.file, {
          quality: quality / 100,
          onProgress: (current, total) => setProgressLabel(`Compressing page ${current} of ${total}...`),
        }).then((blob) => ({ blob })),
      (error) => upload.setError(error.message || 'Something went wrong while compressing this PDF.')
    )
  }

  function handleDownload() {
    if (!result) return
    download(result.blob, buildOutputFilename(upload.file.name, 'pdf', '-compressed'))
  }

  function handleReset() {
    clearResult()
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
        afterward, since each page becomes a single compressed image.
      </div>

      {upload.error && <ErrorMessage message={upload.error} onDismiss={() => upload.setError(null)} />}

      {!upload.file ? (
        <DropZone
          dropZoneProps={upload.dropZoneProps}
          inputProps={upload.inputProps}
          acceptedTypes={ACCEPTED_TYPES}
          maxSizeMB={25}
          isDragActive={upload.isDragActive}
          label="Drag & drop a PDF here"
          uploadLabel="Upload PDF"
        />
      ) : (
        <>
          <FileInfoCard file={upload.file} onRemove={handleReset} />

          {!result && status !== 'processing' && (
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
                className="mt-1 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-brand-600 dark:bg-slate-700"
              />
              <p className="mt-1.5 text-xs text-slate-400 dark:text-slate-500">
                Lower quality means a smaller file. 65% is a good starting point for most PDFs.
              </p>

              <button type="button" onClick={handleCompress} className="btn-primary mt-4 w-full sm:w-auto">
                Compress PDF
              </button>
            </div>
          )}
        </>
      )}

      {status === 'processing' && <ProgressBar label={progressLabel} />}

      {result && (
        <DownloadPanel
          originalSize={upload.file.size}
          outputSize={result.blob.size}
          onDownload={handleDownload}
          onReset={handleReset}
        />
      )}
    </div>
  )
}
