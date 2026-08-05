import React, { useCallback, useRef, useState } from 'react'
import PropTypes from 'prop-types'

const HANDLE_SIZE = 14
const MIN_BOX_SIZE = 40
const KEYBOARD_STEP = 10

const HANDLES = ['nw', 'ne', 'sw', 'se']

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

/**
 * Renders an image at `displayWidth`/`displayHeight` with a draggable,
 * resizable crop box overlay. All coordinates in `box` and emitted via
 * `onBoxChange` are in *displayed* pixels (i.e. already scaled by zoom) —
 * the caller is responsible for converting back to natural image pixels.
 *
 * Supports pointer (mouse/touch) drag on the box body and corner handles,
 * plus keyboard control on the box itself: arrow keys move it, and
 * Shift+arrow keys resize it — so the crop tool is usable without a mouse.
 */
export default function CropStage({ imageUrl, displayWidth, displayHeight, box, onBoxChange }) {
  const stageRef = useRef(null)
  const dragState = useRef(null)
  const [isDragging, setIsDragging] = useState(false)

  const clampBox = useCallback(
    (nextBox) => {
      const width = clamp(nextBox.width, MIN_BOX_SIZE, displayWidth)
      const height = clamp(nextBox.height, MIN_BOX_SIZE, displayHeight)
      const x = clamp(nextBox.x, 0, displayWidth - width)
      const y = clamp(nextBox.y, 0, displayHeight - height)
      return { x, y, width, height }
    },
    [displayWidth, displayHeight]
  )

  function handleBodyPointerDown(event) {
    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)
    dragState.current = {
      type: 'move',
      startX: event.clientX,
      startY: event.clientY,
      startBox: { ...box },
    }
    setIsDragging(true)
  }

  function handleHandlePointerDown(corner) {
    return (event) => {
      event.preventDefault()
      event.stopPropagation()
      event.currentTarget.setPointerCapture(event.pointerId)
      dragState.current = {
        type: 'resize',
        corner,
        startX: event.clientX,
        startY: event.clientY,
        startBox: { ...box },
      }
      setIsDragging(true)
    }
  }

  function handlePointerMove(event) {
    if (!dragState.current) return
    const { type, startX, startY, startBox, corner } = dragState.current
    const deltaX = event.clientX - startX
    const deltaY = event.clientY - startY

    if (type === 'move') {
      onBoxChange(clampBox({ ...startBox, x: startBox.x + deltaX, y: startBox.y + deltaY }))
      return
    }

    let next = { ...startBox }
    if (corner.includes('e')) next.width = startBox.width + deltaX
    if (corner.includes('w')) {
      next.width = startBox.width - deltaX
      next.x = startBox.x + deltaX
    }
    if (corner.includes('s')) next.height = startBox.height + deltaY
    if (corner.includes('n')) {
      next.height = startBox.height - deltaY
      next.y = startBox.y + deltaY
    }

    onBoxChange(clampBox(next))
  }

  function handlePointerUp() {
    dragState.current = null
    setIsDragging(false)
  }

  function handleKeyDown(event) {
    const { key, shiftKey } = event
    const arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
    if (!arrowKeys.includes(key)) return
    event.preventDefault()

    if (shiftKey) {
      // Resize from the bottom-right corner.
      let next = { ...box }
      if (key === 'ArrowRight') next.width += KEYBOARD_STEP
      if (key === 'ArrowLeft') next.width -= KEYBOARD_STEP
      if (key === 'ArrowDown') next.height += KEYBOARD_STEP
      if (key === 'ArrowUp') next.height -= KEYBOARD_STEP
      onBoxChange(clampBox(next))
      return
    }

    let next = { ...box }
    if (key === 'ArrowRight') next.x += KEYBOARD_STEP
    if (key === 'ArrowLeft') next.x -= KEYBOARD_STEP
    if (key === 'ArrowDown') next.y += KEYBOARD_STEP
    if (key === 'ArrowUp') next.y -= KEYBOARD_STEP
    onBoxChange(clampBox(next))
  }

  const cursorForHandle = {
    nw: 'nwse-resize',
    se: 'nwse-resize',
    ne: 'nesw-resize',
    sw: 'nesw-resize',
  }

  return (
    <div
      ref={stageRef}
      className="relative mx-auto select-none overflow-hidden rounded-2xl border border-slate-200 bg-slate-900/5 dark:border-slate-800"
      style={{ width: displayWidth, height: displayHeight, maxWidth: '100%' }}
    >
      <img
        src={imageUrl}
        alt="Image to crop"
        draggable={false}
        className="pointer-events-none absolute left-0 top-0"
        style={{ width: displayWidth, height: displayHeight }}
      />

      <div
        className="pointer-events-none absolute inset-0 bg-black/40"
        style={{
          clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 ${box.y}px, ${box.x}px ${box.y}px, ${box.x}px ${box.y + box.height}px, ${box.x + box.width}px ${box.y + box.height}px, ${box.x + box.width}px ${box.y}px, 0 ${box.y}px)`,
        }}
      />

      <div
        role="group"
        tabIndex={0}
        aria-label="Crop area. Use arrow keys to move, Shift plus arrow keys to resize."
        onKeyDown={handleKeyDown}
        onPointerDown={handleBodyPointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className={`absolute border-2 border-white outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{ left: box.x, top: box.y, width: box.width, height: box.height }}
      >
        <div className="pointer-events-none absolute inset-0 grid grid-cols-3 grid-rows-3">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className="border border-white/30" />
          ))}
        </div>

        {HANDLES.map((corner) => (
          <div
            key={corner}
            onPointerDown={handleHandlePointerDown(corner)}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            aria-hidden="true"
            className="absolute rounded-full border-2 border-brand-600 bg-white"
            style={{
              width: HANDLE_SIZE,
              height: HANDLE_SIZE,
              cursor: cursorForHandle[corner],
              top: corner.includes('n') ? -HANDLE_SIZE / 2 : 'auto',
              bottom: corner.includes('s') ? -HANDLE_SIZE / 2 : 'auto',
              left: corner.includes('w') ? -HANDLE_SIZE / 2 : 'auto',
              right: corner.includes('e') ? -HANDLE_SIZE / 2 : 'auto',
            }}
          />
        ))}
      </div>
    </div>
  )
}

CropStage.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  displayWidth: PropTypes.number.isRequired,
  displayHeight: PropTypes.number.isRequired,
  box: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
  onBoxChange: PropTypes.func.isRequired,
}
