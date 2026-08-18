import React from 'react'
import DropZone from '../DropZone.jsx'
import ErrorMessage from '../ErrorMessage.jsx'
import FileInfoCard from '../FileInfoCard.jsx'
import ProgressBar from '../ProgressBar.jsx'
import DownloadPanel from '../DownloadPanel.jsx'
import { useDocumentUpload } from '../../../hooks/useDocumentUpload.js'
import { useToolResult } from '../../../hooks/useToolResult.js'
import { wordToPdf } from '../../../lib/wordToPdfUtils.js'
import { buildOutputFilename } from '../../../lib/downloadBlob.js'

const ACCEPTED_TYPES = ['application/vnd.openxmlformats-officedocument.wordprocessingml.document']
const ACCEPTED_EXTENSIONS = ['.docx']

export default function WordToPdfTool({ toolSlug, toolName, category }) {
  const upload = useDocumentUpload({ acceptedTypes: ACCEPTED_TYPES, acceptedExtensions: ACCEPTED_EXTENSIONS, maxSizeMB: 15 })
  const { status, result, run, clearResult, download } = useToolResult({
    toolSlug,
    toolName,
    category,
    action: 'Word document converted to PDF',
  })

  function handleConvert() {
    run(
      () => wordToPdf(upload.file).then((blob) => ({ blob })),
      (error) => upload.setError(error.message || 'Something went wrong while converting this document.')
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
        This extracts your document&apos;s text and headings into a clean PDF. Tables, images,
        columns, and custom styles beyond headings/bold aren&apos;t preserved — it works best for
        text-focused documents. Only .docx files are supported, not older .doc files.
      </div>

      {upload.error && <ErrorMessage message={upload.error} onDismiss={() => upload.setError(null)} />}

      {!upload.file ? (
        <DropZone
          dropZoneProps={upload.dropZoneProps}
          inputProps={upload.inputProps}
          acceptedTypes={ACCEPTED_TYPES}
          maxSizeMB={15}
          isDragActive={upload.isDragActive}
          label="Drag & drop a Word document here"
          uploadLabel="Upload Document"
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

      {status === 'processing' && <ProgressBar label="Converting document..." />}

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
