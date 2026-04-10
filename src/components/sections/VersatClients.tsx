import { motion } from 'framer-motion'
import centrojapon from '../../assets/images/centrojapon.png'
import logoEH from '../../assets/images/logoEH.png'
import micelu from '../../assets/images/micelu1.png'
import lampert from '../../assets/images/lampert.png'

const CLIENTS = [
  { name: 'Centro Japón', logo: centrojapon },
  { name: 'Micelu', logo: micelu },
  { name: 'Lampert', logo: lampert },
  { name: 'El Hueco', logo: logoEH },
]

export default function VersatClients() {
  return (
    <section className="bg-dark py-16 md:py-20 px-6 border-b border-dark-border/30 relative overflow-hidden">
      {/* Fondo decorativo sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 md:mb-16"
        >
          <span className="text-gray-400 text-sm md:text-base font-semibold uppercase tracking-widest">
            Confían en nosotros
          </span>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16 items-center justify-items-center">
          {CLIENTS.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 30, scale: 0.7 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.15,
                duration: 0.6,
                type: "spring",
                stiffness: 80,
                damping: 12
              }}
              whileHover={{ 
                scale: 1.15, 
                y: -8,
                transition: { duration: 0.3, type: "spring", stiffness: 300 }
              }}
              className="relative group cursor-pointer"
            >
              {/* Glow effect en hover - más intenso */}
              <div className="absolute inset-0 bg-accent/30 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full scale-150" />
              
              <img 
                src={client.logo} 
                alt={client.name}
                className="h-16 md:h-20 lg:h-24 w-auto object-contain opacity-70 group-hover:opacity-100 transition-all duration-300 relative z-10 filter drop-shadow-2xl"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
