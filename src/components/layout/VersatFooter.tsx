import { VERSAT_CONFIG, VERSAT_NAV_LINKS } from '../../lib/versat.constants'
import logo from '../../assets/images/versat.logo1.png'

export default function VersatFooter() {
  return (
    <footer className="bg-dark-card border-t border-dark-border px-6 py-12">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row items-start justify-between gap-12 mb-8">
          
          {/* Logo y descripción */}
          <div className="flex-1 max-w-sm">
            <a href="#inicio" className="inline-block mb-4">
              <img src={logo} alt="Versat Logo" className="h-12 w-auto" />
            </a>
            <p className="text-gray-500 text-sm leading-relaxed">
              {VERSAT_CONFIG.tagline}
            </p>
          </div>

          {/* Links de navegación */}
          <div className="flex-1">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Navegación</h3>
            <ul className="space-y-3">
              {VERSAT_NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-gray-500 hover:text-accent transition-colors">
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
                <a href={`mailto:${VERSAT_CONFIG.email}`} className="text-sm text-gray-500 hover:text-accent transition-colors">
                  {VERSAT_CONFIG.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-dark-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Versat. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-600 hover:text-white text-sm transition-colors">
              Política de privacidad
            </a>
            <a href="#" className="text-gray-600 hover:text-white text-sm transition-colors">
              Términos de servicio
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}