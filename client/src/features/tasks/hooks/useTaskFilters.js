import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TASK_QUERY_PARAM } from '@/app/navigation/routes.js';
import { applyTaskCriteria } from '../services/taskRules.js';
import { findSegment, tasksInSegment } from '../services/taskSegments.js';

/**
 * @typedef {import('@/shared/types').Task} Task
 * @typedef {import('../constants/taskMeta.js').TaskFilterId} TaskFilterId
 */

/**
 * Task filtering, held in the URL.
 *
 * Both interfaces use this hook, so a filtered view is the same thing on a
 * phone and in the browser — and it survives reloads, back navigation and
 * being pasted to someone else.
 *
 * @returns {{
 *   criteria: import('../services/taskRules.js').TaskCriteria,
 *   segment: import('../services/taskSegments.js').TaskSegment | undefined,
 *   isScoped: boolean,
 *   hasActiveFilters: boolean,
 *   setSearch: (value: string) => void,
 *   setFilter: (value: TaskFilterId) => void,
 *   setStatus: (value: string) => void,
 *   setPriority: (value: string) => void,
 *   clearDate: () => void,
 *   clearAll: () => void,
 *   apply: (tasks: Task[]) => Task[],
 * }}
 */
export function useTaskFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const criteria = useMemo(
    () => ({
      search: searchParams.get(TASK_QUERY_PARAM.search) ?? '',
      filter: /** @type {TaskFilterId} */ (searchParams.get(TASK_QUERY_PARAM.filter) ?? 'all'),
      status: /** @type {import('@/shared/types').TaskStatus | ''} */ (
        searchParams.get(TASK_QUERY_PARAM.status) ?? ''
      ),
      priority: /** @type {import('@/shared/types').TaskPriority | ''} */ (
        searchParams.get(TASK_QUERY_PARAM.priority) ?? ''
      ),
      date: searchParams.get(TASK_QUERY_PARAM.date),
    }),
    [searchParams],
  );

  const segment = findSegment(searchParams.get(TASK_QUERY_PARAM.segment));

  /** Writes a param, dropping it entirely when the value is empty or default. */
  const setParam = useCallback(
    /** @param {string} key @param {string} value @param {string} [emptyValue] */
    (key, value, emptyValue = '') => {
      const next = new URLSearchParams(searchParams);
      if (!value || value === emptyValue) next.delete(key);
      else next.set(key, value);
      setSearchParams(next, { replace: true });
    },
    [searchParams, setSearchParams],
  );

  const apply = useCallback(
    /** @param {Task[]} tasks */
    (tasks) => {
      const filtered = applyTaskCriteria(tasks, criteria);
      return segment ? tasksInSegment(filtered, segment) : filtered;
    },
    [criteria, segment],
  );

  return {
    criteria,
    segment,
    isScoped: Boolean(segment || criteria.date),
    hasActiveFilters: Boolean(
      criteria.search || criteria.filter !== 'all' || criteria.status || criteria.priority || criteria.date,
    ),
    setSearch: (value) => setParam(TASK_QUERY_PARAM.search, value),
    setFilter: (value) => setParam(TASK_QUERY_PARAM.filter, value, 'all'),
    setStatus: (value) => setParam(TASK_QUERY_PARAM.status, value),
    setPriority: (value) => setParam(TASK_QUERY_PARAM.priority, value),
    clearDate: () => setParam(TASK_QUERY_PARAM.date, ''),
    /** Clears the filters but keeps the category, which is navigation context. */
    clearAll: () => {
      const next = new URLSearchParams(searchParams);
      for (const key of Object.values(TASK_QUERY_PARAM)) {
        if (key !== TASK_QUERY_PARAM.segment) next.delete(key);
      }
      setSearchParams(next, { replace: true });
    },
    apply,
  };
}

export default useTaskFilters;
