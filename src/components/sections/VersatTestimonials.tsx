import { motion, AnimatePresence } from 'framer-motion'
import { Star } from 'lucide-react'
import { VERSAT_TESTIMONIALS } from '../../lib/versat.constants'
import { useState, useEffect, useCallback } from 'react'

import imgCentroJapon from '../../assets/images/centrojapon1.png'
import imgMicelu from '../../assets/images/micelu.png'
import imgLogoEH from '../../assets/images/logoEH1.png'

const TESTIMONIAL_IMAGES = [imgLogoEH, imgMicelu, imgCentroJapon]

export default function VersatTestimonials() {
  const [current, setCurrent] = useState(0)
  const [progress, setProgress] = useState(0)
  const total = VERSAT_TESTIMONIALS.testimonials.length

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total)
    setProgress(0)
  }, [total])

  const goTo = (index: number) => {
    setCurrent(index)
    setProgress(0)
  }

  useEffect(() => {
    const duration = 7000
    const interval = 50
    const increment = (interval / duration) * 100

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          next()
          return 0
        }
        return prev + increment
      })
    }, interval)

    return () => clearInterval(timer)
  }, [current, next])

  const testimonial = VERSAT_TESTIMONIALS.testimonials[current]

  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden bg-surface-raised" id="testimonios">
      {/* Background image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${current}`}
          className="absolute inset-0"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={TESTIMONIAL_IMAGES[current]}
            alt=""
            className="w-full h-full object-cover opacity-[0.08]"
            loading="lazy"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay with teal tint */}
      <div className="absolute inset-0 bg-gradient-to-r from-surface-raised via-surface-raised/95 to-surface-raised/80" />
      <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.05] via-transparent to-transparent" />

      {/* Diagonal accent line */}
      <motion.div
        className="absolute top-0 bottom-0 left-[60%] w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent"
        style={{ transform: 'rotate(10deg)' }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          <div className="lg:col-span-3">
            <span className="text-accent font-mono text-[11px] uppercase tracking-[0.3em] mb-8 block">
              /testimonios
            </span>

            <div className="space-y-4 mb-12">
              {VERSAT_TESTIMONIALS.testimonials.map((t, index) => (
                <button
                  key={index}
                  onClick={() => goTo(index)}
                  className={`group flex items-center gap-4 w-full text-left transition-all duration-500 ${
                    index === current ? 'opacity-100' : 'opacity-40 hover:opacity-70'
                  }`}
                >
                  <div className="relative w-8 h-[3px] bg-surface-border overflow-hidden">
                    {index === current && (
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-accent"
                        style={{ width: `${progress}%` }}
                      />
                    )}
                    {index < current && (
                      <div className="absolute inset-0 bg-accent/60" />
                    )}
                  </div>
                  <span className={`text-sm font-medium transition-colors duration-300 ${
                    index === current ? 'text-white' : 'text-zinc-400'
                  }`}>
                    {t.name}
                  </span>
                </button>
              ))}
            </div>

            <div className="font-mono text-zinc-400 text-xs">
              <span className="text-accent text-lg font-bold">{String(current + 1).padStart(2, '0')}</span>
              <span className="mx-2">/</span>
              <span>{String(total).padStart(2, '0')}</span>
            </div>
          </div>

          <div className="lg:col-span-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 40, clipPath: 'inset(0 0 100% 0)' }}
                animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
                exit={{ opacity: 0, y: -20, clipPath: 'inset(100% 0 0 0)' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex gap-1 mb-8">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.08, type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <Star className="w-5 h-5 fill-accent text-accent" />
                    </motion.div>
                  ))}
                </div>

                <blockquote className="text-2xl md:text-5xl lg:text-6xl text-white font-light tracking-tight leading-[1.15] mb-12 min-h-[180px] md:min-h-[280px]">
                  &ldquo;{testimonial.content}&rdquo;
                </blockquote>

                <div className="flex items-center gap-6">
                  <motion.div
                    className="w-16 h-16 border-2 border-accent/50 bg-accent/10 flex items-center justify-center"
                    initial={{ rotate: -10, scale: 0.8 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <span className="text-accent font-black text-2xl font-mono">
                      {testimonial.name.charAt(0)}
                    </span>
                  </motion.div>
                  <div>
                    <motion.div
                      className="text-white font-bold text-xl tracking-tight"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      {testimonial.name}
                    </motion.div>
                    <motion.div
                      className="text-zinc-300 font-mono text-sm mt-1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      {testimonial.role} &middot; {testimonial.company}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-surface-border to-transparent" />
    </section>
  )
}
