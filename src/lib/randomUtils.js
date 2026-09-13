export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function pickRandom(list) {
  if (!list || list.length === 0) return null
  return list[Math.floor(Math.random() * list.length)]
}

export function pickRandomUnique(list, count) {
  const shuffled = [...list].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, list.length))
}

const SAMPLE_WORDS = [
  'ocean', 'mountain', 'whisper', 'lantern', 'velvet', 'ember', 'cascade', 'horizon', 'thistle', 'meadow',
  'harbor', 'crimson', 'wander', 'echo', 'granite', 'willow', 'orbit', 'copper', 'drift', 'canyon',
  'twilight', 'ripple', 'juniper', 'quartz', 'signal', 'bramble', 'ivory', 'nimbus', 'ledger', 'ashen',
]

export function randomWord() {
  return pickRandom(SAMPLE_WORDS)
}
