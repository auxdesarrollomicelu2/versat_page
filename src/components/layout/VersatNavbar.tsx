import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { VERSAT_NAV_LINKS } from '../../lib/versat.constants'
import { useBooking } from '../../hooks/useBooking'
import BookingModal from '../ui/BookingModal'
import logo from '../../assets/images/versat.logo.png'

export default function VersatNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')
  const booking = useBooking()

  // Track scroll & active section - throttled with rAF + passive listener
  useEffect(() => {
    let ticking = false
    const sections = VERSAT_NAV_LINKS.map(l => l.href.replace('#', ''))

    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 80)
        const current = sections.find((id) => {
          const el = document.getElementById(id)
          if (!el) return false
          const rect = el.getBoundingClientRect()
          return rect.top <= 120 && rect.bottom >= 120
        })
        if (current) setActiveSection((prev) => (prev === current ? prev : current))
        ticking = false
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? 'bg-surface/80 backdrop-blur-2xl border-b border-surface-border'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 h-16 md:h-20 flex items-center justify-between gap-8">

          {/* Logo - just the image, big and clear */}
          <motion.a
            href="#inicio"
            className="flex items-center relative z-50"
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <img src={logo} alt="Versat" className="h-8 md:h-10 w-auto" />
          </motion.a>

          {/* Desktop nav - with active section indicator */}
          <ul className="hidden lg:flex items-center gap-2 bg-surface-raised/40 backdrop-blur-md border border-surface-border rounded-full px-2 py-1.5">
            {VERSAT_NAV_LINKS.map((link, index) => {
              const sectionId = link.href.replace('#', '')
              const isActive = activeSection === sectionId
              return (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.06, duration: 0.5 }}
                  className="relative"
                >
                  <a
                    href={link.href}
                    className={`relative px-4 py-1.5 text-[13px] transition-colors duration-300 font-medium block ${
                      isActive ? 'text-surface' : 'text-zinc-300 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-accent rounded-full"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </a>
                </motion.li>
              )
            })}
          </ul>

          {/* Right CTA - magnetic button */}
          <div className="hidden lg:flex items-center gap-3">
            <MagneticButton onClick={booking.openModal} />
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden relative z-50 w-10 h-10 flex items-center justify-center bg-surface-raised border border-surface-border"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Cerrar menu' : 'Abrir menu'}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={18} className="text-accent" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={18} className="text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile fullscreen menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
              animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0%)' }}
              exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden fixed inset-0 z-40 flex flex-col"
              style={{ backgroundColor: '#0b1013' }}
            >
              {/* Background decoration */}
              <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-accent/[0.05] rounded-full blur-[80px] will-change-transform" />

              <div className="flex-1 flex flex-col justify-center px-8 relative z-10">
                {/* Section label */}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-accent font-mono text-[10px] uppercase tracking-[0.3em] mb-12"
                >
                  /navegacion
                </motion.span>

                <nav className="space-y-1">
                  {VERSAT_NAV_LINKS.map((link, index) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.08 }}
                      className="group flex items-center gap-4 py-3 border-b border-surface-border"
                    >
                      <span className="text-accent font-mono text-xs w-8">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="flex-1 text-3xl md:text-4xl font-black text-white tracking-tight">
                        {link.label}
                      </span>
                      <motion.span
                        className="text-accent opacity-0 group-hover:opacity-100 transition-opacity"
                        whileHover={{ x: 4 }}
                      >
                        &rarr;
                      </motion.span>
                    </motion.a>
                  ))}
                </nav>

                <motion.button
                  onClick={() => { setIsOpen(false); booking.openModal() }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-12 flex items-center justify-between bg-accent text-surface font-bold px-8 py-5 text-lg group"
                >
                  <span>Agendar reunión</span>
                  <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    &rarr;
                  </motion.span>
                </motion.button>
              </div>

              {/* Bottom info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="px-8 pb-8 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-zinc-500"
              >
                <span>medellin / colombia</span>
                <span>versat.software</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <BookingModal isOpen={booking.isOpen} onClose={booking.closeModal} step={booking.step} form={booking.form} onFieldChange={booking.updateField} onNext={booking.goNext} onBack={booking.goBack} onSubmit={booking.submit} isStep1Valid={booking.isStep1Valid} isStep2Valid={booking.isStep2Valid} loading={booking.loading} error={booking.error} />
    </>
  )
}

/**
 * Magnetic button - pulls slightly toward cursor
 */
function MagneticButton({ onClick }: { onClick: () => void }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const x = useSpring(mouseX, { stiffness: 150, damping: 15 })
  const y = useSpring(mouseY, { stiffness: 150, damping: 15 })
  const textX = useTransform(x, (v) => v * 0.5)
  const textY = useTransform(y, (v) => v * 0.5)

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set((e.clientX - centerX) * 0.3)
    mouseY.set((e.clientY - centerY) * 0.3)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.button
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x, y }}
      className="relative px-6 py-2.5 bg-accent text-surface font-bold text-xs uppercase tracking-wider overflow-hidden group"
      whileTap={{ scale: 0.95 }}
    >
      <motion.span style={{ x: textX, y: textY }} className="relative z-10 flex items-center gap-2">
        Agendar
        <span className="font-mono">&rarr;</span>
      </motion.span>
      <motion.div
        className="absolute inset-0 bg-accent-deep"
        initial={{ y: '100%' }}
        whileHover={{ y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.button>
  )
}
