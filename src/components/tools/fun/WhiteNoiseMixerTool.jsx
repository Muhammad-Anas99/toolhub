import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlinePlay, HiOutlineStop } from 'react-icons/hi2'
import { createNoiseSource, getAudioContext, NOISE_COLORS } from '../../../lib/audioSynthUtils.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

export default function WhiteNoiseMixerTool({ toolSlug, toolName, category }) {
  const [volumes, setVolumes] = useState({ white: 0, pink: 50, brown: 0 })
  const [playing, setPlaying] = useState(false)
  const ctxRef = useRef(null)
  const nodesRef = useRef({})
  const { logNow } = useHistoryLogger({ toolSlug, toolName, category })

  function start() {
    const ctx = getAudioContext()
    ctxRef.current = ctx
    NOISE_COLORS.forEach(({ id }) => {
      const source = createNoiseSource(ctx, id)
      const gain = ctx.createGain()
      gain.gain.value = volumes[id] / 100
      source.connect(gain)
      gain.connect(ctx.destination)
      source.start()
      nodesRef.current[id] = { source, gain }
    })
    setPlaying(true)
    logNow('White noise mixer started')
  }

  function stop() {
    if (ctxRef.current) {
      ctxRef.current.close()
      ctxRef.current = null
      nodesRef.current = {}
    }
    setPlaying(false)
  }

  function updateVolume(id, value) {
    setVolumes((prev) => ({ ...prev, [id]: value }))
    if (nodesRef.current[id]) {
      nodesRef.current[id].gain.gain.value = value / 100
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {NOISE_COLORS.map(({ id, label, description }) => (
          <div key={id}>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>
              <span className="text-xs text-slate-400 dark:text-slate-500">{volumes[id]}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={volumes[id]}
              onChange={(e) => updateVolume(id, Number(e.target.value))}
              className="mt-1 w-full"
            />
            <p className="text-xs text-slate-400 dark:text-slate-500">{description}</p>
          </div>
        ))}
      </div>

      <button type="button" onClick={playing ? stop : start} className="btn-primary">
        {playing ? <HiOutlineStop className="h-4 w-4" /> : <HiOutlinePlay className="h-4 w-4" />}
        {playing ? 'Stop' : 'Play Mix'}
      </button>
    </div>
  )
}

WhiteNoiseMixerTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
