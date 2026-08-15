import { useCallback, useEffect, useRef, useState } from 'react'
import { validateImageFile } from '../lib/fileValidation.js'
import { loadImage } from '../lib/imageProcessing.js'

export const MAX_BATCH_FILES = 10

/**
 * Same validation and drag/drop lifecycle as useImageUpload.js, extended
 * to hold up to MAX_BATCH_FILES images at once instead of one — each
 * entry carries its own file, preview URL, and natural dimensions,
 * independently revoked on removal so long batch sessions don't leak
 * object URLs.
 */
export function useMultiImageUpload({ acceptedTypes, maxSizeMB } = {}) {
  const [items, setItems] = useState([]) // [{ id, file, previewUrl, dimensions }]
  const [error, setError] = useState(null)
  const [isDragActive, setIsDragActive] = useState(false)
  const dragCounter = useRef(0)
  const nextId = useRef(1)

  useEffect(() => {
    return () => {
      items.forEach((item) => URL.revokeObjectURL(item.previewUrl))
    }
    // Only run on unmount — cleanup for individual removals happens inline.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const reset = useCallback(() => {
    setItems((prev) => {
      prev.forEach((item) => URL.revokeObjectURL(item.previewUrl))
      return []
    })
    setError(null)
  }, [])

  const removeItem = useCallback((id) => {
    setItems((prev) => {
      const target = prev.find((item) => item.id === id)
      if (target) URL.revokeObjectURL(target.previewUrl)
      return prev.filter((item) => item.id !== id)
    })
  }, [])

  const addFiles = useCallback(
    async (candidates) => {
      setError(null)

      setItems((currentItems) => {
        const availableSlots = MAX_BATCH_FILES - currentItems.length
        if (availableSlots <= 0) {
          setError(`You can add up to ${MAX_BATCH_FILES} images at a time.`)
          return currentItems
        }
        return currentItems
      })

      const results = []
      for (const candidate of Array.from(candidates).slice(0, MAX_BATCH_FILES)) {
        const validation = validateImageFile(candidate, acceptedTypes, maxSizeMB)
        if (!validation.valid) {
          setError(validation.error)
          continue
        }
        try {
          const { url, width, height } = await loadImage(candidate)
          results.push({
            id: nextId.current++,
            file: candidate,
            previewUrl: url,
            dimensions: { width, height },
          })
        } catch (loadError) {
          setError(loadError.message || 'One of these images could not be loaded.')
        }
      }

      if (results.length > 0) {
        setItems((prev) => {
          const room = MAX_BATCH_FILES - prev.length
          const toAdd = results.slice(0, room)
          if (results.length > toAdd.length) {
            setError(`You can add up to ${MAX_BATCH_FILES} images at a time.`)
          }
          return [...prev, ...toAdd]
        })
      }
    },
    [acceptedTypes, maxSizeMB]
  )

  const handleInputChange = useCallback(
    (event) => {
      const candidates = event.target.files
      if (candidates && candidates.length > 0) addFiles(candidates)
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
      const candidates = event.dataTransfer.files
      if (candidates && candidates.length > 0) addFiles(candidates)
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
    items,
    error,
    isDragActive,
    setError,
    reset,
    removeItem,
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
