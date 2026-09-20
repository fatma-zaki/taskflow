import { Link } from 'react-router-dom';
import { cn } from '@/shared/utils/cn.js';

/**
 * A 44×44 tap target wrapping a single icon — used in headers and rows.
 *
 * @param {Object} props
 * @param {import('react').ReactNode} props.children The icon element.
 * @param {string} props.label Accessible name; never rendered visually.
 * @param {() => void} [props.onClick]
 * @param {string} [props.to]
 * @param {'plain' | 'surface'} [props.variant]
 * @param {string} [props.className]
 */
export default function IconButton({ children, label, onClick, to, variant = 'plain', className }) {
  const classes = cn(
    'press inline-flex items-center justify-center min-w-touch min-h-touch -m-1 rounded-md text-ink',
    'transition-colors duration-fast active:bg-surface-muted',
    variant === 'surface' && 'bg-surface border border-line shadow-card m-0 min-w-11 min-h-11',
    className,
  );

  if (to) {
    return (
      <Link to={to} aria-label={label} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" aria-label={label} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
