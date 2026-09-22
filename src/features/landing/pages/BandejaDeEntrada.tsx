import PageLayout, { DocH } from './PageLayout';

export default function BandejaDeEntrada() {
  return (
    <PageLayout
      tag="Canales"
      title="Bandeja de entrada unificada"
      lede="WhatsApp, Instagram y el resto de tus canales llegando a una sola bandeja, con todo el historial del cliente a la vista."
      visual={
        <svg viewBox="0 0 140 84" fill="none" aria-hidden="true">
          <rect x="12" y="14" width="116" height="14" rx="3" stroke="currentColor" strokeWidth="1" opacity=".3" />
          <rect x="12" y="35" width="116" height="14" rx="3" fill="currentColor" opacity=".12" />
          <rect x="12" y="35" width="116" height="14" rx="3" stroke="currentColor" strokeWidth="1.3" />
          <rect x="12" y="56" width="116" height="14" rx="3" stroke="currentColor" strokeWidth="1" opacity=".3" />
          <circle cx="22" cy="21" r="2.6" fill="currentColor" opacity=".35" />
          <circle cx="22" cy="42" r="2.6" fill="currentColor" />
          <circle cx="22" cy="63" r="2.6" fill="currentColor" opacity=".35" />
          <path d="M34 21h58M34 42h48M34 63h64" stroke="currentColor" strokeWidth="1" opacity=".28" strokeLinecap="round" />
        </svg>
      }
    >
      <DocH n="01">Una sola bandeja, no cinco pestañas</DocH>
      <p className="doc-p">
        Cuando cada canal vive en su propia aplicación, el equipo pierde tiempo saltando entre ventanas y el cliente
        termina repitiendo lo que ya había contado. Versat centraliza esas conversaciones en un mismo lugar, con el
        historial completo de cada persona.
      </p>
      <DocH n="02">Qué se conecta</DocH>
      <p className="doc-p">
        El Plan Estándar incluye la conexión de 1 línea de WhatsApp y de Instagram. Además, Versat centraliza las
        aplicaciones de uso diario de tu negocio, no sólo mensajería. Te acompañamos con todo el proceso de
        configuración para que esté funcionando sin problemas.
      </p>
      <div className="doc-chips">
        <span className="doc-chip"><i aria-hidden="true"></i>WhatsApp</span>
        <span className="doc-chip"><i aria-hidden="true"></i>Instagram</span>
        <span className="doc-chip"><i aria-hidden="true"></i>Facebook</span>
        <span className="doc-chip"><i aria-hidden="true"></i>Telegram</span>
        <span className="doc-chip"><i aria-hidden="true"></i>Tus aplicaciones de uso diario</span>
      </div>
      <DocH n="03">La IA trabaja dentro de la bandeja</DocH>
      <p className="doc-p">
        No es un buzón pasivo. La IA lee lo que entra, responde lo que puede resolver al instante y deja registrado el
        contexto para quien siga la conversación.
      </p>
      <DocH n="04">Y cuando hace falta una persona</DocH>
      <p className="doc-p">
        La IA identifica cuándo una conversación requiere atención humana y puede escalarla a tu equipo en cualquier
        momento. Tú decides qué tanto automatizar y en qué casos interviene tu equipo.
      </p>
      <div className="doc-note">
        Somos el Hueco usa Versat para responder con claridad y agilidad sobre el estado de los pedidos, algo que antes
        se resolvía conversación por conversación.
      </div>
    </PageLayout>
  );
}
