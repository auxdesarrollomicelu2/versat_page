// Contenido estático de todas las secciones, migrado de src/datos.ts (sitio original).
// Las rutas de imágenes/videos apuntan a /assets/... (servidas desde landing/public/assets).
import { asset } from './asset';

export const faqItems = [
  {
    q: '¿Cuánto tiempo toma implementar Versat?',
    a: 'La configuración básica toma menos de 1 hora. Para el Plan Pro con entrenamiento de IA, nuestro equipo trabaja contigo en sesiones dedicadas para que en pocos días tengas tu agente funcionando con tu voz y tu conocimiento de negocio.',
    short: '¿Cuánto toma implementar?',
  },
  {
    q: '¿Qué canales y aplicaciones puedo conectar?',
    a: 'El Plan Estándar incluye la conexión de 1 línea de WhatsApp y de Instagram. Además, Versat centraliza también las aplicaciones de uso diario de tu negocio, no solo mensajería. Te acompañamos con todo el proceso de configuración para que esté funcionando sin problemas.',
    short: '¿Qué canales conecto?',
  },
  {
    q: '¿Puedo cambiar de plan?',
    a: 'Puedes escalar de Estándar a Pro (hasta 50 leads calificados por IA) cuando quieras, sin contratos largos, y si tu operación crece más allá de eso conversamos un plan Empresa a la medida con nuestro equipo. Los planes se facturan mensualmente en pesos a la TRM del día 30, + IVA (19%).',
    short: '¿Puedo cambiar de plan?',
  },
  {
    q: '¿Mis datos están seguros?',
    a: 'Absolutamente. Versat cumple con estándares de seguridad de la industria. Tu información y la de tus clientes está encriptada y nunca es compartida con terceros.',
    short: '¿Mis datos están seguros?',
  },
  {
    q: '¿Puedo probar Versat antes de pagar?',
    a: 'Sí. Escríbenos por WhatsApp y agendamos una demo personalizada con nuestro equipo, mostrándote Versat con casos reales de tu industria. Sin compromisos, sin tarjeta de crédito.',
    short: '¿Puedo probar gratis?',
  },
];

export const howSteps = [
  {
    num: 1,
    icon: 'connect',
    tag: 'Conecta',
    titleA: 'Conecta',
    titleB: 'tus canales',
    title: 'Conecta tus canales',
    text: 'Conecta los canales y aplicaciones por donde quieres que Versat hable con tus clientes.',
    features: [
      { label: 'WhatsApp', sub: 'Conecta tu número de WhatsApp por medio de Meta Business.' },
      { label: 'Tus aplicaciones', sub: 'Conecta tus aplicaciones de uso diario — Versat funciona con muchas más herramientas que solo el correo.' },
    ],
  },
  {
    num: 2,
    icon: 'brain',
    tag: 'Entrena',
    titleA: 'Configura',
    titleB: 'tu asistente',
    title: 'Entrena tu IA',
    text: 'Nuestro equipo entrena el agente con la información de tu negocio. Tu asistente habla con tu voz.',
    features: [
      { label: 'Base de conocimiento', sub: 'Productos, precios y preguntas frecuentes.' },
      { label: 'Tono de voz', sub: 'Versat escribe como escribe tu marca.' },
    ],
  },
  {
    num: 3,
    icon: 'rocket',
    tag: 'Escala',
    titleA: 'Versat está lista',
    titleB: 'automatización activa',
    title: 'Vende más, trabaja menos',
    text: 'Versat gestiona, califica y da seguimiento 24/7. Tu equipo solo aparece para cerrar.',
    features: [
      { label: 'Calificación automática', sub: 'Cada lead se prioriza solo.' },
      { label: 'Seguimiento 24/7', sub: 'Nadie se queda sin respuesta. La atención sigue creciendo contigo y permite incorporar futuras automatizaciones a medida que tu proceso evoluciona.' },
    ],
  },
];

