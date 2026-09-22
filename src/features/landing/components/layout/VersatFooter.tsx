import { Link, useLocation } from 'react-router-dom';
import { asset } from '../../lib/asset';

export default function VersatFooter() {
  const location = useLocation();
  // Telegram apunta a la misma página que Facebook; si ya estás ahí, fuerza el scroll al tope.
  function scrollTopIfSamePage() {
    if (location.pathname.endsWith('/mas-canales')) window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-brand-logo">
              <Link to="."><img src={asset('/assets/images/versat.png')} alt="VERSAT" /></Link>
            </div>
            <p className="footer-brand-text">
              IA que centraliza tu mensajería y tus aplicaciones de uso diario, entrenada en tu proceso comercial.
            </p>
          </div>

          <div className="footer-col">
            <div className="footer-group">
              <span className="footer-col-title">Contacto</span>
              <ul className="footer-list">
                <li>
                  <a
                    href="https://wa.me/573168279719?text=Hola%2C%20quiero%20saber%20c%C3%B3mo%20Versat%20puede%20ayudar%20a%20mi%20negocio.%20%C2%BFMe%20asesoran%3F"
                    target="_blank"
                    rel="noopener"
                  >
                    Chat en WhatsApp
                  </a>
                </li>
                <li><a href="mailto:comercial@versat.ai">comercial@versat.ai</a></li>
              </ul>
            </div>
            <div className="footer-group">
              <span className="footer-col-title">Legal</span>
              <ul className="footer-list">
                <li><Link to="terminos">Términos</Link></li>
                <li><Link to="privacidad">Política de privacidad</Link></li>
              </ul>
            </div>
          </div>

          <div className="footer-col">
            <span className="footer-col-title">Canales</span>
            <ul className="footer-list">
              <li><Link to="whatsapp-ia"><i className="footer-dot footer-dot--wa"></i>WhatsApp</Link></li>
              <li><Link to="instagram-ia"><i className="footer-dot footer-dot--ig"></i>Instagram</Link></li>
              <li><Link to="mas-canales"><i className="footer-dot footer-dot--fb"></i>Facebook</Link></li>
              <li><Link to="mas-canales" onClick={scrollTopIfSamePage}><i className="footer-dot footer-dot--tg"></i>Telegram</Link></li>
            </ul>
          </div>

          <div className="footer-col footer-recursos">
            <span className="footer-col-title">Recursos</span>
            <ul className="footer-list footer-list--split">
              <li><Link to="que-es-versat">¿Qué es Versat?</Link></li>
              <li><Link to="como-funciona-versat">Cómo funciona Versat</Link></li>
              <li><Link to="pipeline-de-ventas">Seguimiento de tu pipeline</Link></li>
              <li><Link to="bandeja-de-entrada">Bandeja de entrada unificada</Link></li>
              <li><Link to="asistente-ia">Tu asistente de IA</Link></li>
              <li><Link to="mas-canales">Más canales, un solo lugar</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-meta">
            <span>© 2026 VERSAT</span>
            <span className="footer-meta-sep">/</span>
            <span className="footer-loc">Medellín, Colombia</span>
          </div>
          <div className="footer-meta">
            <span>IA para tu proceso comercial</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
