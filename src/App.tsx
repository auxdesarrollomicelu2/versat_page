import { useEffect, lazy, Suspense } from 'react'
import Lenis from '@studio-freight/lenis'
import VersatNavbar from './components/layout/VersatNavbar'
import VersatHero from './components/sections/VersatHero'
import VersatSlider from './components/sections/VersatSlider'
import VersatFeatures from './components/sections/VersatFeatures'
import VersatFooter from './components/layout/VersatFooter'

// Lazy load below-the-fold sections to reduce initial JS bundle
const VersatManifesto    = lazy(() => import('./components/sections/VersatManifesto'))
const VersatHowItWorks   = lazy(() => import('./components/sections/VersatHowItWorks'))
const VersatStats        = lazy(() => import('./components/sections/VersatStats'))
const VersatTestimonials = lazy(() => import('./components/sections/VersatTestimonials'))
const VersatClients      = lazy(() => import('./components/sections/VersatClients'))
const VersatCTA          = lazy(() => import('./components/sections/VersatCTA'))
const ScrollProgressRail = lazy(() => import('./components/ui/ScrollProgressRail'))

function App() {
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

export default App
