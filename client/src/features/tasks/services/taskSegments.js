import { AlertCircle, CheckCircle2, Clock, FolderClosed } from 'lucide-react';
import { isCompleted, isOverdue } from './taskRules.js';
import { TASK_PRIORITY } from '../constants/taskMeta.js';

/**
 * Task segments — the "categories" the app groups work into.
 *
 * The API has no category field on a task, so a segment is a named, declarative
 * filter rather than stored data. Adding one is a single entry here: the
 * Categories screen, its counts and the filtered Tasks view all follow.
 *
 * @typedef {import('@/shared/types').Task} Task
 * @typedef {import('@/shared/theme/tones.js').Tone} Tone
 *
 * @typedef {Object} TaskSegment
 * @property {string} id
 * @property {string} label
 * @property {Tone} tone
 * @property {import('lucide-react').LucideIcon} icon
 * @property {(task: Task) => boolean} matches
 */

/** @type {TaskSegment[]} */
export const TASK_SEGMENTS = [
  {
    id: 'work',
    label: 'Work',
    tone: 'primary',
    icon: FolderClosed,
    matches: (task) => !isCompleted(task),
  },
  {
    id: 'high-priority',
    label: 'High Priority',
    tone: 'danger',
    icon: AlertCircle,
    matches: (task) => !isCompleted(task) && task.priority === TASK_PRIORITY.HIGH,
  },
  {
    id: 'upcoming',
    label: 'Upcoming',
    tone: 'info',
    icon: Clock,
    matches: (task) => !isCompleted(task) && !isOverdue(task),
  },
  {
    id: 'completed',
    label: 'Completed',
    tone: 'success',
    icon: CheckCircle2,
    matches: isCompleted,
  },
];

/**
 * @param {string | null | undefined} id
 * @returns {TaskSegment | undefined}
 */
export const findSegment = (id) => (id ? TASK_SEGMENTS.find((segment) => segment.id === id) : undefined);

/**
 * @param {Task[]} tasks
 * @param {TaskSegment} segment
 * @returns {Task[]}
 */
export const tasksInSegment = (tasks, segment) => tasks.filter(segment.matches);

/**
 * Counts for the Categories screen, computed from one task list.
 *
 * @param {Task[]} tasks
 * @returns {{ segment: TaskSegment, count: number }[]}
 */
export const countSegments = (tasks) =>
  TASK_SEGMENTS.map((segment) => ({ segment, count: tasks.filter(segment.matches).length }));
