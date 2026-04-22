const mongoose = require('mongoose')

const setLogSchema = new mongoose.Schema({
  exerciseId: String,
  setNumber:  Number,
  reps:       Number,
  duration:   Number,
  completed:  { type: Boolean, default: true },
}, { _id: false })

const workoutSessionSchema = new mongoose.Schema({
  user:         { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  workoutName:  { type: String, required: true },
  workoutType:  { type: String, enum: ['program', 'custom'], default: 'custom' },
  programId:    { type: String, default: null },
  customId:     { type: mongoose.Schema.Types.ObjectId, ref: 'CustomWorkout', default: null },
  sets:         { type: [setLogSchema], default: [] },
  totalSets:    { type: Number, default: 0 },
  durationMins: { type: Number, default: 0 },
  notes:        { type: String, default: '' },
  completedAt:  { type: Date, default: Date.now },
}, { timestamps: true })

module.exports = mongoose.model('WorkoutSession', workoutSessionSchema)