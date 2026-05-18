const mongoose = require('mongoose')
const bcrypt   = require('bcryptjs')

const userSchema = new mongoose.Schema({
  name: {
    type: String, required: [true, 'Name is required'],
    trim: true, minlength: 2, maxlength: 60,
  },
  email: {
    type: String, required: [true, 'Email is required'],
    unique: true, lowercase: true, trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email'],
  },
  password: {
    type: String, required: [true, 'Password is required'], minlength: 6,
  },
  avatar: { type: String, default: '' },
  activeProgram: { type: String, default: null },
  stats: {
    workoutsCompleted: { type: Number, default: 0 },
    totalSets:         { type: Number, default: 0 },
    totalMinutes:      { type: Number, default: 0 },
    streak:            { type: Number, default: 0 },
    lastWorkout:       { type: Date,   default: null },
  },
}, { timestamps: true })

// ── Hash password before save ─────────────────────────────────────────────────
// FIX: Mongoose 9 async pre-hooks must NOT use the `next` callback.
// Using an async function and simply returning handles flow correctly.
// The old pattern called `next()` but `next` was undefined in this scope,
// causing "TypeError: next is not a function".
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  this.password = await bcrypt.hash(this.password, 12)
})

// ── Compare passwords ─────────────────────────────────────────────────────────
userSchema.methods.comparePassword = async function (candidate) {
  return bcrypt.compare(candidate, this.password)
}

// ── Strip password from JSON output ──────────────────────────────────────────
userSchema.methods.toJSON = function () {
  const obj = this.toObject()
  delete obj.password
  return obj
}

module.exports = mongoose.model('User', userSchema)