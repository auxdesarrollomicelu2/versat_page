// Helpers compartidos (adaptados de src/ayudas.ts). Todo CTA abre WhatsApp directo.
const WHATSAPP_NUMBER = '573168279719';

export const WA = {
  nav: 'Hola, quiero conocer cómo funciona Versat y cuál sería el mejor plan para mi empresa.',
  hero: 'Hola, quiero agendar una demo de Versat y ver cómo funcionaría en mi negocio.',
  float: 'Hola, ¿me cuentan cómo Versat puede ayudarme a automatizar la atención de mi negocio?',
  planEstandar: 'Hola, me interesa el Plan Estándar de Versat',
  planPro: 'Hola, me interesa el Plan Pro de Versat',
  planEmpresa: 'Hola, mi operación necesita algo a la medida. ¿Podemos armar juntos un plan Empresa?',
  recursos: 'Hola, estuve leyendo sobre Versat y quiero que me asesoren. ¿Cómo empezamos?',
};

export function whatsappUrl(message?: string) {
  const text = message || WA.nav;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function openWhatsAppContact(message?: string) {
  window.open(whatsappUrl(message), '_blank', 'noopener');
}
