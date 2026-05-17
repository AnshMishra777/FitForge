import { useState, useEffect } from 'react'
import { EXERCISES, getExerciseById } from '../data/workouts'

const LS_KEY = 'ff_custom_workouts'

const loadWorkouts = () => {
  try { return JSON.parse(localStorage.getItem(LS_KEY)) || [] }
  catch { return [] }
}
const saveWorkouts = (ws) => localStorage.setItem(LS_KEY, JSON.stringify(ws))

const CAT_COLOR = {
  push:   'bg-orange-500/10 text-orange-400 border-orange-500/20',
  pull:   'bg-blue-500/10 text-blue-400 border-blue-400/20',
  legs:   'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  core:   'bg-green-500/10 text-green-400 border-green-500/20',
  cardio: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
}

// ─── Number input stepper ─────────────────────────────────────────
function Stepper({ label, value, onChange, min = 1, max = 300, step = 1 }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <label className="text-[9px] font-bold tracking-[0.12em] uppercase text-forge-dim">{label}</label>
      <div className="flex items-center gap-0.5 bg-forge-surface border border-forge-border rounded-lg overflow-hidden">
        <button
          onClick={() => onChange(Math.max(min, value - step))}
          className="w-7 h-8 text-forge-dim hover:text-forge-text hover:bg-forge-card transition-colors text-sm font-bold"
        >−</button>
        <span className="w-10 text-center font-mono text-sm text-forge-text font-bold">{value}</span>
        <button
          onClick={() => onChange(Math.min(max, value + step))}
          className="w-7 h-8 text-forge-dim hover:text-forge-text hover:bg-forge-card transition-colors text-sm font-bold"
        >+</button>
      </div>
    </div>
  )
}

