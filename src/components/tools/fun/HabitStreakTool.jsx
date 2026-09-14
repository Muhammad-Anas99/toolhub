import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineCheckCircle, HiOutlinePlus, HiOutlineTrash, HiOutlineFire } from 'react-icons/hi2'
import { useHistoryLogger } from '../../../hooks/useHistoryLogger.js'

const STORAGE_KEY = 'toolhub-habit-tracker'

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

function calculateStreak(dates) {
  if (dates.length === 0) return 0
  const sorted = [...new Set(dates)].sort().reverse()
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  let streak = 0
  let expected = new Date(today)
  for (const dateStr of sorted) {
    const d = new Date(dateStr + 'T00:00:00')
    const diffDays = Math.round((expected - d) / 86400000)
    if (diffDays === 0) {
      streak++
      expected.setDate(expected.getDate() - 1)
    } else if (diffDays === 1 && streak === 0) {
      streak++
      expected = new Date(d)
      expected.setDate(expected.getDate() - 1)
    } else {
      break
    }
  }
  return streak
}

function loadHabits() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveHabits(habits) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits))
  } catch {
    // localStorage unavailable - the habit list just won't persist this session
  }
}

export default function HabitStreakTool({ toolSlug, toolName, category }) {
  const [habits, setHabits] = useState([])
  const [newHabit, setNewHabit] = useState('')
  const { logNow } = useHistoryLogger({ toolSlug, toolName, category })

  useEffect(() => {
    setHabits(loadHabits())
  }, [])

  function addHabit() {
    if (!newHabit.trim()) return
    const updated = [...habits, { id: Date.now(), name: newHabit.trim(), dates: [] }]
    setHabits(updated)
    saveHabits(updated)
    setNewHabit('')
    logNow('Habit added')
  }

  function checkIn(id) {
    const today = todayStr()
    const updated = habits.map((h) => {
      if (h.id !== id) return h
      if (h.dates.includes(today)) return h
      return { ...h, dates: [...h.dates, today] }
    })
    setHabits(updated)
    saveHabits(updated)
    logNow('Habit checked in')
  }

  function removeHabit(id) {
    const updated = habits.filter((h) => h.id !== id)
    setHabits(updated)
    saveHabits(updated)
  }

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        <input
          type="text"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addHabit()}
          placeholder="Add a new habit..."
          className="flex-1 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
        <button type="button" onClick={addHabit} className="btn-primary">
          <HiOutlinePlus className="h-4 w-4" />
          Add
        </button>
      </div>

      <div className="space-y-3">
        {habits.map((habit) => {
          const streak = calculateStreak(habit.dates)
          const checkedToday = habit.dates.includes(todayStr())
          return (
            <div key={habit.id} className="card flex items-center justify-between gap-4 p-4">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-900 dark:text-white">{habit.name}</p>
                <p className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400">
                  <HiOutlineFire className="h-3.5 w-3.5" />
                  {streak} day{streak === 1 ? '' : 's'} streak
                </p>
              </div>
              <button
                type="button"
                onClick={() => checkIn(habit.id)}
                disabled={checkedToday}
                className={`flex-shrink-0 rounded-lg px-3 py-2 text-xs font-medium ${checkedToday ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400' : 'bg-brand-600 text-white hover:bg-brand-700'}`}
              >
                <HiOutlineCheckCircle className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => removeHabit(habit.id)} className="flex-shrink-0 text-slate-300 hover:text-rose-500 dark:text-slate-600">
                <HiOutlineTrash className="h-4 w-4" />
              </button>
            </div>
          )
        })}
        {habits.length === 0 && <p className="text-center text-sm text-slate-400 dark:text-slate-500">Add a habit to start tracking your streak.</p>}
      </div>

      <p className="text-xs text-slate-400 dark:text-slate-500">
        Saved only in this browser (localStorage) \u2014 not synced across devices or accounts.
      </p>
    </div>
  )
}

HabitStreakTool.propTypes = { toolSlug: PropTypes.string, toolName: PropTypes.string, category: PropTypes.string }
