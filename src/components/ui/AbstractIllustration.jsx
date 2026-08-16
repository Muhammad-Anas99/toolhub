import React from 'react'
import PropTypes from 'prop-types'

/**
 * A small set of abstract, brand-colored SVG compositions used as
 * decorative accents across the homepage — deliberately geometric/
 * abstract rather than illustrative, so there's no "AI-generated stock
 * art" look, no external image requests, and near-zero page weight.
 */
export default function AbstractIllustration({ variant = 'stack', className = '' }) {
  if (variant === 'stack') {
    return (
      <svg viewBox="0 0 320 260" className={className} aria-hidden="true">
        <rect x="40" y="130" width="180" height="110" rx="16" className="fill-brand-100 dark:fill-brand-950" transform="rotate(-6 130 185)" />
        <rect x="70" y="90" width="180" height="110" rx="16" className="fill-fuchsia-100 dark:fill-fuchsia-950" transform="rotate(4 160 145)" />
        <rect x="100" y="60" width="180" height="110" rx="16" className="fill-white shadow-xl dark:fill-slate-900" stroke="currentColor" strokeOpacity="0.08" />
        <circle cx="140" cy="100" r="10" className="fill-brand-500" />
        <rect x="160" y="93" width="90" height="7" rx="3.5" className="fill-slate-200 dark:fill-slate-700" />
        <rect x="160" y="108" width="60" height="7" rx="3.5" className="fill-slate-200 dark:fill-slate-700" />
        <rect x="130" y="135" width="120" height="7" rx="3.5" className="fill-slate-100 dark:fill-slate-800" />
        <rect x="130" y="150" width="90" height="7" rx="3.5" className="fill-slate-100 dark:fill-slate-800" />
        <circle cx="255" cy="75" r="5" className="fill-fuchsia-400" />
        <circle cx="60" cy="200" r="4" className="fill-emerald-400" />
      </svg>
    )
  }

  if (variant === 'flow') {
    return (
      <svg viewBox="0 0 320 200" className={className} aria-hidden="true">
        <circle cx="40" cy="100" r="26" className="fill-brand-50 dark:fill-brand-950" stroke="currentColor" strokeOpacity="0.1" />
        <circle cx="40" cy="100" r="10" className="fill-brand-500" />
        <path d="M66 100 H140" stroke="currentColor" strokeOpacity="0.15" strokeWidth="2" strokeDasharray="4 6" />
        <rect x="140" y="70" width="80" height="60" rx="14" className="fill-white dark:fill-slate-900" stroke="currentColor" strokeOpacity="0.1" />
        <rect x="155" y="88" width="50" height="6" rx="3" className="fill-slate-200 dark:fill-slate-700" />
        <rect x="155" y="102" width="34" height="6" rx="3" className="fill-slate-200 dark:fill-slate-700" />
        <path d="M220 100 H280" stroke="currentColor" strokeOpacity="0.15" strokeWidth="2" strokeDasharray="4 6" />
        <circle cx="280" cy="100" r="26" className="fill-emerald-50 dark:fill-emerald-950" stroke="currentColor" strokeOpacity="0.1" />
        <path d="M270 100 l7 7 13 -14" className="stroke-emerald-500" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    )
  }

  // 'grid' — a soft scatter of rounded tiles, used as a light background
  // accent rather than a standalone graphic. Colors are a static lookup
  // (not a dynamic `fill-${color}-100` string) because Tailwind only
  // includes classes it can find as literal text in the source — a
  // dynamically-built class name produces no CSS at all in production.
  const TILE_COLORS = [
    'fill-brand-100 dark:fill-brand-950',
    'fill-fuchsia-100 dark:fill-fuchsia-950',
    'fill-emerald-100 dark:fill-emerald-950',
    'fill-amber-100 dark:fill-amber-950',
    'fill-brand-100 dark:fill-brand-950',
  ]
  const TILE_POSITIONS = [
    [20, 20],
    [90, 10],
    [10, 90],
    [100, 90],
    [55, 55],
  ]

  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      {TILE_POSITIONS.map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="70" height="70" rx="18" className={TILE_COLORS[i]} opacity="0.5" />
      ))}
    </svg>
  )
}

AbstractIllustration.propTypes = {
  variant: PropTypes.oneOf(['stack', 'flow', 'grid']),
  className: PropTypes.string,
}
