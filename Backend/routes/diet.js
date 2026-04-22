const express   = require('express')
const https     = require('https')
const { protect } = require('../middleware/auth')
const DietLog   = require('../models/DietLog')

const router = express.Router()
router.use(protect)

const SYSTEM_PROMPT = `You are FitForge's AI Nutrition Coach — an expert sports dietitian and nutritionist.

When a user asks about food, a meal, or ingredients:
1. Provide a DETAILED nutritional breakdown per serving/portion including:
   - Calories (kcal)
   - Protein (g)
   - Carbohydrates (g) — total, sugars, fiber
   - Fat (g) — total, saturated
   - Key vitamins (A, C, D, B12, B6 if significant)
   - Key minerals (Iron, Calcium, Potassium, Sodium, Magnesium if significant)
2. Fitness context — how this food helps with muscle building, fat loss, or athletic performance.
3. Optimal timing — pre-workout, post-workout, before sleep, etc.
4. A practical tip or healthier alternative if relevant.

Use actual nutritional values from the USDA database. Be specific with numbers. Format clearly with sections.

For general diet/nutrition questions, answer as a knowledgeable evidence-based sports nutritionist.`

// POST /api/diet/analyze
router.post('/analyze', async (req, res) => {
  try {
    const { messages } = req.body
    if (!messages || !Array.isArray(messages) || messages.length === 0)
      return res.status(400).json({ message: 'Messages array required' })

    const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY

    // If no API key, return a structured demo response
    if (!ANTHROPIC_KEY) {
      const lastMsg = messages[messages.length - 1]?.content || ''
      const reply   = getDemoResponse(lastMsg)
      return res.json({ reply })
    }

    // Call Claude API
    const body = JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1200,
      system: SYSTEM_PROMPT,
      messages: messages.map(m => ({ role: m.role, content: m.content })),
    })

    const options = {
      hostname: 'api.anthropic.com',
      path:     '/v1/messages',
      method:   'POST',
      headers: {
        'Content-Type':      'application/json',
        'x-api-key':         ANTHROPIC_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Length':    Buffer.byteLength(body),
      },
    }

    const claudeRes = await new Promise((resolve, reject) => {
      const req = https.request(options, res => {
        let data = ''
        res.on('data', chunk => { data += chunk })
        res.on('end', () => resolve(JSON.parse(data)))
      })
      req.on('error', reject)
      req.write(body)
      req.end()
    })

    const reply = claudeRes.content
      ?.filter(b => b.type === 'text')
      .map(b => b.text)
      .join('\n') || 'Sorry, I could not process that request.'

    // Log to DB (best-effort)
    try {
      const userQuery = messages[messages.length - 1]?.content || ''
      await DietLog.create({ user: req.user._id, query: userQuery, response: reply })
    } catch (_) {}

    res.json({ reply })
  } catch (err) {
    console.error('Diet analyze error:', err)
    res.status(500).json({ message: 'AI service error', reply: getDemoResponse('general') })
  }
})

