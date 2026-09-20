/**
 * Every path in the app. Screens and links import from here — no route string
 * is written twice, so a URL change is a one-line edit.
 */
export const ROUTES = Object.freeze({
  login: '/login',
  home: '/home',
  calendar: '/calendar',
  tasks: '/tasks',
  taskNew: '/tasks/new',
  categories: '/categories',
  more: '/more',
  myDay: '/my-day',
  activity: '/activity',
  settings: '/settings',
  profile: '/settings/profile',
  about: '/settings/about',
  notificationRules: '/settings/notifications',
  users: '/admin/users',
});

/** Route patterns for `<Route path>` — the parameterised counterparts above. */
export const ROUTE_PATTERNS = Object.freeze({
  taskDetail: '/tasks/:id',
  taskEdit: '/tasks/:id/edit',
  userEdit: '/admin/users/:id/edit',
});

/** Query parameters understood by the Tasks screen. */
export const TASK_QUERY_PARAM = Object.freeze({
  segment: 'segment',
  filter: 'filter',
  date: 'date',
});

/** Builders for parameterised routes. */
export const routeTo = Object.freeze({
  /** @param {string} id */
  taskDetail: (id) => `/tasks/${id}`,
  /** @param {string} id */
  taskEdit: (id) => `/tasks/${id}/edit`,
  /** @param {string} id */
  userEdit: (id) => `/admin/users/${id}/edit`,
  /** @param {string} segmentId @returns {string} the Tasks screen scoped to a category. */
  tasksInSegment: (segmentId) => `${ROUTES.tasks}?${TASK_QUERY_PARAM.segment}=${segmentId}`,
  /** @param {string} isoDate `yyyy-MM-dd` */
  tasksOnDate: (isoDate) => `${ROUTES.tasks}?${TASK_QUERY_PARAM.date}=${isoDate}`,
});
