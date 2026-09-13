import React, { useState } from 'react'
import PropTypes from 'prop-types'
import CopyButton from '../CopyButton.jsx'
import { aesEncrypt, aesDecrypt } from '../../../lib/securityUtils.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

export default function AesEncryptionTool({ toolSlug, toolName, category }) {
  const [mode, setMode] = useState('encrypt')
  const [text, setText] = useState('')
  const [passphrase, setPassphrase] = useState('')
  const [result, setResult] = useState('')
  const [error, setError] = useState(null)
  const { logNow } = useHistoryLogger({ toolSlug, toolName, category })

  async function handleRun() {
    setError(null)
    setResult('')
    try {
      const output = mode === 'encrypt' ? await aesEncrypt(text, passphrase) : await aesDecrypt(text, passphrase)
      setResult(output)
      logNow(mode === 'encrypt' ? 'Text encrypted' : 'Text decrypted')
    } catch (err) {
      setError(mode === 'encrypt' ? 'Something went wrong while encrypting.' : 'Could not decrypt \u2014 check the passphrase and that the encrypted text is unmodified.')
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        {['encrypt', 'decrypt'].map((m) => (
          <button key={m} type="button" onClick={() => { setMode(m); setResult(''); setError(null) }} className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${mode === m ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}>
            {m}
          </button>
        ))}
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{mode === 'encrypt' ? 'Text to encrypt' : 'Encrypted text'}</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={5} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 font-mono text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Passphrase</label>
        <input type="password" value={passphrase} onChange={(e) => setPassphrase(e.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
      </div>

      <button type="button" onClick={handleRun} disabled={!text || !passphrase} className="btn-primary disabled:opacity-40">
        {mode === 'encrypt' ? 'Encrypt' : 'Decrypt'}
      </button>

      {error && <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>}

      {result && (
        <div className="card space-y-2 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Result</p>
            <CopyButton value={result} />
          </div>
          <p className="break-all font-mono text-sm text-slate-900 dark:text-white">{result}</p>
        </div>
      )}
    </div>
  )
}

AesEncryptionTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
