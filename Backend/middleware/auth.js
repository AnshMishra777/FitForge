const jwt = require('jsonwebtoken')
const User = require('../models/User')

// Protect routes using HTTP-only cookies
const protect = async (req, res, next) => {
  try {
    const token = req.cookies?.ff_token

    if (!token) {
      return res.status(401).json({
        message: 'Authentication required. Please log in.'
      })
    }

    // Verify JWT
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    )

    // Find authenticated user
    const user = await User.findById(decoded.id)
      .select('-password')

    if (!user) {
      return res.status(401).json({
        message: 'User not found'
      })
    }

    // Attach user to request
    req.user = user

    next()

  } catch (error) {
    return res.status(401).json({
      message: 'Invalid or expired authentication token'
    })
  }
}

module.exports = { protect }