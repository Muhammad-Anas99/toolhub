import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineArrowPath, HiOutlineEye } from 'react-icons/hi2'
import { TRIVIA_CARDS, pickRandom } from '../../../lib/miscToolsUtils.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

export default function TriviaFlashcardsTool({ toolSlug, toolName, category }) {
  const [card, setCard] = useState(() => pickRandom(TRIVIA_CARDS))
  const [revealed, setRevealed] = useState(false)
  const { logNow } = useHistoryLogger({ toolSlug, toolName, category })

  function next() {
    setCard(pickRandom(TRIVIA_CARDS))
    setRevealed(false)
    logNow('Trivia card drawn')
  }

  return (
    <div className="space-y-5">
      <button
        type="button"
        onClick={() => setRevealed((r) => !r)}
        className="flex min-h-[10rem] w-full flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900"
      >
        {!revealed ? (
          <>
            <p className="text-lg font-medium text-slate-900 dark:text-white">{card.q}</p>
            <span className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
              <HiOutlineEye className="h-4 w-4" />
              Click to reveal answer
            </span>
          </>
        ) : (
          <p className="text-2xl font-bold text-brand-600 dark:text-brand-400">{card.a}</p>
        )}
      </button>
      <button type="button" onClick={next} className="btn-primary">
        <HiOutlineArrowPath className="h-4 w-4" />
        Next Card
      </button>
    </div>
  )
}

TriviaFlashcardsTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
