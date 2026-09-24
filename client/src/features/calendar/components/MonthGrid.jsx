import { dayKey, isDateToday, isSameCalendarDay } from '@/shared/utils/date.js';
import { cn } from '@/shared/utils/cn.js';
import { WEEKDAY_LABELS, buildMonthGrid } from '../services/calendarRules.js';
import DayCell from './DayCell.jsx';

/**
 * Month grid. `size` is the only difference between the phone's compact grid
 * and the roomier one the web calendar shows.
 *
 * @param {Object} props
 * @param {Date} props.month
 * @param {Date} props.selected
 * @param {Map<string, import('@/shared/types').Task[]>} props.tasksByDay
 * @param {(date: Date) => void} props.onSelect
 * @param {'md' | 'lg'} [props.size]
 * @param {string} [props.className]
 */
export default function MonthGrid({ month, selected, tasksByDay, onSelect, size = 'md', className }) {
  const weeks = buildMonthGrid(month);

  return (
    <div className={cn('grid grid-cols-7 gap-y-1', className)}>
      {WEEKDAY_LABELS.map((label) => (
        <div key={label} className="pb-1 text-center text-caption font-semibold text-ink-faint">
          {label}
        </div>
      ))}

      {weeks.flatMap((week) =>
        week.map(({ date, inMonth }) => (
          <DayCell
            key={date.toISOString()}
            date={date}
            inMonth={inMonth}
            selected={isSameCalendarDay(date, selected)}
            today={isDateToday(date)}
            taskCount={tasksByDay.get(dayKey(date))?.length ?? 0}
            onSelect={onSelect}
            size={size}
          />
        )),
      )}
    </div>
  );
}
