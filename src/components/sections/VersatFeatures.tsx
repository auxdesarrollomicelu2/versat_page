import { motion, useScroll, useTransform } from 'framer-motion'
import { ShoppingBag, Users, Zap, Bot, Ticket, BarChart } from 'lucide-react'
import { VERSAT_FEATURES } from '../../lib/versat.constants'
import { useState, useRef, useEffect } from 'react'

import imgAutomatizacion from '../../assets/images/automatizacion.png'
import imgConsultoria from '../../assets/images/consultoria.png'
import imgAnalisisDatos from '../../assets/images/analisis.png'
import imgDesarrolloWeb from '../../assets/images/web.png'
import imgSistemasMedida from '../../assets/images/medida.png'
import imgRetail from '../../assets/images/retail.png'

const ICONS: Record<string, React.ElementType> = {
  ShoppingBag, Users, Zap, Bot, Ticket, BarChart,
}

const FEATURE_IMAGES: Record<string, string> = {
  'desarrollo-web.jpg': imgDesarrolloWeb,
  'sistemas-medida.jpg': imgSistemasMedida,
  'automatizacion.jpg': imgAutomatizacion,
  'consultoria.jpg': imgConsultoria,
  'analisis-datos.jpg': imgAnalisisDatos,
  'retail.jpg': imgRetail,
}

