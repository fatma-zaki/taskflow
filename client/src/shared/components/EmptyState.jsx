import { cn } from '@/shared/utils/cn.js';

/**
 * Intentional empty states: an illustration, a calm sentence, and — when the
 * user can do something about it — one primary action.
 *
 * @param {Object} props
 * @param {string} props.title
 * @param {string} [props.description]
 * @param {import('react').ReactNode} [props.illustration]
 * @param {import('react').ReactNode} [props.action]
 * @param {'compact' | 'comfortable'} [props.size]
 * @param {string} [props.className]
 */
export default function EmptyState({
  title,
  description,
  illustration,
  action,
  size = 'comfortable',
  className,
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center text-center',
        size === 'comfortable' ? 'py-10' : 'py-6',
        className,
      )}
    >
      {illustration ? <div className="mb-4">{illustration}</div> : null}
      <p className="text-body font-semibold text-ink">{title}</p>
      {description ? <p className="mt-1 max-w-[16rem] text-sub text-ink-muted">{description}</p> : null}
      {action ? <div className="mt-5 w-full max-w-[15rem]">{action}</div> : null}
    </div>
  );
}
