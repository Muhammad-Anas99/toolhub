import React, { useState } from 'react'
import ToolWorkspace from '../ToolWorkspace.jsx'
import PreviewPanel from '../PreviewPanel.jsx'
import ProgressBar from '../ProgressBar.jsx'
import DownloadPanel from '../DownloadPanel.jsx'
import { useImageUpload } from '../../../hooks/useImageUpload.js'
import { useToolResult } from '../../../hooks/useToolResult.js'
import { convertImageFormat } from '../../../lib/imageProcessing.js'
import { buildOutputFilename } from '../../../lib/downloadBlob.js'

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

const OUTPUT_FORMATS = [
  { mimeType: 'image/jpeg', extension: 'jpg', label: 'JPG' },
  { mimeType: 'image/png', extension: 'png', label: 'PNG' },
  { mimeType: 'image/webp', extension: 'webp', label: 'WEBP' },
]

/**
 * Unlike the fixed-direction converters (JPG→PNG, PNG→JPG, etc.), this
 * accepts any supported input and lets the user pick ANY output format —
 * the same underlying convertImageFormat() used everywhere else, just
 * with the target format selectable instead of hardcoded per-route.
 */
export default function ImageConverterTool({ toolSlug, toolName, category }) {
  const upload = useImageUpload({ acceptedTypes: ACCEPTED_TYPES, maxSizeMB: 25 })
  const { status, result, run, clearResult, download } = useToolResult({ toolSlug, toolName, category })
  const [outputFormat, setOutputFormat] = useState(OUTPUT_FORMATS[1]) // PNG default

  function handleConvert() {
    run(
      () => convertImageFormat(upload.file, { mimeType: outputFormat.mimeType, quality: 0.92 }),
      (error) => upload.setError(error.message || 'Something went wrong while converting this image.')
    )
  }

  function handleDownload() {
    if (!result) return
    download(result.blob, buildOutputFilename(upload.file.name, outputFormat.extension))
  }

  function handleReset() {
    clearResult()
    upload.reset()
  }

  return (
    <ToolWorkspace upload={upload} acceptedTypes={ACCEPTED_TYPES} maxSizeMB={25} onRemove={handleReset}>
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
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex gap-2">
              {OUTPUT_FORMATS.map((format) => (
                <button
                  key={format.mimeType}
                  type="button"
                  onClick={() => setOutputFormat(format)}
                  disabled={upload.file?.type === format.mimeType}
                  aria-pressed={outputFormat.mimeType === format.mimeType}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                    outputFormat.mimeType === format.mimeType
                      ? 'bg-brand-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {format.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={handleConvert}
              disabled={upload.file?.type === outputFormat.mimeType}
              className="btn-primary"
            >
              Convert to {outputFormat.label}
            </button>
          </div>
        )
      )}
    </ToolWorkspace>
  )
}
