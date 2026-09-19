import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlinePlus, HiOutlineTrash, HiOutlineArrowPath, HiOutlineArrowDownTray } from 'react-icons/hi2'
import { isValidHex, randomHexColor } from '../../../lib/colorUtils.js'
import { buildPowerBiTheme, themeToJsonString, DEFAULT_DATA_COLORS } from '../../../lib/powerBiThemeUtils.js'
import { downloadBlob } from '../../../lib/downloadBlob.js'
import CopyButton from '../CopyButton.jsx'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

const inputClass =
  'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white'

function ColorField({ label, value, onChange }) {
  const valid = value === '' || isValidHex(value)
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400">{label}</span>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={isValidHex(value) ? value : '#ffffff'}
          onChange={(e) => onChange(e.target.value)}
          className="h-9 w-11 flex-shrink-0 cursor-pointer rounded-lg border border-slate-200 dark:border-slate-700"
          aria-label={`${label} color picker`}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#RRGGBB"
          aria-label={`${label} hex code`}
          className={`${inputClass} font-mono ${!valid ? 'border-rose-400 dark:border-rose-500' : ''}`}
        />
      </div>
    </label>
  )
}

ColorField.propTypes = { label: PropTypes.string.isRequired, value: PropTypes.string.isRequired, onChange: PropTypes.func.isRequired }

export default function PowerBiThemeGeneratorTool({ toolSlug, toolName, category }) {
  const [name, setName] = useState('My Custom Theme')
  const [dataColors, setDataColors] = useState(DEFAULT_DATA_COLORS)
  const [background, setBackground] = useState('#FFFFFF')
  const [foreground, setForeground] = useState('#323130')
  const [tableAccent, setTableAccent] = useState('#118DFF')
  const [good, setGood] = useState('#00B294')
  const [neutral, setNeutral] = useState('#D9B300')
  const [bad, setBad] = useState('#D64550')
  const { logNow } = useHistoryLogger({ toolSlug, toolName, category })

  const theme = buildPowerBiTheme({ name, dataColors, background, foreground, tableAccent, good, neutral, bad })
  const json = themeToJsonString(theme)

  function updateColor(index, value) {
    setDataColors((prev) => prev.map((c, i) => (i === index ? value : c)))
  }

  function addColor() {
    if (dataColors.length >= 20) return
    setDataColors((prev) => [...prev, randomHexColor()])
  }

  function removeColor(index) {
    setDataColors((prev) => prev.filter((_, i) => i !== index))
  }

  function randomizeColors() {
    setDataColors((prev) => prev.map(() => randomHexColor()))
  }

  function handleDownload() {
    const blob = new Blob([json], { type: 'application/json' })
    const filename = (name.trim() || 'power-bi-theme').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') + '.json'
    downloadBlob(blob, filename)
    logNow('Theme downloaded')
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-6">
        <div className="card space-y-4 p-6">
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400">Theme name</span>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} placeholder="My Custom Theme" />
          </label>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Data colors ({dataColors.length})</span>
              <div className="flex gap-2">
                <button type="button" onClick={randomizeColors} className="btn-secondary px-2 py-1 text-xs">
                  <HiOutlineArrowPath className="h-3.5 w-3.5" /> Randomize
                </button>
                <button type="button" onClick={addColor} disabled={dataColors.length >= 20} className="btn-secondary px-2 py-1 text-xs disabled:opacity-40">
                  <HiOutlinePlus className="h-3.5 w-3.5" /> Add
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {dataColors.map((color, index) => (
                <div key={index} className="flex items-center gap-1">
                  <input
                    type="color"
                    value={isValidHex(color) ? color : '#ffffff'}
                    onChange={(e) => updateColor(index, e.target.value)}
                    className="h-9 w-9 flex-shrink-0 cursor-pointer rounded-lg border border-slate-200 dark:border-slate-700"
                    aria-label={`Data color ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeColor(index)}
                    disabled={dataColors.length <= 1}
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 disabled:opacity-30 dark:text-slate-500 dark:hover:bg-rose-950 dark:hover:text-rose-400"
                    aria-label={`Remove data color ${index + 1}`}
                  >
                    <HiOutlineTrash className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card space-y-4 p-6">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Structural colors</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <ColorField label="Background" value={background} onChange={setBackground} />
            <ColorField label="Foreground" value={foreground} onChange={setForeground} />
            <ColorField label="Table accent" value={tableAccent} onChange={setTableAccent} />
          </div>
        </div>

        <div className="card space-y-4 p-6">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">KPI colors (good / neutral / bad)</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <ColorField label="Good" value={good} onChange={setGood} />
            <ColorField label="Neutral" value={neutral} onChange={setNeutral} />
            <ColorField label="Bad" value={bad} onChange={setBad} />
          </div>
        </div>
      </div>

      <div className="card flex flex-col p-6">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">theme.json</span>
          <div className="flex gap-2">
            <CopyButton value={json} label="Copy JSON" />
            <button type="button" onClick={handleDownload} className="btn-primary text-xs">
              <HiOutlineArrowDownTray className="h-3.5 w-3.5" /> Download
            </button>
          </div>
        </div>
        <pre className="flex-1 overflow-auto rounded-lg bg-slate-900 p-4 text-xs text-slate-100">
          <code>{json}</code>
        </pre>
      </div>
    </div>
  )
}

PowerBiThemeGeneratorTool.propTypes = {
  toolSlug: PropTypes.string,
  toolName: PropTypes.string,
  category: PropTypes.string,
}
