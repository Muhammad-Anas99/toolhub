import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineArrowPath } from 'react-icons/hi2'
import CopyButton from '../CopyButton.jsx'
import { generatePromptIdea } from '../../../lib/miscToolsUtils.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

export default function PromptRouletteTool({ toolSlug, toolName, category }) {
  const [prompt, setPrompt] = useState(generatePromptIdea)
  const { logNow } = useHistoryLogger({ toolSlug, toolName, category })

  function spin() {
    setPrompt(generatePromptIdea())
    logNow('Prompt idea generated')
  }

  return (
    <div className="space-y-5">
      <div className="card p-6 text-center">
        <p className="text-lg font-medium text-slate-900 dark:text-white">{prompt}</p>
      </div>
      <div className="flex justify-center gap-3">
        <button type="button" onClick={spin} className="btn-primary">
          <HiOutlineArrowPath className="h-4 w-4" />
          Spin Again
        </button>
        <CopyButton value={prompt} />
      </div>
    </div>
  )
}

PromptRouletteTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
