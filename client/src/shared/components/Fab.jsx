import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useLayout } from '@/app/navigation/LayoutContext.jsx';
import { cn } from '@/shared/utils/cn.js';

/**
 * Floating action button, pinned above the bottom navigation.
 *
 * @param {Object} props
 * @param {string} props.label Accessible name.
 * @param {string} [props.to]
 * @param {() => void} [props.onClick]
 * @param {import('react').ReactNode} [props.icon]
 * @param {string} [props.className]
 */
export default function Fab({ label, to, onClick, icon, className }) {
  const { hasBottomNav } = useLayout();

  const classes = cn(
    'fixed right-screen z-30 mb-4',
    hasBottomNav ? 'bottom-nav-safe' : 'bottom-0 pb-safe',
    'flex h-14 w-14 items-center justify-center rounded-full bg-primary text-ink shadow-fab',
    'press transition-colors duration-fast active:bg-primary-strong',
    className,
  );

  const content = icon ?? <Plus size={24} strokeWidth={2.5} />;

  return to ? (
    <Link to={to} aria-label={label} className={classes}>
      {content}
    </Link>
  ) : (
    <button type="button" aria-label={label} onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
