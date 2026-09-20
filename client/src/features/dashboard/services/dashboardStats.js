import { CheckCircle2, CircleDashed, Clock } from 'lucide-react';
import { routeTo } from '@/app/navigation/routes.js';
import { isCompleted, isDueToday } from '@/features/tasks';

/**
 * Builds the three headline numbers on Home.
 *
 * `inProgress` and `completed` come from the dashboard endpoint, which counts
 * across the whole dataset. "Due today" has no server counter, so it is derived
 * from the loaded task list.
 *
 * @typedef {import('@/shared/types').Task} Task
 * @typedef {import('@/shared/types').TaskCounts} TaskCounts
 * @typedef {import('@/shared/theme/tones.js').Tone} Tone
 *
 * @typedef {Object} DashboardStat
 * @property {string} id
 * @property {string} label
 * @property {number} value
 * @property {import('lucide-react').LucideIcon} icon
 * @property {Tone} tone
 * @property {string} [to]
 *
 * @param {{ counts: Partial<TaskCounts> | undefined, tasks: Task[] }} input
 * @returns {DashboardStat[]}
 */
export function buildDashboardStats({ counts, tasks }) {
  const dueToday = tasks.filter((task) => isDueToday(task) && !isCompleted(task)).length;

  return [
    {
      id: 'in-progress',
      label: 'In progress',
      value: counts?.inProgress ?? 0,
      icon: CircleDashed,
      tone: 'primary',
      to: routeTo.tasksInSegment('work'),
    },
    {
      id: 'due-today',
      label: 'Due today',
      value: dueToday,
      icon: Clock,
      tone: 'info',
    },
    {
      id: 'completed',
      label: 'Completed',
      value: counts?.completed ?? tasks.filter(isCompleted).length,
      icon: CheckCircle2,
      tone: 'success',
      to: routeTo.tasksInSegment('completed'),
    },
  ];
}
