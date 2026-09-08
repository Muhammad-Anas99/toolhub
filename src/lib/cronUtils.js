const FIELD_BOUNDS = [
  { name: 'minute', min: 0, max: 59 },
  { name: 'hour', min: 0, max: 23 },
  { name: 'dayOfMonth', min: 1, max: 31 },
  { name: 'month', min: 1, max: 12 },
  { name: 'dayOfWeek', min: 0, max: 7 }, // both 0 and 7 mean Sunday
]

/**
 * Parses one cron field (e.g. "*\/5", "1-5", "1,3,5", "*") into a Set of
 * every value it matches, expanded against that field's real bounds.
 */
function parseField(fieldStr, bounds) {
  const values = new Set()
  const parts = fieldStr.split(',')

  for (const part of parts) {
    let [range, step] = part.split('/')
    step = step ? parseInt(step, 10) : 1
    if (isNaN(step) || step < 1) throw new Error(`Invalid step in "${part}"`)

    let start, end
    if (range === '*') {
      start = bounds.min
      end = bounds.max
    } else if (range.includes('-')) {
      const [a, b] = range.split('-').map((n) => parseInt(n, 10))
      if (isNaN(a) || isNaN(b)) throw new Error(`Invalid range "${range}"`)
      start = a
      end = b
    } else {
      const n = parseInt(range, 10)
      if (isNaN(n)) throw new Error(`Invalid value "${range}"`)
      start = n
      end = n
    }

    if (start < bounds.min || end > bounds.max || start > end) {
      throw new Error(`Value out of range for ${bounds.name} (${bounds.min}-${bounds.max}): "${part}"`)
    }

    for (let v = start; v <= end; v += step) {
      // day-of-week: 7 is an alias for 0 (Sunday) in standard cron
      values.add(bounds.name === 'dayOfWeek' && v === 7 ? 0 : v)
    }
  }

  return values
}

/**
 * Parses a standard 5-field cron expression into a { minute, hour,
 * dayOfMonth, month, dayOfWeek } object of Sets. Throws a clear error for
 * anything that isn't standard 5-field syntax, rather than silently
 * misinterpreting a 6-field (with seconds) or other non-standard dialect.
 */
export function parseCronExpression(expression) {
  const trimmed = expression.trim()
  const fields = trimmed.split(/\s+/)

  if (fields.length !== 5) {
    throw new Error(
      `Expected exactly 5 fields (minute hour day-of-month month day-of-week), but found ${fields.length}. This tool supports standard 5-field cron syntax only, not dialects with a seconds field or other extensions.`
    )
  }

  const parsed = {}
  FIELD_BOUNDS.forEach((bounds, i) => {
    parsed[bounds.name] = parseField(fields[i], bounds)
  })
  return parsed
}

/**
 * Checks whether a given Date matches a parsed cron expression, applying
 * the well-established POSIX cron rule: when BOTH day-of-month and
 * day-of-week are restricted (not "*"), the match is an OR of the two,
 * not an AND - a common, well-documented source of confusion this tool
 * implements correctly rather than naively AND-ing every field together.
 */
export function matchesDate(parsed, date, originalFields) {
  const minute = date.getMinutes()
  const hour = date.getHours()
  const dayOfMonth = date.getDate()
  const month = date.getMonth() + 1
  const dayOfWeek = date.getDay()

  if (!parsed.minute.has(minute)) return false
  if (!parsed.hour.has(hour)) return false
  if (!parsed.month.has(month)) return false

  const domRestricted = originalFields[2] !== '*'
  const dowRestricted = originalFields[4] !== '*'

  if (domRestricted && dowRestricted) {
    return parsed.dayOfMonth.has(dayOfMonth) || parsed.dayOfWeek.has(dayOfWeek)
  }
  if (domRestricted) return parsed.dayOfMonth.has(dayOfMonth)
  if (dowRestricted) return parsed.dayOfWeek.has(dayOfWeek)
  return true
}

/**
 * Finds the next N times a cron expression will run, starting from
 * `from` (exclusive), using straightforward minute-by-minute brute-force
 * iteration rather than analytical calendar math - deliberately the
 * simpler, more robust choice, since getting this right matters far more
 * than raw speed for a tool that only needs to show a handful of upcoming
 * run times.
 */
