import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineKey } from 'react-icons/hi2'
import CopyButton from '../CopyButton.jsx'
import { generateRsaKeyPair } from '../../../lib/securityUtils.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

export default function RsaKeyPairGeneratorTool({ toolSlug, toolName, category }) {
  const [keys, setKeys] = useState(null)
  const [loading, setLoading] = useState(false)
  const { logNow } = useHistoryLogger({ toolSlug, toolName, category })

  async function handleGenerate() {
    setLoading(true)
    const result = await generateRsaKeyPair()
    setKeys(result)
    setLoading(false)
    logNow('RSA key pair generated')
  }

  return (
    <div className="space-y-5">
      <div className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:bg-slate-900/40 dark:text-slate-300">
        Generates a real 2048-bit RSA key pair using your browser&apos;s native cryptography, entirely on your device.
      </div>
      <button type="button" onClick={handleGenerate} disabled={loading} className="btn-primary disabled:opacity-40">
        <HiOutlineKey className="h-4 w-4" />
        {loading ? 'Generating...' : 'Generate Key Pair'}
      </button>
      {keys && (
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Public Key</p>
              <CopyButton value={keys.publicKey} />
            </div>
            <pre className="mt-1.5 overflow-x-auto rounded-lg bg-slate-50 p-3 font-mono text-xs text-slate-900 dark:bg-slate-900/40 dark:text-white">{keys.publicKey}</pre>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Private Key</p>
              <CopyButton value={keys.privateKey} />
            </div>
            <pre className="mt-1.5 overflow-x-auto rounded-lg bg-slate-50 p-3 font-mono text-xs text-slate-900 dark:bg-slate-900/40 dark:text-white">{keys.privateKey}</pre>
          </div>
          <p className="text-xs text-amber-600 dark:text-amber-400">
            Keep your private key secret. Since this was generated in your browser, it exists only here \u2014 refreshing the page will lose it unless you\u2019ve saved a copy.
          </p>
        </div>
      )}
    </div>
  )
}

RsaKeyPairGeneratorTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
