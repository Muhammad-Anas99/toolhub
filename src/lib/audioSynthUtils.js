function getAudioContext() {
  return new (window.AudioContext || window.webkitAudioContext)()
}

/**
 * Kick drum: a low-frequency oscillator with a fast pitch drop and a
 * short volume envelope, the standard synthesis approach for a
 * percussive kick sound without needing a sample file.
 */
export function playKick(ctx) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.frequency.setValueAtTime(150, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4)
  gain.gain.setValueAtTime(1, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4)
  osc.start()
  osc.stop(ctx.currentTime + 0.4)
}

function createNoiseBuffer(ctx, durationSec) {
  const bufferSize = ctx.sampleRate * durationSec
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1
  return buffer
}

/**
 * Snare: white noise through a bandpass filter with a short envelope,
 * the standard approach for a synthesized snare sound.
 */
export function playSnare(ctx) {
  const noise = ctx.createBufferSource()
  noise.buffer = createNoiseBuffer(ctx, 0.2)
  const filter = ctx.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.value = 1800
  const gain = ctx.createGain()
  gain.gain.setValueAtTime(0.6, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2)
  noise.connect(filter)
  filter.connect(gain)
  gain.connect(ctx.destination)
  noise.start()
}

/**
 * Hi-hat: high-pass filtered noise with a very short envelope,
 * producing the characteristic short, bright "tick" sound.
 */
export function playHiHat(ctx) {
  const noise = ctx.createBufferSource()
  noise.buffer = createNoiseBuffer(ctx, 0.08)
  const filter = ctx.createBiquadFilter()
  filter.type = 'highpass'
  filter.frequency.value = 7000
  const gain = ctx.createGain()
  gain.gain.setValueAtTime(0.3, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08)
  noise.connect(filter)
  filter.connect(gain)
  gain.connect(ctx.destination)
  noise.start()
}

/**
 * Clap: three quick noise bursts layered close together, mimicking
 * the multi-hit texture of a real hand clap sample.
 */
export function playClap(ctx) {
  ;[0, 0.02, 0.04].forEach((delay) => {
    const noise = ctx.createBufferSource()
    noise.buffer = createNoiseBuffer(ctx, 0.1)
    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.value = 1200
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.5, ctx.currentTime + delay)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + delay + 0.1)
    noise.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)
    noise.start(ctx.currentTime + delay)
  })
}

export const DRUM_SOUNDS = [
  { id: 'kick', label: 'Kick', play: playKick, key: 'A' },
  { id: 'snare', label: 'Snare', play: playSnare, key: 'S' },
  { id: 'hihat', label: 'Hi-Hat', play: playHiHat, key: 'D' },
  { id: 'clap', label: 'Clap', play: playClap, key: 'F' },
]

/**
 * Buzzer: a harsh, sustained square-wave tone, the classic "wrong
 * answer" sound.
 */
export function playBuzzer(ctx) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'square'
  osc.frequency.value = 150
  osc.connect(gain)
  gain.connect(ctx.destination)
  gain.gain.setValueAtTime(0.3, ctx.currentTime)
  gain.gain.setValueAtTime(0.3, ctx.currentTime + 0.5)
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6)
  osc.start()
  osc.stop(ctx.currentTime + 0.6)
}

/**
 * Bell/ding: a clean sine tone with a long, smooth decay, the classic
 * "correct" or notification sound.
 */
export function playBell(ctx) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'sine'
  osc.frequency.value = 1200
  osc.connect(gain)
  gain.connect(ctx.destination)
  gain.gain.setValueAtTime(0.4, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.2)
  osc.start()
  osc.stop(ctx.currentTime + 1.2)
}

/**
 * Whoosh: a noise burst with a filter sweep rising in frequency,
 * producing a swooshing transition sound.
 */
export function playWhoosh(ctx) {
  const noise = ctx.createBufferSource()
  noise.buffer = createNoiseBuffer(ctx, 0.5)
  const filter = ctx.createBiquadFilter()
  filter.type = 'bandpass'
  filter.Q.value = 1
  filter.frequency.setValueAtTime(200, ctx.currentTime)
  filter.frequency.exponentialRampToValueAtTime(4000, ctx.currentTime + 0.5)
  const gain = ctx.createGain()
  gain.gain.setValueAtTime(0.4, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5)
  noise.connect(filter)
  filter.connect(gain)
  gain.connect(ctx.destination)
  noise.start()
}

/**
 * Victory chime: three ascending sine tones played in quick
 * succession, a short celebratory jingle.
 */
export function playVictory(ctx) {
  ;[523, 659, 784].forEach((freq, i) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.value = freq
    osc.connect(gain)
    gain.connect(ctx.destination)
    const start = ctx.currentTime + i * 0.12
    gain.gain.setValueAtTime(0.3, start)
    gain.gain.exponentialRampToValueAtTime(0.01, start + 0.4)
    osc.start(start)
    osc.stop(start + 0.4)
  })
}

export const SOUNDBOARD_SOUNDS = [
  { id: 'buzzer', label: 'Buzzer', play: playBuzzer, key: '1' },
  { id: 'bell', label: 'Bell', play: playBell, key: '2' },
  { id: 'whoosh', label: 'Whoosh', play: playWhoosh, key: '3' },
  { id: 'victory', label: 'Victory', play: playVictory, key: '4' },
  { id: 'kick2', label: 'Boom', play: playKick, key: '5' },
  { id: 'clap2', label: 'Applause', play: playClap, key: '6' },
]

/**
 * Generates a looping noise buffer of the given "color". White noise
 * is pure random values (equal energy per frequency). Pink noise uses
 * Paul Kellet's well-known filter approximation, weighting toward
 * lower frequencies (equal energy per octave) for a softer, rain-like
 * sound. Brown noise integrates white noise (a random walk), pushing
 * even further toward low frequencies for a deep, ocean-like rumble.
 */
export function createNoiseSource(ctx, color, durationSec = 4) {
  const bufferSize = ctx.sampleRate * durationSec
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)

  if (color === 'white') {
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1
  } else if (color === 'pink') {
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1
      b0 = 0.99886 * b0 + white * 0.0555179
      b1 = 0.99332 * b1 + white * 0.0750759
      b2 = 0.969 * b2 + white * 0.153852
      b3 = 0.8665 * b3 + white * 0.3104856
      b4 = 0.55 * b4 + white * 0.5329522
      b5 = -0.7616 * b5 - white * 0.016898
      const pink = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362
      b6 = white * 0.115926
      data[i] = pink * 0.11
    }
  } else if (color === 'brown') {
    let lastOut = 0
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1
      lastOut = (lastOut + 0.02 * white) / 1.02
      data[i] = lastOut * 3.5
    }
  }

  const source = ctx.createBufferSource()
  source.buffer = buffer
  source.loop = true
  return source
}

export const NOISE_COLORS = [
  { id: 'white', label: 'White Noise', description: 'Flat static, like an untuned radio' },
  { id: 'pink', label: 'Pink Noise', description: 'Softer, like steady rainfall' },
  { id: 'brown', label: 'Brown Noise', description: 'Deep and rumbling, like ocean waves' },
]

export { getAudioContext }
