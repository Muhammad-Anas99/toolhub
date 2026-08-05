import { useCallback, useEffect, useRef, useState } from 'react'
import { validateImageFile } from '../lib/fileValidation.js'
import { loadImage } from '../lib/imageProcessing.js'

/**
 * Manages the full lifecycle of a single uploaded image: drag & drop, click
 * upload, validation, preview URL, natural dimensions, and cleanup. Shared
 * by every image tool so upload behavior is identical everywhere.
 */
export function useImageUpload({ acceptedTypes, maxSizeMB } = {}) {
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [dimensions, setDimensions] = useState(null)
  const [error, setError] = useState(null)
  const [isDragActive, setIsDragActive] = useState(false)
  const dragCounter = useRef(0)

  // Clean up the object URL whenever the file changes or the component unmounts.
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const reset = useCallback(() => {
    setFile(null)
    setPreviewUrl((current) => {
      if (current) URL.revokeObjectURL(current)
      return null
    })
    setDimensions(null)
    setError(null)
  }, [])

  const selectFile = useCallback(
    async (candidate) => {
      setError(null)
      const validation = validateImageFile(candidate, acceptedTypes, maxSizeMB)
      if (!validation.valid) {
        setError(validation.error)
        return
      }

      try {
        const { url, width, height } = await loadImage(candidate)
        setPreviewUrl((current) => {
          if (current) URL.revokeObjectURL(current)
          return url
        })
        setDimensions({ width, height })
        setFile(candidate)
      } catch (loadError) {
        setError(loadError.message || 'This image could not be loaded.')
      }
    },
    [acceptedTypes, maxSizeMB]
  )

  const handleInputChange = useCallback(
    (event) => {
      const candidate = event.target.files?.[0]
      if (candidate) selectFile(candidate)
      // Allow re-selecting the same file after a reset.
      event.target.value = ''
    },
    [selectFile]
  )

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault()
      event.stopPropagation()
      dragCounter.current = 0
      setIsDragActive(false)
      const candidate = event.dataTransfer.files?.[0]
      if (candidate) selectFile(candidate)
    },
    [selectFile]
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
    previewUrl,
    dimensions,
    error,
    isDragActive,
    setError,
    reset,
    selectFile,
    dropZoneProps: {
      onDrop: handleDrop,
      onDragEnter: handleDragEnter,
      onDragLeave: handleDragLeave,
      onDragOver: handleDragOver,
    },
    inputProps: {
      onChange: handleInputChange,
    },
  }
}
