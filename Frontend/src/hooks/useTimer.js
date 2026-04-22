import { useState, useEffect, useRef, useCallback } from 'react'

export function useTimer(initialSeconds = 0) {
  const [seconds, setSeconds]     = useState(initialSeconds)
  const [isRunning, setIsRunning] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const intervalRef = useRef(null)

  const tick = useCallback(() => {
    setSeconds(prev => {
      if (prev <= 1) {
        setIsRunning(false)
        setIsFinished(true)
        clearInterval(intervalRef.current)
        return 0
      }
      return prev - 1
    })
  }, [])

  const start = useCallback(() => {
    if (seconds <= 0) return
    setIsFinished(false)
    setIsRunning(true)
    intervalRef.current = setInterval(tick, 1000)
  }, [seconds, tick])

  const pause = useCallback(() => {
    setIsRunning(false)
    clearInterval(intervalRef.current)
  }, [])

  const reset = useCallback((newSecs) => {
    clearInterval(intervalRef.current)
    setIsRunning(false)
    setIsFinished(false)
    setSeconds(newSecs ?? initialSeconds)
  }, [initialSeconds])

  const toggle = useCallback(() => {
    isRunning ? pause() : start()
  }, [isRunning, start, pause])

  useEffect(() => () => clearInterval(intervalRef.current), [])

  const minutes = Math.floor(seconds / 60)
  const secs    = seconds % 60
  const formatted = `${String(minutes).padStart(2,'0')}:${String(secs).padStart(2,'0')}`
  const progress  = initialSeconds > 0 ? ((initialSeconds - seconds) / initialSeconds) * 100 : 0

  return { seconds, isRunning, isFinished, start, pause, reset, toggle, formatted, progress }
}

export function useStopwatch() {
  const [elapsed, setElapsed]     = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef(null)

  const start = useCallback(() => {
    setIsRunning(true)
    intervalRef.current = setInterval(() => setElapsed(e => e + 1), 1000)
  }, [])

  const stop = useCallback(() => {
    setIsRunning(false)
    clearInterval(intervalRef.current)
  }, [])

  const reset = useCallback(() => {
    stop()
    setElapsed(0)
  }, [stop])

  useEffect(() => () => clearInterval(intervalRef.current), [])

  const minutes = Math.floor(elapsed / 60)
  const secs    = elapsed % 60
  const formatted = `${String(minutes).padStart(2,'0')}:${String(secs).padStart(2,'0')}`

  return { elapsed, isRunning, start, stop, reset, formatted }
}