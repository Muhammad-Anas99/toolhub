import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  HiOutlineArrowUturnLeft,
  HiOutlineArrowUturnRight,
  HiArrowsRightLeft,
  HiArrowsUpDown,
} from 'react-icons/hi2'
import ToolWorkspace from '../ToolWorkspace.jsx'
import PreviewPanel from '../PreviewPanel.jsx'
import ProgressBar from '../ProgressBar.jsx'
import DownloadPanel from '../DownloadPanel.jsx'
import { useImageUpload } from '../../../hooks/useImageUpload.js'
import { useToolResult } from '../../../hooks/useToolResult.js'
import { rotateFlipImage } from '../../../lib/imageProcessing.js'
import { downloadBlob, buildOutputFilename } from '../../../lib/downloadBlob.js'

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

/**
 * Shared core for rotate/flip. `mode="rotate"` surfaces rotate-left/right
 * and 90/180/270 shortcuts; `mode="flip"` surfaces horizontal/vertical
 * flip. Both share the same canvas transform logic underneath.
 */
export default function RotateFlipTool({ mode, toolSlug, toolName, category }) {
  const upload = useImageUpload({ acceptedTypes: ACCEPTED_TYPES, maxSizeMB: 25 })
  const { status, result, run, clearResult } = useToolResult({ toolSlug, toolName, category })
  const [degrees, setDegrees] = useState(0)
  const [flipHorizontal, setFlipHorizontal] = useState(false)
  const [flipVertical, setFlipVertical] = useState(false)

  function normalizeDegrees(value) {
    return ((value % 360) + 360) % 360
  }

  function applyTransform(nextDegrees, nextFlipH, nextFlipV) {
    run(
      () =>
        rotateFlipImage(upload.file, {
          degrees: nextDegrees,
          flipHorizontal: nextFlipH,
          flipVertical: nextFlipV,
        }),
      (error) => upload.setError(error.message || 'Something went wrong while transforming this image.')
    )
  }

  function handleRotateLeft() {
    const next = normalizeDegrees(degrees - 90)
    setDegrees(next)
    applyTransform(next, flipHorizontal, flipVertical)
  }

  function handleRotateRight() {
    const next = normalizeDegrees(degrees + 90)
    setDegrees(next)
    applyTransform(next, flipHorizontal, flipVertical)
  }

  function handleSetDegrees(value) {
    setDegrees(value)
    applyTransform(value, flipHorizontal, flipVertical)
  }

  function handleFlipHorizontal() {
    const next = !flipHorizontal
    setFlipHorizontal(next)
    applyTransform(degrees, next, flipVertical)
  }

  function handleFlipVertical() {
    const next = !flipVertical
    setFlipVertical(next)
    applyTransform(degrees, flipHorizontal, next)
  }

  function handleDownload() {
    if (!result) return
    const extension = upload.file.name.split('.').pop()
    downloadBlob(
      result.blob,
      buildOutputFilename(upload.file.name, extension, mode === 'flip' ? '-flipped' : '-rotated')
    )
  }

  function handleReset() {
    clearResult()
    setDegrees(0)
    setFlipHorizontal(false)
    setFlipVertical(false)
    upload.reset()
  }

  const activePreview = result?.url || upload.previewUrl

  return (
    <ToolWorkspace upload={upload} acceptedTypes={ACCEPTED_TYPES} maxSizeMB={25} onRemove={handleReset}>
      <div className="card flex flex-wrap items-center justify-center gap-3 p-5">
        {mode === 'rotate' ? (
          <>
            <button type="button" onClick={handleRotateLeft} className="btn-secondary">
              <HiOutlineArrowUturnLeft className="h-4 w-4" />
              Rotate Left 90&deg;
            </button>
            <button type="button" onClick={handleRotateRight} className="btn-secondary">
              <HiOutlineArrowUturnRight className="h-4 w-4" />
              Rotate Right 90&deg;
            </button>
            <div className="flex gap-2">
              {[90, 180, 270].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleSetDegrees(value)}
                  aria-pressed={degrees === value}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    degrees === value
                      ? 'bg-brand-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                  }`}
                >
                  {value}&deg;
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={handleFlipHorizontal}
              aria-pressed={flipHorizontal}
              className={flipHorizontal ? 'btn-primary' : 'btn-secondary'}
            >
              <HiArrowsRightLeft className="h-4 w-4" />
              Flip Horizontal
            </button>
            <button
              type="button"
              onClick={handleFlipVertical}
              aria-pressed={flipVertical}
              className={flipVertical ? 'btn-primary' : 'btn-secondary'}
            >
              <HiArrowsUpDown className="h-4 w-4" />
              Flip Vertical
            </button>
          </>
        )}
      </div>

      {status === 'processing' && <ProgressBar label="Applying changes..." />}

      {status !== 'processing' && activePreview && <PreviewPanel before={activePreview} />}

      {result && status !== 'processing' && (
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

RotateFlipTool.propTypes = {
  mode: PropTypes.oneOf(['rotate', 'flip']).isRequired,
  toolSlug: PropTypes.string,
  toolName: PropTypes.string,
  category: PropTypes.string,
}
