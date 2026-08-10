import { useCallback, useRef, useState } from 'react'
import { api } from '../lib/api.js'
import { downloadBlob } from '../lib/downloadBlob.js'

/**
 * Manages the "processing result" side of every image tool: status,
 * the resulting Blob + object URL, safe cleanup on reset, and — via
 * `download()` — the real browser download plus recording that a
 * download actually happened. This was previously reimplemented with
 * minor variations in ImageConverterTool, ImageCompressor, ImageResizer,
 * RotateFlipTool and ImageCrop — now those all share this single
 * implementation.
 *
 * `toolMeta` ({ toolSlug, toolName, category }) is optional — when
 * provided, the *first* successful run logs a conversion via the API
 * (works for both signed-in and anonymous users; see
 * server/routes/historyRoutes.js). This is the single place that wires
 * every tool into Conversion History, Downloads, and site analytics, so
 * no individual tool page needs its own logging or download-tracking code.
 *
 * Only the first run per result logs — the Image Compressor, for example,
 * silently re-runs on every quality-slider tick once a result exists, and
 * without this guard each of those would log as a separate "conversion",
 * badly inflating both a user's history and site-wide analytics for what
 * is really one interaction. `clearResult` (starting over with a new
 * file) resets the guard so the next file logs its own entry.
 *
 * Logging and download-tracking are both best-effort: a failure in either
 * never affects the tool's own success state or blocks the actual file
 * download, since they're secondary side effects, not the point of the
 * interaction.
 */
export function useToolResult(toolMeta) {
  const [status, setStatus] = useState('idle') // idle | processing | done
  const [result, setResult] = useState(null) // { blob, url, width, height }
  const hasLoggedRef = useRef(false)
  // Holds the in-flight (or settled) logConversion() promise, not just its
  // eventual id — download() awaits this rather than a plain ref value, so
  // clicking Download before the log call has finished (a real possibility
  // on a slow connection) still correctly marks the right entry once it
  // resolves, instead of silently finding nothing there yet.
  const historyLogPromiseRef = useRef(null)

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
          historyLogPromiseRef.current = api.logConversion(toolMeta).catch(() => null)
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

  /**
   * Triggers the real file download immediately (no network round trip
   * involved — this is a synchronous browser action on an already-in-memory
   * Blob), then separately, asynchronously, records that the download
   * happened. The two are deliberately decoupled: the actual download to
   * the user's device never waits on — or gets blocked by — the tracking
   * call.
   */
  const download = useCallback((blob, filename) => {
    downloadBlob(blob, filename)

    if (!historyLogPromiseRef.current) return

    historyLogPromiseRef.current
      .then((response) => {
        const entryId = response?.data?._id
        if (entryId) return api.markDownloaded(entryId)
        return null
      })
      .catch(() => {})
  }, [])

  const clearResult = useCallback(() => {
    setResult((previous) => {
      if (previous?.url) URL.revokeObjectURL(previous.url)
      return null
    })
    setStatus('idle')
    hasLoggedRef.current = false
    historyLogPromiseRef.current = null
  }, [])

  return { status, setStatus, result, run, clearResult, download }
}
