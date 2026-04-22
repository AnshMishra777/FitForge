import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { PROGRAMS, EXERCISES, getExerciseById } from '../data/workouts'

const TIPS = [
  'Progressive overload is the single most important variable for long-term growth.',
  'Consume 0.7–1g of protein per pound of bodyweight to maximize muscle protein synthesis.',
  'Sleep 7–9 hours nightly — growth hormone is primarily released during deep sleep.',
  'Allow 48 hours of recovery before training the same muscle group again.',
  'Compound movements build more mass and strength than isolation exercises.',
  'Track your workouts — progress you can measure is progress you can improve.',
  'Deload every 4–6 weeks to prevent overtraining and stimulate continued adaptation.',
]

const CATEGORY_COLORS = {
  push: 'text-forge-orange border-forge-orange/30 bg-forge-orange/5',
  pull: 'text-blue-400 border-blue-400/30 bg-blue-400/5',
  legs: 'text-forge-yellow border-forge-yellow/30 bg-forge-yellow/5',
  core: 'text-forge-green border-forge-green/30 bg-forge-green/5',
  cardio: 'text-purple-400 border-purple-400/30 bg-purple-400/5',
}

export default function Dashboard() {
  const { user } = useAuth()
  const today   = new Date()
  const hour    = today.getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
  const tip      = TIPS[today.getDate() % TIPS.length]
  const firstName = user?.name?.split(' ')[0] || 'Athlete'

  const [activeProgramId, setActiveProgramId] = useState(
    () => localStorage.getItem('ff_active_program') || null
  )

  const selectProgram = (id) => {
    localStorage.setItem('ff_active_program', id)
    setActiveProgramId(id)
  }

  const clearProgram = () => {
    localStorage.removeItem('ff_active_program')
    setActiveProgramId(null)
  }

  const activeProgram  = PROGRAMS.find(p => p.id === activeProgramId)
  const todayDayIdx    = (today.getDay() + 6) % 7   // Mon=0
  const todaySchedule  = activeProgram?.schedule[todayDayIdx % activeProgram.schedule.length]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-12">

      {/* ── Header ── */}
      <div className="mb-8 animate-fade-up">
        <p className="text-forge-dim text-xs font-mono tracking-widest uppercase mb-1">
          {today.toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' })}
        </p>
        <h1 className="font-display text-white text-5xl sm:text-6xl tracking-tight leading-none">
          {greeting},{' '}
          <span className="text-forge-orange">{firstName}</span>
        </h1>
      </div>

      {/* ── Tip Banner ── */}
      <div className="mb-8 p-4 rounded-xl border border-forge-yellow/20
                      bg-gradient-to-r from-forge-card to-forge-yellow/5
                      flex items-start gap-3 animate-fade-up delay-75">
        <span className="text-forge-yellow text-lg flex-shrink-0 mt-0.5">◈</span>
        <div>
          <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-forge-yellow mb-1">
            Tip of the Day
          </p>
          <p className="text-sm text-forge-muted/90 leading-relaxed">{tip}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* ── Left Column ── */}
        <div className="xl:col-span-2 flex flex-col gap-6">

          {/* Today's workout */}
          {activeProgram && todaySchedule && (
            <div className="animate-fade-up delay-150">
              <div className="flex items-center justify-between mb-3">
                <h2 className="ff-section-title text-white font-bold text-xl">Today's Session</h2>
                <span className="ff-badge-orange text-white font-bold text-xl">{activeProgram.name}</span>
              </div>

              {todaySchedule.exercises.length === 0 ? (
                <div className="ff-card flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-5xl mb-3">🛌</p>
                  <p className="font-display text-2xl tracking-wider text-forge-muted">Rest Day</p>
                  <p className="text-xs text-forge-dim mt-2">Recovery is where the gains are made.</p>
                </div>
              ) : (
                <div className="ff-card p-0 overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-3.5
                                  border-b border-forge-border">
                    <div>
                      <p className="font-semibold text-sm text-forge-text">{todaySchedule.label}</p>
                      <p className="text-xs text-forge-dim">{todaySchedule.exercises.length} exercises</p>
                    </div>
                    <Link to="/workouts" className="ff-btn-primary ff-btn-sm">
                      Start Session →
                    </Link>
                  </div>

                  {todaySchedule.exercises.map((ex, i) => {
                    const exercise = getExerciseById(ex.exerciseId)
                    if (!exercise) return null
                    return (
                      <div key={i}
                        className={`flex items-center gap-3 px-5 py-3
                                   ${i < todaySchedule.exercises.length - 1 ? 'border-b border-forge-border' : ''}`}>
                        <span className="font-mono text-[10px] text-forge-dim w-5 flex-shrink-0">
                          {String(i+1).padStart(2,'0')}
                        </span>
                        <div className="w-11 h-9 rounded-md overflow-hidden flex-shrink-0">
                          <img src={exercise.image} alt={exercise.name}
                            className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-forge-text truncate">{exercise.name}</p>
                          <p className="text-[11px] text-forge-dim truncate">{exercise.muscle}</p>
                        </div>
                        <p className="font-mono text-xs text-forge-orange font-bold flex-shrink-0">
                          {ex.sets} × {ex.isTime ? `${ex.duration}s` : ex.reps}
                        </p>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}

          {/* Programs */}
          <div className="animate-fade-up delay-225">
            <div className="flex items-center justify-between mb-3">
              <h2 className="ff-section-title text-white font-bold text-xl">Training Programs:</h2>
              {activeProgramId && (
                <button onClick={clearProgram} className="ff-btn-ghost ff-btn-sm">
                  Clear Active
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PROGRAMS.map(prog => {
                const isActive = activeProgramId === prog.id
                return (
                  <div key={prog.id}
                    onClick={() => selectProgram(prog.id)}
                    className={`ff-card cursor-pointer transition-all duration-200
                                ${isActive
                                  ? 'border-forge-orange/40 bg-gradient-to-br from-forge-card to-forge-orange/5 shadow-orange'
                                  : 'hover:shadow-card'
                                }`}>
                    <div className="flex items-start justify-between mb-3">
                      <span className="ff-badge text-[10px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full"
                        style={{ background: `${prog.levelColor}18`, color: prog.levelColor }}>
                        {prog.level}
                      </span>
                      {isActive && (
                        <span className="text-[10px] font-bold text-forge-orange tracking-wider flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-forge-orange inline-block animate-pulse" />
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-2xl tracking-wider text-forge-text/90 mb-2 leading-tight">
                      {prog.name}
                    </h3>
                    <p className="text-xs text-forge-dim leading-relaxed mb-3 line-clamp-2">
                      {prog.description}
                    </p>
                    <div className="flex items-center gap-4 text-[11px] text-forge-dim">
                      <span>⏱ {prog.duration}</span>
                      <span>📅 {prog.daysPerWeek}d/week</span>
                      <span>🎯 {prog.goal}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── Right Column ── */}
        <div className="flex flex-col gap-6">

          {/* Quick Actions */}
          <div className="animate-fade-up delay-150">
            <h2 className="ff-section-title mb-3 text-white text-xl font-bold">Quick Actions</h2>
            <div className="flex flex-col gap-2">
              {[
                { to: '/workouts', icon: '◈', label: 'Browse All Workouts', sub: '26 exercises · 4 programs' },
                { to: '/diet',     icon: '◎', label: 'AI Diet Analysis',    sub: 'Powered by Claude AI' },
                { to: '/custom',   icon: '⊕', label: 'Build Custom Routine', sub: 'Your personalized plan' },
              ].map(({ to, icon, label, sub }) => (
                <Link key={to} to={to}
                  className="ff-card flex items-center gap-3 hover:border-forge-orange/30 group">
                  <span className="w-9 h-9 rounded-lg bg-forge-orange/10 border border-forge-orange/20
                                   flex items-center justify-center text-forge-orange text-base flex-shrink-0
                                   group-hover:bg-forge-orange/20 transition-colors">
                    {icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-forge-text">{label}</p>
                    <p className="text-[11px] text-forge-dim">{sub}</p>
                  </div>
                  <span className="text-forge-dim group-hover:text-forge-orange transition-colors">›</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Exercise preview */}
          <div className="animate-fade-up delay-300">
            <div className="flex items-center justify-between mb-3">
              <h2 className="ff-section-title">Exercise Library</h2>
              <Link to="/workouts" className="text-forge-orange text-xs font-bold hover:underline">
                All 26 →
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              {EXERCISES.slice(0, 6).map((ex, i) => (
                <div key={ex.id}
                  className="flex items-center gap-3 p-2.5 rounded-xl border border-forge-border
                             bg-forge-card hover:border-forge-borderLight transition-colors cursor-pointer">
                  <div className="w-10 h-8 rounded-md overflow-hidden flex-shrink-0">
                    <img src={ex.image} alt={ex.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-forge-text truncate">{ex.name}</p>
                    <p className="text-[10px] text-forge-dim truncate">{ex.muscle.split('·')[0].trim()}</p>
                  </div>
                  <span className={`text-[9px] px-2 py-0.5 rounded border ${CATEGORY_COLORS[ex.category]} font-bold uppercase tracking-wider`}>
                    {ex.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}