import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineArrowDownTray, HiOutlineTrash } from 'react-icons/hi2'
import { downloadBlob } from '../../../lib/downloadBlob.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

export default function DigitalSignatureTool({ toolSlug, toolName, category }) {
  const canvasRef = useRef(null)
  const isDrawing = useRef(false)
  const [hasSignature, setHasSignature] = useState(false)
  const { logNow } = useHistoryLogger({ toolSlug, toolName, category })

  function getPos(event) {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const clientX = event.touches ? event.touches[0].clientX : event.clientX
    const clientY = event.touches ? event.touches[0].clientY : event.clientY
    return { x: clientX - rect.left, y: clientY - rect.top }
  }

  function startDraw(event) {
    event.preventDefault()
    isDrawing.current = true
    const ctx = canvasRef.current.getContext('2d')
    const { x, y } = getPos(event)
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  function draw(event) {
    if (!isDrawing.current) return
    event.preventDefault()
    const ctx = canvasRef.current.getContext('2d')
    const { x, y } = getPos(event)
    ctx.lineWidth = 2.5
    ctx.lineCap = 'round'
    ctx.strokeStyle = '#1e293b'
    ctx.lineTo(x, y)
    ctx.stroke()
    setHasSignature(true)
  }

  function stopDraw() {
    isDrawing.current = false
  }

  function clearCanvas() {
    const canvas = canvasRef.current
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    setHasSignature(false)
  }

  function handleDownload() {
    const canvas = canvasRef.current
    canvas.toBlob((blob) => {
      downloadBlob(blob, 'signature.png')
      logNow('Signature saved')
    }, 'image/png')
  }

  return (
    <div className="space-y-5">
      <div className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:bg-slate-900/40 dark:text-slate-300">
        Draw your signature below using your mouse or finger, then download it as a transparent PNG image.
      </div>

      <canvas
        ref={canvasRef}
        width={600}
        height={250}
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={stopDraw}
        onMouseLeave={stopDraw}
        onTouchStart={startDraw}
        onTouchMove={draw}
        onTouchEnd={stopDraw}
        className="w-full touch-none rounded-2xl border-2 border-dashed border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900"
      />

      <div className="flex gap-3">
        <button type="button" onClick={clearCanvas} className="btn-secondary">
          <HiOutlineTrash className="h-4 w-4" />
          Clear
        </button>
        <button type="button" onClick={handleDownload} disabled={!hasSignature} className="btn-primary disabled:opacity-40">
          <HiOutlineArrowDownTray className="h-4 w-4" />
          Download PNG
        </button>
      </div>
    </div>
  )
}

DigitalSignatureTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
