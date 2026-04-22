import { useState, useRef, useEffect } from 'react'

// ─── Claude system prompt ─────────────────────────────────────────
const SYSTEM = `You are FitForge's AI Nutrition Coach — an expert sports dietitian and nutritionist.

When a user asks about food, a meal, or ingredients:
1. Provide a DETAILED nutritional breakdown per serving/portion including:
   - Calories (kcal)
   - Protein (g)
   - Carbohydrates (g) — total, sugars, fiber
   - Fat (g) — total, saturated, unsaturated
   - Key vitamins: A, C, D, E, B12, B6, Folate (if significant)
   - Key minerals: Iron, Calcium, Potassium, Sodium, Magnesium, Zinc (if significant)
2. Fitness context — how this food helps with muscle building, fat loss, or athletic performance.
3. Optimal timing — pre-workout, post-workout, before sleep, etc.
4. A practical tip or healthier swap if relevant.

Format your response clearly with sections. Use actual nutritional values based on standard databases (USDA). Be specific with numbers.

When a user asks general nutrition or diet questions, answer as a knowledgeable, evidence-based sports nutritionist. Keep responses helpful, concise, and actionable.`

// ─── Quick prompt suggestions ─────────────────────────────────────
const QUICK = [
  'Analyze 200g grilled chicken breast',
  'How much protein in 3 large eggs?',
  'Nutrition in 1 cup of cooked oatmeal',
  'Best pre-workout meal for strength training?',
  'Macros in a medium avocado',
  'Post-workout meal for muscle recovery?',
  'Is white rice or brown rice better for athletes?',
  'How many calories in 100g of salmon?',
]