export default function VersatFeatures() {
  const [expanded, setExpanded] = useState(0)
  const [mobileActive, setMobileActive] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const mobileListRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"]
  })

  // Mobile: derive active item from the mobile list's scroll progress.
  // Offset configured so that progress 0 = first item visible at center,
  // progress 1 = last item at center.
  const { scrollYProgress: mobileProgress } = useScroll({
    target: mobileListRef,
    offset: ["start 50%", "end 50%"],
  })

  useEffect(() => {
    const total = VERSAT_FEATURES.length
    const unsubscribe = mobileProgress.on('change', (v) => {
      const clamped = Math.max(0, Math.min(0.999, v))
      const idx = Math.floor(clamped * total)
      setMobileActive((prev) => (prev === idx ? prev : idx))
    })
    return unsubscribe
  }, [mobileProgress])

  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ['inset(10% 5% 10% 5% round 2rem)', 'inset(0% 0% 0% 0% round 0rem)']
  )

  // On mobile, skip the clip-path effect
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  return (
    <section ref={sectionRef} id="servicios" className="relative">
      {/* Clip-path reveal transition - desktop only */}
      <motion.div style={isMobile ? undefined : { clipPath }} className="bg-surface-tinted">
        {/* Header */}
        <div className="px-6 md:px-12 lg:px-20 pt-12 md:pt-20 pb-10 md:pb-12 max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
              <div>
                <span className="text-accent font-mono text-[11px] uppercase tracking-[0.3em] mb-4 block">
                  /soluciones
                </span>
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] text-white">
                  Todo lo que tu negocio
                  <br />
                  <span className="text-accent">necesita.</span>
                </h2>
              </div>
              <div className="md:text-right">
                <p className="text-zinc-300 text-lg leading-relaxed max-w-md md:ml-auto mb-4">
                  Seis soluciones pensadas para cómo opera un negocio de verdad. Cada una conecta con las demás.
                </p>
                <div className="inline-flex items-center gap-2 text-accent font-mono text-[10px] uppercase tracking-widest">
                  <span className="w-4 h-px bg-accent" />
                  <span>todo a medida</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ACCORDION IMAGE STRIPS - Desktop */}
        <div className="hidden md:block">
          <div className="flex h-[85vh] min-h-[600px]">
            {VERSAT_FEATURES.map((feature, index) => {
              const Icon = ICONS[feature.icon]
              const isExpanded = expanded === index
              const image = FEATURE_IMAGES[feature.image]

              return (
                <motion.div
                  key={feature.title}
                  className="relative cursor-pointer overflow-hidden border-r border-surface-border last:border-r-0"
                  animate={{
                    flex: isExpanded ? 5 : 1,
                  }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => setExpanded(index)}
                >
                  {/* Background image */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{ scale: isExpanded ? 1 : 1.1 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <img
                      src={image}
                      alt={feature.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </motion.div>

                  {/* Overlay gradient */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      background: isExpanded
                        ? 'linear-gradient(to top, rgba(11,16,19,0.92) 0%, rgba(11,16,19,0.3) 55%, rgba(11,16,19,0.1) 100%)'
                        : 'linear-gradient(to top, rgba(11,16,19,0.96) 0%, rgba(11,16,19,0.82) 50%, rgba(11,16,19,0.72) 100%)'
                    }}
                    transition={{ duration: 0.5 }}
                  />

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-between p-6 lg:p-8">
                    {/* Top - Number */}
                    <div className="flex items-center justify-between">
                      <span className="text-accent font-mono text-xs">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <motion.div
                        animate={{ rotate: isExpanded ? 0 : 90 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon className="w-5 h-5 text-accent" strokeWidth={1.5} />
                      </motion.div>
                    </div>

                    {/* Bottom - Info */}
                    <div>
                      {/* Tag - visible when expanded */}
                      <motion.div
                        className="mb-3"
                        animate={{
                          opacity: isExpanded ? 1 : 0,
                          y: isExpanded ? 0 : 10,
                        }}
                        transition={{ duration: 0.4, delay: isExpanded ? 0.15 : 0 }}
                      >
                        <span className="inline-flex items-center gap-2 text-accent font-mono text-[10px] uppercase tracking-[0.2em]">
                          <span className="w-3 h-px bg-accent" />
                          {(feature as typeof feature & { tag: string }).tag}
                        </span>
                      </motion.div>

                      <motion.h3
                        className="text-white font-black tracking-tight origin-bottom-left"
                        animate={{
                          fontSize: isExpanded ? '2.5rem' : '1rem',
                          writingMode: isExpanded ? 'horizontal-tb' : 'vertical-rl',
                          rotate: isExpanded ? 0 : 180,
                        }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {feature.title}
                      </motion.h3>

                      <motion.p
                        className="text-zinc-200 text-base leading-relaxed mt-4 max-w-md"
                        animate={{
                          opacity: isExpanded ? 1 : 0,
                          y: isExpanded ? 0 : 20,
                        }}
                        transition={{ duration: 0.5, delay: isExpanded ? 0.2 : 0 }}
                      >
                        {feature.description}
                      </motion.p>

                      <motion.div
                        className="h-px bg-accent mt-6"
                        animate={{ width: isExpanded ? '100px' : '0px' }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* MOBILE - Scroll-driven accordion: item index derived from scroll progress */}
        <div ref={mobileListRef} className="md:hidden">
          {VERSAT_FEATURES.map((feature, index) => {
            const Icon = ICONS[feature.icon]
            const image = FEATURE_IMAGES[feature.image]
            return (
              <MobileAccordionItem
                key={feature.title}
                feature={feature}
                index={index}
                Icon={Icon}
                image={image}
                isActive={mobileActive === index}
                onActivate={() => setMobileActive(index)}
              />
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}

function MobileAccordionItem({
  feature,
  index,
  Icon,
  image,
  isActive,
  onActivate,
}: {
  feature: typeof VERSAT_FEATURES[0]
  index: number
  Icon: React.ElementType
  image: string
  isActive: boolean
  onActivate: () => void
}) {
  return (
    <motion.div
      onClick={onActivate}
      className="relative overflow-hidden border-b border-surface-border cursor-pointer"
      animate={{ height: isActive ? 340 : 64 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Background image - fades only when active */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <img
          src={image}
          alt={feature.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1013] via-[#0b1013]/80 to-[#0b1013]/30" />
      </motion.div>

      {/* Collapsed bar */}
      <motion.div
        className="absolute inset-x-0 top-0 h-16 flex items-center px-5 gap-4 z-10"
        animate={{ opacity: isActive ? 0 : 1 }}
        transition={{ duration: 0.25 }}
        style={{ pointerEvents: isActive ? 'none' : 'auto' }}
      >
        <span className="text-accent font-mono text-[10px] font-bold w-6">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="h-px flex-1 bg-surface-border" />
        <span className="text-zinc-200 text-sm font-bold tracking-tight whitespace-nowrap">
          {feature.title}
        </span>
        <Icon className="w-4 h-4 text-accent/60 flex-shrink-0" strokeWidth={1.5} />
      </motion.div>

      {/* Expanded content */}
      <motion.div
        className="relative z-10 h-full flex flex-col justify-end p-5"
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.35, delay: isActive ? 0.15 : 0 }}
        style={{ pointerEvents: isActive ? 'auto' : 'none' }}
      >
        <div className="absolute top-4 left-5 right-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-accent font-mono text-[10px] font-bold">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="w-6 h-px bg-accent/40" />
          </div>
          <div className="w-8 h-8 border border-accent/30 flex items-center justify-center">
            <Icon className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
          </div>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className="w-3 h-px bg-accent" />
          <span className="text-accent font-mono text-[9px] uppercase tracking-[0.2em]">
            {(feature as typeof feature & { tag: string }).tag}
          </span>
        </div>

        <h3 className="text-2xl font-black text-white tracking-tight leading-tight mb-2">
          {feature.title}
        </h3>

        <p className="text-zinc-200 text-sm leading-relaxed">
          {feature.description}
        </p>
      </motion.div>
    </motion.div>
  )
}
