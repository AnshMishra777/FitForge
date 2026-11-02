// routes/user.js
// Handles profile updates (name, email, phone, bio, goal) and avatar upload.
// Mount in server.js:  app.use('/api/user', require('./routes/user'))
const cloudinary = require('../config/cloudinary')
const upload = require('../middleware/upload')
const { Readable } = require('stream')


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
// ── PATCH /api/user/avatar — upload or replace avatar ────────────
router.patch('/avatar', upload.single('avatar'), async (req, res) => {
  let uploadedPublicId = null

  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please select an image' })
    }

    // Upload image to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'fitforge/avatars',
          transformation: [
            { width: 500, height: 500, crop: 'fill', gravity: 'face' },
          ],
          resource_type: 'image',
        },
        (error, result) => {
          if (error) return reject(error)
          resolve(result)
        }
      )

      Readable.from(req.file.buffer).pipe(stream)
    })

    uploadedPublicId = result.public_id

    // Save new avatar URL and public ID
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          avatar: result.secure_url,
          avatarPublicId: result.public_id,
        },
      },
      { new: true, runValidators: true }
    ).select('-password')

    if (!user) {
      await cloudinary.uploader.destroy(result.public_id)
      return res.status(404).json({ message: 'User not found' })
    }

    // Delete previous image after successfully saving the new one
    const previousPublicId = req.user.avatarPublicId

    if (previousPublicId && previousPublicId !== result.public_id) {
      try {
        await cloudinary.uploader.destroy(previousPublicId)
      } catch (error) {
        console.error('Previous avatar cleanup failed:', error)
      }
    }

    return res.json({
      success: true,
      message: 'Avatar updated successfully',
      user,
    })
  } catch (error) {
    // Clean up newly uploaded image if database update fails
    if (uploadedPublicId) {
      try {
        await cloudinary.uploader.destroy(uploadedPublicId)
      } catch (cleanupError) {
        console.error('New avatar cleanup failed:', cleanupError)
      }
    }

    console.error('Avatar upload error:', error)
    return res.status(500).json({ message: 'Avatar upload failed' })
  }
})

// ── DELETE /api/user/avatar — remove avatar ──────────────────────
router.delete('/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.user._id)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const previousPublicId = user.avatarPublicId

    // Clear avatar details in MongoDB
    user.avatar = ''
    user.avatarPublicId = ''
    await user.save()

    // Delete image from Cloudinary
    if (previousPublicId) {
      try {
        await cloudinary.uploader.destroy(previousPublicId)
      } catch (error) {
        console.error('Cloudinary avatar deletion failed:', error)
      }
    }

    return res.json({
      success: true,
      message: 'Avatar removed successfully',
      user,
    })
  } catch (error) {
    console.error('Avatar removal error:', error)
    return res.status(500).json({ message: 'Could not remove avatar' })
  }
})

module.exports = router