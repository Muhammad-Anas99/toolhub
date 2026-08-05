import React, { useEffect, useMemo, useState } from 'react'
import { HiOutlineArrowUturnLeft, HiOutlineArrowUturnRight } from 'react-icons/hi2'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import ToolWorkspace from '../../components/tools/ToolWorkspace.jsx'
import CropStage from '../../components/tools/image/CropStage.jsx'
import PreviewPanel from '../../components/tools/PreviewPanel.jsx'
import ProgressBar from '../../components/tools/ProgressBar.jsx'
import DownloadPanel from '../../components/tools/DownloadPanel.jsx'
import Slider from '../../components/ui/Slider.jsx'
import { useImageUpload } from '../../hooks/useImageUpload.js'
import { useToolResult } from '../../hooks/useToolResult.js'
import { rotateFlipImage, cropImage } from '../../lib/imageProcessing.js'
import { downloadBlob, buildOutputFilename } from '../../lib/downloadBlob.js'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'

const tool = getToolBySlug('image-crop')
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const STAGE_MAX_WIDTH = 560
const STAGE_MAX_HEIGHT = 420

export default function ImageCrop() {
  const upload = useImageUpload({ acceptedTypes: ACCEPTED_TYPES, maxSizeMB: 25 })
  const { status, result, run, clearResult, setStatus } = useToolResult()

  // The "working" image is the current source for cropping — starts as the
  // uploaded file and is replaced whenever the user rotates before cropping.
  const [working, setWorking] = useState(null) // { blob, url, width, height }
  const [zoom, setZoom] = useState(1)
  const [box, setBox] = useState(null)

  useEffect(() => {
    if (upload.file && upload.previewUrl && upload.dimensions) {
      setWorking({
        blob: upload.file,
        url: upload.previewUrl,
        width: upload.dimensions.width,
        height: upload.dimensions.height,
      })
    } else {
      setWorking(null)
    }
  }, [upload.file, upload.previewUrl, upload.dimensions])

  const baseScale = useMemo(() => {
    if (!working) return 1
    return Math.min(1, STAGE_MAX_WIDTH / working.width, STAGE_MAX_HEIGHT / working.height)
  }, [working])

  const displayWidth = working ? Math.round(working.width * baseScale * zoom) : 0
  const displayHeight = working ? Math.round(working.height * baseScale * zoom) : 0

  // Re-center a default crop box (80% of the stage) whenever the working
  // image or zoom level changes.
  useEffect(() => {
    if (!displayWidth || !displayHeight) return
    const boxWidth = Math.round(displayWidth * 0.8)
    const boxHeight = Math.round(displayHeight * 0.8)
    setBox({
      x: Math.round((displayWidth - boxWidth) / 2),
      y: Math.round((displayHeight - boxHeight) / 2),
      width: boxWidth,
      height: boxHeight,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [working?.url, zoom])

  async function handleRotate(direction) {
    if (!working) return
    setStatus('processing')
    upload.setError(null)

    try {
      const degrees = direction === 'left' ? -90 : 90
      const { blob, width, height } = await rotateFlipImage(working.blob, { degrees })
      setWorking((previous) => {
        if (previous?.url && previous.url !== upload.previewUrl) URL.revokeObjectURL(previous.url)
        return { blob, url: URL.createObjectURL(blob), width, height }
      })
      setZoom(1)
      setStatus('idle')
    } catch (error) {
      upload.setError(error.message || 'Something went wrong while rotating this image.')
      setStatus('idle')
    }
  }

  function handleApplyCrop() {
    if (!working || !box) return
    const scale = baseScale * zoom
    const crop = {
      x: Math.round(box.x / scale),
      y: Math.round(box.y / scale),
      width: Math.round(box.width / scale),
      height: Math.round(box.height / scale),
    }

    run(
      () => cropImage(working.blob, { crop }),
      (error) => upload.setError(error.message || 'Something went wrong while cropping this image.')
    )
  }

  function handleDownload() {
    if (!result) return
    downloadBlob(
      result.blob,
      buildOutputFilename(upload.file.name, upload.file.name.split('.').pop(), '-cropped')
    )
  }

  function handleReset() {
    clearResult()
    setZoom(1)
    upload.reset()
  }

  return (
    <ToolLayout tool={tool} faqItems={toolFaqs['image-crop']}>
      <ToolWorkspace
        upload={upload}
        acceptedTypes={ACCEPTED_TYPES}
        maxSizeMB={25}
        onRemove={handleReset}
      >
        {!result && working && box && (
          <>
            <div className="card space-y-4 p-5">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => handleRotate('left')}
                  disabled={status === 'processing'}
                  className="btn-secondary"
                >
                  <HiOutlineArrowUturnLeft className="h-4 w-4" />
                  Rotate Left
                </button>
                <button
                  type="button"
                  onClick={() => handleRotate('right')}
                  disabled={status === 'processing'}
                  className="btn-secondary"
                >
                  <HiOutlineArrowUturnRight className="h-4 w-4" />
                  Rotate Right
                </button>
              </div>

              <Slider
                label="Zoom"
                value={zoom}
                onChange={setZoom}
                min={1}
                max={3}
                step={0.1}
                valueLabel={`${zoom.toFixed(1)}x`}
              />
            </div>

            {status === 'processing' ? (
              <ProgressBar label="Processing..." />
            ) : (
              <CropStage
                imageUrl={working.url}
                displayWidth={displayWidth}
                displayHeight={displayHeight}
                box={box}
                onBoxChange={setBox}
              />
            )}

            <button
              type="button"
              onClick={handleApplyCrop}
              disabled={status === 'processing'}
              className="btn-primary w-full sm:w-auto"
            >
              {status === 'processing' ? 'Cropping...' : 'Apply Crop'}
            </button>
          </>
        )}

        {result && (
          <>
            <PreviewPanel before={upload.previewUrl} after={result.url} afterLabel="Cropped" />
            <DownloadPanel
              originalSize={upload.file.size}
              outputSize={result.blob.size}
              onDownload={handleDownload}
              onReset={handleReset}
            >
              <p className="text-xs text-emerald-700 dark:text-emerald-400">
                Cropped to {result.width} &times; {result.height}px
              </p>
            </DownloadPanel>
          </>
        )}
      </ToolWorkspace>
    </ToolLayout>
  )
}
