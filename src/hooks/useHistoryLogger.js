import { useCallback, useRef } from 'react'
import { api } from '../lib/api.js'

const DEBOUNCE_MS = 1500

/**
 * Reusable history logging for tools that don't go through
 * useToolResult.js (file-in/file-out tools) — color, developer, text,
 * and generator tools that either have an explicit "do it" button, or
 * update live as the user types with no button at all.
 *
 * Two modes, matched to how each tool actually completes an action:
 *
 * - logNow(action): fires immediately. Use this behind an explicit
 *   button click (Generate, Format, Convert) — every click is a genuine,
 *   deliberate completed action worth recording, not a re-render.
 *
 * - logDebounced(action, value): for tools with no button at all that
 *   just update live as you type (HEX to RGB, Regex Tester, ...). Waits
 *   until `value` stops changing for DEBOUNCE_MS, then logs once — and
 *   only if it actually differs from the last value logged, so idle
 *   re-renders, retyping the same thing, or a slider settling back to
 *   where it started never produce duplicate entries.
 *
 *   Many tools call this from a useEffect watching a computed value that
 *   already has a real, non-empty default (a gradient with two preset
 *   stops, a calculator pre-filled with example numbers, "now" as a
 *   starting timestamp) — meaning that computed value exists the moment
 *   the component first mounts, before the user has touched anything at
 *   all. Since useEffect always runs at least once after the first
 *   render, and the very first value is never equal to the initial
 *   `null` baseline, every one of those tools was logging a "use" purely
 *   from the page being opened and left alone for DEBOUNCE_MS — a real,
 *   confirmed bug affecting every tool built this way, not a one-off.
 *   The fix: the first call ever made to logDebounced for a given tool
 *   instance only records its value as the starting baseline, silently,
 *   with no log sent — there is nothing to compare it against yet, so it
 *   cannot represent a genuine change. Only a second or later call,
 *   which can only happen because the watched value has genuinely
 *   changed from that baseline, ever reaches the actual log call.
 *
 * Never pass raw sensitive values (a generated password, a decoded
 * secret) as `value` here — logDebounced only uses it to detect change,
 * but the safest habit is to pass a non-sensitive proxy (e.g. the
 * input's length, or nothing at all via logNow) for anything sensitive.
 */
export function useHistoryLogger({ toolSlug, toolName, category }) {
  const lastLoggedValueRef = useRef(null)
  const debounceTimerRef = useRef(null)
  const hasBaselineRef = useRef(false)

  const logNow = useCallback(
    (action) => {
      api.logConversion({ toolSlug, toolName, category, action }).catch(() => {})
    },
    [toolSlug, toolName, category]
  )

  const logDebounced = useCallback(
    (action, value) => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current)
      if (value === undefined || value === null || String(value).trim() === '') return

      if (!hasBaselineRef.current) {
        hasBaselineRef.current = true
        lastLoggedValueRef.current = value
        return
      }

      debounceTimerRef.current = setTimeout(() => {
        if (value === lastLoggedValueRef.current) return
        lastLoggedValueRef.current = value
        api.logConversion({ toolSlug, toolName, category, action }).catch(() => {})
      }, DEBOUNCE_MS)
    },
    [toolSlug, toolName, category]
  )

  return { logNow, logDebounced }
}
