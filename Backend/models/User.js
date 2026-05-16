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

  // ✅ FIX — avatar stores a URL string (or base64 data URL for demo).
  // Max 2MB base64 ≈ ~2.7MB string — fine for MongoDB's 16MB doc limit.
  // For production, swap to a Cloudinary/S3 URL string instead.
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

// Hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

// Compare passwords
userSchema.methods.comparePassword = async function (candidate) {
  return bcrypt.compare(candidate, this.password)
}

// Remove password from JSON output
userSchema.methods.toJSON = function () {
  const obj = this.toObject()
  delete obj.password
  return obj
}

module.exports = mongoose.model('User', userSchema)