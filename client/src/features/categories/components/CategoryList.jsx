import { IconBadge, ListRow, RowGroup, Skeleton } from '@/shared/components';
import { routeTo } from '@/app/navigation/routes.js';

/**
 * The category list: one row per segment, each with a tinted icon and its
 * current task count.
 *
 * `compact` groups the rows into a single surface — used inside a dashboard
 * panel, where separate cards would be too heavy.
 *
 * @param {Object} props
 * @param {{ segment: import('@/features/tasks').TaskSegment, count: number }[]} props.segments
 * @param {boolean} [props.isLoading]
 * @param {boolean} [props.compact]
 */
export default function CategoryList({ segments, isLoading = false, compact = false }) {
  if (isLoading) {
    return (
      <div className={compact ? 'space-y-1' : 'space-y-2.5'}>
        {Array.from({ length: 4 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key -- placeholders have no identity
          <Skeleton key={index} className={compact ? 'h-14 rounded-md' : 'h-[72px] rounded-card'} />
        ))}
      </div>
    );
  }

  /** @param {{ segment: import('@/features/tasks').TaskSegment, count: number }} entry */
  const renderRow = ({ segment, count }) => {
    const Icon = segment.icon;

    return (
      <ListRow
        key={segment.id}
        label={segment.label}
        description={compact ? undefined : `${count} ${count === 1 ? 'task' : 'tasks'}`}
        value={compact ? count : undefined}
        leading={<IconBadge icon={<Icon />} tone={segment.tone} size={compact ? 'md' : 'lg'} />}
        to={routeTo.tasksInSegment(segment.id)}
        className={compact ? undefined : 'py-3.5'}
      />
    );
  };

  if (compact) {
    return <RowGroup className="border-0">{segments.map(renderRow)}</RowGroup>;
  }

  return (
    <div className="space-y-2.5">
      {segments.map((entry) => (
        <RowGroup key={entry.segment.id}>{renderRow(entry)}</RowGroup>
      ))}
    </div>
  );
}
