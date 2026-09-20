import { cn } from '@/shared/utils/cn.js';
import { formatDayAria, formatDayNumber } from '@/shared/utils/date.js';

const MAX_DOTS = 3;

/**
 * One day in the month grid: the date, a yellow disc when selected, and up to
 * three dots showing how busy the day is.
 *
 * @param {Object} props
 * @param {Date} props.date
 * @param {boolean} props.inMonth
 * @param {boolean} props.selected
 * @param {boolean} props.today
 * @param {number} props.taskCount
 * @param {(date: Date) => void} props.onSelect
 */
export default function DayCell({ date, inMonth, selected, today, taskCount, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(date)}
      aria-pressed={selected}
      aria-label={`${formatDayAria(date)}${taskCount ? `, ${taskCount} tasks` : ''}`}
      className="press flex h-11 flex-col items-center justify-center gap-1"
    >
      <span
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-full text-sub font-semibold',
          'transition-colors duration-fast',
          selected
            ? 'bg-primary text-ink shadow-card'
            : today
              ? 'text-ink ring-1 ring-primary'
              : inMonth
                ? 'text-ink'
                : 'text-ink-faint',
        )}
      >
        {formatDayNumber(date)}
      </span>

      <span className="flex h-1 items-center gap-0.5">
        {Array.from({ length: Math.min(taskCount, MAX_DOTS) }).map((_, index) => (
          <span
            // eslint-disable-next-line react/no-array-index-key -- dots are interchangeable
            key={index}
            className={cn('h-1 w-1 rounded-full', selected ? 'bg-primary-strong' : 'bg-primary')}
          />
        ))}
      </span>
    </button>
  );
}
