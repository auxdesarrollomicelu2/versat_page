import { VERSAT_CONFIG, VERSAT_NAV_LINKS } from '../../lib/versat.constants'
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react'
import logo from '../../assets/images/versat.logo.png'

export default function VersatFooter() {
  return (
    <footer className="relative bg-surface-raised border-t border-surface-border">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 pt-14 md:pt-16 pb-8">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-10 pb-10 border-b border-surface-border">
          {/* Brand */}
          <div className="md:col-span-4">
            <a href="#inicio" className="inline-block mb-5">
              <img src={logo} alt="Versat" className="h-9 md:h-10 w-auto opacity-90 hover:opacity-100 transition-opacity" loading="lazy" />
            </a>
            <p className="text-zinc-300 text-sm leading-relaxed max-w-xs mb-3">
              {VERSAT_CONFIG.tagline}
            </p>
          </div>

          {/* Nav */}
          <div className="md:col-span-3">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-3 h-px bg-accent" />
              <h4 className="text-zinc-400 font-mono text-[10px] uppercase tracking-widest">Nav</h4>
            </div>
            <ul className="space-y-2.5">
              {VERSAT_NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="group flex items-center gap-2 text-zinc-300 hover:text-white transition-colors text-sm">
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-3 h-px bg-accent" />
              <h4 className="text-zinc-400 font-mono text-[10px] uppercase tracking-widest">Contacto</h4>
            </div>
            <div className="space-y-3">
              <a href={`mailto:${VERSAT_CONFIG.email}`} className="group flex items-center gap-3 text-zinc-300 hover:text-accent transition-colors text-sm">
                <Mail className="w-4 h-4 text-accent/70 group-hover:text-accent transition-colors flex-shrink-0" strokeWidth={2} />
                <span className="font-mono text-sm break-all">{VERSAT_CONFIG.email}</span>
              </a>
              <a href="https://wa.me/573135012082" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 text-zinc-300 hover:text-accent transition-colors text-sm">
                <Phone className="w-4 h-4 text-accent/70 group-hover:text-accent transition-colors flex-shrink-0" strokeWidth={2} />
                <span className="font-mono text-sm">+57 313 501 2082</span>
              </a>
              <div className="flex items-center gap-3 text-zinc-400 text-sm">
                <MapPin className="w-4 h-4 text-accent/70 flex-shrink-0" strokeWidth={2} />
                <span className="font-mono text-sm">Medellín, Colombia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-zinc-500 text-xs font-mono">
            &copy; {new Date().getFullYear()} Versat. Todos los derechos reservados.
          </span>
          <div className="flex items-center gap-6">
            <a href="#" className="text-zinc-500 hover:text-accent text-xs font-mono transition-colors">Privacidad</a>
            <a href="#" className="text-zinc-500 hover:text-accent text-xs font-mono transition-colors">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
