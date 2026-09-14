import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineSparkles } from 'react-icons/hi2'
import { TAROT_CARDS, pickRandom } from '../../../lib/miscToolsUtils.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

export default function TarotReaderTool({ toolSlug, toolName, category }) {
  const [card, setCard] = useState(null)
  const { logNow } = useHistoryLogger({ toolSlug, toolName, category })

  function draw() {
    const result = pickRandom(TAROT_CARDS)
    setCard(result)
    logNow('Tarot card drawn: ' + result.name)
  }

  return (
    <div className="space-y-5">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Draw a card for a moment of reflection. For entertainment purposes only.
      </p>
      <button type="button" onClick={draw} className="btn-primary">
        <HiOutlineSparkles className="h-4 w-4" />
        Draw a Card
      </button>
      {card && (
        <div className="rounded-2xl border border-violet-200 bg-violet-50 p-6 text-center dark:border-violet-900 dark:bg-violet-950">
          <p className="text-xl font-bold text-violet-700 dark:text-violet-300">{card.name}</p>
          <p className="mt-2 text-sm text-violet-600 dark:text-violet-400">{card.meaning}</p>
        </div>
      )}
    </div>
  )
}

TarotReaderTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
