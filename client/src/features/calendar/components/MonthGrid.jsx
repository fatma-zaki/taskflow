import { Card } from '@/shared/components';
import { dayKey, isDateToday, isSameCalendarDay } from '@/shared/utils/date.js';
import { WEEKDAY_LABELS, buildMonthGrid } from '../services/calendarRules.js';
import DayCell from './DayCell.jsx';

/**
 * Compact, touch-friendly month grid.
 *
 * @param {Object} props
 * @param {Date} props.month
 * @param {Date} props.selected
 * @param {Map<string, import('@/shared/types').Task[]>} props.tasksByDay
 * @param {(date: Date) => void} props.onSelect
 */
export default function MonthGrid({ month, selected, tasksByDay, onSelect }) {
  const weeks = buildMonthGrid(month);

  return (
    <Card padding="sm">
      <div className="grid grid-cols-7 gap-y-1">
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
            />
          )),
        )}
      </div>
    </Card>
  );
}
