import axios from 'axios';
import { API_BASE_URL, STORAGE_KEYS } from './config.js';

/**
 * The single axios instance. Endpoint modules use it; screens never do.
 */
const client = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem(STORAGE_KEYS.token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Wires the 401 handler. Called once at startup from the app providers, which
 * keeps this module free of any dependency on the Redux store.
 *
 * @param {() => void} onUnauthorized
 * @returns {void}
 */
export function registerUnauthorizedHandler(onUnauthorized) {
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 401) {
        localStorage.removeItem(STORAGE_KEYS.token);
        localStorage.removeItem(STORAGE_KEYS.user);
        onUnauthorized();
      }
      return Promise.reject(error);
    },
  );
}

/**
 * The API wraps every payload as `{ success, data }`. Endpoints unwrap it here
 * so callers receive domain objects.
 *
 * @template T
 * @param {import('axios').AxiosResponse<{ data: T }>} response
 * @returns {T}
 */
export const unwrap = (response) => response.data.data;

/**
 * @param {unknown} error
 * @param {string} fallback
 * @returns {string} A message safe to show the user.
 */
export function apiErrorMessage(error, fallback) {
  const response = /** @type {{ response?: { status?: number, data?: { message?: string, error?: string } } }} */ (
    error
  )?.response;
  const message = response?.data?.message || response?.data?.error;
  if (message) return message;
  // Vercel rejects bodies over 4.5 MB itself, before the API sees them, with no JSON body
  if (response?.status === 413) return 'The file is too large to upload';
  return fallback;
}

/**
 * Requests made with `responseType: 'blob'` receive their error bodies as a Blob too,
 * so the server's message is hidden. This turns that Blob back into JSON first.
 *
 * @param {unknown} error
 * @param {string} fallback
 * @returns {Promise<string>}
 */
export async function blobApiErrorMessage(error, fallback) {
  const response = /** @type {{ response?: { data?: unknown } }} */ (error)?.response;
  if (response?.data instanceof Blob) {
    try {
      response.data = JSON.parse(await response.data.text());
    } catch {
      // Not JSON: fall through to the generic message
    }
  }
  return apiErrorMessage(error, fallback);
}

export default client;
