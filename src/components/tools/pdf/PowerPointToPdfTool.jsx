import React from 'react'
import DropZone from '../DropZone.jsx'
import ErrorMessage from '../ErrorMessage.jsx'
import FileInfoCard from '../FileInfoCard.jsx'
import ProgressBar from '../ProgressBar.jsx'
import DownloadPanel from '../DownloadPanel.jsx'
import { useDocumentUpload } from '../../../hooks/useDocumentUpload.js'
import { useToolResult } from '../../../hooks/useToolResult.js'
import { pptxToPdf } from '../../../lib/pptxToPdfUtils.js'
import { buildOutputFilename } from '../../../lib/downloadBlob.js'

const ACCEPTED_TYPES = ['application/vnd.openxmlformats-officedocument.presentationml.presentation']
const ACCEPTED_EXTENSIONS = ['.pptx']

export default function PowerPointToPdfTool({ toolSlug, toolName, category }) {
  const upload = useDocumentUpload({ acceptedTypes: ACCEPTED_TYPES, acceptedExtensions: ACCEPTED_EXTENSIONS, maxSizeMB: 25 })
  const { status, result, run, clearResult, download } = useToolResult({
    toolSlug,
    toolName,
    category,
    action: 'PowerPoint converted to PDF',
  })

  function handleConvert() {
    run(
      () => pptxToPdf(upload.file).then((blob) => ({ blob })),
      (error) => upload.setError(error.message || 'Something went wrong while converting this presentation.')
    )
  }

  function handleDownload() {
    if (!result) return
    download(result.blob, buildOutputFilename(upload.file.name, 'pdf'))
  }

  function handleReset() {
    clearResult()
    upload.reset()
  }

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300">
        This extracts the real text and images from each slide onto its own PDF page. It doesn&apos;t
        reproduce your slide design exactly — colors, fonts, and shape positions aren&apos;t preserved,
        since no browser-based tool can fully render a PowerPoint file&apos;s visual layout.
      </div>

      {upload.error && <ErrorMessage message={upload.error} onDismiss={() => upload.setError(null)} />}

      {!upload.file ? (
        <DropZone
          dropZoneProps={upload.dropZoneProps}
          inputProps={upload.inputProps}
          acceptedTypes={ACCEPTED_TYPES}
          maxSizeMB={25}
          isDragActive={upload.isDragActive}
          label="Drag & drop a PowerPoint file here"
          uploadLabel="Upload Presentation"
        />
      ) : (
        <>
          <FileInfoCard file={upload.file} onRemove={handleReset} />

          {!result && status !== 'processing' && (
            <button type="button" onClick={handleConvert} className="btn-primary w-full sm:w-auto">
              Convert to PDF
            </button>
          )}
        </>
      )}

      {status === 'processing' && <ProgressBar label="Converting slides..." />}

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
