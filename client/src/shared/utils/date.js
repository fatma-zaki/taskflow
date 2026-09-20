/**
 * Date formatting and comparison helpers.
 *
 * Screens never call `date-fns` directly: every user-visible date string in the
 * app is produced here, so formats stay consistent and are changed in one place.
 */
import {
  differenceInCalendarDays,
  format,
  formatDistanceToNowStrict,
  isSameDay,
  isToday,
  isTomorrow,
  isYesterday,
  parseISO,
  startOfDay,
} from 'date-fns';

/**
 * @param {string | number | Date | null | undefined} value
 * @returns {Date | null} `null` when the value is missing or unparseable.
 */
export function toDate(value) {
  if (!value) return null;
  const date = value instanceof Date ? value : typeof value === 'string' ? parseISO(value) : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

/**
 * @param {string | Date | null | undefined} value
 * @returns {string} e.g. "10:30 AM", or an empty string when unknown.
 */
export function formatTime(value) {
  const date = toDate(value);
  return date ? format(date, 'h:mm a') : '';
}

/**
 * @param {string | Date | null | undefined} value
 * @returns {string} e.g. "Sep 20"
 */
export function formatShortDate(value) {
  const date = toDate(value);
  return date ? format(date, 'MMM d') : '';
}

/**
 * @param {string | Date | null | undefined} value
 * @returns {string} e.g. "Sep 20, 2026"
 */
export function formatFullDate(value) {
  const date = toDate(value);
  return date ? format(date, 'MMM d, yyyy') : '';
}

/**
 * @param {string | Date | null | undefined} value
 * @returns {string} e.g. "Today, September 20"
 */
export function formatDayHeading(value) {
  const date = toDate(value);
  if (!date) return '';
  const prefix = isToday(date) ? 'Today, ' : isTomorrow(date) ? 'Tomorrow, ' : '';
  return `${prefix}${format(date, 'MMMM d')}`;
}

/**
 * @param {string | Date | null | undefined} value
 * @returns {string} e.g. "September 2026"
 */
export function formatMonthYear(value) {
  const date = toDate(value);
  return date ? format(date, 'MMMM yyyy') : '';
}

/**
 * A short, human label for a due date — "Today", "Tomorrow", "Sep 20".
 *
 * @param {string | Date | null | undefined} value
 * @returns {string}
 */
export function formatRelativeDay(value) {
  const date = toDate(value);
  if (!date) return 'No date';
  if (isToday(date)) return 'Today';
  if (isTomorrow(date)) return 'Tomorrow';
  if (isYesterday(date)) return 'Yesterday';
  const days = differenceInCalendarDays(date, new Date());
  if (days > 0 && days <= 6) return format(date, 'EEEE');
  return formatShortDate(date);
}

/**
 * "2 hours ago" / "5 days ago" — used by the activity feed.
 *
 * @param {string | Date | null | undefined} value
 * @returns {string}
 */
export function formatTimeAgo(value) {
  const date = toDate(value);
  if (!date) return '';
  const days = Math.abs(differenceInCalendarDays(date, new Date()));
  if (days > 6) return formatShortDate(date);
  return `${formatDistanceToNowStrict(date)} ago`;
}

/**
 * Due-date label for a task row: the time when it falls today, the day otherwise.
 *
 * @param {string | Date | null | undefined} value
 * @returns {string}
 */
export function formatDueLabel(value) {
  const date = toDate(value);
  if (!date) return 'No date';
  return isToday(date) ? formatTime(date) : `${formatRelativeDay(date)} · ${formatTime(date)}`;
}

/**
 * Day-of-month for a calendar cell, e.g. "20".
 *
 * @param {Date} date
 * @returns {string}
 */
export const formatDayNumber = (date) => format(date, 'd');

/**
 * Spoken form of a calendar cell, e.g. "Sunday 20 September".
 *
 * @param {Date} date
 * @returns {string}
 */
export const formatDayAria = (date) => format(date, 'EEEE d MMMM');

/**
 * @param {string | Date | null | undefined} a
 * @param {string | Date | null | undefined} b
 * @returns {boolean}
 */
export function isSameCalendarDay(a, b) {
  const left = toDate(a);
  const right = toDate(b);
  return Boolean(left && right && isSameDay(left, right));
}

/**
 * @param {string | Date | null | undefined} value
 * @returns {boolean}
 */
export function isDateToday(value) {
  const date = toDate(value);
  return Boolean(date && isToday(date));
}

/**
 * @param {string | Date | null | undefined} value
 * @returns {boolean}
 */
export function isPast(value) {
  const date = toDate(value);
  return Boolean(date && date.getTime() < Date.now());
}

/**
 * Value for an `<input type="datetime-local">`, in the browser's local zone.
 *
 * @param {string | Date | null | undefined} value
 * @returns {string} e.g. "2026-09-20T10:30", or "" when unknown.
 */
export function toDateTimeInputValue(value) {
  const date = toDate(value);
  return date ? format(date, "yyyy-MM-dd'T'HH:mm") : '';
}

/**
 * Value for an `<input type="date">`.
 *
 * @param {string | Date | null | undefined} value
 * @returns {string} e.g. "2026-09-20", or "" when unknown.
 */
export function toDateInputValue(value) {
  const date = toDate(value);
  return date ? format(date, 'yyyy-MM-dd') : '';
}

/**
 * @param {string | Date} value
 * @returns {Date} midnight of the given day, local time.
 */
export function dayStart(value) {
  return startOfDay(toDate(value) ?? new Date());
}

/**
 * Stable key for grouping tasks by calendar day.
 *
 * @param {string | Date | null | undefined} value
 * @returns {string} e.g. "2026-09-20", or "" when unknown.
 */
export function dayKey(value) {
  const date = toDate(value);
  return date ? format(date, 'yyyy-MM-dd') : '';
}
