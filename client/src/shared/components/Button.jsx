import { Link } from 'react-router-dom';
import { cn } from '@/shared/utils/cn.js';
import Spinner from './Spinner.jsx';

/**
 * @typedef {'primary' | 'secondary' | 'soft' | 'ghost' | 'danger'} ButtonVariant
 * @typedef {'sm' | 'md' | 'lg'} ButtonSize
 */

/** @type {Record<ButtonVariant, string>} */
const VARIANTS = {
  primary: 'bg-primary text-ink shadow-card active:bg-primary-strong',
  secondary: 'bg-surface text-ink border border-line active:bg-surface-muted',
  soft: 'bg-primary-soft text-ink active:bg-primary/40',
  ghost: 'bg-transparent text-ink-muted active:bg-surface-muted',
  danger: 'bg-danger-soft text-danger active:bg-danger/15',
};

/** @type {Record<ButtonSize, string>} */
const SIZES = {
  sm: 'h-9 px-3.5 text-sub rounded-sm gap-1.5',
  md: 'h-11 px-4 text-bodysm rounded-md gap-2',
  lg: 'h-touch px-5 text-body rounded-card gap-2',
};

/**
 * The app's only button. Anything that looks like a button uses this, so
 * height, radius and press feedback stay identical everywhere.
 *
 * @param {Object} props
 * @param {import('react').ReactNode} props.children
 * @param {ButtonVariant} [props.variant]
 * @param {ButtonSize} [props.size]
 * @param {boolean} [props.fullWidth]
 * @param {boolean} [props.loading]
 * @param {boolean} [props.disabled]
 * @param {string} [props.to] Renders a router link instead of a `<button>`.
 * @param {'button' | 'submit'} [props.type]
 * @param {() => void} [props.onClick]
 * @param {import('react').ReactNode} [props.leadingIcon]
 * @param {string} [props.className]
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'lg',
  fullWidth = false,
  loading = false,
  disabled = false,
  to,
  type = 'button',
  onClick,
  leadingIcon,
  className,
}) {
  const classes = cn(
    'press inline-flex items-center justify-center font-semibold',
    'disabled:opacity-50 disabled:pointer-events-none',
    'transition-colors duration-fast',
    VARIANTS[variant],
    SIZES[size],
    fullWidth && 'w-full',
    className,
  );

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {leadingIcon}
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled || loading} className={classes}>
      {loading ? <Spinner size="sm" /> : leadingIcon}
      {children}
    </button>
  );
}
