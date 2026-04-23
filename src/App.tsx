import VersatNavbar from './components/layout/VersatNavbar'
import VersatHero from './components/sections/VersatHero'
import VersatClients from './components/sections/VersatClients'
import VersatSlider from './components/sections/VersatSlider'
import VersatFeatures from './components/sections/VersatFeatures'
import VersatStats from './components/sections/VersatStats'
import VersatHowItWorks from './components/sections/VersatHowItWorks'
import VersatTestimonials from './components/sections/VersatTestimonials'
import VersatCTA from './components/sections/VersatCTA'
import VersatFooter from './components/layout/VersatFooter'

function App() {
  return (
    <div className="dark">
      <VersatNavbar />
      <main>
        <VersatHero />
        <VersatSlider />
        <VersatFeatures />
        <VersatStats />
        <VersatHowItWorks />
        <VersatTestimonials />
        <VersatClients />
        <VersatCTA />
      </main>
      <VersatFooter />
    </div>
  )
}

export default App