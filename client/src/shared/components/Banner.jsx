import { cn } from '@/shared/utils/cn.js';

/**
 * A soft, low-key message strip — the motivational note on Home and the focus
 * note on My day. Never used for errors; toasts handle those.
 *
 * @param {Object} props
 * @param {string} props.title
 * @param {string} [props.description]
 * @param {import('react').ReactNode} [props.icon]
 * @param {string} [props.className]
 */
export default function Banner({ title, description, icon, className }) {
  return (
    <div className={cn('flex items-start gap-3 rounded-card bg-primary-soft px-4 py-3.5', className)}>
      {icon ? (
        <span aria-hidden="true" className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-surface/70 text-primary-strong">
          {icon}
        </span>
      ) : null}
      <span className="min-w-0">
        <span className="block text-bodysm font-semibold text-ink">{title}</span>
        {description ? <span className="mt-0.5 block text-sub text-ink-muted">{description}</span> : null}
      </span>
    </div>
  );
}
