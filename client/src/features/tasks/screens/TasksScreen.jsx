import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ROUTES, TASK_QUERY_PARAM } from '@/app/navigation/routes.js';
import {
  EmptyState,
  Fab,
  FilterChips,
  Screen,
  ScreenHeader,
  SearchInput,
} from '@/shared/components';
import { useDebouncedValue } from '@/shared/hooks';
import { formatFullDate } from '@/shared/utils/date.js';
import { TASK_FILTERS } from '../constants/taskMeta.js';
import { taskCopy } from '../constants/taskCopy.js';
import { groupTasksByBucket, matchesFilter, matchesSearch, tasksOnDay } from '../services/taskRules.js';
import { findSegment, tasksInSegment } from '../services/taskSegments.js';
import { useTasks } from '../hooks/useTasks.js';
import TaskGroups from '../components/TaskGroups.jsx';
import TaskListSkeleton from '../components/TaskListSkeleton.jsx';
import NoTasksState from '../components/NoTasksState.jsx';

/**
 * Screen 3 — the full task list: search, filter chips and grouped rows.
 *
 * Filter and category live in the URL, so the view survives a back navigation
 * and can be linked to from Categories and Calendar.
 */
export default function TasksScreen() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search);

  const filter = /** @type {import('../constants/taskMeta.js').TaskFilterId} */ (
    searchParams.get(TASK_QUERY_PARAM.filter) ?? 'all'
  );
  const segment = findSegment(searchParams.get(TASK_QUERY_PARAM.segment));
  const dateFilter = searchParams.get(TASK_QUERY_PARAM.date);

  const { tasks, isLoading } = useTasks();

  const visibleTasks = useMemo(() => {
    let result = tasks.filter((task) => matchesFilter(task, filter) && matchesSearch(task, debouncedSearch));
    if (segment) result = tasksInSegment(result, segment);
    if (dateFilter) result = tasksOnDay(result, dateFilter);
    return result;
  }, [tasks, filter, debouncedSearch, segment, dateFilter]);

  const buckets = useMemo(() => groupTasksByBucket(visibleTasks), [visibleTasks]);

  /** @param {import('../constants/taskMeta.js').TaskFilterId} value */
  const handleFilterChange = (value) => {
    const next = new URLSearchParams(searchParams);
    if (value === 'all') next.delete(TASK_QUERY_PARAM.filter);
    else next.set(TASK_QUERY_PARAM.filter, value);
    setSearchParams(next, { replace: true });
  };

  const scoped = Boolean(segment || dateFilter);
  const title = segment?.label ?? (dateFilter ? formatFullDate(dateFilter) : 'My tasks');

  return (
    <>
      <Screen
        header={
          <ScreenHeader
            title={title}
            align={scoped ? 'center' : 'start'}
            showBack={scoped}
            backTo={segment ? ROUTES.categories : ROUTES.calendar}
          />
        }
      >
        <SearchInput value={search} onChange={setSearch} placeholder="Search tasks..." className="mt-1" />

        <FilterChips
          options={TASK_FILTERS}
          value={filter}
          onChange={handleFilterChange}
          label="Filter tasks"
          className="mt-4"
        />

        <div className="mt-6">
          {isLoading ? (
            <TaskListSkeleton rows={5} />
          ) : visibleTasks.length === 0 ? (
            tasks.length === 0 ? (
              <NoTasksState />
            ) : (
              <EmptyState
                title={debouncedSearch ? taskCopy.emptySearch.title : taskCopy.emptyFiltered.title}
                description={
                  debouncedSearch ? taskCopy.emptySearch.description : taskCopy.emptyFiltered.description
                }
              />
            )
          ) : (
            <TaskGroups buckets={buckets} />
          )}
        </div>
      </Screen>

      <Fab to={ROUTES.taskNew} label="Create a task" />
    </>
  );
}
