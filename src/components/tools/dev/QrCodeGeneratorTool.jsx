import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import {
  HiOutlineArrowDownTray,
  HiOutlineLink,
  HiOutlineDocumentText,
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineChatBubbleLeftRight,
} from 'react-icons/hi2'
import { encode, renderToCanvas, renderToSvg, buildQrPayload, looksLikeUrl, looksLikeEmail, filterPhoneInput, ERROR_CORRECTION_LEVELS } from '../../../lib/qrCodeUtils.js'
import { downloadBlob } from '../../../lib/downloadBlob.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

const QR_TYPES = [
  { id: 'link', label: 'Link', icon: HiOutlineLink },
  { id: 'text', label: 'Text', icon: HiOutlineDocumentText },
  { id: 'email', label: 'Email', icon: HiOutlineEnvelope },
  { id: 'phone', label: 'Phone', icon: HiOutlinePhone },
  { id: 'sms', label: 'SMS', icon: HiOutlineChatBubbleLeftRight },
]

const fieldInputClasses =
  'mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white'

const fieldInputErrorClasses =
  'mt-1.5 w-full rounded-lg border border-red-400 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/30 dark:border-red-500 dark:bg-slate-800 dark:text-white'

export default function QrCodeGeneratorTool({ toolSlug, toolName, category }) {
  const [qrType, setQrType] = useState('link')
  const [fields, setFields] = useState({})
  const [errorLevel, setErrorLevel] = useState('M')
  const [foreground, setForeground] = useState('#000000')
  const [background, setBackground] = useState('#ffffff')
  const [error, setError] = useState(null)
  const canvasRef = useRef(null)
  const { logDebounced } = useHistoryLogger({ toolSlug, toolName, category })

  const payload = buildQrPayload(qrType, fields)

  // Only flags an error once the relevant field actually has content -
  // an empty field just means "not filled in yet", which is different
  // from "filled in with something that doesn't match the selected type".
  const urlError = qrType === 'link' && fields.url?.trim() && !looksLikeUrl(fields.url) ? 'This doesn\u2019t look like a link. Choose Text instead if you want to encode plain text.' : null
  const emailError = qrType === 'email' && fields.address?.trim() && !looksLikeEmail(fields.address) ? 'This doesn\u2019t look like a valid email address.' : null
  const fieldError = urlError || emailError

  const readyToGenerate = payload.trim() && !fieldError

  function handleFieldChange(name, value) {
    setFields((prev) => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    if (!readyToGenerate) {
      setError(null)
      const canvas = canvasRef.current
      if (canvas) {
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
      return
    }

    try {
      const qr = encode(payload, errorLevel)
      renderToCanvas(qr, canvasRef.current, { moduleSize: 8, foreground, background })
      setError(null)
      logDebounced('QR code generated', payload)
    } catch (err) {
      setError('Could not generate a QR code for this input — it may be too long for the selected error correction level.')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload, readyToGenerate, errorLevel, foreground, background])

  function handleDownloadPng() {
    if (!readyToGenerate || !canvasRef.current) return
    canvasRef.current.toBlob((blob) => {
      downloadBlob(blob, 'qrcode.png')
    }, 'image/png')
  }

  function handleDownloadSvg() {
    if (!readyToGenerate) return
    try {
      const qr = encode(payload, errorLevel)
      const svg = renderToSvg(qr, { moduleSize: 8, foreground, background })
      downloadBlob(new Blob([svg], { type: 'image/svg+xml' }), 'qrcode.svg')
    } catch (err) {
      setError('Could not generate a QR code for this input.')
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">What do you want to encode?</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {QR_TYPES.map((type) => {
            const Icon = type.icon
            const isActive = qrType === type.id
            return (
              <button
                key={type.id}
                type="button"
                onClick={() => setQrType(type.id)}
                className={`group flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-300 ease-out ${
                  isActive
                    ? 'border-brand-600 bg-brand-600 text-white shadow-md shadow-brand-600/20'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-brand-600 hover:bg-brand-600 hover:text-white hover:shadow-md hover:shadow-brand-600/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                <Icon
                  className={`h-4 w-4 transition-transform duration-300 ease-out ${
                    isActive ? '' : 'group-hover:scale-110'
                  }`}
                />
                {type.label}
              </button>
            )
          })}
        </div>
      </div>

      {qrType === 'link' && (
        <div>
          <label htmlFor="qr-url" className="text-sm font-medium text-slate-700 dark:text-slate-300">
            URL
          </label>
          <input
            id="qr-url"
            type="text"
            value={fields.url || ''}
            onChange={(event) => handleFieldChange('url', event.target.value)}
            placeholder="example.com"
            className={urlError ? fieldInputErrorClasses : fieldInputClasses}
          />
          {urlError && <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">{urlError}</p>}
        </div>
      )}

      {qrType === 'text' && (
        <div>
          <label htmlFor="qr-text" className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Text
          </label>
          <textarea
            id="qr-text"
            rows={3}
            value={fields.text || ''}
            onChange={(event) => handleFieldChange('text', event.target.value)}
            placeholder="Any text..."
            className={`${fieldInputClasses} resize-none`}
          />
        </div>
      )}

      {qrType === 'email' && (
        <div className="space-y-3">
          <div>
            <label htmlFor="qr-email-address" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Email address
            </label>
            <input
              id="qr-email-address"
              type="email"
              value={fields.address || ''}
              onChange={(event) => handleFieldChange('address', event.target.value)}
              placeholder="someone@example.com"
              className={emailError ? fieldInputErrorClasses : fieldInputClasses}
            />
            {emailError && <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">{emailError}</p>}
          </div>
          <div>
            <label htmlFor="qr-email-subject" className="text-xs text-slate-500 dark:text-slate-400">
              Subject (optional)
            </label>
            <input
              id="qr-email-subject"
              type="text"
              value={fields.subject || ''}
              onChange={(event) => handleFieldChange('subject', event.target.value)}
              className={fieldInputClasses}
            />
          </div>
          <div>
            <label htmlFor="qr-email-body" className="text-xs text-slate-500 dark:text-slate-400">
              Message (optional)
            </label>
            <textarea
              id="qr-email-body"
              rows={2}
              value={fields.body || ''}
              onChange={(event) => handleFieldChange('body', event.target.value)}
              className={`${fieldInputClasses} resize-none`}
            />
          </div>
        </div>
      )}

      {qrType === 'phone' && (
        <div>
          <label htmlFor="qr-phone-number" className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Phone number
          </label>
          <input
            id="qr-phone-number"
            type="tel"
            inputMode="tel"
            value={fields.number || ''}
            onChange={(event) => handleFieldChange('number', filterPhoneInput(event.target.value))}
            placeholder="+1 415 555 2671"
            className={fieldInputClasses}
          />
        </div>
      )}

      {qrType === 'sms' && (
        <div className="space-y-3">
          <div>
            <label htmlFor="qr-sms-number" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Phone number
            </label>
            <input
              id="qr-sms-number"
              type="tel"
              inputMode="tel"
              value={fields.number || ''}
              onChange={(event) => handleFieldChange('number', filterPhoneInput(event.target.value))}
              placeholder="+1 415 555 2671"
              className={fieldInputClasses}
            />
          </div>
          <div>
            <label htmlFor="qr-sms-message" className="text-xs text-slate-500 dark:text-slate-400">
              Message (optional)
            </label>
            <textarea
              id="qr-sms-message"
              rows={2}
              value={fields.message || ''}
              onChange={(event) => handleFieldChange('message', event.target.value)}
              className={`${fieldInputClasses} resize-none`}
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="qr-error-level" className="text-xs text-slate-500 dark:text-slate-400">
            Error correction
          </label>
          <select
            id="qr-error-level"
            value={errorLevel}
            onChange={(event) => setErrorLevel(event.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            {ERROR_CORRECTION_LEVELS.map((level) => (
              <option key={level.id} value={level.id}>
                {level.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="qr-foreground" className="text-xs text-slate-500 dark:text-slate-400">
            Foreground
          </label>
          <input
            id="qr-foreground"
            type="color"
            value={foreground}
            onChange={(event) => setForeground(event.target.value)}
            className="mt-1 h-9 w-full cursor-pointer rounded-lg border border-slate-200 dark:border-slate-700"
          />
        </div>
        <div>
          <label htmlFor="qr-background" className="text-xs text-slate-500 dark:text-slate-400">
            Background
          </label>
          <input
            id="qr-background"
            type="color"
            value={background}
            onChange={(event) => setBackground(event.target.value)}
            className="mt-1 h-9 w-full cursor-pointer rounded-lg border border-slate-200 dark:border-slate-700"
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

      <div className="flex flex-col items-center gap-4 rounded-xl bg-slate-50 p-6 dark:bg-slate-900/40">
        <canvas
          ref={canvasRef}
          className={`rounded-lg ${readyToGenerate ? 'block' : 'hidden'}`}
          style={{ imageRendering: 'pixelated', maxWidth: '280px', width: '100%', height: 'auto' }}
        />
        {!readyToGenerate && (
          <p className="py-12 text-sm text-slate-400 dark:text-slate-500">
            {fieldError ? 'Fix the error above to generate a QR code' : 'Fill in the details above to generate a QR code'}
          </p>
        )}

        {readyToGenerate && !error && (
          <div className="flex gap-2">
            <button type="button" onClick={handleDownloadPng} className="btn-primary text-sm">
              <HiOutlineArrowDownTray className="h-4 w-4" />
              Download PNG
            </button>
            <button type="button" onClick={handleDownloadSvg} className="btn-secondary text-sm">
              <HiOutlineArrowDownTray className="h-4 w-4" />
              Download SVG
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

QrCodeGeneratorTool.propTypes = {
  toolSlug: PropTypes.string,
  toolName: PropTypes.string,
  category: PropTypes.string,
}
