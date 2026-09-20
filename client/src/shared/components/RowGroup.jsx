import { Children } from 'react';
import { cn } from '@/shared/utils/cn.js';

/**
 * Groups `ListRow`s into one surface with hairline separators — the standard
 * iOS/Android settings-list pattern, used wherever rows belong together.
 *
 * @param {Object} props
 * @param {import('react').ReactNode} props.children
 * @param {string} [props.className]
 */
export default function RowGroup({ children, className }) {
  const rows = Children.toArray(children).filter(Boolean);

  return (
    <div className={cn('overflow-hidden rounded-card border border-line bg-surface', className)}>
      {rows.map((row, index) => (
        // eslint-disable-next-line react/no-array-index-key -- rows are static in order
        <div key={index} className={cn(index > 0 && 'border-t border-line')}>
          {row}
        </div>
      ))}
    </div>
  );
}