// GET /api/diet/history
router.get('/history', async (req, res) => {
  try {
    const logs = await DietLog
      .find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(20)
      .select('query createdAt')
    res.json({ logs })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

function getDemoResponse(query) {
  const q = (query || '').toLowerCase()

  if (q.includes('chicken'))
    return `📊 Nutritional Analysis — Grilled Chicken Breast (200g)\n\n━━ MACRONUTRIENTS ━━\n• Calories: 330 kcal\n• Protein: 62g ⭐ (exceptional source)\n• Carbohydrates: 0g\n• Fat: 7.2g (saturated 2g)\n• Fiber: 0g\n\n━━ KEY VITAMINS ━━\n• Vitamin B3 (Niacin): 56% DV\n• Vitamin B6: 68% DV\n• Vitamin B12: 24% DV\n\n━━ MINERALS ━━\n• Selenium: 70% DV\n• Phosphorus: 42% DV\n• Potassium: 440mg\n\n━━ FITNESS CONTEXT ━━\nChicken breast is the gold standard lean protein for athletes. 62g protein from 200g delivers a massive anabolic stimulus for muscle protein synthesis with minimal fat.\n\n⏱ TIMING: Ideal 30–60 min post-workout. Pair with 200g white rice for a complete recovery meal (~590 kcal total).\n\n💡 TIP: Season with herbs instead of sauces to keep sodium low.`

  if (q.includes('egg'))
    return `📊 Nutritional Analysis — Large Eggs (3 eggs, ~150g)\n\n━━ MACRONUTRIENTS ━━\n• Calories: 216 kcal\n• Protein: 18g\n• Carbohydrates: 1.2g\n• Fat: 15g (saturated 5g)\n\n━━ KEY VITAMINS ━━\n• Vitamin D: 12% DV (rare food source!)\n• Vitamin B12: 33% DV\n• Choline: 630mg (essential for brain)\n• Vitamin A: 20% DV\n\n━━ MINERALS ━━\n• Selenium: 69% DV\n• Phosphorus: 27% DV\n\n━━ FITNESS CONTEXT ━━\nWhole eggs contain all 9 essential amino acids with ~91% bioavailability. The yolk contains healthy fats and most micronutrients. Research shows whole eggs stimulate 40% more muscle protein synthesis than egg whites alone.\n\n⏱ TIMING: Great for any meal — breakfast, pre-workout, or post-workout.\n\n💡 TIP: Don't skip the yolk.`

  if (q.includes('oat') || q.includes('oatmeal'))
    return `📊 Nutritional Analysis — Cooked Oatmeal (1 cup / 240g)\n\n━━ MACRONUTRIENTS ━━\n• Calories: 166 kcal\n• Protein: 5.9g\n• Carbohydrates: 28g (fiber 4g, sugar 0.6g)\n• Fat: 3.6g\n\n━━ KEY VITAMINS ━━\n• Vitamin B1 (Thiamine): 26% DV\n• Folate: 6% DV\n\n━━ MINERALS ━━\n• Manganese: 86% DV\n• Phosphorus: 18% DV\n• Magnesium: 16% DV\n• Iron: 12% DV\n\n━━ FITNESS CONTEXT ━━\nOatmeal is the ideal pre-workout carb. Beta-glucan fiber provides slow, sustained energy — no crashes. It's a complete breakfast base for athletes.\n\n⏱ TIMING: 60–90 min before training. Add a scoop of whey protein to reach 30g+ protein.\n\n💡 TIP: Top with banana + nut butter for a complete pre-workout meal.`

  if (q.includes('salmon'))
    return `📊 Nutritional Analysis — Atlantic Salmon (100g)\n\n━━ MACRONUTRIENTS ━━\n• Calories: 208 kcal\n• Protein: 20g\n• Fat: 13g (Omega-3: 2.5g ⭐)\n• Carbohydrates: 0g\n\n━━ KEY VITAMINS ━━\n• Vitamin D: 127% DV 🔥\n• Vitamin B12: 133% DV 🔥\n• Vitamin B6: 53% DV\n\n━━ MINERALS ━━\n• Selenium: 75% DV\n• Potassium: 490mg\n\n━━ FITNESS CONTEXT ━━\nSalmon's omega-3s (EPA + DHA) significantly reduce exercise-induced inflammation and muscle soreness — a powerful recovery food. The Vitamin D content is exceptional.\n\n⏱ TIMING: Best for dinner or post-workout meals. Fat content slows digestion, so avoid 1h before intense training.\n\n💡 TIP: Aim for 2–3 servings of fatty fish per week.`

  if (q.includes('banana'))
    return `📊 Nutritional Analysis — Medium Banana (118g)\n\n━━ MACRONUTRIENTS ━━\n• Calories: 105 kcal\n• Protein: 1.3g\n• Carbohydrates: 27g (sugar 14g, fiber 3.1g)\n• Fat: 0.4g\n\n━━ KEY VITAMINS ━━\n• Vitamin B6: 22% DV\n• Vitamin C: 17% DV\n\n━━ MINERALS ━━\n• Potassium: 422mg (12% DV) ⭐\n• Magnesium: 8% DV\n\n━━ FITNESS CONTEXT ━━\nBananas are the perfect pre/during-workout fuel. Fast-digesting sugars provide rapid energy. Potassium prevents muscle cramps during exercise.\n\n⏱ TIMING: 30 min before training for quick energy, or immediately post-workout to spike insulin and shuttle nutrients to muscles.\n\n💡 TIP: Pair with peanut butter for sustained energy release.`

  return `I'm your AI Nutrition Coach! I'm connected to Claude AI for detailed analysis.\n\nI can analyze any food or meal — just ask:\n• "Analyze 200g grilled chicken breast"\n• "How much protein in 3 large eggs?"\n• "Best pre-workout meal for strength training?"\n• "Macros in 1 cup of oatmeal with banana"\n\nAdd your Anthropic API key to ANTHROPIC_API_KEY in backend/.env for full AI-powered responses! 💪`
}

module.exports = router