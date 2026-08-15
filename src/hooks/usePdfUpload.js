import { useCallback, useRef, useState } from 'react'
import { validatePdfFile } from '../lib/fileValidation.js'

/**
 * Same drag/drop/validation lifecycle as useImageUpload.js, but for PDF
 * files — no image-dimension decoding step (not applicable), and
 * supports accumulating multiple files (`multiple: true`) for Merge PDF,
 * where useImageUpload's single-file model doesn't fit.
 */
export function usePdfUpload({ maxSizeMB, multiple = false } = {}) {
  const [files, setFiles] = useState([]) // always an array, even in single-file mode
  const [error, setError] = useState(null)
  const [isDragActive, setIsDragActive] = useState(false)
  const dragCounter = useRef(0)

  const reset = useCallback(() => {
    setFiles([])
    setError(null)
  }, [])

  const addFiles = useCallback(
    (candidates) => {
      setError(null)
      const validFiles = []
      for (const candidate of candidates) {
        const validation = validatePdfFile(candidate, maxSizeMB)
        if (!validation.valid) {
          setError(validation.error)
          return
        }
        validFiles.push(candidate)
      }
      setFiles((prev) => (multiple ? [...prev, ...validFiles] : validFiles.slice(0, 1)))
    },
    [maxSizeMB, multiple]
  )

  const removeFile = useCallback((index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }, [])

  const reorderFiles = useCallback((fromIndex, toIndex) => {
    setFiles((prev) => {
      const next = [...prev]
      const [moved] = next.splice(fromIndex, 1)
      next.splice(toIndex, 0, moved)
      return next
    })
  }, [])

  const handleInputChange = useCallback(
    (event) => {
      const candidates = Array.from(event.target.files || [])
      if (candidates.length > 0) addFiles(candidates)
      event.target.value = ''
    },
    [addFiles]
  )

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault()
      event.stopPropagation()
      dragCounter.current = 0
      setIsDragActive(false)
      const candidates = Array.from(event.dataTransfer.files || [])
      if (candidates.length > 0) addFiles(candidates)
    },
    [addFiles]
  )

  const handleDragEnter = useCallback((event) => {
    event.preventDefault()
    event.stopPropagation()
    dragCounter.current += 1
    setIsDragActive(true)
  }, [])

  const handleDragLeave = useCallback((event) => {
    event.preventDefault()
    event.stopPropagation()
    dragCounter.current -= 1
    if (dragCounter.current <= 0) {
      dragCounter.current = 0
      setIsDragActive(false)
    }
  }, [])

  const handleDragOver = useCallback((event) => {
    event.preventDefault()
    event.stopPropagation()
  }, [])

  return {
    files,
    file: files[0] || null, // convenience accessor for single-file tools
    error,
    isDragActive,
    setError,
    reset,
    removeFile,
    reorderFiles,
    dropZoneProps: {
      onDrop: handleDrop,
      onDragEnter: handleDragEnter,
      onDragLeave: handleDragLeave,
      onDragOver: handleDragOver,
    },
    inputProps: {
      onChange: handleInputChange,
      multiple,
    },
  }
}
