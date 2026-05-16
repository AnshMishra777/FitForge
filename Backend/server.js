const express    = require('express')
const mongoose   = require('mongoose')
const cors       = require('cors')
const morgan     = require('morgan')
const dotenv     = require('dotenv')
const path       = require('path')

dotenv.config()

const app = express()

// ── Middleware ──────────────────────────────────────────────────────
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

// ── Routes ──────────────────────────────────────────────────────────
app.use('/api/auth', require('./routes/auth').router)
app.use('/api/workouts', require('./routes/workouts'))
app.use('/api/custom',   require('./routes/custom'))
app.use('/api/diet',     require('./routes/diet'))
app.use('/api/progress', require('./routes/progress'))
app.use('/api/user', require('./routes/user'))
// ── Health check ────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() })
})

// ── Global error handler ─────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
})

// ── Database + Start ─────────────────────────────────────────────────
const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected')
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message)
    process.exit(1)
  })

module.exports = app