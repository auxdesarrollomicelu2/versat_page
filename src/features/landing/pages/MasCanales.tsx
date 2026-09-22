import PageLayout, { DocH } from './PageLayout';

export default function MasCanales() {
  return (
    <PageLayout
      tag="Integraciones"
      title="Más canales, un solo lugar"
      lede="Versat no se queda en la mensajería: conecta también las aplicaciones de uso diario con las que ya trabaja tu negocio."
      visual={
        <svg viewBox="0 0 140 84" fill="none" aria-hidden="true">
          <path d="M70 42L20 16M70 42l50-26M70 42L20 68M70 42l50 26M70 42V8M70 42v34" stroke="currentColor" strokeWidth="1" opacity=".26" />
          <circle cx="70" cy="42" r="11" fill="currentColor" opacity=".14" />
          <circle cx="70" cy="42" r="11" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="20" cy="16" r="3.4" fill="currentColor" opacity=".6" />
          <circle cx="120" cy="16" r="3.4" fill="currentColor" opacity=".6" />
          <circle cx="20" cy="68" r="3.4" fill="currentColor" opacity=".6" />
          <circle cx="120" cy="68" r="3.4" fill="currentColor" opacity=".6" />
          <circle cx="70" cy="8" r="3.4" fill="currentColor" opacity=".85" />
          <circle cx="70" cy="76" r="3.4" fill="currentColor" opacity=".85" />
        </svg>
      }
    >
      <DocH n="01">Canales de conversación</DocH>
      <p className="doc-p">Por acá te escriben tus clientes. Todos llegan a la misma bandeja, con el historial completo de cada persona.</p>
      <div className="doc-chips">
        <span className="doc-chip"><i aria-hidden="true"></i>WhatsApp</span>
        <span className="doc-chip"><i aria-hidden="true"></i>Instagram</span>
        <span className="doc-chip"><i aria-hidden="true"></i>Facebook</span>
        <span className="doc-chip"><i aria-hidden="true"></i>Telegram</span>
      </div>
      <DocH n="02">Herramientas de uso diario</DocH>
      <p className="doc-p">Versat funciona con muchas más herramientas que sólo el correo. Estas son las integraciones que ya conecta:</p>
      <div className="doc-chips">
        <span className="doc-chip"><i aria-hidden="true"></i>ChatGPT</span>
        <span className="doc-chip"><i aria-hidden="true"></i>Claude</span>
        <span className="doc-chip"><i aria-hidden="true"></i>Canva</span>
        <span className="doc-chip"><i aria-hidden="true"></i>Meta Business</span>
        <span className="doc-chip"><i aria-hidden="true"></i>Shopify</span>
        <span className="doc-chip"><i aria-hidden="true"></i>LinkedIn</span>
      </div>
      <DocH n="03">Por qué importa tenerlos juntos</DocH>
      <p className="doc-p">
        Un canal aislado obliga a alguien a copiar información de un lado a otro. Cuando la conversación y las
        herramientas viven en el mismo lugar, la IA puede actuar con el contexto completo: entiende la solicitud,
        consulta lo que necesita y deja todo conectado al CRM.
      </p>
      <DocH n="04">Y lo que todavía no está</DocH>
      <p className="doc-p">
        Si tu operación necesita una integración distinta, se define directamente con nuestro equipo. Es exactamente
        para eso que existe el plan Empresa: una solución a la medida, sin los límites de los planes estándar.
      </p>
      <div className="doc-note">
        Te acompañamos con todo el proceso de configuración de cada canal y cada herramienta, para que esté funcionando
        sin problemas.
      </div>
    </PageLayout>
  );
}
