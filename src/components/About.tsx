import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import './About.css'

const timeline = [
  { year: '2022', title: 'First Design', desc: 'Discovered Figma and fell in love with design systems.' },
  { year: '2023', title: 'RSN Dev', desc: 'Joined RSN Dev as lead graphic designer. First real clients.' },
  { year: '2024', title: 'Brand Expert', desc: 'Delivered 20+ complete brand identities across 6 industries.' },
  { year: '2025', title: 'Now', desc: 'Expanding into motion design and interactive digital experiences.' },
]

const traits = [
  { icon: '✦', label: 'Detail-obsessed', desc: 'Every pixel is intentional' },
  { icon: '◈', label: 'Brand thinker', desc: 'Strategy-first approach' },
  { icon: '◉', label: 'Fast learner', desc: 'New skills every week' },
  { icon: '▲', label: 'Team player', desc: 'Open-source mindset' },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({ target: sectionRef })
  const imgY = useTransform(scrollYProgress, [0, 1], [-30, 30])

  return (
    <section id="about" ref={sectionRef} className="about-section">
      <div className="container">
        <div className="about-grid">
          {/* Left — visual */}
          <motion.div
            className="about-visual-col"
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.div className="about-card glass" style={{ y: imgY }}>
              {/* Avatar placeholder */}
              <div className="about-avatar">
                <div className="avatar-ring ring-1" />
                <div className="avatar-ring ring-2" />
                <div className="avatar-inner">
                  <span className="avatar-initial">N</span>
                </div>
                <div className="avatar-orb" />
              </div>

              {/* Info pill */}
              <div className="about-info-pill">
                <div className="pill-row">
                  <span className="pill-label">Name</span>
                  <span className="pill-val">Nassim Guechtouli</span>
                </div>
                <div className="pill-divider" />
                <div className="pill-row">
                  <span className="pill-label">Age</span>
                  <span className="pill-val">17 years old</span>
                </div>
                <div className="pill-divider" />
                <div className="pill-row">
                  <span className="pill-label">Based</span>
                  <span className="pill-val">Algeria 🇩🇿</span>
                </div>
                <div className="pill-divider" />
                <div className="pill-row">
                  <span className="pill-label">Studio</span>
                  <span className="pill-val accent">RSN Dev</span>
                </div>
              </div>

              {/* Traits */}
              <div className="about-traits">
                {traits.map((t, i) => (
                  <motion.div
                    key={t.label}
                    className="trait-chip"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.6 + i * 0.1, type: 'spring', bounce: 0.3 }}
                  >
                    <span className="trait-icon">{t.icon}</span>
                    <div>
                      <span className="trait-label">{t.label}</span>
                      <span className="trait-desc">{t.desc}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right — text */}
          <div className="about-text-col">
            <motion.span
              className="section-tag"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              About me
            </motion.span>

            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Design is my
              <br />
              <span className="grad-text">superpower</span>
            </motion.h2>

            <motion.p
              className="about-lead"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              I'm Nassim, a 17-year-old graphic designer from Algeria with a relentless
              passion for visual communication. At RSN Dev, I lead the visual identity
              of products that reach thousands of users.
            </motion.p>

            <motion.p
              className="about-body"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              My design philosophy is simple: every visual element must serve a purpose.
              Whether it's a brand identity, a UI component, or a print layout — I approach
              every project with the same obsessive attention to craft and storytelling.
            </motion.p>

            {/* Timeline */}
            <motion.div
              className="timeline"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  className="timeline-item"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <div className="timeline-year">{item.year}</div>
                  <div className="timeline-content">
                    <h4 className="timeline-title">{item.title}</h4>
                    <p className="timeline-desc">{item.desc}</p>
                  </div>
                  {i < timeline.length - 1 && <div className="timeline-line" />}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
