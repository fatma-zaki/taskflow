import client, { unwrap } from '../client.js';

/**
 * @typedef {import('@/shared/types').User} User
 */

export const authApi = {
  /**
   * @param {{ email: string, password: string }} credentials
   * @returns {Promise<{ token: string, user: User }>}
   */
  login: (credentials) => client.post('/auth/login', credentials).then(unwrap),

  /**
   * @param {{ name: string, email: string, password: string, role?: string }} payload
   * @returns {Promise<{ user: User }>}
   */
  register: (payload) => client.post('/auth/register', payload).then(unwrap),

  /** @returns {Promise<{ user: User }>} */
  me: () => client.get('/auth/me').then(unwrap),

  /**
   * @param {Partial<Pick<User, 'name' | 'email'>>} changes
   * @returns {Promise<{ user: User }>}
   */
  updateMe: (changes) => client.put('/auth/me', changes).then(unwrap),
};
