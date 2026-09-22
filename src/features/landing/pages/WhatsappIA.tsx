import PageLayout, { DocH } from './PageLayout';

export default function WhatsappIA() {
  return (
    <PageLayout
      tag="Canal"
      title="WhatsApp con IA"
      lede="Tu número de WhatsApp conectado por Meta Business, atendido 24/7 con la voz de tu marca."
      visual={
        <svg viewBox="0 0 140 84" fill="none" aria-hidden="true">
          <path d="M18 16h56a8 8 0 018 8v12a8 8 0 01-8 8H30l-12 8V16z" stroke="currentColor" strokeWidth="1.2" opacity=".45" />
          <path d="M122 44H66a8 8 0 00-8 8v12a8 8 0 008 8h44l12 8V44z" fill="currentColor" opacity=".12" />
          <path d="M122 44H66a8 8 0 00-8 8v12a8 8 0 008 8h44l12 8V44z" stroke="currentColor" strokeWidth="1.4" />
          <path d="M30 28h30" stroke="currentColor" strokeWidth="1.1" opacity=".4" strokeLinecap="round" />
          <path d="M72 58h38" stroke="currentColor" strokeWidth="1.1" opacity=".7" strokeLinecap="round" />
        </svg>
      }
    >
      <DocH n="01">Cómo se conecta</DocH>
      <p className="doc-p">
        Conectas tu número de WhatsApp por medio de Meta Business. El Plan Estándar incluye la conexión de 1 línea de
        WhatsApp, y te acompañamos con todo el proceso de configuración para que quede funcionando sin problemas.
      </p>
      <DocH n="02">Qué pasa cuando llega un mensaje</DocH>
      <ol className="doc-steps">
        <li className="doc-step">
          <span className="doc-step-n">01</span>
          <h3 className="doc-step-h">El cliente escribe</h3>
          <p className="doc-step-p">El mensaje entra a la bandeja unificada, junto con el resto de tus canales.</p>
        </li>
        <li className="doc-step">
          <span className="doc-step-n">02</span>
          <h3 className="doc-step-h">La IA entiende</h3>
          <p className="doc-step-p">Identifica de qué se trata: una consulta de precio, una disponibilidad, una postventa, una solicitud de cita.</p>
        </li>
        <li className="doc-step">
          <span className="doc-step-n">03</span>
          <h3 className="doc-step-h">La IA responde</h3>
          <p className="doc-step-p">
            Contesta al instante lo que puede resolver, con la información y el tono de tu negocio. Si hace falta una
            persona, escala la conversación a tu equipo.
          </p>
        </li>
      </ol>
      <DocH n="03">Cuando el volumen se dispara</DocH>
      <p className="doc-p">
        Es el escenario donde más se nota. Micelu pautó con un influencer y le llegaron 2.000 mensajes en una hora; con
        Versat pudieron atender ese volumen y aumentar la conversión de su publicidad. Centro Japón pauta con Meta y
        recibe miles de clientas interesadas: sus vendedoras pueden centrarse en las personas que realmente van a
        comprar.
      </p>
      <DocH n="04">Postventa, no sólo venta</DocH>
      <p className="doc-p">
        Lampert usa Versat para la postventa: al tratarse de un producto premium, los clientes esperan respuestas
        ágiles y oportunas después de la compra, sin esperar horas.
      </p>
    </PageLayout>
  );
}
