import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { AnimatePresence } from 'framer-motion'
import DropZone from './DropZone.jsx'
import FileInfoCard from './FileInfoCard.jsx'
import PreviewPanel from './PreviewPanel.jsx'
import ProgressBar from './ProgressBar.jsx'
import DownloadPanel from './DownloadPanel.jsx'
import ErrorMessage from './ErrorMessage.jsx'
import { useImageUpload } from '../../hooks/useImageUpload.js'
import { convertImageFormat } from '../../lib/imageProcessing.js'
import { downloadBlob, buildOutputFilename } from '../../lib/downloadBlob.js'

/**
 * Generic image format converter. Configured per-tool via props so it can
 * power JPG->PNG, PNG->JPG, WEBP->PNG, WEBP->JPG and "Convert to WEBP"
 * without duplicating any upload/convert/download logic.
 */
export default function ImageConverterTool({ acceptedTypes, outputMimeType, outputExtension, maxSizeMB = 25 }) {
  const upload = useImageUpload({ acceptedTypes, maxSizeMB })
  const [status, setStatus] = useState('idle') // idle | processing | done
  const [result, setResult] = useState(null) // { blob, url, width, height }

  async function handleConvert() {
    if (!upload.file) return
    setStatus('processing')
    upload.setError(null)

    try {
      const { blob, width, height } = await convertImageFormat(upload.file, {
        mimeType: outputMimeType,
        quality: 0.92,
      })
      const url = URL.createObjectURL(blob)
      setResult({ blob, url, width, height })
      setStatus('done')
    } catch (error) {
      upload.setError(error.message || 'Something went wrong while converting this image.')
      setStatus('idle')
    }
  }

  function handleDownload() {
    if (!result) return
    downloadBlob(result.blob, buildOutputFilename(upload.file.name, outputExtension))
  }

  function handleReset() {
    if (result?.url) URL.revokeObjectURL(result.url)
    setResult(null)
    setStatus('idle')
    upload.reset()
  }

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {upload.error && (
          <ErrorMessage message={upload.error} onDismiss={() => upload.setError(null)} />
        )}
      </AnimatePresence>

      {!upload.file ? (
        <DropZone
          dropZoneProps={upload.dropZoneProps}
          inputProps={upload.inputProps}
          acceptedTypes={acceptedTypes}
          maxSizeMB={maxSizeMB}
          isDragActive={upload.isDragActive}
        />
      ) : (
        <div className="space-y-5">
          <FileInfoCard file={upload.file} dimensions={upload.dimensions} onRemove={handleReset} />

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
        </div>
      )}
    </div>
  )
}

ImageConverterTool.propTypes = {
  acceptedTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  outputMimeType: PropTypes.string.isRequired,
  outputExtension: PropTypes.string.isRequired,
  maxSizeMB: PropTypes.number,
}
