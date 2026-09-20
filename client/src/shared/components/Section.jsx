import { cn } from '@/shared/utils/cn.js';
import TextLink from './TextLink.jsx';

/**
 * A titled block of content with an optional trailing link — the standard way
 * screens introduce a group ("My tasks / View all →").
 *
 * @param {Object} props
 * @param {import('react').ReactNode} props.children
 * @param {string} [props.title]
 * @param {string | number} [props.count] Rendered next to the title, e.g. "Today (2)".
 * @param {{ label: string, to: string }} [props.action]
 * @param {string} [props.className]
 */
export default function Section({ children, title, count, action, className }) {
  return (
    <section className={cn('mt-6 first:mt-0', className)}>
      {(title || action) && (
        <div className="mb-3 flex items-center justify-between gap-3">
          {title ? (
            <h2 className="text-section">
              {title}
              {count !== undefined && <span className="ml-1 text-ink-muted">({count})</span>}
            </h2>
          ) : (
            <span />
          )}
          {action ? <TextLink to={action.to}>{action.label}</TextLink> : null}
        </div>
      )}
      {children}
    </section>
  );
}
