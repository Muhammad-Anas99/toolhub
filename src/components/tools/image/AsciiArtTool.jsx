import React, { useState } from 'react'
import PropTypes from 'prop-types'
import DropZone from '../DropZone.jsx'
import ErrorMessage from '../ErrorMessage.jsx'
import CopyButton from '../CopyButton.jsx'
import { useImageUpload } from '../../../hooks/useImageUpload.js'
import { loadImage } from '../../../lib/imageProcessing.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/webp']
const ASCII_CHARS = ' .:-=+*#%@'

function imageToAscii(img, cols) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = img.naturalWidth
  canvas.height = img.naturalHeight
  ctx.drawImage(img, 0, 0)

  const cellW = canvas.width / cols
  const cellH = cellW * 2
  const rows = Math.max(1, Math.floor(canvas.height / cellH))
  let result = ''
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const px = Math.min(canvas.width - 1, Math.floor(c * cellW))
      const py = Math.min(canvas.height - 1, Math.floor(r * cellH))
      const pixel = ctx.getImageData(px, py, 1, 1).data
      const brightness = (pixel[0] + pixel[1] + pixel[2]) / 3 / 255
      const charIndex = Math.floor((1 - brightness) * (ASCII_CHARS.length - 1))
      result += ASCII_CHARS[charIndex]
    }
    result += '\n'
  }
  return result
}

export default function AsciiArtTool({ toolSlug, toolName, category }) {
  const upload = useImageUpload({ acceptedTypes: ACCEPTED_TYPES, maxSizeMB: 10 })
  const [cols, setCols] = useState(80)
  const [ascii, setAscii] = useState('')
  const { logNow } = useHistoryLogger({ toolSlug, toolName, category })

  async function generate() {
    if (!upload.file) return
    const { img, url } = await loadImage(upload.file)
    const result = imageToAscii(img, cols)
    setAscii(result)
    URL.revokeObjectURL(url)
    logNow('ASCII art generated')
  }

  return (
    <div className="space-y-5">
      {upload.error && <ErrorMessage message={upload.error} onDismiss={() => upload.setError(null)} />}

      {!upload.file ? (
        <DropZone
          dropZoneProps={upload.dropZoneProps}
          inputProps={upload.inputProps}
          acceptedTypes={ACCEPTED_TYPES}
          maxSizeMB={10}
          isDragActive={upload.isDragActive}
          label="Drag & drop an image here"
          uploadLabel="Upload Image"
        />
      ) : (
        <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-900/40">
          <img src={upload.previewUrl} alt="Uploaded preview" className="h-16 w-16 rounded-lg object-contain" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-slate-900 dark:text-white">{upload.file.name}</p>
          </div>
          <button type="button" onClick={() => { upload.reset(); setAscii('') }} className="btn-secondary text-xs">
            Reset
          </button>
        </div>
      )}

      {upload.file && (
        <div className="flex flex-wrap items-center gap-3">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Width (characters)</label>
          <input type="range" min="30" max="150" value={cols} onChange={(e) => setCols(Number(e.target.value))} className="w-40" />
          <span className="text-sm text-slate-500 dark:text-slate-400">{cols}</span>
          <button type="button" onClick={generate} className="btn-primary text-sm">
            Generate
          </button>
        </div>
      )}

      {ascii && (
        <div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">ASCII Art</label>
            <CopyButton value={ascii} />
          </div>
          <pre className="mt-1.5 overflow-x-auto rounded-lg bg-slate-950 p-4 font-mono text-[6px] leading-[6px] text-slate-200 sm:text-[8px] sm:leading-[8px]">{ascii}</pre>
        </div>
      )}
    </div>
  )
}

AsciiArtTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
