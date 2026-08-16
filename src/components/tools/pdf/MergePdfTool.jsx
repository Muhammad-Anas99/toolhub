import React from 'react'
import { HiOutlineArrowUp, HiOutlineArrowDown, HiOutlineTrash } from 'react-icons/hi2'
import DropZone from '../DropZone.jsx'
import ErrorMessage from '../ErrorMessage.jsx'
import ProgressBar from '../ProgressBar.jsx'
import DownloadPanel from '../DownloadPanel.jsx'
import { usePdfUpload } from '../../../hooks/usePdfUpload.js'
import { useToolResult } from '../../../hooks/useToolResult.js'
import { mergePdfs } from '../../../lib/pdfUtils.js'
import { formatBytes } from '../../../lib/formatBytes.js'

const ACCEPTED_TYPES = ['application/pdf']

export default function MergePdfTool({ toolSlug, toolName, category }) {
  const upload = usePdfUpload({ maxSizeMB: 25, multiple: true })
  const { status, result, run, clearResult, download } = useToolResult({
    toolSlug,
    toolName,
    category,
    action: 'PDFs merged',
  })

  function handleMerge() {
    if (upload.files.length < 2) {
      upload.setError('Add at least two PDFs to merge.')
      return
    }
    run(
      () => mergePdfs(upload.files).then((blob) => ({ blob })),
      (error) => upload.setError(error.message || 'Something went wrong while merging these PDFs.')
    )
  }

  function handleDownload() {
    if (!result) return
    download(result.blob, 'merged.pdf')
  }

  function handleReset() {
    clearResult()
    upload.reset()
  }

  return (
    <div className="space-y-5">
      {upload.error && <ErrorMessage message={upload.error} onDismiss={() => upload.setError(null)} />}

      {upload.files.length === 0 ? (
        <DropZone
          dropZoneProps={upload.dropZoneProps}
          inputProps={upload.inputProps}
          acceptedTypes={ACCEPTED_TYPES}
          maxSizeMB={25}
          isDragActive={upload.isDragActive}
          label="Drag & drop two or more PDFs here"
          uploadLabel="Upload PDFs"
        />
      ) : (
        <>
          <div className="card divide-y divide-slate-100 dark:divide-slate-800">
            {upload.files.map((file, index) => (
              <div key={`${file.name}-${index}`} className="flex items-center gap-3 px-4 py-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-semibold text-brand-600 dark:bg-brand-950 dark:text-brand-400">
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-900 dark:text-white">{file.name}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">{formatBytes(file.size)}</p>
                </div>
                <div className="flex flex-shrink-0 items-center gap-1">
                  <button
                    type="button"
                    onClick={() => upload.reorderFiles(index, index - 1)}
                    disabled={index === 0}
                    aria-label={`Move ${file.name} up`}
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:opacity-30 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                  >
                    <HiOutlineArrowUp className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => upload.reorderFiles(index, index + 1)}
                    disabled={index === upload.files.length - 1}
                    aria-label={`Move ${file.name} down`}
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:opacity-30 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                  >
                    <HiOutlineArrowDown className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => upload.removeFile(index)}
                    aria-label={`Remove ${file.name}`}
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-rose-600 dark:hover:bg-slate-800 dark:hover:text-rose-400"
                  >
                    <HiOutlineTrash className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {!result && status !== 'processing' && (
            <div className="flex flex-wrap gap-3">
              <label className="btn-secondary cursor-pointer text-sm">
                Add more PDFs
                <input type="file" accept="application/pdf" multiple className="sr-only" {...upload.inputProps} />
              </label>
              <button
                type="button"
                onClick={handleMerge}
                disabled={upload.files.length < 2}
                className="btn-primary text-sm"
              >
                Merge {upload.files.length} PDFs
              </button>
            </div>
          )}
        </>
      )}

      {status === 'processing' && <ProgressBar label="Merging your PDFs..." />}

      {result && (
        <DownloadPanel outputSize={result.blob.size} onDownload={handleDownload} onReset={handleReset} />
      )}
    </div>
  )
}
