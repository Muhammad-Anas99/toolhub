import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineDocumentDuplicate, HiOutlineArrowDownTray, HiOutlineExclamationTriangle } from 'react-icons/hi2'
import { SCHEMA_TYPES, buildJsonLd, validateRequiredFields } from '../../../lib/schemaMarkupUtils.js'
import { downloadBlob } from '../../../lib/downloadBlob.js'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

export default function SchemaMarkupGeneratorTool({ toolSlug, toolName, category }) {
  const [selectedType, setSelectedType] = useState('Article')
  const [values, setValues] = useState({})
  const [copiedJson, setCopiedJson] = useState(false)
  const [copiedScript, setCopiedScript] = useState(false)
  const { logDebounced } = useHistoryLogger({ toolSlug, toolName, category })

  const type = SCHEMA_TYPES.find((t) => t.id === selectedType)
  const missingFields = validateRequiredFields(selectedType, values)

  const jsonLd = useMemo(() => {
    const result = buildJsonLd(selectedType, values)
    if (missingFields.length === 0) logDebounced('Schema markup generated')
    return result
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedType, values])

  const jsonString = JSON.stringify(jsonLd, null, 2)
  const scriptTag = `<script type="application/ld+json">\n${jsonString}\n</script>`

  function handleTypeChange(newType) {
    setSelectedType(newType)
    setValues({})
  }

  function handleFieldChange(name, value) {
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  function handleCopyJson() {
    navigator.clipboard.writeText(jsonString)
    setCopiedJson(true)
    setTimeout(() => setCopiedJson(false), 2000)
  }

  function handleCopyScript() {
    navigator.clipboard.writeText(scriptTag)
    setCopiedScript(true)
    setTimeout(() => setCopiedScript(false), 2000)
  }

  function handleDownload() {
    downloadBlob(new Blob([jsonString], { type: 'application/json' }), 'schema.json')
  }

  function handleReset() {
    setValues({})
  }

  return (
    <div className="space-y-5">
      <div>
        <label htmlFor="schema-type" className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Schema type
        </label>
        <select
          id="schema-type"
          value={selectedType}
          onChange={(event) => handleTypeChange(event.target.value)}
          className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        >
          {SCHEMA_TYPES.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      {type.note && (
        <div className="flex items-start gap-2 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:bg-amber-950 dark:text-amber-300">
          <HiOutlineExclamationTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>{type.note}</span>
        </div>
      )}

      <div className="space-y-3">
        {type.fields.map((field) => (
          <div key={field.name}>
            <label className="text-xs text-slate-500 dark:text-slate-400">
              {field.label}
              {field.required && <span className="text-red-500"> *</span>}
            </label>
            {field.isFaqList || field.isBreadcrumbList || field.isStepList ? (
              <textarea
                rows={field.isFaqList ? 5 : 3}
                value={values[field.name] || ''}
                onChange={(event) => handleFieldChange(field.name, event.target.value)}
                placeholder={
                  field.isFaqList
                    ? 'Question one?\nAnswer to question one.\n\nQuestion two?\nAnswer to question two.'
                    : field.isBreadcrumbList
                      ? 'Home\nCategory\nCurrent Page'
                      : 'Step one\nStep two\nStep three'
                }
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            ) : (
              <input
                type="text"
                value={values[field.name] || ''}
                onChange={(event) => handleFieldChange(field.name, event.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            )}
          </div>
        ))}
      </div>

      {missingFields.length > 0 && (
        <p className="text-sm text-red-600 dark:text-red-400">
          Fill in the required fields to complete this schema: {missingFields.join(', ')}.
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={handleCopyJson} className="btn-primary text-sm">
          <HiOutlineDocumentDuplicate className="h-4 w-4" />
          {copiedJson ? 'Copied!' : 'Copy JSON-LD'}
        </button>
        <button type="button" onClick={handleCopyScript} className="btn-secondary text-sm">
          <HiOutlineDocumentDuplicate className="h-4 w-4" />
          {copiedScript ? 'Copied!' : 'Copy Script Tag'}
        </button>
        <button type="button" onClick={handleDownload} className="btn-secondary text-sm">
          <HiOutlineArrowDownTray className="h-4 w-4" />
          Download .json
        </button>
        <button type="button" onClick={handleReset} className="btn-secondary text-sm">
          Reset
        </button>
      </div>

      <div className="rounded-xl bg-slate-900 p-4 dark:bg-slate-950">
        <pre className="overflow-x-auto whitespace-pre-wrap text-xs text-slate-200">
          <code>{jsonString}</code>
        </pre>
      </div>

      <div className="rounded-xl bg-slate-50 px-4 py-3 text-xs text-slate-500 dark:bg-slate-900/40 dark:text-slate-400">
        Structured data helps search engines understand your page's content, but it doesn't automatically guarantee
        a rich result or a higher ranking — eligibility for any specific search feature depends on Google's own
        requirements and the actual content of the page.
      </div>
    </div>
  )
}

SchemaMarkupGeneratorTool.propTypes = {
  toolSlug: PropTypes.string,
  toolName: PropTypes.string,
  category: PropTypes.string,
}
