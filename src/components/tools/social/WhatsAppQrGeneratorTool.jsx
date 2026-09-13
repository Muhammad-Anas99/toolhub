import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineArrowDownTray } from 'react-icons/hi2'
import { encode, renderToCanvas } from '../../../lib/qrCodeUtils.js'
import { buildWhatsAppLink } from '../../../lib/whatsappUtils.js'
import { downloadBlob } from '../../../lib/downloadBlob.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

export default function WhatsAppQrGeneratorTool({ toolSlug, toolName, category }) {
  const [number, setNumber] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState(null)
  const canvasRef = useRef(null)
  const { logDebounced } = useHistoryLogger({ toolSlug, toolName, category })

  const link = buildWhatsAppLink(number, message)
  const hasInput = number.trim().length > 0

  useEffect(() => {
    const canvas = canvasRef.current
    if (!link) {
      setError(null)
      if (canvas) canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
      return
    }
    try {
      const qr = encode(link, 'M')
      renderToCanvas(qr, canvas, { moduleSize: 8 })
      setError(null)
      logDebounced('WhatsApp QR code generated', link)
    } catch (err) {
      setError('Could not generate a QR code for this.')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [link])

  function handleDownload() {
    if (!link || !canvasRef.current) return
    canvasRef.current.toBlob((blob) => downloadBlob(blob, 'whatsapp-qr-code.png'), 'image/png')
  }

  return (
    <div className="space-y-5">
      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Phone number (with country code)</label>
        <input
          type="text"
          value={number}
          onChange={(event) => setNumber(event.target.value)}
          placeholder="+1 234 567 8900"
          className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Pre-filled message (optional)</label>
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          rows={2}
          className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
      </div>

      {hasInput && !link && (
        <p className="text-sm text-rose-600 dark:text-rose-400">
          That doesn&apos;t look like a complete phone number with a country code yet.
        </p>
      )}
      {error && <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>}

      <div className="flex flex-col items-center gap-4 rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
        <canvas ref={canvasRef} className={link ? '' : 'opacity-20'} />
        {link && (
          <button type="button" onClick={handleDownload} className="btn-primary text-sm">
            <HiOutlineArrowDownTray className="h-4 w-4" />
            Download PNG
          </button>
        )}
      </div>
    </div>
  )
}

WhatsAppQrGeneratorTool.propTypes = {
  toolSlug: PropTypes.string,
  toolName: PropTypes.string,
  category: PropTypes.string,
}
