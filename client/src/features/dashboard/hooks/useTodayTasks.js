import { useMemo } from 'react';
import { calculateProgress, tasksOnDay, useTasks } from '@/features/tasks';

/**
 * Today's tasks and their completion progress — shared by Home and My day so
 * the two screens can never disagree about what "today" contains.
 *
 * @returns {{
 *   tasks: import('@/shared/types').Task[],
 *   progress: import('@/features/tasks').DayProgress,
 *   isLoading: boolean,
 * }}
 */
export function useTodayTasks() {
  const { tasks, isLoading } = useTasks();

  const todayTasks = useMemo(() => tasksOnDay(tasks, new Date()), [tasks]);
  const progress = useMemo(() => calculateProgress(todayTasks), [todayTasks]);

  return { tasks: todayTasks, progress, isLoading };
}

export default useTodayTasks;
