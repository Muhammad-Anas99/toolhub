import { useCallback, useRef, useState } from 'react'
import { api } from '../lib/api.js'
import { downloadBlob } from '../lib/downloadBlob.js'

/**
 * Manages the "processing result" side of every image tool: status, the
 * resulting Blob + object URL, safe cleanup on reset, logging a
 * conversion to History, and — via `download()` — the real browser
 * download plus persisting it to the user's Downloads library. This was
 * previously reimplemented with minor variations in ImageConverterTool,
 * ImageCompressor, ImageResizer, RotateFlipTool and ImageCrop — now those
 * all share this single implementation.
 *
 * History and Downloads are deliberately independent here, matching two
 * separate backend models (ConversionHistory vs Download — see
 * server/models/) and two separate events:
 *  - `run()` succeeding logs a History entry — "a conversion happened."
 *  - `download()` being called logs a Download entry — "the user actually
 *    downloaded this result." A processed-but-never-downloaded result
 *    only ever creates the first, never the second.
 *
 * `toolMeta` ({ toolSlug, toolName, category }) is optional. Only the
 * *first* successful run logs a History entry — the Image Compressor, for
 * example, silently re-runs on every quality-slider tick once a result
 * exists, and without this guard each of those would log as a separate
 * conversion. `clearResult` (starting over with a new file) resets the
 * guard so the next file logs its own entry.
 *
 * Both logging and download-persistence are best-effort and never block
 * or affect the actual file operations: the real download in
 * `download()` always fires synchronously and immediately, whether or not
 * the network calls around it succeed.
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

  /**
   * Triggers the real file download to the user's device immediately —
   * synchronous, in-memory, never dependent on a network call — then
   * separately (and only for signed-in users; the backend rejects
   * anonymous callers, which is fine, since there's no Downloads page to
   * show it in anyway) uploads the same Blob so it can be listed with a
   * real thumbnail and re-downloaded later from the Downloads dashboard.
   */
  const download = useCallback(
    (blob, filename) => {
      downloadBlob(blob, filename)

      if (toolMeta?.toolSlug && toolMeta?.toolName) {
        api.createDownload(blob, filename, toolMeta).catch(() => {})
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

  return { status, setStatus, result, run, clearResult, download }
}
