import { useEffect, useRef, useState, type ReactElement } from 'react';
import { pricingPlans, pricingPrices } from '../../lib/datos';
import { openWhatsAppContact, WA } from '../../lib/ayudas';
import { useReveal, useRepeatingReveal } from '../../hooks/useReveal';

type Plan = (typeof pricingPlans)[number];
type Currency = 'USD' | 'COP' | 'MXN';

const PLAN_MESSAGE: Record<string, string> = {
  std: WA.planEstandar,
  pro: WA.planPro,
  empresa: WA.planEmpresa,
};

const CURRENCY_FORMAT: Record<Currency, { locale: string; decimals: number }> = {
  USD: { locale: 'en-US', decimals: 0 },
  COP: { locale: 'es-CO', decimals: 0 },
  MXN: { locale: 'es-MX', decimals: 0 },
};

const TAX_NOTE: Record<Currency, string> = {
  USD: 'por mes · Texas',
  COP: 'por mes + IVA (19%)',
  MXN: 'por mes + IVA (16%)',
};

const RATES_ENDPOINT = 'https://open.er-api.com/v6/latest/USD';
const CACHE_KEY = 'versat_fx_rates_v1';
const CACHE_TTL_MS = 12 * 60 * 60 * 1000;

async function getRates(): Promise<Record<Currency, number>> {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
    if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
      return cached.rates;
    }
  } catch {
    // ignore
  }
  const res = await fetch(RATES_ENDPOINT);
  if (!res.ok) throw new Error(`FX API respondió ${res.status}`);
  const data = await res.json();
  if (data.result !== 'success' || !data.rates) throw new Error('FX API sin datos de rates');
  const rates = { USD: 1, COP: data.rates.COP, MXN: data.rates.MXN };
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ rates, fetchedAt: Date.now() }));
  } catch {
    // ignore
  }
  return rates;
}

function formatAmount(usdAmount: number, currency: Currency, rates: Record<Currency, number>) {
  const rate = rates[currency] || 1;
  const converted = usdAmount * rate;
  const { locale, decimals } = CURRENCY_FORMAT[currency];
  return new Intl.NumberFormat(locale, { maximumFractionDigits: decimals, minimumFractionDigits: decimals }).format(converted);
}

function withMonoNumbers(text: string) {
  const parts = text.split(/(\d[\d.,]*)/g);
  return parts.map((part, i) =>
    /^\d/.test(part) ? <span className="feat-n" key={i}>{part}</span> : <span key={i}>{part}</span>
  );
}

const FEAT_ICONS: Record<string, ReactElement> = {
  user: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
    </svg>
  ),
  spark: (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.2 6.8L21 11l-6.8 2.2L12 20l-2.2-6.8L3 11l6.8-2.2L12 2z" /></svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 12a7.5 7.5 0 01-11.3 6.5L4 19l1-4.3A7.5 7.5 0 1120 12z" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" strokeOpacity=".5" /><path d="M8 12.5l2.5 2.5L16 9.5" />
    </svg>
  ),
  gear: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 13.5a7.6 7.6 0 000-3l1.9-1.5-2-3.4-2.3.6a7.6 7.6 0 00-2.6-1.5L14 2h-4l-.4 2.7a7.6 7.6 0 00-2.6 1.5l-2.3-.6-2 3.4L4.6 10.5a7.6 7.6 0 000 3L2.7 15l2 3.4 2.3-.6a7.6 7.6 0 002.6 1.5L10 22h4l.4-2.7a7.6 7.6 0 002.6-1.5l2.3.6 2-3.4-1.9-1.5z" />
    </svg>
  ),
  handshake: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12l4-4 4 3 3-3 2 2-5 5-4-3-2 2z" /><path d="M13 8l3-3 6 6-3 3" /><path d="M9 15l2 2" />
    </svg>
  ),
  support: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 13a8 8 0 0116 0" /><rect x="2.5" y="13" width="4" height="6" rx="1.5" /><rect x="17.5" y="13" width="4" height="6" rx="1.5" />
      <path d="M20 19a4 4 0 01-4 3h-2" />
    </svg>
  ),
};
function featureIcon(text: string) {
  if (/lead/i.test(text)) return FEAT_ICONS.user;
  if (/cr[eé]dito|\bIA\b|automat|entren/i.test(text)) return FEAT_ICONS.spark;
  if (/canal|whatsapp|instagram|l[íi]nea|conexi[oó]n/i.test(text)) return FEAT_ICONS.chat;
  if (/personalizad|proceso/i.test(text)) return FEAT_ICONS.gear;
  if (/alcance|condicion/i.test(text)) return FEAT_ICONS.handshake;
  if (/acompañamiento|dedicado|soporte/i.test(text)) return FEAT_ICONS.support;
  return FEAT_ICONS.check;
}

