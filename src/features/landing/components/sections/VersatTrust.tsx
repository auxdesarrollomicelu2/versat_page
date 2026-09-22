import { companiesList } from '../../lib/datos';

// Marquee de logos, triplicado para que el loop continuo no se note.
const TRIPLED = [...companiesList, ...companiesList, ...companiesList];

function goToCompany(name: string) {
  const clientes = document.getElementById('clientes');
  if (!clientes) return;
  clientes.scrollIntoView({ behavior: 'smooth', block: 'start' });
  setTimeout(() => {
    window.dispatchEvent(new CustomEvent('versat:goto-testimonial', { detail: name }));
  }, 450);
}

export default function VersatTrust() {
  return (
    <div className="trust-strip">
      <span className="trust-label">Empresas que ya confían en Versat</span>
      <div className="trust-track-wrap">
        <div className="trust-track" id="trustTrack">
          {TRIPLED.map((c, i) => (
            <div
              className="trust-item"
              data-name={c.name}
              role="button"
              tabIndex={0}
              aria-label={`Ver caso de ${c.name}`}
              key={`${c.name}-${i}`}
              onClick={() => goToCompany(c.name)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  goToCompany(c.name);
                }
              }}
            >
              <div className="trust-logo">
                {c.logoImg ? (
                  <img src={c.logoImg} alt={c.name} className={c.logoRound ? 'is-round' : ''} />
                ) : (
                  <span className="trust-logo-av">{c.name.slice(0, 2).toUpperCase()}</span>
                )}
              </div>
              <div className="trust-info">
                <span className="trust-name">{c.name}</span>
                <span className="trust-cat">{c.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
