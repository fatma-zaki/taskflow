import client, { unwrap } from '../client.js';

/**
 * @typedef {import('@/shared/types').Task} Task
 * @typedef {import('@/shared/types').TaskDraft} TaskDraft
 * @typedef {import('@/shared/types').TaskStatus} TaskStatus
 * @typedef {import('@/shared/types').Attachment} Attachment
 */

/**
 * @typedef {Object} TaskQueryParams
 * @property {TaskStatus} [status]
 * @property {string} [assignee_id]
 * @property {string} [priority]
 * @property {string} [search]
 * @property {number} [page]
 * @property {number} [limit]
 * @property {string} [sort]
 */

export const tasksApi = {
  /**
   * @param {TaskQueryParams} [params]
   * @returns {Promise<{ tasks: Task[], total: number, page: number, pages: number }>}
   */
  list: (params) => client.get('/tasks', { params }).then(unwrap),

  /**
   * @param {string} id
   * @returns {Promise<{ task: Task, attachments: Attachment[] }>}
   */
  get: (id) => client.get(`/tasks/${id}`).then(unwrap),

  /**
   * @param {TaskDraft} draft
   * @returns {Promise<{ task: Task }>}
   */
  create: (draft) => client.post('/tasks', draft).then(unwrap),

  /**
   * @param {string} id
   * @param {Partial<TaskDraft>} changes
   * @returns {Promise<{ task: Task }>}
   */
  update: (id, changes) => client.put(`/tasks/${id}`, changes).then(unwrap),

  /**
   * @param {string} id
   * @param {TaskStatus} status
   * @returns {Promise<{ task: Task }>}
   */
  updateStatus: (id, status) => client.patch(`/tasks/${id}/status`, { status }).then(unwrap),

  /**
   * @param {string} id
   * @returns {Promise<unknown>}
   */
  remove: (id) => client.delete(`/tasks/${id}`).then(unwrap),

  /**
   * @param {string} taskId
   * @param {File} file
   * @returns {Promise<{ attachment: Attachment }>}
   */
  uploadAttachment: (taskId, file) => {
    const formData = new FormData();
    formData.append('file', file);
    return client
      .post(`/tasks/${taskId}/attachments`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(unwrap);
  },

  /**
   * @param {string} taskId
   * @param {string} attachmentId
   * @returns {Promise<Blob>}
   */
  downloadAttachment: (taskId, attachmentId) =>
    client
      .get(`/tasks/${taskId}/attachments/${attachmentId}/download`, { responseType: 'blob' })
      .then((response) => response.data),

  /**
   * @param {string} taskId
   * @param {string} attachmentId
   * @returns {Promise<unknown>}
   */
  removeAttachment: (taskId, attachmentId) =>
    client.delete(`/tasks/${taskId}/attachments/${attachmentId}`).then(unwrap),
};
