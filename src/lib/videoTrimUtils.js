/**
 * Trims a video to a start/end time range by playing it back and
 * re-recording that exact range using the browser's own MediaRecorder,
 * fed by video.captureStream(). The browser's built-in encoder handles
 * the actual video/audio codec work - this only controls playback
 * timing and when to start/stop recording.
 *
 * A real, honest limitation worth stating directly: because this
 * genuinely plays through the selected range to capture it, trimming
 * takes about as long as the clip's own duration - a 10-second clip
 * takes roughly 10 real seconds, not an instant operation like the
 * audio trimmer (which copies samples directly, with no playback
 * involved).
 *
 * Picks whichever MIME type the browser's MediaRecorder actually
 * supports, tried in order of preference, rather than hardcoding one
 * that might not be available.
 */
function pickSupportedMimeType() {
  const candidates = ['video/webm;codecs=vp9,opus', 'video/webm;codecs=vp8,opus', 'video/webm']
  for (const type of candidates) {
    if (window.MediaRecorder && MediaRecorder.isTypeSupported(type)) return type
  }
  return ''
}

export async function trimVideo(file, { startTime, endTime, onProgress }) {
  const video = document.createElement('video')
  video.src = URL.createObjectURL(file)
  video.muted = false

  await new Promise((resolve, reject) => {
    video.onloadedmetadata = resolve
    video.onerror = () => reject(new Error('Could not read this video file.'))
  })

  if (typeof video.captureStream !== 'function') {
    URL.revokeObjectURL(video.src)
    throw new Error('Your browser doesn\u2019t support capturing video playback, which this tool needs.')
  }

  await new Promise((resolve) => {
    video.currentTime = startTime
    video.onseeked = resolve
  })

  const stream = video.captureStream()
  const mimeType = pickSupportedMimeType()
  const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined)
  const chunks = []

  recorder.ondataavailable = (event) => {
    if (event.data.size > 0) chunks.push(event.data)
  }

  const recordingDone = new Promise((resolve, reject) => {
    recorder.onstop = resolve
    recorder.onerror = (event) => reject(event.error || new Error('Recording failed.'))
  })

  recorder.start()
  video.play()

  const duration = endTime - startTime
  const startedAt = performance.now()

  await new Promise((resolve) => {
    const check = () => {
      const elapsed = (performance.now() - startedAt) / 1000
      if (onProgress) onProgress(Math.min(1, elapsed / duration))
      if (video.currentTime >= endTime || elapsed >= duration) {
        resolve()
      } else {
        requestAnimationFrame(check)
      }
    }
    check()
  })

  video.pause()
  recorder.stop()
  await recordingDone

  URL.revokeObjectURL(video.src)

  return new Blob(chunks, { type: mimeType || 'video/webm' })
}
