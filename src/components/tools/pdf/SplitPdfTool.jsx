import React, { useEffect, useState } from 'react'
import DropZone from '../DropZone.jsx'
import ErrorMessage from '../ErrorMessage.jsx'
import FileInfoCard from '../FileInfoCard.jsx'
import ProgressBar from '../ProgressBar.jsx'
import DownloadPanel from '../DownloadPanel.jsx'
import { usePdfUpload } from '../../../hooks/usePdfUpload.js'
import { useToolResult } from '../../../hooks/useToolResult.js'
import { getPdfPageCount, parsePageRanges, extractPdfPages } from '../../../lib/pdfUtils.js'
import { buildOutputFilename } from '../../../lib/downloadBlob.js'

const ACCEPTED_TYPES = ['application/pdf']

export default function SplitPdfTool({ toolSlug, toolName, category }) {
  const upload = usePdfUpload({ maxSizeMB: 25, multiple: false })
  const { status, result, run, clearResult, download } = useToolResult({ toolSlug, toolName, category })
  const [pageCount, setPageCount] = useState(null)
  const [rangeInput, setRangeInput] = useState('')
  const [rangeError, setRangeError] = useState(null)

  useEffect(() => {
    if (!upload.file) {
      setPageCount(null)
      return
    }
    let cancelled = false
    getPdfPageCount(upload.file)
      .then((count) => {
        if (!cancelled) setPageCount(count)
      })
      .catch(() => {
        if (!cancelled) upload.setError('This file couldn\u2019t be read as a PDF.')
      })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upload.file])

  function handleExtract() {
    setRangeError(null)
    const indices = parsePageRanges(rangeInput, pageCount)
    if (!indices) {
      setRangeError('Enter page numbers or ranges, e.g. "1-3, 5, 8-10".')
      return
    }
    run(
      () => extractPdfPages(upload.file, indices).then((blob) => ({ blob })),
      (error) => upload.setError(error.message || 'Something went wrong while splitting this PDF.')
    )
  }

  function handleDownload() {
    if (!result) return
    download(result.blob, buildOutputFilename(upload.file.name, 'pdf', '-split'))
  }

  function handleReset() {
    clearResult()
    upload.reset()
    setRangeInput('')
    setRangeError(null)
  }

  return (
    <div className="space-y-5">
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
            <div className="card space-y-3 p-5">
              <label htmlFor="page-ranges" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Pages to extract{pageCount ? ` (this PDF has ${pageCount} page${pageCount === 1 ? '' : 's'})` : ''}
              </label>
              <input
                id="page-ranges"
                type="text"
                value={rangeInput}
                onChange={(event) => setRangeInput(event.target.value)}
                placeholder="e.g. 1-3, 5, 8-10"
                className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
              {rangeError && <p className="text-sm text-rose-500">{rangeError}</p>}
              <button
                type="button"
                onClick={handleExtract}
                disabled={!pageCount}
                className="btn-primary w-full sm:w-auto"
              >
                Extract Pages
              </button>
            </div>
          )}
        </>
      )}

      {status === 'processing' && <ProgressBar label="Splitting your PDF..." />}

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
