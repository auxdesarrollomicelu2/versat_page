import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Al cambiar de ruta: si hay #hash la busca y hace scroll ahí, si no, sube al tope.
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
