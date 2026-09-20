import { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { notificationsApi, queryKeys } from '@/services/api';
import { toActivityFeed } from '../services/activityMapper.js';

const DEFAULT_LIMIT = 30;

/**
 * The activity feed — notifications mapped into display items.
 *
 * @param {{ limit?: number }} [params]
 * @returns {{
 *   items: import('../services/activityMapper.js').ActivityItem[],
 *   unreadCount: number,
 *   isLoading: boolean,
 * }}
 */
export function useActivity({ limit = DEFAULT_LIMIT } = {}) {
  const query = useQuery({
    queryKey: queryKeys.notifications.list({ limit }),
    queryFn: () => notificationsApi.list({ limit }),
  });

  const notifications = query.data?.notifications ?? [];
  const items = useMemo(() => toActivityFeed(notifications), [notifications]);

  return {
    items,
    unreadCount: query.data?.unreadCount ?? notifications.filter((item) => !item.read).length,
    isLoading: query.isPending,
  };
}

/**
 * @returns {{ markRead: (id: string) => void, markAllRead: () => void, remove: (id: string) => void }}
 */
export function useActivityActions() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all });

  const markRead = useMutation({
    /** @param {string} id */
    mutationFn: (id) => notificationsApi.markRead(id),
    onSuccess: invalidate,
  });

  const markAllRead = useMutation({
    mutationFn: () => notificationsApi.markAllRead(),
    onSuccess: invalidate,
  });

  const remove = useMutation({
    /** @param {string} id */
    mutationFn: (id) => notificationsApi.remove(id),
    onSuccess: invalidate,
  });

  return {
    markRead: markRead.mutate,
    markAllRead: markAllRead.mutate,
    remove: remove.mutate,
  };
}
