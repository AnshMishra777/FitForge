const mongoose = require('mongoose')

const exerciseItemSchema = new mongoose.Schema({
  exerciseId: { type: String, required: true },
  sets:       { type: Number, required: true, min: 1, max: 20 },
  reps:       { type: Number, default: 10, min: 1, max: 500 },
  duration:   { type: Number, default: 30 },   // seconds (for timed exercises)
  isTime:     { type: Boolean, default: false },
  rest:       { type: Number, default: 60 },   // seconds
  notes:      { type: String, default: '' },
}, { _id: false })

const customWorkoutSchema = new mongoose.Schema({
  user:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  name:        { type: String, required: true, trim: true, maxlength: 100 },
  description: { type: String, default: '', maxlength: 500 },
  goal:        { type: String, default: '' },
  exercises:   { type: [exerciseItemSchema], default: [] },
  timesCompleted: { type: Number, default: 0 },
  lastCompleted:  { type: Date, default: null },
}, { timestamps: true })

module.exports = mongoose.model('CustomWorkout', customWorkoutSchema)