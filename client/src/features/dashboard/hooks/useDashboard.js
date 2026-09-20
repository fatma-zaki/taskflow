import { useQuery } from '@tanstack/react-query';
import { dashboardApi, queryKeys } from '@/services/api';
import { useCurrentUser } from '@/features/auth';

/**
 * Role-aware task counts from the dashboard endpoint.
 *
 * @returns {{ counts: import('@/shared/types').TaskCounts | undefined, isLoading: boolean }}
 */
export function useDashboard() {
  const { userId } = useCurrentUser();

  const query = useQuery({
    queryKey: queryKeys.dashboard.forUser(userId),
    queryFn: () => dashboardApi.get(),
    enabled: Boolean(userId),
  });

  return { counts: query.data?.counts, isLoading: query.isPending };
}

export default useDashboard;
