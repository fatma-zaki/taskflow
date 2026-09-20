import { useMemo } from 'react';
import { countSegments, useTasks } from '@/features/tasks';

/**
 * Categories with their live task counts.
 *
 * @returns {{
 *   segments: { segment: import('@/features/tasks').TaskSegment, count: number }[],
 *   isLoading: boolean,
 * }}
 */
export function useTaskSegments() {
  const { tasks, isLoading } = useTasks();
  const segments = useMemo(() => countSegments(tasks), [tasks]);

  return { segments, isLoading };
}

export default useTaskSegments;
