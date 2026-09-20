import { useQuery } from '@tanstack/react-query';
import { queryKeys, tasksApi } from '@/services/api';

/**
 * A single task with its attachments.
 *
 * @param {string | undefined} id
 * @returns {{
 *   task: import('@/shared/types').Task | undefined,
 *   attachments: import('@/shared/types').Attachment[],
 *   isLoading: boolean,
 *   error: unknown,
 * }}
 */
export function useTask(id) {
  const query = useQuery({
    queryKey: queryKeys.tasks.detail(id ?? ''),
    queryFn: () => tasksApi.get(/** @type {string} */ (id)),
    enabled: Boolean(id),
    retry: false,
  });

  return {
    task: query.data?.task,
    attachments: query.data?.attachments ?? [],
    isLoading: query.isPending,
    error: query.error,
  };
}

export default useTask;
