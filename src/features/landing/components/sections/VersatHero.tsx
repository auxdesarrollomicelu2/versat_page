import { useEffect, useRef, useState } from 'react';
import { openWhatsAppContact, WA } from '../../lib/ayudas';
import { useMagnetic } from '../../hooks/useReveal';
import { asset } from '../../lib/asset';

const CAROUSEL_INTERVAL_MS = 2000;

const POSITION_TABLE: Record<number, { x: number; scale: number; opacity: number }> = {
  0: { x: 0, scale: 1, opacity: 1 },
  1: { x: 85, scale: 0.45, opacity: 0.55 },
  2: { x: 160, scale: 0.25, opacity: 0.18 },
  3: { x: 300, scale: 0.05, opacity: 0 },
};
const HIDDEN = { scale: 0.05, opacity: 0 };

const ITEMS: { key: string; title: string; img?: string; svg?: 'linkedin' | 'whatsapp' }[] = [
  { key: 'chatgpt', title: 'ChatGPT', img: asset('/assets/images/chatgpt.png') },
  { key: 'claude', title: 'Claude', img: asset('/assets/images/claude.png') },
  { key: 'canva', title: 'Canva', img: asset('/assets/images/canva.png') },
  { key: 'meta', title: 'Meta', img: asset('/assets/images/meta.png') },
  { key: 'shopify', title: 'Shopify', img: asset('/assets/images/shopifi.png') },
  { key: 'linkedin', title: 'LinkedIn', svg: 'linkedin' },
  { key: 'telegram', title: 'Telegram', img: asset('/assets/images/telegram.png') },
  { key: 'whatsapp', title: 'WhatsApp', svg: 'whatsapp' },
  { key: 'instagram', title: 'Instagram', img: asset('/assets/images/insta.png') },
];

export default function VersatHero() {
  const total = ITEMS.length;
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [center, setCenter] = useState(0);
  const primaryBtnRef = useMagnetic<HTMLButtonElement>({ radius: 60, strength: 0.25 });

  useEffect(() => {
    const id = setInterval(() => setCenter((c) => (c + 1) % total), CAROUSEL_INTERVAL_MS);
    return () => clearInterval(id);
  }, [total]);

  useEffect(() => {
    itemRefs.current.forEach((item, i) => {
      if (!item) return;
      let diff = (i - center) % total;
      if (diff > total / 2) diff -= total;
      if (diff < -total / 2) diff += total;

      const dist = Math.abs(diff);
      const sign = diff < 0 ? -1 : 1;
      const mover = item.querySelector('.icons-carousel__mover') as HTMLElement | null;
      const entry = POSITION_TABLE[dist];

      if (entry) {
        item.style.opacity = String(entry.opacity);
        if (mover) mover.style.transform = `translate3d(${sign * entry.x}px, 0, 0) scale3d(${entry.scale}, ${entry.scale}, 1)`;
      } else {
        item.style.opacity = String(HIDDEN.opacity);
        if (mover) mover.style.transform = `translate3d(${sign * 340}px, 0, 0) scale3d(${HIDDEN.scale}, ${HIDDEN.scale}, 1)`;
      }
    });
  }, [center, total]);

  return (
    <section className="hero" id="hero">
      <div className="hero-inner">
        <div className="hero-eyebrow">
          <span className="hero-eyebrow-dot"></span>
          <span className="hero-eyebrow-text">VERSAT — IA para tu proceso comercial</span>
        </div>
        <h1 className="hero-h1">
          <span className="hero-h1-main">Versat atiende,</span>
          <span className="hero-h1-accent">tú cierras.</span>
        </h1>
        <p className="hero-sub">Centraliza tu mensajería y tus aplicaciones de uso diario en un solo lugar.</p>
        <div className="hero-actions">
          <button className="btn-primary" ref={primaryBtnRef} onClick={() => openWhatsAppContact(WA.hero)}>
            Agendar demo →
          </button>
        </div>

        <div className="hero-apps">
          <span className="hero-apps-label">Integraciones</span>
          <div className="icons-carousel" id="heroIntegRow">
            {ITEMS.map((item, i) => (
              <div
                className="icons-carousel__item"
                title={item.title}
                key={item.key}
                ref={(el) => { itemRefs.current[i] = el; }}
              >
                <div className="icons-carousel__mover">
                  {item.svg === 'linkedin' && (
                    <svg viewBox="0 0 24 24" fill="#0A66C2">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  )}
                  {item.svg === 'whatsapp' && (
                    <svg viewBox="0 0 24 24" fill="#25D366">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  )}
                  {item.img && <img src={item.img} alt={item.title} />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
