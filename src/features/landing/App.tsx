import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import './styles/base.css';
import './styles/menu.css';
import './styles/inicio.css';
import './styles/como-funciona.css';
import './styles/confianza.css';
import './styles/casos-uso.css';
import './styles/por-que-versat.css';
import './styles/clientes.css';
import './styles/planes.css';
import './styles/preguntas.css';
import './styles/pie.css';
import './styles/boton-flotante.css';
import './styles/barra-lateral.css';
import './styles/pagina.css';
import VersatNavbar from './components/layout/VersatNavbar';
import VersatFooter from './components/layout/VersatFooter';
import VersatHero from './components/sections/VersatHero';
import VersatHowItWorks from './components/sections/VersatHowItWorks';
import VersatTrust from './components/sections/VersatTrust';
import VersatCasosUso from './components/sections/VersatCasosUso';
import VersatPorQueVersat from './components/sections/VersatPorQueVersat';
import VersatTestimonials from './components/sections/VersatTestimonials';
import VersatPricing from './components/sections/VersatPricing';
import VersatFAQ from './components/sections/VersatFAQ';
import LineSidebar from './components/ui/LineSidebar';
import FloatingWhatsApp from './components/ui/FloatingWhatsApp';
import ScrollManager from './components/ui/ScrollManager';

// Layout compartido por todas las páginas del Landing. Se monta como el
// `element` de la ruta padre en versat_page/src/App.tsx, con las páginas
// como rutas hijas reales (renderizadas vía <Outlet/>) — así el match de
// esta ruta nunca es un comodín ("/*") y la navegación relativa (Link to=".",
// to="pagina", etc.) siempre resuelve de forma estable contra la raíz del
// Landing, sin importar en qué subpágina esté el usuario.
export function LandingLayout() {
  return (
    <>
      <ScrollManager />
      <VersatNavbar />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
      <VersatFooter />
      <LineSidebar />
      <FloatingWhatsApp />
    </>
  );
}

export function LandingHome() {
  return (
    <>
      <VersatHero />
      <VersatHowItWorks />
      <VersatTrust />
      <VersatCasosUso />
      <VersatPorQueVersat />
      <VersatTestimonials />
      <VersatPricing />
      <VersatFAQ />
    </>
  );
}
