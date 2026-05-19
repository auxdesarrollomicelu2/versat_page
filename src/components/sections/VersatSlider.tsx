import { motion, useScroll, useTransform } from 'framer-motion'
import { VERSAT_SLIDER } from '../../lib/versat.constants'
import { useRef } from 'react'

export default function VersatSlider() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const x1 = useTransform(scrollYProgress, [0, 1], ['0%', '-25%'])
  const x2 = useTransform(scrollYProgress, [0, 1], ['-25%', '0%'])

  const items = [...VERSAT_SLIDER.items, ...VERSAT_SLIDER.items, ...VERSAT_SLIDER.items, ...VERSAT_SLIDER.items]

  return (
    <section ref={sectionRef} className="relative py-10 md:py-12 overflow-hidden bg-surface-tinted border-y border-surface-border">
      <motion.div className="flex gap-4 mb-4" style={{ x: x1 }}>
        {items.map((item, index) => (
          <div
            key={`r1-${index}`}
            className="flex items-center gap-3 px-6 py-3 border border-surface-border bg-surface-raised whitespace-nowrap hover:border-accent/40 transition-colors duration-300"
          >
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-zinc-200 font-mono text-sm">{item.name}</span>
          </div>
        ))}
      </motion.div>

      <motion.div className="flex gap-4" style={{ x: x2 }}>
        {items.map((item, index) => (
          <div
            key={`r2-${index}`}
            className="flex items-center gap-3 px-6 py-3 border border-surface-border bg-surface-raised whitespace-nowrap hover:border-accent/40 transition-colors duration-300"
          >
            <span className="w-2 h-2 bg-accent" />
            <span className="text-zinc-200 font-mono text-sm">{item.name}</span>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
