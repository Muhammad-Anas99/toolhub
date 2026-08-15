import React from 'react'
import ToolWorkspace from '../ToolWorkspace.jsx'
import PreviewPanel from '../PreviewPanel.jsx'
import ProgressBar from '../ProgressBar.jsx'
import DownloadPanel from '../DownloadPanel.jsx'
import { useImageUpload } from '../../../hooks/useImageUpload.js'
import { useToolResult } from '../../../hooks/useToolResult.js'
import { imageToPdf } from '../../../lib/pdfUtils.js'
import { buildOutputFilename } from '../../../lib/downloadBlob.js'

/**
 * Powers both JPG→PDF and PNG→PDF — the actual operation (embed one
 * image into a new single-page PDF via pdf-lib) is identical either way;
 * only the accepted input type differs, same pattern used for image
 * format conversion (UnifiedImageTool.jsx).
 */
export default function ImageToPdfTool({ acceptedTypes, toolSlug, toolName, category }) {
  const upload = useImageUpload({ acceptedTypes, maxSizeMB: 25 })
  const { status, result, run, clearResult, download } = useToolResult({ toolSlug, toolName, category })

  function handleConvert() {
    run(
      () => imageToPdf(upload.file).then((blob) => ({ blob })),
      (error) => upload.setError(error.message || 'Something went wrong while creating the PDF.')
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
    <ToolWorkspace upload={upload} acceptedTypes={acceptedTypes} maxSizeMB={25} onRemove={handleReset}>
      {!result && status !== 'processing' && (
        <>
          <PreviewPanel before={upload.previewUrl} />
          <button type="button" onClick={handleConvert} className="btn-primary w-full sm:w-auto">
            Convert to PDF
          </button>
        </>
      )}

      {status === 'processing' && <ProgressBar label="Creating your PDF..." />}

      {result && (
        <DownloadPanel
          originalSize={upload.file.size}
          outputSize={result.blob.size}
          onDownload={handleDownload}
          onReset={handleReset}
        />
      )}
    </ToolWorkspace>
  )
}
