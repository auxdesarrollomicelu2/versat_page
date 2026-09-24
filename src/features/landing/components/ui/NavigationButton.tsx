import { Link } from 'react-router-dom';
import { useMagnetic } from '../../hooks/useReveal';

interface NavigationButtonProps {
  to: string;
  label: string;
  className?: string;
}

/**
 * Navigation button for landing with magnetic effect
 * Matches landing design system with CSS classes
 */
export default function NavigationButton({ to, label, className = '' }: NavigationButtonProps) {
  const btnRef = useMagnetic<HTMLAnchorElement>({ radius: 50, strength: 0.2 });

  return (
    <Link
      to={to}
      className={`nav-cta ${className}`}
      ref={btnRef}
    >
      {label} →
    </Link>
  );
}