export function getNextRuns(expression, count = 5, from = new Date(), maxIterations = 2 * 366 * 24 * 60) {
  const fields = expression.trim().split(/\s+/)
  const parsed = parseCronExpression(expression)

  const results = []
  const current = new Date(from)
  current.setSeconds(0, 0)
  current.setMinutes(current.getMinutes() + 1)

  let iterations = 0
  while (results.length < count && iterations < maxIterations) {
    if (matchesDate(parsed, current, fields)) {
      results.push(new Date(current))
    }
    current.setMinutes(current.getMinutes() + 1)
    iterations++
  }

  return results
}
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function describeTime(minuteField, hourField) {
  if (minuteField === '*' && hourField === '*') return null
  if (hourField === '*') return null
  const hour = parseInt(hourField, 10)
  const minute = minuteField === '*' ? 0 : parseInt(minuteField, 10)
  if (isNaN(hour) || isNaN(minute)) return null
  const period = hour < 12 ? 'AM' : 'PM'
  const displayHour = hour % 12 === 0 ? 12 : hour % 12
  const displayMinute = String(minute).padStart(2, '0')
  return `${displayHour}:${displayMinute} ${period}`
}

/**
 * Builds a plain-English explanation of a standard 5-field cron
 * expression. Recognizes the common, clean patterns explicitly (exact
 * time, every N minutes/hours, specific weekday) and falls back to a
 * more literal field-by-field description for anything more complex,
 * rather than guessing at a clean sentence that might misrepresent an
 * unusual combination.
 */
export function explainCron(fields) {
  const [minute, hour, dayOfMonth, month, dayOfWeek] = fields

  // Every minute
  if (minute === '*' && hour === '*' && dayOfMonth === '*' && month === '*' && dayOfWeek === '*') {
    return 'Runs every minute.'
  }

  // Every N minutes
  if (minute.startsWith('*/') && hour === '*' && dayOfMonth === '*' && month === '*' && dayOfWeek === '*') {
    const n = minute.slice(2)
    return `Runs every ${n} minutes.`
  }

  // Every N hours, at minute 0
  if (minute === '0' && hour.startsWith('*/') && dayOfMonth === '*' && month === '*' && dayOfWeek === '*') {
    const n = hour.slice(2)
    return `Runs every ${n} hours, on the hour.`
  }

  const time = describeTime(minute, hour)

  // Exact daily time
  if (time && dayOfMonth === '*' && month === '*' && dayOfWeek === '*') {
    return `Runs every day at ${time}.`
  }

  // Exact time, specific weekday(s)
  if (time && dayOfMonth === '*' && month === '*' && dayOfWeek !== '*') {
    if (dayOfWeek === '1-5') return `Runs every weekday (Monday through Friday) at ${time}.`
    if (dayOfWeek === '0,6' || dayOfWeek === '6,0') return `Runs every weekend (Saturday and Sunday) at ${time}.`
    const dayNums = dayOfWeek.split(',').map((d) => parseInt(d, 10) % 7)
    const validDays = dayNums.every((d) => !isNaN(d) && d >= 0 && d <= 6)
    if (validDays) {
      const names = dayNums.map((d) => DAY_NAMES[d]).join(', ')
      return `Runs every ${names} at ${time}.`
    }
  }

  // Exact time, specific day of month
  if (time && dayOfMonth !== '*' && month === '*' && dayOfWeek === '*') {
    const day = parseInt(dayOfMonth, 10)
    if (!isNaN(day)) {
      const suffix = day % 10 === 1 && day !== 11 ? 'st' : day % 10 === 2 && day !== 12 ? 'nd' : day % 10 === 3 && day !== 13 ? 'rd' : 'th'
      return `Runs on the ${day}${suffix} of every month at ${time}.`
    }
  }

  // Exact time, specific month and day
  if (time && dayOfMonth !== '*' && month !== '*' && dayOfWeek === '*') {
    const day = parseInt(dayOfMonth, 10)
    const monthNum = parseInt(month, 10)
    if (!isNaN(day) && !isNaN(monthNum) && monthNum >= 1 && monthNum <= 12) {
      return `Runs once a year on ${MONTH_NAMES[monthNum - 1]} ${day} at ${time}.`
    }
  }

  // Fallback: literal, field-by-field description - honest rather than
  // guessing at a clean sentence for an unusual combination
  const parts = []
  parts.push(minute === '*' ? 'any minute' : `minute ${minute}`)
  parts.push(hour === '*' ? 'any hour' : `hour ${hour}`)
  parts.push(dayOfMonth === '*' ? 'any day of the month' : `day-of-month ${dayOfMonth}`)
  parts.push(month === '*' ? 'any month' : `month ${month}`)
  parts.push(dayOfWeek === '*' ? 'any day of the week' : `day-of-week ${dayOfWeek}`)

  const domRestricted = dayOfMonth !== '*'
  const dowRestricted = dayOfWeek !== '*'
  const orNote = domRestricted && dowRestricted ? ' (day-of-month and day-of-week are combined with OR, not AND, per standard cron behavior)' : ''

  return `Runs when all of these match: ${parts.join(', ')}.${orNote}`
}
