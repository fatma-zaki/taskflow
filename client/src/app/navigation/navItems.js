import { CalendarDays, House, LayoutGrid, ListChecks, MoreHorizontal } from 'lucide-react';
import { ROUTES } from './routes.js';

/**
 * @typedef {Object} NavItem
 * @property {string} id
 * @property {string} label
 * @property {string} to
 * @property {import('lucide-react').LucideIcon} icon
 * @property {string[]} [matches] Extra path prefixes that keep this item active.
 */

/**
 * The five destinations of the bottom navigation. Adding a tab is a one-entry
 * change here — the bar renders whatever this list contains.
 *
 * @type {NavItem[]}
 */
export const BOTTOM_NAV_ITEMS = [
  { id: 'home', label: 'Home', to: ROUTES.home, icon: House, matches: [ROUTES.myDay] },
  { id: 'calendar', label: 'Calendar', to: ROUTES.calendar, icon: CalendarDays },
  { id: 'tasks', label: 'Tasks', to: ROUTES.tasks, icon: ListChecks },
  { id: 'categories', label: 'Categories', to: ROUTES.categories, icon: LayoutGrid },
  {
    id: 'more',
    label: 'More',
    to: ROUTES.more,
    icon: MoreHorizontal,
    matches: [ROUTES.settings, ROUTES.activity, ROUTES.users],
  },
];

/**
 * @param {string} pathname
 * @param {NavItem} item
 * @returns {boolean}
 */
export function isNavItemActive(pathname, item) {
  const candidates = [item.to, ...(item.matches ?? [])];
  return candidates.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}
