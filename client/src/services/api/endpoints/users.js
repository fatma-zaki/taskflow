import client, { unwrap } from '../client.js';

/**
 * @typedef {import('@/shared/types').User} User
 */

export const usersApi = {
  /**
   * @param {{ role?: string, search?: string, active?: boolean }} [params]
   * @returns {Promise<{ users: User[] }>}
   */
  list: (params) => client.get('/users', { params }).then(unwrap),

  /**
   * @param {string} id
   * @returns {Promise<{ user: User }>}
   */
  get: (id) => client.get(`/users/${id}`).then(unwrap),

  /**
   * @param {string} id
   * @param {Partial<User>} changes
   * @returns {Promise<{ user: User }>}
   */
  update: (id, changes) => client.put(`/users/${id}`, changes).then(unwrap),

  /**
   * @param {string} id
   * @returns {Promise<unknown>}
   */
  remove: (id) => client.delete(`/users/${id}`).then(unwrap),
};
