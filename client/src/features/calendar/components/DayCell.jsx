import { cn } from '@/shared/utils/cn.js';
import { formatDayAria, formatDayNumber } from '@/shared/utils/date.js';

const MAX_DOTS = 3;

/** @type {Record<'md' | 'lg', { cell: string, disc: string }>} */
const SIZES = {
  md: { cell: 'h-11', disc: 'h-8 w-8 text-sub' },
  lg: { cell: 'h-16', disc: 'h-10 w-10 text-bodysm' },
};

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
 * @param {'md' | 'lg'} [props.size]
 */
export default function DayCell({ date, inMonth, selected, today, taskCount, onSelect, size = 'md' }) {
  const style = SIZES[size];

  return (
    <button
      type="button"
      onClick={() => onSelect(date)}
      aria-pressed={selected}
      aria-label={`${formatDayAria(date)}${taskCount ? `, ${taskCount} tasks` : ''}`}
      className={cn('press flex flex-col items-center justify-center gap-1 rounded-md', style.cell)}
    >
      <span
        className={cn(
          'flex items-center justify-center rounded-full font-semibold transition-colors duration-fast',
          style.disc,
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
