import { useMemo, useState } from 'react';
import { indexTasksByDay, tasksOnDay, useTasks } from '@/features/tasks';
import { dayKey } from '@/shared/utils/date.js';
import { shiftMonth } from '../services/calendarRules.js';

/**
 * State and derived data for the calendar screen: which month is shown, which
 * day is selected, how many tasks each day holds, and the selected day's list.
 *
 * @returns {{
 *   month: Date,
 *   selected: Date,
 *   tasksByDay: Map<string, import('@/shared/types').Task[]>,
 *   selectedTasks: import('@/shared/types').Task[],
 *   isLoading: boolean,
 *   selectDate: (date: Date) => void,
 *   shiftBy: (delta: number) => void,
 *   goToToday: () => void,
 * }}
 */
export function useCalendarTasks() {
  const [month, setMonth] = useState(() => new Date());
  const [selected, setSelected] = useState(() => new Date());
  const { tasks, isLoading } = useTasks();

  const tasksByDay = useMemo(() => indexTasksByDay(tasks), [tasks]);
  const selectedTasks = useMemo(
    () => tasksOnDay(tasksByDay.get(dayKey(selected)) ?? [], selected),
    [tasksByDay, selected],
  );

  return {
    month,
    selected,
    tasksByDay,
    selectedTasks,
    isLoading,
    /** Selecting a day in an adjacent month also moves the grid to it. */
    selectDate: (date) => {
      setSelected(date);
      setMonth(date);
    },
    shiftBy: (delta) => setMonth((current) => shiftMonth(current, delta)),
    goToToday: () => {
      const today = new Date();
      setSelected(today);
      setMonth(today);
    },
  };
}

export default useCalendarTasks;
