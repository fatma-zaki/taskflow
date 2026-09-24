import { cn } from '@/shared/utils/cn.js';

/**
 * Filter bar above a table: a responsive row of controls with an optional
 * trailing action (usually "Clear filters").
 *
 * @param {Object} props
 * @param {import('react').ReactNode} props.children
 * @param {import('react').ReactNode} [props.action]
 * @param {string} [props.className]
 */
export default function Toolbar({ children, action, className }) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-end gap-3 rounded-card border border-line bg-surface p-4',
        className,
      )}
    >
      <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2 desktop:grid-cols-3">{children}</div>
      {action ? <div className="flex items-center gap-2">{action}</div> : null}
    </div>
  );
}
