import client, { unwrap } from '../client.js';

export const dashboardApi = {
  /** @returns {Promise<import('@/shared/types').DashboardSummary>} */
  get: () => client.get('/dashboard').then(unwrap),
};
