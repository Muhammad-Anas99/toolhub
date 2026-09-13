import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

export default function CoinFlipperTool({ toolSlug, toolName, category }) {
  const [result, setResult] = useState(null)
  const [flipping, setFlipping] = useState(false)
  const { logNow } = useHistoryLogger({ toolSlug, toolName, category })

  function flip() {
    setFlipping(true)
    setTimeout(() => {
      const outcome = Math.random() < 0.5 ? 'Heads' : 'Tails'
      setResult(outcome)
      setFlipping(false)
      logNow('Coin flipped: ' + outcome)
    }, 600)
  }

  return (
    <div className="flex flex-col items-center gap-6 py-6">
      <div
        className={`flex h-32 w-32 items-center justify-center rounded-full border-4 border-amber-400 bg-gradient-to-br from-amber-300 to-amber-500 text-lg font-bold text-white shadow-lg transition-transform duration-500 ${flipping ? 'animate-spin' : ''}`}
      >
        {flipping ? '...' : result || '?'}
      </div>
      <button type="button" onClick={flip} disabled={flipping} className="btn-primary disabled:opacity-40">
        {flipping ? 'Flipping...' : 'Flip Coin'}
      </button>
    </div>
  )
}

CoinFlipperTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
