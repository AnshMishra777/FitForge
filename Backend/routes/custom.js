const express       = require('express')
const { protect }   = require('../middleware/auth')
const CustomWorkout = require('../models/CustomWorkout')
const User          = require('../models/User')

const router = express.Router()
router.use(protect)

// GET /api/custom — get all user's custom workouts
router.get('/', async (req, res) => {
  try {
    const workouts = await CustomWorkout
      .find({ user: req.user._id })
      .sort({ updatedAt: -1 })
    res.json({ workouts })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// GET /api/custom/:id
router.get('/:id', async (req, res) => {
  try {
    const workout = await CustomWorkout.findOne({ _id: req.params.id, user: req.user._id })
    if (!workout) return res.status(404).json({ message: 'Workout not found' })
    res.json({ workout })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// POST /api/custom — create
router.post('/', async (req, res) => {
  try {
    const { name, description, goal, exercises } = req.body
    if (!name || !name.trim()) return res.status(400).json({ message: 'Workout name is required' })
    if (!exercises || exercises.length === 0) return res.status(400).json({ message: 'At least one exercise required' })

    const workout = await CustomWorkout.create({
      user: req.user._id, name: name.trim(), description, goal, exercises,
    })
    res.status(201).json({ workout })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

// PATCH /api/custom/:id — update
router.patch('/:id', async (req, res) => {
  try {
    const workout = await CustomWorkout.findOne({ _id: req.params.id, user: req.user._id })
    if (!workout) return res.status(404).json({ message: 'Workout not found' })

    const allowed = ['name', 'description', 'goal', 'exercises']
    allowed.forEach(k => { if (req.body[k] !== undefined) workout[k] = req.body[k] })

    await workout.save()
    res.json({ workout })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// DELETE /api/custom/:id
router.delete('/:id', async (req, res) => {
  try {
    const workout = await CustomWorkout.findOneAndDelete({ _id: req.params.id, user: req.user._id })
    if (!workout) return res.status(404).json({ message: 'Workout not found' })
    res.json({ message: 'Workout deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// POST /api/custom/:id/complete — mark as completed + update user stats
router.post('/:id/complete', async (req, res) => {
  try {
    const workout = await CustomWorkout.findOne({ _id: req.params.id, user: req.user._id })
    if (!workout) return res.status(404).json({ message: 'Workout not found' })

    workout.timesCompleted += 1
    workout.lastCompleted   = new Date()
    await workout.save()

    const totalSets = workout.exercises.reduce((s, e) => s + e.sets, 0)
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { 'stats.workoutsCompleted': 1, 'stats.totalSets': totalSets },
      $set: { 'stats.lastWorkout': new Date() },
    })

    res.json({ workout })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router