export const useCases = [
  {
    tag: 'Ventas',
    title: 'La IA responde preguntas de precio',
    example: 'Micelu',
    text: 'La IA identifica cuándo un cliente pregunta por precio o disponibilidad y responde al instante, sin que el equipo tenga que revisar cada mensaje uno por uno.',
    flow: ['Cliente pregunta', 'IA entiende', 'IA responde'],
    hasVideo: true,
    video: asset('/assets/videos/caso1.mp4'),
    size: 'wide',
    motif: 'inbox',
    channel: 'WhatsApp',
    aside: 'Respuesta al instante',
  },
  {
    tag: 'Postventa',
    title: 'La IA ayuda con la postventa',
    example: 'Lampert',
    text: 'Al tratarse de un producto premium, los clientes esperan respuestas ágiles y oportunas después de la compra. Versat da seguimiento y resuelve dudas de postventa sin que el cliente tenga que esperar horas.',
    flow: ['Cliente escribe', 'IA identifica el caso', 'IA responde con agilidad'],
    hasVideo: true,
    video: asset('/assets/videos/caso2.mp4'),
    size: 'half',
    motif: 'speed',
    channel: 'Postventa',
    aside: 'Sin esperar horas',
  },
  {
    tag: 'Agendamiento',
    title: 'La IA reserva citas',
    text: 'Versat entiende cuándo un cliente quiere agendar, consulta la disponibilidad real y confirma la cita, dejando todo conectado directamente al CRM.',
    flow: ['Entender solicitud', 'Consultar disponibilidad', 'Reservar cita', 'Conectado al CRM'],
    hasVideo: true,
    video: asset('/assets/videos/caso3.mp4'),
    size: 'half',
    motif: 'timeline',
    channel: 'Agenda',
    aside: 'Conectado al CRM',
  },
  {
    tag: 'Fidelización',
    title: 'La IA impulsa la fidelización',
    text: 'Versat ayuda a mantener la relación con tus clientes en el tiempo — seguimiento, recordatorios y mensajes oportunos que impulsan que vuelvan a comprar.',
    flow: ['Detecta oportunidad', 'IA contacta', 'Cliente vuelve a comprar'],
    hasVideo: true,
    video: asset('/assets/videos/caso4.mp4'),
    size: 'wide',
    motif: 'loop',
    channel: 'Seguimiento',
    aside: 'La relación no se enfría',
  },
];

export const porQueVersat = [
  {
    num: '01',
    title: 'Identificación del problema',
    text: 'Entendemos cómo funciona hoy el proceso de tu empresa y detectamos dónde están los problemas: tareas repetitivas, tiempos de respuesta lentos, oportunidades perdidas.',
  },
  {
    num: '02',
    title: 'Solución',
    text: 'Con base en ese diagnóstico, configuramos la solución de acuerdo al proceso real de tu empresa — no una plantilla genérica.',
  },
  {
    num: '03',
    title: 'IA funcionando',
    text: 'Versat entrega una IA funcionando, adaptada a tu proceso, lista para atender desde el primer día.',
  },
];

export const pricingPrices: Record<string, { monthly: number }> = {
  std: { monthly: 65 },
  pro: { monthly: 100 },
};

export const pricingPlans = [
  {
    id: 'std',
    name: 'Plan Estándar',
    desc: 'Perfecto para centralizar tus canales y gestionar chats',
    featured: false,
    features: [
      'CRM completo',
      'Conexión de 1 línea de WhatsApp',
      'Conexión de Instagram',
      'Hasta 30.000 leads',
    ],
    ctaLabel: 'Empezar con Estándar',
    ctaClass: 'btn-price-outline',
    modalPlan: 'Plan Estándar',
  },
  {
    id: 'pro',
    name: 'Plan Pro',
    desc: 'IA que trabaja por ti, entrenada en tu negocio',
    featured: true,
    badge: 'Más popular',
    features: [
      'Todo lo del Plan Estándar',
      'Automatizaciones de IA',
      'Hasta 50.000 leads calificados por IA',
      'Entrenamiento de la IA a cargo de Versat',
    ],
    ctaLabel: 'Empezar con Pro',
    ctaClass: 'btn-price-solid',
    modalPlan: 'Plan Pro',
  },
  {
    id: 'empresa',
    name: 'Empresa',
    desc: 'Más allá de lo establecido',
    featured: false,
    isCustom: true,
    features: [
      'Solución personalizada a tu proceso',
      'Alcance y condiciones definidos con nuestro equipo',
      'Acompañamiento dedicado sin costo adicional',
    ],
    ctaLabel: 'Hablar con nuestro equipo',
    ctaClass: 'btn-price-outline',
    modalPlan: 'Plan Empresa',
  },
];

