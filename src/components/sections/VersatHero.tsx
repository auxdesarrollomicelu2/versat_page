import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { VERSAT_CONFIG } from '../../lib/versat.constants'
import { useBooking } from '../../hooks/useBooking'
import BookingModal from '../ui/BookingModal'
import { useRef } from 'react'
import imagen1 from '../../assets/images/imagen1.png'

const HERO_TAGS = [
  'E-commerce',
  'CRM',
  'IA',
  'Turnero',
  'BI',
  'Automatización',
]

export default function VersatHero() {
  const booking = useBooking()
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.4])
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '60%'])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.55, 0.85])
  const splitLeft = useTransform(scrollYProgress, [0, 0.4], ['0%', '-10%'])
  const splitRight = useTransform(scrollYProgress, [0, 0.4], ['0%', '10%'])

  return (
    <>
      <section
        ref={containerRef}
        id="inicio"
        className="relative min-h-[100dvh] overflow-hidden"
      >
        {/* Full-bleed background image with parallax */}
        <motion.div
          className="absolute inset-0"
          style={{ scale: imageScale, y: imageY }}
        >
          <img
            src={imagen1}
            alt=""
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
        </motion.div>

        {/* Dark overlay */}
        <motion.div
          className="absolute inset-0 bg-[#0b1013]"
          style={{ opacity: overlayOpacity }}
        />

        {/* Teal gradient tint */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.08] via-transparent to-accent/[0.04]" />

        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(to right, #00C2A8 1px, transparent 1px), linear-gradient(to bottom, #00C2A8 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }} />

        {/* Diagonal accent line */}
        <motion.div
          className="absolute top-0 left-[35%] w-px h-full bg-gradient-to-b from-accent/50 via-accent/10 to-transparent origin-top"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ transform: 'rotate(15deg)' }}
        />

        {/* Vertical label left side */}
        <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-6 lg:left-10 z-20 flex-col items-center gap-3">
          <motion.div
            className="w-px h-24 bg-gradient-to-b from-transparent to-accent/60"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
            style={{ transformOrigin: 'top' }}
          />
          <span
            className="text-accent font-mono text-[10px] uppercase tracking-[0.4em] whitespace-nowrap"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            est &middot; 2020 / medellin
          </span>
          <motion.div
            className="w-px h-24 bg-gradient-to-b from-accent/60 to-transparent"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
            style={{ transformOrigin: 'top' }}
          />
        </div>

        {/* Vertical label right side - coordinates */}
        <div className="hidden md:flex absolute top-32 right-6 lg:right-10 z-20 flex-col gap-2 text-right">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-zinc-400 font-mono text-[10px] uppercase tracking-widest"
          >
            6.2442&deg; N
            <br />
            75.5812&deg; W
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative z-10 min-h-[100dvh] flex flex-col justify-center px-5 md:px-16 lg:px-24 py-24 md:py-28">

          {/* Main headline */}
          <motion.div style={{ y: textY }}>
            <div className="w-full max-w-[1400px] mx-auto">
              {/* Overline */}
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                transition={{ duration: 1, delay: 0.3 }}
                className="flex items-center gap-3 mb-6 md:mb-8"
              >
                <div className="w-8 md:w-12 h-px bg-accent" />
                <span className="text-accent font-mono text-[10px] md:text-[11px] uppercase tracking-[0.3em]">
                  Software a medida
                </span>
              </motion.div>

              {/* Massive split headline */}
              <div className="overflow-hidden">
                <motion.div style={{ x: splitLeft }}>
                  <motion.h1
                    className="text-[clamp(3.5rem,14vw,11rem)] font-black leading-[0.85] tracking-tighter text-white"
                    initial={{ y: '120%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    Transforma
                  </motion.h1>
                </motion.div>
              </div>
              <div className="overflow-hidden">
                <motion.div style={{ x: splitRight }}>
                  <motion.h1
                    className="text-[clamp(3.5rem,14vw,11rem)] font-black leading-[0.9] tracking-tight text-transparent"
                    style={{
                      WebkitTextStroke: '2.5px rgba(0, 194, 168, 0.95)',
                      letterSpacing: '0.02em',
                    }}
                    initial={{ y: '120%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    tu negocio.
                  </motion.h1>
                </motion.div>
              </div>

              {/* Below headline - description + chips */}
              <motion.div
                className="mt-8 md:mt-16 md:ml-auto md:text-right max-w-xl"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
              >
                <p className="text-base md:text-xl text-zinc-200 leading-relaxed mb-5 md:mb-6">
                  {VERSAT_CONFIG.description}
                </p>
                <div className="flex flex-wrap gap-1.5 md:gap-2 md:justify-end">
                  {HERO_TAGS.map((tag, i) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1 + i * 0.06 }}
                      className="inline-flex items-center gap-1.5 px-2 md:px-3 py-0.5 md:py-1 border border-accent/30 bg-accent/5 text-accent font-mono text-[9px] md:text-[10px] uppercase tracking-widest"
                    >
                      <span className="w-1 h-1 bg-accent rounded-full" />
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Bottom bar - compact on mobile */}
          <motion.div
            className="flex items-center justify-between gap-4 max-w-[1400px] mx-auto w-full mt-6 md:mt-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            {/* CTA - smaller on mobile */}
            <div className="flex items-center gap-4 md:gap-6">
              <motion.button
                onClick={booking.openModal}
                className="group relative overflow-hidden bg-accent text-surface font-bold text-xs md:text-sm px-6 md:px-10 py-3.5 md:py-5"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <span className="relative z-10 flex items-center gap-2 md:gap-3">
                  {VERSAT_CONFIG.cta}
                  <span>&rarr;</span>
                </span>
                <motion.div
                  className="absolute inset-0 bg-accent-deep"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.button>

              <a
                href="#servicios"
                className="hidden sm:flex group items-center gap-2 text-zinc-200 hover:text-white transition-colors text-sm font-medium"
              >
                <span className="w-6 h-px bg-zinc-500 group-hover:bg-accent group-hover:w-10 transition-all" />
                <span>{VERSAT_CONFIG.ctaSecondary}</span>
              </a>
            </div>

            {/* Scroll indicator - hidden on very small screens */}
            <div className="hidden sm:flex items-center gap-3">
              <span className="text-zinc-400 font-mono text-[9px] md:text-[10px] uppercase tracking-widest">
                Scroll
              </span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-8 h-8 border border-accent/50 rounded-full flex items-center justify-center">
                  <ArrowDown className="w-3.5 h-3.5 text-accent" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Corner frame elements - hidden on mobile */}
        <div className="hidden md:block absolute top-12 left-6 lg:left-10 w-12 h-12 border-t border-l border-accent/30 pointer-events-none" />
        <div className="hidden md:block absolute top-12 right-6 lg:right-10 w-12 h-12 border-t border-r border-accent/30 pointer-events-none" />
        <div className="hidden md:block absolute bottom-8 left-6 lg:left-10 w-12 h-12 border-b border-l border-accent/30 pointer-events-none" />
        <div className="hidden md:block absolute bottom-8 right-6 lg:right-10 w-12 h-12 border-b border-r border-accent/30 pointer-events-none" />

        {/* Frame numbers */}
        <div className="hidden md:block absolute top-12 left-6 lg:left-10 -mt-4 pointer-events-none">
          <span className="text-accent/40 font-mono text-[9px] uppercase tracking-widest">
            HERO.01
          </span>
        </div>
      </section>

      <BookingModal isOpen={booking.isOpen} onClose={booking.closeModal} step={booking.step} form={booking.form} onFieldChange={booking.updateField} onNext={booking.goNext} onBack={booking.goBack} onSubmit={booking.submit} isStep1Valid={booking.isStep1Valid} isStep2Valid={booking.isStep2Valid} loading={booking.loading} error={booking.error} />
    </>
  )
}
