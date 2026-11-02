const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { protect } = require('../middleware/auth')

// ─── JWT GENERATION ──────────────────────────────────────
const signToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )
}

// ─── COOKIE CONFIGURATION ─────────────────────────────────
const cookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: '/'
})

// ─── SAFE USER RESPONSE ──────────────────────────────────
const getSafeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  avatar: user.avatar,
  activeProgram: user.activeProgram,
  stats: user.stats,
  createdAt: user.createdAt
})

// ─── REGISTER ────────────────────────────────────────────
// POST /api/auth/register

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Name, email and password are required'
      })
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: 'Password must contain at least 6 characters'
      })
    }

    const normalizedEmail = email.toLowerCase().trim()

    const exists = await User.findOne({
      email: normalizedEmail
    })

    if (exists) {
      return res.status(409).json({
        message: 'An account with that email already exists'
      })
    }

    // Password automatically gets hashed by User.js pre-save hook
    const user = await User.create({
      name,
      email: normalizedEmail,
      password
    })

    const token = signToken(user._id)

    // Store JWT inside HTTP-only cookie
    res.cookie('ff_token', token, cookieOptions())

    return res.status(201).json({
      success: true,
      message: 'Registration successful',
      user: getSafeUser(user)
    })

  } catch (error) {
    console.error('Register error:', error)

    if (error.code === 11000) {
      return res.status(409).json({
        message: 'Email already registered'
      })
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: error.message
      })
    }

    return res.status(500).json({
      message: 'Server error during registration'
    })
  }
})


// ─── LOGIN ───────────────────────────────────────────────
// POST /api/auth/login

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required'
      })
    }

    const user = await User.findOne({
      email: email.toLowerCase().trim()
    })

    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password'
      })
    }

    // Compare entered password with bcrypt hash
    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid email or password'
      })
    }

    const token = signToken(user._id)

    // Set HTTP-only cookie
    res.cookie('ff_token', token, cookieOptions())

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      user: getSafeUser(user)
    })

  } catch (error) {
    console.error('Login error:', error)

    return res.status(500).json({
      message: 'Server error during login'
    })
  }
})


// ─── CURRENT USER ────────────────────────────────────────
// GET /api/auth/me

router.get('/me', protect, async (req, res) => {
  try {
    return res.status(200).json({
      authenticated: true,
      user: getSafeUser(req.user)
    })

  } catch (error) {
    console.error('Auth check error:', error)

    return res.status(500).json({
      message: 'Unable to verify session'
    })
  }
})


// ─── LOGOUT ──────────────────────────────────────────────
// POST /api/auth/logout

router.post('/logout', (req, res) => {
  const { maxAge, ...clearOptions } = cookieOptions()

  res.clearCookie('ff_token', clearOptions)

  return res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  })
})


// ─── EXPORT ──────────────────────────────────────────────

module.exports = { router }