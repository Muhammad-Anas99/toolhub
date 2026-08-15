import React, { useEffect, useState } from 'react'
import DropZone from '../DropZone.jsx'
import ErrorMessage from '../ErrorMessage.jsx'
import FileInfoCard from '../FileInfoCard.jsx'
import ProgressBar from '../ProgressBar.jsx'
import PreviewPanel from '../PreviewPanel.jsx'
import DownloadPanel from '../DownloadPanel.jsx'
import { usePdfUpload } from '../../../hooks/usePdfUpload.js'
import { useToolResult } from '../../../hooks/useToolResult.js'
import { getPdfDocumentPageCount, pdfPageToImage } from '../../../lib/pdfRenderUtils.js'
import { buildOutputFilename } from '../../../lib/downloadBlob.js'

const ACCEPTED_TYPES = ['application/pdf']

/**
 * Powers both PDF→JPG and PDF→PNG — the actual rendering (pdf.js draws
 * the page to a real canvas, then exports it as the requested format) is
 * identical either way; only the output mime type differs. See
 * src/lib/pdfRenderUtils.js for the rendering itself.
 */
export default function PdfToImageTool({ outputMimeType, outputExtension, toolSlug, toolName, category }) {
  const upload = usePdfUpload({ maxSizeMB: 25, multiple: false })
  const { status, result, run, clearResult, download } = useToolResult({ toolSlug, toolName, category })
  const [pageCount, setPageCount] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)

  useEffect(() => {
    if (!upload.file) {
      setPageCount(null)
      setPageNumber(1)
      return
    }
    let cancelled = false
    getPdfDocumentPageCount(upload.file)
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

  function handleConvert() {
    run(
      () => pdfPageToImage(upload.file, { pageNumber, mimeType: outputMimeType }).then((blob) => ({ blob })),
      (error) => upload.setError(error.message || 'Something went wrong while converting this page.')
    )
  }

  function handleDownload() {
    if (!result) return
    download(result.blob, buildOutputFilename(upload.file.name, outputExtension, `-page${pageNumber}`))
  }

  function handleReset() {
    clearResult()
    upload.reset()
    setPageNumber(1)
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
            <div className="card space-y-4 p-5">
              {pageCount > 1 && (
                <div>
                  <label htmlFor="pdf-page-number" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Which page? (this PDF has {pageCount} pages)
                  </label>
                  <input
                    id="pdf-page-number"
                    type="number"
                    min={1}
                    max={pageCount}
                    value={pageNumber}
                    onChange={(event) =>
                      setPageNumber(Math.min(pageCount, Math.max(1, Number(event.target.value) || 1)))
                    }
                    className="mt-1.5 w-24 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                  <p className="mt-1.5 text-xs text-slate-400 dark:text-slate-500">
                    Converts one page at a time — change the page number and convert again for others.
                  </p>
                </div>
              )}
              <button type="button" onClick={handleConvert} disabled={!pageCount} className="btn-primary w-full sm:w-auto">
                Convert Page {pageCount > 1 ? pageNumber : ''} to {outputExtension.toUpperCase()}
              </button>
            </div>
          )}
        </>
      )}

      {status === 'processing' && <ProgressBar label="Rendering your page..." />}

      {result && (
        <>
          <PreviewPanel after={result.url} afterLabel={`Page ${pageNumber}`} />
          <DownloadPanel outputSize={result.blob.size} onDownload={handleDownload} onReset={handleReset} />
        </>
      )}
    </div>
  )
}
