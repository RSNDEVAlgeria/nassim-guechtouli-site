import { useState, useEffect } from 'react'

export interface MousePosition {
  x: number
  y: number
  xPercent: number
  yPercent: number
}

export function useMousePosition() {
  const [pos, setPos] = useState<MousePosition>({ x: 0, y: 0, xPercent: 0, yPercent: 0 })

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setPos({
        x: e.clientX,
        y: e.clientY,
        xPercent: (e.clientX / window.innerWidth) * 100,
        yPercent: (e.clientY / window.innerHeight) * 100,
      })
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return pos
}
