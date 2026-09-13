import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import CopyButton from '../CopyButton.jsx'
import { api } from '../../../lib/api.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

export default function MyIpTool({ toolSlug, toolName, category }) {
  const [ip, setIp] = useState(null)
  const [error, setError] = useState(null)
  const { logNow } = useHistoryLogger({ toolSlug, toolName, category })

  useEffect(() => {
    api.getMyIp()
      .then(({ data }) => {
        setIp(data.ip)
        logNow('IP address checked')
      })
      .catch(() => setError('Could not determine your IP address right now.'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-col items-center gap-4 py-10">
      {error && <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>}
      {!error && !ip && <p className="text-sm text-slate-400 dark:text-slate-500">Looking up your IP address...</p>}
      {ip && (
        <>
          <p className="font-mono text-4xl font-bold text-brand-600 dark:text-brand-400">{ip}</p>
          <CopyButton value={ip} />
        </>
      )}
    </div>
  )
}

MyIpTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