function PriceAmount({ plan, currency, rates, ratesReady, onCountDone }: {
  plan: Plan; currency: Currency; rates: Record<Currency, number>; ratesReady: boolean; onCountDone: () => void;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState('0');
  const countedRef = useRef(false);
  const target = pricingPrices[plan.id]?.monthly ?? 0;

  useEffect(() => {
    const el = ref.current;
    if (!el || countedRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || countedRef.current) return;
          countedRef.current = true;
          observer.unobserve(el);
          const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          if (reduceMotion) {
            setDisplay(String(target));
            onCountDone();
            return;
          }
          const start = performance.now();
          const DURATION = 900;
          function tick(now: number) {
            const p = Math.min(1, (now - start) / DURATION);
            const eased = 1 - Math.pow(1 - p, 3);
            setDisplay(String(Math.round(target * eased)));
            if (p < 1) requestAnimationFrame(tick);
            else onCountDone();
          }
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (countedRef.current && currency !== 'USD' && ratesReady) {
      setDisplay(formatAmount(target, currency, rates));
    } else if (countedRef.current && currency === 'USD') {
      setDisplay(String(target));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency, ratesReady]);

  return <span className="plan-n price-amount-n" ref={ref}>{display}</span>;
}

function PlanCard({ plan, currency, rates, ratesReady, onCountDone }: {
  plan: Plan; currency: Currency; rates: Record<Currency, number>; ratesReady: boolean; onCountDone: () => void;
}) {
  const { ref, visible } = useReveal<HTMLElement>();
  const { ref: badgeRef, active: badgeActive } = useRepeatingReveal<HTMLElement>();

  function setRefs(el: HTMLElement | null) {
    (ref as any).current = el;
    if (plan.featured) (badgeRef as any).current = el;
  }

  const classes = [
    'plan',
    `plan--${plan.id}`,
    plan.featured ? 'featured badge-repeat' : '',
    plan.isCustom ? 'plan--custom' : '',
    'reveal',
    visible ? 'visible' : '',
    plan.featured && badgeActive ? 'badge-visible' : '',
  ].filter(Boolean).join(' ');

  return (
    <article className={classes} style={plan.featured ? { transitionDelay: '.1s' } : undefined} ref={setRefs}>
      {plan.badge && <div className="price-badge">{plan.badge}</div>}
      <div className="plan-name">{plan.name}</div>
      <p className="plan-desc">{plan.desc}</p>

      {plan.isCustom ? (
        <>
          <div className="plan-price plan-price--custom">
            <span className="plan-custom">A la medida</span>
          </div>
          <div className="plan-per">definido con nuestro equipo</div>
        </>
      ) : (
        <>
          <div className="plan-price">
            <span className="plan-cur">$</span>
            <PriceAmount plan={plan} currency={currency} rates={rates} ratesReady={ratesReady} onCountDone={onCountDone} />
            <span className="plan-unit">{currency}</span>
          </div>
          <div className="plan-per plan-tax-note">{TAX_NOTE[currency]}</div>
        </>
      )}

      <ul className="plan-features">
        {plan.features.map((f) => (
          <li key={f}>
            <i className="feat-check" aria-hidden="true">{featureIcon(f)}</i>
            <span>{withMonoNumbers(f)}</span>
          </li>
        ))}
      </ul>
      <button
        className={`btn-price ${plan.ctaClass}`}
        data-plan={plan.id}
        onClick={() => openWhatsAppContact(PLAN_MESSAGE[plan.id] || WA.nav)}
      >
        {plan.ctaLabel}
      </button>
    </article>
  );
}

export default function VersatPricing() {
  const { ref: headRef, visible: headVisible } = useReveal<HTMLDivElement>();
  const [currency, setCurrency] = useState<Currency>('USD');
  const [rates, setRates] = useState<Record<Currency, number>>({ USD: 1, COP: 1, MXN: 1 });
  const [ratesReady, setRatesReady] = useState(false);
  const [disabledCurrencies, setDisabledCurrencies] = useState<Currency[]>([]);

  useEffect(() => {
    getRates()
      .then((r) => {
        setRates(r);
        setRatesReady(true);
      })
      .catch((err) => {
        console.error('[pricing] no se pudieron obtener las tasas de cambio:', err);
        setDisabledCurrencies(['COP', 'MXN']);
      });
  }, []);

  function handleCountDone() {
    // el efecto interno de cada PriceAmount ya reacciona a `currency`/`ratesReady`; nada más que hacer aquí
  }

  return (
    <section className="pricing" id="planes">
      <div className="section-inner">
        <div className={`pricing-head reveal${headVisible ? ' visible' : ''}`} ref={headRef}>
          <span className="section-tag">Planes</span>
          <h2 className="section-title">Simple, transparente,<br />sin sorpresas</h2>
          <p className="section-sub">Empieza desde $65 USD al mes. Elige el plan que se adapta al momento de tu empresa.</p>
        </div>

        <div className="currency-switch" id="currency-switch" role="group" aria-label="Elegir moneda">
          {(['USD', 'COP', 'MXN'] as Currency[]).map((c) => (
            <button
              type="button"
              key={c}
              className={`currency-btn${currency === c ? ' is-active' : ''}`}
              data-currency={c}
              disabled={disabledCurrencies.includes(c)}
              title={disabledCurrencies.includes(c) ? 'No se pudo cargar la tasa de cambio, intenta de nuevo más tarde' : undefined}
              onClick={() => setCurrency(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="pricing-grid">
          {pricingPlans.map((plan) => (
            <PlanCard plan={plan} currency={currency} rates={rates} ratesReady={ratesReady} onCountDone={handleCountDone} key={plan.id} />
          ))}
        </div>

        <p className="pricing-note" id="pricing-note">
          Precios de referencia, calculados a la tasa de cambio del día. El impuesto aplicable depende del país de facturación.
        </p>
        <p className="pricing-footnote">
          ¿Necesitas algo a la medida?{' '}
          <a
            href="#planes"
            onClick={(e) => {
              e.preventDefault();
              openWhatsAppContact(WA.planEmpresa);
            }}
          >
            Habla con nuestro equipo
          </a>{' '}
          y armamos un plan Empresa para ti.
        </p>
      </div>
    </section>
  );
}