// ─── Exercise Picker Modal ────────────────────────────────────────
function ExercisePicker({ onSelect, onClose, alreadySelected = [] }) {
  const [search, setSearch] = useState('')
  const [cat, setCat]       = useState('all')
  const CATS = ['all','push','pull','legs','core','cardio']

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const filtered = EXERCISES.filter(ex => {
    const matchCat    = cat === 'all' || ex.category === cat
    const matchSearch = ex.name.toLowerCase().includes(search.toLowerCase()) ||
                        ex.muscle.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="fixed inset-0 z-[300] bg-black/85 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}>
      <div
        className="w-full sm:max-w-lg bg-forge-card border border-forge-border rounded-t-2xl sm:rounded-2xl flex flex-col"
        style={{ maxHeight: '88vh', boxShadow: '0 24px 80px rgba(0,0,0,0.8)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-forge-border flex-shrink-0">
          <div>
            <h3 className="font-display text-2xl tracking-[0.04em] text-forge-text">Add Exercise</h3>
            <p className="text-xs text-forge-dim">Pick from {EXERCISES.length} exercises</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-forge-surface border border-forge-border text-forge-muted hover:text-forge-text text-sm flex items-center justify-center transition-colors">✕</button>
        </div>

        {/* Filters */}
        <div className="p-4 border-b border-forge-border flex-shrink-0 flex flex-col gap-3">
          <input
            className="w-full px-4 py-2.5 bg-forge-surface border border-forge-border rounded-lg text-sm text-forge-text outline-none focus:border-forge-orange placeholder:text-forge-dim transition-colors"
            placeholder="Search exercises or muscle groups…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            autoFocus
          />
          <div className="flex gap-2 flex-wrap">
            {CATS.map(c => (
              <button key={c}
                onClick={() => setCat(c)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold capitalize border transition-all ${
                  cat === c
                    ? 'bg-forge-orange border-forge-orange text-white'
                    : 'bg-forge-surface border-forge-border text-forge-dim hover:border-forge-borderLight hover:text-forge-muted'
                }`}
              >{c}</button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="overflow-y-auto flex-1 p-3">
          {filtered.map(ex => {
            const added = alreadySelected.includes(ex.id)
            return (
              <button
                key={ex.id}
                onClick={() => { if (!added) { onSelect(ex); onClose() } }}
                disabled={added}
                className={`w-full flex items-center gap-3 p-3 rounded-xl mb-1 text-left transition-all ${
                  added
                    ? 'opacity-40 cursor-not-allowed'
                    : 'hover:bg-forge-surface cursor-pointer'
                }`}
              >
                <div className="w-12 h-9 rounded-md overflow-hidden flex-shrink-0">
                  <img src={ex.image} alt={ex.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-forge-text truncate">{ex.name}</p>
                  <p className="text-[11px] text-forge-dim truncate">{ex.muscle}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${CAT_COLOR[ex.category]}`}>
                    {ex.category}
                  </span>
                  {added
                    ? <span className="text-green-400 text-sm">✓</span>
                    : <span className="text-forge-orange text-lg font-bold">+</span>
                  }
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ─── Single exercise row in builder ──────────────────────────────
function ExerciseRow({ item, index, total, onChange, onRemove, onMoveUp, onMoveDown }) {
  const exercise = getExerciseById(item.exerciseId)
  if (!exercise) return null

  return (
    <div className="bg-forge-card border border-forge-border rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
      {/* Index + image + name */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <span className="font-mono text-[10px] text-forge-dim font-bold w-5 flex-shrink-0">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="w-12 h-9 rounded-md overflow-hidden flex-shrink-0">
          <img src={exercise.image} alt={exercise.name} className="w-full h-full object-cover" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-forge-text truncate">{exercise.name}</p>
          <p className="text-[10px] text-forge-dim truncate">{exercise.muscle}</p>
        </div>
      </div>

      {/* Steppers */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <Stepper label="Sets" value={item.sets} onChange={v => onChange({ sets: v })} min={1} max={10} />
        <Stepper
          label={item.isTime ? 'Secs' : 'Reps'}
          value={item.isTime ? item.duration : item.reps}
          onChange={v => onChange(item.isTime ? { duration: v } : { reps: v })}
          min={1} max={300}
        />
        <Stepper label="Rest (s)" value={item.rest} onChange={v => onChange({ rest: v })} min={10} max={600} step={10} />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <button onClick={onMoveUp}   disabled={index === 0}         className="w-7 h-7 rounded-lg border border-forge-border text-forge-dim hover:text-forge-text hover:border-forge-borderLight disabled:opacity-20 text-xs transition-colors flex items-center justify-center">↑</button>
        <button onClick={onMoveDown} disabled={index === total - 1} className="w-7 h-7 rounded-lg border border-forge-border text-forge-dim hover:text-forge-text hover:border-forge-borderLight disabled:opacity-20 text-xs transition-colors flex items-center justify-center">↓</button>
        <button onClick={onRemove}                                  className="w-7 h-7 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 text-xs transition-colors flex items-center justify-center">✕</button>
      </div>
    </div>
  )
}

// ─── Workout card in list view ────────────────────────────────────
function WorkoutCard({ workout, onEdit, onDelete, onStart }) {
  const totalSets = workout.exercises.reduce((s, e) => s + (e.sets || 0), 0)

  return (
    <div className="bg-forge-card border border-forge-border rounded-xl p-5 flex flex-col gap-4 hover:border-forge-borderLight transition-all">
      {/* Title row */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="font-display text-2xl tracking-wider text-forge-text leading-tight">{workout.name}</h3>
          {workout.description && (
            <p className="text-xs text-forge-dim mt-1 line-clamp-1">{workout.description}</p>
          )}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button onClick={onEdit}   className="px-3 py-1.5 rounded-lg border border-forge-border text-forge-muted text-xs font-bold hover:text-forge-text hover:border-forge-borderLight transition-colors">Edit</button>
          <button onClick={onDelete} className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold hover:bg-red-500/20 transition-colors">Delete</button>
        </div>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-4 text-[11px] text-forge-dim">
        <span>💪 {workout.exercises.length} exercises</span>
        <span>📋 {totalSets} total sets</span>
        {workout.goal && <span>🎯 {workout.goal}</span>}
      </div>

      {/* Exercise chips */}
      <div className="flex gap-2 flex-wrap">
        {workout.exercises.slice(0, 5).map((ex, i) => {
          const exercise = getExerciseById(ex.exerciseId)
          return exercise ? (
            <span key={i} className="text-[10px] font-semibold text-forge-muted bg-forge-surface border border-forge-border px-2.5 py-1 rounded-lg">
              {exercise.name}
            </span>
          ) : null
        })}
        {workout.exercises.length > 5 && (
          <span className="text-[10px] font-semibold text-forge-dim bg-forge-surface border border-forge-border px-2.5 py-1 rounded-lg">
            +{workout.exercises.length - 5} more
          </span>
        )}
      </div>

      {/* Start button */}
      <button
        onClick={onStart}
        className="w-full py-2.5 rounded-xl bg-forge-orange text-white text-sm font-bold hover:bg-orange-500 transition-all shadow-[0_2px_16px_rgba(255,90,31,0.2)] hover:shadow-[0_4px_24px_rgba(255,90,31,0.35)] active:scale-[0.98]"
      >
        ▶ Start Workout
      </button>
    </div>
  )
}

// ─── Live Session Tracker ─────────────────────────────────────────
function LiveSession({ workout, onEnd }) {
  const [exIdx, setExIdx]   = useState(0)
  const [setIdx, setSetIdx] = useState(1)
  const [done, setDone]     = useState({})
  const [resting, setResting]         = useState(false)
  const [restCountdown, setRestCountdown] = useState(0)

  const total    = workout.exercises.length
  const current  = workout.exercises[exIdx]
  const exercise = current ? getExerciseById(current.exerciseId) : null
  const progress = total > 0 ? (exIdx / total) * 100 : 100

  useEffect(() => {
    if (!resting) return
    setRestCountdown(current?.rest || 60)
    const iv = setInterval(() => {
      setRestCountdown(c => {
        if (c <= 1) { clearInterval(iv); setResting(false); return 0 }
        return c - 1
      })
    }, 1000)
    return () => clearInterval(iv)
  }, [resting])

  const markSet = () => {
    const key = `${exIdx}-${setIdx}`
    setDone(d => ({ ...d, [key]: true }))

    const moreSets = setIdx < (current?.sets || 1)
    const moreEx   = exIdx < total - 1

    if (moreSets) {
      setSetIdx(s => s + 1)
      setResting(true)
    } else if (moreEx) {
      setExIdx(i => i + 1)
      setSetIdx(1)
      setResting(true)
    } else {
      setExIdx(total)
    }
  }

  // Completion screen
  if (!exercise || exIdx >= total) {
    return (
      <div className="max-w-md mx-auto text-center py-20 px-4">
        <div className="text-7xl mb-6 animate-bounce">🏆</div>
        <h2 className="font-display text-5xl tracking-tight text-green-400 mb-3">SESSION DONE!</h2>
        <p className="text-forge-muted mb-2">You crushed <span className="text-forge-text font-bold">{workout.name}</span></p>
        <p className="text-forge-dim text-sm mb-8">{total} exercises completed. Rest, recover, repeat.</p>
        <button onClick={onEnd} className="px-8 py-3.5 bg-forge-orange text-white font-bold rounded-xl text-base hover:bg-orange-500 transition-all shadow-[0_4px_24px_rgba(255,90,31,0.3)]">
          Finish →
        </button>
      </div>
    )
  }

  const completedSetsArr = Array.from({ length: current.sets }, (_, i) =>
    !!done[`${exIdx}-${i + 1}`]
  )

  return (
    <div className="max-w-xl mx-auto px-4 py-6">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-forge-dim mb-1.5">
          <span>Exercise {exIdx + 1} of {total}</span>
          <span className="text-forge-orange font-bold">{Math.round(progress)}% done</span>
        </div>
        <div className="h-1.5 bg-forge-surface rounded-full overflow-hidden">
          <div
            className="h-full bg-forge-orange rounded-full transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Current exercise card */}
      <div className="bg-forge-card border border-forge-orange/30 rounded-2xl overflow-hidden mb-4 shadow-[0_4px_32px_rgba(255,90,31,0.1)]">
        <div className="relative h-52">
          <img src={exercise.image} alt={exercise.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
            <div>
              <p className="font-display text-3xl tracking-wider text-white leading-none">{exercise.name}</p>
              <p className="text-white/60 text-xs mt-1">{exercise.muscle}</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-2xl font-bold text-forge-orange">
                {setIdx}/{current.sets}
              </p>
              <p className="text-white/50 text-xs">sets</p>
            </div>
          </div>
        </div>

        <div className="p-5">
          {/* Target */}
          <div className="flex items-center gap-3 mb-5">
            {[
              ['Target', current.isTime ? `${current.duration}s` : `${current.reps} reps`],
              ['Rest', `${current.rest || 60}s`],
              ['Remaining', `${current.sets - setIdx + 1} sets`],
            ].map(([label, val]) => (
              <div key={label} className="flex-1 bg-forge-surface border border-forge-border rounded-xl p-3 text-center">
                <p className="font-mono text-lg font-bold text-forge-orange">{val}</p>
                <p className="text-[10px] text-forge-dim uppercase tracking-wider mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* Set dots */}
          <div className="flex gap-2 mb-5">
            {completedSetsArr.map((c, i) => (
              <div key={i} className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                c ? 'bg-green-500' : (i + 1 === setIdx ? 'bg-forge-orange animate-pulse' : 'bg-forge-surface')
              }`} />
            ))}
          </div>

          {/* Action */}
          {resting ? (
            <div className="text-center">
              <p className="text-yellow-400 font-bold mb-1">
                ⏱ Resting… {restCountdown}s
              </p>
              <div className="w-full h-1 bg-forge-surface rounded-full mb-3">
                <div
                  className="h-full bg-yellow-400 rounded-full transition-all duration-1000"
                  style={{ width: `${(restCountdown / (current.rest || 60)) * 100}%` }}
                />
              </div>
              <button
                onClick={() => setResting(false)}
                className="text-xs text-forge-dim hover:text-forge-muted underline transition-colors"
              >
                Skip rest →
              </button>
            </div>
          ) : (
            <button
              onClick={markSet}
              className="w-full py-4 bg-forge-orange text-white font-bold text-base rounded-xl hover:bg-orange-500 transition-all active:scale-[0.98] shadow-[0_4px_24px_rgba(255,90,31,0.3)]"
            >
              {setIdx < current.sets
                ? `✓ Complete Set ${setIdx} →`
                : exIdx < total - 1
                  ? '✓ Finish Exercise →'
                  : '🏆 Complete Workout!'
              }
            </button>
          )}
        </div>
      </div>

      {/* Form cues */}
      <div className="bg-forge-card border border-forge-border rounded-xl p-4 mb-4">
        <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-forge-dim mb-3">Form Cues</p>
        {exercise.cues.map((cue, i) => (
          <div key={i} className="flex gap-2.5 mb-2 last:mb-0">
            <span className="font-mono text-[10px] text-forge-orange font-bold mt-0.5 flex-shrink-0">
              {String(i+1).padStart(2,'0')}
            </span>
            <p className="text-xs text-forge-muted leading-relaxed">{cue}</p>
          </div>
        ))}
      </div>

      <button onClick={onEnd} className="w-full py-2.5 rounded-xl border border-forge-border text-forge-dim text-sm font-bold hover:border-forge-borderLight hover:text-forge-muted transition-colors">
        End Session Early
      </button>
    </div>
  )
}

// ─── Workout Builder / Editor ─────────────────────────────────────
function WorkoutBuilder({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || {
    name: '', description: '', goal: '', exercises: []
  })
  const [showPicker, setShowPicker] = useState(false)

  const addExercise = (ex) => {
    setForm(f => ({
      ...f,
      exercises: [...f.exercises, {
        exerciseId: ex.id,
        sets:     ex.defaultSets || 3,
        reps:     ex.defaultReps || 10,
        isTime:   !!ex.isTime,
        duration: ex.duration || 30,
        rest:     ex.rest || 60,
      }]
    }))
  }

  const updateEx = (i, changes) =>
    setForm(f => ({
      ...f,
      exercises: f.exercises.map((ex, idx) => idx === i ? { ...ex, ...changes } : ex)
    }))

  const removeEx = (i) =>
    setForm(f => ({ ...f, exercises: f.exercises.filter((_, idx) => idx !== i) }))

  const moveEx = (i, dir) =>
    setForm(f => {
      const arr = [...f.exercises]
      const j   = i + dir
      if (j < 0 || j >= arr.length) return f
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
      return { ...f, exercises: arr }
    })

  const canSave = form.name.trim().length > 0 && form.exercises.length > 0
  const alreadyIds = form.exercises.map(e => e.exerciseId)

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={onCancel}
          className="flex items-center gap-1.5 text-sm text-forge-muted hover:text-forge-text font-semibold transition-colors"
        >← Back</button>
        <span className="text-forge-border">|</span>
        <h1 className="font-display text-3xl tracking-wider text-forge-text">
          {initial ? 'Edit Workout' : 'New Workout'}
        </h1>
      </div>

      {/* Workout meta */}
      <div className="bg-forge-card border border-forge-border rounded-xl p-5 mb-5">
        <h2 className="text-[10px] font-bold tracking-[0.12em] uppercase text-forge-dim mb-4">Workout Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-[10px] font-bold tracking-[0.1em] uppercase text-forge-muted mb-1.5">
              Workout Name *
            </label>
            <input
              className="w-full px-3.5 py-2.5 bg-forge-surface border border-forge-border rounded-lg text-sm text-forge-text outline-none focus:border-forge-orange transition-colors placeholder:text-forge-dim"
              placeholder="e.g. Monday Push Day"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold tracking-[0.1em] uppercase text-forge-muted mb-1.5">
              Goal (optional)
            </label>
            <input
              className="w-full px-3.5 py-2.5 bg-forge-surface border border-forge-border rounded-lg text-sm text-forge-text outline-none focus:border-forge-orange transition-colors placeholder:text-forge-dim"
              placeholder="e.g. Muscle gain, Fat loss"
              value={form.goal}
              onChange={e => setForm(f => ({ ...f, goal: e.target.value }))}
            />
          </div>
        </div>
        <div>
          <label className="block text-[10px] font-bold tracking-[0.1em] uppercase text-forge-muted mb-1.5">
            Notes (optional)
          </label>
          <input
            className="w-full px-3.5 py-2.5 bg-forge-surface border border-forge-border rounded-lg text-sm text-forge-text outline-none focus:border-forge-orange transition-colors placeholder:text-forge-dim"
            placeholder="Any notes about this workout…"
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
          />
        </div>
      </div>

      {/* Exercises */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-display text-xl tracking-wider text-forge-text">
              Exercises{' '}
              <span className="text-forge-dim text-lg">({form.exercises.length})</span>
            </h2>
            {form.exercises.length === 0 && (
              <p className="text-xs text-forge-dim mt-0.5">Add at least one exercise to save</p>
            )}
          </div>
          <button
            onClick={() => setShowPicker(true)}
            className="px-4 py-2 bg-forge-orange text-white text-sm font-bold rounded-xl hover:bg-orange-500 transition-all shadow-[0_2px_12px_rgba(255,90,31,0.25)] flex items-center gap-1.5"
          >
            <span className="text-lg leading-none">+</span> Add Exercise
          </button>
        </div>

        {form.exercises.length === 0 ? (
          <div
            className="border-2 border-dashed border-forge-border rounded-2xl p-12 text-center cursor-pointer hover:border-forge-orange/30 transition-colors"
            onClick={() => setShowPicker(true)}
          >
            <p className="text-4xl mb-3">💪</p>
            <p className="font-display text-xl tracking-wider text-forge-dim">No exercises yet</p>
            <p className="text-xs text-forge-dim mt-2">Click to add exercises from the library</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {form.exercises.map((ex, i) => (
              <ExerciseRow
                key={`${ex.exerciseId}-${i}`}
                item={ex} index={i} total={form.exercises.length}
                onChange={ch => updateEx(i, ch)}
                onRemove={() => removeEx(i)}
                onMoveUp={() => moveEx(i, -1)}
                onMoveDown={() => moveEx(i, 1)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Save / Cancel */}
      <div className="flex gap-3">
        <button
          onClick={() => canSave && onSave(form)}
          disabled={!canSave}
          className={`flex-1 py-3.5 rounded-xl font-bold text-base transition-all ${
            canSave
              ? 'bg-forge-orange text-white hover:bg-orange-500 shadow-[0_4px_24px_rgba(255,90,31,0.25)]'
              : 'bg-forge-card text-forge-dim border border-forge-border cursor-not-allowed'
          }`}
        >
          {initial ? 'Save Changes' : 'Create Workout'}
        </button>
        <button
          onClick={onCancel}
          className="px-6 py-3.5 rounded-xl border border-forge-border text-forge-muted font-bold hover:text-forge-text hover:border-forge-borderLight transition-colors"
        >
          Cancel
        </button>
      </div>

      {showPicker && (
        <ExercisePicker
          alreadySelected={alreadyIds}
          onSelect={addExercise}
          onClose={() => setShowPicker(false)}
        />
      )}
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────
export default function CustomWorkout() {
  const [workouts, setWorkouts] = useState(loadWorkouts)
  const [mode, setMode]         = useState('list')
  const [editTarget, setEditTarget]       = useState(null)
  const [sessionTarget, setSessionTarget] = useState(null)

  useEffect(() => { saveWorkouts(workouts) }, [workouts])

  const handleSave = (form) => {
    if (editTarget) {
      setWorkouts(ws => ws.map(w => w.id === editTarget.id ? { ...form, id: editTarget.id } : w))
    } else {
      setWorkouts(ws => [...ws, { ...form, id: `cw_${Date.now()}` }])
    }
    setMode('list')
    setEditTarget(null)
  }

  const handleDelete = (id) => {
    if (!window.confirm('Delete this workout? This cannot be undone.')) return
    setWorkouts(ws => ws.filter(w => w.id !== id))
  }

  const handleEdit  = (w) => { setEditTarget(w); setMode('edit') }
  const handleStart = (w) => { setSessionTarget(w); setMode('session') }

  // ── Live Session ─────────────────────────────────────────────────
  if (mode === 'session' && sessionTarget) {
    return (
      <div className="min-h-screen bg-forge-bg">
        {/* Session header */}
        <div className="sticky top-[60px] z-10 bg-forge-bg/90 backdrop-blur border-b border-forge-border px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-xl tracking-wider text-forge-text">{sessionTarget.name}</h2>
            <span className="flex items-center gap-1.5 text-[11px] text-green-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              LIVE
            </span>
          </div>
          <button
            onClick={() => { setMode('list'); setSessionTarget(null) }}
            className="text-xs text-forge-dim hover:text-forge-muted font-semibold transition-colors"
          >
            End Session
          </button>
        </div>
        <LiveSession
          workout={sessionTarget}
          onEnd={() => { setMode('list'); setSessionTarget(null) }}
        />
      </div>
    )
  }

  // ── Builder ───────────────────────────────────────────────────────
  if (mode === 'create' || mode === 'edit') {
    return (
      <div className="min-h-screen bg-forge-bg">
        <WorkoutBuilder
          initial={editTarget}
          onSave={handleSave}
          onCancel={() => { setMode('list'); setEditTarget(null) }}
        />
      </div>
    )
  }

  // ── List view ─────────────────────────────────────────────────────
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-16">
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="font-display text-5xl sm:text-6xl tracking-tight leading-none text-forge-text mb-1">
            CUSTOM <span className="text-forge-orange">WORKOUTS</span>
          </h1>
          <p className="text-forge-dim text-sm">Build and run your own personalized training routines</p>
        </div>
        <button
          onClick={() => { setEditTarget(null); setMode('create') }}
          className="flex-shrink-0 flex items-center gap-2 px-5 py-3 bg-forge-orange text-white font-bold rounded-xl hover:bg-orange-500 transition-all shadow-[0_2px_16px_rgba(255,90,31,0.25)] text-sm"
        >
          <span className="text-lg leading-none">⊕</span> New Workout
        </button>
      </div>

      {/* Empty state */}
      {workouts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 rounded-2xl bg-forge-card border border-forge-border flex items-center justify-center text-4xl mb-6">
            🏋️
          </div>
          <h2 className="font-display text-3xl tracking-wider text-forge-dim mb-2">No workouts yet</h2>
          <p className="text-forge-dim text-sm mb-8 max-w-sm">
            Create your first custom routine tailored to your exact goals, schedule, and preferences.
          </p>
          <button
            onClick={() => setMode('create')}
            className="px-8 py-3.5 bg-forge-orange text-white font-bold rounded-xl hover:bg-orange-500 transition-all shadow-[0_4px_24px_rgba(255,90,31,0.25)] text-sm"
          >
            Create Your First Workout
          </button>
        </div>
      ) : (
        <>
          {/* Stats bar */}
          <div className="flex gap-4 mb-6">
            {[
              [`${workouts.length}`, 'Saved workouts'],
              [`${workouts.reduce((s, w) => s + w.exercises.length, 0)}`, 'Total exercises'],
              [`${workouts.reduce((s, w) => s + w.exercises.reduce((ss, e) => ss + (e.sets || 0), 0), 0)}`, 'Total sets'],
            ].map(([num, label]) => (
              <div key={label} className="bg-forge-card border border-forge-border rounded-xl px-4 py-3">
                <p className="font-mono text-lg font-bold text-forge-orange">{num}</p>
                <p className="text-[10px] text-forge-dim uppercase tracking-wider">{label}</p>
              </div>
            ))}
          </div>

          {/* Workout grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {workouts.map(w => (
              <WorkoutCard
                key={w.id}
                workout={w}
                onEdit={() => handleEdit(w)}
                onDelete={() => handleDelete(w.id)}
                onStart={() => handleStart(w)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}