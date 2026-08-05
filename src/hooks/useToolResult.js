import { useCallback, useState } from 'react'

/**
 * Manages the "processing result" side of every image tool: status,
 * the resulting Blob + object URL, and safe cleanup on reset. This was
 * previously reimplemented with minor variations in ImageConverterTool,
 * ImageCompressor, ImageResizer, RotateFlipTool and ImageCrop — now those
 * all share this single implementation.
 */
export function useToolResult() {
  const [status, setStatus] = useState('idle') // idle | processing | done
  const [result, setResult] = useState(null) // { blob, url, width, height }

  const run = useCallback(async (processFn, onError) => {
    setStatus('processing')
    try {
      const { blob, width, height } = await processFn()
      setResult((previous) => {
        if (previous?.url) URL.revokeObjectURL(previous.url)
        return { blob, url: URL.createObjectURL(blob), width, height }
      })
      setStatus('done')
      return true
    } catch (error) {
      onError?.(error)
      setStatus('idle')
      return false
    }
  }, [])

  const clearResult = useCallback(() => {
    setResult((previous) => {
      if (previous?.url) URL.revokeObjectURL(previous.url)
      return null
    })
    setStatus('idle')
  }, [])

  return { status, setStatus, result, run, clearResult }
}
