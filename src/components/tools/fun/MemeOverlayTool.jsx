import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineArrowDownTray } from 'react-icons/hi2'
import DropZone from '../DropZone.jsx'
import ErrorMessage from '../ErrorMessage.jsx'
import { useImageUpload } from '../../../hooks/useImageUpload.js'
import { loadImage } from '../../../lib/imageProcessing.js'
import { downloadBlob } from '../../../lib/downloadBlob.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/webp']

function drawMemeText(ctx, text, x, y, fontSize) {
  ctx.font = `bold ${fontSize}px Impact, sans-serif`
  ctx.textAlign = 'center'
  ctx.fillStyle = 'white'
  ctx.strokeStyle = 'black'
  ctx.lineWidth = fontSize / 12
  ctx.lineJoin = 'round'
  ctx.strokeText(text.toUpperCase(), x, y)
  ctx.fillText(text.toUpperCase(), x, y)
}

export default function MemeOverlayTool({ toolSlug, toolName, category }) {
  const upload = useImageUpload({ acceptedTypes: ACCEPTED_TYPES, maxSizeMB: 10 })
  const [topText, setTopText] = useState('TOP TEXT')
  const [bottomText, setBottomText] = useState('BOTTOM TEXT')
  const canvasRef = useRef(null)
  const { logDebounced } = useHistoryLogger({ toolSlug, toolName, category })

  useEffect(() => {
    if (!upload.file || !canvasRef.current) return
    let cancelled = false
    loadImage(upload.file).then(({ img, url }) => {
      if (cancelled) return
      const canvas = canvasRef.current
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      const fontSize = Math.floor(canvas.width / 10)
      if (topText) drawMemeText(ctx, topText, canvas.width / 2, fontSize * 1.1, fontSize)
      if (bottomText) drawMemeText(ctx, bottomText, canvas.width / 2, canvas.height - fontSize * 0.4, fontSize)
      URL.revokeObjectURL(url)
    })
    return () => {
      cancelled = true
    }
  }, [upload.file, topText, bottomText])

  if (upload.file) logDebounced('Meme text overlay updated', topText + bottomText)

  function download() {
    canvasRef.current.toBlob((blob) => downloadBlob(blob, 'meme.png'))
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
        <>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Top text</label>
              <input type="text" value={topText} onChange={(e) => setTopText(e.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Bottom text</label>
              <input type="text" value={bottomText} onChange={(e) => setBottomText(e.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
            </div>
          </div>

          <canvas ref={canvasRef} className="mx-auto max-h-96 w-full rounded-xl object-contain" />

          <div className="flex gap-3">
            <button type="button" onClick={upload.reset} className="btn-secondary">
              Reset
            </button>
            <button type="button" onClick={download} className="btn-primary">
              <HiOutlineArrowDownTray className="h-4 w-4" />
              Download Meme
            </button>
          </div>
        </>
      )}
    </div>
  )
}

MemeOverlayTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
