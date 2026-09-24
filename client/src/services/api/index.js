/**
 * Data access layer. Features import endpoints from here — nothing outside this
 * folder imports axios, knows the base URL, or unwraps a response envelope.
 */
export { default as client, registerUnauthorizedHandler, apiErrorMessage, blobApiErrorMessage, unwrap } from './client.js';
export { API_BASE_URL, STORAGE_KEYS } from './config.js';
export { queryKeys } from './queryKeys.js';
export { authApi } from './endpoints/auth.js';
export { tasksApi } from './endpoints/tasks.js';
export { dashboardApi } from './endpoints/dashboard.js';
export { usersApi } from './endpoints/users.js';
export { notificationsApi } from './endpoints/notifications.js';
export { settingsApi } from './endpoints/settings.js';
export { exportsApi } from './endpoints/exports.js';
