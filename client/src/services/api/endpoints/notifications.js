import client, { unwrap } from '../client.js';

/**
 * @typedef {import('@/shared/types').AppNotification} AppNotification
 */

export const notificationsApi = {
  /**
   * @param {{ read?: boolean, limit?: number, page?: number }} [params]
   * @returns {Promise<{ notifications: AppNotification[], unreadCount: number, total: number }>}
   */
  list: (params) => client.get('/notifications', { params }).then(unwrap),

  /**
   * @param {string} id
   * @returns {Promise<unknown>}
   */
  markRead: (id) => client.patch(`/notifications/${id}/read`).then(unwrap),

  /** @returns {Promise<unknown>} */
  markAllRead: () => client.patch('/notifications/read-all').then(unwrap),

  /**
   * @param {string} id
   * @returns {Promise<unknown>}
   */
  remove: (id) => client.delete(`/notifications/${id}`).then(unwrap),
};
