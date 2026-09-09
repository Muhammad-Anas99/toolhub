/**
 * Decodes an audio file into a real AudioBuffer using the browser's own
 * Web Audio API decoder - this is what actually understands MP3, OGG,
 * AAC, and other compressed formats; this tool doesn't implement any
 * audio codec itself.
 */
export async function decodeAudioFile(file) {
  const arrayBuffer = await file.arrayBuffer()
  const audioContext = new (window.AudioContext || window.webkitAudioContext)()
  try {
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
    return audioBuffer
  } finally {
    audioContext.close()
  }
}

/**
 * Encodes an AudioBuffer as a standard 16-bit PCM WAV file. Verified
 * independently before being ported here: generated a known 440Hz test
 * tone (and a stereo test with a different frequency per channel),
 * encoded it with this exact logic, and confirmed via FFT frequency
 * analysis in an independent tool that the encoded audio genuinely
 * contains the right frequencies - not just that the file parses as a
 * structurally valid WAV.
 */
export function encodeWav(audioBuffer) {
  const numChannels = audioBuffer.numberOfChannels
  const sampleRate = audioBuffer.sampleRate
  const numSamples = audioBuffer.length
  const channelData = []
  for (let ch = 0; ch < numChannels; ch++) {
    channelData.push(audioBuffer.getChannelData(ch))
  }

  const bytesPerSample = 2
  const blockAlign = numChannels * bytesPerSample
  const dataSize = numSamples * blockAlign
  const buffer = new ArrayBuffer(44 + dataSize)
  const view = new DataView(buffer)

  function writeString(offset, str) {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i))
  }

  writeString(0, 'RIFF')
  view.setUint32(4, 36 + dataSize, true)
  writeString(8, 'WAVE')
  writeString(12, 'fmt ')
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true) // PCM
  view.setUint16(22, numChannels, true)
  view.setUint32(24, sampleRate, true)
  view.setUint32(28, sampleRate * blockAlign, true)
  view.setUint16(32, blockAlign, true)
  view.setUint16(34, 16, true)
  writeString(36, 'data')
  view.setUint32(40, dataSize, true)

  let offset = 44
  for (let i = 0; i < numSamples; i++) {
    for (let ch = 0; ch < numChannels; ch++) {
      let sample = channelData[ch][i]
      sample = Math.max(-1, Math.min(1, sample))
      const intSample = sample < 0 ? sample * 32768 : sample * 32767
      view.setInt16(offset, Math.round(intSample), true)
      offset += 2
    }
  }

  return new Blob([buffer], { type: 'audio/wav' })
}

/**
 * Slices an AudioBuffer to a start/end time range (seconds), producing
 * a genuine new AudioBuffer containing only that range - not a
 * playback-time trick, an actual copy of just the selected samples.
 */
export function trimAudioBuffer(audioBuffer, startSeconds, endSeconds) {
  const sampleRate = audioBuffer.sampleRate
  const startSample = Math.max(0, Math.floor(startSeconds * sampleRate))
  const endSample = Math.min(audioBuffer.length, Math.floor(endSeconds * sampleRate))
  const frameCount = Math.max(0, endSample - startSample)

  const audioContext = new (window.AudioContext || window.webkitAudioContext)()
  const trimmed = audioContext.createBuffer(audioBuffer.numberOfChannels, frameCount, sampleRate)

  for (let ch = 0; ch < audioBuffer.numberOfChannels; ch++) {
    const sourceData = audioBuffer.getChannelData(ch)
    const trimmedData = trimmed.getChannelData(ch)
    for (let i = 0; i < frameCount; i++) {
      trimmedData[i] = sourceData[startSample + i]
    }
  }

  audioContext.close()
  return trimmed
}

export function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${String(secs).padStart(2, '0')}`
}
