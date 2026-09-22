import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { openWhatsAppContact, WA } from '../../lib/ayudas';
import { useMagnetic } from '../../hooks/useReveal';
import { asset } from '../../lib/asset';

const LINKS = [
  { href: '/#hero', label: 'Inicio' },
  { href: '/#como-funciona', label: 'Proceso' },
  { href: '/#casos-uso', label: 'Casos' },
  { href: '/#por-que-versat', label: 'Soluciones' },
  { href: '/#preguntas', label: 'Contacto' },
];

export default function VersatNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [pillStyle, setPillStyle] = useState<{ width: number; x: number; opacity: number }>({ width: 0, x: 0, opacity: 0 });
  const linksRef = useRef<HTMLUListElement | null>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const ctaRef = useMagnetic<HTMLAnchorElement>({ radius: 50, strength: 0.2 });

  useEffect(() => {
    function updateActiveLink() {
      let current: string | null = null;
      let bestTop = -Infinity;
      LINKS.forEach(({ href }) => {
        const el = document.getElementById(href.split('#')[1]);
        if (!el) return;
        const top = el.getBoundingClientRect().top;
        if (top <= window.innerHeight * 0.45 && top > bestTop) {
          bestTop = top;
          current = href;
        }
      });
      setActive(current);
      setScrolled(window.scrollY > 60);

      const navLinksEl = linksRef.current;
      const a = current ? linkRefs.current[current] : null;
      if (a && navLinksEl) {
        const linkRect = a.getBoundingClientRect();
        const wrapRect = navLinksEl.getBoundingClientRect();
        setPillStyle({ width: linkRect.width, x: linkRect.left - wrapRect.left, opacity: 1 });
      } else {
        setPillStyle((s) => ({ ...s, opacity: 0 }));
      }
    }
    window.addEventListener('scroll', updateActiveLink, { passive: true });
    window.addEventListener('resize', updateActiveLink, { passive: true });
    updateActiveLink();
    return () => {
      window.removeEventListener('scroll', updateActiveLink);
      window.removeEventListener('resize', updateActiveLink);
    };
  }, []);

  return (
    <nav className={scrolled ? 'is-scrolled' : ''}>
      <div className="nav-logo">
        <Link to="."><img src={asset('/assets/images/versat.png')} alt="VERSAT" /></Link>
      </div>
      <ul className="nav-links" ref={linksRef}>
        <span
          className="nav-pill"
          style={{ opacity: pillStyle.opacity, width: `${pillStyle.width}px`, transform: `translateX(${pillStyle.x}px)` }}
        />
        {LINKS.map((l) => (
          <li key={l.href}>
            <Link
              to={{ pathname: '.', hash: l.href.split('#')[1] }}
              ref={(el) => { linkRefs.current[l.href] = el; }}
              className={active === l.href ? 'is-active' : ''}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        to={{ pathname: '.', hash: 'planes' }}
        className="nav-cta"
        ref={ctaRef}
        onClick={(e) => {
          e.preventDefault();
          openWhatsAppContact(WA.nav);
        }}
      >
        Agendar →
      </Link>
    </nav>
  );
}
