import React from 'react'
import PropTypes from 'prop-types'
import ToolWorkspace from '../ToolWorkspace.jsx'
import PreviewPanel from '../PreviewPanel.jsx'
import ProgressBar from '../ProgressBar.jsx'
import DownloadPanel from '../DownloadPanel.jsx'
import { useImageUpload } from '../../../hooks/useImageUpload.js'
import { useToolResult } from '../../../hooks/useToolResult.js'
import { convertImageFormat } from '../../../lib/imageProcessing.js'
import { downloadBlob, buildOutputFilename } from '../../../lib/downloadBlob.js'

/**
 * Generic image format converter. Configured per-tool via props so it can
 * power JPG->PNG, PNG->JPG, WEBP->PNG, WEBP->JPG and "Convert to WEBP"
 * without duplicating any upload/convert/download logic.
 */
export default function ImageConverterTool({ acceptedTypes, outputMimeType, outputExtension, maxSizeMB = 25 }) {
  const upload = useImageUpload({ acceptedTypes, maxSizeMB })
  const { status, result, run, clearResult } = useToolResult()

  function handleConvert() {
    run(
      () => convertImageFormat(upload.file, { mimeType: outputMimeType, quality: 0.92 }),
      (error) => upload.setError(error.message || 'Something went wrong while converting this image.')
    )
  }

  function handleDownload() {
    if (!result) return
    downloadBlob(result.blob, buildOutputFilename(upload.file.name, outputExtension))
  }

  function handleReset() {
    clearResult()
    upload.reset()
  }

  return (
    <ToolWorkspace
      upload={upload}
      acceptedTypes={acceptedTypes}
      maxSizeMB={maxSizeMB}
      onRemove={handleReset}
    >
      {status !== 'done' && <PreviewPanel before={upload.previewUrl} />}

      {status === 'processing' && <ProgressBar label="Converting..." />}

      {status === 'done' && result ? (
        <>
          <PreviewPanel before={upload.previewUrl} after={result.url} afterLabel="Converted" />
          <DownloadPanel
            originalSize={upload.file.size}
            outputSize={result.blob.size}
            onDownload={handleDownload}
            onReset={handleReset}
          />
        </>
      ) : (
        status !== 'processing' && (
          <button type="button" onClick={handleConvert} className="btn-primary w-full sm:w-auto">
            Convert Image
          </button>
        )
      )}
    </ToolWorkspace>
  )
}

ImageConverterTool.propTypes = {
  acceptedTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  outputMimeType: PropTypes.string.isRequired,
  outputExtension: PropTypes.string.isRequired,
  maxSizeMB: PropTypes.number,
}
