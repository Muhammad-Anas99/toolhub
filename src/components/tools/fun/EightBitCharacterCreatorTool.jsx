import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineArrowDownTray, HiOutlineTrash } from 'react-icons/hi2'
import { downloadBlob } from '../../../lib/downloadBlob.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

const COLS = 12
const ROWS = 16
const PALETTE = ['#1e293b', '#ef4444', '#f97316', '#facc15', '#4ade80', '#38bdf8', '#a78bfa', '#f472b6', '#fbcfe8']

function createEmptyGrid() {
  return Array.from({ length: COLS * ROWS }, () => null)
}

function getMirroredIndex(index) {
  const row = Math.floor(index / COLS)
  const col = index % COLS
  const mirroredCol = COLS - 1 - col
  return row * COLS + mirroredCol
}

export default function EightBitCharacterCreatorTool({ toolSlug, toolName, category }) {
  const [grid, setGrid] = useState(createEmptyGrid)
  const [color, setColor] = useState(PALETTE[0])
  const { logDebounced } = useHistoryLogger({ toolSlug, toolName, category })

  function paint(index) {
    setGrid((prev) => {
      const next = [...prev]
      next[index] = color
      next[getMirroredIndex(index)] = color
      return next
    })
    logDebounced('8-bit character drawn', String(index))
  }

  function clear() {
    setGrid(createEmptyGrid())
  }

  function download() {
    const scale = 20
    const canvas = document.createElement('canvas')
    canvas.width = COLS * scale
    canvas.height = ROWS * scale
    const ctx = canvas.getContext('2d')
    grid.forEach((cellColor, i) => {
      if (!cellColor) return
      const x = (i % COLS) * scale
      const y = Math.floor(i / COLS) * scale
      ctx.fillStyle = cellColor
      ctx.fillRect(x, y, scale, scale)
    })
    canvas.toBlob((blob) => downloadBlob(blob, '8bit-character.png'))
  }

  return (
    <div className="space-y-5">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Symmetric drawing \u2014 paint one side and the mirror side fills in automatically.
      </p>

      <div className="flex flex-wrap items-center gap-2">
        {PALETTE.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setColor(c)}
            className={`h-8 w-8 rounded-full border-2 ${color === c ? 'border-brand-500' : 'border-slate-200 dark:border-slate-700'}`}
            style={{ backgroundColor: c }}
          />
        ))}
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-8 w-8 rounded-lg border border-slate-200 dark:border-slate-700" />
      </div>

      <div
        className="mx-auto grid max-w-xs select-none gap-px rounded-lg bg-slate-200 p-1 dark:bg-slate-800"
        style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
      >
        {grid.map((cellColor, i) => (
          <div
            key={i}
            onMouseDown={() => paint(i)}
            className="aspect-square cursor-pointer bg-white dark:bg-slate-900"
            style={{ backgroundColor: cellColor || undefined }}
          />
        ))}
      </div>

      <div className="flex gap-3">
        <button type="button" onClick={clear} className="btn-secondary">
          <HiOutlineTrash className="h-4 w-4" />
          Clear
        </button>
        <button type="button" onClick={download} className="btn-primary">
          <HiOutlineArrowDownTray className="h-4 w-4" />
          Download PNG
        </button>
      </div>
    </div>
  )
}

EightBitCharacterCreatorTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
