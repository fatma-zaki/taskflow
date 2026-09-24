/**
 * Task business rules — pure functions over task data.
 *
 * Nothing here imports React or touches the network, so every rule can be
 * unit-tested on its own and reused by Home, Calendar, Tasks, Categories and
 * My day without duplication.
 */
import { dayKey, isDateToday, isPast, isSameCalendarDay, toDate } from '@/shared/utils/date.js';
import { entityId } from '@/shared/utils/entity.js';
import { TASK_STATUS } from '../constants/taskMeta.js';

/**
 * @typedef {import('@/shared/types').Task} Task
 * @typedef {import('@/shared/types').User} User
 * @typedef {import('@/shared/types').TaskStatus} TaskStatus
 * @typedef {import('../constants/taskMeta.js').TaskFilterId} TaskFilterId
 */

/**
 * @param {Task} task
 * @returns {boolean}
 */
export const isCompleted = (task) => task.status === TASK_STATUS.COMPLETED;

/**
 * @param {Task} task
 * @returns {boolean}
 */
export const isInProgress = (task) => task.status === TASK_STATUS.IN_PROGRESS;

/**
 * Overdue covers both the server-set status and a due date that has passed
 * while the task is still open.
 *
 * @param {Task} task
 * @returns {boolean}
 */
export const isOverdue = (task) =>
  !isCompleted(task) && (task.status === TASK_STATUS.OVERDUE || isPast(task.end_date));

/**
 * @param {Task} task
 * @returns {boolean}
 */
export const isDueToday = (task) => isDateToday(task.end_date);

/**
 * The status a task moves to when its checkbox is tapped.
 *
 * @param {Task} task
 * @returns {TaskStatus}
 */
export const nextToggledStatus = (task) =>
  isCompleted(task) ? TASK_STATUS.IN_PROGRESS : TASK_STATUS.COMPLETED;

/**
 * Who may change a task: managers and admins, plus the person it is assigned to.
 *
 * @param {Task} task
 * @param {{ user: User | null, isManager: boolean }} context
 * @returns {boolean}
 */
export function canUpdateTask(task, { user, isManager }) {
  if (isManager) return true;
  const assignee = entityId(task.assignee_id);
  return Boolean(assignee) && assignee === entityId(user);
}

/**
 * Only the reporter or an admin may delete a task.
 *
 * @param {Task} task
 * @param {{ user: User | null, isAdmin: boolean }} context
 * @returns {boolean}
 */
export function canDeleteTask(task, { user, isAdmin }) {
  if (isAdmin) return true;
  return entityId(task.reporter_id) === entityId(user);
}

/**
 * @param {Task} task
 * @param {TaskFilterId} filter
 * @returns {boolean}
 */
export function matchesFilter(task, filter) {
  switch (filter) {
    case 'in_progress':
      return isInProgress(task);
    case 'due_today':
      return isDueToday(task) && !isCompleted(task);
    case 'completed':
      return isCompleted(task);
    case 'all':
    default:
      return true;
  }
}

/**
 * @param {Task} task
 * @param {string} query
 * @returns {boolean}
 */
export function matchesSearch(task, query) {
  const term = query.trim().toLowerCase();
  if (!term) return true;
  return (
    task.title.toLowerCase().includes(term) || (task.description ?? '').toLowerCase().includes(term)
  );
}

/**
 * @param {Task} task
 * @param {TaskStatus | '' | undefined} status
 * @returns {boolean}
 */
export const matchesStatus = (task, status) => !status || task.status === status;

/**
 * @param {Task} task
 * @param {import('@/shared/types').TaskPriority | '' | undefined} priority
 * @returns {boolean}
 */
export const matchesPriority = (task, priority) => !priority || task.priority === priority;

