import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { VERSAT_NAV_LINKS } from '../../lib/versat.constants'
import { useBooking } from '../../hooks/useBooking'
import BookingModal from '../ui/BookingModal'

export default function VersatNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const booking = useBooking()

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-dark/80 backdrop-blur-lg border-b border-dark-border/50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

          <a href="#inicio" className="flex items-center gap-3">
            <div className="flex gap-0.5">
              <div className="w-2 h-2 bg-accent rounded-sm"></div>
              <div className="w-2 h-2 bg-white rounded-sm"></div>
              <div className="w-2 h-2 bg-white rounded-sm"></div>
              <div className="w-2 h-2 bg-white rounded-sm"></div>
            </div>
            <span className="text-lg font-bold tracking-wider text-white uppercase">
              VERSAT
            </span>
          </a>

          <ul className="hidden lg:flex items-center gap-6">
            {VERSAT_NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm text-gray-300 hover:text-white transition-colors duration-200 font-medium uppercase tracking-wide">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-3">
            <button 
              onClick={booking.openModal}
              className="text-sm font-bold bg-accent text-white px-6 py-2.5 rounded-md hover:bg-accent/90 transition-all duration-200 uppercase tracking-wide"
            >
              Contacto
            </button>
          </div>

          <button className="lg:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="lg:hidden bg-dark-card/95 backdrop-blur-lg border-t border-dark-border px-6 py-6 flex flex-col gap-6">
            {VERSAT_NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white transition-colors font-medium uppercase tracking-wide">
                {link.label}
              </a>
            ))}
            <button 
              onClick={() => {
                setIsOpen(false)
                booking.openModal()
              }}
              className="text-sm font-bold bg-accent text-white px-6 py-3 rounded-md text-center hover:bg-accent/90 transition-all uppercase tracking-wide"
            >
              Contacto
            </button>
          </div>
        )}
      </nav>

      <BookingModal
        isOpen={booking.isOpen}
        onClose={booking.closeModal}
        step={booking.step}
        form={booking.form}
        onFieldChange={booking.updateField}
        onNext={booking.goNext}
        onBack={booking.goBack}
        onSubmit={booking.submit}
        isStep1Valid={booking.isStep1Valid}
        isStep2Valid={booking.isStep2Valid}
        loading={booking.loading}
        error={booking.error}
      />
    </>
  )
}