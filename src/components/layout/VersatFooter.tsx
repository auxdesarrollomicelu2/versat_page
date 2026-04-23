import { VERSAT_CONFIG, VERSAT_NAV_LINKS } from '../../lib/versat.constants'
import { Mail, Phone } from 'lucide-react'
import logo from '../../assets/images/versat.logo.png'

export default function VersatFooter() {
  return (
    <footer className="bg-black px-6 py-16">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row items-start justify-between gap-12 mb-8">
          
          {/* Logo y descripción */}
          <div className="flex-1 max-w-md">
            <a href="#inicio" className="inline-block mb-6 transition-opacity hover:opacity-80">
              <img 
                src={logo} 
                alt="Versat Logo" 
                className="h-16 w-auto"
                loading="lazy"
              />
            </a>
            <p className="text-gray-400 text-base leading-relaxed">
              {VERSAT_CONFIG.tagline}
            </p>
          </div>

          {/* Links de navegación */}
          <div className="flex-1">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Navegación</h3>
            <ul className="space-y-3">
              {VERSAT_NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-gray-400 hover:text-accent transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div className="flex-1">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li>
                <a href={`mailto:${VERSAT_CONFIG.email}`} className="text-sm text-gray-400 hover:text-accent transition-colors flex items-center gap-2 group">
                  <Mail size={16} className="text-gray-500 group-hover:text-accent transition-colors" />
                  <span>{VERSAT_CONFIG.email}</span>
                </a>
              </li>
              <li>
                <a href="https://wa.me/573135012082" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-accent transition-colors flex items-start gap-2 group">
                  <Phone size={16} className="text-gray-500 group-hover:text-accent transition-colors mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="block">Juan Esteban</span>
                    <span className="text-accent font-medium">+57 313 501 2082</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Versat. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-500 hover:text-accent text-sm transition-colors">
              Política de privacidad
            </a>
            <a href="#" className="text-gray-500 hover:text-accent text-sm transition-colors">
              Términos de servicio
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}