/**
 * Everything a task list can be narrowed by. The phone screens use the chips
 * and search; the web app adds the status and priority selects. Both run the
 * same function below.
 *
 * @typedef {Object} TaskCriteria
 * @property {string} [search]
 * @property {TaskFilterId} [filter]
 * @property {TaskStatus | ''} [status]
 * @property {import('@/shared/types').TaskPriority | ''} [priority]
 * @property {string | null} [date] `yyyy-MM-dd`; keeps only tasks due that day.
 */

/**
 * @param {Task[]} tasks
 * @param {TaskCriteria} criteria
 * @returns {Task[]}
 */
export function applyTaskCriteria(tasks, criteria) {
  const { search = '', filter = 'all', status = '', priority = '', date = null } = criteria;

  return tasks.filter(
    (task) =>
      matchesFilter(task, filter) &&
      matchesSearch(task, search) &&
      matchesStatus(task, status) &&
      matchesPriority(task, priority) &&
      (!date || isSameCalendarDay(task.end_date, date)),
  );
}

/**
 * @param {Task[]} tasks
 * @returns {Task[]} a new array ordered by due date, soonest first.
 */
export function sortByDueDate(tasks) {
  return [...tasks].sort((a, b) => {
    const left = toDate(a.end_date)?.getTime() ?? Number.MAX_SAFE_INTEGER;
    const right = toDate(b.end_date)?.getTime() ?? Number.MAX_SAFE_INTEGER;
    return left - right;
  });
}

/**
 * @typedef {Object} TaskBuckets
 * @property {Task[]} overdue
 * @property {Task[]} today
 * @property {Task[]} upcoming
 * @property {Task[]} completed
 */

/**
 * Splits tasks into the groups the Tasks screen renders.
 *
 * @param {Task[]} tasks
 * @returns {TaskBuckets}
 */
export function groupTasksByBucket(tasks) {
  /** @type {TaskBuckets} */
  const buckets = { overdue: [], today: [], upcoming: [], completed: [] };

  for (const task of sortByDueDate(tasks)) {
    if (isCompleted(task)) buckets.completed.push(task);
    else if (isDueToday(task)) buckets.today.push(task);
    else if (isOverdue(task)) buckets.overdue.push(task);
    else buckets.upcoming.push(task);
  }

  return buckets;
}

/**
 * @param {Task[]} tasks
 * @param {string | Date} date
 * @returns {Task[]} tasks due on that calendar day, ordered by time.
 */
export function tasksOnDay(tasks, date) {
  return sortByDueDate(tasks.filter((task) => isSameCalendarDay(task.end_date, date)));
}

/**
 * Indexes tasks by calendar day — drives the calendar's activity dots.
 *
 * @param {Task[]} tasks
 * @returns {Map<string, Task[]>} keyed by `yyyy-MM-dd`.
 */
export function indexTasksByDay(tasks) {
  /** @type {Map<string, Task[]>} */
  const index = new Map();

  for (const task of tasks) {
    const key = dayKey(task.end_date);
    if (!key) continue;
    const existing = index.get(key);
    if (existing) existing.push(task);
    else index.set(key, [task]);
  }

  return index;
}

/**
 * @typedef {Object} DayProgress
 * @property {number} completed
 * @property {number} total
 * @property {number} percent 0–100, rounded.
 */

/**
 * Completion progress for a set of tasks — the My day ring.
 *
 * @param {Task[]} tasks
 * @returns {DayProgress}
 */
export function calculateProgress(tasks) {
  const total = tasks.length;
  const completed = tasks.filter(isCompleted).length;
  return {
    completed,
    total,
    percent: total === 0 ? 0 : Math.round((completed / total) * 100),
  };
}

/**
 * De-duplicates tasks that appear in several server buckets (upcoming, in
 * progress and overdue can overlap).
 *
 * @param {...Task[]} lists
 * @returns {Task[]}
 */
export function mergeUnique(...lists) {
  /** @type {Map<string, Task>} */
  const byId = new Map();
  for (const list of lists) {
    for (const task of list ?? []) {
      if (!byId.has(task._id)) byId.set(task._id, task);
    }
  }
  return [...byId.values()];
}
