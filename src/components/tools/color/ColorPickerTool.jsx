import React, { useRef, useState } from 'react'
import { HiOutlineTrash } from 'react-icons/hi2'
import DropZone from '../DropZone.jsx'
import CopyButton from '../CopyButton.jsx'
import { useImageUpload } from '../../../hooks/useImageUpload.js'
import { rgbToHex, rgbToHsl, formatRgb, formatHsl } from '../../../lib/colorUtils.js'

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

/**
 * Two ways to get a color here: upload an image and click anywhere on it
 * (reads the real pixel value at that point via Canvas getImageData — not
 * an approximation), or use the standalone picker below when there's no
 * image involved at all.
 */
export default function ColorPickerTool() {
  const upload = useImageUpload({ acceptedTypes: ACCEPTED_TYPES, maxSizeMB: 25 })
  const canvasRef = useRef(null)
  const imgRef = useRef(null)
  const [pickedColor, setPickedColor] = useState(null)
  const [standaloneColor, setStandaloneColor] = useState('#3b6cf6')

  function handleImageClick(event) {
    const canvas = canvasRef.current
    const img = imgRef.current
    if (!canvas || !img) return

    const rect = img.getBoundingClientRect()
    const scaleX = img.naturalWidth / rect.width
    const scaleY = img.naturalHeight / rect.height
    const x = Math.floor((event.clientX - rect.left) * scaleX)
    const y = Math.floor((event.clientY - rect.top) * scaleY)

    const ctx = canvas.getContext('2d')
    const [r, g, b] = ctx.getImageData(x, y, 1, 1).data
    setPickedColor({ r, g, b })
  }

  function handleImageLoad() {
    const canvas = canvasRef.current
    const img = imgRef.current
    if (!canvas || !img) return
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight
    canvas.getContext('2d').drawImage(img, 0, 0)
  }

  const activeRgb =
    pickedColor ||
    (() => {
      const hex = standaloneColor.replace('#', '')
      return {
        r: parseInt(hex.slice(0, 2), 16),
        g: parseInt(hex.slice(2, 4), 16),
        b: parseInt(hex.slice(4, 6), 16),
      }
    })()

  const hex = rgbToHex(activeRgb.r, activeRgb.g, activeRgb.b)
  const hsl = rgbToHsl(activeRgb.r, activeRgb.g, activeRgb.b)
  const formats = [
    { label: 'HEX', value: hex },
    { label: 'RGB', value: formatRgb(activeRgb) },
    { label: 'HSL', value: formatHsl(hsl) },
  ]

  return (
    <div className="space-y-6">
      {!upload.file ? (
        <DropZone
          dropZoneProps={upload.dropZoneProps}
          inputProps={upload.inputProps}
          acceptedTypes={ACCEPTED_TYPES}
          maxSizeMB={25}
          isDragActive={upload.isDragActive}
          label="Drag & drop an image to pick colors from it"
        />
      ) : (
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Click anywhere on the image to sample that pixel&apos;s color.
            </p>
            <button
              type="button"
              onClick={() => {
                upload.reset()
                setPickedColor(null)
              }}
              className="flex-shrink-0 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-rose-600 dark:hover:bg-slate-800 dark:hover:text-rose-400"
              aria-label="Remove image"
            >
              <HiOutlineTrash className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-3 overflow-hidden rounded-xl">
            {/* Hidden canvas mirrors the visible image 1:1 in natural
                pixel dimensions, purely to read pixel data from clicks on
                the visible <img> above it — never shown itself. */}
            <img
              ref={imgRef}
              src={upload.previewUrl}
              alt="Uploaded"
              onLoad={handleImageLoad}
              onClick={handleImageClick}
              className="w-full cursor-crosshair"
            />
            <canvas ref={canvasRef} className="hidden" />
          </div>
        </div>
      )}

      {upload.error && <p className="text-sm text-rose-500">{upload.error}</p>}

      {!upload.file && (
        <div className="card flex items-center gap-3 p-6">
          <input
            type="color"
            value={standaloneColor}
            onChange={(event) => {
              setStandaloneColor(event.target.value)
              setPickedColor(null)
            }}
            className="h-11 w-14 flex-shrink-0 cursor-pointer rounded-lg border border-slate-200 dark:border-slate-700"
            aria-label="Pick a color without an image"
          />
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Or just pick a color directly, without an image.
          </p>
        </div>
      )}

      <div className="card overflow-hidden">
        <div className="h-28 w-full" style={{ backgroundColor: hex }} aria-hidden="true" />
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {formats.map((format) => (
            <div key={format.label} className="flex items-center justify-between gap-4 px-5 py-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
                  {format.label}
                </p>
                <p className="mt-0.5 font-mono text-sm text-slate-900 dark:text-white">{format.value}</p>
              </div>
              <CopyButton value={format.value} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
