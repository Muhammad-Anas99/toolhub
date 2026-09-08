import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineArrowDownTray, HiOutlineDocumentDuplicate } from 'react-icons/hi2'
import DropZone from '../DropZone.jsx'
import ErrorMessage from '../ErrorMessage.jsx'
import ProgressBar from '../ProgressBar.jsx'
import { useImageUpload } from '../../../hooks/useImageUpload.js'
import { generateFaviconSet, buildFaviconIco, buildWebManifest, buildFaviconHtml } from '../../../lib/faviconUtils.js'
import { createZip } from '../../../lib/zipUtils.js'
import { downloadBlob } from '../../../lib/downloadBlob.js'
import { formatBytes } from '../../../lib/formatBytes.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/svg+xml']

export default function FaviconGeneratorTool({ toolSlug, toolName, category }) {
  const upload = useImageUpload({ acceptedTypes: ACCEPTED_TYPES, maxSizeMB: 10 })
  const [status, setStatus] = useState('idle') // idle | processing | done
  const [results, setResults] = useState(null)
  const [icoBlob, setIcoBlob] = useState(null)
  const [copied, setCopied] = useState(false)
  const { logNow } = useHistoryLogger({ toolSlug, toolName, category })

  async function handleGenerate() {
    if (!upload.file) return
    setStatus('processing')
    upload.setError(null)

    try {
      const faviconResults = await generateFaviconSet(upload.file)
      const ico = await buildFaviconIco(faviconResults)
      setResults(faviconResults)
      setIcoBlob(ico)
      setStatus('done')
      logNow('Favicons generated')
    } catch (err) {
      upload.setError(err.message || 'Could not generate favicons from this image.')
      setStatus('idle')
    }
  }

  function handleReset() {
    upload.reset()
    setResults(null)
    setIcoBlob(null)
    setStatus('idle')
  }

  async function handleDownloadAll() {
    if (!results || !icoBlob) return
    const files = results.map(({ filename, blob }) => ({ filename, blob }))
    files.push({ filename: 'favicon.ico', blob: icoBlob })
    files.push({ filename: 'site.webmanifest', blob: new Blob([buildWebManifest()], { type: 'application/json' }) })
    const zip = await createZip(files)
    downloadBlob(zip, 'favicons.zip')
  }

  function handleCopyHtml() {
    navigator.clipboard.writeText(buildFaviconHtml())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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
          <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-900/40">
            <img src={upload.previewUrl} alt="Uploaded preview" className="h-16 w-16 rounded-lg object-contain" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-900 dark:text-white">{upload.file.name}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500">{formatBytes(upload.file.size)}</p>
            </div>
            <button type="button" onClick={handleReset} className="btn-secondary text-xs">
              Reset
            </button>
          </div>

          {status === 'idle' && (
            <button type="button" onClick={handleGenerate} className="btn-primary w-full sm:w-auto">
              Generate Favicons
            </button>
          )}

          {status === 'processing' && <ProgressBar label="Generating favicon sizes..." />}

          {status === 'done' && results && (
            <>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {results.map((result) => (
                  <div key={result.size} className="flex flex-col items-center gap-2 rounded-xl bg-slate-50 p-4 dark:bg-slate-900/40">
                    <img
                      src={URL.createObjectURL(result.blob)}
                      alt={`${result.size}\u00d7${result.size} favicon preview`}
                      className="h-12 w-12 rounded object-contain"
                      style={{ imageRendering: result.size <= 48 ? 'pixelated' : 'auto' }}
                    />
                    <p className="text-center text-xs font-medium text-slate-700 dark:text-slate-300">{result.label}</p>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500">{formatBytes(result.blob.size)}</p>
                    <button
                      type="button"
                      onClick={() => downloadBlob(result.blob, result.filename)}
                      className="text-xs font-medium text-brand-600 hover:underline dark:text-brand-400"
                    >
                      Download
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={handleDownloadAll} className="btn-primary text-sm">
                  <HiOutlineArrowDownTray className="h-4 w-4" />
                  Download All (ZIP)
                </button>
                <button type="button" onClick={handleCopyHtml} className="btn-secondary text-sm">
                  <HiOutlineDocumentDuplicate className="h-4 w-4" />
                  {copied ? 'Copied!' : 'Copy HTML Tags'}
                </button>
              </div>

              <div className="rounded-xl bg-slate-900 p-4 dark:bg-slate-950">
                <pre className="overflow-x-auto text-xs text-slate-200">
                  <code>{buildFaviconHtml()}</code>
                </pre>
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}

FaviconGeneratorTool.propTypes = {
  toolSlug: PropTypes.string,
  toolName: PropTypes.string,
  category: PropTypes.string,
}
