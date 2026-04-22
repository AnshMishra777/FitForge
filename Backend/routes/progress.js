const express         = require('express')
const { protect }     = require('../middleware/auth')
const WorkoutSession  = require('../models/WorkoutSession')
const User            = require('../models/User')

const router = express.Router()
router.use(protect)

// POST /api/progress/session — log a completed session
router.post('/session', async (req, res) => {
  try {
    const { workoutName, workoutType, programId, customId, sets, durationMins, notes } = req.body

    const session = await WorkoutSession.create({
      user: req.user._id,
      workoutName, workoutType: workoutType || 'custom',
      programId, customId,
      sets: sets || [],
      totalSets: (sets || []).length,
      durationMins: durationMins || 0,
      notes: notes || '',
    })

    // Update user stats
    await User.findByIdAndUpdate(req.user._id, {
      $inc: {
        'stats.workoutsCompleted': 1,
        'stats.totalSets': (sets || []).length,
        'stats.totalMinutes': durationMins || 0,
      },
      $set: { 'stats.lastWorkout': new Date() },
    })

    res.status(201).json({ session })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

// GET /api/progress/sessions — recent sessions
router.get('/sessions', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10
    const sessions = await WorkoutSession
      .find({ user: req.user._id })
      .sort({ completedAt: -1 })
      .limit(limit)
    res.json({ sessions })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// GET /api/progress/stats — user stats
router.get('/stats', async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('stats')

    // Last 7 days sessions
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const recentSessions = await WorkoutSession
      .find({ user: req.user._id, completedAt: { $gte: weekAgo } })
      .sort({ completedAt: -1 })

    // Build daily activity map
    const activityMap = {}
    for (let i = 6; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      activityMap[d.toDateString()] = 0
    }
    recentSessions.forEach(s => {
      const key = new Date(s.completedAt).toDateString()
      if (activityMap[key] !== undefined) activityMap[key]++
    })

    const weeklyActivity = Object.entries(activityMap).map(([date, count]) => ({
      date,
      day: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
      count,
    }))

    res.json({
      stats: user.stats,
      weeklyActivity,
      recentSessions: recentSessions.slice(0, 5),
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router