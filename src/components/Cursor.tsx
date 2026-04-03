import { useEffect, useRef, useState } from 'react'
import { useMousePosition } from '../hooks/useMousePosition'
import './Cursor.css'

export default function Cursor() {
  const mouse = useMousePosition()
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const ringPos = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const animate = () => {
      if (ringRef.current) {
        ringPos.current.x += (mouse.x - ringPos.current.x) * 0.12
        ringPos.current.y += (mouse.y - ringPos.current.y) * 0.12
        ringRef.current.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.x - 4}px, ${mouse.y - 4}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [mouse.x, mouse.y])

  useEffect(() => {
    const handleHover = () => setIsHovering(true)
    const handleUnhover = () => setIsHovering(false)
    const handleDown = () => setIsClicking(true)
    const handleUp = () => setIsClicking(false)

    const interactives = document.querySelectorAll('a, button, [data-cursor]')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', handleHover)
      el.addEventListener('mouseleave', handleUnhover)
    })
    window.addEventListener('mousedown', handleDown)
    window.addEventListener('mouseup', handleUp)

    return () => {
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', handleHover)
        el.removeEventListener('mouseleave', handleUnhover)
      })
      window.removeEventListener('mousedown', handleDown)
      window.removeEventListener('mouseup', handleUp)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className={`cursor-dot ${isClicking ? 'clicking' : ''}`}
      />
      <div
        ref={ringRef}
        className={`cursor-ring ${isHovering ? 'hovering' : ''} ${isClicking ? 'clicking' : ''}`}
      />
    </>
  )
}
