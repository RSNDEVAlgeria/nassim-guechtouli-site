import { motion } from 'framer-motion'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-line" />
      <div className="container footer-inner">
        <div className="footer-left">
          <span className="footer-logo">NG<span className="footer-dot">.</span></span>
          <p className="footer-copy">
            © {year} Nassim Guechtouli.<br />
            <span>All rights reserved.</span>
          </p>
        </div>

        <div className="footer-center">
          <motion.a
            href="#hero"
            className="footer-scroll-top"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            whileHover={{ y: -4 }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 16V4M4 10l6-6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Back to top</span>
          </motion.a>
        </div>

        <div className="footer-right">
          <p className="footer-made">
            Crafted with passion at
            <a href="#" className="footer-rsn"> RSN Dev</a>
          </p>
          <p className="footer-stack">React · TypeScript · Framer Motion</p>
        </div>
      </div>
    </footer>
  )
}
