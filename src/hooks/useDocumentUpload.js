import { useCallback, useRef, useState } from 'react'
import { validateDocumentFile } from '../lib/fileValidation.js'

/**
 * Same drag/drop/validation lifecycle as usePdfUpload.js, but genuinely
 * generic — parameterized by acceptedTypes/acceptedExtensions instead of
 * hardcoding PDF, for the Excel/Word upload tools.
 */
export function useDocumentUpload({ acceptedTypes, acceptedExtensions, maxSizeMB } = {}) {
  const [file, setFile] = useState(null)
  const [error, setError] = useState(null)
  const [isDragActive, setIsDragActive] = useState(false)
  const dragCounter = useRef(0)

  const reset = useCallback(() => {
    setFile(null)
    setError(null)
  }, [])

  const addFile = useCallback(
    (candidate) => {
      setError(null)
      const validation = validateDocumentFile(candidate, acceptedTypes, acceptedExtensions, maxSizeMB)
      if (!validation.valid) {
        setError(validation.error)
        return
      }
      setFile(candidate)
    },
    [acceptedTypes, acceptedExtensions, maxSizeMB]
  )

  const handleInputChange = useCallback(
    (event) => {
      const candidate = event.target.files?.[0]
      if (candidate) addFile(candidate)
      event.target.value = ''
    },
    [addFile]
  )

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault()
      event.stopPropagation()
      dragCounter.current = 0
      setIsDragActive(false)
      const candidate = event.dataTransfer.files?.[0]
      if (candidate) addFile(candidate)
    },
    [addFile]
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
    file,
    error,
    isDragActive,
    setError,
    reset,
    dropZoneProps: {
      onDrop: handleDrop,
      onDragEnter: handleDragEnter,
      onDragLeave: handleDragLeave,
      onDragOver: handleDragOver,
    },
    inputProps: {
      onChange: handleInputChange,
      multiple: false,
    },
  }
}
