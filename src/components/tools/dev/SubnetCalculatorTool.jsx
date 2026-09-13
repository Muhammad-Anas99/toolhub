import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { calculateSubnet } from '../../../lib/subnetUtils.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

export default function SubnetCalculatorTool({ toolSlug, toolName, category }) {
  const [ip, setIp] = useState('192.168.1.1')
  const [prefix, setPrefix] = useState('24')
  const { logDebounced } = useHistoryLogger({ toolSlug, toolName, category })

  let result = null
  let error = null
  try {
    result = calculateSubnet(ip, parseInt(prefix, 10))
    logDebounced('Subnet calculated', `${ip}/${prefix}`)
  } catch (err) {
    error = err.message
  }

  const rows = result
    ? [
        ['Network Address', result.network],
        ['Broadcast Address', result.broadcast],
        ['Subnet Mask', result.subnetMask],
        ['First Usable Host', result.firstUsable],
        ['Last Usable Host', result.lastUsable],
        ['Total Hosts', result.totalHosts.toLocaleString()],
        ['Usable Hosts', result.usableHosts.toLocaleString()],
      ]
    : []

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">IP Address</label>
          <input type="text" value={ip} onChange={(e) => setIp(e.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 font-mono text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Prefix (CIDR)</label>
          <div className="mt-1.5 flex items-center gap-1">
            <span className="text-slate-400">/</span>
            <input type="number" min="0" max="32" value={prefix} onChange={(e) => setPrefix(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
          </div>
        </div>
      </div>

      {error && <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>}

      {result && (
        <div className="card divide-y divide-slate-100 dark:divide-slate-800">
          {rows.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between gap-4 px-5 py-3">
              <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
              <p className="font-mono text-sm font-medium text-slate-900 dark:text-white">{value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

SubnetCalculatorTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
