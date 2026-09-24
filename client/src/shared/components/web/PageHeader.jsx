import { cn } from '@/shared/utils/cn.js';

/**
 * Title, one line of context, and the page's actions.
 *
 * @param {Object} props
 * @param {string} props.title
 * @param {string} [props.description]
 * @param {import('react').ReactNode} [props.actions]
 * @param {string} [props.className]
 */
export default function PageHeader({ title, description, actions, className }) {
  return (
    <header className={cn('mb-7 flex flex-wrap items-start justify-between gap-4', className)}>
      <div className="min-w-0">
        <h1 className="text-display">{title}</h1>
        {description ? <p className="mt-1.5 text-bodysm text-ink-muted">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2.5">{actions}</div> : null}
    </header>
  );
}
