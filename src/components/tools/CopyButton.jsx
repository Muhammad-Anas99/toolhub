import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineClipboard, HiOutlineCheck } from 'react-icons/hi2'

/**
 * Copies `value` to the clipboard on click, showing a brief "Copied!"
 * confirmation. Used throughout Color Tools and Developer Tools, where
 * "copy this result" is the primary action on almost every tool.
 */
export default function CopyButton({ value, label = 'Copy', className = '' }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard API can fail (permissions, insecure context) — fail
      // quietly rather than showing an alarming error for a low-stakes
      // convenience action; the value is still visible to copy manually.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`btn-secondary text-xs ${className}`}
    >
      {copied ? (
        <>
          <HiOutlineCheck className="h-3.5 w-3.5" />
          Copied!
        </>
      ) : (
        <>
          <HiOutlineClipboard className="h-3.5 w-3.5" />
          {label}
        </>
      )}
    </button>
  )
}

CopyButton.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
}
