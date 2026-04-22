const express  = require('express')
const { protect } = require('../middleware/auth')

const router = express.Router()

// All routes require auth
router.use(protect)

// Serve the static workout data from the backend
// (frontend also has this data, but having it here enables server-side logging)

const EXERCISES = require('../config/exercises')
const PROGRAMS  = require('../config/programs')

// GET /api/workouts/exercises
router.get('/exercises', (req, res) => {
  res.json({ exercises: EXERCISES })
})

// GET /api/workouts/exercises/:id
router.get('/exercises/:id', (req, res) => {
  const ex = EXERCISES.find(e => e.id === req.params.id)
  if (!ex) return res.status(404).json({ message: 'Exercise not found' })
  res.json({ exercise: ex })
})

// GET /api/workouts/programs
router.get('/programs', (req, res) => {
  res.json({ programs: PROGRAMS })
})

// GET /api/workouts/programs/:id
router.get('/programs/:id', (req, res) => {
  const prog = PROGRAMS.find(p => p.id === req.params.id)
  if (!prog) return res.status(404).json({ message: 'Program not found' })
  res.json({ program: prog })
})

module.exports = router