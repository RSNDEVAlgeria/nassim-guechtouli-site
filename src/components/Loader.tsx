import { motion, AnimatePresence } from 'framer-motion'
import './Loader.css'

interface LoaderProps {
  isVisible: boolean
}

export default function Loader({ isVisible }: LoaderProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="loader"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Logo */}
          <motion.div
            className="loader-logo"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <div className="loader-ring" />
            <img src="/logo.jpg" alt="Nassim" className="loader-img" />
          </motion.div>

          {/* Name */}
          <motion.div
            className="loader-name"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Nassim Guechtouli
          </motion.div>

          {/* Progress bar */}
          <motion.div className="loader-progress-track">
            <motion.div
              className="loader-progress-fill"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="loader-tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.8 }}
          >
            Graphic Designer · RSN Dev
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
