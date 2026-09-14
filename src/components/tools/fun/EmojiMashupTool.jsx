import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineArrowDownTray } from 'react-icons/hi2'
import { downloadBlob } from '../../../lib/downloadBlob.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

const EMOJI_OPTIONS = ['\ud83d\ude00', '\ud83d\ude02', '\ud83d\ude0d', '\ud83d\ude31', '\ud83d\ude0e', '\ud83e\udd14', '\ud83d\udc7b', '\ud83d\udc7d', '\ud83d\udc31', '\ud83d\udc36', '\ud83d\udd25', '\u2728', '\ud83c\udf1f', '\ud83d\udc8e', '\ud83c\udf88', '\ud83c\udf6d']

const EmojiCanvas = React.forwardRef(function EmojiCanvas({ base, overlay, overlaySize, overlayX, overlayY }, ref) {
  React.useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const size = 300
    canvas.width = size
    canvas.height = size
    ctx.clearRect(0, 0, size, size)
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font = `${size * 0.7}px sans-serif`
    ctx.fillText(base, size / 2, size / 2)
    ctx.font = `${size * (overlaySize / 100)}px sans-serif`
    ctx.fillText(overlay, (overlayX / 100) * size, (overlayY / 100) * size)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [base, overlay, overlaySize, overlayX, overlayY])

  return <canvas ref={ref} className="h-48 w-48 rounded-xl bg-slate-50 dark:bg-slate-800" />
})

EmojiCanvas.propTypes = {
  base: PropTypes.string.isRequired,
  overlay: PropTypes.string.isRequired,
  overlaySize: PropTypes.number.isRequired,
  overlayX: PropTypes.number.isRequired,
  overlayY: PropTypes.number.isRequired,
}

export default function EmojiMashupTool({ toolSlug, toolName, category }) {
  const [base, setBase] = useState(EMOJI_OPTIONS[0])
  const [overlay, setOverlay] = useState(EMOJI_OPTIONS[10])
  const [overlaySize, setOverlaySize] = useState(50)
  const [overlayX, setOverlayX] = useState(65)
  const [overlayY, setOverlayY] = useState(65)
  const canvasRef = useRef(null)
  const { logDebounced } = useHistoryLogger({ toolSlug, toolName, category })

  logDebounced('Emoji mashup created', base + overlay)

  function download() {
    const canvas = canvasRef.current
    canvas.toBlob((blob) => downloadBlob(blob, 'emoji-mashup.png'))
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Base emoji</label>
          <div className="mt-1.5 flex flex-wrap gap-1">
            {EMOJI_OPTIONS.map((e) => (
              <button key={e} type="button" onClick={() => setBase(e)} className={`rounded-lg p-1.5 text-2xl ${base === e ? 'bg-brand-100 dark:bg-brand-950' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}>{e}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Overlay emoji</label>
          <div className="mt-1.5 flex flex-wrap gap-1">
            {EMOJI_OPTIONS.map((e) => (
              <button key={e} type="button" onClick={() => setOverlay(e)} className={`rounded-lg p-1.5 text-2xl ${overlay === e ? 'bg-brand-100 dark:bg-brand-950' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}>{e}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Overlay size</label>
          <input type="range" min="20" max="90" value={overlaySize} onChange={(e) => setOverlaySize(Number(e.target.value))} className="mt-2 w-full" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Overlay X</label>
          <input type="range" min="0" max="100" value={overlayX} onChange={(e) => setOverlayX(Number(e.target.value))} className="mt-2 w-full" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Overlay Y</label>
          <input type="range" min="0" max="100" value={overlayY} onChange={(e) => setOverlayY(Number(e.target.value))} className="mt-2 w-full" />
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <EmojiCanvas ref={canvasRef} base={base} overlay={overlay} overlaySize={overlaySize} overlayX={overlayX} overlayY={overlayY} />
        <button type="button" onClick={download} className="btn-primary text-sm">
          <HiOutlineArrowDownTray className="h-4 w-4" />
          Download PNG
        </button>
      </div>
    </div>
  )
}

EmojiMashupTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
