import { useMemo } from 'react';
import { ROUTES } from '@/app/navigation/routes.js';
import {
  EmptyState,
  Fab,
  FilterChips,
  Screen,
  ScreenHeader,
  SearchInput,
} from '@/shared/components';
import { formatFullDate } from '@/shared/utils/date.js';
import { TASK_FILTERS } from '../constants/taskMeta.js';
import { taskCopy } from '../constants/taskCopy.js';
import { groupTasksByBucket } from '../services/taskRules.js';
import { useTasks } from '../hooks/useTasks.js';
import { useTaskFilters } from '../hooks/useTaskFilters.js';
import TaskGroups from '../components/TaskGroups.jsx';
import TaskListSkeleton from '../components/TaskListSkeleton.jsx';
import NoTasksState from '../components/NoTasksState.jsx';

/**
 * Screen 3 — the phone task list: search, filter chips and grouped rows.
 *
 * Filtering lives in the URL via `useTaskFilters`, which the web page uses too.
 */
export default function TasksScreen() {
  const { tasks, isLoading } = useTasks();
  const { criteria, segment, isScoped, setSearch, setFilter, apply } = useTaskFilters();

  const visibleTasks = useMemo(() => apply(tasks), [apply, tasks]);
  const buckets = useMemo(() => groupTasksByBucket(visibleTasks), [visibleTasks]);

  const title = segment?.label ?? (criteria.date ? formatFullDate(criteria.date) : 'My tasks');

  return (
    <>
      <Screen
        header={
          <ScreenHeader
            title={title}
            align={isScoped ? 'center' : 'start'}
            showBack={isScoped}
            backTo={segment ? ROUTES.categories : ROUTES.calendar}
          />
        }
      >
        <SearchInput
          value={criteria.search ?? ''}
          onChange={setSearch}
          placeholder="Search tasks..."
          className="mt-1"
        />

        <FilterChips
          options={TASK_FILTERS}
          value={criteria.filter ?? 'all'}
          onChange={setFilter}
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
                title={criteria.search ? taskCopy.emptySearch.title : taskCopy.emptyFiltered.title}
                description={
                  criteria.search ? taskCopy.emptySearch.description : taskCopy.emptyFiltered.description
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
