import { useState, useEffect, useRef } from 'react'

const prefersReducedMotion = () => {
  return (
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function useCountUp(target: number, active: boolean, duration = 600) {
  const [value, setValue] = useState(0)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    if (!active) return

    if (prefersReducedMotion()) {
      frameRef.current = requestAnimationFrame(() => setValue(target))
      return () => {
        if (frameRef.current) cancelAnimationFrame(frameRef.current)
      }
    }

    let start: number | null = null

    const step = (now: number) => {
      if (start === null) start = now
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))
      if (progress < 1) frameRef.current = requestAnimationFrame(step)
    }

    frameRef.current = requestAnimationFrame(step)
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [target, active, duration])

  return active ? value : 0
}
