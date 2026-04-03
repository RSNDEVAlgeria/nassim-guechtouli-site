import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Cursor from './components/Cursor'
import Loader from './components/Loader'
import BgOrbs from './components/BgOrbs'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Work from './components/Work'
import About from './components/About'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Admin from './pages/Admin'

type Page = 'home' | 'admin'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState<Page>('home')

  useEffect(() => {
    const path = window.location.pathname
    if (path === '/admin') {
      setPage('admin')
      setLoading(false)
    } else {
      const timer = setTimeout(() => setLoading(false), 2000)
    }
    return () => {}
  }, [])

  if (page === 'admin') {
    return <Admin />
  }

  return (
    <>
      <Loader isVisible={loading} />
      <Cursor />
      <BgOrbs />
      <AnimatePresence>
        {!loading && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ position: 'relative', zIndex: 1 }}
          >
            <Navbar />
            <main>
              <Hero />
              <Work />
              <About />
              <Skills />
              <Contact />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