export const testimonials = [
  {
    av: 'CJ', name: 'Equipo Centro Japón', role: 'Gerente', type: 'Centro Japón', category: 'Cultura',
    quote: '"Versat nos ayudó a que, cuando pautamos con Meta y llegan 2.000 clientas interesadas, podamos atenderlas en el menor tiempo posible. Nuestras vendedoras pueden centrarse en las personas que realmente están interesadas en realizar la compra."',
    kpis: [{ n: '2.000', l: 'Clientas atendidas' }, { n: '↑', l: 'Foco en compradoras' }, { n: '24/7', l: 'Atención' }],
    logo: 'CENTRO JAPÓN', logoImg: asset('/assets/images/centro-japon.png'), logoRound: true,
    tabThumb: 'CJ', tabName: 'Centro Japón', tabTag: 'Cliente Versat',
  },
  {
    av: 'SH', name: 'Equipo Somos el Hueco', role: 'Gerente', type: 'Somos el Hueco', category: 'E-commerce',
    quote: '"Teníamos clientes que tenían dudas sobre el estado de sus pedidos. Versat nos ayuda a entregar una respuesta clara y ágil sobre cómo está su pedido, aumentando la confianza de nuestros clientes."',
    kpis: [{ n: '↑', l: 'Confianza del cliente' }, { n: 'Clara', l: 'Respuesta de estado' }, { n: 'Ágil', l: 'Tiempo de respuesta' }],
    logo: 'SOMOS EL HUECO', logoImg: asset('/assets/images/hueco.png'), logoRound: true,
    tabThumb: 'SH', tabName: 'Somos el Hueco', tabTag: 'Cliente Versat',
  },
  {
    av: 'LA', name: 'Equipo Lampert', role: 'Gerente', type: 'Lampert', category: 'Industria',
    quote: '"Versat nos ayuda con la postventa. Al tener un producto premium, necesitábamos ofrecer respuestas ágiles y oportunas a nuestros clientes, y Versat nos ayudó con eso."',
    kpis: [{ n: 'Ágil', l: 'Postventa' }, { n: 'Premium', l: 'Estándar de marca' }, { n: 'Oportuna', l: 'Respuesta' }],
    logo: 'LAMPERT', logoImg: asset('/assets/images/lampert.png'),
    tabThumb: 'LA', tabName: 'Lampert', tabTag: 'Cliente Versat',
  },
  {
    av: 'MI', name: 'Equipo Micelu', role: 'Gerente', type: 'Micelu', category: 'Tecnología',
    quote: '"Pautamos con un influencer y nos llegaron 2.000 mensajes en una hora. Gracias a Versat pudimos atender ese volumen de conversaciones y aumentar la conversión de nuestra publicidad."',
    kpis: [{ n: '2.000', l: 'Mensajes en 1h' }, { n: '↑', l: 'Conversión' }, { n: '100%', l: 'Atendidos' }],
    logo: 'MICELU', logoImg: asset('/assets/images/micelu.png'),
    tabThumb: 'MI', tabName: 'Micelu', tabTag: 'Cliente Versat',
  },
];

export const companiesList = [
  { name: 'MICELU', logoImg: asset('/assets/images/micelu.png'), category: 'Tecnología' },
  { name: 'LAMPERT', logoImg: asset('/assets/images/lampert.png'), category: 'Industria' },
  { name: 'Somos el Hueco', logoImg: asset('/assets/images/hueco.png'), category: 'E-commerce', logoRound: true },
  { name: 'Centro Japón', logoImg: asset('/assets/images/centro-japon.png'), category: 'Cultura', logoRound: true },
  { name: 'COLFRAME', logoImg: asset('/assets/images/colframe.png'), category: 'Constructora' },
];
