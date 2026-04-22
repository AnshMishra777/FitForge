import { useState, useEffect } from 'react'
import { PROGRAMS, EXERCISES, getExerciseById } from '../data/workouts'
import { useTimer } from '../hooks/useTimer'

const CAT_COLOR = {
  push:   'bg-orange-500/10 text-orange-400 border-orange-500/20',
  pull:   'bg-blue-500/10 text-blue-400 border-blue-400/20',
  legs:   'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  core:   'bg-green-500/10 text-green-400 border-green-500/20',
  cardio: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
}

// ─── Timer Ring Widget ────────────────────────────────────────────
function TimerRing({ initSecs, label, accentColor = '#ff5a1f' }) {
  const { formatted, isRunning, isFinished, toggle, reset, progress } = useTimer(initSecs)
  const r    = 40
  const circ = 2 * Math.PI * r
  const dash = circ - (progress / 100) * circ

  return (
    <div className="flex flex-col items-center gap-2.5 p-4 rounded-xl bg-[#101010] border border-[#1e1e1e] flex-1">
      <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#888]">{label}</p>
      <div className="relative w-[88px] h-[88px] flex items-center justify-center">
        <svg width="88" height="88" className="-rotate-90 absolute inset-0">
          <circle cx="44" cy="44" r={r} fill="none" stroke="#1e1e1e" strokeWidth="5" />
          <circle
            cx="44" cy="44" r={r} fill="none"
            stroke={isFinished ? '#22c55e' : accentColor}
            strokeWidth="5" strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={dash}
            style={{ transition: 'stroke-dashoffset 0.85s linear, stroke 0.3s' }}
          />
        </svg>
        <span className="font-mono text-lg font-bold text-[#f0f0f0] relative z-10">{formatted}</span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={toggle}
          className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
            isRunning
              ? 'bg-[#1e1e1e] text-[#888] border border-[#2a2a2a]'
              : 'bg-[#ff5a1f] text-white shadow-[0_2px_12px_rgba(255,90,31,0.3)]'
          }`}
        >
          {isRunning ? '⏸ Pause' : '▶ Start'}
        </button>
        <button
          onClick={() => reset(initSecs)}
          className="text-xs font-bold px-3 py-1.5 rounded-lg bg-transparent border border-[#1e1e1e] text-[#666] hover:text-[#f0f0f0] transition-colors"
        >↺</button>
      </div>
      {isFinished && (
        <p className="text-green-400 text-[11px] font-bold animate-pulse">✓ Complete!</p>
      )}
    </div>
  )
}

// ─── Exercise Detail Modal ────────────────────────────────────────
function ExerciseModal({ exercise, sets, reps, isTime, duration, onClose }) {
  const [completedSets, setCompletedSets] = useState([])
  const totalSets  = sets     || exercise.defaultSets
  const totalReps  = reps     || exercise.defaultReps
  const exDuration = duration || exercise.duration || 30
  const restTime   = exercise.rest || 60

  const toggleSet = (i) =>
    setCompletedSets(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i])

  const allDone = completedSets.length === totalSets

  // Lock body scroll while modal open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-[540px] bg-[#111] border border-[#222] rounded-t-2xl sm:rounded-2xl max-h-[92vh] overflow-y-auto"
        style={{ boxShadow: '0 24px 80px rgba(0,0,0,0.8)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Hero */}
        <div className="relative h-52 flex-shrink-0">
          <img src={exercise.image} alt={exercise.name} className="w-full h-full object-cover rounded-t-2xl" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-black/30 to-transparent rounded-t-2xl" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white text-sm flex items-center justify-center hover:bg-black/80 transition-colors"
          >✕</button>
          {/* Drag handle (mobile) */}
          <div className="sm:hidden absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1 bg-white/20 rounded-full" />
          <div className="absolute bottom-4 left-5">
            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${CAT_COLOR[exercise.category]} mb-2 inline-block`}>
              {exercise.category}
            </span>
            <h2 className="font-display text-3xl tracking-[0.03em] text-white leading-none">{exercise.name}</h2>
            <p className="text-white/60 text-xs mt-1">{exercise.muscle}</p>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 flex flex-col gap-5">

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              ['Sets', totalSets, ''],
              ['Reps', isTime ? `${exDuration}s` : totalReps, ''],
              ['Rest', `${restTime}s`, ''],
            ].map(([label, val]) => (
              <div key={label} className="bg-[#1a1a1a] border border-[#222] rounded-xl p-3 flex flex-col items-center gap-1">
                <span className="font-mono text-2xl font-bold text-[#ff5a1f]">{val}</span>
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#555]">{label}</span>
              </div>
            ))}
          </div>

          {/* Set tracker */}
          <div>
            <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-[#555] mb-3">
              Set Tracker
            </p>
            <div className="flex gap-2 flex-wrap">
              {Array.from({ length: totalSets }).map((_, i) => {
                const done = completedSets.includes(i)
                return (
                  <button
                    key={i}
                    onClick={() => toggleSet(i)}
                    className={`w-11 h-11 rounded-xl font-mono text-sm font-bold border transition-all duration-200 ${
                      done
                        ? 'bg-green-500 border-green-500 text-white scale-95'
                        : 'bg-[#1a1a1a] border-[#2a2a2a] text-[#555] hover:border-[#ff5a1f] hover:text-[#ff5a1f]'
                    }`}
                  >
                    {done ? '✓' : i + 1}
                  </button>
                )
              })}
            </div>
            {allDone && (
              <p className="mt-3 text-green-400 text-sm font-bold flex items-center gap-2">
                <span>✓</span> All {totalSets} sets complete!
              </p>
            )}
          </div>

          {/* Timers */}
          <div>
            <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-[#555] mb-3">Timers</p>
            <div className="flex gap-3">
              {isTime && (
                <TimerRing initSecs={exDuration} label="Exercise" />
              )}
              <TimerRing initSecs={restTime} label="Rest Timer" accentColor="#3b82f6" />
            </div>
          </div>

          {/* Form cues */}
          <div>
            <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-[#555] mb-3">
              Form Cues
            </p>
            <div className="flex flex-col gap-3">
              {exercise.cues.map((cue, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="font-mono text-[11px] text-[#ff5a1f] font-bold mt-0.5 flex-shrink-0 w-5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-sm text-[#bbb] leading-relaxed">{cue}</p>
                </div>
              ))}
            </div>
          </div>

          <button onClick={onClose} className="w-full py-3 rounded-xl border border-[#222] text-[#555] text-sm font-bold hover:text-[#f0f0f0] hover:border-[#2a2a2a] transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Program Card ─────────────────────────────────────────────────
function ProgramCard({ prog, onSelect }) {
  return (
    <div
      onClick={() => onSelect(prog)}
      className="bg-[#141414] border border-[#1e1e1e] rounded-xl p-5 cursor-pointer hover:border-[#2a2a2a] transition-all duration-200 hover:shadow-[0_4px_24px_rgba(0,0,0,0.4)] group"
    >
      <div className="flex items-start justify-between mb-3">
        <span
          className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border"
          style={{ background: `${prog.levelColor}18`, color: prog.levelColor, borderColor: `${prog.levelColor}30` }}
        >
          {prog.level}
        </span>
        <span className="text-[11px] text-[#444] font-mono">{prog.daysPerWeek}d/wk</span>
      </div>
      <h3 className="font-display text-2xl tracking-wider text-[#e8e8e8] mb-2 leading-tight group-hover:text-white transition-colors">
        {prog.name}
      </h3>
      <p className="text-xs text-[#555] leading-relaxed mb-4 line-clamp-2">{prog.description}</p>
      <div className="flex items-center justify-between">
        <div className="flex gap-3 text-[11px] text-[#444]">
          <span>⏱ {prog.duration}</span>
          <span>🎯 {prog.goal}</span>
        </div>
        <span className="text-[#ff5a1f] text-xs font-bold">View →</span>
      </div>
    </div>
  )
}

// ─── Main Workouts Page ───────────────────────────────────────────
export default function Workouts() {
  const [view, setView]                   = useState('programs')   // 'programs' | 'library'
  const [activeProgram, setActiveProgram] = useState(null)
  const [activeDay, setActiveDay]         = useState(0)
  const [selectedEx, setSelectedEx]       = useState(null)
  const [filterCat, setFilterCat]         = useState('all')
  const [search, setSearch]               = useState('')

  const CATS = ['all', 'push', 'pull', 'legs', 'core', 'cardio']

  const filteredExercises = EXERCISES.filter(ex => {
    const matchCat  = filterCat === 'all' || ex.category === filterCat
    const matchSearch = ex.name.toLowerCase().includes(search.toLowerCase()) ||
                        ex.muscle.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const daySchedule = activeProgram?.schedule[activeDay]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-16">

      {/* Page header */}
      <div className="mb-8">
        <h1 className="font-display text-5xl sm:text-6xl tracking-tight leading-none mb-1">
          WORKOUT <span className="text-[#ff5a1f]">LIBRARY</span>
        </h1>
        <p className="text-[#666] text-sm">Programs, exercises, and live session tracking</p>
      </div>

      {/* View toggle */}
      <div className="flex gap-1 bg-[#101010] border border-[#1e1e1e] rounded-xl p-1 w-fit mb-8">
        {[['programs', 'Programs'], ['library', 'Exercise Library']].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setView(key)}
            className={`px-5 py-2 rounded-lg text-sm font-bold tracking-wide transition-all duration-150 ${
              view === key
                ? 'bg-[#ff5a1f] text-white shadow-[0_2px_12px_rgba(255,90,31,0.3)]'
                : 'text-[#666] hover:text-[#f0f0f0]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ══ PROGRAMS VIEW ══════════════════════════════════════════ */}
      {view === 'programs' && !activeProgram && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {PROGRAMS.map(prog => (
            <ProgramCard
              key={prog.id}
              prog={prog}
              onSelect={(p) => { setActiveProgram(p); setActiveDay(0) }}
            />
          ))}
        </div>
      )}

      {/* Program detail */}
      {view === 'programs' && activeProgram && (
        <div>
          {/* Back + title */}
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => setActiveProgram(null)}
              className="flex items-center gap-1.5 text-sm text-[#888] hover:text-[#f0f0f0] transition-colors font-semibold"
            >
              ← Programs
            </button>
            <span className="text-[#2a2a2a]">|</span>
            <h2 className="font-display text-2xl tracking-wider text-[#e0e0e0]">{activeProgram.name}</h2>
            <span
              className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border ml-1"
              style={{ background: `${activeProgram.levelColor}18`, color: activeProgram.levelColor, borderColor: `${activeProgram.levelColor}30` }}
            >
              {activeProgram.level}
            </span>
          </div>

          {/* Day selector */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
            {activeProgram.schedule.map((day, i) => (
              <button
                key={i}
                onClick={() => setActiveDay(i)}
                className={`flex-shrink-0 flex flex-col items-center gap-1 px-4 py-3 rounded-xl border text-xs font-bold transition-all duration-150 ${
                  activeDay === i
                    ? 'bg-[#ff5a1f] border-[#ff5a1f] text-white shadow-[0_2px_16px_rgba(255,90,31,0.3)]'
                    : 'bg-[#101010] border-[#1e1e1e] text-[#555] hover:border-[#2a2a2a] hover:text-[#888]'
                }`}
              >
                <span className="font-mono text-[10px] opacity-70">D{i + 1}</span>
                <span className="whitespace-nowrap text-[11px]">{day.label}</span>
              </button>
            ))}
          </div>

          {/* Day content */}
          {daySchedule && (
            daySchedule.exercises.length === 0 ? (
              <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-16 flex flex-col items-center justify-center text-center">
                <p className="text-5xl mb-4">🛌</p>
                <p className="font-display text-3xl tracking-wider text-[#555] mb-2">Rest Day</p>
                <p className="text-[#444] text-sm">Growth happens during recovery. Embrace it.</p>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-2xl tracking-wider text-[#e0e0e0]">
                    {daySchedule.label}
                    <span className="text-[#444] text-lg ml-2">— {daySchedule.exercises.length} exercises</span>
                  </h3>
                </div>

                <div className="flex flex-col gap-3">
                  {daySchedule.exercises.map((ex, i) => {
                    const exercise = getExerciseById(ex.exerciseId)
                    if (!exercise) return null
                    return (
                      <div
                        key={i}
                        onClick={() => setSelectedEx({ exercise, ...ex })}
                        className="flex items-center gap-4 bg-[#141414] border border-[#1e1e1e] rounded-xl px-5 py-3.5 cursor-pointer hover:border-[#2a2a2a] hover:bg-[#161616] transition-all group"
                      >
                        <span className="font-mono text-[11px] text-[#2a2a2a] font-bold w-6 flex-shrink-0">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <div className="w-14 h-10 rounded-lg overflow-hidden flex-shrink-0">
                          <img src={exercise.image} alt={exercise.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-[#e0e0e0] group-hover:text-white transition-colors">{exercise.name}</p>
                          <p className="text-[11px] text-[#555] truncate">{exercise.muscle}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-mono text-sm font-bold text-[#ff5a1f]">
                            {ex.sets} × {ex.isTime ? `${ex.duration}s` : ex.reps}
                          </p>
                          <p className="text-[10px] text-[#444]">rest {exercise.rest}s</p>
                        </div>
                        <span className="text-[#2a2a2a] group-hover:text-[#ff5a1f] text-lg ml-1 transition-colors">›</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          )}
        </div>
      )}

      {/* ══ EXERCISE LIBRARY VIEW ══════════════════════════════════ */}
      {view === 'library' && (
        <div>
          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-6 items-center">
            <input
              className="h-10 px-4 bg-[#141414] border border-[#1e1e1e] rounded-lg text-sm text-[#f0f0f0] outline-none focus:border-[#ff5a1f] placeholder:text-[#444] font-body transition-colors w-full sm:w-64"
              placeholder="Search exercises or muscles…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <div className="flex gap-2 flex-wrap">
              {CATS.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilterCat(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold tracking-wide capitalize border transition-all duration-150 ${
                    filterCat === cat
                      ? 'bg-[#ff5a1f] border-[#ff5a1f] text-white'
                      : 'bg-[#101010] border-[#1e1e1e] text-[#666] hover:border-[#2a2a2a] hover:text-[#ccc]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Count */}
          <p className="text-xs text-[#555] mb-4 font-mono">
            Showing {filteredExercises.length} of {EXERCISES.length} exercises
          </p>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredExercises.map(ex => (
              <div
                key={ex.id}
                onClick={() => setSelectedEx({ exercise: ex, sets: ex.defaultSets, reps: ex.defaultReps, isTime: ex.isTime, duration: ex.duration })}
                className="bg-[#141414] border border-[#1e1e1e] rounded-xl overflow-hidden cursor-pointer group hover:border-[#2a2a2a] transition-all duration-200 hover:shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={ex.image} alt={ex.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-black/20 to-transparent" />
                  <span className={`absolute top-3 left-3 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${CAT_COLOR[ex.category]}`}>
                    {ex.category}
                  </span>
                </div>

                {/* Info */}
                <div className="p-4">
                  <p className="font-bold text-sm text-[#e0e0e0] group-hover:text-white mb-1 transition-colors">{ex.name}</p>
                  <p className="text-[11px] text-[#555] mb-3 leading-relaxed line-clamp-1">{ex.muscle}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[#666]">
                      {ex.defaultSets} sets · {ex.isTime ? `${ex.duration}s` : `${ex.defaultReps} reps`}
                    </span>
                    <span className="text-[#ff5a1f] text-xs font-bold group-hover:underline">Details →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredExercises.length === 0 && (
            <div className="text-center py-20 text-[#444]">
              <p className="text-4xl mb-3">🔍</p>
              <p className="font-display text-2xl tracking-wider">No exercises found</p>
              <p className="text-sm mt-2">Try a different search or category</p>
            </div>
          )}
        </div>
      )}

      {/* Exercise modal */}
      {selectedEx && (
        <ExerciseModal {...selectedEx} onClose={() => setSelectedEx(null)} />
      )}
    </div>
  )
}