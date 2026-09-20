import client from '../client.js';

export const exportsApi = {
  /**
   * @param {Record<string, string | number | undefined>} [params]
   * @returns {Promise<Blob>}
   */
  tasksCsv: (params) =>
    client.get('/export/csv', { params, responseType: 'blob' }).then((response) => response.data),
};
