/**
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

async function loadVideoElement(file) {
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
  return video
}

function recordStream(stream, { onProgress, duration, playbackRate = 1, videoBitsPerSecond } = {}) {
  const mimeType = pickSupportedMimeType()
  const options = { ...(mimeType ? { mimeType } : {}), ...(videoBitsPerSecond ? { videoBitsPerSecond } : {}) }
  const recorder = new MediaRecorder(stream, options)
  const chunks = []

  recorder.ondataavailable = (event) => {
    if (event.data.size > 0) chunks.push(event.data)
  }

  const recordingDone = new Promise((resolve, reject) => {
    recorder.onstop = resolve
    recorder.onerror = (event) => reject(event.error || new Error('Recording failed.'))
  })

  recorder.start()
  const startedAt = performance.now()
  const realDuration = duration / playbackRate

  const progressLoop = new Promise((resolve) => {
    const check = () => {
      const elapsed = (performance.now() - startedAt) / 1000
      if (onProgress) onProgress(Math.min(1, elapsed / realDuration))
      if (elapsed >= realDuration) {
        resolve()
      } else {
        requestAnimationFrame(check)
      }
    }
    check()
  })

  return { recorder, chunks, recordingDone, progressLoop, mimeType }
}

/**
 * Re-records a video at a different playback speed, and/or with its
 * audio track removed - uses video.captureStream() directly (native
 * resolution, no canvas redraw needed), the same core technique as
 * trimVideo in videoTrimUtils.js.
 */
export async function reencodeVideo(file, { playbackRate = 1, keepAudio = true, onProgress } = {}) {
  const video = await loadVideoElement(file)
  video.playbackRate = playbackRate

  const fullStream = video.captureStream()
  const tracks = keepAudio ? fullStream.getTracks() : fullStream.getVideoTracks()
  const stream = new MediaStream(tracks)

  const { recorder, chunks, recordingDone, progressLoop, mimeType } = recordStream(stream, {
    onProgress,
    duration: video.duration,
    playbackRate,
  })

  video.play()
  await progressLoop
  video.pause()
  recorder.stop()
  await recordingDone

  URL.revokeObjectURL(video.src)
  return new Blob(chunks, { type: mimeType || 'video/webm' })
}

/**
 * Re-records a video at a different resolution by drawing each frame
 * onto a canvas at the target size and capturing that canvas's stream,
 * combined with the original audio track (if kept). Used by both the
 * Video Resizer (explicit target dimensions) and Video Compressor
 * (a smaller scale as its primary size-reduction technique, since
 * MediaRecorder's bitrate hint isn't reliably honored across every
 * browser, while a genuinely smaller resolution reliably produces a
 * smaller file).
 */
export async function resizeVideo(file, { targetWidth, targetHeight, keepAudio = true, videoBitsPerSecond, onProgress }) {
  const video = await loadVideoElement(file)

  const canvas = document.createElement('canvas')
  canvas.width = targetWidth
  canvas.height = targetHeight
  const ctx = canvas.getContext('2d')

  let drawing = true
  function drawFrame() {
    if (!drawing) return
    ctx.drawImage(video, 0, 0, targetWidth, targetHeight)
    requestAnimationFrame(drawFrame)
  }

  const canvasStream = canvas.captureStream()
  const tracks = [...canvasStream.getVideoTracks()]
  if (keepAudio) {
    const audioTracks = video.captureStream().getAudioTracks()
    tracks.push(...audioTracks)
  }
  const stream = new MediaStream(tracks)

  const { recorder, chunks, recordingDone, progressLoop, mimeType } = recordStream(stream, {
    onProgress,
    duration: video.duration,
    videoBitsPerSecond,
  })

  video.play()
  drawFrame()
  await progressLoop
  drawing = false
  video.pause()
  recorder.stop()
  await recordingDone

  URL.revokeObjectURL(video.src)
  return new Blob(chunks, { type: mimeType || 'video/webm' })
}
