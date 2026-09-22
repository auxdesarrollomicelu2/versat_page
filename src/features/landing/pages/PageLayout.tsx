import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export default function PageLayout({
  tag,
  title,
  lede,
  visual,
  children,
}: {
  tag: string;
  title: string;
  lede: string;
  visual: ReactNode;
  children: ReactNode;
}) {
  return (
    <main className="doc">
      <div className="doc-inner">
        <Link className="doc-back" to="..">← Volver al inicio</Link>

        <header className="doc-head reveal visible">
          <div>
            <span className="doc-tag">{tag}</span>
            <h1 className="doc-title">{title}</h1>
            <p className="doc-lede">{lede}</p>
          </div>
          <div className="doc-visual" aria-hidden="true">{visual}</div>
        </header>

        <div className="doc-body">{children}</div>

        <div className="doc-foot-space"></div>
      </div>
    </main>
  );
}

export function DocH({ n, children }: { n: string; children: ReactNode }) {
  return (
    <h2 className="doc-h">
      <span className="doc-h-n">{n}</span>
      {children}
    </h2>
  );
}
