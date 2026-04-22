const mongoose = require('mongoose')

const dietLogSchema = new mongoose.Schema({
  user:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  query:   { type: String, required: true },
  response:{ type: String, required: true },
  parsed: {
    calories: Number,
    protein:  Number,
    carbs:    Number,
    fat:      Number,
    fiber:    Number,
  },
}, { timestamps: true })

module.exports = mongoose.model('DietLog', dietLogSchema)