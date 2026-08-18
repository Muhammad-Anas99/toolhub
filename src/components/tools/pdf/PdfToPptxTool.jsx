import React, { useState } from 'react'
import DropZone from '../DropZone.jsx'
import ErrorMessage from '../ErrorMessage.jsx'
import FileInfoCard from '../FileInfoCard.jsx'
import ProgressBar from '../ProgressBar.jsx'
import DownloadPanel from '../DownloadPanel.jsx'
import { usePdfUpload } from '../../../hooks/usePdfUpload.js'
import { useToolResult } from '../../../hooks/useToolResult.js'
import { pdfToPptx } from '../../../lib/pdfToPptxUtils.js'
import { buildOutputFilename } from '../../../lib/downloadBlob.js'

const ACCEPTED_TYPES = ['application/pdf']

export default function PdfToPptxTool({ toolSlug, toolName, category }) {
  const upload = usePdfUpload({ maxSizeMB: 25, multiple: false })
  const [progressLabel, setProgressLabel] = useState('Converting pages...')
  const { status, result, run, clearResult, download } = useToolResult({
    toolSlug,
    toolName,
    category,
    action: 'PDF converted to PowerPoint',
  })

  function handleConvert() {
    setProgressLabel('Converting pages...')
    run(
      () =>
        pdfToPptx(upload.file, {
          onProgress: (current, total) => setProgressLabel(`Converting page ${current} of ${total}...`),
        }).then((blob) => ({ blob })),
      (error) =>
        upload.setError(error.message || 'Something went wrong while converting this PDF.')
    )
  }

  function handleDownload() {
    if (!result) return
    download(result.blob, buildOutputFilename(upload.file.name, 'pptx'))
  }

  function handleReset() {
    clearResult()
    upload.reset()
  }

  return (
    <div className="space-y-5">
      {/* Set expectations honestly up front, not just in the FAQ — each
          page becomes a full-slide image, not editable slide content. */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300">
        Each page of your PDF becomes a slide with that page as a full-size image — this
        preserves exactly how your PDF looks, but the slides aren&apos;t editable text or shapes.
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
            <button type="button" onClick={handleConvert} className="btn-primary w-full sm:w-auto">
              Convert to PowerPoint
            </button>
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
