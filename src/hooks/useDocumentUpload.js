import { useCallback, useRef, useState } from 'react'
import { validateDocumentFile } from '../lib/fileValidation.js'

/**
 * Same drag/drop/validation lifecycle as usePdfUpload.js, but genuinely
 * generic — parameterized by acceptedTypes/acceptedExtensions instead of
 * hardcoding PDF, for the Excel/Word upload tools.
 *
 * `multiple` mirrors the same opt-in flag already proven in
 * usePdfUpload.js — defaults to false, so every existing caller of this
 * hook keeps its exact current single-file behavior unchanged. Only a
 * tool that explicitly passes `multiple: true` gets the `files` array
 * and batch-oriented API below; `file` (singular) still works as
 * before for single-file callers.
 */
export function useDocumentUpload({ acceptedTypes, acceptedExtensions, maxSizeMB, multiple = false } = {}) {
  const [files, setFiles] = useState([]) // always an array internally, even in single-file mode
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
        const validation = validateDocumentFile(candidate, acceptedTypes, acceptedExtensions, maxSizeMB)
        if (!validation.valid) {
          setError(validation.error)
          return
        }
        validFiles.push(candidate)
      }
      setFiles((prev) => (multiple ? [...prev, ...validFiles] : validFiles.slice(0, 1)))
    },
    [acceptedTypes, acceptedExtensions, maxSizeMB, multiple]
  )

  // Kept as a distinct single-file convenience method (rather than just
  // telling every caller to use addFiles([candidate])) so the many
  // existing single-file tools using this hook don't need to change
  // anything about how they call it.
  const addFile = useCallback((candidate) => addFiles([candidate]), [addFiles])

  const removeFile = useCallback((index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
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
    file: files[0] || null, // convenience accessor, unchanged for single-file callers
    error,
    isDragActive,
    setError,
    reset,
    addFile,
    removeFile,
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
