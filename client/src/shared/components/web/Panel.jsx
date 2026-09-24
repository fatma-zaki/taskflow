import { cn } from '@/shared/utils/cn.js';

/**
 * A titled surface — the web app's unit of content. Dashboard widgets, tables
 * and form sections all sit in one.
 *
 * @param {Object} props
 * @param {import('react').ReactNode} props.children
 * @param {string} [props.title]
 * @param {string | number} [props.count]
 * @param {import('react').ReactNode} [props.action] Rendered on the right of the header.
 * @param {'none' | 'sm' | 'md'} [props.padding] Body padding; use "none" for tables.
 * @param {string} [props.className]
 * @param {string} [props.bodyClassName]
 */
export default function Panel({
  children,
  title,
  count,
  action,
  padding = 'md',
  className,
  bodyClassName,
}) {
  return (
    <section className={cn('overflow-hidden rounded-card border border-line bg-surface', className)}>
      {title || action ? (
        <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
          {title ? (
            <h2 className="text-section">
              {title}
              {count !== undefined ? <span className="ml-1.5 text-ink-muted">({count})</span> : null}
            </h2>
          ) : (
            <span />
          )}
          {action}
        </div>
      ) : null}

      <div className={cn(padding === 'md' && 'p-5', padding === 'sm' && 'p-3', bodyClassName)}>
        {children}
      </div>
    </section>
  );
}
