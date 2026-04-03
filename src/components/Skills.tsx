import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './Skills.css'

const toolCategories = [
  {
    name: 'Design Tools',
    color: '#63b3ed',
    tools: [
      { name: 'Figma', level: 95 },
      { name: 'Adobe Illustrator', level: 90 },
      { name: 'Photoshop', level: 88 },
      { name: 'After Effects', level: 72 },
      { name: 'Premiere Pro', level: 65 },
    ],
  },
  {
    name: 'Disciplines',
    color: '#9f7aea',
    tools: [
      { name: 'Brand Identity', level: 96 },
      { name: 'UI/UX Design', level: 85 },
      { name: 'Typography', level: 92 },
      { name: 'Print Design', level: 80 },
      { name: 'Motion Design', level: 68 },
    ],
  },
  {
    name: 'Dev & Other',
    color: '#68d391',
    tools: [
      { name: 'HTML / CSS', level: 78 },
      { name: 'React (basics)', level: 55 },
      { name: 'Git', level: 70 },
      { name: 'Notion / Docs', level: 90 },
      { name: 'Copywriting', level: 75 },
    ],
  },
]

const softSkills = [
  'Creative Problem Solving',
  'Visual Storytelling',
  'Brand Strategy',
  'Client Communication',
  'Rapid Prototyping',
  'Design Critique',
  'Art Direction',
  'Color Theory',
]

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section id="skills" ref={sectionRef} className="skills-section">
      <div className="container">
        {/* Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-tag">Expertise</span>
          <h2 className="section-title">
            Tools of the
            <span className="grad-text"> trade</span>
          </h2>
        </motion.div>

        {/* Skill categories */}
        <div className="skills-grid">
          {toolCategories.map((cat, ci) => (
            <motion.div
              key={cat.name}
              className="skill-card glass"
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: ci * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
            >
              <div className="skill-card-header">
                <div className="skill-cat-dot" style={{ background: cat.color, boxShadow: `0 0 12px ${cat.color}` }} />
                <h3 className="skill-cat-name" style={{ color: cat.color }}>{cat.name}</h3>
              </div>

              <div className="skill-bars">
                {cat.tools.map((tool, ti) => (
                  <SkillBar
                    key={tool.name}
                    name={tool.name}
                    level={tool.level}
                    color={cat.color}
                    delay={ci * 0.15 + ti * 0.08}
                    isInView={isInView}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Soft skills cloud */}
        <motion.div
          className="soft-skills-section"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <h3 className="soft-skills-title">Core competencies</h3>
          <div className="soft-skills-cloud">
            {softSkills.map((skill, i) => (
              <motion.span
                key={skill}
                className="soft-skill-tag"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 + i * 0.07, type: 'spring', bounce: 0.35 }}
                whileHover={{ scale: 1.08, y: -3 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Big CTA card */}
        <motion.div
          className="skills-cta-card glass"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <div className="cta-card-orb orb-a" />
          <div className="cta-card-orb orb-b" />
          <div className="cta-card-content">
            <span className="cta-card-eyebrow">Open to work</span>
            <h3 className="cta-card-title">
              Let's build something <span className="grad-text">extraordinary</span>
            </h3>
            <p className="cta-card-desc">
              Looking for a designer who combines youthful energy with professional craft?
              I'm available for freelance projects, collaborations, and full-time opportunities.
            </p>
            <motion.a
              href="#contact"
              className="cta-primary"
              onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>Start a project</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

interface SkillBarProps {
  name: string
  level: number
  color: string
  delay: number
  isInView: boolean
}

function SkillBar({ name, level, color, delay, isInView }: SkillBarProps) {
  return (
    <div className="skill-bar-row">
      <div className="skill-bar-meta">
        <span className="skill-bar-name">{name}</span>
        <span className="skill-bar-pct" style={{ color }}>{level}%</span>
      </div>
      <div className="skill-bar-track">
        <motion.div
          className="skill-bar-fill"
          style={{ background: `linear-gradient(90deg, ${color}60, ${color})` }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        <motion.div
          className="skill-bar-glow"
          style={{ background: color }}
          initial={{ left: 0 }}
          animate={isInView ? { left: `${level}%` } : { left: 0 }}
          transition={{ duration: 1.2, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </div>
  )
}
