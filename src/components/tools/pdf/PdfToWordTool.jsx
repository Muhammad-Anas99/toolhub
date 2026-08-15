import React from 'react'
import DropZone from '../DropZone.jsx'
import ErrorMessage from '../ErrorMessage.jsx'
import FileInfoCard from '../FileInfoCard.jsx'
import ProgressBar from '../ProgressBar.jsx'
import DownloadPanel from '../DownloadPanel.jsx'
import { usePdfUpload } from '../../../hooks/usePdfUpload.js'
import { useToolResult } from '../../../hooks/useToolResult.js'
import { pdfToWord } from '../../../lib/pdfToWordUtils.js'
import { buildOutputFilename } from '../../../lib/downloadBlob.js'

const ACCEPTED_TYPES = ['application/pdf']

export default function PdfToWordTool({ toolSlug, toolName, category }) {
  const upload = usePdfUpload({ maxSizeMB: 25, multiple: false })
  const { status, result, run, clearResult, download } = useToolResult({ toolSlug, toolName, category })

  function handleConvert() {
    run(
      () => pdfToWord(upload.file).then((blob) => ({ blob })),
      (error) =>
        upload.setError(
          error.message || 'Something went wrong while converting this PDF.'
        )
    )
  }

  function handleDownload() {
    if (!result) return
    download(result.blob, buildOutputFilename(upload.file.name, 'docx'))
  }

  function handleReset() {
    clearResult()
    upload.reset()
  }

  return (
    <div className="space-y-5">
      {/* Set expectations honestly up front, not just in the FAQ — this
          extracts real text, it doesn't clone the PDF's exact layout. */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300">
        This extracts the actual text from your PDF into an editable Word document. Original
        formatting, images, tables and exact layout aren&apos;t preserved — it works best for
        text-heavy PDFs, and won&apos;t find any text in a scanned/image-only PDF.
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
              Convert to Word
            </button>
          )}
        </>
      )}

      {status === 'processing' && <ProgressBar label="Extracting text..." />}

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
