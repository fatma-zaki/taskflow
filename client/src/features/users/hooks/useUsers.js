import { useQuery } from '@tanstack/react-query';
import { queryKeys, usersApi } from '@/services/api';

/**
 * @param {{ role?: string, search?: string }} [params]
 * @param {{ enabled?: boolean }} [options]
 * @returns {{ users: import('@/shared/types').User[], isLoading: boolean }}
 */
export function useUsers(params = {}, options = {}) {
  const query = useQuery({
    queryKey: queryKeys.users.list(params),
    queryFn: () => usersApi.list(params),
    enabled: options.enabled ?? true,
  });

  return { users: query.data?.users ?? [], isLoading: query.isPending };
}

/**
 * @param {string | undefined} id
 * @returns {{ user: import('@/shared/types').User | undefined, isLoading: boolean }}
 */
export function useUser(id) {
  const query = useQuery({
    queryKey: queryKeys.users.detail(id ?? ''),
    queryFn: () => usersApi.get(/** @type {string} */ (id)),
    enabled: Boolean(id),
  });

  return { user: query.data?.user, isLoading: query.isPending };
}
