/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      colors: {
        forge: {
          bg:      '#080808',
          surface: '#101010',
          card:    '#141414',
          border:  '#1e1e1e',
          borderLight: '#2a2a2a',
          orange:  '#ff5a1f',
          orangeDim: 'rgba(255,90,31,0.12)',
          yellow:  '#ffcc00',
          yellowDim: 'rgba(255,204,0,0.1)',
          green:   '#22c55e',
          greenDim: 'rgba(34,197,94,0.1)',
          red:     '#ef4444',
          redDim:  'rgba(239,68,68,0.1)',
          blue:    '#3b82f6',
          text:    '#f0f0f0',
          muted:   '#888888',
          dim:     '#444444',
        }
      },
      backgroundImage: {
        'radial-orange': 'radial-gradient(ellipse at top left, rgba(255,90,31,0.06) 0%, transparent 60%)',
        'radial-green': 'radial-gradient(ellipse at top right, rgba(34,197,94,0.05) 0%, transparent 60%)',
        'card-shine': 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, transparent 50%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.4s ease both',
        'fade-in': 'fadeIn 0.3s ease both',
        'slide-in': 'slideIn 0.35s ease both',
        'pulse-glow': 'pulseGlow 2s ease infinite',
        'spin-slow': 'spin 1s linear infinite',
        'typing': 'typing 1.2s ease infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideIn: {
          from: { opacity: '0', transform: 'translateX(-10px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255,90,31,0.35)' },
          '50%':      { boxShadow: '0 0 0 8px rgba(255,90,31,0)' },
        },
        typing: {
          '0%, 80%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '40%':           { opacity: '1',   transform: 'scale(1)' },
        },
      },
      boxShadow: {
        'orange': '0 4px 24px rgba(255,90,31,0.25)',
        'orange-lg': '0 8px 40px rgba(255,90,31,0.3)',
        'card': '0 2px 16px rgba(0,0,0,0.4)',
        'modal': '0 24px 80px rgba(0,0,0,0.7)',
      }
    },
  },
  plugins: [],
}