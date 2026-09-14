import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineArrowPath } from 'react-icons/hi2'
import { BUZZWORDS, pickRandomUnique } from '../../../lib/miscToolsUtils.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

function generateCard() {
  const words = pickRandomUnique(BUZZWORDS, 24)
  words.splice(12, 0, 'FREE SPACE')
  return words
}

export default function BuzzwordBingoTool({ toolSlug, toolName, category }) {
  const [card, setCard] = useState(generateCard)
  const [marked, setMarked] = useState(() => new Set([12]))
  const { logNow } = useHistoryLogger({ toolSlug, toolName, category })

  function regenerate() {
    setCard(generateCard())
    setMarked(new Set([12]))
    logNow('Bingo card generated')
  }

  function toggleMark(index) {
    if (index === 12) return
    setMarked((prev) => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  return (
    <div className="space-y-5">
      <button type="button" onClick={regenerate} className="btn-primary">
        <HiOutlineArrowPath className="h-4 w-4" />
        New Card
      </button>
      <div className="mx-auto grid max-w-md grid-cols-5 gap-1.5">
        {card.map((word, i) => (
          <button
            key={i}
            type="button"
            onClick={() => toggleMark(i)}
            className={`flex aspect-square items-center justify-center rounded-lg p-1 text-center text-[10px] font-medium leading-tight transition-colors sm:text-xs ${
              marked.has(i)
                ? 'bg-brand-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            {word}
          </button>
        ))}
      </div>
    </div>
  )
}

BuzzwordBingoTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
