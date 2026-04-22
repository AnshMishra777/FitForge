const express = require('express')
const router = express.Router()

const jwt = require('jsonwebtoken')
const User = require('../models/User')

// 🔐 Middleware
const protect = async (req, res, next) => {
  try {
    const header = req.headers.authorization

    if (!header || !header.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' })
    }

    const token = header.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(decoded.id).select('-password')
    if (!user) return res.status(401).json({ message: 'User not found' })

    req.user = user
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}

// 🧾 REGISTER
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body

    const exists = await User.findOne({ email })
    if (exists) return res.status(400).json({ message: 'User already exists' })

    const user = await User.create({ name, email, password })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.status(201).json({ token, user })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// 🔑 LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'Invalid email' })

    const isMatch = await user.comparePassword(password)
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.json({ token, user })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = { router, protect }