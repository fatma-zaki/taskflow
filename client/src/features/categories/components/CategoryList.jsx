import { IconBadge, ListRow, RowGroup, Skeleton } from '@/shared/components';
import { routeTo } from '@/app/navigation/routes.js';

/**
 * The category list: one row per segment, each with a tinted icon and its
 * current task count.
 *
 * @param {Object} props
 * @param {{ segment: import('@/features/tasks').TaskSegment, count: number }[]} props.segments
 * @param {boolean} [props.isLoading]
 */
export default function CategoryList({ segments, isLoading = false }) {
  if (isLoading) {
    return (
      <div className="space-y-2.5">
        {Array.from({ length: 4 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key -- placeholders have no identity
          <Skeleton key={index} className="h-[72px] rounded-card" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      {segments.map(({ segment, count }) => {
        const Icon = segment.icon;

        return (
          <RowGroup key={segment.id}>
            <ListRow
              label={segment.label}
              description={`${count} ${count === 1 ? 'task' : 'tasks'}`}
              leading={<IconBadge icon={<Icon />} tone={segment.tone} size="lg" />}
              to={routeTo.tasksInSegment(segment.id)}
              className="py-3.5"
            />
          </RowGroup>
        );
      })}
    </div>
  );
}
