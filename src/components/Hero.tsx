import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useMousePosition } from '../hooks/useMousePosition'
import './Hero.css'

const ROLES = ['Graphic Designer', 'Brand Architect', 'Visual Storyteller', 'Creative Director']

export default function Hero() {
  const mouse = useMousePosition()
  const heroRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const parallaxX = (mouse.xPercent - 50) * 0.015
  const parallaxY = (mouse.yPercent - 50) * 0.015

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animFrameId: number
    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      size: number; alpha: number; color: string
    }> = []

    const colors = ['#63b3ed', '#9f7aea', '#fc8181', '#68d391', '#f6ad55']

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Create particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.3,
        alpha: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha
        ctx.fill()
        ctx.globalAlpha = 1
      })

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = '#63b3ed'
            ctx.globalAlpha = (1 - dist / 120) * 0.06
            ctx.lineWidth = 0.5
            ctx.stroke()
            ctx.globalAlpha = 1
          }
        })
      })

      animFrameId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animFrameId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const handleScroll = () => {
    const el = document.querySelector('#work')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.section
      id="hero"
      ref={heroRef}
      className="hero"
    >
      <canvas ref={canvasRef} className="hero-canvas" />

      {/* Magnetic orbs */}
      <motion.div
        className="hero-orb orb-1"
        animate={{
          x: parallaxX * 30,
          y: parallaxY * 30,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
      />
      <motion.div
        className="hero-orb orb-2"
        animate={{
          x: -parallaxX * 20,
          y: -parallaxY * 20,
        }}
        transition={{ type: 'spring', stiffness: 40, damping: 20 }}
      />
      <motion.div
        className="hero-orb orb-3"
        animate={{
          x: parallaxX * 15,
          y: -parallaxY * 25,
        }}
        transition={{ type: 'spring', stiffness: 60, damping: 25 }}
      />

      <div className="container hero-content">
        {/* Badge */}
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <span className="badge-dot" />
          Available for projects · 17 y/o · RSN Dev
        </motion.div>

        {/* Name */}
        <motion.div className="hero-name-wrap">
          <div className="hero-name-line">
            {'Nassim'.split('').map((char, i) => (
              <motion.span
                key={`n-${i}`}
                className="hero-name-char"
                initial={{ opacity: 0, y: 100, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.5 + i * 0.06,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>
          <span className="hero-name-mobile-space">&nbsp;</span>
          <div className="hero-name-line">
            {'Guechtouli'.split('').map((char, i) => (
              <motion.span
                key={`g-${i}`}
                className="hero-name-char hero-name-last"
                initial={{ opacity: 0, y: 100, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.85 + i * 0.05,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Animated role */}
        <motion.div
          className="hero-role-wrap"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 1.4 }}
        >
          <span className="hero-role-prefix">I'm a </span>
          <RoleCycler roles={ROLES} />
        </motion.div>

        {/* Description */}
        <motion.p
          className="hero-desc"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.6 }}
        >
          Crafting visual identities and digital experiences that leave
          a lasting impression — one pixel at a time.
        </motion.p>

        {/* CTA row */}
        <motion.div
          className="hero-ctas"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.8 }}
        >
          <motion.button
            className="cta-primary"
            onClick={handleScroll}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>View my work</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
          <motion.a
            href="#contact"
            className="cta-secondary"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Get in touch
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        onClick={handleScroll}
      >
        <div className="scroll-line" />
        <span>Scroll</span>
      </motion.div>
    </motion.section>
  )
}

function RoleCycler({ roles }: { roles: string[] }) {
  const idxRef = useRef(0)
  const textRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    const cycle = () => {
      if (!textRef.current) return
      textRef.current.style.opacity = '0'
      textRef.current.style.transform = 'translateY(-20px)'
      setTimeout(() => {
        idxRef.current = (idxRef.current + 1) % roles.length
        if (textRef.current) {
          textRef.current.textContent = roles[idxRef.current]
          textRef.current.style.transform = 'translateY(20px)'
          requestAnimationFrame(() => {
            if (textRef.current) {
              textRef.current.style.opacity = '1'
              textRef.current.style.transform = 'translateY(0)'
            }
          })
        }
      }, 300)
      timeout = setTimeout(cycle, 2500)
    }
    timeout = setTimeout(cycle, 2500)
    return () => clearTimeout(timeout)
  }, [roles])

  return (
    <span
      ref={textRef}
      className="hero-role-text"
      style={{ transition: 'opacity 0.3s ease, transform 0.3s ease' }}
    >
      {roles[0]}
    </span>
  )
}
