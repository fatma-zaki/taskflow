/** Base URL for every request. Override with `VITE_API_URL` at build time. */
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/** Keys used for the persisted session. */
export const STORAGE_KEYS = Object.freeze({
  token: 'token',
  user: 'user',
});
