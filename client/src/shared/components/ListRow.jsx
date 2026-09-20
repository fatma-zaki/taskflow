import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/shared/utils/cn.js';

/**
 * The generic "icon · label · value · chevron" row behind the Categories,
 * Settings and More screens.
 *
 * @param {Object} props
 * @param {string} props.label
 * @param {string} [props.description] Secondary line under the label.
 * @param {import('react').ReactNode} [props.leading] Usually an `<IconBadge />`.
 * @param {import('react').ReactNode} [props.value] Trailing value, e.g. "Light" or a count.
 * @param {boolean} [props.chevron]
 * @param {string} [props.to]
 * @param {() => void} [props.onClick]
 * @param {'default' | 'danger'} [props.intent]
 * @param {string} [props.className]
 */
export default function ListRow({
  label,
  description,
  leading,
  value,
  chevron = true,
  to,
  onClick,
  intent = 'default',
  className,
}) {
  const interactive = Boolean(to || onClick);

  const content = (
    <>
      {leading}
      <span className="min-w-0 flex-1 text-left">
        <span className={cn('block truncate text-body font-semibold', intent === 'danger' ? 'text-danger' : 'text-ink')}>
          {label}
        </span>
        {description ? <span className="mt-0.5 block truncate text-sub text-ink-muted">{description}</span> : null}
      </span>
      {value !== undefined && value !== null ? (
        <span className="shrink-0 text-sub text-ink-muted">{value}</span>
      ) : null}
      {chevron && interactive ? <ChevronRight size={18} className="shrink-0 text-ink-faint" /> : null}
    </>
  );

  const classes = cn(
    'flex w-full min-h-touch items-center gap-3 px-4 py-3',
    interactive && 'press-sm transition-colors duration-fast active:bg-surface-muted',
    className,
  );

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={classes}>
        {content}
      </button>
    );
  }

  return <div className={classes}>{content}</div>;
}
