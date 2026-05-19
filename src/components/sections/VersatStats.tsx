import { motion, useScroll, useTransform } from 'framer-motion'
import { VERSAT_STATS } from '../../lib/versat.constants'
import { useRef } from 'react'

export default function VersatStats() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const marqueeX = useTransform(scrollYProgress, [0, 1], ['0%', '-30%'])
  const marqueeXReverse = useTransform(scrollYProgress, [0, 1], ['-30%', '0%'])

  return (
    <section ref={sectionRef} className="relative py-12 md:py-20 overflow-hidden bg-surface-tinted">
      {/* Teal radial glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.06] via-transparent to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-accent/[0.03] rounded-full blur-[80px] will-change-transform" />

      {/* Marquee background */}
      <div className="absolute inset-0 flex flex-col justify-center gap-4 opacity-[0.04] pointer-events-none overflow-hidden">
        <motion.div className="flex whitespace-nowrap" style={{ x: marqueeX }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="text-[12rem] md:text-[18rem] font-black mx-8 text-white">
              VERSAT
            </span>
          ))}
        </motion.div>
        <motion.div className="flex whitespace-nowrap" style={{ x: marqueeXReverse }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="text-[12rem] md:text-[18rem] font-black mx-8 text-accent/40">
              SOFTWARE
            </span>
          ))}
        </motion.div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-4">
            {VERSAT_STATS.title}
          </h2>
          <p className="text-zinc-300 text-lg max-w-2xl mx-auto">
            {VERSAT_STATS.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {VERSAT_STATS.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`text-center py-12 md:py-16 ${
                index < 2 ? 'md:border-r border-surface-border' : ''
              } ${index > 0 ? 'border-t md:border-t-0 border-surface-border' : ''}`}
            >
              <div className="text-6xl md:text-8xl lg:text-9xl font-black font-mono leading-none mb-4 text-white">
                <span className="text-accent">{stat.value}</span>
              </div>
              <div className="text-zinc-300 font-mono text-sm uppercase tracking-widest">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16 md:mt-24"
        >
          <motion.a
            href="#contacto"
            className="inline-flex items-center gap-3 bg-accent text-surface font-bold px-10 py-5 text-sm"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            {VERSAT_STATS.cta}
            <span className="font-mono">&rarr;</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
