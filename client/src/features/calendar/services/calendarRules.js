/**
 * Calendar layout rules — pure date maths, no rendering.
 */
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from 'date-fns';

/** The grid starts on Monday, matching the design. */
const WEEK_START = /** @type {const} */ (1);

/** @type {string[]} */
export const WEEKDAY_LABELS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

/**
 * @typedef {Object} CalendarDay
 * @property {Date} date
 * @property {boolean} inMonth Whether the day belongs to the displayed month.
 */

/**
 * The full grid for a month, padded with leading and trailing days so every
 * week has seven cells.
 *
 * @param {Date} month Any date inside the month.
 * @returns {CalendarDay[][]} weeks of seven days.
 */
export function buildMonthGrid(month) {
  const start = startOfWeek(startOfMonth(month), { weekStartsOn: WEEK_START });
  const end = endOfWeek(endOfMonth(month), { weekStartsOn: WEEK_START });
  const days = eachDayOfInterval({ start, end });

  /** @type {CalendarDay[][]} */
  const weeks = [];
  for (let index = 0; index < days.length; index += 7) {
    weeks.push(days.slice(index, index + 7).map((date) => ({ date, inMonth: isSameMonth(date, month) })));
  }

  return weeks;
}

/**
 * @param {Date} month
 * @param {number} delta Months to move; negative goes back.
 * @returns {Date}
 */
export const shiftMonth = (month, delta) => addMonths(month, delta);
