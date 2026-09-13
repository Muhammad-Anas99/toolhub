import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineCamera, HiOutlineExclamationTriangle, HiOutlineClipboard } from 'react-icons/hi2'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

export default function CameraScannerTool({ toolSlug, toolName, category, formats, label }) {
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const detectorRef = useRef(null)
  const rafRef = useRef(null)
  const [supported, setSupported] = useState(true)
  const [scanning, setScanning] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const { logNow } = useHistoryLogger({ toolSlug, toolName, category })

  useEffect(() => {
    if (!('BarcodeDetector' in window)) {
      setSupported(false)
      return
    }
    detectorRef.current = new window.BarcodeDetector({ formats })
    return () => stopScanning()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function startScanning() {
    setError(null)
    setResult(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      streamRef.current = stream
      videoRef.current.srcObject = stream
      await videoRef.current.play()
      setScanning(true)
      scanLoop()
    } catch (err) {
      setError('Could not access your camera. Check that camera permission is allowed for this site.')
    }
  }

  function stopScanning() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    if (streamRef.current) streamRef.current.getTracks().forEach((track) => track.stop())
    setScanning(false)
  }

  async function scanLoop() {
    if (!videoRef.current || videoRef.current.readyState < 2) {
      rafRef.current = requestAnimationFrame(scanLoop)
      return
    }
    try {
      const codes = await detectorRef.current.detect(videoRef.current)
      if (codes.length > 0) {
        setResult(codes[0].rawValue)
        logNow(label + ' detected')
        stopScanning()
        return
      }
    } catch {
      // A single failed detection frame isn't fatal - just keep scanning
    }
    rafRef.current = requestAnimationFrame(scanLoop)
  }

  if (!supported) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center dark:border-amber-900 dark:bg-amber-950">
        <HiOutlineExclamationTriangle className="h-8 w-8 text-amber-600 dark:text-amber-400" />
        <p className="text-sm text-amber-800 dark:text-amber-300">
          Your browser doesn&apos;t support the barcode detection API this tool relies on. This currently works in
          Chrome, Edge, and other Chromium-based browsers on desktop and Android.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-2xl bg-slate-900" style={{ aspectRatio: '4/3' }}>
        <video ref={videoRef} className="h-full w-full object-cover" muted playsInline />
        {!scanning && !result && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80">
            <button type="button" onClick={startScanning} className="btn-primary">
              <HiOutlineCamera className="h-4 w-4" />
              Start Scanning
            </button>
          </div>
        )}
      </div>

      {error && <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>}

      {scanning && <p className="text-center text-sm text-slate-400 dark:text-slate-500">Point your camera at a {label.toLowerCase()}...</p>}

      {result && (
        <div className="card flex items-center justify-between gap-4 p-4">
          <p className="min-w-0 flex-1 break-all font-mono text-sm text-slate-900 dark:text-white">{result}</p>
          <button
            type="button"
            onClick={() => navigator.clipboard.writeText(result)}
            className="flex-shrink-0 rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
          >
            <HiOutlineClipboard className="h-4 w-4" />
          </button>
        </div>
      )}

      {result && (
        <button type="button" onClick={() => { setResult(null); startScanning() }} className="btn-secondary">
          Scan Another
        </button>
      )}
    </div>
  )
}

CameraScannerTool.propTypes = {
  toolSlug: PropTypes.string,
  toolName: PropTypes.string,
  category: PropTypes.string,
  formats: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.string.isRequired,
}
