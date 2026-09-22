import PageLayout, { DocH } from './PageLayout';

export default function InstagramIA() {
  return (
    <PageLayout
      tag="Canal"
      title="Instagram con IA"
      lede="Los mensajes directos que llegan de tus campañas, respondidos al instante y sin cola."
      visual={
        <svg viewBox="0 0 140 84" fill="none" aria-hidden="true">
          <rect x="16" y="10" width="46" height="46" rx="13" stroke="currentColor" strokeWidth="1.3" opacity=".5" />
          <circle cx="39" cy="33" r="10" stroke="currentColor" strokeWidth="1.3" opacity=".5" />
          <circle cx="53" cy="20" r="2.4" fill="currentColor" opacity=".6" />
          <path d="M126 30H82a8 8 0 00-8 8v10a8 8 0 008 8h34l10 7V30z" fill="currentColor" opacity=".12" />
          <path d="M126 30H82a8 8 0 00-8 8v10a8 8 0 008 8h34l10 7V30z" stroke="currentColor" strokeWidth="1.4" />
          <path d="M86 43h30" stroke="currentColor" strokeWidth="1.1" opacity=".7" strokeLinecap="round" />
        </svg>
      }
    >
      <DocH n="01">El canal donde la publicidad se convierte en conversación</DocH>
      <p className="doc-p">
        Cuando pautas en Meta, el resultado no es una venta: es una avalancha de mensajes directos. Si esos mensajes
        esperan, la intención de compra se enfría. Versat responde al instante y mantiene viva la conversación.
      </p>
      <DocH n="02">Incluido desde el Plan Estándar</DocH>
      <p className="doc-p">
        El Plan Estándar incluye la conexión de Instagram junto con 1 línea de WhatsApp. Los dos canales llegan a la
        misma bandeja, así que el equipo no tiene que saltar entre aplicaciones ni el cliente repetir lo que ya contó.
      </p>
      <div className="doc-chips">
        <span className="doc-chip"><i aria-hidden="true"></i>Mensajes directos</span>
        <span className="doc-chip"><i aria-hidden="true"></i>Misma bandeja que WhatsApp</span>
        <span className="doc-chip"><i aria-hidden="true"></i>Historial del cliente</span>
        <span className="doc-chip"><i aria-hidden="true"></i>Escalado a tu equipo</span>
      </div>
      <DocH n="03">Un caso real</DocH>
      <p className="doc-p">
        Centro Japón pauta con Meta y recibe alrededor de 2.000 clientas interesadas. Versat les permite atenderlas en
        el menor tiempo posible, para que sus vendedoras puedan centrarse en las personas que realmente están
        interesadas en comprar.
      </p>
      <DocH n="04">Con el mismo agente</DocH>
      <p className="doc-p">
        No es un bot distinto: es el mismo asistente, entrenado con tu base de conocimiento y tu tono de voz, atendiendo
        también por Instagram.
      </p>
    </PageLayout>
  );
}
