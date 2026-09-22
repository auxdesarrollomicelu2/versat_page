// Antepone el base path de Vite (ej. "/landing/") a rutas de /public que se referencian
// desde JSX en tiempo de ejecución — Vite solo reescribe automáticamente las que están en index.html.
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export function asset(path: string): string {
  return `${BASE}${path.startsWith('/') ? path : `/${path}`}`;
}
