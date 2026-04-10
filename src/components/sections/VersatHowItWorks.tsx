import { motion } from 'framer-motion'
import { CheckCircle2, MessageSquare, FileText, Rocket, Headphones } from 'lucide-react'
import { VERSAT_STEPS } from '../../lib/versat.constants'

const STEP_ICONS = {
  '01': MessageSquare,
  '02': FileText,
  '03': Rocket,
  '04': Headphones,
}

export default function VersatHowItWorks() {
  return (
    <section id="como-funciona" className="bg-dark py-24 px-6 relative overflow-hidden">
      {/* Patrón de grid sutil */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 194, 168, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 194, 168, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* Gradientes de luz */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-card/20 to-dark pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      {/* Líneas decorativas verticales */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-accent/10 to-transparent" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-accent/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">

        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-accent text-sm font-semibold uppercase tracking-widest inline-block"
          >
            El proceso
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl md:text-5xl font-black text-white mt-3 mb-4"
            style={{
              textShadow: '0 0 40px rgba(255, 255, 255, 0.1)'
            }}
          >
            Cómo trabajamos
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Un proceso claro y transparente desde el primer día.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {VERSAT_STEPS.map((step, index) => {
            const Icon = STEP_ICONS[step.step as keyof typeof STEP_ICONS]
            
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: 100, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.15,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 80
                }}
                className="relative group"
              >
                {/* Borde con gradiente animado */}
                <div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-br from-accent via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-full h-full bg-dark-card rounded-3xl" />
                </div>

                {/* Card vertical */}
                <div className="relative bg-dark-card border border-dark-border rounded-3xl p-8 h-[420px] flex flex-col transition-all duration-300 group-hover:border-transparent group-hover:-translate-y-2">
                  
                  {/* Header con número e icono */}
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-7xl font-black bg-gradient-to-br from-accent to-accent/40 bg-clip-text text-transparent leading-none">
                      {step.step}
                    </span>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center group-hover:from-accent/30 group-hover:to-accent/10 group-hover:scale-110 transition-all duration-300">
                      <Icon size={32} className="text-accent" />
                    </div>
                  </div>

                  {/* Línea decorativa */}
                  <div className="w-12 h-1 bg-gradient-to-r from-accent to-transparent mb-6 group-hover:w-full transition-all duration-500" />

                  {/* Contenido */}
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-xl mb-4 group-hover:text-accent transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Footer con indicador */}
                  <div className="flex items-center gap-2 text-accent/60 group-hover:text-accent transition-colors duration-300 mt-6 pt-6 border-t border-dark-border/50">
                    <CheckCircle2 size={18} />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Paso {index + 1} de {VERSAT_STEPS.length}
                    </span>
                  </div>

                  {/* Glow effect en hover */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>

                {/* Línea conectora (solo visible en desktop) */}
                {index < VERSAT_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-accent/50 to-transparent" />
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}