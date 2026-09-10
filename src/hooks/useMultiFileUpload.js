import { useCallback, useRef, useState } from 'react'
import { validateDocumentFile } from '../lib/fileValidation.js'

/**
 * Same drag/drop/validation lifecycle as useDocumentUpload.js, but
 * supporting multiple accumulated files with reorder/remove, like
 * usePdfUpload.js - genuinely generic (parameterized by
 * acceptedTypes/acceptedExtensions) rather than hardcoded to one file
 * type, since usePdfUpload's multi-file support is PDF-specific and
 * useDocumentUpload's generic validation is single-file only.
 */
export function useMultiFileUpload({ acceptedTypes, acceptedExtensions, maxSizeMB } = {}) {
  const [files, setFiles] = useState([])
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
      setFiles((prev) => [...prev, ...validFiles])
    },
    [acceptedTypes, acceptedExtensions, maxSizeMB]
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
      multiple: true,
    },
  }
}
