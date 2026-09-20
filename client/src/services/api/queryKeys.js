/**
 * Every React Query key in the app is built here, so cache invalidation stays
 * consistent: `queryClient.invalidateQueries({ queryKey: queryKeys.tasks.all })`
 * reaches every task list regardless of its filters.
 */
export const queryKeys = {
  dashboard: {
    all: /** @type {const} */ (['dashboard']),
    /** @param {string | undefined} userId */
    forUser: (userId) => /** @type {const} */ (['dashboard', userId ?? 'anonymous']),
  },
  tasks: {
    all: /** @type {const} */ (['tasks']),
    /** @param {Record<string, unknown>} [params] */
    list: (params = {}) => /** @type {const} */ (['tasks', 'list', params]),
    /** @param {string} id */
    detail: (id) => /** @type {const} */ (['tasks', 'detail', id]),
  },
  users: {
    all: /** @type {const} */ (['users']),
    /** @param {Record<string, unknown>} [params] */
    list: (params = {}) => /** @type {const} */ (['users', 'list', params]),
    /** @param {string} id */
    detail: (id) => /** @type {const} */ (['users', 'detail', id]),
  },
  notifications: {
    all: /** @type {const} */ (['notifications']),
    /** @param {Record<string, unknown>} [params] */
    list: (params = {}) => /** @type {const} */ (['notifications', 'list', params]),
  },
  settings: {
    all: /** @type {const} */ (['settings']),
  },
};

export default queryKeys;
