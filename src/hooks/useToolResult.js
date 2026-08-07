import { useCallback, useRef, useState } from 'react'
import { api } from '../lib/api.js'

/**
 * Manages the "processing result" side of every image tool: status,
 * the resulting Blob + object URL, and safe cleanup on reset. This was
 * previously reimplemented with minor variations in ImageConverterTool,
 * ImageCompressor, ImageResizer, RotateFlipTool and ImageCrop — now those
 * all share this single implementation.
 *
 * `toolMeta` ({ toolSlug, toolName, category }) is optional — when
 * provided, the *first* successful run logs a conversion via the API
 * (works for both signed-in and anonymous users; see
 * server/routes/historyRoutes.js). This is the single place that wires
 * every tool into Conversion History and site analytics, so no individual
 * tool page needs its own logging code.
 *
 * Only the first run per result logs — the Image Compressor, for example,
 * silently re-runs on every quality-slider tick once a result exists, and
 * without this guard each of those would log as a separate "conversion",
 * badly inflating both a user's history and site-wide analytics for what
 * is really one interaction. `clearResult` (starting over with a new
 * file) resets the guard so the next file logs its own entry.
 *
 * Logging itself is fire-and-forget: a failure here never affects the
 * tool's own success state, since it's a secondary side effect, not the
 * point of the interaction.
 */
export function useToolResult(toolMeta) {
  const [status, setStatus] = useState('idle') // idle | processing | done
  const [result, setResult] = useState(null) // { blob, url, width, height }
  const hasLoggedRef = useRef(false)

  const run = useCallback(
    async (processFn, onError) => {
      setStatus('processing')
      try {
        const { blob, width, height } = await processFn()
        setResult((previous) => {
          if (previous?.url) URL.revokeObjectURL(previous.url)
          return { blob, url: URL.createObjectURL(blob), width, height }
        })
        setStatus('done')

        if (toolMeta?.toolSlug && !hasLoggedRef.current) {
          hasLoggedRef.current = true
          api.logConversion(toolMeta).catch(() => {})
        }

        return true
      } catch (error) {
        onError?.(error)
        setStatus('idle')
        return false
      }
    },
    [toolMeta]
  )

  const clearResult = useCallback(() => {
    setResult((previous) => {
      if (previous?.url) URL.revokeObjectURL(previous.url)
      return null
    })
    setStatus('idle')
    hasLoggedRef.current = false
  }, [])

  return { status, setStatus, result, run, clearResult }
}
