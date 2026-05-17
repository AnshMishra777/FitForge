// routes/user.js
// Handles profile updates (name, email, phone, bio, goal) and avatar upload.
// Mount in server.js:  app.use('/api/user', require('./routes/user'))

const express   = require('express')
const { protect } = require('../middleware/auth')
const User      = require('../models/User')

const router = express.Router()
router.use(protect)

// ── GET /api/user/me — fetch full profile ─────────────────────────
router.get('/me', async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password')
    res.json({ user })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// ── PATCH /api/user/profile — update name, email, phone, bio, goal ─
router.patch('/profile', async (req, res) => {
  try {
    const allowed = ['name', 'email', 'phone', 'bio', 'goal']
    const updates = {}
    allowed.forEach(k => { if (req.body[k] !== undefined) updates[k] = req.body[k] })

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password')

    res.json({ user })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

// ── PATCH /api/user/avatar — save base64 avatar to DB ─────────────
//
// The frontend sends: { avatar: "data:image/jpeg;base64,..." }
// We store it in user.avatar. On next login, the auth /login response
// returns the full user object (including avatar) — so the photo
// re-appears automatically after logout/login.
//
// ⚠️  For production: replace base64 storage with Cloudinary/S3.
//     Receive the file with multer, upload to cloud, store the URL.
//
router.patch('/avatar', async (req, res) => {
  try {
    const { avatar } = req.body

    if (!avatar) return res.status(400).json({ message: 'No avatar provided' })

    // Rough size check — base64 of a 1MB image ≈ 1.37MB string
    const sizeBytes = Buffer.byteLength(avatar, 'utf8')
    if (sizeBytes > 3 * 1024 * 1024) {  // 3 MB limit
      return res.status(413).json({ message: 'Image too large. Max 2MB.' })
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { avatar } },
      { new: true }
    ).select('-password')

    res.json({ user })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// ── DELETE /api/user/avatar — remove avatar ───────────────────────
router.delete('/avatar', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { avatar: '' } },
      { new: true }
    ).select('-password')
    res.json({ user })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router