import React, { useState } from 'react'
import { HiOutlineLockClosed, HiOutlineLockOpen } from 'react-icons/hi2'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import ToolWorkspace from '../../components/tools/ToolWorkspace.jsx'
import PreviewPanel from '../../components/tools/PreviewPanel.jsx'
import ProgressBar from '../../components/tools/ProgressBar.jsx'
import DownloadPanel from '../../components/tools/DownloadPanel.jsx'
import { useImageUpload } from '../../hooks/useImageUpload.js'
import { useToolResult } from '../../hooks/useToolResult.js'
import { resizeImage } from '../../lib/imageProcessing.js'
import { downloadBlob, buildOutputFilename } from '../../lib/downloadBlob.js'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('image-resizer')
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export default function ImageResizer() {
  const upload = useImageUpload({ acceptedTypes: ACCEPTED_TYPES, maxSizeMB: 25 })
  const { status, result, run, clearResult } = useToolResult({ toolSlug: tool.slug, toolName: tool.name, category: tool.category })
  const [mode, setMode] = useState('pixels') // pixels | percentage
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [percentage, setPercentage] = useState(100)
  const [lockAspect, setLockAspect] = useState(true)

  // Once a file is loaded, pre-fill width/height so the user has a sane starting point.
  if (upload.dimensions && width === '' && height === '') {
    setWidth(String(upload.dimensions.width))
    setHeight(String(upload.dimensions.height))
  }

  function handleWidthChange(value) {
    setWidth(value)
    if (lockAspect && upload.dimensions && value !== '') {
      const ratio = upload.dimensions.height / upload.dimensions.width
      setHeight(String(Math.round(Number(value) * ratio)))
    }
  }

  function handleHeightChange(value) {
    setHeight(value)
    if (lockAspect && upload.dimensions && value !== '') {
      const ratio = upload.dimensions.width / upload.dimensions.height
      setWidth(String(Math.round(Number(value) * ratio)))
    }
  }

  function getTargetDimensions() {
    if (!upload.dimensions) return null
    if (mode === 'percentage') {
      return {
        width: Math.round((upload.dimensions.width * percentage) / 100),
        height: Math.round((upload.dimensions.height * percentage) / 100),
      }
    }
    const targetWidth = Number(width)
    const targetHeight = Number(height)
    if (!targetWidth || !targetHeight) return null
    return { width: targetWidth, height: targetHeight }
  }

  function handleResize() {
    const target = getTargetDimensions()
    if (!upload.file || !target) {
      upload.setError('Please enter a valid width and height.')
      return
    }

    run(
      () => resizeImage(upload.file, { width: target.width, height: target.height }),
      (error) => upload.setError(error.message || 'Something went wrong while resizing this image.')
    )
  }

  function handleDownload() {
    if (!result) return
    downloadBlob(
      result.blob,
      buildOutputFilename(upload.file.name, upload.file.name.split('.').pop(), '-resized')
    )
  }

  function handleReset() {
    clearResult()
    setWidth('')
    setHeight('')
    setPercentage(100)
    upload.reset()
  }

  return (
    <ToolLayout tool={tool} faqItems={toolFaqs['image-resizer']}>
      <ToolWorkspace
        upload={upload}
        acceptedTypes={ACCEPTED_TYPES}
        maxSizeMB={25}
        onRemove={handleReset}
      >
        {!result && (
          <div className="card space-y-5 p-5">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setMode('pixels')}
                aria-pressed={mode === 'pixels'}
                className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  mode === 'pixels'
                    ? 'bg-brand-600 text-white'
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                By pixels
              </button>
              <button
                type="button"
                onClick={() => setMode('percentage')}
                aria-pressed={mode === 'percentage'}
                className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  mode === 'percentage'
                    ? 'bg-brand-600 text-white'
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                By percentage
              </button>
            </div>

            {mode === 'pixels' ? (
              <div className="flex items-end gap-3">
                <div className="flex-1">
                  <label htmlFor="resize-width" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Width (px)
                  </label>
                  <input
                    id="resize-width"
                    type="number"
                    min="1"
                    value={width}
                    onChange={(event) => handleWidthChange(event.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setLockAspect((prev) => !prev)}
                  aria-label={lockAspect ? 'Unlock aspect ratio' : 'Lock aspect ratio'}
                  aria-pressed={lockAspect}
                  className="mb-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  {lockAspect ? (
                    <HiOutlineLockClosed className="h-4 w-4" />
                  ) : (
                    <HiOutlineLockOpen className="h-4 w-4" />
                  )}
                </button>
                <div className="flex-1">
                  <label htmlFor="resize-height" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Height (px)
                  </label>
                  <input
                    id="resize-height"
                    type="number"
                    min="1"
                    value={height}
                    onChange={(event) => handleHeightChange(event.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="resize-percentage" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Scale
                  </label>
                  <span className="text-sm font-semibold text-brand-600 dark:text-brand-400">
                    {percentage}%
                  </span>
                </div>
                <input
                  id="resize-percentage"
                  type="range"
                  min="10"
                  max="200"
                  step="5"
                  value={percentage}
                  onChange={(event) => setPercentage(Number(event.target.value))}
                  className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-brand-600 dark:bg-slate-700"
                />
                {upload.dimensions && (
                  <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
                    Result: {Math.round((upload.dimensions.width * percentage) / 100)} &times;{' '}
                    {Math.round((upload.dimensions.height * percentage) / 100)}px
                  </p>
                )}
              </div>
            )}

            <button
              type="button"
              onClick={handleResize}
              disabled={status === 'processing'}
              className="btn-primary w-full sm:w-auto"
            >
              {status === 'processing' ? 'Resizing...' : 'Resize Image'}
            </button>
          </div>
        )}

        {status === 'processing' && !result && <ProgressBar label="Resizing..." />}

        {!result && status !== 'processing' && <PreviewPanel before={upload.previewUrl} />}

        {result && (
          <>
            <PreviewPanel before={upload.previewUrl} after={result.url} afterLabel="Resized" />
            <DownloadPanel
              originalSize={upload.file.size}
              outputSize={result.blob.size}
              onDownload={handleDownload}
              onReset={handleReset}
            >
              <p className="text-xs text-emerald-700 dark:text-emerald-400">
                New dimensions: {result.width} &times; {result.height}px
              </p>
            </DownloadPanel>
          </>
        )}
      </ToolWorkspace>
    </ToolLayout>
  )
}
