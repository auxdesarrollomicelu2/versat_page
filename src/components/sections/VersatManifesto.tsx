import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

/**
 * Editorial "manifesto" section — gives the brand a soul.
 * Large typography, word-by-word reveal on scroll.
 * Breaks the landing page pattern with a pause for brand personality.
 */

const MANIFESTO_WORDS = [
  'Cada',
  'negocio',
  'tiene',
  'su',
  'propia',
  'forma',
  'de',
  'vender.',
  'Nosotros',
  'la',
  'entendemos,',
  'la',
  'traducimos',
  'en',
  'código',
  'y',
  'la',
  'convertimos',
  'en',
  'un',
  'sistema',
  'que',
  'trabaja',
  'por',
  'ti.',
]

export default function VersatManifesto() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ['start 80%', 'end 30%'],
  })

  return (
    <section id="manifiesto" ref={sectionRef} className="relative bg-surface py-12 md:py-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'radial-gradient(circle, #00C2A8 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      {/* Soft glow */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-accent/[0.03] rounded-full blur-[80px] will-change-transform" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-12 md:mb-16"
        >
          <span className="text-accent font-mono text-[11px] uppercase tracking-[0.3em]">
            /manifiesto
          </span>
          <div className="flex-1 h-px bg-surface-border max-w-[200px]" />
          <span className="text-zinc-500 font-mono text-[11px] uppercase tracking-widest hidden md:inline">
            nuestra filosofía
          </span>
        </motion.div>

        {/* Main manifesto - word by word highlight on scroll */}
        <div ref={textRef} className="max-w-5xl">
          <p className="text-3xl md:text-5xl lg:text-6xl font-black leading-[1.15] tracking-tighter flex flex-wrap gap-x-3 md:gap-x-4 gap-y-2">
            {MANIFESTO_WORDS.map((word, i) => (
              <ManifestoWord
                key={i}
                word={word}
                index={i}
                total={MANIFESTO_WORDS.length}
                progress={scrollYProgress}
              />
            ))}
          </p>
        </div>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 flex items-center gap-4"
        >
          <div className="flex items-center gap-2">
            <motion.div
              className="w-2 h-2 rounded-full bg-accent"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-accent font-mono text-xs uppercase tracking-widest">
              &mdash; equipo versat
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function ManifestoWord({
  word,
  index,
  total,
  progress,
}: {
  word: string
  index: number
  total: number
  progress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const start = index / total
  const end = (index + 1) / total
  const opacity = useTransform(progress, [start, end], [0.2, 1])

  // Highlight specific power words in accent color
  const isHighlight = ['vender.', 'código', 'ti.'].includes(word)

  return (
    <motion.span
      style={{ opacity }}
      className={isHighlight ? 'text-accent' : 'text-white'}
    >
      {word}
    </motion.span>
  )
}
