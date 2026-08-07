import React, { useEffect, useRef, useState } from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import ToolWorkspace from '../../components/tools/ToolWorkspace.jsx'
import PreviewPanel from '../../components/tools/PreviewPanel.jsx'
import ProgressBar from '../../components/tools/ProgressBar.jsx'
import DownloadPanel from '../../components/tools/DownloadPanel.jsx'
import Slider from '../../components/ui/Slider.jsx'
import { useImageUpload } from '../../hooks/useImageUpload.js'
import { useToolResult } from '../../hooks/useToolResult.js'
import { compressImage } from '../../lib/imageProcessing.js'
import { downloadBlob, buildOutputFilename } from '../../lib/downloadBlob.js'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('image-compressor')
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export default function ImageCompressor() {
  const upload = useImageUpload({ acceptedTypes: ACCEPTED_TYPES, maxSizeMB: 25 })
  const { status, result, run, clearResult } = useToolResult({ toolSlug: tool.slug, toolName: tool.name, category: tool.category })
  const [quality, setQuality] = useState(70)
  const debounceRef = useRef(null)

  function runCompression(currentQuality) {
    run(
      () => compressImage(upload.file, { quality: currentQuality / 100 }),
      (error) => upload.setError(error.message || 'Something went wrong while compressing this image.')
    )
  }

  // Re-compress automatically (debounced) whenever the quality slider moves,
  // as long as we've already produced a result once.
  useEffect(() => {
    if (!result) return
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => runCompression(quality), 350)
    return () => clearTimeout(debounceRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quality])

  function handleDownload() {
    if (!result) return
    downloadBlob(result.blob, buildOutputFilename(upload.file.name, 'jpg', '-compressed'))
  }

  function handleReset() {
    clearResult()
    setQuality(70)
    upload.reset()
  }

  return (
    <ToolLayout tool={tool} faqItems={toolFaqs['image-compressor']}>
      <ToolWorkspace
        upload={upload}
        acceptedTypes={ACCEPTED_TYPES}
        maxSizeMB={25}
        onRemove={handleReset}
      >
        <div className="card p-5">
          <Slider
            label="Quality"
            value={quality}
            onChange={setQuality}
            min={10}
            max={95}
            step={5}
            valueLabel={`${quality}%`}
          />
          <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">
            Lower quality means a smaller file. Adjust the slider to preview the trade-off.
          </p>
          {!result && (
            <button
              type="button"
              onClick={() => runCompression(quality)}
              className="btn-primary mt-4 w-full sm:w-auto"
              disabled={status === 'processing'}
            >
              {status === 'processing' ? 'Compressing...' : 'Compress Image'}
            </button>
          )}
        </div>

        {status === 'processing' && !result && <ProgressBar label="Compressing..." />}

        {result && (
          <>
            <PreviewPanel before={upload.previewUrl} after={result.url} afterLabel="Compressed" />
            <DownloadPanel
              originalSize={upload.file.size}
              outputSize={result.blob.size}
              onDownload={handleDownload}
              onReset={handleReset}
            />
          </>
        )}
      </ToolWorkspace>
    </ToolLayout>
  )
}
