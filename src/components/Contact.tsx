import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './Contact.css'

const socials = [
  {
    name: 'WhatsApp',
    handle: '+213 781 59 71 51',
    href: 'https://wa.me/213781597151',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    color: '#25D366',
  },
  {
    name: 'Instagram',
    handle: '@nassimo.art',
    href: 'https://www.instagram.com/nassimo.art/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    color: '#e4405f',
  },
  {
    name: 'Email',
    handle: 'guechtoulinassim9@gmail.com',
    href: 'mailto:guechtoulinassim9@gmail.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
    color: '#63b3ed',
  },
  {
    name: 'Behance',
    handle: '@nassimg',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.051-2.053-5.051-5.309 0-3.318 2.093-5.372 5.051-5.372 3.055 0 4.673 2.017 4.673 4.847 0 .338-.024.892-.069 1.082h-7.73c.033 1.449.77 2.352 2.05 2.352.647 0 1.121-.297 1.452-.892h3.725zm-7.744-3h4.562c-.022-1.303-.818-2.027-2.226-2.027-1.331 0-2.103.709-2.336 2.027zm-10.733 3h3.295c1.291 0 2.093-.689 2.093-1.78 0-1.09-.801-1.78-2.093-1.78H5.249v3.56zm0-5.75h3.014c1.186 0 1.919-.628 1.919-1.65 0-1.022-.732-1.65-1.919-1.65H5.249V11.25z"/>
      </svg>
    ),
    color: '#1769ff',
  },
  {
    name: 'LinkedIn',
    handle: 'Nassim Guechtouli',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    color: '#0077b5',
  },
]

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section id="contact" ref={sectionRef} className="contact-section">
      <div className="container">
        <motion.div
          className="section-header contact-header"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-tag">Get in touch</span>
          <h2 className="section-title">
            Have a project?
            <br />
            <span className="grad-text">Let's talk.</span>
          </h2>
          <p className="contact-intro">
            I'm always open to new opportunities, collaborations, and interesting projects.
            Feel free to reach out through any of the platforms below.
          </p>
        </motion.div>

        <motion.div
          className="contact-sidebar"
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          <div className="glass avail-card">
            <div className="avail-indicator">
              <span className="avail-dot" />
              <span className="avail-text">Available for freelance work</span>
            </div>
            <p className="avail-desc">
              Currently accepting new projects for Q2–Q3 2025.
              Response time: under 24 hours.
            </p>
            <div className="avail-meta">
              <div className="avail-meta-item">
                <span className="avail-meta-label">Based in</span>
                <span className="avail-meta-val">Algeria 🇩🇿</span>
              </div>
              <div className="avail-meta-item">
                <span className="avail-meta-label">Works remotely</span>
                <span className="avail-meta-val">Worldwide 🌍</span>
              </div>
              <div className="avail-meta-item">
                <span className="avail-meta-label">Languages</span>
                <span className="avail-meta-val">AR · FR · EN</span>
              </div>
            </div>
          </div>

          <div className="contact-socials">
            <h4 className="socials-label">Find me on</h4>
            <div className="social-links">
              {socials.map((s, i) => (
                <motion.a
                  key={s.name}
                  href={s.href}
                  className="social-link glass"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.08 }}
                  whileHover={{ y: -4, borderColor: `${s.color}50` }}
                  style={{ '--social-color': s.color } as React.CSSProperties}
                >
                  <span className="social-icon" style={{ color: s.color }}>{s.icon}</span>
                  <div className="social-info">
                    <span className="social-name">{s.name}</span>
                    <span className="social-handle">{s.handle}</span>
                  </div>
                  <svg className="social-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 12L12 2M12 2H5M12 2v7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
