import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Apply saved theme before first render to avoid flash of wrong theme
;(function () {
  const theme = localStorage.getItem('ff_theme') || 'dark'
  const html  = document.documentElement
  if (theme === 'light') {
    html.classList.remove('dark')
    html.classList.add('light')
  } else if (theme === 'dark') {
    html.classList.add('dark')
    html.classList.remove('light')
  } else {
    // system
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    html.classList.add(prefersDark ? 'dark' : 'light')
  }
})()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)