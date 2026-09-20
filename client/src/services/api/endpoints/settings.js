import client, { unwrap } from '../client.js';

/**
 * @typedef {import('@/shared/types').AppSetting} AppSetting
 */

export const settingsApi = {
  /** @returns {Promise<{ settings: AppSetting[] }>} */
  list: () => client.get('/settings').then(unwrap),

  /**
   * @param {string} key
   * @returns {Promise<{ setting: AppSetting }>}
   */
  get: (key) => client.get(`/settings/${key}`).then(unwrap),

  /**
   * @param {string} key
   * @param {{ value: unknown, description?: string }} payload
   * @returns {Promise<{ setting: AppSetting }>}
   */
  update: (key, payload) => client.put(`/settings/${key}`, payload).then(unwrap),
};
