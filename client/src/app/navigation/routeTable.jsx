import { Navigate } from 'react-router-dom';
import { LoginPage, LoginScreen } from '@/features/auth';
import { DashboardPage, HomeScreen, MyDayPage, MyDayScreen } from '@/features/dashboard';
import { CalendarPage, CalendarScreen } from '@/features/calendar';
import { CategoriesPage, CategoriesScreen } from '@/features/categories';
import { ActivityPage, ActivityScreen } from '@/features/activity';
import {
  CreateTaskPage,
  CreateTaskScreen,
  EditTaskPage,
  EditTaskScreen,
  TaskDetailPage,
  TaskDetailScreen,
  TasksPage,
  TasksScreen,
} from '@/features/tasks';
import {
  AboutPage,
  AboutScreen,
  MoreScreen,
  NotificationRulesPage,
  NotificationRulesScreen,
  ProfilePage,
  ProfileScreen,
  SettingsPage,
  SettingsScreen,
} from '@/features/settings';
import { EditUserPage, EditUserScreen, UsersPage, UsersScreen } from '@/features/users';
import { ROUTES, ROUTE_PATTERNS } from './routes.js';

/**
 * The app's routes, as data.
 *
 * Each entry names the screen for phones and the page for the web; the router
 * renders whichever the viewport calls for. `mobileLayout` says whether the
 * phone keeps its bottom navigation ("tab") or hands the screen the full
 * height ("focus") — the web always uses its sidebar shell.
 *
 * @typedef {'tab' | 'focus'} MobileLayout
 *
 * @typedef {Object} AppRoute
 * @property {string} path
 * @property {import('react').ComponentType} mobile
 * @property {import('react').ComponentType} desktop
 * @property {MobileLayout} mobileLayout
 * @property {boolean} [requireManager]
 */

/** Phones get a dedicated "More" tab; the web reaches the same things from its sidebar. */
const MoreRedirect = () => <Navigate to={ROUTES.settings} replace />;

/** @type {AppRoute[]} */
export const APP_ROUTES = [
  { path: ROUTES.home, mobile: HomeScreen, desktop: DashboardPage, mobileLayout: 'tab' },
  { path: ROUTES.calendar, mobile: CalendarScreen, desktop: CalendarPage, mobileLayout: 'tab' },
  { path: ROUTES.tasks, mobile: TasksScreen, desktop: TasksPage, mobileLayout: 'tab' },
  { path: ROUTES.categories, mobile: CategoriesScreen, desktop: CategoriesPage, mobileLayout: 'tab' },
  { path: ROUTES.more, mobile: MoreScreen, desktop: MoreRedirect, mobileLayout: 'tab' },
  { path: ROUTES.myDay, mobile: MyDayScreen, desktop: MyDayPage, mobileLayout: 'tab' },
  { path: ROUTES.activity, mobile: ActivityScreen, desktop: ActivityPage, mobileLayout: 'tab' },
  { path: ROUTES.settings, mobile: SettingsScreen, desktop: SettingsPage, mobileLayout: 'tab' },
  {
    path: ROUTES.users,
    mobile: UsersScreen,
    desktop: UsersPage,
    mobileLayout: 'tab',
    requireManager: true,
  },

  { path: ROUTES.taskNew, mobile: CreateTaskScreen, desktop: CreateTaskPage, mobileLayout: 'focus' },
  {
    path: ROUTE_PATTERNS.taskDetail,
    mobile: TaskDetailScreen,
    desktop: TaskDetailPage,
    mobileLayout: 'focus',
  },
  {
    path: ROUTE_PATTERNS.taskEdit,
    mobile: EditTaskScreen,
    desktop: EditTaskPage,
    mobileLayout: 'focus',
  },
  { path: ROUTES.profile, mobile: ProfileScreen, desktop: ProfilePage, mobileLayout: 'focus' },
  { path: ROUTES.about, mobile: AboutScreen, desktop: AboutPage, mobileLayout: 'focus' },
  {
    path: ROUTES.notificationRules,
    mobile: NotificationRulesScreen,
    desktop: NotificationRulesPage,
    mobileLayout: 'focus',
  },
  {
    path: ROUTE_PATTERNS.userEdit,
    mobile: EditUserScreen,
    desktop: EditUserPage,
    mobileLayout: 'focus',
    requireManager: true,
  },
];

/** The sign-in route, which sits outside the authenticated shells. */
export const LOGIN_ROUTE = /** @type {AppRoute} */ ({
  path: ROUTES.login,
  mobile: LoginScreen,
  desktop: LoginPage,
  mobileLayout: 'focus',
});

/**
 * Paths the earlier web app used, kept working.
 * @type {{ from: string, to: string }[]}
 */
export const LEGACY_REDIRECTS = [
  { from: '/', to: ROUTES.home },
  { from: '/dashboard', to: ROUTES.home },
  { from: '/tasks/create', to: ROUTES.taskNew },
  { from: '/notifications', to: ROUTES.activity },
  { from: '/profile', to: ROUTES.profile },
  { from: '/admin/notification-settings', to: ROUTES.notificationRules },
];
