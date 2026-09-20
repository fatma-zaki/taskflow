import { cn } from '@/shared/utils/cn.js';

/**
 * A white surface. Cards are used sparingly — for grouped rows and standalone
 * panels, never as a wrapper around every element on a screen.
 *
 * @param {Object} props
 * @param {import('react').ReactNode} props.children
 * @param {'flat' | 'raised'} [props.elevation]
 * @param {'none' | 'sm' | 'md'} [props.padding]
 * @param {string} [props.className]
 */
export default function Card({ children, elevation = 'flat', padding = 'md', className }) {
  return (
    <div
      className={cn(
        'rounded-card bg-surface border border-line',
        elevation === 'raised' && 'shadow-card',
        padding === 'sm' && 'p-3',
        padding === 'md' && 'p-4',
        className,
      )}
    >
      {children}
    </div>
  );
}