// ─── Nutrient progress bar ────────────────────────────────────────
function NutrientBar({ label, value, unit, max, color }) {
  const pct = Math.min((value / max) * 100, 100)
  return (
    <div className="mb-2.5">
      <div className="flex justify-between mb-1">
        <span className="text-[11px] font-semibold text-[#777]">{label}</span>
        <span className="text-[11px] font-mono text-[#bbb]">{value}{unit}</span>
      </div>
      <div className="h-1 bg-[#1a1a1a] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  )
}

// ─── Chat message bubble ──────────────────────────────────────────
function Bubble({ msg }) {
  const isUser = msg.role === 'user'

  return (
    <div className={`flex gap-2.5 mb-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm ${
        isUser
          ? 'bg-gradient-to-br from-[#ff5a1f] to-orange-400 text-white font-bold'
          : 'bg-[#0f1f0f] border border-green-500/20 text-green-400'
      }`}>
        {isUser ? '👤' : '🤖'}
      </div>

      {/* Bubble */}
      <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
        isUser
          ? 'bg-[#ff5a1f]/15 border border-[#ff5a1f]/25 text-orange-100 rounded-tr-sm'
          : 'bg-[#141414] border border-[#1e1e1e] text-[#ccc] rounded-tl-sm'
      }`}>
        {msg.loading ? (
          <div className="flex items-center gap-1.5 py-1">
            {[0, 1, 2].map(i => (
              <span
                key={i}
                className="w-2 h-2 rounded-full bg-green-400 inline-block"
                style={{ animation: `bounce 1.2s ease infinite`, animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        ) : (
          <p style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</p>
        )}
      </div>
    </div>
  )
}

// ─── Main Diet Page ───────────────────────────────────────────────
export default function Diet() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hey! I'm your FitForge AI Nutrition Coach 🥦\n\nI can analyze any food or meal and give you a complete nutritional breakdown — calories, macros, vitamins, minerals, and personalized fitness advice.\n\nTry asking:\n• "Analyze 200g of grilled chicken with rice"\n• "What are the macros in a banana protein shake?"\n• "Best foods for post-workout recovery?"\n\nWhat would you like to know?`,
    }
  ])
  const [input, setInput]     = useState('')
  const [loading, setLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // ── Call Claude API ──────────────────────────────────────────────
  const callClaude = async (userMessage) => {
    try {
      const history = messages
        .filter(m => !m.loading)
        .map(m => ({ role: m.role, content: m.content }))

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: SYSTEM,
          messages: [...history, { role: 'user', content: userMessage }],
        }),
      })

      const data = await response.json()

      // Handle tool_use blocks or text blocks
      const text = data.content
        ?.filter(b => b.type === 'text')
        .map(b => b.text)
        .join('\n') || ''

      return text || 'Sorry, I could not process that. Please try again.'

    } catch (err) {
      return generateFallback(userMessage)
    }
  }

  // ── Demo fallback (no API key) ───────────────────────────────────
  const generateFallback = (query) => {
    const q = query.toLowerCase()

    if (q.includes('chicken')) {
      return `📊 Nutritional Analysis — Grilled Chicken Breast (200g)\n\n━━ MACRONUTRIENTS ━━\n• Calories: 330 kcal\n• Protein: 62g ✓ (Excellent source)\n• Carbohydrates: 0g\n• Fat: 7.2g (saturated 2g)\n• Fiber: 0g\n\n━━ KEY VITAMINS ━━\n• Vitamin B3 (Niacin): 56% DV\n• Vitamin B6: 68% DV\n• Vitamin B12: 24% DV\n\n━━ MINERALS ━━\n• Phosphorus: 42% DV\n• Selenium: 70% DV\n• Potassium: 440mg\n\n━━ FITNESS CONTEXT ━━\nChicken breast is arguably the best lean protein source for athletes. 62g of protein from 200g provides a massive anabolic stimulus for muscle protein synthesis.\n\n⏱ TIMING: Ideal within 30–60 min post-workout. Pair with 200g white rice (~260 kcal, 56g carbs) for a complete recovery meal.\n\n💡 TIP: Season with herbs instead of sauces to keep sodium low.`
    }

    if (q.includes('egg')) {
      return `📊 Nutritional Analysis — Large Eggs (3 eggs, ~150g)\n\n━━ MACRONUTRIENTS ━━\n• Calories: 216 kcal\n• Protein: 18g\n• Carbohydrates: 1.2g (sugars 1.2g)\n• Fat: 15g (saturated 5g)\n• Cholesterol: 558mg\n\n━━ KEY VITAMINS ━━\n• Vitamin D: 12% DV (rare food source!)\n• Vitamin B12: 33% DV\n• Vitamin A: 20% DV\n• Choline: 630mg (essential for brain)\n\n━━ MINERALS ━━\n• Selenium: 69% DV\n• Phosphorus: 27% DV\n• Iron: 9% DV\n\n━━ FITNESS CONTEXT ━━\nEggs contain all 9 essential amino acids with exceptional bioavailability (~91%). The yolk contains healthy fats, fat-soluble vitamins, and most micronutrients — don't skip it.\n\n⏱ TIMING: Excellent for breakfast or any meal. Pre-workout or post-workout both work well.\n\n💡 TIP: Whole eggs produce 40% greater muscle protein synthesis than egg whites alone.`
    }

    if (q.includes('oat')) {
      return `📊 Nutritional Analysis — Cooked Oatmeal (1 cup / 240g)\n\n━━ MACRONUTRIENTS ━━\n• Calories: 166 kcal\n• Protein: 5.9g\n• Carbohydrates: 28g (fiber 4g, sugar 0.6g)\n• Fat: 3.6g\n\n━━ KEY VITAMINS ━━\n• Vitamin B1 (Thiamine): 26% DV\n• Folate: 6% DV\n\n━━ MINERALS ━━\n• Manganese: 86% DV\n• Phosphorus: 18% DV\n• Magnesium: 16% DV\n• Iron: 12% DV\n• Zinc: 12% DV\n\n━━ FITNESS CONTEXT ━━\nOatmeal is the gold standard pre-workout carb. The beta-glucan fiber provides slow, sustained energy release ideal for endurance or long strength sessions. No energy crashes.\n\n⏱ TIMING: Best 60–90 minutes before training. Add a scoop of protein powder to boost protein to ~30g.\n\n💡 TIP: Top with banana (fast carbs) + nut butter (healthy fat) for a complete pre-workout meal.`
    }

    if (q.includes('salmon')) {
      return `📊 Nutritional Analysis — Atlantic Salmon (100g)\n\n━━ MACRONUTRIENTS ━━\n• Calories: 208 kcal\n• Protein: 20g\n• Carbohydrates: 0g\n• Fat: 13g (Omega-3: 2.5g!)\n\n━━ KEY VITAMINS ━━\n• Vitamin D: 127% DV (exceptional!)\n• Vitamin B12: 133% DV\n• Vitamin B6: 53% DV\n• Vitamin E: 8% DV\n\n━━ MINERALS ━━\n• Selenium: 75% DV\n• Potassium: 490mg\n• Phosphorus: 28% DV\n\n━━ FITNESS CONTEXT ━━\nSalmon is a nutritional powerhouse. The omega-3 fatty acids (EPA + DHA) significantly reduce exercise-induced muscle inflammation and soreness, accelerating recovery.\n\n⏱ TIMING: Ideal for dinner or post-workout meals. The fat slows digestion so avoid immediately before intense training.\n\n💡 TIP: Aim for 2–3 servings of fatty fish per week to optimize omega-3 levels for recovery.`
    }

    if (q.includes('banana')) {
      return `📊 Nutritional Analysis — Medium Banana (118g)\n\n━━ MACRONUTRIENTS ━━\n• Calories: 105 kcal\n• Protein: 1.3g\n• Carbohydrates: 27g (sugar 14g, fiber 3.1g)\n• Fat: 0.4g\n\n━━ KEY VITAMINS ━━\n• Vitamin B6: 22% DV\n• Vitamin C: 17% DV\n• Folate: 6% DV\n\n━━ MINERALS ━━\n• Potassium: 422mg (12% DV) ★\n• Magnesium: 8% DV\n• Manganese: 16% DV\n\n━━ FITNESS CONTEXT ━━\nBananas are the perfect pre/during-workout fuel. The glucose and fructose mix provides rapid energy. Potassium prevents muscle cramps during exercise.\n\n⏱ TIMING: Eat 30 min before training for quick energy, or immediately post-workout as a fast carb to spike insulin and shuttle nutrients to muscles.\n\n💡 TIP: Pair with peanut butter (protein + fat) for a more sustained energy release.`
    }

    // Generic fallback
    return `I'm your AI Nutrition Coach! For the most accurate nutritional analysis, connect the app to the Claude API.\n\nIn demo mode, I can analyze:\n• Chicken breast 🍗\n• Eggs 🥚\n• Oatmeal 🥣\n• Salmon 🐟\n• Banana 🍌\n\nOr ask me general questions about:\n• Pre/post workout nutrition\n• Protein requirements\n• Fat loss strategies\n• Muscle building diet\n\nTry one of the quick prompts on the left! 💪`
  }

  // ── Send handler ─────────────────────────────────────────────────
  const sendMessage = async (text = input.trim()) => {
    if (!text || loading) return
    setInput('')
    setLoading(true)

    const userMsg    = { role: 'user',      content: text }
    const loadingMsg = { role: 'assistant', content: '', loading: true }
    setMessages(prev => [...prev, userMsg, loadingMsg])

    const reply = await callClaude(text)

    setMessages(prev => [
      ...prev.filter(m => !m.loading),
      { role: 'assistant', content: reply },
    ])
    setLoading(false)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const clearChat = () => setMessages([messages[0]])

  return (
    <div className="flex h-[calc(100vh-60px)] overflow-hidden bg-[#080808]">

      {/* ══ SIDEBAR (desktop always visible, mobile slide-in) ══════ */}
      <aside className={`
        w-72 border-r border-[#1e1e1e] bg-[#0d0d0d] flex flex-col flex-shrink-0
        transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        fixed md:relative inset-y-0 left-0 z-30 md:z-auto
      `}>
        {/* Sidebar header */}
        <div className="p-5 border-b border-[#1e1e1e]">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-lg">
              🤖
            </div>
            <div>
              <p className="font-display text-lg tracking-[0.06em] text-[#e0e0e0]">AI Nutrition</p>
              <p className="text-[10px] text-[#444] font-mono">Powered by Claude AI</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-3">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[11px] text-green-400 font-semibold">Online</span>
          </div>
        </div>

        {/* Quick prompts */}
        <div className="flex-1 overflow-y-auto p-4">
          <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#444] mb-3">
            Quick Prompts
          </p>
          <div className="flex flex-col gap-1.5">
            {QUICK.map((q, i) => (
              <button
                key={i}
                onClick={() => { sendMessage(q); setSidebarOpen(false) }}
                className="text-left text-xs text-[#666] hover:text-[#ccc] px-3 py-2.5 rounded-lg border border-transparent hover:border-[#1e1e1e] hover:bg-[#141414] transition-all leading-relaxed"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Daily reference */}
          <div className="mt-5 pt-5 border-t border-[#1a1a1a]">
            <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#444] mb-4">
              Daily Reference (2000 kcal)
            </p>
            <NutrientBar label="Calories"   value={2000} unit=" kcal" max={2500} color="#ff5a1f" />
            <NutrientBar label="Protein"    value={150}  unit="g"     max={220}  color="#22c55e" />
            <NutrientBar label="Carbs"      value={250}  unit="g"     max={350}  color="#3b82f6" />
            <NutrientBar label="Fat"        value={65}   unit="g"     max={100}  color="#ffcc00" />
            <NutrientBar label="Fiber"      value={25}   unit="g"     max={40}   color="#a78bfa" />
            <p className="text-[10px] text-[#333] mt-3">Reference values for active adult (2000 kcal diet)</p>
          </div>
        </div>

        {/* Clear button */}
        <div className="p-4 border-t border-[#1e1e1e]">
          <button
            onClick={clearChat}
            className="w-full py-2 rounded-lg border border-[#1e1e1e] text-[#555] text-xs font-bold hover:border-[#2a2a2a] hover:text-[#888] transition-colors"
          >
            Clear Conversation
          </button>
        </div>
      </aside>

      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 z-20"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ══ CHAT AREA ══════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Chat header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#1e1e1e] bg-[#0d0d0d]/80 backdrop-blur-md flex-shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile sidebar toggle */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-[#666] hover:text-[#f0f0f0] text-lg transition-colors mr-1"
            >☰</button>
            <div>
              <p className="font-semibold text-sm text-[#e0e0e0]">AI Nutrition Coach</p>
              <p className="text-[10px] text-[#444]">Ask about any food, meal, or nutrition topic</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-green-400 font-semibold hidden sm:inline">Active</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5">
          <div className="max-w-2xl mx-auto">
            {messages.map((msg, i) => (
              <Bubble key={i} msg={msg} />
            ))}
            <div ref={bottomRef} />
          </div>
        </div>

        {/* Input area */}
        <div className="flex-shrink-0 border-t border-[#1e1e1e] bg-[#0d0d0d] p-4">
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-3 items-end">
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask about any food, meal, or nutrition question…"
                rows={2}
                className="flex-1 px-4 py-3 bg-[#141414] border border-[#1e1e1e] rounded-xl text-sm text-[#e0e0e0] outline-none resize-none font-body leading-relaxed placeholder:text-[#3a3a3a] focus:border-[#ff5a1f] transition-colors"
                style={{ minHeight: 52, maxHeight: 120 }}
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg font-bold transition-all flex-shrink-0 ${
                  input.trim() && !loading
                    ? 'bg-[#ff5a1f] text-white shadow-[0_2px_16px_rgba(255,90,31,0.35)] hover:bg-orange-500 active:scale-95'
                    : 'bg-[#141414] text-[#333] cursor-not-allowed border border-[#1e1e1e]'
                }`}
              >
                {loading
                  ? <span className="w-4 h-4 rounded-full border-2 border-[#444] border-t-white animate-spin" />
                  : '↑'
                }
              </button>
            </div>
            <p className="text-[10px] text-[#333] text-center mt-2.5">
              AI responses are for informational purposes only. Consult a registered dietitian for medical nutrition advice.
            </p>
          </div>
        </div>
      </div>

      {/* Bounce animation for typing dots */}
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.3; }
          40%            { transform: scale(1);   opacity: 1; }
        }
      `}</style>
    </div>
  )
}