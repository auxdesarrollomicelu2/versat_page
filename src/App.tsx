import { useEffect, lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Lenis from '@studio-freight/lenis'
import VersatNavbar from './components/layout/VersatNavbar'
import VersatHero from './components/sections/VersatHero'
import VersatSlider from './components/sections/VersatSlider'
import VersatFeatures from './components/sections/VersatFeatures'
import VersatFooter from './components/layout/VersatFooter'

// Prefijo provisional para validar la integración del Landing; se decide más adelante.
// LandingLayout/LandingHome viven en el mismo módulo — el segundo import reutiliza el chunk ya cargado.
const LandingLayout = lazy(() => import('./features/landing/App').then((m) => ({ default: m.LandingLayout })))
const LandingHome = lazy(() => import('./features/landing/App').then((m) => ({ default: m.LandingHome })))
const QueEsVersat = lazy(() => import('./features/landing/pages/QueEsVersat'))
const ComoFuncionaVersat = lazy(() => import('./features/landing/pages/ComoFuncionaVersat'))
const PipelineDeVentas = lazy(() => import('./features/landing/pages/PipelineDeVentas'))
const BandejaDeEntrada = lazy(() => import('./features/landing/pages/BandejaDeEntrada'))
const AsistenteIA = lazy(() => import('./features/landing/pages/AsistenteIA'))
const WhatsappIA = lazy(() => import('./features/landing/pages/WhatsappIA'))
const InstagramIA = lazy(() => import('./features/landing/pages/InstagramIA'))
const MasCanales = lazy(() => import('./features/landing/pages/MasCanales'))
const Terminos = lazy(() => import('./features/landing/pages/Terminos'))
const Privacidad = lazy(() => import('./features/landing/pages/Privacidad'))

// Lazy load below-the-fold sections to reduce initial JS bundle
const VersatManifesto    = lazy(() => import('./components/sections/VersatManifesto'))
const VersatHowItWorks   = lazy(() => import('./components/sections/VersatHowItWorks'))
const VersatStats        = lazy(() => import('./components/sections/VersatStats'))
const VersatTestimonials = lazy(() => import('./components/sections/VersatTestimonials'))
const VersatClients      = lazy(() => import('./components/sections/VersatClients'))
const VersatCTA          = lazy(() => import('./components/sections/VersatCTA'))
const ScrollProgressRail = lazy(() => import('./components/ui/ScrollProgressRail'))

function Home() {
  useEffect(() => {
    // Respect user's motion preferences
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      // Disable on touch — native momentum is faster on mobile
      syncTouch: false,
    })

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="grain">
      <VersatNavbar />
      <Suspense fallback={null}>
        <ScrollProgressRail />
      </Suspense>
      <main>
        <VersatHero />
        <VersatSlider />
        <VersatFeatures />
        <Suspense fallback={<div className="h-[40vh]" />}>
          <VersatManifesto />
          <VersatHowItWorks />
          <VersatStats />
          <VersatTestimonials />
          <VersatClients />
          <VersatCTA />
        </Suspense>
      </main>
      <VersatFooter />
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Rutas hijas reales (no comodín) para que la navegación relativa dentro
          del Landing resuelva siempre contra "/landing-preview", sin acumularse. */}
      <Route
        path="landing-preview"
        element={
          <Suspense fallback={null}>
            <LandingLayout />
          </Suspense>
        }
      >
        <Route index element={<LandingHome />} />
        <Route path="que-es-versat" element={<QueEsVersat />} />
        <Route path="como-funciona-versat" element={<ComoFuncionaVersat />} />
        <Route path="pipeline-de-ventas" element={<PipelineDeVentas />} />
        <Route path="bandeja-de-entrada" element={<BandejaDeEntrada />} />
        <Route path="asistente-ia" element={<AsistenteIA />} />
        <Route path="whatsapp-ia" element={<WhatsappIA />} />
        <Route path="instagram-ia" element={<InstagramIA />} />
        <Route path="mas-canales" element={<MasCanales />} />
        <Route path="terminos" element={<Terminos />} />
        <Route path="privacidad" element={<Privacidad />} />
      </Route>
    </Routes>
  )
}

export default App
