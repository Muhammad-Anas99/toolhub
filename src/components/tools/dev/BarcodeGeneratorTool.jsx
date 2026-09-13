import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineArrowDownTray } from 'react-icons/hi2'
import { generateBarcode } from '../../../lib/barcodeUtils.js'
import { downloadBlob } from '../../../lib/downloadBlob.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

const BAR_WIDTH = 2
const BAR_HEIGHT = 100

export default function BarcodeGeneratorTool({ toolSlug, toolName, category }) {
  const [format, setFormat] = useState('EAN13')
  const [digits, setDigits] = useState('')
  const [error, setError] = useState(null)
  const svgRef = useRef(null)
  const { logNow } = useHistoryLogger({ toolSlug, toolName, category })

  let result = null
  try {
    if (digits.trim()) {
      result = generateBarcode(digits, format)
      if (error) setError(null)
    }
  } catch (err) {
    if (!error) setError(err.message)
  }

  function handleDownload() {
    if (!svgRef.current) return
    const svgData = new XMLSerializer().serializeToString(svgRef.current)
    const blob = new Blob([svgData], { type: 'image/svg+xml' })
    downloadBlob(blob, `barcode-${result.code}.svg`)
    logNow('Barcode downloaded')
  }

  const svgWidth = result ? result.bits.length * BAR_WIDTH : 0

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        {['EAN13', 'UPCA'].map((f) => (
          <button key={f} type="button" onClick={() => { setFormat(f); setError(null) }} className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${format === f ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}>
            {f === 'EAN13' ? 'EAN-13' : 'UPC-A'}
          </button>
        ))}
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Digits ({format === 'EAN13' ? '12' : '11'}, checksum calculated automatically)
        </label>
        <input
          type="text"
          value={digits}
          onChange={(e) => setDigits(e.target.value)}
          placeholder={format === 'EAN13' ? '400638133393' : '03600029145'}
          className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 font-mono text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
      </div>

      {error && <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>}

      {result && (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800">
          <svg ref={svgRef} width={svgWidth} height={BAR_HEIGHT + 20} viewBox={`0 0 ${svgWidth} ${BAR_HEIGHT + 20}`}>
            <rect width={svgWidth} height={BAR_HEIGHT + 20} fill="white" />
            {result.bits.split('').map((bit, i) =>
              bit === '1' ? <rect key={i} x={i * BAR_WIDTH} y={0} width={BAR_WIDTH} height={BAR_HEIGHT} fill="black" /> : null
            )}
            <text x={svgWidth / 2} y={BAR_HEIGHT + 15} textAnchor="middle" fontSize="14" fontFamily="monospace" fill="black">
              {result.code}
            </text>
          </svg>
          <button type="button" onClick={handleDownload} className="btn-primary text-sm">
            <HiOutlineArrowDownTray className="h-4 w-4" />
            Download SVG
          </button>
        </div>
      )}
    </div>
  )
}

BarcodeGeneratorTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
