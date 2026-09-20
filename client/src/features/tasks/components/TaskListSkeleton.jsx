import { Skeleton } from '@/shared/components';

/**
 * @param {Object} props
 * @param {number} [props.rows]
 */
export default function TaskListSkeleton({ rows = 3 }) {
  return (
    <div className="overflow-hidden rounded-card border border-line bg-surface">
      {Array.from({ length: rows }).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key -- placeholder rows have no identity
        <div key={index} className="flex items-center gap-3 border-t border-line px-4 py-3.5 first:border-t-0">
          <Skeleton className="h-6 w-6 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3.5 w-2/3" />
            <Skeleton className="h-2.5 w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
}
