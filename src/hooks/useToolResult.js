import { useCallback, useRef, useState } from 'react'
import { api } from '../lib/api.js'
import { downloadBlob } from '../lib/downloadBlob.js'
import { trySaveDownload } from '../lib/downloadSaver.js'

const EXTENSION_BY_MIME = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'application/pdf': 'pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'application/zip': 'zip',
}

function guessFilename(blob, toolSlug) {
  const extension = EXTENSION_BY_MIME[blob.type] || 'bin'
  return `${toolSlug}-result.${extension}`
}

/**
 * Manages the "processing result" side of every image tool: status, the
 * resulting Blob + object URL, safe cleanup on reset, logging a
 * conversion to History, saving a copy to Downloads for signed-in users
 * (see src/lib/downloadSaver.js), and the real file download. This was
 * previously reimplemented with minor variations across several tool
 * files before being consolidated here, and later into the shared
 * UnifiedImageTool used by every format/resize/rotate/flip tool —
 * ImageCrop is the one exception, since its interactive crop-selection
 * UI doesn't fit that shared multi-file pattern.
 *
 * `toolMeta` ({ toolSlug, toolName, category }) is optional — when
 * provided, the *first* successful run logs a conversion via the API
 * (works for both signed-in and anonymous users; see
 * server/routes/historyRoutes.js) and, for signed-in users only, saves
 * the result to Downloads. Only the first run per result does either —
 * the Image Compressor, for example, silently re-runs on every
 * quality-slider tick once a result exists, and without this guard each
 * of those would log/save separately. `clearResult` (starting over with
 * a new file) resets the guard so the next file logs/saves its own
 * entry.
 *
 * Both are best-effort and never block or affect the actual file
 * download in `download()` — they're secondary side effects, not the
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
          trySaveDownload({ blob, filename: guessFilename(blob, toolMeta.toolSlug), ...toolMeta })
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

  const download = useCallback((blob, filename) => {
    downloadBlob(blob, filename)
  }, [])

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
