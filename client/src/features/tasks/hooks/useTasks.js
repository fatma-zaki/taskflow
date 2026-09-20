import { useQuery } from '@tanstack/react-query';
import { queryKeys, tasksApi } from '@/services/api';
import { TASK_PAGE_SIZE } from '../constants/taskMeta.js';

/**
 * @typedef {import('@/shared/types').Task} Task
 * @typedef {import('@/services/api/endpoints/tasks.js').TaskQueryParams} TaskQueryParams
 */

/**
 * Task list query. Filtering and grouping happen client-side through
 * `taskRules`, so screens share one cached result instead of each issuing a
 * differently-filtered request.
 *
 * @param {TaskQueryParams} [params]
 * @param {{ enabled?: boolean }} [options]
 * @returns {{ tasks: Task[], isLoading: boolean, isError: boolean, refetch: () => void }}
 */
export function useTasks(params = {}, options = {}) {
  const queryParams = { limit: TASK_PAGE_SIZE, sort: 'end_date', ...params };

  const query = useQuery({
    queryKey: queryKeys.tasks.list(queryParams),
    queryFn: () => tasksApi.list(queryParams),
    enabled: options.enabled ?? true,
  });

  return {
    tasks: query.data?.tasks ?? [],
    isLoading: query.isPending,
    isError: query.isError,
    refetch: query.refetch,
  };
}

export default useTasks;
