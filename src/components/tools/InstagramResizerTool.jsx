import React, { useState } from 'react'
import ToolWorkspace from './ToolWorkspace.jsx'
import PreviewPanel from './PreviewPanel.jsx'
import ProgressBar from './ProgressBar.jsx'
import DownloadPanel from './DownloadPanel.jsx'
import { useImageUpload } from '../../hooks/useImageUpload.js'
import { useToolResult } from '../../hooks/useToolResult.js'
import { resizeToFit } from '../../lib/imageProcessing.js'
import { buildOutputFilename } from '../../lib/downloadBlob.js'

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

const PRESETS = [
  { id: 'square', label: 'Square Post', width: 1080, height: 1080 },
  { id: 'portrait', label: 'Portrait Post', width: 1080, height: 1350 },
  { id: 'landscape', label: 'Landscape Post', width: 1080, height: 566 },
  { id: 'story', label: 'Story / Reel', width: 1080, height: 1920 },
  { id: 'profile', label: 'Profile Picture', width: 320, height: 320 },
]

export default function InstagramResizerTool({ toolSlug, toolName, category }) {
  const upload = useImageUpload({ acceptedTypes: ACCEPTED_TYPES, maxSizeMB: 25 })
  const { status, result, run, clearResult, download } = useToolResult({
    toolSlug,
    toolName,
    category,
    action: 'Image resized for Instagram',
  })
  const [presetId, setPresetId] = useState('square')
  const [mode, setMode] = useState('cover') // cover | contain

  const preset = PRESETS.find((p) => p.id === presetId)

  function handleResize() {
    run(
      () =>
        resizeToFit(upload.file, {
          targetWidth: preset.width,
          targetHeight: preset.height,
          mode,
          mimeType: upload.file.type === 'image/png' ? 'image/png' : 'image/jpeg',
        }),
      (error) => upload.setError(error.message || 'Something went wrong while resizing this image.')
    )
  }

  function handleDownload() {
    if (!result) return
    const extension = upload.file.type === 'image/png' ? 'png' : 'jpg'
    download(result.blob, buildOutputFilename(upload.file.name, extension, `-${preset.id}`))
  }

  function handleReset() {
    clearResult()
    upload.reset()
  }

  return (
    <ToolWorkspace upload={upload} acceptedTypes={ACCEPTED_TYPES} maxSizeMB={25} onRemove={handleReset}>
      {status !== 'done' && (
        <>
          <PreviewPanel before={upload.previewUrl} />

          <div className="w-full space-y-4">
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Format</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {PRESETS.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setPresetId(option.id)}
                    className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                      presetId === option.id
                        ? 'bg-brand-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {option.label} ({option.width}&times;{option.height})
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Fit</p>
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setMode('cover')}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    mode === 'cover'
                      ? 'bg-brand-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  Fill (crop to fit)
                </button>
                <button
                  type="button"
                  onClick={() => setMode('contain')}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    mode === 'contain'
                      ? 'bg-brand-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  Fit (add padding)
                </button>
              </div>
            </div>

            {status !== 'processing' && (
              <button type="button" onClick={handleResize} className="btn-primary w-full sm:w-auto">
                Resize for Instagram
              </button>
            )}
          </div>
        </>
      )}

      {status === 'processing' && <ProgressBar label="Resizing..." />}

      {status === 'done' && result && (
        <>
          <PreviewPanel before={upload.previewUrl} after={result.url} afterLabel={`${preset.width}\u00d7${preset.height}`} />
          <DownloadPanel
            originalSize={upload.file.size}
            outputSize={result.blob.size}
            onDownload={handleDownload}
            onReset={handleReset}
          />
        </>
      )}
    </ToolWorkspace>
  )
}
