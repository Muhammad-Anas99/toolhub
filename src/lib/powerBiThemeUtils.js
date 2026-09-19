import { isValidHex, normalizeHex } from './colorUtils.js'

/**
 * Builds a valid Power BI theme JSON object from the given settings.
 *
 * Covers the theme properties actually documented and commonly used —
 * name, dataColors, the structural colors (background/foreground/
 * tableAccent), and the KPI colors (good/neutral/bad) — verified against
 * Microsoft's own theme documentation and real-world example theme files
 * before shipping. Deliberately does not attempt the full visualStyles
 * per-visual-type customization (borders, shadows, padding for every
 * individual visual type), which is a much larger, more error-prone
 * surface — this covers the common case every theme actually needs.
 *
 * @param {object} settings
 * @param {string} settings.name
 * @param {string[]} settings.dataColors - hex strings, ideally 6-12
 * @param {string} settings.background
 * @param {string} settings.foreground
 * @param {string} settings.tableAccent
 * @param {string} settings.good
 * @param {string} settings.neutral
 * @param {string} settings.bad
 * @returns {object} a plain object ready for JSON.stringify
 */
export function buildPowerBiTheme({
  name,
  dataColors,
  background,
  foreground,
  tableAccent,
  good,
  neutral,
  bad,
}) {
  const theme = {
    name: name?.trim() || 'Custom Theme',
    dataColors: dataColors.filter((c) => isValidHex(c)).map(normalizeHex),
  }

  // Each structural/KPI color is genuinely optional in a real Power BI
  // theme file (Power BI falls back to its own defaults for anything
  // omitted) — only including fields the user actually set keeps the
  // output theme minimal and avoids silently overriding a color the user
  // never touched with some arbitrary tool-chosen default.
  if (isValidHex(background)) theme.background = normalizeHex(background)
  if (isValidHex(foreground)) theme.foreground = normalizeHex(foreground)
  if (isValidHex(tableAccent)) theme.tableAccent = normalizeHex(tableAccent)
  if (isValidHex(good)) theme.good = normalizeHex(good)
  if (isValidHex(neutral)) theme.neutral = normalizeHex(neutral)
  if (isValidHex(bad)) theme.bad = normalizeHex(bad)

  return theme
}

export function themeToJsonString(theme) {
  return JSON.stringify(theme, null, 2)
}

export const DEFAULT_DATA_COLORS = [
  '#118DFF', '#12239E', '#E66C37', '#6B007B',
  '#E044A7', '#744EC2', '#D9B300', '#D64550',
]
