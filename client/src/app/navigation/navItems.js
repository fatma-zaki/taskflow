import {
  Activity,
  BellRing,
  CalendarDays,
  CircleGauge,
  House,
  LayoutDashboard,
  LayoutGrid,
  ListChecks,
  MoreHorizontal,
  Settings,
  Users,
} from 'lucide-react';
import { ROUTES } from './routes.js';

/**
 * @typedef {Object} NavItem
 * @property {string} id
 * @property {string} label
 * @property {string} to
 * @property {import('lucide-react').LucideIcon} icon
 * @property {string[]} [matches] Extra path prefixes that keep this item active.
 * @property {boolean} [managerOnly]
 */

/**
 * The five destinations of the phone's bottom navigation. Adding a tab is a
 * one-entry change here — the bar renders whatever this list contains.
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
 * @typedef {Object} NavSection
 * @property {string} id
 * @property {string} [label]
 * @property {NavItem[]} items
 */

/**
 * The web app's sidebar. Sections keep everyday work above administration.
 *
 * @type {NavSection[]}
 */
export const WEB_NAV_SECTIONS = [
  {
    id: 'workspace',
    items: [
      { id: 'dashboard', label: 'Dashboard', to: ROUTES.home, icon: LayoutDashboard },
      { id: 'tasks', label: 'Tasks', to: ROUTES.tasks, icon: ListChecks },
      { id: 'calendar', label: 'Calendar', to: ROUTES.calendar, icon: CalendarDays },
      { id: 'categories', label: 'Categories', to: ROUTES.categories, icon: LayoutGrid },
      { id: 'my-day', label: 'My day', to: ROUTES.myDay, icon: CircleGauge },
      { id: 'activity', label: 'Activity', to: ROUTES.activity, icon: Activity },
    ],
  },
  {
    id: 'admin',
    label: 'Administration',
    items: [
      { id: 'users', label: 'Team', to: ROUTES.users, icon: Users, managerOnly: true },
      {
        id: 'notification-rules',
        label: 'Notification rules',
        to: ROUTES.notificationRules,
        icon: BellRing,
        managerOnly: true,
      },
    ],
  },
];

/** Shown at the foot of the sidebar, below the sections. */
export const WEB_NAV_FOOTER_ITEM = /** @type {NavItem} */ ({
  id: 'settings',
  label: 'Settings',
  to: ROUTES.settings,
  icon: Settings,
  matches: [ROUTES.profile, ROUTES.about],
});

/**
 * @param {string} pathname
 * @param {NavItem} item
 * @returns {boolean}
 */
export function isNavItemActive(pathname, item) {
  const candidates = [item.to, ...(item.matches ?? [])];
  return candidates.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}

/**
 * Filters a section's items by the viewer's role.
 *
 * @param {NavSection} section
 * @param {{ isManager: boolean }} context
 * @returns {NavItem[]}
 */
export const visibleItems = (section, { isManager }) =>
  section.items.filter((item) => !item.managerOnly || isManager);
