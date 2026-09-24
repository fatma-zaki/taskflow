import { AlertCircle, CheckCircle2, CircleDashed, Clock } from 'lucide-react';

/**
 * @typedef {import('@/shared/types').TaskStatus} TaskStatus
 * @typedef {import('@/shared/types').TaskPriority} TaskPriority
 * @typedef {import('@/shared/theme/tones.js').Tone} Tone
 */

/** @type {Record<Uppercase<TaskStatus>, TaskStatus>} */
export const TASK_STATUS = Object.freeze({
  UPCOMING: 'upcoming',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  OVERDUE: 'overdue',
});

/** @type {Record<Uppercase<TaskPriority>, TaskPriority>} */
export const TASK_PRIORITY = Object.freeze({
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
});

/**
 * Presentation metadata per status — label, tone and icon. Components read this
 * map instead of branching on status strings.
 *
 * @type {Record<TaskStatus, { label: string, tone: Tone, icon: import('lucide-react').LucideIcon }>}
 */
export const STATUS_META = Object.freeze({
  upcoming: { label: 'Upcoming', tone: 'info', icon: Clock },
  in_progress: { label: 'In progress', tone: 'primary', icon: CircleDashed },
  completed: { label: 'Completed', tone: 'success', icon: CheckCircle2 },
  overdue: { label: 'Overdue', tone: 'danger', icon: AlertCircle },
});

/** @type {Record<TaskPriority, { label: string, tone: Tone }>} */
export const PRIORITY_META = Object.freeze({
  low: { label: 'Low', tone: 'success' },
  medium: { label: 'Medium', tone: 'primary' },
  high: { label: 'High', tone: 'danger' },
});

/** Options for the priority picker, ordered high → low. */
export const PRIORITY_OPTIONS = /** @type {const} */ ([
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
]);

/**
 * Filters offered on the Tasks screen.
 * @typedef {'all' | 'in_progress' | 'due_today' | 'completed'} TaskFilterId
 */

/** @type {{ value: TaskFilterId, label: string }[]} */
export const TASK_FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'in_progress', label: 'In progress' },
  { value: 'due_today', label: 'Due today' },
  { value: 'completed', label: 'Completed' },
];

/** Statuses a person can move a task to by hand; "overdue" is derived. */
export const SELECTABLE_STATUSES = /** @type {TaskStatus[]} */ ([
  TASK_STATUS.UPCOMING,
  TASK_STATUS.IN_PROGRESS,
  TASK_STATUS.COMPLETED,
]);

/** How many tasks a screen pulls when it needs the full working set. */
export const TASK_PAGE_SIZE = 100;
