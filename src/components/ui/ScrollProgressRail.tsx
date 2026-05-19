import { motion, useScroll, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

const SECTIONS = [
  { id: 'inicio', label: 'Inicio', num: '00' },
  { id: 'servicios', label: 'Servicios', num: '01' },
  { id: 'manifiesto', label: 'Manifiesto', num: '02' },
  { id: 'como-funciona', label: 'Proceso', num: '03' },
  { id: 'testimonios', label: 'Casos', num: '04' },
  { id: 'contacto', label: 'Contacto', num: '05' },
]

/**
 * Fixed vertical progress rail on right side (desktop only).
 * Shows current section + scroll progress. Acts as a visual spine
 * that ties the entire experience together.
 */
export default function ScrollProgressRail() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const [active, setActive] = useState('inicio')

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const current = SECTIONS.find((s) => {
          const el = document.getElementById(s.id)
          if (!el) return false
          const rect = el.getBoundingClientRect()
          return rect.top <= 200 && rect.bottom >= 200
        })
        if (current) setActive((prev) => (prev === current.id ? prev : current.id))
        ticking = false
      })
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="hidden xl:flex fixed top-1/2 -translate-y-1/2 right-6 z-40 flex-col items-end gap-1 pointer-events-none">
      {/* Top label */}
      <div className="mb-4 pointer-events-auto">
        <span className="text-zinc-600 font-mono text-[9px] uppercase tracking-[0.3em]">
          indice
        </span>
      </div>

      {/* Progress spine */}
      <div className="relative flex flex-col gap-3 pointer-events-auto">
        {SECTIONS.map((section) => {
          const isActive = active === section.id
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="group flex items-center gap-3 justify-end"
            >
              {/* Label - appears on hover */}
              <motion.span
                className="font-mono text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{
                  color: isActive ? '#00C2A8' : '#a1a1aa',
                }}
              >
                {section.num} &middot; {section.label}
              </motion.span>

              {/* Active label - always shown */}
              {isActive && (
                <motion.span
                  layoutId="rail-active-label"
                  className="absolute right-8 text-accent font-mono text-[10px] uppercase tracking-widest whitespace-nowrap pr-2"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  {section.label}
                </motion.span>
              )}

              {/* Tick marker */}
              <motion.div
                className="relative"
                animate={{
                  width: isActive ? '24px' : '12px',
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div
                  className="h-[2px]"
                  animate={{
                    background: isActive ? '#00C2A8' : '#3f3f46',
                    boxShadow: isActive ? '0 0 8px rgba(0, 194, 168, 0.6)' : 'none',
                  }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            </a>
          )
        })}
      </div>

      {/* Bottom - scroll percentage */}
      <div className="mt-6 pointer-events-auto">
        <div className="flex flex-col items-end gap-1">
          <motion.div
            className="w-px h-16 bg-surface-border relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-x-0 top-0 bg-accent origin-top"
              style={{ scaleY: progress, height: '100%' }}
            />
          </motion.div>
          <motion.span
            className="text-accent font-mono text-[9px] uppercase tracking-widest"
          >
            scroll
          </motion.span>
        </div>
      </div>
    </div>
  )
}
