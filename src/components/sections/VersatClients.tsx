import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import centrojapon from '../../assets/images/centrojapon.png'
import logoEH from '../../assets/images/logoEH.png'
import micelu from '../../assets/images/micelu1.png'
import lampert from '../../assets/images/lampert.png'
import sirius from '../../assets/images/sirius.png'

const CLIENTS = [
  { name: 'Somos El Hueco', industry: 'E-commerce',          logo: logoEH },
  { name: 'Micelu',         industry: 'Intranet Empresarial', logo: micelu },
  { name: 'Centro Japón',   industry: 'Cultura',              logo: centrojapon },
  { name: 'Lampert',        industry: 'Industria',            logo: lampert },
  { name: 'Sirius',         industry: 'Perfumería',           logo: sirius },
]

// Two identical copies = perfect seamless loop (animating 0 → -50% lands exactly back to start)
const ROW_1 = [...CLIENTS, ...CLIENTS]
const ROW_2 = [...CLIENTS.slice().reverse(), ...CLIENTS.slice().reverse()]

export default function VersatClients() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Section title scroll parallax
  const titleX = useTransform(scrollYProgress, [0, 1], ['0%', '-15%'])

  return (
    <section ref={sectionRef} className="relative bg-surface py-8 md:py-12 overflow-hidden">
      {/* Background giant text - scroll driven */}
      <motion.div
        className="absolute inset-0 flex items-center pointer-events-none select-none opacity-[0.025] overflow-hidden"
        style={{ x: titleX }}
      >
        <span className="text-[10rem] md:text-[16rem] font-black whitespace-nowrap text-white tracking-tighter leading-none">
          PARTNERS &middot; PARTNERS &middot; PARTNERS &middot; PARTNERS
        </span>
      </motion.div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <span className="text-accent font-mono text-[11px] uppercase tracking-[0.3em] mb-4 block">
              /clientes
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] text-white">
              Empresas que
              <br />
              <span className="text-zinc-500">construyen con nosotros</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-accent font-mono text-4xl md:text-5xl font-black">
              {String(CLIENTS.length).padStart(2, '0')}
            </span>
            <div className="flex flex-col">
              <span className="text-zinc-300 font-mono text-xs uppercase tracking-widest">
                partners
              </span>
              <span className="text-zinc-500 font-mono text-[10px]">activos</span>
            </div>
          </div>
        </motion.div>

        {/* Marquee strips - full bleed */}
        <div className="space-y-2 md:space-y-3">
          <MarqueeRow logos={ROW_1} duration={20} direction="left" />
          <MarqueeRow logos={ROW_2} duration={25} direction="right" />
        </div>

        {/* Bottom line */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 mt-8">
          <div className="h-px bg-gradient-to-r from-surface-border via-surface-border to-transparent" />
        </div>
      </div>
    </section>
  )
}

function MarqueeRow({
  logos,
  duration,
  direction,
}: {
  logos: typeof CLIENTS
  duration: number
  direction: 'left' | 'right'
}) {
  return (
    <div className="relative overflow-hidden border-y border-surface-border bg-surface-tinted/40">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex items-center w-max"
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {logos.map((client, i) => (
          <LogoCell key={`${client.name}-${i}`} client={client} />
        ))}
      </motion.div>
    </div>
  )
}

function LogoCell({ client }: { client: typeof CLIENTS[0] }) {
  return (
    <div className="group relative shrink-0 px-12 md:px-20 py-8 md:py-12 flex items-center gap-6 border-r border-surface-border min-w-[280px] md:min-w-[360px] hover:bg-surface-raised/40 transition-colors duration-500">
      {/* Logo */}
      <div className="w-24 md:w-32 h-16 md:h-20 flex items-center justify-center flex-shrink-0">
        <img
          src={client.logo}
          alt={client.name}
          className="max-h-full max-w-full object-contain opacity-50 group-hover:opacity-100 filter grayscale group-hover:grayscale-0 transition-all duration-500"
          loading="lazy"
        />
      </div>

      {/* Vertical divider */}
      <div className="w-px h-10 bg-surface-border" />

      {/* Meta info */}
      <div className="flex flex-col gap-1">
        <span className="text-white text-base md:text-lg font-bold tracking-tight whitespace-nowrap leading-none">
          {client.name}
        </span>
        <span className="text-accent font-mono text-[10px] uppercase tracking-widest whitespace-nowrap">
          {client.industry}
        </span>
      </div>

      {/* Hover accent corner */}
      <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-accent/0 group-hover:border-accent/50 transition-colors duration-500" />
    </div>
  )
}
