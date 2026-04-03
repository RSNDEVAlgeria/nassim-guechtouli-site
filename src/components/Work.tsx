import { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { supabase, Project } from '../lib/supabase'
import './Work.css'

const categories = ['All', 'Branding', 'UI/UX', 'Print', 'Motion']

const defaultProjects: Project[] = [
  {
    id: 1,
    title: 'RSN Dev Identity',
    category: 'Branding',
    year: '2024',
    tags: ['Logo', 'Brand System', 'Typography'],
    color: '#63b3ed',
    gradient: 'linear-gradient(135deg, #1a3a5c 0%, #0d1530 100%)',
    accent: 'rgba(99, 179, 237, 0.2)',
    description: 'Complete visual identity system for RSN Dev — logo, color palette, and design language.',
    size: 'large',
    order_index: 1,
  },
  {
    id: 2,
    title: 'Aether UI Kit',
    category: 'UI/UX',
    year: '2024',
    tags: ['Design System', 'Components', 'Figma'],
    color: '#9f7aea',
    gradient: 'linear-gradient(135deg, #2d1b5c 0%, #1a0d30 100%)',
    accent: 'rgba(159, 122, 234, 0.2)',
    description: 'A comprehensive dark-mode UI kit with 200+ components built for modern web applications.',
    size: 'medium',
    order_index: 2,
  },
  {
    id: 3,
    title: 'Bloom Magazine',
    category: 'Print',
    year: '2023',
    tags: ['Editorial', 'Layout', 'Typography'],
    color: '#fc8181',
    gradient: 'linear-gradient(135deg, #5c1a1a 0%, #300d0d 100%)',
    accent: 'rgba(252, 129, 129, 0.2)',
    description: 'Editorial layout design for a youth culture magazine — bold typography meets refined layouts.',
    size: 'medium',
    order_index: 3,
  },
  {
    id: 4,
    title: 'Nyx Motion Pack',
    category: 'Motion',
    year: '2024',
    tags: ['Animation', 'After Effects', 'Loop'],
    color: '#68d391',
    gradient: 'linear-gradient(135deg, #1a3a2d 0%, #0d1a15 100%)',
    accent: 'rgba(104, 211, 145, 0.2)',
    description: 'A series of seamless motion graphics loops for social media and brand campaigns.',
    size: 'small',
    order_index: 4,
  },
  {
    id: 5,
    title: 'Kairos Brand',
    category: 'Branding',
    year: '2023',
    tags: ['Identity', 'Packaging', 'Strategy'],
    color: '#f6ad55',
    gradient: 'linear-gradient(135deg, #5c3a1a 0%, #301e0d 100%)',
    accent: 'rgba(246, 173, 85, 0.2)',
    description: 'Full brand identity for a luxury lifestyle startup — from concept to complete brand guidelines.',
    size: 'small',
    order_index: 5,
  },
  {
    id: 6,
    title: 'Pulse Dashboard',
    category: 'UI/UX',
    year: '2024',
    tags: ['SaaS', 'Analytics', 'UX Research'],
    color: '#63b3ed',
    gradient: 'linear-gradient(135deg, #1a2e5c 0%, #0d1530 100%)',
    accent: 'rgba(99, 179, 237, 0.2)',
    description: 'Analytics dashboard redesign for a B2B SaaS platform — doubling user engagement metrics.',
    size: 'large',
    order_index: 6,
  },
]

export default function Work() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [projects, setProjects] = useState<Project[]>(defaultProjects)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  useEffect(() => {
    async function loadProjects() {
      const { data } = await supabase.from('projects').select('*').order('order_index')
      if (data && data.length > 0) {
        setProjects(data)
      }
    }
    loadProjects()
  }, [])

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory)

  return (
    <section id="work" ref={sectionRef} className="work-section">
      <div className="container">
        {/* Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="section-tag">Selected Work</span>
          <h2 className="section-title">
            Projects that
            <span className="grad-text"> define me</span>
          </h2>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          className="work-filters"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map(cat => (
            <motion.button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
            >
              {cat}
              {activeCategory === cat && (
                <motion.div
                  className="filter-active-bg"
                  layoutId="filterBg"
                  transition={{ type: 'spring', bounce: 0.25, duration: 0.4 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div className="work-grid" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                isHovered={hoveredId === project.id}
                onHover={() => setHoveredId(project.id)}
                onUnhover={() => setHoveredId(null)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

interface ProjectCardProps {
  project: Project
  index: number
  isHovered: boolean
  onHover: () => void
  onUnhover: () => void
}

function ProjectCard({ project, index, isHovered, onHover, onUnhover }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: '-50px' })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20
    cardRef.current.style.setProperty('--rx', `${y}deg`)
    cardRef.current.style.setProperty('--ry', `${-x}deg`)
    cardRef.current.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`)
    cardRef.current.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`)
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.setProperty('--rx', '0deg')
    cardRef.current.style.setProperty('--ry', '0deg')
    onUnhover()
  }

  return (
    <motion.div
      ref={cardRef}
      className={`project-card card-${project.size}`}
      data-cursor="view"
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      layout
      onMouseMove={handleMouseMove}
      onMouseEnter={onHover}
      onMouseLeave={handleMouseLeave}
      whileHover={{ z: 20 }}
      style={{
        background: project.gradient,
        '--accent': project.accent,
        '--color': project.color,
        transform: `perspective(800px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))`,
      } as React.CSSProperties}
    >
      {/* Shine overlay */}
      <div className="card-shine" />

      {/* Glass content */}
      <div className="card-inner">
        <div className="card-top">
          <span className="card-cat" style={{ color: project.color }}>
            {project.category}
          </span>
          <span className="card-year">{project.year}</span>
        </div>

        {/* Visual area */}
        <div className="card-visual">
          <div className="card-visual-orb" style={{ background: project.accent }} />
          <div className="card-letter" style={{ color: project.color }}>
            {project.title[0]}
          </div>
        </div>

        <div className="card-bottom">
          <h3 className="card-title">{project.title}</h3>
          <p className="card-desc">{project.description}</p>
          <div className="card-tags">
            {project.tags.map((tag: string) => (
              <span key={tag} className="card-tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Hover arrow */}
      <motion.div
        className="card-arrow"
        animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
        transition={{ duration: 0.2 }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
    </motion.div>
  )
}
